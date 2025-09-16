import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


function Header({ capitalizeFirstLetter, screenRef }) {
    const {user, isAdmin} = useAuth()
    const nav = useNavigate()

    return (
    <div className="grid grid-cols-[1fr_auto]">
      <div className=" text-[#5A2C40]" ref={screenRef}>
        <h1 className="text-4xl font-bold ">Tickets</h1>
        <p className="text-2xl font-semibold">
          {capitalizeFirstLetter(user?.name)}
        </p>
      </div>
      <div>
        {isAdmin && (
          <button
            className="p-3 border border-[#5A2C40]/20 bg-[#FFFBF5] font-semibold text-[#5A2C40] rounded-lg cursor-pointer"
            onClick={() => nav("/closed")}
          >
            Ver tickets fechados
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
