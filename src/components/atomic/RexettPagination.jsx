import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { adminJobListing } from "../../redux/slices/adminDataSlice";
import { Pagination } from "react-bootstrap";

const RexettPagination = ({number,setPage,page }) => {
  const dispatch = useDispatch()
  // const [page, setPage] = useState(1)
 

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber)

  }

  return (
    <>
        <Pagination className="pagination flex-wrap">
          <Pagination.Prev
            className="pagination-arrow custom-pagination-item me-1"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          />
          <div className="pages-link flex-wrap">

            {Array.from({ length: number }, (_, i) => (
              <Pagination.Item
                key={i}
                className="custom-pagination-item" 
                active={i + 1 === page}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
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
