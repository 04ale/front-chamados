import React from 'react'

function Chevrons({currentPage, setCurrentPage, pagination}) {
  return (
     <div className="justify-between items-center flex flex-row px-8 gap-4 mt-2">
          {currentPage !== 1 && (
            <div className="flex gap-4">
              <ChevronsLeft
                size={50}
                onClick={() => setCurrentPage(1)}
                className=" bg-[#8B4571]/30 hover:bg-[#8B4571]/40 hover:text-[#5a1c37] duration-200 transition-all text-[#5A2C40] rounded-lg cursor-pointer"
              />
              <ChevronLeft
                size={50}
                onClick={() => setCurrentPage(currentPage - 1)}
                className=" bg-[#8B4571]/30 hover:bg-[#8B4571]/40 hover:text-[#5a1c37] duration-200 transition-all text-[#5A2C40] rounded-lg cursor-pointer"
              />
            </div>
          )}

          {pagination.total > currentPage * 30 && (
            <div className="w-full flex justify-between">
              <p></p>
              <div className="flex gap-4">
                <ChevronRight
                  size={50}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className=" bg-[#8B4571]/30 hover:bg-[#8B4571]/40 hover:text-[#5a1c37] text-[#5A2C40] duration-200 transition-all rounded-lg cursor-pointer"
                />
                <ChevronsRight
                  size={50}
                  className=" bg-[#8B4571]/30 hover:bg-[#8B4571]/40 hover:text-[#5a1c37] text-[#5A2C40] duration-200 transition-all rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage(pagination.lastPage)}
                />
              </div>
            </div>
          )}
        </div>
  )
}

export default Chevrons