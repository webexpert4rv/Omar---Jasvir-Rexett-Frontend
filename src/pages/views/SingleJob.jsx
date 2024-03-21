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
import { changeJobStatus, getAllJobPostedList, getJobCategoryList, publishedPost, singleJobPostData } from "../../redux/slices/clientDataSlice";
import JobCard from "../../components/common/SingleJob/JobCard";
import RexettSpinner from "../../components/atomic/RexettSpinner";
import { jobPostConfirmMessage } from "../../helper/utlis";
const SingleJob = () => {
    const [selectedTabsData,setSelectedTabsData]=useState([])
    const [currentTabsStatus,setCurrnetTabsStatus]=useState(null)
    const [currentTab,setCurrentTab]=useState("application")
    const [statusModal,setStatusModal]=useState({
        isTrue:false,
        id:null
    })
    const [singleJobDescription,setSingleJobDescription]=useState({})
    const dispatch =useDispatch()
    const location=useLocation();
    let id=location.pathname.split("/")[2]
    const {allJobPostedList,jobCategoryList,jobPostedData,approvedLoader,smallLoader}=useSelector(state=>state.clientData)
   
    useEffect(()=>{
    if(id){
        dispatch(singleJobPostData(id,()=>{}))
    }
    },[])


    useEffect(()=>{
        setSingleJobDescription(jobPostedData?.data)
    },[jobPostedData])

    const getCategory=(cat)=>{
        let data= jobCategoryList.find((item)=>item.id==cat)
        return data?.title
     }

    const convertToArray=(arr)=>{
        const skillsArray = arr?.split(",");
        return skillsArray
    }
    const handleUnpublished=(id,data)=>{
        
        dispatch(publishedPost(id,data,()=>{
            dispatch(singleJobPostData(id,()=>{})) 
        }
        ))

    }
    const handleSelect=(key)=>{
        setCurrentTab(key)
        setSelectedTabsData(jobPostedData[key])
        if(key=="suggested"){
            setCurrnetTabsStatus("shortlisted")
        }
        if(key=="shortlisted"){
            setCurrnetTabsStatus("interviewing")
        }
        if(key=="interviewing"){
            setCurrnetTabsStatus("hired") 
        }
       
    }
    const handleJobStatusAction= (e,data) => {
        e.preventDefault()
        if(data.status=="ended"){
            dispatch(publishedPost(singleJobDescription?.id,data,()=>{
                setStatusModal({})
                dispatch(singleJobPostData(id,()=>{

                })) 
            }
            ))
        }else{
            dispatch(changeJobStatus(currentTab,statusModal?.id,data, () => {    
                dispatch(singleJobPostData(id,()=>{
                    setStatusModal({})
                    let prevData={...jobPostedData}
                   let d= prevData[currentTab]?.filter(item=>item.id!==statusModal?.id)
                   prevData[currentTab]=d
                   setSelectedTabsData(prevData[currentTab])
                }))
            }))
        }
           
    }
    

    const handleJobStatusModal=(id,status)=>{
        setStatusModal({
            [status]:!statusModal.isTrue,
            id:id
        })
    }

    return (
        <>
            <Tabs
                defaultActiveKey="application"
                id="fill-tab-example"
                className="mb-3 job-tabs"
                fill
                onSelect={handleSelect}
            >
                <Tab eventKey="application" title="Job Details">
                    <section className="single-job-section">
                        <div className="single-job-card job-information-wrapper">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="single-job-title mb-0">{singleJobDescription?.title}</h2>
                                <div className="d-flex gap-3 align-items-center">
                                    <p className="mb-0">Status <span className="status-text inprogress status-info">{singleJobDescription?.status}</span></p>
                                   { singleJobDescription?.status!=="ended"?<>
                                   <Button variant="transparent" onClick={() => handleJobStatusModal(singleJobDescription?.id, "ended")} className="px-xxl-5 px-4 closed-job-btn">End Job</Button>
                                    <Button variant="transparent" className="px-xxl-5 px-4 py-2 outline-main-btn" onClick={()=>{
                                        let data={
                                            status:singleJobDescription?.status=="published"?"Unpublished":"published"
                                        }
                                        handleUnpublished(singleJobDescription?.id,data)
                                        }}>{approvedLoader?<RexettSpinner/>: singleJobDescription?.status=="published"?"Unpublish":"Publish"}</Button>
                                   </>:"" }
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
                <JobCard handleJobStatusModal={handleJobStatusModal} type="Suggested" data={selectedTabsData}  jobStatus={singleJobDescription?.status}/>
                </Tab>
                <Tab eventKey="shortlisted" title="Shortlisted">
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
                    <JobCard handleJobStatusModal={handleJobStatusModal} type="Shortlisted"  data={selectedTabsData} jobStatus={singleJobDescription?.status}/>
                </Tab>
                <Tab eventKey="interviewing" title="Interviewing">
                <JobCard handleJobStatusModal={handleJobStatusModal}  type="Interviewing"  data={selectedTabsData}   jobStatus={singleJobDescription?.status}/>
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
                <Tab eventKey="hired" title="Hired">
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
                    <JobCard handleJobStatusModal={handleJobStatusModal} type="Hired"  data={selectedTabsData}  jobStatus={singleJobDescription?.status}/>
                </Tab>
            </Tabs>
            <RejectModal show={statusModal?.rejected} handleClose={handleJobStatusModal}  onClick={handleJobStatusAction} type={currentTab} smallLoader={smallLoader}/>
            <EndJobModal show={statusModal?.ended} handleClose={handleJobStatusModal}  onClick={handleJobStatusAction} smallLoader={smallLoader} />
            <ConfirmationModal text={jobPostConfirmMessage(currentTab)} show={statusModal?.Shortlisted || statusModal?.Interviewing || statusModal?.Suggested  }   onClick={handleJobStatusAction} handleClose={handleJobStatusModal} smallLoader={smallLoader} type={currentTabsStatus} />
        </>
    )
}
export default SingleJob;