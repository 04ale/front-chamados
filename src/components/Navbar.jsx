import { Menu, MessageCircle, SquarePlus, Ticket, User } from "lucide-react";
import logo1 from '../assets/img/logo1.png'
import logo2 from '../assets/img/logo2.png'
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const {logout} = useAuth()

  const handleLogout = () => {
    logout();
  };
  return (
    <nav>
      <div className="p-3 md:hidden px-6 w-full fixed bg-[#F1F3F5] border-b-gray-50 shadow-md flex justify-between">
        <img src={logo1} className="w-47 h-8 max-sm:hidden"/>
          <img src={logo2} className="h-8 sm:hidden"/>
        <div className="flex flex-row gap-8 items-center">
            <Ticket />
            <SquarePlus />
          <User />
        </div>
      </div>

      <div className="px-8 py-8 pb-14 xl:pr-30 fixed h-full max-md:hidden border-b-gray-50 shadow-md flex flex-col justify-between">
        <div className="flex flex-col gap-12">
          <img src={logo1} className="w-47 h-8 max-xl:hidden"/>
          <img src={logo2} className="h-8 xl:hidden"/>
          <div className="flex flex-col gap-7">
            <div className="flex items-center flex-row gap-3 font-semibold">
              <Ticket className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" size={30} />
              <p className="max-xl:hidden cursor-pointer text-xl">Tickets</p>
            </div>
            <div className="flex items-center font-semibold flex-row gap-3">
              <SquarePlus className="cursor-pointer" size={30}/>
              <p className="max-xl:hidden cursor-pointer text-xl">Criar ticket</p>
            </div>
            <p onClick={handleLogout}>deslogar</p>
          </div>
        </div>
        <div className="flex items-center font-semibold flex-row gap-3">
          <User className="cursor-pointer" size={30}/>
          <p className="max-xl:hidden cursor-pointer">Usuário</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
