
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  Mail,
  ArrowLeft,
  ShieldCheck,
  Send
} from "lucide-react";

import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="cv-forgot-page">

      <nav className="cv-forgot-nav">
        <Link to="/" className="cv-forgot-brand">
          <BrainCircuit size={30} />
          <span>CampusVision <b>AI</b></span>
        </Link>

        <Link to="/login" className="cv-forgot-back">
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </nav>

      <main className="cv-forgot-main">

        <section className="cv-forgot-card">

          <div className="cv-forgot-icon">
            <Mail size={28} />
          </div>

          <span className="cv-forgot-label">
            ACCOUNT RECOVERY
          </span>

          <h1>Forgot Password?</h1>

          <p className="cv-forgot-description">
            Don't worry! Enter your registered email address
            to begin the password recovery process.
          </p>

          {submitted ? (
            <div className="cv-forgot-success">
              <ShieldCheck size={25} />
              <h3>Request Submitted</h3>
              <p>
                Password recovery request received for {email}.
                Email delivery will be enabled after backend integration.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              <label>Registered Email Address</label>

              <div className="cv-forgot-input">
                <Mail size={18} />

                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit">
                Send Reset Request
                <Send size={17} />
              </button>

            </form>
          )}

          <Link to="/login" className="cv-forgot-login">
            <ArrowLeft size={16} />
            Return to Sign In
          </Link>

          <div className="cv-forgot-security">
            <ShieldCheck size={16} />
            CampusVision AI Account Security
          </div>

        </section>

      </main>

      <footer className="cv-forgot-footer">
        © 2026 CampusVision AI · Smart Classroom Mobile Detection System
      </footer>

    </div>
  );
}

export default ForgotPassword;
