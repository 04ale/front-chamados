import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logoVinho.png";
import banner from "../../assets/img/banner.png";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAdmin } = useAuth();
  const nav = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });

      login(response.data);

      nav("/");
    } catch (err) {
      console.error("Erro de login:", err);
    }
  };

  return (
    <div className="max-lg:w-[320px] w-full flex flex-row items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-12 items-center lg:w-1/2"
      >
        <div className="lg:w-[380px] flex flex-col gap-10">
          <img src={logo} alt="" />
          <div className="flex flex-col gap-8 items-center w-full ">
            <h1 className="text-4xl font-bold text-[#5A2C40]">LOGIN</h1>
            <div className="flex flex-col w-full gap-4">
              <input
                className="bg-[#5A2C40]/20 p-4 w-full rounded-2xl"
                type="email"
                placeholder="E-mail:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-[#5A2C40]/20 p-4 w-full rounded-2xl"
                type="password"
                placeholder="Senha:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-7 cursor-pointer font-semibold p-4 bg-[#5A2C40] hover:bg-[#8B4571] text-white rounded-2xl"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <div className="max-lg:hidden lg:w-1/2 h-screen">
        <img src={banner} className="h-full w-full " />
      </div>
    </div>
  );
}

export default SignIn;
