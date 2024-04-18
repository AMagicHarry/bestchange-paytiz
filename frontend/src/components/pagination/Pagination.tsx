import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import Style from "./pagination.module.css";
import React, { useState } from "react";

interface PaginationProps {
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalResults,
  resultsPerPage,
  onPageChange,
  maxVisiblePages,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  // const startResult = (currentPage - 1) * resultsPerPage + 1;
  // const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const getPageNumbers = () => {
    const pageNumbers: (number | null)[] = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push(null); // Add ellipsis if there are skipped pages before the startPage
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(null); // Add ellipsis if there are skipped pages after the endPage
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className={Style.pagination_container}>
      <div className={Style.pagination_btn_wrapper}>
        <button
          className='cursor-pointer hover:bg-gray-200 p-[.3rem] rounded-md text-[14px] font-[600] flex items-center gap-[1rem] justify-center '
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <PiCaretLeftBold />
          Previous
        </button>
        <div className="flex w-[max-content] gap-[1rem">
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            className={`
              hover:bg-gray-200 p-[.2rem] rounded-lg ${pageNumber === currentPage ? Style.active : Style.btn_paginate} 
            `}
            onClick={() => handlePageClick(pageNumber as number)}
            disabled={pageNumber === null}
          >
            {pageNumber === null ? "..." : pageNumber}
          </button>
        ))}
        </div>
        <button
          className='cursor-pointer text-[14px] font-[600] rounded-md hover:bg-gray-200 p-[.3rem] rounded-md flex items-center gap-[1rem] justify-center '
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <PiCaretRightBold />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
