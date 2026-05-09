import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
             console.log("LOGIN RESPONSE:", data);


      // 🔥 YAHI IMPORTANT LINE HAI
      localStorage.setItem("token", data.token);

      alert("Login successful ✅");
        

      window.location.href = "/admin";
    } catch (error) {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-6 border rounded-xl w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginHandler}
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}