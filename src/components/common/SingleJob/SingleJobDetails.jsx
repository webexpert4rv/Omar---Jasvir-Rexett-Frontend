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
  ProgressBar,
  Modal,
} from "react-bootstrap";
// import userImg from '../../assets/img/user-img.jpg'

import { Link, useLocation, useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  approveFeedback,
} from "../../../redux/slices/clientDataSlice";

import {
  DISCOVERY_DOCS,
  jobPostConfirmMessage,
  SCOPES,
} from "../../../helper/utlis";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import ManualSuggestions from "../../../pages/admin/Modals/ManualSuggestion";
import { BsFillSendXFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import sidebarLogo from "../../../assets/img/rexett-logo.png";
import {
  FaArrowRight,
  FaBriefcase,
  FaCheck,
  FaEye,
  FaFileSignature,
  FaGithub,
  FaLinkedin,
  FaPencil,
  FaStar,
  FaThumbsUp,
  FaTrash,
  FaTrashCan,
  FaUsersLine,
  FaUsersViewfinder,
} from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import { FaRegHandshake } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import devImg from "../../../assets/img/demo-img.jpg";
import companyImg from "../../../assets/img/aviox-logo.png";
import { FaLink } from "react-icons/fa6";
import ReactQuill from "react-quill";
import { FaClipboardUser } from "react-icons/fa6";
import { FaListUl, FaShareAlt, FaTimes, FaUsers } from "react-icons/fa";
import { PiChatsFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { LuDownload, LuMessagesSquare } from "react-icons/lu";
import {
  IoCheckmarkCircle,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoGrid,
} from "react-icons/io5";
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
import sowIcon from "../../../assets/img/sow-icon.png";
import ndaIcon from "../../../assets/img/nda-icon.png";
// import SingleDetailForm from "./SingleDetailForm";
import FeedbackPopup from "./FeedbackPopup";
import sowImage from "../../../assets/img/sow-img.png";
import { RiFileCloseLine } from "react-icons/ri";
import AgreementDetails from "../../../pages/admin/Modals/AgreementDetail";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { gapi } from "gapi-script";
import { getDeveloperList } from "../../../redux/slices/adminDataSlice";
import { getAdobeTemplate } from "../../../redux/slices/adobeDataSlice";
import DeveloperRegistrationStepper from "../../../pages/Registration flows/DeveloperRegistrationFlow/DeveloperRegistrationStepper";
import useEndAndDelete from "../../../hooks/useEndAndDelete";
import NoDataFound from "../../atomic/NoDataFound";
import ShareModal from "../Modals/ShareModal";
import JobOfferedTab from "../JobOfferedTab/JobOfferedTab";

const SingleJobDetails = () => {
  const {
    handleEndAndDeleteModal,
    showDeleteModal,
    showEndModal,
    modalLoader,
    handleDeleteJob,
  } = useEndAndDelete(); // all the logic for delete job and end job is written inside this
  const role = localStorage.getItem("role");
  const [showScheduleMeeting, setShowScheduleMeet] = useState(false);
  const [selectedTabsData, setSelectedTabsData] = useState([]);
  const [suggestShortList, setSuggestShortList] = useState(false);
  const [appliedShortList, setAppliedShortList] = useState(false);
  const [currentTabsStatus, setCurrnetTabsStatus] = useState("shortlisted");
  const [currentTab, setCurrentTab] = useState("application");
  const [selectedDeveloper, setSelectedDeveloper] = useState({});
  const [devType, setDevType] = useState();
  const [statusModal, setStatusModal] = useState({
    isTrue: false,
    id: null,
  });
  const { singleJobPost } = useSelector((state) => state.clientData);
  const printRef = useRef();
  const [showMeetingInfo, setShowMeetingInfo] = useState({
    isMeeting: false,
    meetingDetails: {},
  });
  const [singleJobDescription, setSingleJobDescription] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let id = location.pathname.split("/")[3];
  const job_id = localStorage.setItem("jobId", id);
  const [devId, setDevId] = useState();
  const [application, setApplicationId] = useState();
  const clientId = localStorage.getItem("userId");
  const [selectedDocument, setSelectedDocument] = useState("");
  const [documentOwner, setDocumentOwner] = useState("");
  const [isNewStepCompleted, setIsNewStepCompleted] = useState(false);
  const [detailsFilled, setDetailsFilled] = useState(false);
  const [documentSaved, setDocumentSaved] = useState(false);
  const { configDetails, developerList } = useSelector(
    (state) => state.adminData
  );
  const [suggestTabData, setSuggestTabData] = useState();
  const [appliedTabData, setAppliedTabData] = useState();
  const [manualSuggestion, showManualSuggestion] = useState(false);
  const { t } = useTranslation();
  const [showShareModal, setShowShareModal] = useState(false);

  const {
    allJobPostedList,
    jobCategoryList,
    jobPostedData,
    approvedLoader,
    smallLoader,
    screenLoader,
  } = useSelector((state) => state.clientData);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: "AIzaSyDRb_BGMWY3XocACa_K976a0g6y-5QwkqU",
          clientId:
            "982505282330-ei63qgf2b0b0djm6dfkdapnpcl7oc8en.apps.googleusercontent.com",
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          localStorage.setItem("authentication", authInstance.isSignedIn.get());
        })
        .catch((error) => {
          console.error("Error initializing GAPI:", error);
        });
    }
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(singleJobPostData(id, () => {}));
      // dispatch(getShortListInterview(id))
    }
    dispatch(getJobCategoryList());
  }, [id]);

  useEffect(() => {
    dispatch(getDeveloperList());
    // dispatch(getAdobeTemplate())
  }, [dispatch]);

  useEffect(() => {
    setSingleJobDescription(singleJobPost?.job);
  }, [singleJobPost]);

  console.log(singleJobPost, "singleJobPost");
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
        dispatch(singleJobPostData(id, () => {}));
      })
    );
  };
  const handleSelect = (key) => {
    console.log(key, "key");
    setCurrentTab(key);
    setSelectedTabsData(singleJobDescription?.job_applications[key]);
    if (key == "suggestions") {
      setCurrnetTabsStatus("shortlisted");
    } else if (key == "shortlisted") {
      setCurrnetTabsStatus("interviewing");
    } else if (key == "interviewing") {
      setCurrnetTabsStatus("hired");
    } else if (key == "application") {
      setCurrnetTabsStatus("application");
    } else {
      setCurrnetTabsStatus(key);
    }
  };
  console.log(currentTab, "currentTab");
  console.log(currentTabsStatus, "currentTabsStatus");
  console.log(singleJobDescription, "singleJobDescription");
  // const handleEdit = () => {
  //     if (singleJobDescription?.status == "Unpublished") {
  //         navigate(`/job-edit-post/${id}`);
  //     }
  // };

  const fetchMeetingDetails = async (meetingCode) => {
    const response = await gapi.client.reports.activities.list({
      userKey: "all",
      applicationName: "meet",
      eventName: "call_ended",
      filters: `meeting_code==${meetingCode}`,
    });

    const activities = response.result.items || [];
    const participants = activities.flatMap((activity) =>
      activity.events.flatMap((event) =>
        event.parameters
          .filter((param) => param.name === "user_email")
          .map((param) => param.value)
      )
    );

    const duration = activities
      .flatMap((activity) =>
        activity.events.flatMap((event) =>
          event.parameters
            .filter((param) => param.name === "duration_seconds")
            .map((param) => parseInt(param.value, 10))
        )
      )
      .reduce((acc, val) => acc + val, 0);
  };

  const checkEventStatus = async (eventId) => {
    const response = await gapi.client.calendar.events.get({
      calendarId: "primary",
      eventId: "688ebijbl636qsme6vi95maa8q",
    });

    if (response.result.status === "cancelled") {
      alert("This meeting was cancelled.");
    } else {
      const now = new Date();
      const meetingStart = new Date(response.result.start.dateTime);
      if (meetingStart < now) {
        fetchMeetingDetails("688ebijbl636qsme6vi95maa8q");
        // alert('The meeting should have started or is over.');
      } else {
        alert("The meeting is still scheduled.");
      }
    }
  };

  const handleJobStatusAction = (e, data) => {
    console.log(devId, "devid");
    console.log(data?.status, "newSttas");
    e.preventDefault();
    if (data.status == "ended") {
      dispatch(
        publishedPost(singleJobDescription?.id, data, () => {
          setStatusModal({});
          dispatch(singleJobPostData(id, () => {}));
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
      let newData = {
        applicationId: application,
        newStatus: data.status,
        developerId: devId,
        jobId: +id,
      };

      dispatch(
        changeJobStatus(currentTab, newData, () => {
          dispatch(
            singleJobPostData(id, () => {
              setStatusModal({});
              let prevData = {
                ...singleJobPost?.job?.job_applications?.suggestions,
              };

              // Separate logic for suggested and applied
              if (data.status === "rejected" || data.status === "shortlisted") {
                if (devType === "suggested") {
                  let suggestedData = prevData.suggested?.filter(
                    (item) => item?.developer?.id !== statusModal?.id
                  );
                  setSuggestShortList(true);
                  setSuggestTabData(suggestedData);
                } else if (devType === "applied") {
                  let appliedData = prevData.applied?.filter(
                    (item) => item?.developer?.id !== statusModal?.id
                  );
                  setAppliedShortList(true);
                  setAppliedTabData(appliedData);
                }
              }
            })
          );
        })
      );
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

  const handleJobStatusModal = (e, id, status, type, aplnId) => {
    console.log(aplnId, "aplnId");
    console.log(type, "type");
    console.log(status, "status");
    console.log(id, "helloId");
    setDevType(type);
    setApplicationId(aplnId);
    setDevId(id);
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

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };
  const endjob = <Tooltip id="tooltip">{t("endJob")}</Tooltip>;
  const shareJob = <Tooltip id="tooltip">{"Share Job"}</Tooltip>;
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
      case "unpublished":
      case "Unpublished":
        return "status-rejected";
      default:
        return;
    }
  };

  const cardCurrentStatus = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "pending":
        return "Need to Schedule";
      case "declined":
        return "Declined";
      case "scheduled":
        return "Scheduled";
      default:
        return;
    }
  };

  const handleSuggestions = () => {
    let payload = {
      clientId: clientId,
      jobId: id,
      message: "Suggest Developer",
    };
    dispatch(getSuggestedDeveloper(payload));
  };

  const handleShowMeetingInfo = (item) => {
    setShowMeetingInfo({
      isMeeting: true,
      meetingDetails: item,
    });
  };
  const handleCloseMeetingInfo = () => {
    setShowMeetingInfo(false);
  };

  const handleShowScheduleMeeting = (name, id, email) => {
    setSelectedDeveloper({ name, id, email });
    setShowScheduleMeet(!showScheduleMeeting);
  };
  const handleCloseScheduleMeeting = () => {
    setShowScheduleMeet(false);
  };

  const [value, setValue] = useState("");
  const handleChange = (content) => {
    setValue(content);
  };
  const needToSchedule =
    singleJobDescription?.job_applications?.interviews?.need_to_schedule || [];
  const completedInterview =
    singleJobDescription?.job_applications?.interviews?.interview_completed ||
    [];
  const scheduledInterviews =
    singleJobDescription?.job_applications?.interviews?.scheduled_interviews ||
    [];
  const interviewsCount =
    singleJobDescription?.job_applications?.interviews_count > 0
      ? singleJobDescription?.job_applications?.interviews_count
      : "";
  const shortlistedCount =
    singleJobDescription?.job_applications?.shortlisted_count > 0
      ? singleJobDescription?.job_applications?.shortlisted_count
      : "";
  const suggestionsCount =
    singleJobDescription?.job_applications?.suggestion_count > 0
      ? singleJobDescription?.job_applications?.suggestion_count
      : "";
  const offeredCount =
    singleJobDescription?.job_applications?.offered_count > 0
      ? singleJobDescription?.job_applications?.offered_count
      : "";
  const hiredCount =
    singleJobDescription?.job_applications?.hired_count > 0
      ? singleJobDescription?.job_applications?.hired_count
      : "";

  let suggest = (
    <div>
      Suggestions{" "}
      <div className="stage-indicator ms-1 stage-suggest gap-1">
        <span className="stage-icon">
          <FaUsers />
        </span>{" "}
        {suggestionsCount}
      </div>
    </div>
  );
  let shortlist = (
    <div>
      Shortlisted{" "}
      <div className="stage-indicator ms-1 stage-shortlist gap-1">
        <span className="stage-icon">
          <FaClipboardUser />
        </span>
        {shortlistedCount}
      </div>
    </div>
  );
  let interview = (
    <div>
      Interviews{" "}
      <div className="stage-indicator ms-1 stage-interview gap-1">
        <span className="stage-icon">
          <PiChatsFill />
        </span>
        {interviewsCount}{" "}
      </div>
    </div>
  );
  let offered = (
    <div>
      Offered{" "}
      <div className="stage-indicator ms-1 stage-offer gap-1">
        <span className="stage-icon">
          <FaHandshake />
        </span>{" "}
        {offeredCount}
      </div>
    </div>
  );
  let hired = (
    <div>
      Hired{" "}
      <div className="stage-indicator ms-1 stage-hired gap-1">
        <span className="stage-icon">
          <MdWorkHistory />
        </span>{" "}
        {hiredCount}
      </div>
    </div>
  );
  const scheduleInterview = <Tooltip>Move to interview</Tooltip>;
  const approvedApply = <Tooltip>Approve</Tooltip>;
  const rejectedApply = <Tooltip>Reject</Tooltip>;

  const handleDownloadPdf = async () => {
    const element = printRef.current;

    // Adjust scale for higher quality rendering
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4"); // A4 size, can change to 'letter' for US standard

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    let heightLeft = pdfHeight;
    let position = 0;

    // Add the first page
    pdf.addImage(data, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    // Check if content requires additional pages
    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(data, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    // Set font settings
    pdf.setFont("Helvetica", "normal"); // Change to 'Helvetica' for a clean font
    pdf.setFontSize(12); // Set a readable font size

    pdf.save("statement_of_work.pdf");
  };
  const [expandedInterviewId, setExpandedInterviewId] = useState(null);

  // Toggle expand/collapse for an interview
  const handleToggleExpand = (id) => {
    setExpandedInterviewId(expandedInterviewId === id ? null : id);
  };

  const [showDetails, setShowDetails] = useState({});
  const handleToggleDetails = (interviewId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [interviewId]: !prevState[interviewId],
    }));
  };
  const closeFeedback = () => setShowDetails(false);

  const handleFeedbackClick = (interviewId) => {
    const role = localStorage.getItem("role");
    navigate(`/${role}/interview-feedback`, {
      state: { interviewId },
    });
  };

  const handleShowaddCandidate = (role) => {
    localStorage.setItem("job", role);
    navigate("/admin/register-developer");
  };

  const handleShowManualSuggestion = () => {
    showManualSuggestion(!manualSuggestion);
  };

  const handleInterviewReport = (interviewId) => {
    navigate("/client/interview-detail", {
      state: { interviewId },
    });
  };
  const [showPopup, setShowPopup] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);

  const handleApproveFeedback = (interviewId) => {
    setSelectedInterviewId(interviewId);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedInterviewId(null);
    setShowPopup(!showPopup);
  };

  const editPage = <Tooltip>Proceed</Tooltip>;
  const viewPage = <Tooltip>View</Tooltip>;
  const dateCreated = <Tooltip>09/08/2024 | 10:28:30 PM</Tooltip>;
  const waitingText = (
    <Tooltip>
      <div className="waiting-details">
        <h5>Waiting for</h5>
        <ul>
          <li>
            Sahil Kansal
            <ul>
              <li>Sent on 09/08/2024 | 10:28:30 PM</li>
            </ul>
          </li>
        </ul>
      </div>
    </Tooltip>
  );

  const [showagreement, setAgreementDetail] = useState(false);
  const handleAgreement = () => {
    setAgreementDetail(true);
  };

  const handleCloseAgreement = () => {
    setAgreementDetail(!showagreement);
  };

  const handleChangeJobStatus = (developerId, jobId, status,application) => {
    console.log(status, "stat");
    let payload = {
      developerId: developerId,
      jobId: jobId,
      newStatus: status,
      "applicationId":application ,
    };
    dispatch(
      changeJobStatus(currentTab, payload, () => {
        dispatch(singleJobPostData(id, () => {}));
      })
    );
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <section className="single-job-section">
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
                <OverlayTrigger placement="top" overlay={shareJob}>
                  <Button
                    className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none"
                    variant="transparent"
                    onClick={() =>
                      handleShare("application", singleJobDescription?.id)
                    }
                  >
                    <FaShareAlt />
                  </Button>
                </OverlayTrigger>
                {singleJobDescription?.status !== "ended" ? (
                  <>
                    <OverlayTrigger placement="top" overlay={endjob}>
                      <Button
                        variant="transparent"
                        onClick={() => {
                          // handleDelete("application", singleJobDescription?.id);
                          if (
                            singleJobDescription?.status == "Unpublished" ||
                            singleJobDescription?.status == "unpublished"
                          ) {
                            handleEndAndDeleteModal({
                              action: "openDeleteModal",
                              idToDelete: singleJobDescription?.id,
                            });
                          }
                        }}
                        className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none"
                      >
                        <MdOutlineDoNotDisturbAlt />
                      </Button>
                    </OverlayTrigger>
                    {role === "admin" && (
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
                    )}
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
                <p className="req-text mb-0">
                  {singleJobDescription?.contract_type}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <SlLocationPin />
                {/* <h3 className="req-heading mt-4">{t("location")}</h3> */}
                <p className="req-text mb-0">
                  {singleJobDescription?.job_type}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaBriefcase />
                <p className="req-text">
                  {/* {singleJobDescription?.experience?.split("_").join(" ") ||
                  "Not Mentioned"} */}
                  {location?.state?.workExperienceyears
                    ? `${location?.state?.workExperienceyears} years`
                    : "Not Mentioned"}
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
                  )}
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
        </section>
      )}
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
              <p
                className="single-job-description mb-0"
                dangerouslySetInnerHTML={{
                  __html: singleJobDescription?.description,
                }}
              ></p>
            </div>
          </Tab>
          {role === "admin" && (
            <Tab eventKey="suggestions" title={suggest}>
              <div className="text-end">
                {/* <RexettButton className="main-btn px-4 py-2 font-14 mb-3"
                                text="Make Suggestion Request"
                                isLoading={approvedLoader}
                                disabled={approvedLoader}
                                onClick={() => handleSuggestions()} /> */}

                <Button
                  variant="transparent"
                  onClick={handleShowManualSuggestion}
                  className="main-btn font-14 me-2"
                >
                  Add Manual Suggestion
                </Button>
                <Button
                  variant="transparent"
                  onClick={() => handleShowaddCandidate("Add Candidate")}
                  className="outline-main-btn font-14"
                >
                  + Add Candidate
                </Button>
              </div>
              <JobCard
                handleJobStatusModal={handleJobStatusModal}
                type="applied"
                data={
                  appliedShortList === true
                    ? appliedTabData
                    : singleJobDescription?.job_applications?.suggestions
                        ?.applied
                }
                jobStatus={singleJobDescription?.status}
                // role="admin"
              />
              <JobCard
                handleJobStatusModal={handleJobStatusModal}
                type="suggested"
                data={
                  suggestShortList
                    ? suggestTabData
                    : singleJobDescription?.job_applications?.suggestions
                        ?.suggested
                }
                jobStatus={singleJobDescription?.status}
                // role="admin"
              />
            </Tab>
          )}
          {role !== "developer" && (
            <Tab eventKey="shortlisted" title={shortlist}>
              <Tab.Container defaultActiveKey={"list-view"}>
                <div className="mb-4 d-flex justify-content-between align-items-center">
                  <h5 className="font-22 mb-0 fw-bold">
                    Shortlisted Candidate
                  </h5>
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
                      <TableView
                        handleShowScheduleMeeting={handleShowScheduleMeeting}
                        type={"interviewing"}
                        handleJobStatusModal={handleJobStatusModal}
                        scheduleInterview={scheduleInterview}
                        rejectedApply={rejectedApply}
                        listing={
                          singleJobDescription?.job_applications?.shortlisted
                        }
                      />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="grid-view">
                    <JobCard
                      handleJobStatusModal={handleJobStatusModal}
                      type="Shortlisted"
                      data={singleJobDescription?.job_applications?.shortlisted}
                      jobStatus={singleJobDescription?.status}
                      // role="client"
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
          )}
          {role !== "developer" && (
            <Tab eventKey="interviewing" title={interview}>
              {singleJobDescription ? (
                <div>
                  <h5 className="font-22 mb-4 fw-bold">Interviews</h5>
                  <Row>
                    {singleJobDescription?.job_applications?.interviews?.interview_completed?.map(
                      (item, index) => (
                        <Col lg={4} key={index}>
                          <div className="interview-wrapper position-relative mb-3 pt-4">
                            <div>
                              <p className="interview-title mb-2">
                                Interview Call for {singleJobDescription.title}
                              </p>
                              <div className="dev-name mb-2 font-14 d-flex align-items-center">
                                <div className="me-1">
                                  <img
                                    src={
                                      item.developer.profile_picture
                                        ? item.developer.profile_picture
                                        : devImg
                                    }
                                  />
                                </div>
                                <div>
                                  {item.developer.name}
                                  <span className="font-14 fw-normal d-block">
                                    {item.developer.email}
                                  </span>
                                </div>
                              </div>
                              <div className="mb-3">
                                <span className="associate-text">
                                  <span className="associate">
                                    Date: {item.interview.meeting_date}, Time:{" "}
                                    {item.interview.meeting_time} -{" "}
                                    {item.interview.meeting_end_time}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="mb-2 status-interview">
                              <span
                                className={`status-${item.interview.status.toLowerCase()}`}
                              >
                                {cardCurrentStatus(item.interview.status)}
                              </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div></div>
                              <div className="d-flex align-items-center gap-2">
                                {item.interview.status === "completed" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleFeedbackClick(item.interview.id)
                                      }
                                      className="main-btn font-14 text-decoration-none"
                                    >
                                      Share Feedback
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleApproveFeedback(item.interview.id)
                                      }
                                      className="main-btn font-14 text-decoration-none"
                                    >
                                      Select Decision
                                    </button>
                                    <Button
                                      onClick={() =>
                                        handleToggleDetails(item.interview.id)
                                      }
                                      variant="transparent"
                                      className="outline-main-btn font-14"
                                    >
                                      Show Feedback
                                    </Button>
                                    {/* <Button
                                                                    onClick={() => checkEventStatus(item.interview.id)}
                                                                    variant="transparent"
                                                                    className="outline-main-btn font-14"
                                                                >
                                                                    Check Status

                                                                </Button> */}
                                  </>
                                )}
                                {item.interview.status === "selected" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleInterviewReport(item.interview.id)
                                      }
                                      className="main-btn font-14 text-decoration-none"
                                    >
                                      Interview Report
                                    </button>
                                    <Button
                                      variant="transparent"
                                      className="outline-main-btn font-14"
                                      onClick={() =>
                                        handleChangeJobStatus(
                                          item?.developer_id,
                                          item?.job_id,
                                          "offered",
                                          item?.interview?.id
                                        )
                                      }
                                    >
                                      Move to offer
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleToggleDetails(item.interview.id)
                                      }
                                      variant="transparent"
                                      className="outline-main-btn font-14"
                                    >
                                      Show Feedback
                                      {/* {showDetails[item.interview.id] ? 'Hide Feedback' : 'Show Feedback'} */}
                                    </Button>
                                  </>
                                )}
                                {item.interview.status === "rejected" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleInterviewReport(item.interview.id)
                                      }
                                      className="main-btn font-14 text-decoration-none"
                                    >
                                      Interview Report
                                    </button>
                                    <Button
                                      onClick={() =>
                                        handleToggleDetails(item.interview.id)
                                      }
                                      variant="transparent"
                                      className="outline-main-btn font-14"
                                    >
                                      {showDetails[item.interview.id]
                                        ? "Hide Feedback"
                                        : "Show Feedback"}
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                            {showDetails[item.interview.id] && (
                              <>
                                <Modal
                                  show={showDetails}
                                  onHide={closeFeedback}
                                  centered
                                  animation
                                  className="custom-modal"
                                >
                                  <Modal.Header
                                    closeButton
                                    className="border-0 pb-3"
                                  ></Modal.Header>
                                  <Modal.Body>
                                    <h3 className="popup-heading">Feedback</h3>

                                    <div className="feedback-details mt-3">
                                      {item.interview.shareFeedbacks.length >
                                      0 ? (
                                        item.interview.shareFeedbacks.map(
                                          (feedback, fbIndex) => (
                                            <div
                                              key={fbIndex}
                                              className="feedback"
                                            >
                                              {fbIndex > 0 && <hr />}
                                              <Row>
                                                <Col md={6}>
                                                  <p className="font-14 fw-bold mb-2">
                                                    Feedback Given
                                                  </p>
                                                  <p className="font-14">
                                                    {
                                                      feedback.feedback_given_by
                                                        .name
                                                    }{" "}
                                                    (
                                                    {
                                                      feedback.feedback_given_by
                                                        .email
                                                    }
                                                    )
                                                  </p>
                                                </Col>
                                                <Col md={6}>
                                                  <p className="font-14 fw-bold mb-2">
                                                    Feedback Type
                                                  </p>
                                                  <p className="font-14 text-capitalize">
                                                    {feedback.feedback_type}
                                                  </p>
                                                </Col>
                                                <Col md={6}>
                                                  <p className="font-14 fw-bold mb-2">
                                                    Feedback Text
                                                  </p>
                                                  <p className="font-14">
                                                    {feedback.feedback_text}
                                                  </p>
                                                </Col>
                                                <Col md={6}>
                                                  <p className="font-14 fw-bold mb-2">
                                                    Interviewer Decision
                                                  </p>
                                                  <p className="text-capitalize font-14 d-inline-flex align-items-center gap-2 status-completed   ">
                                                    {
                                                      feedback.interviewer_decision
                                                    }{" "}
                                                    <FaThumbsUp />{" "}
                                                  </p>
                                                </Col>
                                                <Col md={12} className="mb-2">
                                                  <p className="font-14 mb-2 fw-bold">
                                                    Candidate Rating
                                                  </p>
                                                  <span className="d-inline-flex align-items-center gap-1 rating-text great-rating py-2 px-3">
                                                    {feedback.candidates_rating}{" "}
                                                    <FaStar />
                                                  </span>
                                                </Col>
                                                <Col md={12}>
                                                  <p>
                                                    <strong>
                                                      Skill Ratings:
                                                    </strong>
                                                  </p>
                                                  <ul className="skill-rating-graph">
                                                    {feedback.skillRatings.map(
                                                      (rating, ratingIndex) => {
                                                        let pathColor,
                                                          trailColor;

                                                        if (rating.rating < 5) {
                                                          trailColor =
                                                            "#fff5f5";
                                                          pathColor = "#ff6868";
                                                        } else if (
                                                          rating.rating < 7
                                                        ) {
                                                          trailColor =
                                                            "#fffdc3";
                                                          pathColor = "#eaeb08";
                                                        } else if (
                                                          rating.rating < 9
                                                        ) {
                                                          trailColor =
                                                            "#c6fff6";
                                                          pathColor = "#05db8a";
                                                        } else {
                                                          trailColor =
                                                            "#c6fff6";
                                                          pathColor = "#00af6c";
                                                        }

                                                        return (
                                                          <li key={ratingIndex}>
                                                            <CircularProgressbar
                                                              value={
                                                                rating.rating
                                                              }
                                                              text={`${rating.skill_name}`}
                                                              styles={buildStyles(
                                                                {
                                                                  pathColor:
                                                                    pathColor,
                                                                  textColor:
                                                                    "#121212",
                                                                  textSize:
                                                                    "14px",
                                                                  trailColor:
                                                                    trailColor,
                                                                }
                                                              )}
                                                              strokeWidth={12}
                                                              maxValue={10}
                                                            />
                                                          </li>
                                                        );
                                                      }
                                                    )}
                                                  </ul>
                                                </Col>
                                              </Row>
                                            </div>
                                          )
                                        )
                                      ) : (
                                        <NoDataFound data="No Feedback Found yet" />
                                      )}
                                    </div>
                                  </Modal.Body>
                                </Modal>
                              </>
                            )}
                          </div>
                        </Col>
                      )
                    )}
                    {needToSchedule?.map((item) => {
                      return (
                        <>
                          <Col lg={4} className="mb-3">
                            <div className="interview-wrapper position-relative pt-4 h-100 d-flex justify-content-between flex-column">
                              <div>
                                <div>
                                  <p className="interview-title mb-2">
                                    {singleJobDescription?.title}
                                  </p>
                                  <div className="dev-name mb-2 font-14 d-flex align-items-center">
                                    <div className="me-1">
                                      <img
                                        src={
                                          item?.developer?.profile_picture
                                            ? item?.developer?.profile_picture
                                            : devImg
                                        }
                                        alt="developer-img"
                                      />
                                    </div>
                                    <div>
                                      {item?.developer?.name}
                                      <span className="font-14 fw-normal d-block">
                                        {item?.developer?.email}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <span className="associate-text">
                                      <span className="associate">
                                        Experience :{" "}
                                        <b>
                                          {
                                            item?.developer?.developer_detail
                                              ?.total_experience
                                          }{" "}
                                          years
                                        </b>
                                      </span>
                                    </span>
                                    <span className="associate-text">
                                      <span className="associate">
                                        Screening Rating :{" "}
                                        <b>
                                          4.4 <FaStar />{" "}
                                        </b>
                                      </span>
                                    </span>
                                  </div>
                                  <div className="mb-3">
                                    <span className="associate-text">
                                      {/* <span className="associate">
                                                                    Date: {item.interview.meeting_date}, Time: {item.interview.meeting_time} - {item.interview.meeting_end_time}
                                                                </span> */}
                                    </span>
                                  </div>
                                </div>
                                <div className="mb-2 status-interview">
                                  <span className="status-upcoming">
                                    Need to schedule
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between align-self-end">
                                <div className="d-flex align-items-center gap-2">
                                  <button
                                    className="main-btn font-14 text-decoration-none"
                                    onClick={() =>
                                      handleShowScheduleMeeting(
                                        item?.developer?.name,
                                        item?.developer_id,
                                        item?.developer?.email
                                      )
                                    }
                                  >
                                    Schedule Interview
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </>
                      );
                    })}
                    {scheduledInterviews.length > 0 && (
                      <>
                        {scheduledInterviews.map((item) => (
                          <Col lg={4} key={item.id}>
                            <InterviewCard
                              handleShowMeetingInfo={handleShowMeetingInfo}
                              cardCurrentStatus={cardCurrentStatus}
                              item={item}
                            />
                          </Col>
                        ))}
                      </>
                    )}
                  </Row>
                </div>
              ) : (
                <NoDataFound data={"No Interviews Found"} />
              )}

              {/* {needToSchedule.length > 0 && (
                            <>
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
                            </>
                        )} */}
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
          )}
          {role !== "developer" && (
            <Tab eventKey="documentation" title={offered}>
              {currentTabsStatus === "documentation" && <JobOfferedTab />}
            </Tab>
          )}

          {role !== "developer" && (
            <Tab eventKey="hired" title={hired}>
              <JobCard
                handleJobStatusModal={handleJobStatusModal}
                type="Hired"
                data={singleJobDescription?.job_applications?.hired}
                jobStatus={singleJobDescription?.status}
              />
            </Tab>
          )}
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
      {/* for delte and end job modals */}
      {showDeleteModal && (
        <ConfirmationModal
          text="Are you sure you want to Delete this job?"
          show={showDeleteModal}
          handleClose={() =>
            handleEndAndDeleteModal({ action: "closeDeleteModal" })
          }
          smallLoader={modalLoader} //for end and delete only
          handleAction={handleDeleteJob}
        />
      )}
      {showEndModal && (
        <ConfirmationModal
          text="Are you sure you want to Delete this job?"
          show={showEndModal}
          handleClose={() =>
            handleEndAndDeleteModal({ action: "closeEndModal" })
          }
          smallLoader={modalLoader} //for end and delete only
        />
      )}
      {/* for delte and end job modals */}

      <ConfirmationModal
        text={jobPostConfirmMessage(currentTab)}
        show={
          statusModal?.shortlisted ||
          statusModal?.interviewing ||
          statusModal?.suggested ||
          statusModal?.applied ||
          statusModal?.application
        }
        onClick={handleJobStatusAction}
        handleClose={handleJobStatusModal}
        smallLoader={smallLoader}
        type={currentTabsStatus}
      />
      {showMeetingInfo?.isMeeting ? (
        <MeetingInfo
          show={showMeetingInfo?.isMeeting}
          handleClose={handleCloseMeetingInfo}
          details={showMeetingInfo?.meetingDetails}
        />
      ) : (
        ""
      )}
      <Schedulemeeting
        show={showScheduleMeeting}
        handleClose={handleCloseScheduleMeeting}
        selectedDeveloper={selectedDeveloper}
        timeZone={singleJobDescription?.time_zone}
      />
      {showPopup && (
        <FeedbackPopup
          interviewId={selectedInterviewId}
          showPopup={showPopup}
          closePopup={closePopup}
        />
      )}
      <AgreementDetails
        show={showagreement}
        handleClose={handleCloseAgreement}
      />
      <ManualSuggestions
        show={manualSuggestion}
        handleClose={handleShowManualSuggestion}
        developerList={developerList?.developers}
        jobId={id}
      />
      <ShareModal
        showShareModal={showShareModal}
        toggleShareModal={toggleShareModal}
        text={"Share Job "}
        jobID={id}
      />
    </>
  );
};
export default SingleJobDetails;
