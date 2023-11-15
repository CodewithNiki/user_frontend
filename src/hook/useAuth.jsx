import { useContext } from "react";
import { AuthUserContext } from "../context/auth";

const useAuth = () => {
  return useContext(AuthUserContext)
}

export default useAuth