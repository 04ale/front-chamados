import { useAuth } from "@/hooks/useAuth";
import api from "@/services/api";
import { auth } from "@/services/firebaseConfig";
import { updatePassword } from "firebase/auth";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function NewPassword({ closeModal, email }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("As senhas não coincidem!");
      return;
    }
    if (password.length < 6) {
      toast.warning("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    const user = await api.get(`/users/${email}`);
    const userId = user.data.user.id;

    await api.patch(`/users/${userId}`, {
      password: password || undefined,
    });

    closeModal();
    toast.success("Senha alterada com sucesso!");
    console.log("Nova senha:", password);
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center z-30">
      <X
        onClick={closeModal}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />

      <div className="w-full max-w-md mx-4 max-h-[80vh] overflow-auto scrollbar-hide text-[#5A2C40] bg-[#FFFBF5] rounded-lg p-6 sm:p-8 flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Crie sua Nova Senha</h2>
          <p className="text-sm text-[#5A2C40]/70 mt-1">
            A senha deve ter no mínimo 6 caracteres.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nova senha"
              className="
                w-full p-3 // pr-10 removido
                bg-transparent
                border-2 border-[#5A2C40]/40 rounded-lg
                focus:outline-none focus:border-[#5A2C40] focus:ring-1 focus:ring-[#5A2C40]
                transition-colors duration-200
              "
            />
          </div>

          <div className="w-full">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a nova senha"
              className="
                w-full p-3
                bg-transparent
                border-2 border-[#5A2C40]/40 rounded-lg
                focus:outline-none focus:border-[#5A2C40] focus:ring-1 focus:ring-[#5A2C40]
                transition-colors duration-200
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full mt-2 py-3 px-4
              bg-[#5A2C40] text-white
              font-semibold rounded-lg
              hover:bg-[#8B4571]
              cursor-pointer
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Salvar Nova Senha
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
