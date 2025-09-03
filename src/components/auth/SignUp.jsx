import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo1.png";
import banner from "../../assets/img/banner.png";
import api from "../../services/api";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");


  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      await api.post("/auth/register", { name, email, role: "user" });
      alert("Usuário cadastrado com sucesso!")
      setEmail('')
      setName('')

    } catch (error) {
      alert("Erro", error)
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
            <h1 className="text-4xl font-bold text-[#17A2B8]">CADASTRO</h1>
            <div className="flex flex-col w-full gap-4">
              <input
                className="bg-[#17A2B8]/10 p-4 w-full rounded-2xl"
                type="text"
                placeholder="Nome:"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="bg-[#17A2B8]/10 p-4 w-full rounded-2xl"
                type="email"
                placeholder="E-mail:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
            </div>
            <button
              type="submit"
              className="px-7 cursor-pointer font-semibold p-4 bg-[#17A2B8] hover:bg-[#13b8d1] text-white rounded-2xl"
            >
              Cadastrar
            </button>
            <p>
              <Link
                to="/login"
                className="text-[#17A2B8] font-semibold cursor-pointer"
              >
                Fazer login
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
