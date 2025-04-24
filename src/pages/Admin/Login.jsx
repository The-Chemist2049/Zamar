import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Updated CSS filename to match component

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Login submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://zamarsolutions.co.ke/Zamar/api/admin-login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>
          Zamar Solutions <br />
          Admin Login
        </h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
