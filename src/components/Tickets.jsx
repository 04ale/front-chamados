import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { ChevronLeft, ChevronRight, Search, User } from "lucide-react";

function Tickets() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState([]);

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
          <div className="md:p-10 max-md:p-7">
            <h1 className="text-4xl font-bold ">Tickets</h1>
            <p className="text-2xl font-semibold">{capitalizeFirstLetter(user?.name)}</p>
          </div>

          <div className="mx-4 border-t border-b border-gray-200">
            <div className="grid md:grid-cols-[2fr_3fr_3fr_1fr_1fr_auto] max-md:grid-cols-[1fr_1fr_1fr_auto] max-sm:grid-cols-[2fr_3fr_auto] gap-4 items-center font-bold bg-gray-50 py-2 px-3">
              <p>Nome</p>
              <p className="max-sm:hidden">E-mail</p>
              <p>Título</p>
              <p className="max-md:hidden">Status</p>
              <p className="max-md:hidden">Prioridade</p>
              <span className="w-6 h-6"></span>
            </div>

            <ul className="flex flex-col">
              {tickets.map((ticket) => (
                <li
                  key={ticket.id}
                  className="grid md:grid-cols-[2fr_3fr_3fr_1fr_1fr_auto] max-md:grid-cols-[2fr_2fr_2fr_auto] max-sm:grid-cols-[2fr_3fr_auto] divide-x-1 divide-gray-300 gap-4 items-center border-t border-gray-200 bg-white py-2 md:pl-3 font-semibold"
                >
                  <div className="flex items-center gap-2 truncate">
                    <User size={16} />
                    <p className="truncate">{ticket.creator.name}</p>
                  </div>

                  <p className="truncate max-sm:hidden">{ticket.creator.email}</p>

                  <p className="truncate">
                    {capitalizeFirstLetter(ticket.title)}
                  </p>

                  <p className="max-md:hidden">{ticket.status}</p>

                  <p className="max-md:hidden">{ticket.priority}</p>

                  <button className="text-[#17A2B8] flex justify-center">
                    <Search className="cursor-pointer" size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="justify-center items-center flex flex-row gap-5 mt-4">
          <ChevronLeft
            size={50}
            onClick={() => setCurrentPage(currentPage - 1)}
            className=" bg-[#17A2B8]/20 rounded-2xl cursor-pointer"
          />
          <ChevronRight
            size={50}
            onClick={() => setCurrentPage(currentPage + 1)}
            className=" bg-[#17A2B8]/20 rounded-2xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Tickets;
