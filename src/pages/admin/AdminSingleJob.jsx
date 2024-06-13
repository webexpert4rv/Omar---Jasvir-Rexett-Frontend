import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSingleJob, getDeveloperSuggestList, suggestDeveloper } from "../../redux/slices/adminDataSlice";
import JobCard from "../../components/common/SingleJob/JobCard";
import ConfirmationModal from "../views/Modals/ConfirmationModal";
import { useTranslation } from "react-i18next";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { FaRegHandshake } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import sowDoc from '../../assets/img/aws_examples_sows.pdf';

const AdminSingleJob = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    let id = pathname.split("/")[3]
    const [showEndJobModal, setShowEndJobModal] = useState(false);
    const { singleJobListing, suggestedDeveloper, screenLoader, smallLoader } = useSelector(state => state.adminData)
    const [singleJobDescription, setSingleJobDescription] = useState({})
    const [selectedTabsData, setSelectedTabsData] = useState([]);
    const [suggestedData, setSuggestedData] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (id) {
            dispatch(adminSingleJob(id))
            dispatch(getDeveloperSuggestList(id, page))
        }
    }, [page, id])

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
        dispatch(getDeveloperSuggestList(id, page))
    }
    const currentStatusCssClass = (status) => {
        switch (status) {
            case "ended":
                return "endcontract";
            case "Initiated":
                return "inprogress";
            case "completed":
                return "completed";
            case "published":
                return "completed";
            case "unpublished":
            case "Unpublished":
                return "unpublished";
            default:
                return;
        }
    };

    const returnExperienceFromScreeningQuestions = (screeningQuestions) => {
        if (screeningQuestions?.length) {
            const requiredElement = screeningQuestions?.find(
                (curElem) =>
                    curElem?.question ==
                    "How many years of experience do you currently have?"
            );
            if (requiredElement) {
                return requiredElement?.ideal_answer;
            }
        }
    };

    return (
        <>
            {screenLoader ? <ScreenLoader /> : <section className="single-job-section">
                <div className="single-job-card job-information-wrapper mb-0">
                    {/* <h2 className="jobclient-name"><img src={amazonImg} /> Amazon</h2> */}
                    <div className="d-flex justify-content-between align-items-center flex-md-row flex-column-reverse">
                        <div>
                            <h2 className="single-job-title mb-0">{singleJobDescription?.title}</h2>
                            <p className="req-text fw-normal mt-2">by {singleJobDescription?.client?.name}</p>
                        </div>
                        <div className="d-flex gap-3 align-items-center mb-md-0 mb-3">
                            <p className={`status-text ${currentStatusCssClass(
                                singleJobDescription?.status
                            )}`}>{singleJobDescription?.status?.charAt(0).toUpperCase() + singleJobDescription?.status?.slice(1)}</p>
                            {/* <Button variant="transparent" onClick={handleShowEndJobModal} className="px-5 closed-job-btn">End Job</Button> */}
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 my-3">
                        <div className="d-flex align-items-center gap-2">
                            {/* <h3 className="req-heading">{t("contract")}</h3> */}
                            <FaRegHandshake />
                            <p className="req-text mb-0">{singleJobDescription?.contract_type?.split("-").join(" ").replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <SlLocationPin />
                            {/* <h3 className="req-heading mt-4">{t("location")}</h3> */}
                            <p className="req-text mb-0">{singleJobDescription?.job_type}</p>
                        </div>
                    </div>
                    <div>
                        <Row>
                            <Col md={6}>
                                <div>
                                    <h3 className="req-heading">{t("skillsRequired")}</h3>
                                    {singleJobDescription?.skills?.length > 0 ? <ul className="skills-listing mb-0">
                                        {
                                            convertToArray(singleJobDescription?.skills)?.map((item, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>{item}</li>
                                                    </>
                                                )
                                            })
                                        }
                                    </ul> : "Not Mentioned"}
                                </div>
                            </Col>
                            <Col md={6}>
                                <div>
                                    <h3 className="req-heading">{t("optionalSkills")}</h3>
                                    {singleJobDescription?.optional_skills?.length > 0 ? <ul className="skills-listing mb-0">
                                        {
                                            convertToArray(singleJobDescription?.optional_skills)?.map((item, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>{item}</li>
                                                    </>
                                                )
                                            })
                                        }
                                    </ul> : "Not Mentioned"}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/* <div className="single-job-card">
                            <Row>
                                <Col md="4">
                                    <h3 className="req-heading">{t("clientName")}</h3>

                                </Col>
                                <Col md="4">
                                    <h3 className="req-heading">{t("experienceRequirements")}</h3>
                                    <p className={returnExperienceFromScreeningQuestions(
                                        singleJobDescription?.screening_questions
                                    ) ? `req-text` : ""} >
                                        {singleJobDescription?.screening_questions &&
                                            returnExperienceFromScreeningQuestions(
                                                singleJobDescription?.screening_questions
                                            )}
                                        {returnExperienceFromScreeningQuestions(
                                            singleJobDescription?.screening_questions
                                        ) && " years"}
                                    </p>
                                </Col>
                                <Col md="4">
                                </Col>
                                <Col md="4">
                                </Col>
                            </Row>
                        </div>
                        <div className="single-job-card">
                            <Row>
                                <Col>
                                    <h3 className="req-heading">{t("skillsRequired")}</h3>
                                    {singleJobDescription?.skills?.length > 0 ? <ul className="skills-listing mb-0">
                                        {
                                            convertToArray(singleJobDescription?.skills)?.map((item, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>{item}</li>
                                                    </>
                                                )
                                            })
                                        }
                                    </ul> : "Not Mentioned"}
                                </Col>
                                <Col>
                                    <h3 className="req-heading">{t("optionalSkills")}</h3>
                                    {singleJobDescription?.optional_skills?.length > 0 ? <ul className="skills-listing mb-0">
                                        {
                                            convertToArray(singleJobDescription?.optional_skills)?.map((item, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>{item}</li>
                                                    </>
                                                )
                                            })
                                        }
                                    </ul> : "Not Mentioned"}
                                </Col>
                            </Row>
                        </div> */}
            </section>}
            <div className="job-tab-detail">
                <Tabs
                    defaultActiveKey="job-details"
                    id="fill-tab-example"
                    className="mb-3 job-tabs"
                    onSelect={handleSelect}
                >
                    <Tab eventKey="job-details" title="Job Details">
                        <div className="single-job-card shadow-none">
                            <h3 className="req-heading">About this job</h3>
                            <p className="single-job-description mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: singleJobDescription?.description,
                                }}
                            ></p>
                        </div>
                    </Tab>
                    <Tab eventKey="suggested" title="Suggestions">
                        <JobCard type="Suggested" data={suggestedDeveloper} setPage={setPage} page={page} role="admin" handleJobStatusModal={handleShowEndJobModal} />
                    </Tab>
                    <Tab eventKey="shortlisted" title="Shortlisted">
                        <JobCard type="Shortlisted" data={selectedTabsData} role="admin" />
                    </Tab>
                    <Tab eventKey="interviewing" title="Interviewing">
                        <JobCard type="Interviewing" data={selectedTabsData} role="admin" />
                    </Tab>
                    <Tab eventKey="documentation" title="Documentation">
                        <div className="card-box">
                            <h3 className="mb-3 doc-heading">Client's Documentation</h3>
                            <Row>
                                <Col md={4}>
                                    <div>
                                        <Form.Label>Statement of work(SOW)</Form.Label>
                                        <div>
                                            <div className="preview-doc">
                                                <iframe src={sowDoc}></iframe>
                                            </div>
                                            <Button className="main-btn font-14">Sign Document</Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div>
                                        <Form.Label>MCA agreement</Form.Label>
                                        <div>
                                            <div className="preview-doc">
                                                <iframe src={sowDoc}></iframe>
                                            </div>
                                            <Button className="main-btn font-14">Sign Document</Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div>
                                        <Form.Label>Non disclosure Agreement(NDA)</Form.Label>
                                        <div>
                                            <div className="preview-doc">
                                                <iframe src={sowDoc}></iframe>
                                            </div>
                                            <Button className="main-btn font-14">Sign Document</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey="hired" title="Hired">
                        <JobCard type="Hired" data={selectedTabsData} role="admin" />
                    </Tab>
                </Tabs >
            </div>
            {/* <EndJobModal show={showEndJobModal} handleClose={handleCloseEndJobModal} /> */}
            < ConfirmationModal text={(suggestedData?.status) ? t("suggestDeveloper") : t("removeDeveloperFromSuggestion")
            } show={showEndJobModal} handleClose={handleCloseEndJobModal} onClick={handleJobStatusAction} smallLoader={smallLoader} />
        </>
    )
}
export default AdminSingleJob;