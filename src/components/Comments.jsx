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
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

function Comments({
  closeComments,
  ticketId,
  handleBack,
  ticketInfo,
  capitalizeFirstLetter,
}) {
  const [comments, setComments] = useState([]);
  const [openComments, setOpenComments] = useState(false);
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState();
  const formRef = useRef(null);
  const { user, isAdmin } = useAuth();

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
    await api.post(
      `/tickets/${ticketId}/comments`,
      {
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    alert("Comentário adicionado com sucesso! ");
    setOpenComments(false);
    setBody("");
    getComments();
  }

  {
    function getPriorityInfo(priority) {
      switch (priority) {
        case "low":
          return { text: "Baixa", className: "text-green-500" };
        case "medium":
          return { text: "Média", className: "text-yellow-500" };
        case "high":
          return { text: "Alta", className: "text-red-500 font-bold" };
        default:
          return { text: priority || "N/A", className: "text-gray-500" };
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
  }

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

  useEffect(() => {
    if (openComments && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openComments]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  function getStatusInfo(status) {
    switch (status) {
      case "aberto": return { text: "Aberto", className: "text-green-700 bg-green-100 font-semibold" };
      case "em_andamento": return { text: "Em andamento", className: "text-yellow-700 bg-yellow-100 font-semibold" };
      case "fechado": return { text: "Fechado", className: "text-red-700 bg-red-100 font-semibold" };
      default: return { text: status || "N/A", className: "text-gray-500 bg-gray-100" };
    }
  }
  const statusInfo = getStatusInfo(ticketInfo.status);

  function getPriorityInfo(priority) {
    switch (priority) {
      case "low": return { text: "Baixa", className: "text-green-700 bg-green-100 font-semibold" };
      case "medium": return { text: "Média", className: "text-yellow-700 bg-yellow-100 font-semibold" };
      case "high": return { text: "Alta", className: "text-red-700 bg-red-100 font-bold" };
      default: return { text: priority || "N/A", className: "text-gray-500 bg-gray-100" };
    }
  }
  const priorityInfo = getPriorityInfo(ticketInfo.priority);

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-end z-50">
      <div className="h-screen overflow-auto w-[800px] text-[#5A2C40] max-md:py-17 bg-[#FFFBF5] p-6">
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
              <p className={`py-1 px-2 bg-[#5A2C40]/40 ${statusInfo.className} text-[#5A2C40] font-semibold rounded-full`}>
                {statusInfo.text}
              </p>
              <p className={`py-1 px-2 ${priorityInfo.className} rounded-full`}>
                {priorityInfo.text}
              </p>
            </div>
            <div className="text-sm grid grid-cols-[2fr_1fr] gap-4">
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
                    <input type="file" hidden onChange={handleImageChange} />
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
              {previewUrl && (
                <>
                  <img
                    src={previewUrl}
                    className="sm:h-30 sm:w-30 max-sm:h-25 max-sm:w-25 lg:h-40 lg:w-40 xl:w-50 xl:h-50 rounded-lg border-1 border-gray-300"
                  />
                  <img
                    src={previewUrl}
                    className="sm:h-30 sm:w-30 max-sm:h-25 max-sm:w-25 lg:h-40 lg:w-40 xl:w-50 xl:h-50 rounded-lg border-1 border-gray-300"
                  />
                  <img
                    src={previewUrl}
                    className="sm:h-30 sm:w-30 max-sm:h-25 lg:h-40 lg:w-40 xl:w-50 xl:h-50 max-sm:w-25 rounded-lg border-1 border-gray-300"
                  />
                </>
              )}
            </div>
          </form>

          <ul className="flex flex-col gap-4 p-4 max-h-[600px] w-full overflow-y-auto">
            {comments.map((comment) => {
              const date = new Date(comment.created_at);
              const finalDate = new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(date);

              const isCurrentUser = user.name === comment.author.name;

              return (
                <li
                  key={comment.id}
                  className={`flex w-full ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className="flex flex-col max-w-[80%] rounded-xl shadow-md p-3"
                    style={{
                      backgroundColor: isCurrentUser ? "#8B45711A" : "#fffdfa",
                      border: "1px solid #dddddd",
                    }}
                  >
                    <div
                      className={`flex items-center gap-2 mb-1 text-sm text-gray-600 ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      }`}
                      style={{ color: "#5A2C40" }}
                    >
                      {!isCurrentUser && <User size={16} />}
                      <span className="font-semibold">
                        {comment.author.name}
                      </span>
                      <span className="text-xs">{finalDate}</span>
                      {isCurrentUser && <User size={16} />}
                    </div>

                    <p
                      className="text-lg break-words"
                      style={{ color: "#5A2C40" }}
                    >
                      {comment.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Comments;
