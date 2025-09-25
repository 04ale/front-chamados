import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { getAuth, getIdTokenResult, signInWithCustomToken } from "firebase/auth";
import api from "@/services/api";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const loginToFirebase = async () => {
  try {

    const res = await api.get('/users/generate-firebase-token');
    const firebaseToken = res.data.firebaseToken;

    const auth = getAuth();
    await signInWithCustomToken(auth, firebaseToken);
    
    console.log("Login no Firebase realizado com sucesso!");

  } catch (error) {
    console.error("Falha no login com token customizado do Firebase:", error);
  }
};

   useEffect(() => {
    const initAuth = async () => {
      try {
        const storedData = localStorage.getItem("authData");
        if (storedData) {
          const authData = JSON.parse(storedData);
          
          if (authData.expiration && authData.expiration < Date.now()) {
            localStorage.removeItem("authData");
            setUser(null);
          } else {
            setUser(authData);
            await loginToFirebase(); 
          }
        }
      } catch (error) {
        console.error("Erro ao processar dados de autenticação:", error);
        localStorage.removeItem("authData");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  

  const login = async (userData) => {
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
      await loginToFirebase()

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