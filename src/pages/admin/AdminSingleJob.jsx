import React, { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSingleJob, getDeveloperSuggestList, suggestDeveloper } from "../../redux/slices/adminDataSlice";
import JobCard from "../../components/common/SingleJob/JobCard";
import ConfirmationModal from "../views/Modals/ConfirmationModal";

const AdminSingleJob = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    let id = pathname.split("/")[2]
    const [showEndJobModal, setShowEndJobModal] = useState(false);
    const { singleJobListing, suggestedDeveloper, singleJobPagination,smallLoader } = useSelector(state => state.adminData)
    const [singleJobDescription, setSingleJobDescription] = useState({})
    const [selectedTabsData, setSelectedTabsData] = useState([]);
    const [suggestedData, setSuggestedData] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (id) {
            dispatch(adminSingleJob(id))
            dispatch(getDeveloperSuggestList(id ,page))
        }
    }, [page,id])

    useEffect(() => {
        setSingleJobDescription(singleJobListing?.data)
    }, [singleJobListing])
    const handleShowEndJobModal = (id, status) => {
        setSuggestedData({
            developer_id: id,
            status: status
        })
        setShowEndJobModal(true);
    };

    const convertToArray = (arr) => {
        const skillsArray = arr?.split(",");
        return skillsArray
    }

    const handleCloseEndJobModal = () => {
        setShowEndJobModal(false);
    };
    const handleSelect = (key) => {
        setSelectedTabsData(singleJobListing[key])
    }
    const handleJobStatusAction = async (e) => {
        e.preventDefault()

        let data = {
            "job_id": id,
            "developer_id": suggestedData?.developer_id,
            "status": suggestedData?.status
        }
        await dispatch(suggestDeveloper(data))
        setShowEndJobModal(false);
        dispatch(getDeveloperSuggestList(id,page))


    }
    return (
        <>
            <Tabs
                defaultActiveKey="job-details"
                id="fill-tab-example"
                className="mb-3 job-tabs"
                onSelect={handleSelect}
            >
                <Tab eventKey="job-details" title="Job Details">
                    <section className="single-job-section">
                        <div className="single-job-card job-information-wrapper">
                            {/* <h2 className="jobclient-name"><img src={amazonImg} /> Amazon</h2> */}
                            <div className="d-flex justify-content-between align-items-center flex-md-row flex-column-reverse">
                                <h2 className="single-job-title mb-0">{singleJobDescription?.title}</h2>
                                <div className="d-flex gap-3 align-items-center mb-md-0 mb-3">
                                    <p className="mb-0"><span className="status-text inprogress status-info">In progress</span></p>
                                    {/* <Button variant="transparent" onClick={handleShowEndJobModal} className="px-5 closed-job-btn">End Job</Button> */}
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
                <Tab eventKey="suggested" title="Suggestions">
                    <div className="text-center mb-3">
                        {/* <h3 className="px-5">Suggest the Developers</h3> */}
                    </div>
                    <JobCard type="Suggested" data={suggestedDeveloper } setPage={setPage} page={page} role="admin" handleJobStatusModal={handleShowEndJobModal} />
                </Tab>
                <Tab eventKey="shortlisted" title="Shortlisted">
                    <JobCard type="Shortlisted" data={selectedTabsData} role="admin" />
                </Tab>
                <Tab eventKey="interviewing" title="Interviewing">
                    <JobCard type="Interviewing" data={selectedTabsData} role="admin" />
                </Tab>
                <Tab eventKey="hired" title="Hired">
                    <JobCard type="Hired" data={selectedTabsData} role="admin" />
                </Tab>
            </Tabs>
            {/* <EndJobModal show={showEndJobModal} handleClose={handleCloseEndJobModal} /> */}
            <ConfirmationModal text={`Are you sure to suggest this developer ?`}   show={showEndJobModal} handleClose={handleCloseEndJobModal}  onClick={handleJobStatusAction} smallLoader={smallLoader} />
        </>
    )
}
export default AdminSingleJob;