import React from "react";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const RexettPagination = () => {

  //  const handlePageClick = (value) => {
  //   const updatedFilter = {
  //     ...activeFilter,
  //     pageNumber: value,
  //     page:value, // Update the pageNumber here
  //   };
  //   setActiveFilter(updatedFilter);
  // };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="className="custom-pagination>

      {" "}
      <ResponsivePagination
      current={1}
      total={10}
      // onPageChange={handlePageClick}
    />
      </div>

    </div>
  );
};

export default RexettPagination;
