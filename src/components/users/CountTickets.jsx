import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

function CountTickets({ userInfo }) {
  const [count, setCount] = useState([]);
  const {user} = useAuth()

  useEffect(() => {
    async function countTickets() {
      try {
        const res = await api.get(`/tickets/${userInfo.id}/count`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCount(res.data.tickets.length);
      } catch (error) {
        toast.error("Erro");
        console.error("ERRO: ", error);
      }
    }
    countTickets()
  }, []);

  return <div className="">{count}</div>;
}

export default CountTickets;
