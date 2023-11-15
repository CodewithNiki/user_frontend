import useAuth from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { handleUserLogout, accessToken } = useAuth();
  const navigate = useNavigate(); 

  const logout = () =>{
    handleUserLogout();
    navigate("/login")
  }

  return <button onClick={logout} className=" text-slate-50 border bg-green-400 px-2 py-1 border-green-400">{accessToken ? "Logout" : "Login"}</button>;
};

export default Logout;
