/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { User, X } from "lucide-react";
import Comments from "./Comments";
import Update from "./Update";

function TicketDetail({
  closeDetails,
  openComments,
  openEdit,
  ticketInfo,
  onTicketDeleted,
}) {
  const { user, isAdmin } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (string) => {
    if (!string || string.length === 0) {
      return "";
    }
    const firstLetter = string.charAt(0).toUpperCase();
    const restOfWord = string.slice(1);

    return firstLetter + restOfWord;
  };

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
    if (ticketInfo.id) {
      getTicket(ticketInfo.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketInfo.id]);

  async function handleDeleteTicket(id) {
    try {
      let res = confirm("Tem certeza que deseja exluir esse ticket?");

      if (res) {
        await api.delete(`/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        alert("Ticket excluído com sucesso!");
        onTicketDeleted(id);
        closeDetails();
      }
    } catch (error) {
      console.error("Erro ao excluir ticket:", error);
      alert("Não foi possível excluir o ticket. Tente novamente.");
    }
  }
  async function getTicket(id) {
    if (user && user.token) {
      try {
        const response = await api.get(`/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTicket(response.data);
      } catch (error) {
        console.error("ERRO: ", error);
      } finally {
        setLoading(false);
      }
    }
  }

  function change(info) {
    if (info === "low") {
      info = "pequena";
      return info;
    }
    if (info === "medium") {
      info = "médio";
      return info;
    }
    if (info === "high") {
      info = "alta";
      return info;
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-screen fixed ... flex justify-center items-center">
        <div className="... bg-white rounded-lg p-6">
          Carregando detalhes do ticket...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center">
      <X
        onClick={closeDetails}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
      <div className="max-sm:mx-[20px] sm:mx-[40px] md:mx-[60px] lg:w-[900px] max-h-[80vh] overflow-auto text-[#5A2C40] bg-[#FFFBF5] rounded-lg p-6">
        {" "}
        <div className="flex flex-col gap-4 mb-10">
          <div>
            <div className="grid grid-cols-[5fr_1fr] items-center">
              <div className="flex flex-row gap-2 items-center">
                <User />
                <h1 className="text-2xl font-semibold">
                  {ticketInfo.creator.name}
                </h1>
              </div>
              <div>
                <p>Criado em:</p>{" "}
                <p className="font-semibold">{dataFormatada}</p>
              </div>
            </div>
            <p className="text-sm text-[#8C847E]">{ticketInfo.creator.email}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xl font-bold">Título: </p>
              <p className="text-2xl font-semibold">
                {capitalizeFirstLetter(ticketInfo.title)}
              </p>
            </div>
            {ticketInfo.description && (
              <div>
                <p className="text-xl font-bold">Descrição: </p>
                <p className="text-xl text-balance">
                  {capitalizeFirstLetter(ticketInfo.description)}
                </p>
              </div>
            )}

            <div className="grid grid-cols-[1fr_1fr]">
              <div>
                <p className="text-xl font-bold">Status: </p>
                <p className="text-xl ">
                  {capitalizeFirstLetter(ticketInfo.status.replace("_", " "))}
                </p>
              </div>

              <div>
                <p className="text-xl font-bold">Prioridade: </p>
                <p className="text-xl ">
                  {capitalizeFirstLetter(change(ticketInfo.priority))}
                </p>
              </div>
            </div>
          </div>
        </div>
        {isAdmin ? (
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-3">
            {" "}
            <button
              className="bg-[#396eaf] hover:bg-[#2c5180] rounded-lg py-3 duration-300 transition-all text-white cursor-pointer font-semibold"
              onClick={openComments}
            >
              Comentarios
            </button>
            <button
              className="bg-[#C89F5B] hover:bg-[#aa874f] rounded-lg py-3 text-white cursor-pointer duration-300 transition-all font-semibold"
              onClick={openEdit}
            >
              Editar Ticket
            </button>
            <button
              className="bg-[#B94444] hover:bg-[#9b3a3a] rounded-lg py-3 duration-300 transition-all text-white cursor-pointer font-semibold"
              onClick={() => handleDeleteTicket(ticketInfo.id)}
            >
              Excluir Ticket
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            {" "}
            <button
              className="bg-[#396eaf] hover:bg-[#2c5180] rounded-lg py-3 max-lg: px-6 lg:px-8 duration-300 transition-all text-white cursor-pointer font-semibold"
              onClick={openComments}
            >
              Comentarios
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketDetail;
