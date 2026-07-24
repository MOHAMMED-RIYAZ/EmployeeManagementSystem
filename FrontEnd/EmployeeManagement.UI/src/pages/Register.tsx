import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "User",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(user);
      toast.success("Registration successful");
      navigate("/");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3>Register</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <select
            className="form-control mb-3"
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <button className="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  );
}
