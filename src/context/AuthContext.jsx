import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

   useEffect(() => {
    try {
      const storedData = localStorage.getItem("authData");
      if (storedData) {
        const authData = JSON.parse(storedData);
        
        if (authData.expiration && authData.expiration < Date.now()) {
          console.log("Token expirado.");
          localStorage.removeItem("authData");
          setUser(null);
        } else {
          setUser(authData);
        }
      }
    } catch (error) {
      console.error("Erro ao processar dados de autenticação:", error);
      localStorage.removeItem("authData");
      setUser(null);
    } finally {
      setLoading(false);
    }
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