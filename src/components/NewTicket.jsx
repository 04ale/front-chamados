import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

function NewTicket({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  

  const { user } = useAuth();
  const status = "aberto";
  async function createTicket(e) {
    try {
      e.preventDefault();
      console.log({
        title,
        description,
        priority,
        status,
      });
      await api.post(
        "/tickets",
        {
          title,
          description,
          priority,
          status,
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

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      console.log("Arquivo solto:", e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      setFiles([...files, file]);
      console.log("FILES:", files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log("FILE", selectedFile);
      setFiles(prevFiles => [...prevFiles, selectedFile]);
    }
  };

  useEffect(() => {
    console.log("Estado FILES atualizado:", files);
}, [files]);
  useEffect(() => {
    console.log(priority);
  }, [priority]);


  return (
    <div className="h-screen w-screen fixed bg-black/60 flex justify-center items-center z-50">
      <X
        onClick={onClose}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
      <div className="max-sm:w-[340px] sm:w-[450px] mx-auto h-[610px] text-white bg-[#3d1f2c] rounded-lg p-6">
        <div className="flex flex-col  mb-10">
          <h1 className="text-2xl font-bold ">Criar Ticket</h1>
          <p className="text-sm text-[#c4bab3]">
            Crie um novo ticket de chamado para a equipe de suporte.
          </p>
        </div>
        <form className="grid gap-4" onSubmit={createTicket}>
          <div className="grid gap-2 ">
            <label className="text-sm font-medium"> Título</label>
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
              className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2 ">
            <label className="text-sm font-medium  "> Prioridade</label>
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
              className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none text-sm"
            >
              <option value="low" className="rounded-lg">
                Baixa
              </option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="text-sm font-medium">Imagem</p>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="w-full py-2 bg-[#5A2C40] rounded-lg text-white gap-3 grid"
            >
              <div className="grid gap-1">
                <h2 className="text-center text-gray-400 text-xs">
                  PNG, JPG or PDF
                </h2>
              </div>
              <div className="grid gap-2">
                <h4 className="text-center text-sm font-medium">
                  Arraste seus arquivos aqui
                </h4>
                <div className="flex items-center justify-center">
                  <label>
                    <input type="file" hidden onChange={handleFileChange} />
                    <div className="flex w-28 h-9 px-2 flex-col bg-[#3d1f2c] rounded-full shadow text-white text-xs font-semibold items-center justify-center cursor-pointer focus:outline-none">
                      Escolher arquivo
                    </div>
                  </label>
                </div>
              </div>
            </div>
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
