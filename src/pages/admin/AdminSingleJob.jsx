import React, { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import userImg from '../../assets/img/user-img.jpg'
import { Link,useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import EndJobModal from "./Modals/EndJobs";
import amazonImg from '../../assets/img/amazon.png'
import { useDispatch, useSelector } from "react-redux";
import { adminSingleJob } from "../../redux/slices/adminDataSlice";
import JobCard from "../../components/common/SingleJob/JobCard";
const AdminSingleJob = () => {
 const {pathname}=useLocation()
 const dispatch =useDispatch()
let id=pathname.split("/")[2]
    const [showEndJobModal, setShowEndJobModal] = useState(false);
    const {singleJobListing}=useSelector(state=>state.adminData)
    const [singleJobDescription,setSingleJobDescription]=useState({})
    const [selectedTabsData,setSelectedTabsData]=useState([])

console.log(singleJobListing,"singleJobListing")

    useEffect(()=>{
     if(id){
        dispatch(adminSingleJob(id))
     }
    },[])

    useEffect(()=>{
        setSingleJobDescription(singleJobListing?.data)
    },[singleJobListing])
    const handleShowEndJobModal = () => {
        setShowEndJobModal(true);
    };

    const convertToArray=(arr)=>{
        const skillsArray = arr?.split(",");
        return skillsArray
    }

    const handleCloseEndJobModal = () => {
        setShowEndJobModal(false);
    };
    const handleSelect=(key)=>{
        setSelectedTabsData(singleJobListing[key])
    }
    return (
        <>
            <Tabs
                defaultActiveKey="job-details"
                id="fill-tab-example"
                className="mb-3 job-tabs"
                fill
                onSelect={handleSelect}
            >
                <Tab eventKey="job-details" title="Job Details">
                    <section className="single-job-section">
                        <div className="single-job-card job-information-wrapper">
                            {/* <h2 className="jobclient-name"><img src={amazonImg} /> Amazon</h2> */}
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="single-job-title mb-0">{singleJobDescription?.title}</h2>
                                <div className="d-flex gap-3 align-items-center">
                                    <p className="mb-0">Status <span className="status-text inprogress status-info">In progress</span></p>
                                    <Button variant="transparent" onClick={handleShowEndJobModal} className="px-5 closed-job-btn">End Job</Button>
                                </div>
                            </div>
                            <h4 className="single-job-category">Website Design</h4>
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
                    <div className="text-center mb-3">
                        <Button className="main-btn px-5">+ Suggest Developers</Button>
                    </div>
                      <JobCard type="Suggested" data={selectedTabsData}/>
                </Tab>
                <Tab eventKey="shortlisted" title="Shortlisted">
                <JobCard type="Shortlisted" data={selectedTabsData}/>
                </Tab>
                <Tab eventKey="interviewing" title="Interviewing">
                <JobCard type="Interviewing" data={selectedTabsData}/>
                </Tab>
                <Tab eventKey="hired" title="Hired">
                <JobCard type="Hired" data={selectedTabsData}/>
                </Tab>
            </Tabs>
            <EndJobModal show={showEndJobModal} handleClose={handleCloseEndJobModal} />
        </>
    )
}
export default AdminSingleJob;