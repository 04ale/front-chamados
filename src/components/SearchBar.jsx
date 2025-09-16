import { Search } from "lucide-react";

function SearchBar({ inputValue, setInputValue }) {
  
  return (
    
      <div className="w-full h-full flex flex-col gap-2 z-10">
        <p className="text-xl font-semibold text-[#5A2C40]">Procurar ticket</p>
        <div className="relative flex items-center h-full w-full">
          <div className="absolute left-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Pesquisar por título"
              className="w-full rounded-lg border border-[#5A2C40]/20 bg-[#FFFBF5] py-2 pl-10 pr-4 focus:outline-none focus:ring focus:ring-[#5A2C40] transition-all duration-200"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
    </div>
  );
}

export default SearchBar;
