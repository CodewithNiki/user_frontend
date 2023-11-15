import { createContext, useEffect, useState } from "react";

export const AuthUserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const handleUserLogout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken", accessToken);
    setError(null);
  };

  const valueToShare = {
    accessToken,
    setAccessToken,
    handleUserLogout,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
  };

  return (
    <AuthUserContext.Provider value={valueToShare}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthProvider;
