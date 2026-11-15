import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Lock,
  LogIn,
  Sparkles,
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

  // Listen for login messages from the 3D animated Visme form
  useEffect(() => {
    const handleVismeLogin = async (event) => {
      if (typeof event.data === "object" && event.data?.type === "VISME_ADMIN_LOGIN") {
        const submittedEmail = event.data?.email;
        const submittedPassword = event.data?.password;

        if (!submittedEmail || !submittedPassword) {
          setErrorMessage("Please enter both Admin Email and Password.");
          return;
        }

        setEmail(submittedEmail);
        setPassword(submittedPassword);
        setLoading(true);
        setErrorMessage("");

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: submittedEmail,
            password: submittedPassword,
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
          }, 800);
        } catch (err) {
          setErrorMessage(err?.message || "An unexpected error occurred. Please try again.");
          setLoading(false);
        }
      }
    };

    window.addEventListener("message", handleVismeLogin);
    return () => window.removeEventListener("message", handleVismeLogin);
  }, [navigate]);

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
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
      }, 500);
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
            <span>Manual Sign In</span>
          </button>
        </div>
      </nav>

      {/* Main Glass Frame Containing Exact Visme 3D Animated Login Form */}
      <div className="visme-form-glass-card">
        <iframe
          src="./visme-login.html"
          title="3D Animated Login Form"
          className="visme-iframe-container"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
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
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  marginBottom: "12px",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#f87171" }} />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "#fca5a5",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Admin Credentials
                </span>
              </div>

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
            <form onSubmit={handleManualLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Email Field */}
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
                  <User
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

              {/* Password Field */}
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

              {/* Action Button */}
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
