import React from 'react'
import { Button } from 'react-bootstrap'
import userImg from '../../../assets/img/user-img.jpg'
import { Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import NoDataFound from '../../atomic/NoDataFound';
import RexettPagination from '../../atomic/RexettPagination';
import { useSelector } from 'react-redux';
const JobCard = ({ handleJobStatusModal, type, data, jobStatus, role, setPage, page }) => {
    const { singleJobPagination } = useSelector(state => state.adminData)

   
    return (
        <>
            <div className="developers-list job-card ">

                {data?.length > 0 ? <>
                    {data?.map((item, index) => {
                        return (
                            <>
                                <div className="developer-card">
                                    <div className="tag-developer">{item?.recommed ? "Recommended" : type}</div>
                                    <div className="user-imgbx">
                                        <img src={item?.developer?.profile_picture ? item?.developer?.profile_picture :userImg } alt='developer'  className="user-img" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="user-name">{item?.developer?.name}</h3>
                                        <p className="designation-user">Software Developer</p>
                                        <p className="email-user">{item?.developer?.email}</p>
                                        <ul className="social-icons">
                                            <li>
                                                <Link to="#"><FaGithub /></Link>
                                            </li>
                                            <li>
                                                <Link to="#"><FaLinkedin /></Link>
                                            </li>
                                            {/* <li>
                                                <Link to="#"><MdEmail /></Link>
                                            </li> */}
                                        </ul>
                                        {role !== "admin" && (type === "Shortlisted" || type === "Suggested" || type === "Interviewing") && type !== "Hired" ? <Button variant="danger" disabled={jobStatus === "Ended" ? true : false} onClick={() => handleJobStatusModal(item?.id, type)} className="w-100 bg-white text-black border-white mt-3">{type === "Interviewing" ? "Hire" : type === "Shortlisted" ? "Interview" : "Shortlist"}</Button> : ""}
                                        {role !== "admin" && <Button variant="danger" onClick={() => handleJobStatusModal(item?.id, "rejected")} disabled={jobStatus === "Ended" ? true : false} className="w-100 mt-2">Reject</Button>}
                                        {role === "admin" && type !== "Interviewing" && <Button variant={item?.developer?.already_suggested ? "dark" : "success"} onClick={() => handleJobStatusModal(item?.developer?.id, item?.developer?.already_suggested ? 0 : 1)} className="w-100 mt-2 bg-white border-white text-black mt-3 font-15">{item?.developer?.already_suggested ? "Suggested" : "Suggest"}</Button>}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </> :
                    <div> <NoDataFound  data="No developer found"/></div>}
            </div>
            
            {  role === "admin" && type === "Suggested" ?<div className="d-flex w-100 align-items-center justify-content-between my-4">
                        <p className="mb-0">Showing {singleJobPagination?.data?.length} results</p> 
                        <RexettPagination number={singleJobPagination?.total_pages_for_all} setPage={setPage} page={page} />
                    </div>: ""}
        </>

    )
}

export default JobCard