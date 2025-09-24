import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logoVinho.png";
import banner from "../../assets/img/banner.png";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { user } = useAuth();

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const res = await api.post(
        "/auth/register",
        { name, email, role: "user" },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      await createUserWithEmailAndPassword(auth, email, res.data.senha);
      console.log(
        "Senha do " + res.data.user.name + ": " + res.data.senha
      );
      toast.success(
        "Usuário cadastrado com sucesso!\n" + "Senha: " + res.data.senha
      );
      setEmail("");
      setName("");
    } catch (error) {
      toast.error("Erro", error);
    }
  };

  return (
    <div className="max-lg:w-[320px] w-full flex flex-row items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-12 items-center lg:w-1/2"
      >
        <div className="lg:w-[380px] flex flex-col gap-10">
          <img src={logo} alt="" />
          <div className="flex flex-col gap-8 items-center w-full ">
            <h1 className="text-4xl font-bold text-[#5A2C40]">CADASTRO</h1>
            <div className="flex flex-col w-full gap-4">
              <input
                className="bg-[#5A2C40]/20 p-4 w-full rounded-2xl"
                type="text"
                placeholder="Nome:"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="bg-[#5A2C40]/20 p-4 w-full rounded-2xl"
                type="email"
                placeholder="E-mail:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-7 cursor-pointer font-semibold p-4 bg-[#5A2C40] hover:bg-[#8B4571] duration-300 transition-all text-white rounded-lg"
            >
              Cadastrar
            </button>
            <p>
              <Link
                to="/login"
                className="text-[#5A2C40] font-semibold cursor-pointer"
              >
                Voltar
              </Link>
            </p>
          </div>
        </div>
      </form>
      <div className="max-lg:hidden lg:w-1/2 h-screen">
        <img src={banner} className="h-full w-full " />
      </div>
    </div>
  );
}

export default SignUp;
