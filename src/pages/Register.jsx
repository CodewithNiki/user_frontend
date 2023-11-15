import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  // Function to handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();

    const registrationData = { username, email, password };

    try {
      const response = await axios.post("https://user-fgrs.onrender.com/api/users/register", registrationData);
      console.log("User registered:", response.data);
      setError(null);
      navigate("/")
      // Optionally, handle success and redirect the user
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during registration.");
      }
    }
  };

  return (
    <form className=" border-4 border-cyan-600 text-white p-12 rounded" onSubmit={handleRegistration}>
      <FaUser className=" text-6xl text-slate-50 rounded-full mx-auto bg-slate-200" />
      <p className=" text-lg text-center mt-2">Create a user</p>
      <div className=" flex items-center gap-4 my-4 relative">
        <FaUser className=" text-lg absolute -left-6 " />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className=" bg-transparent border-2 outline-none py-2 px-4  "
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
        />
      </div>
      <div className=" flex items-center gap-4 my-4 relative">
        <FaEnvelope className=" text-lg absolute -left-6 " />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          className=" bg-transparent border-2 outline-none py-2 px-4  "
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4 relative">
        <FaLock className=" absolute -left-6" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className=" bg-transparent border-2 outline-none py-2 px-4 mb-4 "
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className=" text-cyan-400 text-right my-6"></div>
      <button className=" border-2 border-cyan-400 py-2 w-full cursor-pointer hover:bg-cyan-400 hover:text-gray-800">
        Register
      </button>
    </form>
  );
};

export default Register;
