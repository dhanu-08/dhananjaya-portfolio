import fs from 'fs';

async function buildVismeLogin() {
  const html = await fetch('https://forms.visme.co/formsPlayer/_embed/vm881x4j-workshop-registration-form?fullPage=true').then(r => r.text());
  const m = html.match(/const bootstrap = ([\s\S]*?);\s*<\/script>/);
  if (!m) {
    console.error('Could not find bootstrap in Visme HTML');
    return;
  }
  const fn = new Function('return ' + m[1]);
  const bootstrap = fn();
  const formData = JSON.parse(bootstrap.formData);
  const meta = JSON.parse(formData.meta);

  // 1. Change title and subheader exactly as user requested:
  // "in place of register here place login"
  const headerField = meta.fields.find(f => f.type === 'heading');
  if (headerField) {
    headerField.text = 'Login';
  }

  const subheaderField = meta.fields.find(f => f.type === 'subheader');
  if (subheaderField) {
    subheaderField.text = 'Enter your credentials to access admin dashboard';
  }

  // 2. Change Name field placeholders, icons, and input types
  const nameField = meta.fields.find(f => f.type === 'name');
  if (nameField && nameField.group) {
    nameField.group[0].placeholder = 'Admin Email';
    nameField.group[0].inputType = 'email';
    if (nameField.group[0].icon) {
      nameField.group[0].icon.iconName = 'email';
    }

    nameField.group[1].placeholder = 'Password';
    nameField.group[1].inputType = 'password';
    if (nameField.group[1].icon) {
      nameField.group[1].icon.iconName = 'lock';
    }
  }

  // 3. Change Button text to LOGIN
  const buttonField = meta.fields.find(f => f.type === 'button' && f.text === 'Next');
  if (buttonField) {
    buttonField.text = 'LOGIN';
  }

  // 4. Change Footer
  const footerField = meta.fields.find(f => f.type === 'footer');
  if (footerField) {
    footerField.text = 'Dhananjaya Meher Portfolio Admin';
  }

  // Ensure step 0 stays on step 0 or completes
  if (meta.steps && meta.steps[0] && meta.steps[0].logic && meta.steps[0].logic.connections) {
    meta.steps[0].logic.connections = [];
  }

  formData.name = 'Admin Dashboard Login';
  formData.meta = JSON.stringify(meta);
  bootstrap.formData = JSON.stringify(formData);

  // Replace bootstrap inside the HTML
  const newBootstrapStr = JSON.stringify(bootstrap);
  let newHtml = html.replace(/const bootstrap = [\s\S]*?;\s*<\/script>/, 'const bootstrap = ' + newBootstrapStr + ';\n</script>');

  // Interceptor script to bridge into React and Supabase
  const interceptorScript = `
  <style>
    /* Ensure password field masks input characters correctly */
    input[type="password"] {
      -webkit-text-security: disc !important;
    }
    /* Sleek scrollbar and styling */
    body {
      user-select: none;
      -webkit-user-select: none;
    }
  </style>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      function getInputs() {
        const allInputs = Array.from(document.querySelectorAll('input'));
        let emailInput = null;
        let passwordInput = null;

        allInputs.forEach(input => {
          const ph = (input.getAttribute('placeholder') || '').toLowerCase();
          if (ph.includes('email') || ph.includes('first') || input.type === 'email') {
            emailInput = input;
          }
          if (ph.includes('password') || ph.includes('last') || input.type === 'password') {
            passwordInput = input;
            input.type = 'password';
          }
        });

        // Fallback by order: first input is email, second input is password
        if (!emailInput && allInputs[0]) emailInput = allInputs[0];
        if (!passwordInput && allInputs[1]) {
          passwordInput = allInputs[1];
          passwordInput.type = 'password';
        }

        return { emailInput, passwordInput };
      }

      function attachListeners() {
        const { emailInput, passwordInput } = getInputs();
        const buttons = Array.from(document.querySelectorAll('button'));

        const submitHandler = (e) => {
          const emailVal = emailInput ? emailInput.value.trim() : '';
          const passVal = passwordInput ? passwordInput.value.trim() : '';

          if (emailVal && passVal) {
            if (e && e.preventDefault) e.preventDefault();
            if (e && e.stopPropagation) e.stopPropagation();
            if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();

            window.parent.postMessage({
              type: 'VISME_ADMIN_LOGIN',
              email: emailVal,
              password: passVal
            }, '*');
            return false;
          }
        };

        buttons.forEach(btn => {
          if (!btn.__hasLoginListener) {
            btn.__hasLoginListener = true;
            btn.addEventListener('click', submitHandler, true);
          }
        });

        if (passwordInput && !passwordInput.__hasEnterListener) {
          passwordInput.__hasEnterListener = true;
          passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') submitHandler(e);
          }, true);
        }

        if (emailInput && !emailInput.__hasEnterListener) {
          emailInput.__hasEnterListener = true;
          emailInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && passwordInput) {
              passwordInput.focus();
            }
          }, true);
        }
      }

      const observer = new MutationObserver(() => {
        attachListeners();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(attachListeners, 400);
      setTimeout(attachListeners, 1200);
      setTimeout(attachListeners, 2500);
      setTimeout(attachListeners, 5000);
    });
  </script>
`;

  newHtml = newHtml.replace('</body>', interceptorScript + '\n</body>');

  fs.writeFileSync('public/visme-login.html', newHtml, 'utf-8');
  console.log('Successfully generated public/visme-login.html! Size:', fs.statSync('public/visme-login.html').size);
}

buildVismeLogin();
