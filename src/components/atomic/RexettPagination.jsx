import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { adminJobListing } from "../../redux/slices/adminDataSlice";
import { Pagination } from "react-bootstrap";

const RexettPagination = () => {

  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const { jobListing } = useSelector(state => state.adminData)






  const handlePageChange = (page) => {
    dispatch(adminJobListing({ page: page }))
    setPage(page)

  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <p className="showing-result"></p>
        <Pagination className="justify-content-center mt-4 align-items-center">
          <Pagination.Prev
            className="pagination-arrow me-3"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          />
          <div className="pages-link d-flex">

            {Array.from({ length: jobListing?.totalPages }, (_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === page}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </div>
          <Pagination.Next
            className="pagination-arrow next-arrow ms-3"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === jobListing?.totalPages}
          />
        </Pagination>
      </div>
    </>
  );
};

export default RexettPagination;
