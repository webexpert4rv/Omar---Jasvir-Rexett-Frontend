import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Col,
    Row,
    Tab,
    Tabs,
    Tooltip,
    OverlayTrigger,
    Form,
    Nav,
} from "react-bootstrap";
// import userImg from '../../assets/img/user-img.jpg'

import { Link, useLocation, useNavigate } from "react-router-dom";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from "react-redux";
import {
    changeJobStatus,
    getAllJobPostedList,
    getDeleteJob,
    getJobCategoryList,
    getShortListInterview,
    getSuggestedDeveloper,
    publishedPost,
    singleJobPostData,
} from "../../../redux/slices/clientDataSlice";

import { jobPostConfirmMessage } from "../../../helper/utlis";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { BsFillSendXFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import sidebarLogo from "../../../assets/img/rexett-logo.png";
import { FaBriefcase, FaCheck, FaGithub, FaLinkedin, FaStar, FaTrashCan, FaUsersLine, FaUsersViewfinder } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import { FaRegHandshake } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import devImg from '../../../assets/img/demo-img.jpg';
import companyImg from '../../../assets/img/aviox-logo.png';
import { FaLink } from "react-icons/fa6";
import ReactQuill from "react-quill";
import { FaClipboardUser } from "react-icons/fa6";
import { FaListUl, FaTimes, FaUsers } from "react-icons/fa";
import { PiChatsFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { IoCheckmarkCircle, IoCheckmarkOutline, IoCloseOutline, IoGrid } from "react-icons/io5";
import TableView from "../../atomic/TableView";
import InterviewCard from "../../atomic/InterviewCard";
import ScreenLoader from "../../atomic/ScreenLoader";
import RejectModal from "../Modals/RejectModal";
import MeetingInfo from "../Modals/MeetingInfo";
import ConfirmationModal from "../Modals/ConfirmationModal";
import JobCard from "./JobCard";
import RexettSpinner from "../../atomic/RexettSpinner";
import RexettButton from "../../atomic/RexettButton";
import Schedulemeeting from "../Modals/ScheduleMeeting";
import sowIcon from '../../../assets/img/sow-icon.png';
import ndaIcon from '../../../assets/img/nda-icon.png';

const SingleJobDetails = () => {
    const role = localStorage.getItem("role")
    const [selectedTabsData, setSelectedTabsData] = useState([]);
    const [currentTabsStatus, setCurrnetTabsStatus] = useState("application");
    const [currentTab, setCurrentTab] = useState("application");
    const [selectedDeveloper, setSelectedDeveloper] = useState({})
    const [statusModal, setStatusModal] = useState({
        isTrue: false,
        id: null,
    });
    const printRef = useRef();
    const [showMeetingInfo, setShowMeetingInfo] = useState({
        isMeeting: false,
        meetingDetails: {}
    });
    const [singleJobDescription, setSingleJobDescription] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let id = location.pathname.split("/")[3];
    const clientId = localStorage.getItem("userId")
    const [selectedDocument, setSelectedDocument] = useState('');
    const [documentOwner, setDocumentOwner] = useState('');
    const [detailsFilled, setDetailsFilled] = useState(false);
    const [documentSaved, setDocumentSaved] = useState(false);
    const { configDetails } = useSelector(state => state.adminData)

    const {
        allJobPostedList,
        jobCategoryList,
        jobPostedData,
        approvedLoader,
        smallLoader,
        screenLoader
    } = useSelector((state) => state.clientData);
    const { t } = useTranslation();
    useEffect(() => {
        if (id) {
            dispatch(singleJobPostData(id, () => { }));
            // dispatch(getShortListInterview(id))
        }
        dispatch(getJobCategoryList());
    }, []);
    console.log(jobPostedData, "jobPostedData")

    useEffect(() => {
        setSingleJobDescription(jobPostedData?.job);
    }, [jobPostedData]);

    const getCategory = (cat) => {
        let data = jobCategoryList.find((item) => item.value == cat);
        return data?.label;
    };

    const convertToArray = (arr) => {
        const skillsArray = arr?.split(",");
        return skillsArray;
    };
    const handleUnpublished = (id, data) => {
        dispatch(
            publishedPost(id, data, () => {
                dispatch(singleJobPostData(id, () => { }));
            })
        );
    };
    const handleSelect = (key) => {
        setCurrentTab(key);
        setSelectedTabsData(singleJobDescription?.job_applications[key]);
        if (key == "suggested") {
            setCurrnetTabsStatus("shortlisted");
        }
        const handleSelect = (key) => {
            setCurrentTab(key);
            setSelectedTabsData(jobPostedData[key]);
            if (key == "suggested") {
                setCurrnetTabsStatus("shortlisted");
            }
            if (key == "shortlisted") {
                setCurrnetTabsStatus("interviewing");
            }
            if (key == "interviewing") {
                setCurrnetTabsStatus("hired");
            }
            if (key == "application") {
                setCurrnetTabsStatus("application");
            }
        };
        const handleJobStatusAction = (e, data) => {
            e.preventDefault();
            if (data.status == "ended") {
                dispatch(
                    publishedPost(singleJobDescription?.id, data, () => {
                        setStatusModal({});
                        dispatch(singleJobPostData(id, () => { }));
                    })
                );
            } else if (data.status == "application") {
                dispatch(
                    getDeleteJob(statusModal?.id, () => {
                        setStatusModal({});
                        navigate("/client/job-posted");
                    })
                );
            } else {
                dispatch(
                    changeJobStatus(currentTab, statusModal?.id, data, () => {
                        dispatch(
                            singleJobPostData(id, () => {
                                setStatusModal({});
                                let prevData = { ...jobPostedData?.job?.job_applications };
                                let d = prevData[currentTab]?.filter(
                                    (item) => item.id !== statusModal?.id
                                );
                                prevData[currentTab] = d;
                                setSelectedTabsData(prevData[currentTab]);

                            })
                        );
                    })
                );
            }
        };

        const handleEdit = () => {
            if (singleJobDescription?.status == "Unpublished") {
                navigate(`/job-edit-post/${id}`);
            }
        };



        const handleDelete = (status, id) => {
            if (singleJobDescription?.status == "Unpublished") {
                setStatusModal({
                    [status]: !statusModal.isTrue,
                    id: id,
                });
            }
        };
        if (key == "shortlisted") {
            setCurrnetTabsStatus("interviewing");
        }
        if (key == "interviewing") {
            setCurrnetTabsStatus("hired");
        }
        if (key == "application") {
            setCurrnetTabsStatus("application");
        }
    };
    const handleJobStatusAction = (e, data) => {
        e.preventDefault();
        if (data.status == "ended") {
            dispatch(
                publishedPost(singleJobDescription?.id, data, () => {
                    setStatusModal({});
                    dispatch(singleJobPostData(id, () => { }));
                })
            );
        } else if (data.status == "application") {
            dispatch(
                getDeleteJob(statusModal?.id, () => {
                    setStatusModal({});
                    navigate("/client/job-posted");
                })
            );
        } else {
            dispatch(
                changeJobStatus(currentTab, statusModal?.id, data, () => {
                    dispatch(
                        singleJobPostData(id, () => {
                            setStatusModal({});
                            let prevData = { ...jobPostedData?.job?.job_applications };
                            let d = prevData[currentTab]?.filter(
                                (item) => item.id !== statusModal?.id
                            );

                            prevData[currentTab] = d;
                            setSelectedTabsData(prevData[currentTab]);
                        })
                    );
                })
            );
        }
    };

    const handleDocumentSelect = (e) => {
        setSelectedDocument(e.target.value);
        setDocumentOwner('');
        setDetailsFilled(false);
        setDocumentSaved(false);
    };

    const handleOwnerSelect = (e) => {
        setDocumentOwner(e.target.value);
        setDetailsFilled(false);
        setDocumentSaved(false);
    };

    const handleSave = () => {
        setDetailsFilled(true);
        setDocumentSaved(true);
    };

    const handleSubmit = () => {
        setSelectedDocument('');
        setDocumentOwner('');
        setDetailsFilled(false);
        setDocumentSaved(false);
    };

    const handleBack = () => {
        if (documentSaved) {
            setDetailsFilled(false);
            setDocumentSaved(false);
        } else if (detailsFilled) {
            setDocumentOwner('');
            setDetailsFilled(false);
        } else if (documentOwner) {
            setSelectedDocument('');
            setDocumentOwner('');
        } else {
            setSelectedDocument('');
        }
    };


    const handleEdit = () => {
        if (singleJobDescription?.status == "Unpublished") {
            const savedStep = localStorage.getItem("activeStep");
            if (savedStep) {
                localStorage.setItem("activeStep", 1);
            }
            navigate(`/client/job-edit-post/${id}`);
        }
    };

    const handleJobStatusModal = (e, id, status) => {
        console.log(e, id, status)
        if (e == undefined) {
            setStatusModal({
                [status]: !statusModal.isTrue,
                id: id,
            });
        } else {
            e.stopPropagation();

            setStatusModal({
                [status]: !statusModal.isTrue,
                id: id,
            });
        }
    };
    console.log(statusModal, "statusModal")
    const endjob = <Tooltip id="tooltip">{t("endJob")}</Tooltip>;
    const deletejob = (
        <Tooltip id="tooltip">
            {singleJobDescription?.status == "Unpublished"
                ? "Delete Job"
                : "Unpublish Job to delete"}
        </Tooltip>
    );
    const editjob = (
        <Tooltip id="tooltip">
            {singleJobDescription?.status == "Unpublished"
                ? "Edit Job"
                : "Unpublish Job to edit"}
        </Tooltip>
    );

    const publishjob = (
        <Tooltip id="tooltip">
            {singleJobDescription?.status == "Unpublished"
                ? "Publish Job"
                : "Unpublish Job"}
        </Tooltip>
    );
    const handleDelete = (status, id) => {
        if (singleJobDescription?.status == "Unpublished") {
            setStatusModal({
                [status]: !statusModal.isTrue,
                id: id,
            });
        }
    };
    const currentStatusCssClass = (status) => {
        switch (status) {
            case "ended":
                return "status-rejected";
            case "Initiated":
                return "status-progress";
            case "completed":
                return "status-finished";
            case "published":
                return "status-finished";
            case "Unpublished":
                return "status-rejected";
            default:
                return;
        }
    };

    const handleSuggestions = () => {
        let payload = {
            clientId: clientId,
            jobId: id,
            message: "Suggest Developer"
        }
        console.log(payload, "payload")
        dispatch(getSuggestedDeveloper(payload))

    }


    const handleShowMeetingInfo = (item) => {
        setShowMeetingInfo({
            isMeeting: true,
            meetingDetails: item
        })
    }
    const handleCloseMeetingInfo = () => {
        setShowMeetingInfo(false)
    }

    const [showScheduleMeeting, setShowScheduleMeet] = useState(false);
    const handleShowScheduleMeeting = (name, id) => {
        setSelectedDeveloper({ name, id })
        setShowScheduleMeet(!showScheduleMeeting);
    }
    const handleCloseScheduleMeeting = () => {
        setShowScheduleMeet(false);
    }

    const [value, setValue] = useState('');
    const handleChange = (content) => {
        setValue(content);
    };

    let suggest = <div>Suggestions <div className="stage-indicator ms-1 stage-suggest gap-1"><span className="stage-icon"><FaUsers /></span> 4</div></div>;
    let shortlist = <div>Shortlisted <div className="stage-indicator ms-1 stage-shortlist gap-1"><span className="stage-icon"><FaClipboardUser /></span> 1</div></div>;
    let interview = <div>Interviews <div className="stage-indicator ms-1 stage-interview gap-1"><span className="stage-icon"><PiChatsFill /></span> 2</div></div>;
    let offered = <div>Offered <div className="stage-indicator ms-1 stage-offer gap-1"><span className="stage-icon"><FaHandshake /></span> 0</div></div>;
    let hired = <div>Hired <div className="stage-indicator ms-1 stage-hired gap-1"><span className="stage-icon"><MdWorkHistory /></span> 0</div></div>;
    const scheduleInterview = (
        <Tooltip>Move to interview</Tooltip>
    )
    const approvedApply = (
        <Tooltip>Approve</Tooltip>
    )
    const rejectedApply = (
        <Tooltip>Reject</Tooltip>
    )

    const handleDownloadPdf = async () => {
        const element = printRef.current;

        // Adjust scale for higher quality rendering
        const canvas = await html2canvas(element, { scale: 2 });
        const data = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size, can change to 'letter' for US standard

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        let heightLeft = pdfHeight;
        let position = 0;

        // Add the first page
        pdf.addImage(data, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();

        // Check if content requires additional pages
        while (heightLeft >= 0) {
            position = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(data, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
        }

        // Set font settings
        pdf.setFont('Helvetica', 'normal'); // Change to 'Helvetica' for a clean font
        pdf.setFontSize(12); // Set a readable font size

        pdf.save('statement_of_work.pdf');
    };

    return (
        <>
            {screenLoader ? <ScreenLoader /> : <section className="single-job-section">
                <div className="single-job-card job-information-wrapper mb-0">
                    <div className="d-flex justify-content-between align-items-md-center flex-md-row flex-column-reverse">
                        <div>
                            <div className="d-flex align-items-center gap-3">
                                <h2 className="single-job-title text-start mb-0">
                                    {singleJobDescription?.title}
                                </h2>
                                <p
                                    className={`mb-0 ${currentStatusCssClass(
                                        singleJobDescription?.status
                                    )}`}
                                >
                                    <span>
                                        {singleJobDescription?.status?.charAt(0)?.toUpperCase() +
                                            singleJobDescription?.status?.slice(1)}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p className="req-text mt-2">
                                    by {singleJobDescription?.client?.name}
                                </p>
                            </div>
                        </div>
                        <div className="d-flex gap-3 flex-wrap mb-md-0 mb-4 align-items-center">
                            {singleJobDescription?.status !== "ended" ? (
                                <>
                                    <OverlayTrigger placement="top" overlay={endjob}>
                                        <Button
                                            variant="transparent"
                                            onClick={(e) =>
                                                handleJobStatusModal(
                                                    e,
                                                    singleJobDescription?.id,
                                                    "ended"
                                                )
                                            }
                                            className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none"
                                        >
                                            <MdOutlineDoNotDisturbAlt />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={publishjob}>
                                        <Button
                                            variant="transparent"
                                            className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none"
                                            onClick={() => {
                                                let data = {
                                                    status:
                                                        singleJobDescription?.status == "published"
                                                            ? "Unpublished"
                                                            : "published",
                                                };
                                                handleUnpublished(singleJobDescription?.id, data);
                                            }}
                                        >
                                            {approvedLoader ? (
                                                <RexettSpinner />
                                            ) : singleJobDescription?.status == "published" ? (
                                                <BsFillSendXFill />
                                            ) : (
                                                <BsFillSendFill />
                                            )}
                                        </Button>
                                    </OverlayTrigger>
                                </>
                            ) : (
                                ""
                            )}
                            {singleJobDescription?.status !== "ended" ? (
                                <OverlayTrigger placement="top" overlay={deletejob}>
                                    <Button
                                        className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none"
                                        variant="transparent"
                                        onClick={() =>
                                            handleDelete("application", singleJobDescription?.id)
                                        }
                                    >
                                        <FaTrashCan />
                                    </Button>
                                </OverlayTrigger>
                            ) : (
                                ""
                            )}
                            {singleJobDescription?.status !== "ended" ? (
                                <OverlayTrigger placement="top" overlay={editjob}>
                                    <Button
                                        className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none"
                                        variant="transparent"
                                        onClick={() =>
                                            handleEdit("application", singleJobDescription?.id)
                                        }
                                    >
                                        <TiEdit />
                                    </Button>
                                </OverlayTrigger>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 my-3">
                        <div className="d-flex align-items-center gap-2">
                            {/* <h3 className="req-heading">{t("contract")}</h3> */}
                            <FaRegHandshake />
                            <p className="req-text mb-0">{singleJobDescription?.contract_type}</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <SlLocationPin />
                            {/* <h3 className="req-heading mt-4">{t("location")}</h3> */}
                            <p className="req-text mb-0">{singleJobDescription?.job_type}</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <FaBriefcase />
                            <p className="req-text" >
                                {/* {singleJobDescription?.experience?.split("_").join(" ") ||
                  "Not Mentioned"} */}
                                {location?.state?.workExperienceyears ? `${location?.state?.workExperienceyears} years` : "Not Mentioned"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <Row>
                            <Col md="4">
                                <h3 className="req-heading">{t("skillsRequired")}</h3>
                                {singleJobDescription?.skills?.length > 0 ? (
                                    <ul className="skills-listing mb-0">
                                        {convertToArray(singleJobDescription?.skills)?.map(
                                            (item, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>{item}</li>
                                                    </>
                                                );
                                            }
                                        )}
                                    </ul>
                                ) : (
                                    "Not Mentioned"
                                )}{" "}
                            </Col>
                            <Col md="4">
                                <h3 className="req-heading">{t("optionalSkills")}</h3>
                                {singleJobDescription?.optional_skills?.length > 0 ? (
                                    <ul className="skills-listing mb-0">
                                        {convertToArray(
                                            singleJobDescription?.optional_skills
                                        )?.map((item, index) => {
                                            return (
                                                <>
                                                    <li key={index}>{item}</li>
                                                </>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    "Not Mentioned"
                                )}
                            </Col>
                        </Row>
                    </div>
                </div>
                {/* <div className="single-job-card">
          <Row>
            <Col md="4">
              <h3 className="req-heading">{t("clientName")}</h3>
              <p className="req-text">
                {singleJobDescription?.client?.name}
              </p>
            </Col>
            <Col md="4">
              <h3 className="req-heading">{t("experienceRequirements")}</h3>
              <p className="req-text">
                {singleJobDescription?.experience?.split("_").join(" ") ||
                      "Not Mentioned"}
                {location?.state?.workExperienceyears ? `${location?.state?.workExperienceyears} years` : "Not Mentioned"}
              </p>
            </Col>
            <Col md="4">
              <h3 className="req-heading">{t("contract")}</h3>
              <p className="req-text">
                {singleJobDescription?.contract_type}
              </p>
            </Col>
            <Col md="4">
              <h3 className="req-heading mt-4">{t("location")}</h3>
              <p className="req-text">{singleJobDescription?.job_type}</p>
            </Col>
          </Row>
        </div> */}
                {/* <div className="single-job-card">
          <Row>
            <Col md="4">
              <h3 className="req-heading">{t("skillsRequired")}</h3>
              {singleJobDescription?.skills?.length > 0 ? (
                <ul className="skills-listing mb-0">
                  {convertToArray(singleJobDescription?.skills)?.map(
                    (item, index) => {
                      return (
                        <>
                          <li key={index}>{item}</li>
                        </>
                      );
                    }
                  )}
                </ul>
              ) : (
                "Not Mentioned"
              )}{" "}
            </Col>
            <Col md="4">
              <h3 className="req-heading">{t("optionalSkills")}</h3>
              {singleJobDescription?.optional_skills?.length > 0 ? (
                <ul className="skills-listing mb-0">
                  {convertToArray(
                    singleJobDescription?.optional_skills
                  )?.map((item, index) => {
                    return (
                      <>
                        <li key={index}>{item}</li>
                      </>
                    );
                  })}
                </ul>
              ) : (
                "Not Mentioned"
              )}
            </Col>
          </Row>
        </div> */}
                {/* commented for future use */}
                {/* <div className="single-job-card">
              <Row>
                <Col md="4">
                  {singleJobDescription?.screening_questions.length &&
                    singleJobDescription?.screening_questions?.map(
                      ({ ideal_answer, question, must_have }) => (
                        <>
                          <p>Question :{question}</p>
                          {question_type && <p>{question_type}</p>}</p>
                          <p>Ideal Answer : {ideal_answer}</p>
                          <p>Must Have : {must_have ? "Yes" : "No"}</p>
                        </>
                      )
                    )}
                </Col>
              </Row>
            </div> */}
            </section>}
            <div className="job-tab-detail">
                <Tabs
                    defaultActiveKey="application"
                    id="fill-tab-example"
                    className="mb-3 job-tabs"
                    onSelect={handleSelect}
                >
                    <Tab eventKey="application" title={t("jobDetails")}>
                        <div className="card-box">
                            <h3 className="req-heading">About this job</h3>
                            <p className="single-job-description mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: singleJobDescription?.description,
                                }}
                            ></p>
                        </div>
                    </Tab>
                    {role !== "client" && <Tab eventKey="suggested" title={suggest}>
                        <div className="text-end">
                            <RexettButton className="main-btn px-4 py-2 font-14 mb-3"
                                text="Make Suggestion Request"
                                isLoading={approvedLoader}
                                disabled={approvedLoader}
                                onClick={() => handleSuggestions()} />
                        </div>
                        <JobCard
                            handleJobStatusModal={handleJobStatusModal}
                            type="Suggested"
                            data={selectedTabsData}
                            jobStatus={singleJobDescription?.status}
                            role="client"
                        />
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

                                        <TableView handleShowScheduleMeeting={handleShowScheduleMeeting} scheduleInterview={scheduleInterview} rejectedApply={rejectedApply} listing={singleJobDescription?.job_applications?.shortlisted} />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="grid-view">
                                    <JobCard
                                        handleJobStatusModal={handleJobStatusModal}
                                        type="Shortlisted"
                                        data={selectedTabsData}
                                        jobStatus={singleJobDescription?.status}
                                        role="client"
                                    />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
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

                    </Tab>
                    <Tab eventKey="interviewing" title={interview}>
                        <div>
                            <h5 className="font-22 mb-4 fw-bold">Interview Completed</h5>
                            <Row>
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
                                            <span className="status-finished">Completed</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <Link to={'/client/interview-feedback'} className="main-btn font-14 text-decoration-none">Share Feedback</Link>
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
                                            <span className="status-finished">Selected</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mt-2">
                                                <Link to={'/client/interview-detail'} className="main-btn font-14 text-decoration-none">Interview Report</Link>
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
                                                <Link to={'/client/interview-detail'} className="main-btn font-14 text-decoration-none">Interview Report</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <h5 className="font-22 mb-4 fw-bold">Scheduled Interview</h5>
                        <div className="interview-scheduled pt-2 mb-3">
                            <Row>
                                {singleJobDescription?.job_applications?.interviews?.scheduled_interviews?.map((item) => {
                                    return (
                                        <>
                                            <Col lg={4}>
                                                <InterviewCard handleShowMeetingInfo={handleShowMeetingInfo} item={item} />
                                            </Col>
                                        </>
                                    )
                                })}
                                {/* <Col lg={4}><InterviewCard handleShowMeetingInfo={handleShowMeetingInfo} /></Col> */}


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
                                        <TableView handleShowScheduleMeeting={handleShowScheduleMeeting} scheduleInterview={scheduleInterview} rejectedApply={rejectedApply} listing={singleJobDescription?.job_applications?.interviews?.need_to_schedule} />

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
                                                        <OverlayTrigger placement="top" overlay={rejectedApply}>
                                                            <Button variant="danger">
                                                                <FaTimes />
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
                        {/* <JobCard
              handleJobStatusModal={handleJobStatusModal}
              type="Interviewing"
              data={selectedTabsData}
              jobStatus={singleJobDescription?.status}
            /> */}
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
                    <Tab eventKey="documentation" title={offered}>
                        <Button onClick={handleDownloadPdf}>DownLoad pdf</Button>
                        <div>
                            <div className="text-end mb-4">
                                <Button variant="transparent" className="font-14 main-btn">Create Document</Button>
                            </div>
                            <div className="card-box mb-4">

                                {!selectedDocument && (
                                    <div>
                                        <h4 className="text-center">Select Document</h4>
                                        <p className="text-center mb-4">Select document you want to create</p>
                                        <div className="selection-cards">
                                            <Row className="justify-content-center">
                                                <Col md={4}>
                                                    <div className="document-card">
                                                        <input type="radio" className="document_select d-none" id="sow-document" name="document_select" value="SOW" onChange={handleDocumentSelect} />
                                                        <Form.Label htmlFor="sow-document" className="document_label">
                                                            <span className="doccheck-icon">
                                                                <IoCheckmarkCircle />
                                                            </span>
                                                            <img src={sowIcon} alt="SOW Icon" />
                                                            <span>Statement of work</span>
                                                        </Form.Label>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="document-card">
                                                        <input type="radio" className="document_select d-none" id="nda-document" name="document_select" value="NDA" onChange={handleDocumentSelect} />
                                                        <Form.Label htmlFor="nda-document" className="document_label">
                                                            <span className="doccheck-icon">
                                                                <IoCheckmarkCircle />
                                                            </span>
                                                            <img src={ndaIcon} alt="NDA Icon" />
                                                            <span>Non Disclosure Agreement</span>
                                                        </Form.Label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                )}
                                {selectedDocument && !documentOwner && (
                                    <div id="document-ownership">
                                        <h4 className="text-center">Document Ownership: Client or Candidate?</h4>
                                        <p className="text-center mb-4">Is this document intended for the Client or the Candidate?</p>
                                        <div className="selection-cards">
                                            <Row className="justify-content-center">
                                                <Col md={4}>
                                                    <div className="document-card">
                                                        <input type="radio" className="document_select d-none" id="client-document" name="document_owner" value="Client" onChange={handleOwnerSelect} />
                                                        <Form.Label htmlFor="client-document" className="document_label">
                                                            <span className="doccheck-icon">
                                                                <IoCheckmarkCircle />
                                                            </span>
                                                            <FaUsersLine />
                                                            <span>Client</span>
                                                        </Form.Label>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="document-card">
                                                        <input type="radio" className="document_select d-none" id="candidate-document" name="document_owner" value="Candidate" onChange={handleOwnerSelect} />
                                                        <Form.Label htmlFor="candidate-document" className="document_label">
                                                            <span className="doccheck-icon">
                                                                <IoCheckmarkCircle />
                                                            </span>
                                                            <FaUsersViewfinder />
                                                            <span>Candidate</span>
                                                        </Form.Label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="text-center">
                                            <Button variant="transparent" className="font-14 main-btn px-5" onClick={handleBack}>Back</Button>
                                        </div>
                                    </div>
                                )}
                                {selectedDocument === 'NDA' && documentOwner && (
                                    <>
                                        {documentOwner === 'Client' && documentSaved && (
                                            <div id="preview-document">
                                                <h4 className="text-center mb-4">Preview Document</h4>
                                                <div className="text-center">
                                                    <Button variant="transparent" className="font-14 main-btn px-5" onClick={handleSubmit}>Submit</Button>
                                                    <Button variant="transparent" className="font-14 main-btn px-5" onClick={handleBack}>Back</Button>
                                                </div>
                                            </div>
                                        )}
                                        {documentOwner === 'Candidate' && !documentSaved && (
                                            <div id="select-candidates">
                                                <h4 className="text-center">Select Candidates</h4>
                                                <p className="text-center mb-4">Please select candidate for non disclosure agreement. You can select multiple candidates</p>
                                                <div>
                                                    <Row className="justify-content-center">
                                                        <Col md={12}>
                                                            <div>
                                                                <div>
                                                                    {/* Example candidates */}
                                                                    {[...Array(6)].map((_, i) => (
                                                                        <div className="d-inline-block me-3" key={i}>
                                                                            <input type="checkbox" name="candidate_check" className="candidate_checkbox" id={`candidate_short${i + 1}`} />
                                                                            <Form.Label htmlFor={`candidate_short${i + 1}`} className="select_candidate_label">
                                                                                <div className="position-relative">
                                                                                    <img src={devImg} alt="Candidate" />
                                                                                    <span className="checkmark-icon">
                                                                                        <IoCheckmarkOutline />
                                                                                    </span>
                                                                                </div>
                                                                                johndoe@gmail.com
                                                                            </Form.Label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="text-center">
                                                                <Button variant="transparent" className="font-14 main-btn px-5" onClick={handleSave}>Save</Button>
                                                                <Button variant="transparent" className="font-14 outline-main-btn  px-5" onClick={handleBack}>Back</Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                {documentOwner && selectedDocument !== 'NDA' && !documentSaved && (
                                    <div id="fill-details">
                                        <h4 className="text-center">Fill Details</h4>
                                        <p className="text-center mb-4">Fill all the details</p>
                                        <div>
                                            <Row className="justify-content-center">
                                                <Col md={6}>
                                                    <div>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div>
                                                                    <Form.Label className="font-14 fw-medium">Select Candidate</Form.Label>
                                                                    <div>
                                                                        {[...Array(6)].map((_, i) => (
                                                                            <div className="d-inline-block me-3" key={i}>
                                                                                <input type="checkbox" name="candidate_check" className="candidate_checkbox" id={`candidate_short${i + 1}`} />
                                                                                <Form.Label htmlFor={`candidate_short${i + 1}`} className="select_candidate_label">
                                                                                    <div className="position-relative">
                                                                                        <img src={devImg} alt="Candidate" />
                                                                                        <span className="checkmark-icon">
                                                                                            <IoCheckmarkOutline />
                                                                                        </span>
                                                                                    </div>
                                                                                    johndoe@gmail.com
                                                                                </Form.Label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Label className="font-14 fw-medium">Name</Form.Label>
                                                                <Form.Control type="text" value="Aviox Technologies" className="common-field font-14" readOnly />
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Label className="font-14 fw-medium">Address</Form.Label>
                                                                <Form.Control type="text" value="Mohali, Punjab" className="common-field font-14" readOnly />
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Label className="font-14 fw-medium">Start Date</Form.Label>
                                                                <Form.Control type="date" className="common-field font-14" />
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Label className="font-14 fw-medium">Work Location</Form.Label>
                                                                <Form.Control type="text" value="Remotely" readOnly className="common-field font-14" />
                                                            </Col>
                                                            <Col md={12} className="mb-0">
                                                                <Form.Label>Working Hours</Form.Label>
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Label className="font-14 fw-medium">Start Time</Form.Label>
                                                                <Form.Control type="time" className="common-field font-14" />
                                                            </Col>
                                                            <Col md={6} className="mb-3">
                                                                <Form.Label className="font-14 fw-medium">End Time</Form.Label>
                                                                <Form.Control type="time" className="common-field font-14" />
                                                            </Col>
                                                            <Col md={8} className="mb-3">
                                                                <Form.Label className="font-14 fw-medium">Price (in dollars)</Form.Label>
                                                                <div className="d-flex align-items-center gap-3">
                                                                    <Form.Control type="text" className="common-field font-14" />
                                                                    <Form.Check type="checkbox" label="Inc. GST" className="font-14 flex-none" />
                                                                </div>
                                                            </Col>
                                                            <Col md={12} className="mb-3">
                                                                <Form.Label className="font-14 fw-medium">Scope of work</Form.Label>
                                                                <Form.Control type="text" as="textarea" rows={3} className="common-field font-14" />
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                    <div className="text-center">
                                                        <Button variant="transparent" className="font-14 outline-main-btn main-btn px-5 me-2" onClick={handleBack}>Back</Button>
                                                        <Button variant="transparent" className="font-14 main-btn px-5" onClick={handleSave}>Save</Button>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div>
                                                        <h5>Preview Document</h5>
                                                        <div className="docs-container" ref={printRef} >
                                                            <div className="sidebar-logo mt-3 mb-2 text-center">
                                                                <a href="https://www.rexett.com/">
                                                                    <img src={sidebarLogo} alt="Sidebar Logo" />
                                                                </a>
                                                            </div>
                                                            <header>
                                                                <h1 className="docs-head">Statement of Work – Time and Material</h1>
                                                            </header>
                                                            <section className="docs-introduction">
                                                                <p>This Statement of Work (“SOW”) dated 04th July 2024 is made part of the Master Service Agreement executed between <strong>Digital Aptech Pvt. Ltd.</strong>, an Indian company, with its registered office at EN-34 (9th Floor), Block-EN, Sector – V, Salt Lake City, Kolkata – 700091, (hereinafter referred to as “Company”)</p>
                                                                <p>and</p>
                                                                <p><strong>Aviox Technologies Private Limited</strong>, with its registered office at office no-26, prosperity square, d- 185, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, Pin Code : 160055 (herein referred to as “Subcontractor”)</p>
                                                                <p>In the event of a conflict between the terms and conditions of the Agreement and the terms of this SOW, the terms of this SOW shall control only for the purposes of setting forth the Services performed herein.</p>
                                                                <p>All capitalized terms used herein without definition shall have the meanings assigned to them in the Agreement; all capitalized terms defined herein shall have the meaning set forth in this SOW.</p>
                                                            </section>
                                                            <section className="terms-conditions">
                                                                <h2 className="docs-head-section">Terms and Conditions</h2>
                                                                <p>Parties agree to the following terms herein:</p>
                                                                <ul>
                                                                    <li><strong>Contractual Resource Name:</strong> </li>
                                                                    <li><strong>Contract Duration:</strong> 3 Months </li>
                                                                    <li><strong>Start Date:</strong> 4th July 2024</li>
                                                                    <li><strong>Contract End Date:</strong> N/A</li>
                                                                </ul>
                                                                <h3 className="docs-head-section">Scope of Work</h3>
                                                                <p>For consideration of the Fees as specified below, Subcontractor agrees to provide the full-time services of the assigned developer, to work on projects and assignments as required by the Company on a day-to-day basis.</p>
                                                                <h3 className="docs-head-section">Obligations of Parties</h3>
                                                                <ul>
                                                                    <li><strong>Company’s Obligations:</strong> To provide a clear requirement of the tasks to be performed and to monitor and guide the output of the assigned developer.</li>
                                                                    <li><strong>Subcontractor’s Obligations:</strong> To make the assigned developer available to the Company during all normal working hours of the Company.</li>
                                                                </ul>
                                                                <h3 className="docs-head-section">Notice Period</h3>
                                                                <ul>
                                                                    <li><strong>For Termination:</strong> Either party can serve notice of 30 days for the termination of this Statement of Work, without any cause.</li>
                                                                    <li><strong>In Case of Non-performance:</strong> Immediate.</li>
                                                                </ul>
                                                                <h3 className="docs-head-section">Fees</h3>
                                                                <p>The following rates shall be applicable for the Services:</p>
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Sr. No</th>
                                                                            <th>Resource Name</th>
                                                                            <th>Monthly Rates</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>Pankaj Pundir</td>
                                                                            <td>85K + GST</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <p>Rates specified in the table above are exclusive of applicable taxes and shall be charged extra.</p>
                                                                <p>A person's month shall comprise a number of working days with asked hours of work per day.</p>
                                                                <p>Invoices shall be raised at the end of each month. Invoice would be payable within 30 days of the receipt of the Invoice. Invoice processing cycle and other statutory requirements are expressly defined in Annexure A to this SOW.</p>
                                                                <p>Any leaves if required need to pre-inform Digital Aptech Pvt Ltd & End client.</p>
                                                                <p><strong>Leave:</strong> The Contractor’s personnel and/or its independent contractors will be granted with no paid leaves. (No work No Pay)</p>
                                                                <h3 className="docs-head-section">Work Location</h3>
                                                                <p>Remotely</p>
                                                                <p><strong>Working Hours:</strong> 10:00 AM to 7:00 PM</p>
                                                            </section>
                                                            <section className="signatures">
                                                                <h3 className="docs-head-section">SOW#[•] Approved and Acknowledged</h3>
                                                                <Row>
                                                                    <Col md={6}>
                                                                        <div className="signature">
                                                                            <p className="mb-0"><strong>Aviox Technology</strong></p>
                                                                            <p className="mb-0">Name - <strong>Pankaj</strong></p>
                                                                            <p className="mb-0">Designation - <strong>Software Developer</strong></p>
                                                                            <p>Date - <strong>23-7-2024</strong></p>
                                                                            <hr className="mb-1 mt-5" />
                                                                            <p>Signature</p>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="signature">
                                                                            <p className="mb-0"><strong>Rv Technloggy</strong></p>
                                                                            <p className="mb-0">Name - <strong>John</strong></p>
                                                                            <p className="mb-0">Designation - <strong>Manager</strong></p>
                                                                            <p>Date - <strong>23-7-2024</strong></p>
                                                                            <hr className="mb-1 mt-5" />
                                                                            <p>Signature</p>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </section>
                                                            <section className="annexure-a">
                                                                <h2 className="docs-head-section">Annexure A</h2>
                                                                <h3 className="docs-head-section">Invoice Processing Cycle and Statutory Documents</h3>
                                                                <h4 className="docs-head-section">One Time Registration</h4>
                                                                <p>Company will require the following set of documents for registering Subcontractor in Company’s payment system:</p>
                                                                <ul>
                                                                    <li>Filled vendor consent Form (attached in the email shared with the Subcontractor)</li>
                                                                    <li>Copy of GST Certificate</li>
                                                                    <li>Copy of PAN</li>
                                                                    <li>Copy of canceled cheque</li>
                                                                    <li>Copy of MSME Certificate (if applicable)</li>
                                                                </ul>
                                                                <h4 className="docs-head-section">Invoice Processing Cycle</h4>
                                                                <ul>
                                                                    <li><strong>Timesheet:</strong> Timesheets need to be shared on the last day of every month after receiving the approved timesheet from the Resource.</li>
                                                                    <li><strong>Invoice from Subcontractor:</strong> Based on the timesheet, Subcontractor may raise the invoice for the previous month. Company will require a signed copy of the invoice.</li>
                                                                </ul>
                                                                <h4 className="docs-head-section">Payment</h4>
                                                                <p>Company will release the payment as per the terms agreed in the SOW after receiving the signed invoice along with the following set of statutory documents:</p>
                                                                <ul>
                                                                    <li>Copy of Provident Fund Challan</li>
                                                                    <li>Copy of Provident Fund ECR (Electronic Challan cum Return) Acknowledgement</li>
                                                                    <li>Copy of Provident Fund signed ECR</li>
                                                                    <li>Copy of Provident Fund Payment acknowledgement</li>
                                                                    <li>Profession Tax Challan</li>
                                                                    <li>Labour welfare challan (Only in the month of June and Dec - MLWF)</li>
                                                                    <li>ESIC (Employees' State Insurance Corporation)</li>
                                                                </ul>
                                                                <p>In case, any of the above listed statutory documents are not applicable to the Subcontractor, Subcontractor shall mention the same on its company letterhead, stamp and sign it and share it with the Company so that Company does not ask for the same in future.</p>
                                                            </section>

                                                            <footer className="confidential">
                                                                <p><strong>PRIVATE AND CONFIDENTIAL</strong></p>
                                                            </footer>

                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                )}
                                {documentSaved && (
                                    <div id="preview-document">
                                        <h4 className="text-center mb-4">Preview Document</h4>
                                        <div className="text-center">
                                            <Button variant="transparent" className="font-14 main-btn px-5" onClick={handleSubmit}>Submit</Button>
                                            <Button variant="transparent" className="font-14 main-btn px-5" onClick={handleBack}>Back</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <h5 className="font-22 mb-4 fw-bold">Created Documents for Client</h5>
                            <Row>
                                <Col lg={4}>
                                    <h4 className="font-18">Statement of work</h4>
                                    <div className="interview-wrapper position-relative mb-3">
                                        <div>
                                            <p className="dev-name mb-2 font-16">
                                                <div className="me-1">
                                                    <img src={companyImg} />
                                                </div>
                                                <div>
                                                    Aviox Technologies Pvt Ltd<br />
                                                    {/* <span className="associate-text">
                                                        <span className="associate mt-1">Mohali, India</span>
                                                    </span> */}
                                                </div>
                                            </p>
                                            <div>
                                                <h5 className="font-14 mt-3 mb-1">Status</h5>
                                                <span className="associate-text me-1">
                                                    <span className="associate d-inline-flex align-items-center">SOW <span className="text-green font-18 d-inline-block ms-2"><IoCheckmarkOutline /> </span></span>
                                                </span>
                                                <span className="associate-text">
                                                    <span className="associate d-inline-flex align-items-center">NDA <span className="text-danger font-18 d-inline-block ms-2"><IoCloseOutline /></span></span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mt-2">
                                                <Button variant="transparent" className="cancel-btn font-14">Cancel Doc</Button>
                                                <Link to={'/admin/interview-detail'} className="outline-main-btn rounded-2 font-14 text-decoration-none">Download PDF</Link>
                                                <Button variant="transparent" className="main-btn font-14">Send for E-sign</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <h4 className="font-18">Non Disclosure Agreement</h4>
                                    <div className="interview-wrapper position-relative mb-3">
                                        <div>
                                            <p className="dev-name mb-2 font-16">
                                                <div className="me-1">
                                                    <img src={companyImg} />
                                                </div>
                                                <div>
                                                    Aviox Technologies Pvt Ltd<br />
                                                    {/* <span className="associate-text">
                                                        <span className="associate mt-1">Mohali, India</span>
                                                    </span> */}
                                                </div>
                                            </p>
                                            <div>
                                                <h5 className="font-14 mt-3 mb-1">Status</h5>
                                                <span className="associate-text me-1">
                                                    <span className="associate d-inline-flex align-items-center">SOW <span className="text-green font-18 d-inline-block ms-2"><IoCheckmarkOutline /> </span></span>
                                                </span>
                                                <span className="associate-text">
                                                    <span className="associate d-inline-flex align-items-center">E sign status <span className="text-danger font-18 d-inline-block ms-2"><IoCloseOutline /></span></span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mt-2">
                                                <Button variant="transparent" className="cancel-btn font-14">Cancel Doc</Button>
                                                <Link to={'/admin/interview-detail'} className="outline-main-btn rounded-2 font-14 text-decoration-none">Download PDF</Link>
                                                <Button variant="transparent" className="main-btn font-14">Send for E-sign</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <h5 className="font-22 mb-4 fw-bold">Created Documents for Candidate</h5>

                            <Tab.Container
                                id="left-tabs-example"
                                defaultActiveKey="sow"
                                onSelect={handleSelect}
                            >
                                <Nav variant="pills" className="application-pills">
                                    <Nav.Item className="application-item">
                                        <Nav.Link eventKey="sow" className="application-link">
                                            SOW
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="application-item">
                                        <Nav.Link eventKey="nda" className="application-link">
                                            NDA
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="sow" className="py-4">
                                        <Row>
                                            <Col lg={4}>
                                                <div className="interview-wrapper position-relative mb-3">
                                                    <div>
                                                        <p className="dev-name mb-2 font-16">
                                                            <div className="me-1">
                                                                <img src={devImg} />
                                                            </div>
                                                            <div>
                                                                Rohit Sharma<br />
                                                                <span className="associate-text">
                                                                    <span className="associate mt-1">Web developer</span>
                                                                </span>
                                                            </div>
                                                        </p>
                                                        <div>
                                                            <h5 className="font-14 mt-3 mb-1">Status</h5>
                                                            <span className="associate-text me-1">
                                                                <span className="associate d-inline-flex align-items-center">E sign status <span className="text-green font-18 d-inline-block ms-2"><IoCheckmarkOutline /> </span></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 mt-2">
                                                            <Button variant="transparent" className="cancel-btn font-14">Cancel Doc</Button>
                                                            <Link to={'/admin/interview-detail'} className="outline-main-btn rounded-2 font-14 text-decoration-none">Download PDF</Link>
                                                            <Button variant="transparent" className="main-btn font-14">Send for E-sign</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="nda" className="py-4">
                                        <Row>
                                            <Col lg={4}>
                                                <div className="interview-wrapper position-relative mb-3">
                                                    <div>
                                                        <p className="dev-name mb-2 font-16">
                                                            <div className="me-1">
                                                                <img src={devImg} />
                                                            </div>
                                                            <div>
                                                                Rohit Sharma<br />
                                                                <span className="associate-text">
                                                                    <span className="associate mt-1">Web developer</span>
                                                                </span>
                                                            </div>
                                                        </p>
                                                        <div>
                                                            <h5 className="font-14 mt-3 mb-1">E-sign status</h5>
                                                            <span className="associate-text">
                                                                <span className="associate d-inline-flex align-items-center">E sign status <span className="text-danger font-18 d-inline-block ms-2"><IoCloseOutline /></span></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            {/* <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button> */}
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 mt-2">
                                                            <Button variant="transparent" className="cancel-btn font-14">Cancel Doc</Button>
                                                            <Link to={'/admin/interview-detail'} className="outline-main-btn rounded-2 font-14 text-decoration-none">Download PDF</Link>
                                                            <Button variant="transparent" className="main-btn font-14">Send for E-sign</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </Tab>
                    <Tab eventKey="hired" title={hired}>
                        <JobCard
                            handleJobStatusModal={handleJobStatusModal}
                            type="Hired"
                            data={selectedTabsData}
                            jobStatus={singleJobDescription?.status}
                        />
                    </Tab>
                </Tabs>
            </div>
            <RejectModal
                show={statusModal?.rejected}
                handleClose={handleJobStatusModal}
                onClick={handleJobStatusAction}
                type={currentTab}
                smallLoader={smallLoader}
            />
            {/* <EndJobModal
        show={statusModal?.ended}
        handleClose={handleJobStatusModal}
        onClick={handleJobStatusAction}
        smallLoader={smallLoader}
        header="End Job"
        feedbacks={"Feedbacks"}
        submit={"Request"}
      /> */}
            <ConfirmationModal
                text={jobPostConfirmMessage(currentTab)}
                show={
                    statusModal?.Shortlisted ||
                    statusModal?.Interviewing ||
                    statusModal?.Suggested ||
                    statusModal?.application
                }
                onClick={handleJobStatusAction}
                handleClose={handleJobStatusModal}
                smallLoader={smallLoader}
                type={currentTabsStatus}
            />
            {showMeetingInfo?.isMeeting ? <MeetingInfo show={showMeetingInfo?.isMeeting} handleClose={handleCloseMeetingInfo} details={showMeetingInfo?.meetingDetails} /> : ""}
            <Schedulemeeting show={showScheduleMeeting} handleClose={handleCloseScheduleMeeting} selectedDeveloper={selectedDeveloper} />
        </>
    );
};
export default SingleJobDetails;
