import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../services/firebaseConfig";
import { toast } from "sonner";

function NewTicket({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [files, setFiles] = useState([]);
  const [fileType, setFileType] = useState("");

  const { user } = useAuth();
  const status = "aberto";

  async function createTicket(e) {
    e.preventDefault();
    try {
      const id = v4();
      const filesUrls = await Promise.all(
        files.map(async (file) => {
          const imageRef = ref(storage, `tickets/${id}/${file.name}`);
          await uploadBytes(imageRef, file);
          return await getDownloadURL(imageRef);
        })
      );
      await api.post(
        "/tickets",
        {
          id,
          title,
          description,
          files: filesUrls,
          priority,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Ticket criado com sucesso!");
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao criar o ticket, tente novamente");
      console.log("ERRO: ", error);
    }
  }

  const handleDrop = (e) => {
  e.preventDefault();

  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    const newFiles = Array.from(e.dataTransfer.files);

    const allFilesAreValid = newFiles.every(file => 
      file.type === "image/png" || file.type === "image/jpeg"
    );

    if (!allFilesAreValid) {
      toast.warning("Apenas arquivos PNG ou JPEG são permitidos.");
      return;
    }

    if (files.length + newFiles.length > 3) {
      toast.warning("Você pode anexar no máximo 3 arquivos.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    setFileType(newFiles[0].type); 
  }
};

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > 3) {
        toast.warning("Você pode anexar no máximo 3 arquivos.");
        return;
      }
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="h-screen w-screen fixed bg-black/60 flex justify-center items-center z-50">
      <X
        onClick={onClose}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
      <div className="max-sm:w-[340px] sm:w-[450px] mx-auto text-white bg-[#3d1f2c] rounded-lg p-6">
        <div className="flex flex-col  mb-10">
          <h1 className="text-2xl font-bold ">Criar Ticket</h1>
          <p className="text-sm text-[#c4bab3]">
            Crie um novo ticket de chamado para a equipe de suporte.
          </p>
        </div>
        <form className="grid gap-4" onSubmit={createTicket}>
          <div className="grid gap-2 ">
            <label className="text-sm font-medium">Título</label>
            <input
              type="text"
              className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none "
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2 ">
            <label className="text-sm font-medium ">Descrição</label>
            <textarea
              className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none text-sm"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2 ">
            <label className="text-sm font-medium  "> Prioridade</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
              className="w-full py-2 bg-[#5A2C40] rounded-lg text-white gap-3 grid"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="grid gap-1">
                <h2 className="text-center text-gray-400 text-xs">
                  No máximo 3 imagens
                </h2>
              </div>
              <div className="grid gap-2">
                <h4 className="text-center text-sm font-medium">
                  Arraste seus arquivos aqui
                </h4>
                <div className="flex items-center justify-center">
                  <label>
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg"
                      name="image"
                    />
                    <div className="flex w-28 h-9 px-2 flex-col bg-[#3d1f2c] rounded-full shadow text-white text-xs font-semibold items-center justify-center cursor-pointer focus:outline-none">
                      Escolher arquivo
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {files && (
              <div className="mt-2 flex flex-col gap-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#5A2C40] p-2 rounded"
                  >
                    <span className="text-xs break-words">{file.name}</span>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-600 cursor-pointer"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
