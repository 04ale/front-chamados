import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem("authData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); 
  }, []);

  const login = (userData) => {
  if (userData?.token) {
    try {
      const decodedToken = jwtDecode(userData.token);
      
      const expirationTime = decodedToken.exp * 1000;

      const dataToStore = {
        ...userData,
        expiration: expirationTime,
      };

      localStorage.setItem("authData", JSON.stringify(dataToStore));

      setUser(dataToStore);

    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  }
};

  const logout = () => {
    localStorage.removeItem("authData");
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn: !!user, 
    isAdmin: user?.role === "admin",
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};