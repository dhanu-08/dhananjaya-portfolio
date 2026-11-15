import { useState } from "react";
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
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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
    <div className="login-glass-page">
      {/* Background Animated Ambient Gradient Orbs */}
      <div className="glass-ambient-orb glass-orb-1" />
      <div className="glass-ambient-orb glass-orb-2" />
      <div className="glass-ambient-orb glass-orb-3" />

      {/* Main Stage with Character Leaning on Glass Card */}
      <div className="login-stage-container">
        
        {/* Animated 3D Character Leaning on Card */}
        <div className="character-side-wrapper">
          <img
            src="./leaning-character.png"
            alt="Admin Assistant"
            className="character-figure"
          />
          <div className="character-shadow" />
        </div>

        {/* Frosted Glass Login Card */}
        <div className="login-glass-card">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                marginBottom: "14px",
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

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                margin: "0 0 8px 0",
              }}
            >
              Sign In Now
            </h1>

            <p
              style={{
                fontSize: "13.5px",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Enter your credentials to manage verified portfolio assets
            </p>
          </div>

          {/* Error Message Toast */}
          {errorMessage && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 14px",
                borderRadius: "12px",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
                fontSize: "12.5px",
                marginBottom: "20px",
              }}
            >
              <AlertCircle className="w-4 h-4 shrink-0" style={{ color: "#ef4444" }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            
            {/* Email Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.55)",
                  marginBottom: "8px",
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
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.55)",
                  marginBottom: "8px",
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

            {/* Action Next / Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="glass-action-btn"
              style={{ marginTop: "6px" }}
            >
              {loading ? (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#ffffff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              ) : (
                <>
                  <span>NEXT</span>
                  <LogIn className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Back to Portfolio Link */}
            <div style={{ textAlign: "center", marginTop: "12px" }}>
              <Link
                to="/"
                style={{
                  fontSize: "12.5px",
                  color: "rgba(255, 255, 255, 0.5)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.5)")}
              >
                ← Return to Portfolio
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
