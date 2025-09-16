import { Undo2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

function Update({ closeEdit, ticketInfo, handleBack }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const { user } = useAuth();

  async function getTicket(id) {
    if (user && user.token) {
      try {
        const response = await api.get(`/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const ticketData = response.data;
        setTitle(ticketData.title);
        setDescription(ticketData.description);
        setPriority(ticketData.priority);
        setStatus(ticketData.status);
      } catch (error) {
        console.error("ERRO: ", error);
      }
    }
  }

  useEffect(() => {
    getTicket(ticketInfo.id);
  }, [ticketInfo.id, user.token]);

  async function updateTicket(e) {
    e.preventDefault();
    try {
      await api.patch(
        `/tickets/${ticketInfo.id}`,
        {
          title,
          description,
          priority,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      window.location.reload()      
      alert("Ticket atualizado com sucesso!");
    } catch (error) {
      console.log("ERRO AO ATUALIZAR: ", error);
    }
  }

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center z-50">
      <X
        onClick={closeEdit}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
      <div className="max-sm:mx-[20px] sm:mx-[40px] md:mx-[60px] lg:w-[900px] max-lg:w-[600px] max-h-[80vh] overflow-auto text-white bg-[#3d1f2c] rounded-lg p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-2 items-center justify-between">
            <Undo2 size={30} className="cursor-pointer" onClick={handleBack}/>
            <h1 className="text-2xl font-semibold">Editar Ticket</h1>
            <p></p>
          </div>
          <form className="grid gap-4" onSubmit={updateTicket}>
            <div className="grid gap-2 ">
              <label className="text-sm  font-medium"> Título</label>
              <input
                type="text"
                className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2 ">
              <label className="text-sm font-medium "> Descrição</label>
              <textarea
                className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none  text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2 ">
              <label className="text-sm font-medium  "> Prioridade</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none  text-sm"
              >
                <option value="low" className="rounded-lg">
                  Baixa
                </option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>
            <div className="grid gap-2 ">
              <label className="text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none  text-sm"
              >
                <option value="aberto">Aberto</option>
                <option value="em_andamento">Em andamento</option>
                <option value="fechado">Fechado</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-md p-2 bg-[#5A2C40] text-white focus:outline-none  text-sm cursor-pointer hover:bg-[#8B4571] duration-300 transition-all"
            >
              Atualizar ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
