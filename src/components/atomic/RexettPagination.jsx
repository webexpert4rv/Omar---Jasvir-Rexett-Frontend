import React from 'react'
import { Pagination } from 'react-bootstrap'

const RexettPagination = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
    <p className="showing-result">Showing 1 - 10 results</p>
    <Pagination className="custom-pagination">
        <Pagination.Prev className="custom-pagination-item custom-pagination-arrow" />
        <Pagination.Item className="custom-pagination-item" active>{1}</Pagination.Item>
        <Pagination.Item className="custom-pagination-item">{2}</Pagination.Item>
        <Pagination.Item className="custom-pagination-item">{3}</Pagination.Item>
        <Pagination.Ellipsis className="custom-pagination-item" />
        <Pagination.Item className="custom-pagination-item">{8}</Pagination.Item>
        <Pagination.Item className="custom-pagination-item">{9}</Pagination.Item>
        <Pagination.Item className="custom-pagination-item">{10}</Pagination.Item>
        <Pagination.Next className="custom-pagination-item custom-pagination-arrow" />
    </Pagination>
</div>
  )
}

export default RexettPagination