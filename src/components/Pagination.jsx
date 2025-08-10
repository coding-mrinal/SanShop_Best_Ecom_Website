import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = []; const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      if (endPage - startPage < maxVisiblePages - 1) startPage = Math.max(1, endPage - maxVisiblePages + 1);
      if (startPage > 1) { pages.push(1); if (startPage > 2) pages.push('...'); }
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages) { if (endPage < totalPages - 1) pages.push('...'); pages.push(totalPages); }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  const isDisabled = (cond) => cond ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'border border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20';
  const isActive = (page) => page === currentPage ? 'bg-pink-500 text-white dark:bg-cyan-500 shadow-lg' : page === '...' ? 'text-gray-400 dark:text-gray-500 cursor-default' : `${isDisabled(false)} hover:scale-105`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Showing <span className="font-medium text-pink-600 dark:text-cyan-300">{startItem}</span> to <span className="font-medium text-pink-600 dark:text-cyan-300">{endItem}</span> of <span className="font-medium text-pink-600 dark:text-cyan-300">{totalItems}</span> results
      </div>
      <div className="flex items-center space-x-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={`flex items-center px-3 py-2 rounded-xl font-medium transition-all duration-300 ${isDisabled(currentPage === 1)}`}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </button>
        <div className="flex items-center space-x-1 mx-4">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 rounded-xl font-medium transition-all duration-300 ${isActive(page)}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`flex items-center px-3 py-2 rounded-xl font-medium transition-all duration-300 ${isDisabled(currentPage === totalPages)}`}>
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;