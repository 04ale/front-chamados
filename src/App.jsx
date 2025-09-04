import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to='/'/> : <Login /> } />
      {/*<Route path="/register" element={isAdmin ? <Register />  : <Navigate to='/'/> } />*/}
      <Route path="/" element={!isLoggedIn ? <Navigate to='/login'/> : <Home /> } />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default App;
