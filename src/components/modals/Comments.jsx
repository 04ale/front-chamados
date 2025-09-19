import {
  Clock,
  Flag,
  Paperclip,
  SendHorizontal,
  Trash,
  Undo2,
  User,
  X,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import CommentItem from "./CommentItem";

import { storage } from "../../services/firebaseConfig";
import { uploadBytes, ref } from "firebase/storage";
import { toast } from "sonner";

function Comments({
  closeComments,
  ticketId,
  handleBack,
  ticketInfo,
}) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const formRef = useRef(null);
  const { user } = useAuth();

  async function getComments() {
    const res = await api.get(`/tickets/${ticketId}/comments`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setComments(res.data.comments);
  }

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createComment(e) {
    e.preventDefault();

    if (!body.trim() && files.length === 0) {
      toast.info("Por favor escreva um comentário.");
      return;
    }

    try {
      const res = await api.post(
        `/tickets/${ticketId}/comments`,
        { body },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const newCommentId = res.data.id;

      if (files.length > 0) {
        try {
          const uploadPromises = files.map((file) => {
            const fileRef = ref(
              storage,
              `/tickets/comments/${newCommentId}/${file.name}`
            );
            return uploadBytes(fileRef, file);
          });
          await Promise.all(uploadPromises);
        } catch (error) {
          console.error("ERRO UPLOAD: ", error);
        }
      }

      toast.success("Comentário adicionado com sucesso!");
      setBody("");
      setFiles([]);
      getComments();
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      toast.error("Ocorreu um erro ao enviar o comentário.");
    }
  }

  /** async function deleteComment(id) {
    try {
      let res = confirm("Tem certeza que deseja deletar esse comentário? ");
      if (res) {
        await api.delete(`/tickets/${id}/comments`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        alert("Comentário deletado com sucesso!");
      }
      getComments();
    } catch (error) {
      console.error("ERRO: ", error);
    }
  }
*/

  const dataISO = ticketInfo.created_at;
  const data = new Date(dataISO);
  const opcoes = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const dataFormatada = new Intl.DateTimeFormat("pt-BR", opcoes).format(data);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > 3) {
        toast.warning("Você pode anexar no máximo 3 arquivos.");
        return;
      }
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      console.log(newFiles);
    }
  };

  function getStatusInfo(status) {
    switch (status) {
      case "aberto":
        return {
          text: "Aberto",
          className: "text-green-700 bg-green-100 font-semibold",
        };
      case "em_andamento":
        return {
          text: "Em andamento",
          className: "text-yellow-700 bg-yellow-100 font-semibold",
        };
      case "fechado":
        return {
          text: "Fechado",
          className: "text-red-700 bg-red-100 font-semibold",
        };
      default:
        return {
          text: status || "N/A",
          className: "text-gray-500 bg-gray-100",
        };
    }
  }
  const statusInfo = getStatusInfo(ticketInfo.status);

  function getPriorityInfo(priority) {
    switch (priority) {
      case "low":
        return {
          text: "Baixa",
          className: "text-green-700 bg-green-100 font-semibold",
        };
      case "medium":
        return {
          text: "Média",
          className: "text-yellow-700 bg-yellow-100 font-semibold",
        };
      case "high":
        return { text: "Alta", className: "text-red-700 bg-red-100 font-bold" };
      default:
        return {
          text: priority || "N/A",
          className: "text-gray-500 bg-gray-100",
        };
    }
  }
  const priorityInfo = getPriorityInfo(ticketInfo.priority);

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-end z-50">
      <button
        onClick={handleBack}
        className="max-lg:hidden absolute cursor-pointer left-4 top-4 font-semibold py-3 px-5 border text-[#5A2C40] border-[#5A2C40]/50 rounded-lg bordx bg-[#FFFBF5] duration-300 transition-all hover:bg-[#fff7ea] z-50"
      >
        Voltar
      </button>
      <div className="h-screen overflow-auto w-[800px] text-[#5A2C40] bg-[#FFFBF5] p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-5 center w-full">
            <div className="flex flex-col items-center w-full gap-2">
              <div className="w-full grid grid-cols-[1fr_auto] gap-2">
                <h1 className="font-semibold text-2xl">{ticketInfo.title}</h1>
                <X
                  onClick={closeComments}
                  className="text-[#5A2C40] font-bold cursor-pointer"
                  size={40}
                />
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <p
                className={`py-1 px-2 bg-[#5A2C40]/40 ${statusInfo.className} text-[#5A2C40] font-semibold rounded-full`}
              >
                {statusInfo.text}
              </p>
              <p className={`py-1 px-2 ${priorityInfo.className} rounded-full`}>
                {priorityInfo.text}
              </p>
            </div>
            <div className="text-sm grid md:grid-cols-[2fr_1fr] gap-4">
              <div className="grid grid-cols-[auto_1fr] items-center text-[#8C847E] gap-1">
                <Clock size={17} />
                <p>Criado: {dataFormatada}</p>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-center text-[#8C847E] gap-1">
                <User size={17} />
                <p>Criado por: {ticketInfo.creator.name}</p>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-center text-[#8C847E] gap-1">
                <Flag size={17} />
                <p>Id: {ticketInfo.id}</p>
              </div>
            </div>
            <hr className="text-[#8C847E]" />
          </div>

          <form
            ref={formRef}
            onSubmit={(e) => createComment(e)}
            className="w-full flex flex-col items-center gap-4"
          >
            <div className="flex flex-col w-full start gap-3">
              <p className="text-xl font-semibold">Comentários</p>
              <div className="border-1 border-[#5A2C40]/40 flex rounded-lg w-full">
                <textarea
                  type="text"
                  className=" text-[#5A2C40] w-17/20 text-lg p-3 h-[120px]"
                  placeholder="Adicione um comentário"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <div className="w-3/20 grid grid-cols-1">
                  <label> 
                    <input type="file" hidden onChange={handleImageChange} accept="image/png, image/jpeg" name="image" />
                    <div className="border-1 border-[#5A2C40]/40 bg-[#8B4571]/10 h-full rounded-tr-lg flex justify-center cursor-pointer items-center text-center">
                      <Paperclip />
                    </div>
                  </label>
                  <button
                    type="submit"
                    className="border-1 border-[#5A2C40]/40 bg-[#8B4571]/10 rounded-br-lg flex justify-center cursor-pointer items-center text-center"
                  >
                    <SendHorizontal />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-around w-full">
              {files && (
                <div className="mt-2 flex flex-col w-full gap-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between font-semibold text-[#5A2C40] bg-[#F7F0E4] p-2 rounded"
                    >
                      <span className="text-xs truncate">{file.name}</span>
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
          </form>

          <ul className="flex flex-col gap-4 p-4 max-h-[600px] w-full overflow-y-auto">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUser={user}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Comments;
