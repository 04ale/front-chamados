import { toast } from "sonner";
import { useState } from "react";
import { X } from "lucide-react";
import api from "@/services/api";

function ResetPassword({
  closeModal,
  setCode,
  openCodeModal,
  setEmail,
  email,
}) {
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/users/password", {
        email: email,
      });
      setCode(res.data.code);
      console.log("RESPOSTA DO BACKEND: ", res);
    } catch (error) {
      console.error("Falha na requisição:", error.response || error);

      const errorMessage =
        error.response?.data?.message ||
        "Não foi possível conectar ao servidor.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
    closeModal();
    openCodeModal();
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center z-30">
      <X
        onClick={closeModal}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
      <div className="max-sm:mx-[20px] sm:mx-[40px] md:mx-[60px] lg:w-[700px] max-h-[80vh] overflow-auto scrollbar-hide text-[#5A2C40] bg-[#FFFBF5] rounded-lg p-6">
        <form
          onSubmit={handlePasswordReset}
          className="flex flex-col gap-6 items-center"
        >
          <div className="flex gap-2 items-center flex-col">
            <h2 className="text-3xl font-bold">Redefinir Senha</h2>
            <p className="text-[#8C847E]">
              Digite seu e-mail e enviaremos um link para você voltar a acessar
              sua conta.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full items-center sm:w-[400px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              required
              className="border border-[#5A2C40]/50 rounded-md py-1 px-4 text-xl w-full duration-300 transition-all focus:outline-none focus:border-[#5A2C40] focus:ring-2 focus:ring-[#5A2C40]/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#5A2C40] hover:bg-[#8B4571] font-semibold duration-300 transition-all text-white rounded-lg py-2 sm:w-[300px] max-sm:w-full cursor-pointer"
            >
              {loading ? "Enviando..." : "Enviar link de redefinição"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
