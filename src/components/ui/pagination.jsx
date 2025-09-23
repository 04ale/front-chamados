import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({ className, isActive, size = "icon", ...props }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline hover:bg-[#FFFBF5]" : "ghost",
          size,
        }),
        className, "hover:bg-[#FFFBF5] hover:text-[#5A2C40] text-[#5A2C40] font-bold"
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  currentPage,
  setCurrentPage,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      onClick={() => setCurrentPage(currentPage - 1)}
      className={cn(
        "gap-1 px-2.5 sm:pl-2.5 cursor-pointer duration-300 hover:text-[#5A2C40] transition-all hover:bg-[#FFFBF5] text-[#5A2C40] font-semibold",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Voltar</span>
    </PaginationLink>
  );
}

function PaginationFirst({ className, setCurrentPage, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      onClick={() => setCurrentPage(1)}
      className={cn(
        "gap-1 px-2.5 sm:pl-2.5 cursor-pointer duration-300 hover:text-[#5A2C40] transition-all hover:bg-[#FFFBF5] text-[#5A2C40] font-semibold",
        className
      )}
      {...props}
    >
      <ChevronsLeftIcon />
      <span className="hidden sm:block">Início</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, setCurrentPage, currentPage, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      onClick={() => setCurrentPage(currentPage + 1)}
      className={cn(
        "gap-1 px-2.5 sm:pr-2.5 cursor-pointer duration-300 hover:text-[#5A2C40] transition-all hover:bg-[#FFFBF5] text-[#5A2C40] font-semibold",
        className
      )}
      {...props}
    >
      <span className="hidden sm:block">Avançar</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationLast({ className, setCurrentPage, pagination, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      onClick={() => setCurrentPage(pagination.lastPage)}
      className={cn(
        "gap-1 px-2.5 sm:pr-2.5 cursor-pointer duration-300 hover:text-[#5A2C40] transition-all hover:bg-[#FFFBF5] text-[#5A2C40] font-semibold",
        className
      )}
      {...props}
    >
      <span className="hidden sm:block">Fim</span>
      <ChevronsRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
};
