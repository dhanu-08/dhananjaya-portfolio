import { useState, useEffect } from "react";
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
  Sparkles,
} from "lucide-react";

export default function Login() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Listen for Visme Form events if submitted
  useEffect(() => {
    const handleVismeMessage = (event) => {
      if (typeof event.data === "object" && (event.data?.type === "vismeForms:submitSuccess" || event.data?.type === "VISME_ADMIN_LOGIN")) {
        setShowAdminModal(true);
      }
    };
    window.addEventListener("message", handleVismeMessage);
    return () => window.removeEventListener("message", handleVismeMessage);
  }, []);

  const handleManualLogin = async (e) => {
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

      navigate("/dashboard");
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

      {/* Top Glass Navigation Controls */}
      <nav className="visme-glass-nav">
        <Link to="/" className="visme-glass-pill">
          <span>← Return to Portfolio</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setShowAdminModal(true)}
            className="visme-glass-pill highlight"
            title="Sign in with Supabase Admin Credentials"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In to Dashboard</span>
          </button>
        </div>
      </nav>

      {/* Main Glass Frame Containing Exact Visme 3D Animated Form */}
      <div className="visme-form-glass-card">
        <iframe
          src="https://forms.visme.co/formsPlayer/_embed/vm881x4j-workshop-registration-form?fullPage=true&embedIframeId=1"
          title="3D Animated Character Form"
          className="visme-iframe-container"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* Direct Supabase Admin Credentials Modal */}
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
                  Admin Portal
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
                Dashboard Sign In
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Enter your Supabase admin credentials to access your dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleManualLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
