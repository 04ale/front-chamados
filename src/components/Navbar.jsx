import {
  LogOut,
  Menu,
  X,
  SquarePlus,
  Ticket,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import logo1 from "../assets/img/logoBranca.png";
import logo2 from "../assets/img/logoBranca1.png";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NewTicket from "./NewTicket";

function Navbar() {
  const { logout, isAdmin } = useAuth();
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNav = (path) => {
    nav(path);
    setIsMobileMenuOpen(false);
  };

  const handleOpenModalMobile = () => {
    openModal();
    setIsMobileMenuOpen(false);
  };

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
    <nav className="  flex flex-col">
      <div className="p-3 md:hidden px-6 w-full fixed top-0 text-[#F7F0E4] border-b border-b-[#F7F0E4]/10 bg-[#5A2C40] shadow-md flex justify-between items-center z-40">
        <img src={logo1} className="w-auto h-8 max-sm:hidden" />
        <img src={logo2} className="h-8 sm:hidden" />

        <Menu
          onClick={() => setIsMobileMenuOpen(true)}
          className="cursor-pointer"
          size={32}
        />
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#5A2C40] z-50 flex flex-col items-center justify-center text-[#F7F0E4] p-6">
          <X
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-5 cursor-pointer"
            size={32}
          />

          <div className="flex flex-col gap-10 text-center">
            <div
              onClick={() => handleMobileNav("/")}
              className="flex items-center gap-4 cursor-pointer"
            >
              <Ticket size={32} />
              <p className="text-3xl font-semibold">Tickets</p>
            </div>
            <div
              onClick={handleOpenModalMobile}
              className="flex items-center gap-4 cursor-pointer"
            >
              <SquarePlus size={32} />
              <p className="text-3xl font-semibold">Criar Ticket</p>
            </div>

            {isAdmin && (
              <>
                <div
                  onClick={() => handleMobileNav("/users")}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <Users size={32} />
                  <p className="text-3xl font-semibold">Ver Usuários</p>
                </div>
                <div
                  onClick={() => handleMobileNav("/register")}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <UserPlus size={32} />
                  <p className="text-3xl font-semibold">Cadastrar</p>
                </div>
              </>
            )}

            <div className="w-24 h-[1px] bg-[#F7F0E4]/30 self-center"></div>

            <div className="flex items-center gap-4 cursor-pointer">
              <User size={32} />
              <p className="text-3xl font-semibold">Usuário</p>
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center gap-4 cursor-pointer"
            >
              <LogOut size={32} />
              <p className="text-3xl font-semibold">Sair</p>
            </div>
          </div>
        </div>
      )}

      <div className="px-8 py-8 pb-14 xl:pr-20 fixed h-full max-md:hidden text-[#F7F0E4] bg-[#5A2C40] border-b-gray-50 shadow-md flex flex-col justify-between">
        <div className="flex flex-col gap-12 max-xl:items-center">
          <img src={logo1} className="w-47 h-8 max-xl:hidden" />
          <img src={logo2} className="h-8 w-12 xl:hidden" />
          <div className="flex flex-col gap-7 max-xl:items-center">
            <div
              className="flex items-center  flex-row gap-3 font-semibold p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-[#8B4571] hover:translate-x-2"
              onClick={() => nav("/")}
            >
              <Ticket className=" " size={30} />
              <p className="max-xl:hidden text-xl">Tickets</p>
            </div>

            <div
              className="flex items-center flex-row gap-3 font-semibold p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-[#8B4571] hover:translate-x-2"
              onClick={openModal}
            >
              <SquarePlus className="" size={30} />
              <p className="max-xl:hidden text-xl">Criar ticket</p>
            </div>

            {isAdmin && (
              <>
                <div
                  className="flex items-center flex-row gap-3 font-semibold p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-[#8B4571] hover:translate-x-2"
                  onClick={() => nav("/users")}
                >
                  <Users className=" " size={30} />
                  <p className="max-xl:hidden text-xl">Ver usuários</p>
                </div>

                <div
                  className="flex items-center flex-row gap-3 font-semibold p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-[#8B4571] hover:translate-x-2"
                  onClick={() => nav("/register")}
                >
                  <UserPlus className=" " size={30} />
                  <p className="max-xl:hidden cursor-pointer text-xl">
                    Cadastrar usuário
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-7 max-xl:items-center">
          <div className="flex items-center font-semibold flex-row gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-[#8B4571] hover:translate-x-2">
            <User className="cursor-pointer items-center" size={30} />
            <p className="max-xl:hidden cursor-pointer text-xl">Usuário</p>
          </div>

          <div className="flex items-center font-semibold flex-row gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-[#8B4571] hover:translate-x-2">
            <LogOut
              onClick={handleLogout}
              size={30}
              className=" transition-all"
            />
            <p className="max-xl:hidden cursor-pointer text-xl">Sair</p>
          </div>
        </div>
      </div>
      {isModalOpen && <NewTicket onClose={closeModal} />}
    </nav>
  );
}

export default Navbar;
