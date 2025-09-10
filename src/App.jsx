import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";
import Users from "./pages/Users";
import Closed from "./pages/Closed";

function App() {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to='/'/> : <Login /> } />
      <Route path="/register" element={isAdmin ? <Register />  : <Navigate to='/'/> } />
      <Route path="/" element={!isLoggedIn ? <Navigate to='/login'/> : <Home /> } />
      <Route path="/closed" element={!isAdmin ? <Navigate to='/login'/> : <Closed /> } />
      <Route path="/users" element={isAdmin ? <Users />  : <Navigate to='/'/> } />

    </Routes>
  );
}

export default App;
