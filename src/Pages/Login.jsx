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
} from "lucide-react";

export default function Login() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Listen for Visme Form postMessage events if submitted
  useEffect(() => {
    const handleVismeMessage = (event) => {
      if (typeof event.data === "object" && event.data?.type === "vismeForms:submitSuccess") {
        setShowAdminModal(true);
      }
    };
    window.addEventListener("message", handleVismeMessage);
    return () => window.removeEventListener("message", handleVismeMessage);
  }, []);

  const handleLogin = async (e) => {
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

      {/* Top Glass Navigation Controls */}
      <nav className="visme-glass-nav">
        <Link to="/" className="visme-glass-pill">
          <span>← Return to Portfolio</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setShowAdminModal(true)}
            className="visme-glass-pill highlight"
            title="Open Supabase Admin Credentials Sign In"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In to Admin Dashboard</span>
          </button>
        </div>
      </nav>

      {/* Main Glass Frame Containing Exact Visme 3D Animated Form */}
      <div className="visme-form-glass-card">
        {/* Exact Visme 3D Character Animated Form Embed */}
        <iframe
          src="https://forms.visme.co/formsPlayer/_embed/vm881x4j-workshop-registration-form?fullPage=true&embedIframeId=1"
          title="Workshop Registration Form"
          className="visme-iframe-container"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* Supabase Admin Direct Login Modal */}
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
                  Admin Workspace
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
                Supabase Sign In
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Enter your credentials to manage certificates and projects
              </p>
            </div>

            {/* Error Message Toast */}
            {errorMessage && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#fca5a5",
                  fontSize: "12px",
                  marginBottom: "18px",
                }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" style={{ color: "#ef4444" }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
