import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { ChevronLeft, ChevronRight, Search, User } from "lucide-react";
import TicketDetail from "./TicketDetail";
import Comments from "./Comments";
import Update from "./Update";

function Tickets() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  function change(text){
    if (text === "Em_andamento"){
      return <p>Em andamento</p>
    }
    if (text === "Aberto"){
      return <p>Aberto</p>
    }
    if(text === "Fechado") {
      return <p>Fechado</p>
    }
    
  }

  function getPriorityInfo(priority) {
    switch (priority) {
      case "low":
        return {
          text: "Baixa",
          className: "text-green-500",
        };
      case "medium":
        return {
          text: "Media",
          className: "text-yellow-500",
        };
      case "high":
        return {
          text: "Alta",
          className: "text-red-500 font-bold",
        };
      default:
        return {
        text: priority || "N/A", 
        className: "text-gray-500",
      };
    }
  }

  const handleTicketDeleted = (deletedTicketId) => {
    setTickets((currentTickets) =>
      currentTickets.filter((ticket) => ticket.id !== deletedTicketId)
    );
  };

  const openDetails = () => {
    setIsDetailsOpen(true);
    setIsCommentsOpen(false);
    setIsEditOpen(false);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
  };

  const openComments = () => {
    setIsDetailsOpen(false);
    setIsCommentsOpen(true);
    setIsEditOpen(false);
  };

  const closeComments = () => {
    setIsCommentsOpen(false);
  };

  const openEdit = () => {
    setIsDetailsOpen(false);
    setIsCommentsOpen(false);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string || string.length === 0) {
      return "";
    }
    const firstLetter = string.charAt(0).toUpperCase();
    const restOfWord = string.slice(1);

    return firstLetter + restOfWord;
  };

  useEffect(() => {
    async function getTickets() {
      if (user && user.token) {
        try {
          const response = await api.get(`/tickets`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            params: {
              page: currentPage,
            },
          });
          setTickets(response.data.tickets);
        } catch (error) {
          console.error("ERRO: ", error);
        }
      }
    }
    getTickets();
  }, [user, currentPage]);

  return (
    <div className="">
      <div className="w-full h-full flex flex-col gap-4 ">
        <div>
          <div className="md:p-10 max-md:p-7 text-[#5A2C40]">
            <h1 className="text-4xl font-bold ">Tickets</h1>
            <p className="text-2xl font-semibold">
              {capitalizeFirstLetter(user?.name)}
            </p>
          </div>

          <div className="border-b border-[#8C847E]">
            <div className="grid lg:grid-cols-[2fr_3fr_3fr_1fr_1fr_auto] max-lg:grid-cols-[2fr_3fr_1fr_auto] max-sm:grid-cols-[2fr_3fr_auto] gap-4 items-center font-bold bg-[#FFFBF5] py-2 px-3 text-[#8C847E]">
              <p>Nome</p>
              <p className="max-lg:hidden">E-mail</p>
              <p>Título</p>
              <p className="max-lg:hidden">Status</p>
              <p className="max-sm:hidden">Prioridade</p>
              <span className="w-6 h-6"></span>
            </div>

            <ul className="flex flex-col text-[#5A2C40]">
              {tickets.map((ticket) => {
                const priorityInfo = getPriorityInfo(ticket.priority);
                return(<li
                  key={ticket.id}
                  className="grid lg:grid-cols-[2fr_3fr_3fr_1fr_1fr_auto] max-lg:grid-cols-[2fr_3fr_1fr_auto] max-sm:grid-cols-[2fr_3fr_auto] max-md:px-2 md:px-4 divide-x-1 divide-[#8C847E] gap-4 items-center border-t border-gray-200 bg-[#FFFBF5] py-2 font-semibold"
                >
                  <div className="flex items-center gap-2 truncate">
                    <User size={16} />
                    <p className="truncate">
                      {capitalizeFirstLetter(ticket.creator.name)}
                    </p>
                  </div>

                  <p className="truncate max-lg:hidden">
                    {ticket.creator.email}
                  </p>

                  <p className="truncate">
                    {capitalizeFirstLetter(ticket.title)}
                  </p>

                  <p className="max-lg:hidden">
                    {change(capitalizeFirstLetter(ticket.status))}
                  </p>

                  <p className={`max-sm:hidden ${priorityInfo.className}`}>
                    {priorityInfo.text}
                  </p>

                  <button className="text-[#8B4571] flex justify-center">
                    <Search
                      className="cursor-pointer"
                      size={20}
                      onClick={() => {
                        openDetails();
                        setTicket(ticket);
                      }}
                    />
                  </button>
                </li>)
                
              })}
            </ul>
          </div>
        </div>
        {tickets.length > 29 ? (
          <div className="justify-between items-center flex flex-row px-8 mt-2">
            <ChevronLeft
              size={50}
              onClick={() => setCurrentPage(currentPage - 1)}
              className=" bg-[#8B4571]/30 text-[#5A2C40] rounded-lg cursor-pointer"
            />
            <ChevronRight
              size={50}
              onClick={() => setCurrentPage(currentPage + 1)}
              className=" bg-[#8B4571]/30 text-[#5A2C40] rounded-lg cursor-pointer"
            />
          </div>
        ) : (
          <ChevronLeft
            size={50}
            onClick={() => setCurrentPage(currentPage - 1)}
            className=" bg-[#8B4571]/30 text-[#5A2C40] rounded-lg cursor-pointer"
          />
        )}
      </div>
      {isDetailsOpen && (
        <TicketDetail
          closeDetails={closeDetails}
          openComments={openComments}
          openEdit={openEdit}
          ticketInfo={ticket}
          onTicketDeleted={handleTicketDeleted}
        />
      )}
      {isCommentsOpen && (
        <Comments closeComments={closeComments} ticketId={ticket.id} />
      )}
      {isEditOpen && <Update closeEdit={closeEdit} ticketInfo={ticket} />}
    </div>
  );
}

export default Tickets;
