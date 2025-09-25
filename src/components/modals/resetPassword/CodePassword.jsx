import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function CodePassword({ closeModal, code, openResetModal }) {
  const [inputCode, setInputCode] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        if (code === inputCode) {
            closeModal();
            openResetModal();
            return;
        }
        setInputCode('');
        toast.error("Código errado, tente novamente")
    } catch (error) {
        toast.error("Erro ao verificar código")
        console.error("ERRO AO VERIFICAR CÓDIGO", error)
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center z-30">
      <X
        onClick={closeModal}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
      <div className="max-sm:mx-[20px] sm:mx-[40px] md:mx-[60px] lg:w-[700px] max-h-[80vh] overflow-auto scrollbar-hide text-[#5A2C40] bg-[#FFFBF5] rounded-lg p-6 flex flex-col gap-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Verificação de e-mail</h2>
          <p className="text-sm text-[#5A2C40]/70 mt-1">
            Enviamos um código de 6 dígitos para o seu e-mail.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-6"
        >
          <input
            type="tel"
            maxLength="6"
            pattern="[0-9]*"
            placeholder="------"
            value={inputCode}
            onChange={(e) => {
              const rawValue = e.target.value;
              const numericValue = rawValue.replace(/[^0-9]/g, "");
              const finalValue = numericValue.slice(0, 6);
              setInputCode(finalValue);
            }}
            className="w-full max-w-[280px] sm:max-w-[320px] p-3 bg-transparent border-2 border-[#5A2C40]/40 rounded-lg text-center text-3xl sm:text-4xl font-mono font-bold tracking-[0.5em] indent-[0.5em] focus:outline-none focus:border-[#5A2C40] focus:ring-2 focus:ring-[#5A2C40]/50 transition-all duration-200 placeholder-gray-400"
          />
          <button
            type="submit"
            className="
              w-full max-w-xs
              py-2 px-4
              bg-[#5A2C40] text-white
              font-semibold rounded-lg
              cursor-pointer
              hover:bg-[#8B4571]
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4571]
              transition-colors duration-200
            "
          >
            Verificar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CodePassword;
