import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logoVinho.png";
import banner from "../../assets/img/banner.png";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "sonner";
import ResetPassword from "../modals/resetPassword/ResetPassword";
import CodePassword from "../modals/resetPassword/CodePassword";
import NewPassword from "../modals/resetPassword/NewPassword";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("")
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);

      try {
        nav("/");
      } catch (error) {
        console.error("Erro Firebase:", error);
        toast("Erro ao se conectar");
        nav("/");
      }
    } catch (apiError) {
      console.error("Erro de login na API:", apiError);
      toast.error("Email ou senha inválidos.", {
        position: "bottom-left",
        duration: 3000,
        style: { background: "#FFFBF5", color: "#5A2C40" },
      });
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
              className="px-7 cursor-pointer font-semibold p-4 bg-[#5A2C40] duration-300 transition-all hover:bg-[#8B4571] text-white rounded-lg"
            >
              Login
            </button>
            <p
              className="text-sm text-[#8C847E] hover:text-[#6e6964] duration-300 transition-all cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Esqueceu a senha?
            </p>
          </div>
        </div>
      </form>
      <div className="max-lg:hidden lg:w-1/2 h-screen">
        <img src={banner} className="h-full w-full " />
      </div>
      {isModalOpen && (
        <ResetPassword
          closeModal={() => setIsModalOpen(false)}
          setCode={setCode}
          openCodeModal={() => setIsCodeModalOpen(true)}
          setEmail={setResetEmail}
          email={resetEmail}
        />
      )}
      {isCodeModalOpen && (
        <CodePassword
          closeModal={() => setIsCodeModalOpen(false)}
          code={code}
          openResetModal={() => setIsResetModalOpen(true)}
        />
      )}
      {isResetModalOpen && <NewPassword closeModal={()=> setIsResetModalOpen(false)} email={resetEmail}/>}
    </div>
  );
}

export default SignIn;
