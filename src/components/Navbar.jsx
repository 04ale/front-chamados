import {
  LogOut,
  Menu,
  MessageCircle,
  SquarePlus,
  Ticket,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import logo1 from "../assets/img/logo1.png";
import logo2 from "../assets/img/logo2.png";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NewTicket from "./NewTicket";

function Navbar() {
  const { logout, isAdmin } = useAuth();
  const nav = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="bg-[#F1F3F5] flex flex-col">
      <div className="p-3 md:hidden px-6 w-full fixed border-b-gray-50 bg-[#F1F3F5] shadow-md flex justify-between">
        <img src={logo1} className="w-47 h-8 max-sm:hidden" />
        <img src={logo2} className="h-8 sm:hidden" />
        {isAdmin ? (
          <Menu />
        ) : (
          <div className="flex flex-row gap-8 items-center">
            <Ticket />
            <SquarePlus onClick={openModal}/>
            <User />
          </div>
        )}
      </div>

      <div className="px-8 py-8 pb-14 xl:pr-20 fixed h-full max-md:hidden bg-[#F1F3F5] border-b-gray-50 shadow-md flex flex-col justify-between">
        <div className="flex flex-col gap-12 max-xl:items-center">
          <img src={logo1} className="w-47 h-8 max-xl:hidden" />
          <img src={logo2} className="h-8 w-12 xl:hidden" />
          <div className="flex flex-col gap-7 max-xl:items-center">
            <div className="flex items-center flex-row gap-3 font-semibold">
              <Ticket
                className="hover:bg-gray-100 hover:rounded-lg cursor-pointer"
                size={30}
              />
              <p className="max-xl:hidden cursor-pointer text-xl">Tickets</p>
            </div>
            <div className="flex items-center font-semibold flex-row gap-3">
              <SquarePlus className="cursor-pointer" size={30}  onClick={openModal}/>
              <p className="max-xl:hidden cursor-pointer text-xl" onClick={openModal}>
                Criar ticket
              </p>
            </div>
            {isAdmin && (
              <>
                {" "}
                <div className="flex items-center flex-row gap-3 font-semibold">
                  <Users
                    className="hover:bg-gray-100 hover:rounded-lg cursor-pointer"
                    size={30}
                  />
                  <p className="max-xl:hidden cursor-pointer text-xl">
                    Ver usuários
                  </p>
                </div>
                <div className="flex items-center flex-row gap-3 font-semibold">
                  <UserPlus
                    className="hover:bg-gray-100 hover:rounded-lg cursor-pointer"
                    size={30}
                    onClick={() => nav('/register')}
                  />
                  <p className="max-xl:hidden cursor-pointer text-xl" onClick={() => nav('/register')}>
                    Cadastrar usuário
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-7 max-xl:items-center">
          <div className="flex items-center font-semibold flex-row gap-3">
            <User className="cursor-pointer items-center" size={30} />
            <p className="max-xl:hidden cursor-pointer text-xl">Usuário</p>
          </div>
          <div className="flex items-center font-semibold flex-row gap-3">
            <LogOut onClick={handleLogout} className="cursor-pointer"/>
            <p className="max-xl:hidden cursor-pointer text-xl">Sair</p>
          </div>
        </div>
      </div>
      {isModalOpen && <NewTicket onClose={closeModal}/>}
    </nav>
  );
}

export default Navbar;
