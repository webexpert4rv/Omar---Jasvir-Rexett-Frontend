import React, { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import userImg from '../../assets/img/user-img.jpg'
import { Link, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import RejectModal from "./Modals/RejectModal";
import EndJobModal from "./Modals/EndJob";
import ConfirmationModal from "./Modals/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobPostedList, getJobCategoryList, publishedPost } from "../../redux/slices/clientDataSlice";
const SingleJob = () => {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showEndJobModal, setShowEndJobModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [singleJobDescription,setSingleJobDescription]=useState({})
    const dispatch =useDispatch()
    const location=useLocation();
    let id=location.pathname.split("/")[2]
    const {allJobPostedList,jobCategoryList}=useSelector(state=>state.clientData)

    useEffect(()=>{
        dispatch(getAllJobPostedList())
        dispatch(getJobCategoryList())
    },[dispatch])


    useEffect(()=>{
    if(id){
       let selectedJobs= allJobPostedList.find((item)=>item.id==id)
       console.log(selectedJobs,"selectedJobs")
       setSingleJobDescription(selectedJobs)
    }
    },[allJobPostedList])

    const getCategory=(cat)=>{
        let data= jobCategoryList.find((item)=>item.id==cat)
        return data?.title
     }

    const handleShowRejectModal = () => {
        setShowRejectModal(true);
    };

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
    };

    const handleShowEndJobModal = () => {
        setShowEndJobModal(true);
    };

    const handleCloseEndJobModal = () => {
        setShowEndJobModal(false);
    };

    const handleShowConfirmationModal = () => {
        setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };
    const convertToArray=(arr)=>{
        const skillsArray = arr?.split(",");
        return skillsArray
    }
    const handleUnpublished=(id,status)=>{
        dispatch(publishedPost(id,status))

    }
    return (
        <>
            <Tabs
                defaultActiveKey="application"
                id="fill-tab-example"
                className="mb-3 job-tabs"
                fill
            >
                <Tab eventKey="application" title="Application">
                    <section className="single-job-section">
                        <div className="single-job-card job-information-wrapper">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="single-job-title mb-0">{singleJobDescription?.title}</h2>
                                <div className="d-flex gap-3 align-items-center">
                                    <p className="mb-0">Status <span className="status-text inprogress status-info">{singleJobDescription?.status}</span></p>
                                    <Button variant="transparent" onClick={handleShowEndJobModal} className="px-5 closed-job-btn">End Job</Button>
                                    <Button variant="transparent" className="px-5 unpublish-btn" onClick={()=>handleUnpublished(singleJobDescription?.id,singleJobDescription?.status)}>Unpublish</Button>
                                </div>
                            </div>
                            <h4 className="single-job-category">{getCategory(singleJobDescription?.category)}</h4>
                            <p className="single-job-description">{singleJobDescription?.description}</p>
                        </div>
                        <div className="single-job-card">
                            <Row>
                                <Col md="4">
                                    <h3 className="req-heading">Experience Requirements</h3>
                                    <p className="req-text">{singleJobDescription?.experience}</p>
                                </Col>
                                <Col md="4">
                                    <h3 className="req-heading">Contract</h3>
                                    <p className="req-text">{singleJobDescription?.contract_type}</p>
                                </Col>
                                <Col md="4">
                                    <h3 className="req-heading">Location</h3>
                                    <p className="req-text">{singleJobDescription?.job_type}</p>
                                </Col>
                            </Row>
                        </div>
                        <div className="single-job-card">
                            <h3 className="req-heading">Skills</h3>
                            <ul className="skills-listing mb-0">
                            {
                                                convertToArray(singleJobDescription?.skills)?.map((item,index)=>{
                                                    return (
                                                        <>
                                                         <li key={index}>{item}</li>
                                                        </>
                                                    )
                                                })
                                            }
                            </ul>
                        </div>
                    </section>
                </Tab>
                <Tab eventKey="suggested" title="Suggestions">
                    <div className="developers-list job-card">
                        <div className="developer-card">
                            <div className="tag-developer">Suggested</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
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
                                <Button variant="danger" onClick={handleShowConfirmationModal} className="w-100 bg-white text-black border-white mt-3">Shortlist</Button>
                                <Button variant="danger" onClick={handleShowRejectModal} className="w-100 mt-2">Reject</Button>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="shortlisted" title="Shortlisted">
                    <div className="developers-list job-card">
                        <div className="developer-card">
                            <div className="tag-developer">Shortlisted</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
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
                                <Button variant="danger" onClick={handleShowRejectModal} className="w-100 mt-3">Reject</Button>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="interviewing" title="Interviewing">
                    <div className="developers-list job-card">
                        <div className="developer-card">
                            <div className="tag-developer">Interviewing</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
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
                                <Button variant="danger" onClick={handleShowConfirmationModal} className="w-100 bg-white text-black border-white mt-3">Hire</Button>
                                <Button variant="danger" onClick={handleShowRejectModal} className="w-100 mt-2">Reject</Button>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="hired" title="Hired">
                    <div className="developers-list job-card">
                        <div className="developer-card">
                            <div className="tag-developer">Hired</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
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
                                <Button variant="danger" onClick={handleShowRejectModal} className="w-100 mt-3">Remove</Button>
                            </div>
                        </div>
                        <div className="developer-card">
                            <div className="tag-developer">End Job</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
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
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
            <RejectModal show={showRejectModal} handleClose={handleCloseRejectModal} />
            <EndJobModal show={showEndJobModal} handleClose={handleCloseEndJobModal} />
            <ConfirmationModal show={showConfirmationModal} handleClose={handleCloseConfirmationModal} />
        </>
    )
}
export default SingleJob;