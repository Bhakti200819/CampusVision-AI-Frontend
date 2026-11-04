
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import {
  BrainCircuit,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://campusvision-ai-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            email: email.trim(),
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Invalid email or password"
        );
      }

      if (!data.access_token) {
        throw new Error("Authentication token not received");
      }

      // Save authentication token
      localStorage.setItem(
        "campusvision_token",
        data.access_token
      );

      // Save logged-in user details
      localStorage.setItem(
        "campusvision_user",
        JSON.stringify({
          user_id: data.user_id,
          full_name: data.full_name,
          email: data.email,
          role: data.role
        })
      );

      // Role-based navigation
      if (data.role === "teacher") {
        navigate("/portal");
      } else if (
        data.role === "admin" ||
        data.role === "principal"
      ) {
        navigate("/portal");
      } else {
        throw new Error("Unauthorized user role");
      }

    } catch (err) {
      if (err instanceof TypeError) {
        setError("Unable to connect to server. Please try again.");
      } else {
        setError(err.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cv-login-page">

      <nav className="cv-login-nav">
        <Link to="/" className="cv-login-brand">
          <BrainCircuit size={30} />
          <span>CampusVision <b>AI</b></span>
        </Link>

        <Link to="/" className="cv-back-home">
          Back to Website
        </Link>
      </nav>

      <main className="cv-login-main">

        <section className="cv-login-info">
          <span className="cv-login-eyebrow">
            <ShieldCheck size={16} />
            SECURE SOFTWARE PORTAL
          </span>

          <h1>
            Welcome to
            <span> Intelligent Campus.</span>
          </h1>

          <p>
            Access your classroom monitoring dashboard,
            AI detection insights and centralized management
            platform from one secure workspace.
          </p>

          <div className="cv-login-benefits">
            <div><ShieldCheck /> Secure Portal Access</div>
            <div><BrainCircuit /> AI-Powered Monitoring</div>
            <div><BrainCircuit /> Centralized Dashboard</div>
          </div>
        </section>

        <section className="cv-login-card">

          <div className="cv-login-card-icon">
            <LockKeyhole size={25} />
          </div>

          <h2>Portal Login</h2>

          <p className="cv-login-subtitle">
            Sign in to access your workspace
          </p>

          <form onSubmit={handleLogin}>

            <label>Email Address</label>

            <div className="cv-login-input">
              <Mail size={18} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label>Password</label>

            <div className="cv-login-input">
              <LockKeyhole size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="cv-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="cv-login-options">
              <label className="cv-remember">
                <input type="checkbox" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="cv-forgot-link"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "13px" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="cv-submit-login"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In to Portal"}
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="cv-login-register">
            Don't have an account?
            <Link to="/register"> Create Account</Link>
          </p>

          <div className="cv-login-security">
            <ShieldCheck size={16} />
            Protected CampusVision AI Workspace
          </div>

        </section>
      </main>

      <footer className="cv-login-footer">
        © 2026 CampusVision AI · Smart Classroom Mobile Detection System
      </footer>

    </div>
  );
}

export default Login;
