// components/LoginForm.jsx
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOGIN_USER } from "../mutations/userMutations"; // You'll need to create this
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const { data } = await loginUser({
        variables: {
          email: form.email,
          password: form.password,
        },
      });

      // The loginUser mutation returns a JWT token
      const token = data.loginUser;
      
      // You might want to store the token and decode it to get user info
      // For now, we'll create a simple user object
      const user = {
        email: form.email,
        token: token,
      };

      login(user);
      navigate("/"); // Redirect to home
    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;