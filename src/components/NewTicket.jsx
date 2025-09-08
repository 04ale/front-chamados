import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

function NewTicket({ onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const { user } = useAuth();

  async function createTicket() {
    try {
      await api.post(
        "/tickets",
        {
          title,
          description,
          priority,
          status: open,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert("Ticket criado com sucesso!");
    } catch (error) {
      console.log("ERRO: ", error);
    }
  }

  useEffect(() => {
    console.log(priority);
  }, [priority]);

  return (
    <div className="h-screen w-screen fixed bg-black/60 flex justify-center items-center">
      <X
        onClick={onClose}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
      <div className="max-sm:w-[340px] sm:w-[450px] mx-auto h-[460px] text-white bg-[#3d1f2c] rounded-lg p-6">
        <div className="flex flex-col  mb-10">
          <h1 className="text-2xl font-bold ">Criar Ticket</h1>
          <p className="text-sm text-[#c4bab3]">
            Crie um novo ticket de chamado para a equipe de suporte.
          </p>
        </div>
        <form className="grid gap-4" onSubmit={createTicket}>
          <div className="grid gap-2 ">
            <label className="text-sm  font-medium"> Título</label>
            <input
              type="text"
              className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2 ">
            <label className="text-sm font-medium "> Descrição</label>
            <textarea
              className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none  text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2 ">
            <label className="text-sm font-medium  "> Prioridade</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none  text-sm"
            >
              <option value="low" className="rounded-lg">
                Baixa
              </option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none  text-sm cursor-pointer hover:bg-[#8B4571] duration-300 transition-all"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTicket;
