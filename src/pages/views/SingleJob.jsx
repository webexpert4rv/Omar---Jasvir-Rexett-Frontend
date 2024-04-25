import React, { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs, Tooltip, OverlayTrigger } from "react-bootstrap";
// import userImg from '../../assets/img/user-img.jpg'

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import RejectModal from "./Modals/RejectModal";
import EndJobModal from "./Modals/EndJob";
import ConfirmationModal from "./Modals/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { changeJobStatus, getAllJobPostedList, getDeleteJob, getJobCategoryList, publishedPost, singleJobPostData } from "../../redux/slices/clientDataSlice";
import JobCard from "../../components/common/SingleJob/JobCard";
import RexettSpinner from "../../components/atomic/RexettSpinner";
import { jobPostConfirmMessage } from "../../helper/utlis";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { BsFillSendXFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FaTrashCan } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";


const SingleJob = () => {
    const [selectedTabsData, setSelectedTabsData] = useState([])
    const [currentTabsStatus, setCurrnetTabsStatus] = useState("application")
    const [currentTab, setCurrentTab] = useState("application")
    const [statusModal, setStatusModal] = useState({
        isTrue: false,
        id: null
    })
    const [singleJobDescription, setSingleJobDescription] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    let id = location.pathname.split("/")[2]
    const { allJobPostedList, jobCategoryList, jobPostedData, approvedLoader, smallLoader } = useSelector(state => state.clientData)
    const { t } = useTranslation()
    useEffect(() => {
        if (id) {
            dispatch(singleJobPostData(id, () => { }))
        }
    }, [])

    console.log(jobPostedData, "jobPostedData")
    useEffect(() => {
        setSingleJobDescription(jobPostedData?.data)
    }, [jobPostedData])

    const getCategory = (cat) => {
        let data = jobCategoryList.find((item) => item.id == cat)
        return data?.title
    }

    const convertToArray = (arr) => {
        const skillsArray = arr?.split(",");
        return skillsArray
    }
    const handleUnpublished = (id, data) => {

        dispatch(publishedPost(id, data, () => {
            dispatch(singleJobPostData(id, () => { }))
        }
        ))

    }
    console.log(singleJobDescription?.experience , "singleJobDescription")
    const handleSelect = (key) => {
        setCurrentTab(key)
        setSelectedTabsData(jobPostedData[key])
        if (key == "suggested") {
            setCurrnetTabsStatus("shortlisted")
        }
        if (key == "shortlisted") {
            setCurrnetTabsStatus("interviewing")
        }
        if (key == "interviewing") {
            setCurrnetTabsStatus("hired")
        }
        if (key == "application") {
            setCurrnetTabsStatus("application")
        }

    }
    const handleJobStatusAction = (e, data, id) => {
        e.preventDefault()
        if (data.status == "ended") {
            dispatch(publishedPost(singleJobDescription?.id, data, () => {
                setStatusModal({})
                dispatch(singleJobPostData(id, () => {

                }))
            }
            ))
        } else if (data.status == "application") {
            dispatch(getDeleteJob(statusModal?.id, () => {
                setStatusModal({})
                navigate("/job-posted")
            }))
        } else {
            dispatch(changeJobStatus(currentTab, statusModal?.id, data, () => {
                dispatch(singleJobPostData(id, () => {
                    setStatusModal({})
                    let prevData = { ...jobPostedData }
                    let d = prevData[currentTab]?.filter(item => item.id !== statusModal?.id)
                    prevData[currentTab] = d
                    setSelectedTabsData(prevData[currentTab])
                }))
            }))
        }
    }

    const handleEdit = () => {
        if (singleJobDescription?.status == "published") {
            navigate(`/job-edit-post/${id}`)
        }
    }

    const handleJobStatusModal = (e, id, status) => {

        if (e == undefined) {
            setStatusModal({
                [status]: !statusModal.isTrue,
                id: id
            })
        } else {
            e.stopPropagation();

            setStatusModal({
                [status]: !statusModal.isTrue,
                id: id
            })
        }

    }
    const endjob = (
        <Tooltip id="tooltip">
            End Job
        </Tooltip>
    );
    const deletejob = (
        <Tooltip id="tooltip">
            {singleJobDescription?.status == "published" ? "Delete Job" : "Unpublish Job to delete"}
        </Tooltip>
    );
    const editjob = (
        <Tooltip id="tooltip">
            {singleJobDescription?.status == "published" ? "Edit Job" : "Unpublish Job to edit"}
        </Tooltip>
    );

    const publishjob = (
        <Tooltip id="tooltip">
            {singleJobDescription?.status == "published" ? "Unpublish Job" : "Publish Job"}
        </Tooltip>
    )
    const handleDelete = (status, id) => {
        if (singleJobDescription?.status == "published") {
            setStatusModal({
                [status]: !statusModal.isTrue,
                id: id
            })
        }
    }


    return (
        <>
            <Tabs
                defaultActiveKey="application"
                id="fill-tab-example"
                className="mb-3 job-tabs"
                onSelect={handleSelect}
            >
                <Tab eventKey="application" title={t("jobDetails")}>
                    <section className="single-job-section">
                        <div className="single-job-card job-information-wrapper">
                            <div className="d-flex justify-content-between align-items-md-center flex-md-row flex-column-reverse">
                                <h2 className="single-job-title text-start mb-0">{singleJobDescription?.title}</h2>
                                <div className="d-flex gap-3 flex-wrap mb-md-0 mb-4 align-items-center">
                                    <p className="mb-0"><span className="status-text inprogress status-info">{singleJobDescription?.status}</span></p>
                                    {singleJobDescription?.status !== "ended" ? <>
                                        <OverlayTrigger placement="top" overlay={endjob}>
                                            <Button variant="transparent" onClick={(e) => handleJobStatusModal(e, singleJobDescription?.id, "ended")} className="closed-job-btn"><MdOutlineDoNotDisturbAlt /></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="top" overlay={publishjob}>
                                            <Button variant="transparent" className="py-2 main-btn publish-job-btn" onClick={() => {
                                                let data = {
                                                    status: singleJobDescription?.status == "published" ? "Unpublished" : "published"
                                                }
                                                handleUnpublished(singleJobDescription?.id, data)
                                            }}>{approvedLoader ? <RexettSpinner /> : singleJobDescription?.status == "published" ? <BsFillSendXFill /> : <BsFillSendFill />}</Button>
                                        </OverlayTrigger>
                                    </> : ""}
                                    <OverlayTrigger placement="top" overlay={deletejob}>
                                        <Button onClick={() => handleDelete("application", singleJobDescription?.id)}><FaTrashCan /></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={editjob}>
                                        <Button onClick={() => handleEdit("application", singleJobDescription?.id)}><TiEdit /></Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <h4 className="single-job-category">{getCategory(singleJobDescription?.category)}</h4>
                            <p className="single-job-description">{singleJobDescription?.description}</p>
                        </div>
                        <div className="single-job-card">
                            <Row>
                                <Col md="4">
                                    <h3 className="req-heading">{t("experienceRequirements")}</h3>
                                    <p className="req-text">{singleJobDescription?.experience?.split("_").join(" ")}</p>
                                </Col>
                                <Col md="4">
                                    <h3 className="req-heading">{t("contract")}</h3>
                                    <p className="req-text">{singleJobDescription?.contract_type}</p>
                                </Col>
                                <Col md="4">
                                    <h3 className="req-heading">{t("location")}</h3>
                                    <p className="req-text">{singleJobDescription?.job_type}</p>
                                </Col>
                            </Row>
                        </div>
                        <div className="single-job-card">
                            <h3 className="req-heading">{t("skills")}</h3>
                            <ul className="skills-listing mb-0">
                                {
                                    convertToArray(singleJobDescription?.skills)?.map((item, index) => {
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
                <Tab eventKey="suggested" title={t("suggestions")}>
                    <JobCard handleJobStatusModal={handleJobStatusModal} type="Suggested" data={selectedTabsData} jobStatus={singleJobDescription?.status} />
                </Tab>
                <Tab eventKey="shortlisted" title={t("shortlisted")}>
                    {/* <div className="developers-list job-card">
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
                                <Button variant="danger" onClick= className="w-100 mt-3">Reject</Button>
                            </div>
                        </div>
                    </div> */}
                    <JobCard handleJobStatusModal={handleJobStatusModal} type="Shortlisted" data={selectedTabsData} jobStatus={singleJobDescription?.status} />
                </Tab>
                <Tab eventKey="interviewing" title={t("interviewing")}>
                    <JobCard handleJobStatusModal={handleJobStatusModal} type="Interviewing" data={selectedTabsData} jobStatus={singleJobDescription?.status} />
                    {/* <div className="developers-list job-card">
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
                                <Button variant="danger" onClick={handleJobStatusModal} className="w-100 bg-white text-black border-white mt-3">Hire</Button>
                                <Button variant="danger" onClick= className="w-100 mt-2">Reject</Button>
                            </div>
                        </div>
                    </div> */}
                </Tab>
                <Tab eventKey="hired" title={t("hired")}>
                    {/* <div className="developers-list job-card">
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
                                <Button variant="danger" onClick= className="w-100 mt-3">Remove</Button>
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
                    </div> */}
                    <JobCard handleJobStatusModal={handleJobStatusModal} type="Hired" data={selectedTabsData} jobStatus={singleJobDescription?.status} />
                </Tab>
            </Tabs>
            <RejectModal show={statusModal?.rejected} handleClose={handleJobStatusModal} onClick={handleJobStatusAction} type={currentTab} smallLoader={smallLoader} />
            <EndJobModal show={statusModal?.ended} handleClose={handleJobStatusModal} onClick={handleJobStatusAction} smallLoader={smallLoader} header="End Job" feedbacks={"Feedbacks"} submit={"Request"} />
            <ConfirmationModal text={jobPostConfirmMessage(currentTab)} show={statusModal?.Shortlisted || statusModal?.Interviewing || statusModal?.Suggested || statusModal?.application} onClick={handleJobStatusAction} handleClose={handleJobStatusModal} smallLoader={smallLoader} type={currentTabsStatus} />
            {/* <ConfirmationModal
                text={ `Are you sure you want to delete this job`}
                show={showModal} onClick={handleAction}
                handleClose={handleDelete}
                smallLoader={smallLoader}
            /> */}
        </>
    )
}
export default SingleJob;