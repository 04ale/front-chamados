import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth} from "../hooks/useAuth";

function TicketDetail() {
    const { user } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function getTickets() {
      if (user && user.token) {
        try {
          const response = await api.get(`/tickets/:id`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setTickets(response.data.tickets);
        } catch (error) {
          console.error("ERRO: ", error);
        }
      }
    }
    getTickets();
  }, [user, ]);
  return (
    <div>

    </div>
  )
}

export default TicketDetail