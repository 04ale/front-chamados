import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


function Header({ capitalizeFirstLetter, screenRef }) {
    const {user} = useAuth()
    const nav = useNavigate()

    return (
      <div className=" text-[#5A2C40]" ref={screenRef}>
        <h1 className="text-4xl font-bold ">Tickets</h1>
        <p className="text-2xl font-semibold">
          {capitalizeFirstLetter(user?.name)}
        </p>
      </div>
  );
}

export default Header;
