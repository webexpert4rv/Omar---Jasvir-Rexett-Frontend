import React from 'react'
import { Button } from 'react-bootstrap'
import userImg from '../../../assets/img/user-img.jpg'
import { Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import NoDataFound from '../../atomic/NoDataFound';
const JobCard = ({ handleJobStatusModal, type, data,jobStatus }) => {
    return (
        <>
            <div className="developers-list job-card">
                {
                    data?.length > 0 ? data?.map((item, index) => {
                        return (
                            <>
                                <div className="developer-card">
                                    <div className="tag-developer">{type}</div>
                                    <div className="user-imgbx">
                                        <img src={item?.developer?.profile_picture} className="user-img" />
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
                                            <li>
                                                <Link to="#"><MdEmail /></Link>
                                            </li>
                                        </ul>
                                        {(type === "Shortlisted" ||type === "Suggested" || type === "Interviewing") && type!=="Hired" ? <Button variant="danger" disabled={jobStatus==="Ended"?true:false} onClick={() => handleJobStatusModal(item?.id, type)} className="w-100 bg-white text-black border-white mt-3">{type === "Interviewing"?"Hire": type === "Shortlisted" ? "Interview" : "Shortlist"}</Button> : ""}
                                        <Button variant="danger" onClick={() => handleJobStatusModal(item?.id, "rejected")} disabled={jobStatus==="Ended"?true:false} className="w-100 mt-2">Reject</Button>
                                    </div>
                                </div>

                            </>
                        )
                    })
                        :
                        <NoDataFound />
                }
            </div>
        </>

    )
}

export default JobCard