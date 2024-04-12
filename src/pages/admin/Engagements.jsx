import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminEngagementList } from "../../redux/slices/adminDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import NoDataFound from "../../components/atomic/NoDataFound";
import { IoSearch } from "react-icons/io5";
import RexettPagination from "../../components/atomic/RexettPagination";
const Engagements = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const { engagement, screenLoader } = useSelector(state => state.adminData)
    const [page , setPage] = useState(1)

    useEffect(() => {
        dispatch(adminEngagementList({page : page}))
    }, [page])

    const handleSearch = () => {
        let data = {
            search: search
        }
        dispatch(adminEngagementList(data))
    }
    return (
        <>
            <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
                <h2 className="section-head border-0 mb-md-0 mb-3 pb-0">Engagements</h2>

                <div className="d-flex gap-3">
                    <Form.Control type="text" className="form-field font-14 shadow-none" placeholder="Enter Search Keywords" onChange={(e) => setSearch(e.target.value)}></Form.Control>
                    <Button variant="transparent" className="main-btn px-3 search-btn" onClick={handleSearch}><IoSearch /></Button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table w-100 engagement-table table-ui-custom">
                    <thead>
                        <th>Client Name</th>
                        <th>Developer Name</th>
                        <th>Developer associated with</th>
                        <th>Job Title</th>
                        <th>Contract Type</th>
                        <th>Location</th>
                        <th>Total Hours</th>
                    </thead>
                    <tbody>
                        {screenLoader ? <ScreenLoader /> : <>
                            {engagement?.data?.length > 0 ?
                                engagement?.data?.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item?.contract?.client?.name}</td>
                                                <td>{item?.contract?.developer?.name}</td>
                                                <td>Rexett</td>
                                                <td>{item?.contract?.job?.title}</td>
                                                <td>{item?.contract?.employment_type}</td>
                                                <td>{item?.contract?.job_type}</td>
                                                <td>{item?.total_duration}</td>
                                            </tr>
                                        </>
                                    )
                                })
                                : <NoDataFound />}
                        </>}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between align-items-center mb-4">
                            <p className="showing-result">Showing {(engagement?.items_per_page)} results</p>
                            <RexettPagination  number = {engagement?.total_pages} setPage={setPage} page={page}/>
                        </div>
            </div>
        </>
    )
}
export default Engagements;