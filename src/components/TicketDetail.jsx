/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { User, X } from "lucide-react";
import { storage } from "../services/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Comments from "./Comments";
import Update from "./Update";
import PhotoDetail from "./PhotoDetail";

function TicketDetail({
  closeDetails,
  openComments,
  openEdit,
  ticketInfo,
  onTicketDeleted,
}) {
  const { user, isAdmin } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState([]);

  const [isImageOpen, setIsImageOpen] = useState(false)
  const listRef = ref(storage, `/tickets/${ticketInfo.id}`);

  useEffect(() => {
    

    listAll(listRef)
      .then((res) => {
        
        const images = res.items.map((item)=> getDownloadURL(item))
        Promise.all(images)
        .then((urls) => {
          setImageUrls(urls)
          console.log("URLS", urls)
        })
        .catch((error)=> {
          console.log("ERRO: ", error)
        })
      })
      .catch((error) => {
        alert("Erro")
        console.error("ERRO: ", error)
      });

  }, [ticketInfo.id]);

  const capitalizeFirstLetter = (string) => {
    if (!string || string.length === 0) {
      return "";
    }
    const firstLetter = string.charAt(0).toUpperCase();
    const restOfWord = string.slice(1);

    return firstLetter + restOfWord;
  };

  const dataISO = ticketInfo.created_at;
  const data = new Date(dataISO);
  const opcoes = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const dataFormatada = new Intl.DateTimeFormat("pt-BR", opcoes).format(data);

  useEffect(() => {
    if (ticketInfo.id) {
      getTicket(ticketInfo.id);
      getImages(ticketInfo.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketInfo.id]);

  async function handleDeleteTicket(id) {
    try {
      let res = confirm("Tem certeza que deseja exluir esse ticket?");

      if (res) {
        await api.delete(`/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        alert("Ticket excluído com sucesso!");
        onTicketDeleted(id);
        closeDetails();
      }
    } catch (error) {
      console.error("Erro ao excluir ticket:", error);
      alert("Não foi possível excluir o ticket. Tente novamente.");
    }
  }
  async function getTicket(id) {
    if (user && user.token) {
      try {
        const response = await api.get(`/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTicket(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("ERRO: ", error);
      } finally {
        setLoading(false);
      }
    }
  }

  async function getImages(id) {
    try {
      const res = await api.get(`/files/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res);
    } catch (error) {
      alert("Erro ao adicionar imagem.");
      console.error("ERRO: ", error);
    }
  }

  function openImage(image){
    setIsImageOpen(true)
    setImageUrl(image)
  }

  function closeImage(){
    setIsImageOpen(false)
  }

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

  if (loading) {
    return (
      <div className="h-screen w-screen fixed ... flex justify-center items-center">
        <div className="">Carregando detalhes do ticket...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center z-30">
      <X
        onClick={closeDetails}
        className="absolute top-0 right-0 text-white mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
      <div className="max-sm:mx-[20px] sm:mx-[40px] md:mx-[60px] lg:w-[900px] max-h-[80vh] overflow-auto text-[#5A2C40] bg-[#FFFBF5] rounded-lg p-6">
        {" "}
        <div className="flex flex-col gap-4 mb-10">
          <div>
            <div className="grid grid-cols-[5fr_1fr] items-center">
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <User />
                <h1 className="text-2xl font-semibold">
                  {ticketInfo.creator.name}
                </h1>
              </div>
              <div>
                <p>Criado em:</p>{" "}
                <p className="font-semibold">{dataFormatada}</p>
              </div>
            </div>
            <p className="text-sm text-[#8C847E]">{ticketInfo.creator.email}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xl font-bold">Título: </p>
              <p className="text-2xl font-semibold">
                {capitalizeFirstLetter(ticketInfo.title)}
              </p>
            </div>
            {ticketInfo.description && (
              <div>
                <p className="text-xl font-bold">Descrição: </p>
                <p className="text-xl text-balance">
                  {capitalizeFirstLetter(ticketInfo.description)}
                </p>
              </div>
            )}

            <div className="grid grid-cols-[1fr_1fr]">
              <div>
                <p className="text-xl font-bold">Status: </p>
                <p className="text-xl ">
                  {capitalizeFirstLetter(ticketInfo.status.replace("_", " "))}
                </p>
              </div>

              <div>
                <p className="text-xl font-bold">Prioridade: </p>
                <p className="text-xl ">
                  {capitalizeFirstLetter(change(ticketInfo.priority))}
                </p>
              </div>
            </div>
          </div>

          <ul className="w-full flex sm:flex-row max-sm:flex-col gap-2 justify-around">
            {imageUrls.map((image, index)=> (
              <li key={index} onClick={(index)=> {
                openImage(image)
                console.log("TESTE: ", index)
              }} className="flex flex-row justify-around w-full gap-2">
                <img src={image} className="border border-gray-300 space-x-1 rounded-lg w-[280px] lg:h-[280px] md:h-[240px] sm:h-[200px] max-sm:h-[250px]"/>
              </li>
            ))}
              
          </ul>
        </div>
        {isAdmin ? (
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-3">
            {" "}
            <button
              className="bg-[#396eaf] hover:bg-[#2c5180] rounded-lg py-3 duration-300 transition-all text-white cursor-pointer font-semibold"
              onClick={openComments}
            >
              Comentarios
            </button>
            <button
              className="bg-[#C89F5B] hover:bg-[#aa874f] rounded-lg py-3 text-white cursor-pointer duration-300 transition-all font-semibold"
              onClick={openEdit}
            >
              Editar Ticket
            </button>
            <button
              className="bg-[#B94444] hover:bg-[#9b3a3a] rounded-lg py-3 duration-300 transition-all text-white cursor-pointer font-semibold"
              onClick={() => handleDeleteTicket(ticketInfo.id)}
            >
              Excluir Ticket
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            {" "}
            <button
              className="bg-[#396eaf] hover:bg-[#2c5180] rounded-lg py-3 max-lg: px-6 lg:px-8 duration-300 transition-all text-white cursor-pointer font-semibold"
              onClick={openComments}
            >
              Comentarios
            </button>
          </div>
        )}
      </div>
      {isImageOpen && <PhotoDetail onClose={closeImage} image={imageUrl}/>}
    </div>
  );
}

export default TicketDetail;
