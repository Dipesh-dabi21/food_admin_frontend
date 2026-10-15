import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";

export default function LoginForm({ onLogin, loading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="brand">
          <span className="brand-icon">
            <UtensilsCrossed />
          </span>
          crave<span className="orange">.</span>
          <span className="admin-tag">ADMIN</span>
        </div>

        <div className="eyebrow">OPERATIONS PORTAL</div>
        <h1>Welcome back.</h1>
        <p>Sign in to manage orders and keep every delivery moving.</p>

        <label>
          Email address
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
          />
        </label>

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        <button className="primary full" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in to dashboard →"}
        </button>

        <small className="security-note">
          Admin access is controlled by server-side credentials.
        </small>
      </form>
    </div>
  );
}
