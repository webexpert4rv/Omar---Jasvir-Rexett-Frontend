import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { adminJobListing } from "../../redux/slices/adminDataSlice";
import { Pagination } from "react-bootstrap";

const RexettPagination = ({ number, setPage, page }) => {
  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    if (number <= 6) {
      // If total number of pages is 6 or less, render all pages
      for (let i = 1; i <= number; i++) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            className="custom-pagination-item"
            active={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      // If total number of pages is greater than 6, render first 3 pages, last 3 pages, and dots
      paginationItems.push(
        <Pagination.Item
          key={1}
          className="custom-pagination-item"
          active={1 === page}
          onClick={() => handlePageChange(1)}
        >
          {1}
        </Pagination.Item>
      );

      if (page > 4) {
        paginationItems.push(
          <Pagination.Ellipsis key="start-dots" disabled />
        );
      }

      for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, number - 1); i++) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            className="custom-pagination-item"
            active={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (page < number - 3) {
        paginationItems.push(
          <Pagination.Ellipsis key="end-dots" disabled />
        );
      }

      paginationItems.push(
        <Pagination.Item
          key={number}
          className="custom-pagination-item"
          active={number === page}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return paginationItems;
  };

  return (
    <>
      <Pagination className="pagination flex-wrap">
        <Pagination.Prev
          className="pagination-arrow custom-pagination-item me-1"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />
        <div className="pages-link flex-wrap">
          {renderPaginationItems()}
        </div>
        <Pagination.Next
          className="pagination-arrow next-arrow ms-1 custom-pagination-item"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === number}
        />
      </Pagination>
    </>
  );
};

export default RexettPagination;
