// src/components/Pagination.tsx

import React from "react";

interface PaginationProps {
  page: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>
        Previous
      </button>
      <span className="current-page">Page {page}</span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Pagination;
