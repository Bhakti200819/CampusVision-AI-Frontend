
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShieldCheck, UserPlus } from "lucide-react";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "teacher",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://campusvision-ai-backend.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      alert("Account created successfully!");
      navigate("/login");

    } catch (err) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cv-register-page">
      <div className="cv-register-card">
        <div className="cv-register-icon">
          <UserPlus size={28} />
        </div>

        <h1>Create Account</h1>
        <p className="cv-register-subtitle">
          Join the CampusVision AI platform
        </p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Account Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            minLength="8"
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            minLength="8"
            required
          />

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: "13px" }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="cv-register-login">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>

        <div className="cv-register-security">
          <ShieldCheck size={16} />
          CampusVision AI Account Portal
        </div>
      </div>
    </div>
  );
}

export default Register;
