// Importe as funções necessárias no topo do seu arquivo
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner"; // ou sua biblioteca de toasts
import { useState } from "react";
import { X } from "lucide-react";

function ResetPassword({ closeModal }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);

      toast.success(
        "Link de redefinição enviado! Verifique sua caixa de entrada e a pasta de spam."
      );
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.success(
          "Se este e-mail estiver cadastrado, um link de redefinição será enviado."
        );
      } else {
        toast.error("Ocorreu um erro: " + error.message);
      }
      console.error("Erro ao enviar e-mail de redefinição:", error);
    } finally {
      setLoading(false);
    }
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
            <p className="text-gray-400">
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
              className="border border-[#5A2C40]/40 rounded-md py-1 px-4 text-xl w-full"
            />
            <button type="submit" disabled={loading} className="bg-[#5A2C40] hover:bg-[#8B4571] font-semibold duration-300 transition-all text-white rounded-lg py-2 sm:w-[300px] max-sm:w-full cursor-pointer">
              {loading ? "Enviando..." : "Enviar link de redefinição"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
