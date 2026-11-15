import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function Login() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both Admin Email and Password.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role !== "admin") {
        setErrorMessage("Access denied: You must have an administrator account.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      setLoginSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 600);
    } catch (err) {
      setErrorMessage(err?.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="visme-glass-page">
      {/* Background Animated Ambient Gradient Orbs */}
      <div className="glass-ambient-orb glass-orb-1" />
      <div className="glass-ambient-orb glass-orb-2" />
      <div className="glass-ambient-orb glass-orb-3" />

      {/* Floating Status Notification Toast */}
      {errorMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 22px",
            borderRadius: "14px",
            background: "rgba(220, 38, 38, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)",
            fontSize: "13px",
            fontWeight: 500,
            maxWidth: "90vw",
            animation: "bubblePop 0.3s ease",
          }}
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-white" />
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage("")}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4 opacity-75 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(14px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
            color: "#ffffff",
          }}
        >
          {loginSuccess ? (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-400 animate-bounce" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  letterSpacing: "0.08em",
                  color: "#86efac",
                }}
              >
                ACCESS GRANTED. OPENING DASHBOARD...
              </span>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "3.5px solid rgba(255, 255, 255, 0.15)",
                  borderTopColor: "#f97316",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  color: "#fdba74",
                }}
              >
                AUTHENTICATING ADMIN CREDENTIALS...
              </span>
            </>
          )}
        </div>
      )}

      {/* Top Glass Navigation Controls */}
      <nav className="visme-glass-nav">
        <Link to="/" className="visme-glass-pill">
          <span>← Return to Portfolio</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setShowAdminModal(true)}
            className="visme-glass-pill highlight"
            title="Open Direct Admin Credentials Modal"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Direct Sign In</span>
          </button>
        </div>
      </nav>

      {/* Main Glass Frame Containing Exact Visme 3D Animated Form with Login Overlay */}
      <div className="visme-form-glass-card" style={{ position: "relative" }}>
        {/* The Live 3D Animated Visme Character */}
        <iframe
          src="https://forms.visme.co/formsPlayer/_embed/vm881x4j-workshop-registration-form?fullPage=true&embedIframeId=1"
          title="3D Animated Character Form"
          className="visme-iframe-container"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
            pointerEvents: "auto",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />

        {/* Seamless Overlay: Replaces 'Register Now' & workshop inputs with 'Login' & Supabase Admin fields */}
        <div
          className="visme-login-overlay"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "55%",
            height: "100%",
            background: "#ea793f",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px 40px",
            zIndex: 25,
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "100%", maxWidth: "380px" }}>
            {/* Header: Exact styled 'Login' title matching the reel style */}
            <div style={{ textAlign: "center", marginBottom: "26px" }}>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "40px",
                  fontWeight: 500,
                  color: "#ffffff",
                  letterSpacing: "0.02em",
                  margin: "0 0 10px 0",
                  textShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              >
                Login
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-body, system-ui)",
                  fontSize: "13.5px",
                  color: "rgba(255, 255, 255, 0.95)",
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                Fill in your admin credentials to enter verified dashboard
              </p>
            </div>

            {/* Login Form: Styled identically to Visme's rounded input fields */}
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Email Field */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#ededee",
                  borderRadius: "10px",
                  padding: "4px 14px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.12)",
                }}
              >
                <Mail className="w-5 h-5 shrink-0" style={{ color: "#ea793f", marginRight: "12px" }} />
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--font-body, system-ui)",
                    fontSize: "15px",
                    color: "#27272a",
                    padding: "12px 0",
                  }}
                />
              </div>

              {/* Password Field */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#ededee",
                  borderRadius: "10px",
                  padding: "4px 14px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.12)",
                }}
              >
                <Lock className="w-5 h-5 shrink-0" style={{ color: "#ea793f", marginRight: "12px" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--font-body, system-ui)",
                    fontSize: "15px",
                    color: "#27272a",
                    padding: "12px 0",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#71717a",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Submit Button: Matches the solid black 'NEXT' button from Visme */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: "6px",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#09090b",
                  color: "#ffffff",
                  fontFamily: "var(--font-body, system-ui)",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#18181b")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#09090b")}
              >
                <span>LOGIN</span>
                <LogIn className="w-4 h-4" />
              </button>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "8px",
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  color: "rgba(255, 255, 255, 0.75)",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                Dhananjaya Portfolio Admin Portal
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Fallback Direct Credentials Modal */}
      {showAdminModal && (
        <div
          className="auth-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAdminModal(false);
          }}
        >
          <div className="login-glass-card" style={{ maxWidth: "420px", position: "relative" }}>
            {/* Modal Close Button */}
            <button
              onClick={() => setShowAdminModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: "0 0 6px 0",
                }}
              >
                Direct Sign In
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Enter your Supabase email and password
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10.5px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.55)",
                    marginBottom: "6px",
                  }}
                >
                  Admin Email
                </label>
                <div className="glass-input-wrapper">
                  <Mail
                    className="w-4 h-4 shrink-0"
                    style={{ marginLeft: "14px", color: "rgba(255, 255, 255, 0.45)" }}
                  />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="glass-input-field"
                    style={{ fontSize: "13px", padding: "12px 14px" }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10.5px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.55)",
                    marginBottom: "6px",
                  }}
                >
                  Password
                </label>
                <div className="glass-input-wrapper">
                  <Lock
                    className="w-4 h-4 shrink-0"
                    style={{ marginLeft: "14px", color: "rgba(255, 255, 255, 0.45)" }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="glass-input-field"
                    style={{ fontSize: "13px", padding: "12px 14px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      background: "transparent",
                      border: "none",
                      marginRight: "14px",
                      color: "rgba(255, 255, 255, 0.45)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="glass-action-btn"
                style={{ marginTop: "4px", padding: "12px 20px" }}
              >
                {loading ? (
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#ffffff",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                ) : (
                  <>
                    <span>Enter Dashboard</span>
                    <LogIn className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
