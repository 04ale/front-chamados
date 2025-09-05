import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Search, User } from "lucide-react";

function ListUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  

  const capitalizeFirstLetter = (string) => {
    if (!string || string.length === 0) {
      return "";
    }
    const firstLetter = string.charAt(0).toUpperCase();
    const restOfWord = string.slice(1);

    return firstLetter + restOfWord;
  };

  useEffect(() => {
    try {
      if (user?.token) {
        async function getUsers() {
          const res = await api.get('/users', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setUsers(res.data.users);
        }
        getUsers();
      }
    } catch (error) {
      console.error("ERRO: ", error);
    }
  }, [user]);


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

            <ul className="flex flex-col">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="grid sm:grid-cols-[3fr_3fr_1fr_1fr_auto] max-sm:grid-cols-[2fr_3fr_auto] max-md:px-2 divide-x-1 divide-[#8C847E] gap-4 items-center border-t border-gray-200 bg-[#FFFBF5] py-2 md:pl-3 font-semibold"
                >
                  <div className="flex items-center gap-2 truncate">
                    <User size={16} />
                    <p className="truncate">{capitalizeFirstLetter(user.name)}</p>
                  </div>

                  <p className="truncate">
                    {user.email}
                  </p>


                  <p className="max-sm:hidden">{capitalizeFirstLetter(user.role)}</p>

                  <p className="max-sm:hidden">0</p>

                  <button className="text-[#17A2B8] flex justify-center">
                    <Search
                      className="cursor-pointer"
                      size={20}
                      onClick={() => {
                      }}
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
