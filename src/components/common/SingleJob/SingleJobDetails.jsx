import React, { useEffect, useState } from "react";
import { Button, Col, Form, Nav, OverlayTrigger, Row, Tab, Tabs, Tooltip } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSingleJob, getDeveloperSuggestList, suggestDeveloper } from "../../../redux/slices/adminDataSlice";
import JobCard from "../../../components/common/SingleJob/JobCard";
import ConfirmationModal from "../../../pages/views/Modals/ConfirmationModal";
import { useTranslation } from "react-i18next";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import { FaCheck, FaGithub, FaLinkedin, FaRegHandshake, FaStar } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MeetingInfo from "../../../pages/admin/Modals/MeetingInfo";
import { FaClipboardUser } from "react-icons/fa6";
import { FaListUl, FaTimes, FaUsers } from "react-icons/fa";
import { PiChatsFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import devImg from '../../../assets/img/demo-img.jpg';
import { FaLink } from "react-icons/fa6";
import ManualSuggestions from "../../../pages/admin/Modals/ManualSuggestion";
import AddCandidate from "../../../pages/admin/Modals/AddCandidate";
import Schedulemeeting from "../Modals/ScheduleMeeting";
import { IoGrid } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";

const AdminSingleJob = () => {
    const role = localStorage.getItem("role")
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
    const [page, setPage] = useState(1);
    const [value, setValue] = useState('');
    const [showMeetingInfo, setShowMeetingInfo] = useState(false);
    const handleShowMeetingInfo = () => {
        setShowMeetingInfo(!showMeetingInfo)
    }
    const handleCloseMeetingInfo = () => {
        setShowMeetingInfo(false)
    }

    const handleChange = (content) => {
        setValue(content);
    };

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
    let suggest = <div>Suggestions <div className="stage-indicator ms-1 stage-suggest gap-1"><span className="stage-icon"><FaUsers /></span> 4</div></div>;
    let shortlist = <div>Shortlisted <div className="stage-indicator ms-1 stage-shortlist gap-1"><span className="stage-icon"><FaClipboardUser /></span> 1</div></div>;
    let interview = <div>Interviews <div className="stage-indicator ms-1 stage-interview gap-1"><span className="stage-icon"><PiChatsFill /></span> 2</div></div>;
    let offered = <div>Offered <div className="stage-indicator ms-1 stage-offer gap-1"><span className="stage-icon"><FaHandshake /></span> 0</div></div>;
    let hired = <div>Hired <div className="stage-indicator ms-1 stage-hired gap-1"><span className="stage-icon"><MdWorkHistory /></span> 0</div></div>;

    const [manualSuggestion, showManualSuggestion] = useState(false);
    const handleShowManualSuggestion = () => {
        showManualSuggestion(!manualSuggestion);
    }
    const handleCloseManualSuggestion = () => {
        showManualSuggestion(false);
    }

    const [addCandidateModal, showaddCandidate] = useState(false);
    const handleShowaddCandidate = () => {
        showaddCandidate(!manualSuggestion);
    }
    const handleCloseaddCandidate = () => {
        showaddCandidate(false);
    }

    const [showScheduleMeeting, setShowScheduleMeet] = useState(false);
    const handleShowScheduleMeeting = () => {
        setShowScheduleMeet(!showScheduleMeeting);
    }
    const handleCloseScheduleMeeting = () => {
        setShowScheduleMeet(false);
    }

    const scheduleInterview = (
        <Tooltip>Move to Interview</Tooltip>
    )
    const approvedApply = (
        <Tooltip>Approve</Tooltip>
    )
    const rejectedApply = (
        <Tooltip>Reject</Tooltip>
    )

    return (
        <>
            {screenLoader ? <ScreenLoader /> : <section className="single-job-section">
                <div className="single-job-card job-information-wrapper mb-0">
                    {/* <h2 className="jobclient-name"><img src={amazonImg} /> Amazon</h2> */}
                    <div className="d-flex justify-content-between align-items-start flex-md-row flex-column-reverse">
                        <div>
                            <h2 className="single-job-title mb-0">{singleJobDescription?.title ? singleJobDescription?.title : "Need to work on new changes on admin panel"}</h2>
                            <p className="req-text fw-normal mt-2">by {singleJobDescription?.client?.name}</p>
                        </div>
                        <div className="d-flex gap-3 align-items-center mb-md-0 mb-3">

                            {role == "developer" &&
                                <>
                                    <Button variant="transparent" className="main-btn font-14">Apply this job</Button>
                                    <span className="status-finished">Already Applied <FaCheck /> </span>
                                </>
                            }
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
                        <div className="d-flex align-items-center gap-2">
                            <SlLocationPin />
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
                    {role !== "developer" && <Tab eventKey="suggested" title={suggest}>
                        <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
                            <Button variant="transparent" onClick={handleShowManualSuggestion} className="main-btn font-14">Manual Suggestion</Button>
                            <Button variant="transparent" onClick={handleShowaddCandidate} className="outline-main-btn font-14">+ Add Candidate</Button>
                        </div>
                        <Tab.Container defaultActiveKey={'list-view'}>
                            <div className="mb-4 d-flex justify-content-between align-items-center">
                                <h5 className="font-22 mb-0 fw-bold">Applied Candidates</h5>
                                <Nav variant="pills" className="document-view-pill">
                                    <Nav.Item className="document-view-item">
                                        <Nav.Link
                                            className="document-view-link"
                                            eventKey="list-view"
                                        >
                                            <FaListUl />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="document-view-item">
                                        <Nav.Link
                                            className="document-view-link"
                                            eventKey="grid-view"
                                        >
                                            <IoGrid />
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <Tab.Content>
                                <Tab.Pane eventKey="list-view">
                                    <div>
                                        <div className="table-responsive">
                                            <table className="table document-table table-ui-custom">
                                                <thead>
                                                    <th className="document-th filename-th px-3">Name</th>
                                                    <th className="document-th location-th">Designation</th>
                                                    <th className="document-th location-th">Experience</th>
                                                    <th className="document-th location-th">Expertise</th>
                                                    <th className="document-th location-th">Good to have skills</th>
                                                    <th className="document-th location-th">Rating</th>
                                                    <th className="document-th location-th">Screening Rating</th>
                                                    <th className="document-th location-th">Profile match</th>
                                                    <th className="document-th location-th">Action</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="document-data px-3">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <img src={devImg} className="developer-img" />
                                                                Jane Doe
                                                            </div>
                                                        </td>
                                                        <td className="document-data">Web Developer</td>
                                                        <td className="document-data">5 years</td>
                                                        <td className="document-data white-nowrap">
                                                            <ul className="skills-listing mb-0">
                                                                <li>Laravel</li>
                                                                <li>PHP</li>
                                                            </ul>
                                                        </td>
                                                        <td className="document-data">
                                                            <ul className="skills-listing mb-0">
                                                                <li>Laravel</li>
                                                                <li>PHP</li>
                                                            </ul>
                                                        </td>
                                                        <td className="document-data">
                                                            <span className="status-upcoming">
                                                                <span className="d-inline-flex align-items-center gap-1">
                                                                    <FaStar /> 4.4
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td className="document-data">
                                                            <span className="status-upcoming">
                                                                <span className="d-inline-flex align-items-center gap-1">
                                                                    <FaStar /> 8.9
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td className="document-data">
                                                            <div className="">
                                                                <span className="status-finished w-auto d-inline-block"><strong>95%</strong></span>
                                                            </div>
                                                        </td>
                                                        
                                                        <td className="document-data">
                                                            <div className="d-flex align-items-center gap-2 job-action-btns">
                                                                <OverlayTrigger placement="top" overlay={approvedApply}>
                                                                    <Button className="main-btn py-2 text-black font-15">
                                                                        <FaCheck />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placement="top" overlay={rejectedApply}>
                                                                    <Button variant="danger">
                                                                        <FaTimes />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="grid-view">
                                    <JobCard type="Suggested" data={suggestedDeveloper} setPage={setPage} page={page} role="admin" handleJobStatusModal={handleShowEndJobModal} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                        <Tab.Container defaultActiveKey={'list-suggest-view'}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="font-22 mb-4 fw-bold">Suggested Candidates</h5>
                                <Nav variant="pills" className="document-view-pill">
                                    <Nav.Item className="document-view-item">
                                        <Nav.Link
                                            className="document-view-link"
                                            eventKey="list-suggest-view"
                                        >
                                            <FaListUl />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="document-view-item">
                                        <Nav.Link
                                            className="document-view-link"
                                            eventKey="grid-suggest-view"
                                        >
                                            <IoGrid />
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <Tab.Content>
                                <Tab.Pane eventKey="list-suggest-view">
                                    <div>
                                        <div className="table-responsive">
                                            <table className="table document-table table-ui-custom">
                                                <thead>
                                                    <th className="document-th filename-th px-3">Name</th>
                                                    <th className="document-th location-th">Designation</th>
                                                    <th className="document-th location-th">Experience</th>
                                                    <th className="document-th location-th">Expertise</th>
                                                    <th className="document-th location-th">Good to have skills</th>
                                                    <th className="document-th location-th">Rating</th>
                                                    <th className="document-th location-th">Screening Rating</th>
                                                    <th className="document-th location-th">Profile match</th>
                                                    <th className="document-th location-th">Action</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="document-data px-3">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <img src={devImg} className="developer-img" />
                                                                Jane Doe
                                                            </div>
                                                        </td>
                                                        <td className="document-data">Web Developer</td>
                                                        <td className="document-data">5 years</td>
                                                        <td className="document-data white-nowrap">
                                                            <ul className="skills-listing mb-0">
                                                                <li>Laravel</li>
                                                                <li>PHP</li>
                                                            </ul>
                                                        </td>
                                                        <td className="document-data">
                                                            <ul className="skills-listing mb-0">
                                                                <li>Laravel</li>
                                                                <li>PHP</li>
                                                            </ul>
                                                        </td>
                                                        <td className="document-data">
                                                            <span className="status-upcoming">
                                                                <span className="d-inline-flex align-items-center gap-1">
                                                                    <FaStar /> 4.4
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td className="document-data">
                                                            <span className="status-upcoming">
                                                                <span className="d-inline-flex align-items-center gap-1">
                                                                    <FaStar /> 8.9
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td className="document-data">
                                                            <div className="">
                                                                <span className="status-finished w-auto d-inline-block"><strong>95%</strong></span>
                                                            </div>
                                                        </td>
                                                        <td className="document-data">
                                                            <div className="d-flex align-items-center gap-2 job-action-btns">
                                                                <OverlayTrigger placement="top" overlay={approvedApply}>
                                                                    <Button className="main-btn py-2 text-black font-15">
                                                                        <FaCheck />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placement="top" overlay={rejectedApply}>
                                                                    <Button variant="danger">
                                                                        <FaTimes />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="grid-suggest-view">
                                    <JobCard type="Suggested" data={suggestedDeveloper} setPage={setPage} page={page} role="admin" handleJobStatusModal={handleShowEndJobModal} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Tab>}
                    <Tab eventKey="shortlisted" title={shortlist}>
                        <Tab.Container defaultActiveKey={'list-view'}>
                            <div className="mb-4 d-flex justify-content-between align-items-center">
                                <h5 className="font-22 mb-0 fw-bold">Shortlisted Candidate</h5>
                                <Nav variant="pills" className="document-view-pill">
                                    <Nav.Item className="document-view-item">
                                        <Nav.Link
                                            className="document-view-link"
                                            eventKey="list-view"
                                        >
                                            <FaListUl />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="document-view-item">
                                        <Nav.Link
                                            className="document-view-link"
                                            eventKey="grid-view"
                                        >
                                            <IoGrid />
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <Tab.Content>
                                <Tab.Pane eventKey="list-view">
                                    <div className="">
                                        <div className="table-responsive">
                                            <table className="table document-table table-ui-custom">
                                                <thead>
                                                    <th className="document-th filename-th px-3">Name</th>
                                                    <th className="document-th location-th">Designation</th>
                                                    <th className="document-th location-th">Experience</th>
                                                    <th className="document-th location-th">Expertise</th>
                                                    <th className="document-th location-th">Good to have skills</th>
                                                    <th className="document-th location-th">Rating</th>
                                                    <th className="document-th location-th">Screening Rating</th>
                                                    <th className="document-th location-th">Profile match</th>
                                                    <th className="document-th location-th">Action</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="document-data px-3">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <img src={devImg} className="developer-img" />
                                                                Jane Doe
                                                            </div>
                                                        </td>
                                                        <td className="document-data">Web Developer</td>
                                                        <td className="document-data">5 years</td>
                                                        <td className="document-data white-nowrap">
                                                            <ul className="skills-listing mb-0">
                                                                <li>Laravel</li>
                                                                <li>PHP</li>
                                                            </ul>
                                                        </td>
                                                        <td className="document-data">
                                                            <ul className="skills-listing mb-0">
                                                                <li>Laravel</li>
                                                                <li>PHP</li>
                                                            </ul>
                                                        </td>
                                                        <td className="document-data">
                                                            <span className="status-upcoming">
                                                                <span className="d-inline-flex align-items-center gap-1">
                                                                    <FaStar /> 4.4
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td className="document-data">
                                                            <span className="status-upcoming">
                                                                <span className="d-inline-flex align-items-center gap-1">
                                                                    <FaStar /> 8.9
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td className="document-data">
                                                            <div className="">
                                                                <span className="status-finished w-auto d-inline-block"><strong>95%</strong></span>
                                                            </div>
                                                        </td>
                                                        
                                                        <td className="document-data">
                                                            <div className="d-flex align-items-center gap-2 job-action-btns">
                                                                <OverlayTrigger placement="top" overlay={scheduleInterview}>
                                                                    <Button onClick={handleShowScheduleMeeting} className="main-btn py-2 text-black font-15">
                                                                        <LuMessagesSquare />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placement="top" overlay={rejectedApply}>
                                                                    <Button variant="danger">
                                                                        <FaTimes />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="grid-view">
                                    <div className="developers-list mb-4">
                                        <div className="developer-card p-0">
                                            <div className="overflow-hidden inner-dev-card">
                                                <div className="user-imgbx">
                                                    <img src={devImg} className="user-img" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="user-name">John Doe</h3>
                                                    <div className="text-center mt-2">
                                                        <span className="status-finished w-auto d-inline-block mb-2">Profile Match - <strong>95%</strong></span>
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </div>
                                                    <p className="designation-user">Software Developer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                        <JobCard type="Shortlisted" data={selectedTabsData} role="admin" />
                    </Tab>
                    <Tab eventKey="interviewing" title={interview}>
                        <div>
                            <h5 className="font-22 mb-4 fw-bold">Interview Completed</h5>
                            <Row>
                                {role !== "developer" && <Col lg={4}>
                                    <div className="interview-wrapper position-relative mb-3 pt-4">
                                        <div>
                                            <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                                            <p className="dev-name mb-2 font-14">
                                                <div className="me-1">
                                                    <img src={devImg} />
                                                </div>
                                                Rohit Sharma
                                            </p>
                                            <div>
                                                <span className="associate-text">
                                                    <span className="associate">Tuesday 22-06-24, 22:00 - 23:00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-2 status-interview">
                                            <span className="status-finished">Completed</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <Link to={'/admin/interview-feedback'} className="main-btn font-14 text-decoration-none">Share Feedback</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>}
                                <Col lg={4}>
                                    <div className="interview-wrapper position-relative mb-3 pt-4">
                                        <div>
                                            <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                                            <p className="dev-name mb-2 font-14">
                                                <div className="me-1">
                                                    <img src={devImg} />
                                                </div>
                                                Rohit Sharma
                                            </p>
                                            <div>
                                                <span className="associate-text">
                                                    <span className="associate">Tuesday 22-06-24, 22:00 - 23:00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-2 status-interview">
                                            <span className="status-finished">Selected</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mt-2">
                                                <Link to={'/admin/interview-detail'} className="main-btn font-14 text-decoration-none">Interview Report</Link>
                                                <Button variant="transparent" className="outline-main-btn font-14">Move to offer</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="interview-wrapper position-relative mb-3 pt-4">
                                        <div>
                                            <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                                            <p className="dev-name mb-2 font-14">
                                                <div className="me-1">
                                                    <img src={devImg} />
                                                </div>
                                                Rohit Sharma
                                            </p>
                                            <div>
                                                <span className="associate-text">
                                                    <span className="associate">Tuesday 22-06-24, 22:00 - 23:00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-2 status-interview">
                                            <span className="status-rejected">Rejected</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <Link to={'/admin/interview-detail'} className="main-btn font-14 text-decoration-none">Interview Report</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <h5 className="font-22 mb-4 fw-bold">Scheduled Interview</h5>
                        <div className="interview-scheduled pt-2 mb-3">
                            <Row>
                                <Col lg={4}>
                                    <div className="interview-wrapper position-relative mb-3 pt-4">
                                        <div>
                                            <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                                            <p className="dev-name mb-2 font-14">
                                                <div className="me-1">
                                                    <img src={devImg} />
                                                </div>
                                                Pankaj Pundir
                                            </p>
                                            <div>
                                                <span className="associate-text">
                                                    <span className="associate">Tuesday 22-06-24, 22:00 - 23:00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-2 status-interview">
                                            <span className="status-upcoming">Upcoming in 1hr</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button>
                                            <Button variant="transparent" className="main-btn font-14" onClick={handleShowMeetingInfo}>View Details</Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="interview-wrapper position-relative mb-3 pt-4">
                                        <div>
                                            <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                                            <p className="dev-name mb-2 font-14">
                                                <div className="me-1">
                                                    <img src={devImg} />
                                                </div>
                                                Rohit Sharma
                                            </p>
                                            <div>
                                                <span className="associate-text">
                                                    <span className="associate">Tuesday 22-06-24, 22:00 - 23:00</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-2 status-interview">
                                            <span className="status-rejected">Declined</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                            </div>
                                            <Button variant="transparent" className="main-btn font-14" onClick={handleShowScheduleMeeting}>Reschedule</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Tab.Container defaultActiveKey={'list-view'}>
                            <div className="mb-4 d-flex justify-content-between align-items-center">
                                {role !== "developer" && <h5 className="font-22 mb-0 fw-bold">Need to schedule</h5>}
                                <Nav variant="pills" className="document-view-pill">
                                    <Nav.Item className="document-view-item">
                                        <Nav.Link
                                            className="document-view-link"
                                            eventKey="list-view"
                                        >
                                            <FaListUl />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="document-view-item">
                                        <Nav.Link
                                            className="document-view-link"
                                            eventKey="grid-view"
                                        >
                                            <IoGrid />
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <Tab.Content>
                                <Tab.Pane eventKey="list-view">
                                    <div>
                                        <div className="table-responsive">
                                            <table className="table document-table table-ui-custom">
                                                <thead>
                                                    <th className="document-th filename-th px-3">Name</th>
                                                    <th className="document-th owner-th">Email</th>
                                                    <th className="document-th location-th">Phone Number</th>
                                                    <th className="document-th location-th">Designation</th>
                                                    <th className="document-th location-th">Rating</th>
                                                    <th className="document-th location-th">Profile match</th>
                                                    <th className="document-th location-th">Social media</th>
                                                    <th className="document-th action-th">Action</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="document-data px-3">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <img src={devImg} className="developer-img" />
                                                                Jane Doe
                                                            </div>
                                                        </td>
                                                        <td className="document-data">
                                                            janedoe123@gmail.com
                                                        </td>
                                                        <td className="document-data"> 555 123-4567</td>
                                                        <td className="document-data">Web Developer</td>
                                                        <td className="document-data">
                                                            <span className="status-upcoming">
                                                                <span className="d-inline-flex align-items-center gap-1">
                                                                    <FaStar /> 4.4
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td className="document-data">
                                                            <div className="">
                                                                <span className="status-finished w-auto d-inline-block"><strong>95%</strong></span>
                                                            </div>
                                                        </td>
                                                        <td className="document-data">
                                                            <ul className="social-icons justify-content-start">
                                                                <li>
                                                                    <Link to="#">
                                                                        <FaGithub />
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="#">
                                                                        <FaLinkedin />
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="document-data">
                                                            <div className="d-flex align-items-center gap-2 job-action-btns">
                                                                <OverlayTrigger placement="top" overlay={scheduleInterview}>
                                                                    <Button onClick={handleShowScheduleMeeting} className="main-btn py-2 text-black font-15">
                                                                        <LuMessagesSquare />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="grid-view">
                                    <div className="developers-list mb-4">
                                        <div className="developer-card p-0">
                                            <div className="overflow-hidden inner-dev-card">
                                                <div className="user-imgbx">
                                                    <img src={devImg} className="user-img" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="user-name">John Doe</h3>
                                                    <div className="text-center mt-2">
                                                        <span className="status-finished w-auto d-inline-block mb-2">Profile Match - <strong>95%</strong></span>
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </div>
                                                    <p className="designation-user">Software Developer</p>
                                                    <p className="email-user">johndoe123@gmail.com</p>
                                                    <ul className="social-icons">
                                                        <li>
                                                            <Link to="#">
                                                                <FaGithub />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">
                                                                <FaLinkedin />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                    <div className="job-card-btns">
                                                        <OverlayTrigger placement="top" overlay={scheduleInterview}>
                                                            <Button onClick={handleShowScheduleMeeting} className="main-btn py-2 text-black font-15">
                                                                <LuMessagesSquare />
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                        {/* <JobCard type="Interviewing" data={selectedTabsData} role="admin" /> */}
                    </Tab>
                    <Tab eventKey="documentation" title={offered}>
                        <div className="card-box">
                            <div className="mb-4">
                                <h3 className="mb-3 doc-heading">Client's Documentation</h3>
                                <Row>
                                    <Tab.Container
                                        id="left-tabs-example"
                                        defaultActiveKey="create_client_sow"
                                        onSelect={handleSelect}
                                    >
                                        <Nav variant="pills" className="application-pills">
                                            <Nav.Item className="application-item">
                                                <Nav.Link eventKey="create_client_sow" className="application-link">
                                                    Create SOW
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="application-item">
                                                <Nav.Link eventKey="create-client_noc" className="application-link">
                                                    Create NOC
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="create_client_sow" className="py-4">
                                                <h4 className="mb-2 doc-subheading">Create Statement of work(SOW)</h4>
                                                <div>
                                                    <div>
                                                        <Row>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Project Title</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Client Name</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Client Address</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Client Contact Information</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Project Budget</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={12}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Project Objective</Form.Label>
                                                                    <div className="custom-rich-editor">
                                                                        <ReactQuill value={value} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={12}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Scope of work</Form.Label>
                                                                    <div className="custom-rich-editor">
                                                                        <ReactQuill value={value} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={12}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Responsibilities</Form.Label>
                                                                    <div className="custom-rich-editor">
                                                                        <ReactQuill value={value} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="text-center mt-3">
                                                            <Button variant="transparent" className="main-btn font-14">Submit</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="create-client_noc" className="py-4">
                                                <h4 className="mb-2 doc-subheading">Create Non Disclousre Agreement(NDA)</h4>
                                                <div>
                                                    <div>
                                                        <Row>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Client Name</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Client Address</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Client Contact Information</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="text-center mt-3">
                                                            <Button variant="transparent" className="main-btn font-14">Submit</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>

                                        </Tab.Content>
                                    </Tab.Container>
                                    {/* <Col md={4}>
                                        <div>
                                            <Form.Label>Statement of work(SOW)</Form.Label>
                                            <div>
                                                <Button className="main-btn font-14">Sign Document</Button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div>
                                            <Form.Label>Non disclosure Agreement(NDA)</Form.Label>
                                            <div>
                                                <Button className="main-btn font-14">Sign Document</Button>
                                            </div>
                                        </div>
                                    </Col> */}
                                </Row>
                            </div>
                            <div className="mb-3">
                                <h3 className="mb-3 doc-heading">Vendor's Documentation</h3>
                                <Tab.Container
                                    id="left-tabs-example"
                                    defaultActiveKey="create_sow"
                                    onSelect={handleSelect}
                                >
                                    <Nav variant="pills" className="application-pills">
                                        <Nav.Item className="application-item">
                                            <Nav.Link eventKey="create_sow" className="application-link">
                                                Create SOW
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="application-item">
                                            <Nav.Link eventKey="create_noc" className="application-link">
                                                Create NOC
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="create_sow" className="py-4">
                                            <h4 className="mb-2 doc-subheading">Create Statement of work(SOW)</h4>
                                            <div>
                                                <div>
                                                    <Row>
                                                        <Col md={4}>
                                                            <div className="mb-3">
                                                                <Form.Label>Project Title</Form.Label>
                                                                <Form.Control type="text" className="common-field font-14" />
                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            <div className="mb-3">
                                                                <Form.Label>Vendor Name</Form.Label>
                                                                <Form.Control type="text" className="common-field font-14" />
                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            <div className="mb-3">
                                                                <Form.Label>Vendor Address</Form.Label>
                                                                <Form.Control type="text" className="common-field font-14" />
                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            <div className="mb-3">
                                                                <Form.Label>Vendor Contact Information</Form.Label>
                                                                <Form.Control type="text" className="common-field font-14" />
                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            <div className="mb-3">
                                                                <Form.Label>Project Budget</Form.Label>
                                                                <Form.Control type="text" className="common-field font-14" />
                                                            </div>
                                                        </Col>
                                                        <Col md={12}>
                                                            <div className="mb-3">
                                                                <Form.Label>Project Objective</Form.Label>
                                                                <div className="custom-rich-editor">
                                                                    <ReactQuill value={value} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col md={12}>
                                                            <div className="mb-3">
                                                                <Form.Label>Scope of work</Form.Label>
                                                                <div className="custom-rich-editor">
                                                                    <ReactQuill value={value} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col md={12}>
                                                            <div className="mb-3">
                                                                <Form.Label>Responsibilities</Form.Label>
                                                                <div className="custom-rich-editor">
                                                                    <ReactQuill value={value} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="text-center mt-3">
                                                        <Button variant="transparent" className="main-btn font-14">Submit</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="create_noc" className="py-4">
                                            <h4 className="mb-2 doc-subheading">Create Non Disclousre Agreement(NDA)</h4>
                                            <div>
                                                <div>
                                                    <Row>
                                                        <Col md={4}>
                                                            <div className="mb-3">
                                                                <Form.Label>Vendor Name</Form.Label>
                                                                <Form.Control type="text" className="common-field font-14" />
                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            <div className="mb-3">
                                                                <Form.Label>Vendor Address</Form.Label>
                                                                <Form.Control type="text" className="common-field font-14" />
                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            <div className="mb-3">
                                                                <Form.Label>Vendor Contact Information</Form.Label>
                                                                <Form.Control type="text" className="common-field font-14" />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="text-center mt-3">
                                                        <Button variant="transparent" className="main-btn font-14">Submit</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Pane>

                                    </Tab.Content>
                                </Tab.Container>
                                <div className="mb-3">
                                    <h3 className="mb-3 doc-heading">Developer's Documentation</h3>
                                    <Tab.Container
                                        id="left-tabs-example"
                                        defaultActiveKey="create_sow"
                                        onSelect={handleSelect}
                                    >
                                        <Nav variant="pills" className="application-pills">
                                            <Nav.Item className="application-item">
                                                <Nav.Link eventKey="create_sow" className="application-link">
                                                    Create SOW
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="application-item">
                                                <Nav.Link eventKey="create_noc" className="application-link">
                                                    Create NOC
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="create_sow" className="py-4">
                                                <h4 className="mb-2 doc-subheading">Create Statement of work(SOW)</h4>
                                                <div>
                                                    <div>
                                                        <Row>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Project Title</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Developer Name</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Developer Address</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Developer Contact Information</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Project Budget</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={12}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Project Objective</Form.Label>
                                                                    <div className="custom-rich-editor">
                                                                        <ReactQuill value={value} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={12}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Scope of work</Form.Label>
                                                                    <div className="custom-rich-editor">
                                                                        <ReactQuill value={value} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={12}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Responsibilities</Form.Label>
                                                                    <div className="custom-rich-editor">
                                                                        <ReactQuill value={value} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="text-center mt-3">
                                                            <Button variant="transparent" className="main-btn font-14">Submit</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="create_noc" className="py-4">
                                                <h4 className="mb-2 doc-subheading">Create Non Disclousre Agreement(NDA)</h4>
                                                <div>
                                                    <div>
                                                        <Row>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Developer Name</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Developer Address</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Form.Label>Developer Contact Information</Form.Label>
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="text-center mt-3">
                                                            <Button variant="transparent" className="main-btn font-14">Submit</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>

                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="hired" title={hired}>
                        <JobCard type="Hired" data={selectedTabsData} role="admin" />
                    </Tab>
                </Tabs >
            </div>
            {/* <EndJobModal show={showEndJobModal} handleClose={handleCloseEndJobModal} /> */}
            < ConfirmationModal text={(suggestedData?.status) ? t("suggestDeveloper") : t("removeDeveloperFromSuggestion")
            } show={showEndJobModal} handleClose={handleCloseEndJobModal} onClick={handleJobStatusAction} smallLoader={smallLoader} />
            <MeetingInfo show={showMeetingInfo} handleClose={handleCloseMeetingInfo} />
            <ManualSuggestions show={manualSuggestion} handleClose={handleCloseManualSuggestion} />
            <AddCandidate show={addCandidateModal} handleClose={handleCloseaddCandidate} />
            <Schedulemeeting show={showScheduleMeeting} handleClose={handleCloseScheduleMeeting} />
        </>
    )
}

export default AdminSingleJob