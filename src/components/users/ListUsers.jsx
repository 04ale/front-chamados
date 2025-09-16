import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { Search, Trash, User } from "lucide-react";
import CountTickets from "./CountTickets";

function ListUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const capitalizeFirstLetter = (string) => {
    if (!string || string.length === 0) {
      return "";
    }
    const firstLetter = string.charAt(0).toUpperCase();
    const restOfWord = string.slice(1);

    return firstLetter + restOfWord;
  };

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

  async function delUser(userInfo) {
    try {
      let res = confirm(
        `Tem certeza que deseja deletar o usuário ${userInfo.name} ?`
      );
      if (res) {
        await api.delete(`/auth/${userInfo.id}/delete`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        alert("Usuário deletado com sucesso!");
        getUsers();
      }
    } catch (error) {
      alert("Erro ao deletar usuário", error);
      console.error("ERRO: ", error);
    }
  }

  return (
    <div className="">
      <div className="w-full h-full flex flex-col gap-4 ">
        <div>
          <div className="md:p-10 max-md:p-7 text-[#5A2C40]">
            <h1 className="text-4xl font-bold ">Usuários</h1>
            <p className="text-2xl font-semibold">
              {capitalizeFirstLetter(user?.name)}
            </p>
          </div>

          <div className="border-b border-[#8C847E]">
            <div className="grid sm:grid-cols-[3fr_3fr_1fr_1fr_auto] max-sm:grid-cols-[2fr_3fr_auto] gap-4 items-center font-bold bg-[#FFFBF5] py-2 px-3 text-[#8C847E]">
              <p>Nome</p>
              <p className="max-sm:hidden">E-mail</p>
              <p>Role</p>
              <p className="max-sm:hidden">Tickets</p>
              <span className="w-6 h-6"></span>
            </div>

            <ul className="flex flex-col text-[#5A2C40]">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="grid sm:grid-cols-[3fr_3fr_1fr_1fr_auto] max-sm:grid-cols-[2fr_3fr_auto] px-3 max-md:px-2 divide-x-1 divide-[#8C847E] gap-4 items-center border-t border-gray-200 bg-[#FFFBF5] py-2 md:pl-3 font-semibold"
                >
                  <div className="grid grid-cols-[auto_1fr] items-center gap-2 truncate">
                    <User size={16} />
                    <p className="truncate">
                      {capitalizeFirstLetter(user.name)}
                    </p>
                  </div>

                  <p className="truncate">{user.email}</p>

                  <p className="max-sm:hidden">
                    {capitalizeFirstLetter(user.role)}
                  </p>

                  <CountTickets userInfo={user} />

                  <button className="text-red-500 flex justify-center">
                    <Trash
                      className="cursor-pointer"
                      size={20}
                      onClick={() => delUser(user)}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListUsers;
