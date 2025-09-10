import { Search } from "lucide-react";
import { useState } from "react";

function SearchBar({ tickets }) {
  const [inputValue, setInputValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  return (
    <div className="flex max-sm:flex-col sm:flex-row gap-10 w-full">
      <div className="w-full flex flex-col gap-2">
        <p className="text-xl font-semibold text-[#5A2C40]">Procurar ticket</p>
        <div className="relative flex items-center w-full">
          <div className="absolute left-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-[1fr_auto] w-full gap-2">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full rounded-lg border border-[#5A2C40]/20 bg-[#FFFBF5] py-2 pl-10 pr-4 focus:outline-none focus:ring focus:ring-[#5A2C40] transition-all duration-200"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="rounded-lg right-0 border border-[#5A2C40]/20 bg-[#FFFBF5] text-[#5A2C40] py-2 px-2 focus:outline-none transition-all duration-200 cursor-pointer">
              <Search />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-center text-xl font-semibold text-[#5A2C40]">Filtros</p>
        <div className="flex flex-row gap-3">
          <select name="" id="">
            <option value="aberto">Nome</option>
            <option value="em_andamento">Em andamento</option>
            <option value="fechado">Fechado</option>
          </select>
          <select name="" id="">
            <option value="aberto">Aberto</option>
            <option value="em_andamento">Em andamento</option>
            <option value="fechado">Fechado</option>
          </select>
          <select name="" id="">
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
