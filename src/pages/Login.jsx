import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hook/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const {
    setAccessToken,
    email,
    password,
    error,
    setError,
    setEmail,
    setPassword,
  } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        "https://user-fgrs.onrender.com/api/users/login",
        loginData
      );

      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        setError(null);
        navigate("/contacts");
      }
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message);
      console.error("Error:", error.response.data.message);
    }
  };

  return (
    <form
      className=" border-4 border-cyan-600 text-white p-12 rounded"
      onSubmit={login}
    >
      <FaUser className=" text-6xl text-slate-50 rounded-full mx-auto bg-slate-200" />
      <p className=" text-lg text-center mt-2">Welcome Back</p>
      <div className=" flex items-center gap-4 my-4 relative">
        <FaEnvelope className=" text-lg absolute -left-6" />
        <input
          type="text"
          placeholder="Email ID"
          className=" bg-transparent border-2 outline-none py-2 px-4"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4 relative">
        <FaLock className=" absolute -left-6 " />
        <input
          type="password"
          placeholder="Password"
          className=" bg-transparent border-2 outline-none py-2 px-4"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className=" text-cyan-400 text-right my-4 ">
        <Link to="/register" className=" cursor-pointer">
          Register me
        </Link>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {loading ? (
        <button className=" border-2 border-cyan-400 py-2 w-full cursor-pointer hover:bg-cyan-400 hover:text-gray-800">
          Loading..
        </button>
      ) : (
        <button className=" border-2 border-cyan-400 py-2 w-full cursor-pointer hover:bg-cyan-400 hover:text-gray-800">
          Login
        </button>
      )}
    </form>
  );
};

export default Login;
