import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  User,
  Search,
} from "lucide-react";
import TicketDetail from "./TicketDetail";
import Comments from "./Comments";
import Update from "./Update";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

function Tickets() {
  const { user, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [allTicketsFromApi, setAllTicketsFromApi] = useState([]);
  const [displayedTickets, setDisplayedTickets] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [inputValue, setInputValue] = useState("");

  const nav = useNavigate();
  const screenRef = useRef();

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

  const handleTicketDeleted = (deletedTicketId) => {
    setAllTicketsFromApi((currentTickets) =>
      currentTickets.filter((t) => t.id !== deletedTicketId)
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
    if (!string || string.length === 0) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleBack = () => {
    setIsDetailsOpen(true);
    setIsCommentsOpen(false);
    setIsEditOpen(false);
  };

  async function fetchTicketsFromApi() {
    if (!user?.token) return;
    setLoading(true);

    try {
      const params = {
        page: currentPage,
        status: status || undefined,
        priority: priority || undefined,
        selectedId: selectedId || undefined,
      };

      const res = await api.get(`/tickets/filtered`, {
        headers: { Authorization: `Bearer ${user.token}` },
        params: params,
      });

      setAllTicketsFromApi(res.data.tickets || []);
      setPagination(res.data.pagination || {});
    } catch (error) {
      console.error("ERRO ao buscar tickets:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTicketsFromApi();
  }, [user?.token, currentPage, status, priority, selectedId]);

  useEffect(() => {
    const lowerCaseInputValue = inputValue.toLowerCase(); 
    if (inputValue) {
      const filtered = allTicketsFromApi.filter(ticket => 
        ticket.title.toLowerCase().includes(lowerCaseInputValue)
      );
      setDisplayedTickets(filtered);
    } else {
      setDisplayedTickets(allTicketsFromApi);
    }
  }, [allTicketsFromApi, inputValue]);

  useEffect(() => {
    if (!loading && screenRef.current) {
      screenRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [displayedTickets]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <p className="flex items-center justify-center font-bold text-4xl mt-10 text-[#5A2C40]">
        Carregando...
      </p>
    );
  }

  return (
    <div className="">
      <div className="w-full h-full flex flex-col gap-4 ">
        <div>
          <div className=" w-full md:px-10 max-md:px-7 pr-5 md:pt-10 max-md:pt-7">
            <div className="grid grid-cols-[1fr_auto]">
              <div className=" text-[#5A2C40]" ref={screenRef}>
                <h1 className="text-4xl font-bold ">Tickets</h1>
                <p className="text-2xl font-semibold">
                  {capitalizeFirstLetter(user?.name)}
                </p>
              </div>
              <div>
                {isAdmin && (
                  <button
                    className="p-3 border border-[#5A2C40]/20 bg-[#FFFBF5] font-semibold text-[#5A2C40] rounded-lg cursor-pointer"
                    onClick={() => nav("/closed")}
                  >
                    Ver tickets fechados
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-4 w-full py-6">
              <div className="grid 2xl:grid-cols-[1fr_1fr] max-2xl:gap-2 2xl:gap-10 w-full">
                <SearchBar
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <Filters
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  priority={priority}
                  setPriority={setPriority}
                  status={status}
                  setStatus={setStatus}
                  handleSubmit={handleSubmit}
                  className="w-1/2"
                />
              </div>
            </div>
          </div>
          <div className="border-[#8C847E]">
            <div className="grid lg:grid-cols-[2fr_3fr_3fr_1fr_1fr_auto] max-lg:grid-cols-[2fr_3fr_1fr_auto] max-sm:grid-cols-[2fr_3fr_auto] gap-4 items-center font-bold bg-[#FFFBF5] py-2 px-3 text-[#8C847E]">
              <p>Nome</p>
              <p className="max-lg:hidden">E-mail</p>
              <p>Título</p>
              <p className="max-lg:hidden">Status</p>
              <p className="max-sm:hidden">Prioridade</p>
              <span className="w-6 h-6"></span>
            </div>

            {displayedTickets.length > 0 ? (
              <ul className="flex flex-col text-[#5A2C40]">
                {displayedTickets.map((ticketItem) => {
                  const priorityInfo = getPriorityInfo(ticketItem.priority);
                  return (
                    <li
                      key={ticketItem.id}
                      className="grid lg:grid-cols-[2fr_3fr_3fr_1fr_1fr_auto] max-lg:grid-cols-[2fr_3fr_1fr_auto] max-sm:grid-cols-[2fr_3fr_auto] max-md:px-2 md:px-4 divide-x-1 divide-[#8C847E] gap-4 items-center border-t border-gray-200 bg-[#FFFBF5] py-2 font-semibold"
                    >
                      <div className="grid grid-cols-[auto_1fr] items-center gap-2 truncate">
                        <User size={16} />
                        <p className="truncate">
                          {capitalizeFirstLetter(ticketItem.creator.name)}
                        </p>
                      </div>

                      <p className="truncate max-lg:hidden">
                        {ticketItem.creator.email}
                      </p>

                      <p className="truncate">
                        {capitalizeFirstLetter(ticketItem.title)}
                      </p>

                      <p className="max-lg:hidden">
                        {capitalizeFirstLetter(
                          ticketItem.status.replace("_", " ")
                        )}
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
                            setTicket(ticketItem);
                          }}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              !loading && (
                <p className="text-center py-4 text-gray-500">
                  Nenhum ticket encontrado.
                </p>
              )
            )}
          </div>
        </div>

        <div className="justify-between items-center flex flex-row px-8 gap-4 mt-2">
          {currentPage !== 1 && (
            <div className="flex gap-4">
              <ChevronsLeft
                size={50}
                onClick={() => setCurrentPage(1)}
                className=" bg-[#8B4571]/30 hover:bg-[#8B4571]/40 hover:text-[#5a1c37] duration-200 transition-all text-[#5A2C40] rounded-lg cursor-pointer"
              />
              <ChevronLeft
                size={50}
                onClick={() => setCurrentPage(currentPage - 1)}
                className=" bg-[#8B4571]/30 hover:bg-[#8B4571]/40 hover:text-[#5a1c37] duration-200 transition-all text-[#5A2C40] rounded-lg cursor-pointer"
              />
            </div>
          )}

          {pagination.total > currentPage * 30 && (
            <div className="w-full flex justify-between">
              <p></p>
              <div className="flex gap-4">
                <ChevronRight
                  size={50}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className=" bg-[#8B4571]/30 hover:bg-[#8B4571]/40 hover:text-[#5a1c37] text-[#5A2C40] duration-200 transition-all rounded-lg cursor-pointer"
                />
                <ChevronsRight
                  size={50}
                  className=" bg-[#8B4571]/30 hover:bg-[#8B4571]/40 hover:text-[#5a1c37] text-[#5A2C40] duration-200 transition-all rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage(pagination.lastPage)}
                />
              </div>
            </div>
          )}
        </div>
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
        <Comments
          closeComments={closeComments}
          ticketInfo={ticket}
          capitalizeFirstLetter={capitalizeFirstLetter}
          ticketId={ticket.id}
          handleBack={handleBack}
        />
      )}
      {isEditOpen && (
        <Update
          closeEdit={closeEdit}
          ticketInfo={ticket}
          handleBack={handleBack}
        />
      )}
    </div>
  );
}

export default Tickets;
