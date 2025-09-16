import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

function Filters({
  selectedId,
  setSelectedId,
  priority,
  setPriority,
  status,
  setStatus,
  handleSubmit,
}) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { user, isAdmin } = useAuth();
  async function getUsers() {
    try {
      setLoading(true);
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error("ERRO: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, [user]);

  if (loading) {
    return (
      <p className="flex items-center justify-center font-bold text-4xl mt-10 text-[#5A2C40]">
        Carregando...
      </p>
    );
  }
  return (
    <div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-center text-xl font-semibold text-[#5A2C40]">
          Filtros
        </p>
        <form
          className="flex flex-col w-full font-semibold"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full lg:flex-row max-lg:flex-col gap-3">
            {isAdmin && (
              <div className="max-lg:w-full lg:w-1/2 flex flex-col gap-1">
                <p className="text-[#8C847E] text-sm">Nome: </p>
                <select
                  name=""
                  id=""
                  className="border border-[#5A2C40]/20 bg-[#FFFBF5] text-[#5A2C40] w-full rounded-lg p-2"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  <option value="">Todos</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className={`flex flex-row w-full gap-2 lg:w-1/2 ${!isAdmin && "lg:w-full"}`}>
              <div className="w-1/2">
                <p className="text-[#8C847E] text-sm">Status: </p>
                <select
                  name=""
                  id=""
                  className="border border-[#5A2C40]/20 bg-[#FFFBF5] w-full text-[#5A2C40] rounded-lg p-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="aberto">Aberto</option>
                  <option value="em_andamento">Em andamento</option>
                  <option value="fechado">Fechado</option>
                </select>
              </div>
              <div className="w-1/2">
                <p className="text-[#8C847E] text-sm">Prioridade: </p>
                <select
                  name=""
                  id=""
                  className="border border-[#5A2C40]/20 bg-[#FFFBF5] w-full text-[#5A2C40] rounded-lg p-2"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>
          </div>
          <button
            className="border hidden border-[#5A2C40]/20 bg-[#FFFBF5] hover:bg-[#fff7ea] duration-300 transition-all text-[#5A2C40] rounded-lg w-full cursor-pointer"
            type="submit"
          >
            Aplicar filtro
          </button>
        </form>
      </div>
    </div>
  );
}

export default Filters;
