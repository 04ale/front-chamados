import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from "@/components/ui/pagination";

function Chevrons({ currentPage, setCurrentPage, pagination }) {
  const page = 12 + 1;
  return (
    <div className={`justify-between items-center flex flex-row px-8 gap-4 mt-2 ${pagination.total <= page && 'hidden'}`}>
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <>
              <PaginationItem>
                <PaginationFirst
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          {pagination.total > currentPage * page && (
            <>
              <PaginationItem>
                <PaginationNext
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  setCurrentPage={setCurrentPage}
                  pagination={pagination}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Chevrons;
