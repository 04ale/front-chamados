import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { ChevronLeft, ChevronRight, Search, User } from "lucide-react";
import TicketDetail from "./TicketDetail";

function Tickets() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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

  const handleTicketDeleted = (deletedTicketId) => {
    setTickets(currentTickets => 
      currentTickets.filter(ticket => ticket.id !== deletedTicketId)
    );
  };

  const openDetails = () => {
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
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
              {tickets.map((ticket) => (
                <li
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
                    {capitalizeFirstLetter(ticket.status)}
                  </p>

                  <p className="max-sm:hidden">
                    {capitalizeFirstLetter(change(ticket.priority))}
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
                </li>
              ))}
            </ul>
          </div>
        </div>
        {tickets.length > 29 ? (
          <div className="justify-between items-center flex flex-row px-8 mt-2">
            <ChevronLeft
              size={50}
              onClick={() => setCurrentPage(currentPage - 1)}
              className=" bg-[#8B4571]/30 text-[#5A2C40] rounded-2xl cursor-pointer"
            />
            <ChevronRight
              size={50}
              onClick={() => setCurrentPage(currentPage + 1)}
              className=" bg-[#8B4571]/30 text-[#5A2C40] rounded-2xl cursor-pointer"
            />
          </div>
        ) : (
          <ChevronLeft
            size={50}
            onClick={() => setCurrentPage(currentPage - 1)}
            className=" bg-[#8B4571]/30 text-[#5A2C40] rounded-2xl cursor-pointer"
          />
        )}
      </div>
      {isDetailsOpen && (
        <TicketDetail onClose={closeDetails} ticketInfo={ticket} onTicketDeleted={handleTicketDeleted}/>
      )}
    </div>
  );
}

export default Tickets;
