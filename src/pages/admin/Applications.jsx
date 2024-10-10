import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Nav,
  Row,
  Tab,
  Form,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  adminApproveReject,
  allApplicationsList,
  deleteProfleAPi,
  sendMailForCompleteProfile,
} from "../../redux/slices/adminDataSlice";
import RexettButton from "../../components/atomic/RexettButton";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import RexettPagination from "../../components/atomic/RexettPagination";
import { RxChevronRight } from "react-icons/rx";
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import userImg from "../../assets/img/user-img.jpg";
import CommonApplicationTable from "../../components/common/Admin Application/CommonApplicationTable";
import { HiDownload } from "react-icons/hi";
import generatePDF from "react-to-pdf";
import moment from "moment";
import { FiExternalLink } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FiRotateCw } from "react-icons/fi";
import CryptoJS from "crypto-js";
import CommonFilterSection from "../../components/atomic/CommonFilterSection";
import { APPLICANT_FILTER_FIELDS } from "./adminConstant";
import RexettSpinner from "../../components/atomic/RexettSpinner";
import { FaEnvelope, FaEye, FaRotateRight, FaStar, FaTrashCan } from "react-icons/fa6";
import Schedulemeeting from "../../components/common/Modals/ScheduleMeeting";
import ScheduleScreening from "../../components/common/Modals/ScheduleScreening";
import MeetingInfo from "./Modals/MeetingInfo";
import { FaRegEye } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { PiUserCircle, PiUserCircleCheck, PiUserCircleCheckThin } from "react-icons/pi";
import { MdLaptopMac } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { ImUser } from "react-icons/im";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import ConfirmationModal from "../../components/common/Modals/ConfirmationModal";
import ScreeningQuestion from "./Modals/ScreeningQuestion";
const SECRET_KEY = "abcfuipqw222";

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};
const COLUMNS = {
  vendors: [
    { header: "clientName", key: "name" },
    { header: "emailAddress", key: "email" },
    { header: "phoneNumber", key: "phone_number" },
    { header: "typeOfCompany", key: "company", subKey: "type_of_company" },
    { header: "engagements", key: "company", subKey: "total_employees" },
    { header: "engagementsLast", key: "company", subkey: "website" },
    { header: "availablity", key: "company", subkey: "yearly_revenue" },
    { header: "action", type: "action" },
  ],
  developers: [
    { header: "developerName", key: "name", type: "image" },
    { header: "emailAddress", key: "email" },
    { header: "phoneNumber", key: "phone_number" },
    { header: "action", key: "", type: "action" },
  ],
  clients: [
    { header: "individual/comapanyname", key: "name", type: "image" },
    { header: "emailAddress", key: "email" },
    { header: "phoneNumber", key: "phone_number" },
    { header: "action", key: "", type: "action" },
  ],
  clientsExpanded: [
    { label: "companyName", key: "" },
    { label: "", key: "" },
  ],
};
const Applications = () => {
  const targetRef = useRef();
  const [screeninginfo, showScreeningInfo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allApplications, approvedLoader, screenLoader, smallLoader } = useSelector((state) => state.adminData);
  const [search, setSearch] = useState("");
  const [timerValue, setTimerValue] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [schedulescreeening, showScheduleScreening] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [arrowactive, setArrowActive] = useState(null);
  const [currentTab, setCurrentTab] = useState("clients");
  const [application, setApplication] = useState([]);
  const [selectedApprovedBtn, setSelectedApprovedBtn] = useState(null);
  const [selectedRejectedBtn, setSelectedRejectedBtn] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingRow, setLoadingRow] = useState(null);
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation();
  const [showScreening, setScreeningShow] = useState(false);
  const [showQuestions, setQuestionsShow ] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    // order_alphabetically: "asc",
    order_created_at: "",
    // approval_status: "",
    created_at: "",
  });

  const [profileDeleted, setProfileDeleted] = useState({
    deletedId: null,
    isDeleted: false
  })

  const handleScreeningClose = () => setScreeningShow(false);
  const handleScreeningShow = () => setScreeningShow(true);
  const [selectedTimeslot, setSelectedTimeslot] = useState("");
  const [emailNum, setEmailNum] = useState()
  const [emailIndx, setEmailIndx] = useState()

  const handleTimeslotChange = (e) => {
    setSelectedTimeslot(e.target.id);
  };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setArrowActive(index == arrowactive ? null : index);
  };

  const handleDownload = (e, resume) => {
    e.stopPropagation();
    window.open(resume, "_blank");
  };

  useEffect(() => {
    let data = {
      ...filters,
      page: page,
      active_tab: currentTab,
    };
    dispatch(allApplicationsList(data));
  }, [page, currentTab, filters]);

  useEffect(() => {
    setApplication(allApplications[currentTab]);
  }, [allApplications]);

  console.log(currentTab, "currentTab")


  const handleSelect = (key) => {
    setCurrentTab(key);
    setApplication(allApplications[key]);
    setArrowActive(null);
    setExpandedRow(null);
    setPage(1);
  };

  const convertToArray = (arr) => {
    const skillsArray = arr?.split(",");
    return skillsArray;
  };

  const handleClick = async (e, clientId, status, index) => {
    e.stopPropagation();
    let payload = {
      user_id: clientId,
      status: status,
      "active-tab": currentTab,
    };

    let data = {
      page: page,
      "active-tab": currentTab,
    };

    if (status === "approved") {
      setSelectedApprovedBtn(index);
    } else if (status === "rejected") {
      setSelectedRejectedBtn(index);
    }
    await dispatch(adminApproveReject(payload));
    setArrowActive(null);
    setSelectedApprovedBtn(null);
    setSelectedRejectedBtn(null);
    dispatch(allApplicationsList(data));
  };

  const approvedTooltip = <Tooltip id="tooltip">{t("approve")}</Tooltip>;
  const rejectedTooltip = () => (
    <Tooltip id="button-tooltip">{t("reject")}</Tooltip>
  );
  const resumeTooltip = () => (
    <Tooltip id="button-tooltip">Download Resume</Tooltip>
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    clearTimeout(timerValue);
    const timer = setTimeout(() => {
      let data = {
        page: page,
        "active-tab": currentTab,
        search: e.target.value,
      };
      dispatch(allApplicationsList(data));
    }, 500);

    setTimerValue(timer);
  };
  const rescheduleText = <Tooltip>Reschedule</Tooltip>;

  console.log(emailNum, "emailNum")
  const handleSendEmail = async (id, email, verificationReminderCount, index) => {
    console.log(verificationReminderCount, "verificationReminderCount")
    setEmailIndx(index)
    setEmailNum(verificationReminderCount)
    setLoading(true)
    if (verificationReminderCount < 3) {
      const data = {
        user_id: id,
        link: email,
        page: page,
        active_tab: currentTab,
        // ...filters
      }
      await dispatch(sendMailForCompleteProfile(data, () => {
        let data = {
          ...filters,
          page: page,
          active_tab: currentTab,
        };
        dispatch(allApplicationsList(data));
      })).finally(() =>
        setLoadingRow(null)
      );
      setLoading(false)

    }
  }

  const redirectToWebsiteForm = (
    currentUser,
    id,
    item,
    verificationReminderCount,
  ) => {
    setLoadingRow(id);
    // const encrypted = encrypt(id);
    const encrypted = id;

    const completeSteps = localStorage.setItem("setActiveStep", item?.completed_steps + 1)
    const baseUrls = {
      developer: process.env.REACT_APP_DEVELOPER,
      vendor: process.env.REACT_APP_VENDOR,
      client: process.env.REACT_APP_CLIENT,
    };

    const url = baseUrls[currentUser];
    let payload = {
      link: `${url}?user_id=${encrypted}&steps=${item?.completed_steps}`,
    };

    if (verificationReminderCount < 2) {
      const data = {
        page: page,
        active_tab: currentTab,
        ...filters
      }
      dispatch(sendMailForCompleteProfile(payload, data)).finally(() =>
        setLoadingRow(null)
      );
    } else {
      if (url) {
        window.open(`${url}?user_id=${encrypted}&steps=${item?.completed_steps}`, "_blank");
      } else {
        console.error("Invalid user type");
      }
    }
  };

  const sendEmail = (
    <Tooltip>{emailNum === 2 ? "Max Limit Reached" : "Send Email"}</Tooltip>
  )
  const alreadysendEmail = (
    <Tooltip>Already sent</Tooltip>
  )


  const handleShowScheduleScreening = (item, id) => {
    console.log(item, "oppp")
    setSelectedEmail(item);
    setSelectedId(id);
    showScheduleScreening(true);
  };

  const handleCloseScheduleScreening = () => {
    showScheduleScreening(false);
    setSelectedEmail(null);
    setSelectedId(null);
  };

  const handleShowScreeningInfo = () => {
    showScreeningInfo(!screeninginfo);
  }
  const handleCloseScreeningInfo = () => {
    showScreeningInfo(false);
  }
  const viewReport = (
    <Tooltip>View report</Tooltip>
  )
  const rescheduleBtn = (
    <Tooltip>Reschedule</Tooltip>
  )

  const handleFeedbackClick = (interviewId) => {
    navigate('/client/interview-feedback', {
      state: { interviewId },
    });
  };

  const handleInterviewReport = (interviewId) => {
    navigate('/client/interview-detail', {
      state: { interviewId },
    });
  };

  const deleteProfile = (id) => {
    setProfileDeleted({
      isDeleted: !profileDeleted.isDeleted,
      deletedId: id
    })
  }

  const handleDeleteProlfile = () => {
    let data = {
      ...filters,
      page: page,
      active_tab: currentTab,
    };


    dispatch(deleteProfleAPi(profileDeleted?.deletedId, () => {
      setProfileDeleted({
        isDeleted: false,
        deletedId: null
      })
      dispatch(allApplicationsList(data));

    }))
  }
  const handleShowQuestion = () => {
    setQuestionsShow(!showQuestions);
  }
  const handleCloseQuestion = () => {
    setQuestionsShow(false);
  }

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <>
          <div className="card-box">
            {/* <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
              <h2 className="section-head border-0 mb-0 pb-0">
                {t("applications")}
              </h2>
              <div className="d-flex gap-3">
                <Form.Control
                  type="text"
                  className="form-field font-14 shadow-none"
                  placeholder={t("enterSearchKeywords")}
                  onChange={handleSearchChange}
                />
                <Button variant="transparent" className="main-btn search-btn">
                  <IoSearch />
                </Button>
              </div>
            </div> */}
            <CommonFilterSection
              filters={filters}
              setFilters={setFilters}
              filterFields={APPLICANT_FILTER_FIELDS}
              text={t("applications")}
            />
            <Tab.Container
              id="left-tabs-example"
              // defaultActiveKey="clients"
              activeKey={currentTab}
              onSelect={handleSelect}
            >
              <Nav variant="pills" className="application-pills">
                <Nav.Item className="application-item">
                  <Nav.Link eventKey="clients" className="application-link">
                    {t("clients")}
                    <span className="new-app">
                      {allApplications?.clients?.length}
                    </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="application-item">
                  <Nav.Link eventKey="vendors" className="application-link">
                    Partners
                    <span className="new-app">
                      {allApplications?.vendors?.length}
                    </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="application-item">
                  <Nav.Link eventKey="developers" className="application-link">
                    Candidates
                    <span className="new-app">
                      {allApplications?.developers?.length}
                    </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="application-item">
                  <Nav.Link eventKey="unregistered" className="application-link">
                    Unregistered
                    <span className="new-app">
                      {allApplications?.unregistered?.length}
                    </span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="clients" className="py-4">
                  <div className="table-responsive">
                    <table className="table w-100 engagement-table table-ui-custom">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>
                            {t("email")} {t("address")}
                          </th>
                          <th>{t("phoneNumber")}</th>
                          <th>Type</th>
                          {/* <th className="text-center">Send Email</th> */}
                          <th>{t("status")}</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {screenLoader ? (
                          <ScreenLoader />
                        ) : (
                          <>
                            {currentTab == "clients" &&
                              application?.length > 0 ? (
                              application?.map((item, index) =>
                              (
                                <React.Fragment key={index}>
                                  <tr
                                    className="application-row"
                                    onClick={() => handleRowClick(index)}
                                  >
                                    <td className="white-nowrap">
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={
                                            arrowactive == index &&
                                              currentTab == "clients"
                                              ? "row-arrow active"
                                              : "row-arrow"
                                          }
                                        >
                                          <RxChevronRight />
                                        </span>
                                        <div className="user-imgbx application-userbx">
                                          <img
                                            src={
                                              item?.profile_picture
                                                ? item?.profile_picture
                                                : item?.client_type == "company"
                                                  ? item?.company_logo
                                                  : userImg
                                            }
                                            className="user-img"
                                          />
                                        </div>
                                        {item?.name}
                                      </div>
                                    </td>
                                    <td>
                                      <span className="application-mail">
                                        {item.email}
                                      </span>
                                    </td>
                                    <td>{item?.phone_number}</td>
                                    <td>{item.client_type}</td>
                                    {/* <td className="text-center">
                                      <div className="d-inline-flex gap-1 align-items-center">
                                        <OverlayTrigger placement="bottom" overlay={sendEmail}>
                                          <span className="status-email position-relative"><span className="email_count"><FaEnvelope /></span>
                                            <span className="email_shot">1</span>
                                          </span>
                                        </OverlayTrigger>
                                      </div>
                                    </td> */}
                                    <td>
                                      <span
                                        className={`white-nowrap ${item?.is_profile_completed
                                          ? "status-finished"
                                          : "status-progress"
                                          }`}
                                      >
                                        {item?.is_profile_completed
                                          ? "Completed"
                                          : "Incomplete"}
                                      </span>
                                    </td>
                                    <td>
                                      <Dropdown>
                                        <Dropdown.Toggle variant="transparent" className="action-dropdown" id="action-dropdown">
                                          <BsThreeDotsVertical />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="action-dropdown-menu">

                                          {item?.is_profile_completed ? (
                                            <div className="d-flex gap-3">
                                              <RexettButton
                                                icon={
                                                  selectedApprovedBtn === index ? (
                                                    approvedLoader
                                                  ) : (
                                                    <IoCheckmark />
                                                  )
                                                }
                                                className={`arrow-btn primary-arrow ${!item?.is_profile_completed &&
                                                  "not-allowed"
                                                  }`}
                                                variant="transparent"
                                                // disabled={!item?.is_profile_completed}
                                                onClick={(e) =>
                                                  handleClick(
                                                    e,
                                                    item?.id,
                                                    "approved",
                                                    index
                                                  )
                                                }
                                                isLoading={
                                                  selectedApprovedBtn === index
                                                    ? approvedLoader
                                                    : false
                                                }
                                              />
                                              <RexettButton
                                                icon={
                                                  selectedRejectedBtn === index ? (
                                                    approvedLoader
                                                  ) : (
                                                    <IoCloseOutline />
                                                  )
                                                }
                                                // disabled={!item?.is_profile_completed}
                                                className={`arrow-btn danger-arrow ${!item?.is_profile_completed &&
                                                  "not-allowed"
                                                  }`}
                                                variant={"transparent"}
                                                onClick={(e) =>
                                                  handleClick(
                                                    e,
                                                    item?.id,
                                                    "rejected",
                                                    index
                                                  )
                                                }
                                                isLoading={
                                                  selectedRejectedBtn === index
                                                    ? approvedLoader
                                                    : false
                                                }
                                              />
                                            </div>
                                          ) : (
                                            <div className="d-flex justify-content-center gap-3">
                                              <div
                                                onClick={() =>
                                                  !smallLoader &&
                                                  redirectToWebsiteForm(
                                                    "client",
                                                    item?.id,
                                                    item,
                                                    3

                                                  )
                                                }
                                              >
                                                <span className="project-link px-2 py-1 font-14 text-green text-decoration-none mb-1 d-inline-flex align-items-center gap-2">

                                                  Complete profile
                                                  <FiExternalLink />
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          <div className="text-center py-1">
                                            {/* <Link to={'#'} className="font-14 text-green">Edit Profile <LuPencil /> </Link> */}
                                          </div>
                                          <div className="text-center py-1">
                                            <div className="font-14 text-danger" onClick={() => deleteProfile(item?.id)}>Delete <FaTrashCan /> </div>
                                          </div>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </td>
                                  </tr>
                                  {expandedRow === index && (
                                    <tr
                                      className={`collapsible-row ${expandedRow === index ? "open" : ""
                                        }`}
                                    >
                                      <td colSpan="8">
                                        <div>
                                          <Row>
                                            {item?.client_type == "company" && (
                                              <Col md={3} className="mb-3">
                                                {item?.company_name && (
                                                  <div>
                                                    <h3 className="application-heading">
                                                      Company Name
                                                    </h3>
                                                    <p className="application-text">
                                                      {item?.company_name}
                                                    </p>
                                                  </div>
                                                )}
                                              </Col>
                                            )}
                                            {item?.client_type == "company" && (
                                              <Col md={3} className="mb-3">
                                                {item?.company_address && (
                                                  <div>
                                                    <h3 className="application-heading">
                                                      Company Address
                                                    </h3>
                                                    <p className="application-text">
                                                      {item.company_address}
                                                    </p>
                                                  </div>
                                                )}
                                              </Col>
                                            )}

                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("city")}
                                                </h3>
                                                <p className="application-text">
                                                  {item?.city}
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("country")}
                                                </h3>
                                                <p className="application-text">
                                                  {item?.country}
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("appliedOn")}
                                                </h3>
                                                <p className="application-text">
                                                  {item?.created_at?.slice(
                                                    0,
                                                    10
                                                  )}
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("email")}
                                                </h3>
                                                <p className="application-text">
                                                  {item?.email}
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Time Zone
                                                </h3>
                                                <p className="application-text">
                                                  {item?.time_zone}
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Send Email
                                                </h3>
                                                <div className="d-inline-flex gap-1 align-items-center">
                                                  <OverlayTrigger placement="bottom" overlay={sendEmail}>
                                                    <span className="status-email position-relative"
                                                      onClick={() => {
                                                        if (!loading && item?.verification_reminder_count < 3) {
                                                          handleSendEmail(item?.id, item?.email, item?.verification_reminder_count, index);
                                                        }
                                                      }}
                                                    >
                                                      <span className="email_count">{emailIndx === index && loading ? <RexettSpinner /> : <FaEnvelope />}
                                                      </span>
                                                      {item?.verification_reminder_count > 0 ? <span className="email_shot">{item?.verification_reminder_count}</span> : ""}
                                                    </span>
                                                  </OverlayTrigger>
                                                  {/* <OverlayTrigger placement="bottom" overlay={sendEmail}>
                                                    <div >
                                                      <RexettButton  onClick={() => handleSendEmail(item?.id, item?.email, item?.verification_reminder_count)} disabled={item?.verification_reminder_count == 2 ? true : false} icon={<FaEnvelope />}  isLoading={item?.verification_reminder_count == 2 ? false  : smallLoader }/>
                                                      <span className="email_shot">{item?.verification_reminder_count}</span>
                                                    </div>
                                                  </OverlayTrigger> */}
                                                </div>
                                              </div>
                                            </Col>

                                            {item?.jobs?.length > 0 && (
                                              <Col md={3} className="mb-3 ">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Unpublished Job Posted
                                                  </h3>
                                                  1
                                                </div>
                                              </Col>
                                            )}

                                            {/* <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col> */}
                                            {item?.client_type == "company" && (
                                              <Col md={3} className="mb-3">
                                                {item?.company_tax_id && (
                                                  <div>
                                                    <h3 className="application-heading">
                                                      Company Tax id
                                                    </h3>
                                                    <p className="application-text">
                                                      {item?.company_tax_id}
                                                    </p>
                                                  </div>
                                                )}
                                              </Col>
                                            )}

                                            {/* <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              Client Type
                                            </h3>
                                            <p className="application-text">
                                              ---
                                            </p>
                                          </div>
                                        </Col> */}
                                            {/* <Col md={3}>
                                          <div>
                                            <h3 className="application-heading">
                                              Contact Person Email
                                            </h3>
                                            <p className="application-text">
                                              ---
                                            </p>
                                          </div>
                                        </Col> */}
                                          </Row>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              ))
                            ) : (
                              <td colSpan={8}>
                                <NoDataFound />
                              </td>
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {allApplications?.totalClientPages > 1 ? (
                    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                      {currentTab == "clients" ? (
                        <p className="showing-result">
                          {t("showing")} {allApplications?.clients?.length}{" "}
                          {t("results")}
                        </p>
                      ) : (
                        <p className="showing-result">
                          {t("showing")} {allApplications?.vendors?.length}{" "}
                          {t("results")}
                        </p>
                      )}
                      <RexettPagination
                        number={allApplications?.totalClientPages}
                        setPage={setPage}
                        page={page}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="vendors" className="py-4">
                  <div className="table-responsive">
                    <table className="table w-100 engagement-table table-ui-custom">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>
                            {t("email")} {t("address")}
                          </th>
                          <th>{t("phoneNumber")}</th>
                          <th>{t("typeOfCompany")}</th>
                          {/* <th>{t("engagements")}</th>
                      <th>
                        {t("engagements")} {t("last")}
                      </th>
                      <th>{t("availability")}</th> */}
                          <th>{t("status")}</th>
                          <th className="text-center">Send Email</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {screenLoader ? (
                          <ScreenLoader />
                        ) : (
                          <>
                            {currentTab == "vendors" &&
                              application?.length > 0 ? (
                              application?.map((item, index) => (
                                <React.Fragment key={index}>
                                  <tr
                                    className="application-row"
                                    onClick={() => handleRowClick(index)}
                                  >
                                    <td className="white-nowrap">
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={
                                            arrowactive == index &&
                                              currentTab == "vendors"
                                              ? "row-arrow active"
                                              : "row-arrow"
                                          }
                                        >
                                          <RxChevronRight />
                                        </span>{" "}
                                        <div className="user-imgbx application-userbx">
                                          <img
                                            src={
                                              item?.company_logo
                                                ? item?.company_logo
                                                : "/demo-user.png"
                                            }
                                            className="user-img"
                                          />
                                        </div>
                                        {item?.name}
                                      </div>
                                    </td>
                                    <td>
                                      <span className="application-mail">
                                        {item?.email}
                                      </span>
                                    </td>
                                    <td>{item?.phone_number}</td>
                                    <td>{item?.company?.type_of_company}</td>
                                    {/* <td>{item?.company?.total_employees}</td>
                                <td>{item?.company?.website}</td>
                                <td>{item?.company?.yearly_revenue}</td> */}
                                    <td>
                                      <span
                                        className={`white-nowrap ${item?.is_profile_completed
                                          ? "status-finished"
                                          : "status-progress"
                                          }`}
                                      >
                                        {item?.is_profile_completed
                                          ? "Completed"
                                          : "Incomplete"}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-center gap-3">
                                        <div className="d-inline-flex gap-1 align-items-center">
                                          <OverlayTrigger placement="bottom" overlay={sendEmail}>
                                            <span className="status-email position-relative"
                                              onClick={() => {
                                                if (!loading && item?.verification_reminder_count < 3) {
                                                  handleSendEmail(item?.id, item?.email, item?.verification_reminder_count, index);
                                                }
                                              }}
                                            >
                                              <span className="email_count">{emailIndx === index && loading ? <RexettSpinner /> : <FaEnvelope />}</span>
                                              {item?.verification_reminder_count > 0 ? <span className="email_shot">{item?.verification_reminder_count}</span> : ""}
                                            </span>
                                          </OverlayTrigger>
                                        </div>
                                        {/* {item?.verification_reminder_count < 2 ? <div className="d-flex gap-3">
                                          <div
                                            onClick={() =>
                                              !smallLoader &&
                                              redirectToWebsiteForm(
                                                "vendor",
                                                item?.id,
                                                item?.verification_reminder_count
                                              )
                                            }
                                          >
                                            <span className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2">
                                              {item.id === loadingRow
                                                ? smallLoader && (
                                                  <RexettSpinner />
                                                )
                                                : "Send Email"
                                              }
                                              <FiExternalLink />
                                            </span>


                                          </div>
                                        </div> : "Maximum Limit reached"} */}
                                      </div>
                                    </td>

                                    {/* <td>
                                      {item?.is_profile_completed ? (
                                        <div className="d-flex gap-3">
                                          <RexettButton
                                            icon={
                                              selectedApprovedBtn === index ? (
                                                approvedLoader
                                              ) : (
                                                <IoCheckmark />
                                              )
                                            }
                                            className={`arrow-btn primary-arrow ${!item?.is_profile_completed &&
                                              "not-allowed"
                                              }`}
                                            variant="transparent"
                                            // disabled={!item?.is_profile_completed}
                                            onClick={(e) =>
                                              handleClick(
                                                e,
                                                item?.id,
                                                "approved",
                                                index
                                              )
                                            }
                                            isLoading={
                                              selectedApprovedBtn === index
                                                ? approvedLoader
                                                : false
                                            }
                                          />
                                          <RexettButton
                                            icon={
                                              selectedRejectedBtn === index ? (
                                                approvedLoader
                                              ) : (
                                                <IoCloseOutline />
                                              )
                                            }
                                            // disabled={!item?.is_profile_completed}
                                            className={`arrow-btn danger-arrow ${!item?.is_profile_completed &&
                                              "not-allowed"
                                              }`}
                                            variant={"transparent"}
                                            onClick={(e) =>
                                              handleClick(
                                                e,
                                                item?.id,
                                                "rejected",
                                                index
                                              )
                                            }
                                            isLoading={
                                              selectedRejectedBtn === index
                                                ? approvedLoader
                                                : false
                                            }
                                          />
                                        </div>
                                      ) : (
                                        <div className="d-flex gap-3">
                                          <div
                                            onClick={() =>
                                              !smallLoader &&
                                              redirectToWebsiteForm(
                                                "vendor",
                                                item?.id,
                                                item,
                                                3
                                              )
                                            }
                                          >
                                            <span className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2">
                                              Complete profile
                                              <FiExternalLink />
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </td> */}
                                    <td>
                                      <Dropdown>
                                        <Dropdown.Toggle variant="transparent" className="action-dropdown" id="action-dropdown">
                                          <BsThreeDotsVertical />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="action-dropdown-menu">

                                          {item?.is_profile_completed ? (
                                            <div className="d-flex gap-3">
                                              <RexettButton
                                                icon={
                                                  selectedApprovedBtn === index ? (
                                                    approvedLoader
                                                  ) : (
                                                    <IoCheckmark />
                                                  )
                                                }
                                                className={`arrow-btn primary-arrow ${!item?.is_profile_completed &&
                                                  "not-allowed"
                                                  }`}
                                                variant="transparent"
                                                // disabled={!item?.is_profile_completed}
                                                onClick={(e) =>
                                                  handleClick(
                                                    e,
                                                    item?.id,
                                                    "approved",
                                                    index
                                                  )
                                                }
                                                isLoading={
                                                  selectedApprovedBtn === index
                                                    ? approvedLoader
                                                    : false
                                                }
                                              />
                                              <RexettButton
                                                icon={
                                                  selectedRejectedBtn === index ? (
                                                    approvedLoader
                                                  ) : (
                                                    <IoCloseOutline />
                                                  )
                                                }
                                                // disabled={!item?.is_profile_completed}
                                                className={`arrow-btn danger-arrow ${!item?.is_profile_completed &&
                                                  "not-allowed"
                                                  }`}
                                                variant={"transparent"}
                                                onClick={(e) =>
                                                  handleClick(
                                                    e,
                                                    item?.id,
                                                    "rejected",
                                                    index
                                                  )
                                                }
                                                isLoading={
                                                  selectedRejectedBtn === index
                                                    ? approvedLoader
                                                    : false
                                                }
                                              />
                                            </div>
                                          ) : (
                                            <div className="d-flex justify-content-center gap-3">
                                              <div
                                                onClick={() =>
                                                  !smallLoader &&
                                                  redirectToWebsiteForm(
                                                    "vendor",
                                                    item?.id,
                                                    item,
                                                    3

                                                  )
                                                }
                                              >
                                                <span className="project-link px-2 py-1 font-14 text-green text-decoration-none mb-1 d-inline-flex align-items-center gap-2">

                                                  Complete profile
                                                  <FiExternalLink />
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          <div className="text-center py-1">
                                            {/* <Link to={'#'} className="font-14 text-green">Edit Profile <LuPencil /> </Link> */}
                                          </div>
                                          <div className="text-center py-1">
                                            <div className="font-14 text-danger" onClick={() => deleteProfile(item?.id)}>Delete <FaTrashCan /> </div>
                                          </div>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </td>
                                  </tr>
                                  {expandedRow === index && (
                                    <tr
                                      className={`collapsible-row ${expandedRow === index ? "open" : ""
                                        }`}
                                    >
                                      <td colSpan="8">
                                        <div>
                                          <Row>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("companyName")}
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company?.name}
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("email")}
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company?.email}
                                                </p>
                                              </div>
                                            </Col>
                                            {item?.company?.total_employees && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("totalEmployees")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {
                                                      item?.company
                                                        ?.total_employees
                                                    }
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.company?.location && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("location")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.company?.location}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.address && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("address")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.address}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("country")}
                                                </h3>
                                                <p className="application-text">
                                                  {item?.country}
                                                </p>
                                              </div>
                                            </Col>
                                            {item?.state && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("state")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.state}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("city")}
                                                </h3>
                                                <p className="application-text">
                                                  {item?.city}
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("phoneNumber")}
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company?.phone_number}
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  {t("typeOfCompany")}
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.type_of_company
                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Total Recruiter
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.total_it_recruiter
                                                  }
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Website
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company?.website}
                                                </p>
                                              </div>
                                            </Col>

                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Service offering
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.service_offering
                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Company email
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company?.email}
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Company yearly revenue
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.yearly_revenue
                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Company GST number
                                                </h3>
                                                <p className="application-text">
                                                  {item?.company?.gst_number}
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Turn around time to close
                                                  contract position
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.trun_around_time_to_close_contract_position
                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Turn around time to close
                                                  permanent position
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.trun_around_time_to_close_permanent_position
                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Contact phone details
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.proprietor_contact_number
                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Contact person email
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.proprietor_contact_person_email
                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Contact person name
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.proprietor_contact_person_name
                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  CEO email
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.company
                                                      ?.proprietor_email
                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            <Col md={3} className="mb-3">
                                              <div>
                                                <h3 className="application-heading">
                                                  Tax ID
                                                </h3>
                                                <p className="application-text">
                                                  {
                                                    item?.tax_id

                                                  }
                                                </p>
                                              </div>
                                            </Col>
                                            {/* <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col> */}
                                          </Row>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              ))
                            ) : (
                              <td colSpan={8}>
                                <NoDataFound />
                              </td>
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {allApplications?.totalVendorPages > 1 ? (
                    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                      {currentTab == "clients" ? (
                        <p className="showing-result">
                          {t("showing")} {allApplications?.clients?.length}{" "}
                          {t("results")}
                        </p>
                      ) : (
                        <p className="showing-result">
                          {t("showing")} {allApplications?.vendors?.length}{" "}
                          {t("results")}
                        </p>
                      )}
                      <RexettPagination
                        number={allApplications?.totalVendorPages}
                        setPage={setPage}
                        page={page}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="developers" className="py-4">
                  <div className="table-responsive">
                    <table className="table w-100 engagement-table table-ui-custom">
                      <thead>
                        <tr>
                          <th>Job Id</th>
                          <th>Name</th>
                          <th>
                            {t("email")} {t("address")}
                          </th>
                          <th>{t("phoneNumber")}</th>

                          <th>Coming from</th>
                          <th>Status</th>
                          <th>Screening</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {screenLoader ? (
                          <ScreenLoader />
                        ) : (
                          <>
                            {currentTab == "developers" &&
                              application?.length > 0 ? (
                              application?.map((item, index) => (
                                <React.Fragment key={index}>
                                  <tr
                                    className="application-row"
                                    onClick={() => handleRowClick(index)}
                                  >
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={
                                            arrowactive == index &&
                                              currentTab == "developers"
                                              ? "row-arrow active"
                                              : "row-arrow"
                                          }
                                        >
                                          <RxChevronRight />
                                        </span>
                                        RXT-1234
                                      </div>
                                    </td>
                                    <td className="white-nowrap">
                                      <div className="d-flex align-items-center">
                                        <div className="user-imgbx application-userbx">
                                          <img
                                            src={
                                              item?.profile_picture
                                                ? item?.profile_picture
                                                : "/demo-user.png"
                                            }
                                            className="user-img"
                                          />
                                        </div>
                                        {item?.name}
                                      </div>
                                    </td>
                                    <td>
                                      <span className="application-mail">
                                        {item?.email}
                                      </span>
                                    </td>
                                    <td>{item?.phone_number}</td>
                                    <td>Registration</td>
                                    {/* <td>
                                      <Button
                                        variant="transparent"
                                        onClick={handleScreeningShow}
                                        className="main-btn font-14"
                                      >
                                        Schedule Screening
                                      </Button>
                                      <div className="d-flex align-items-center gap-2">
                                        <span className="associate-text">
                                          <span className="associate">
                                            18-06-2024 , 09:00am - 10:00am
                                          </span>
                                        </span>
                                        <div>
                                          <OverlayTrigger
                                            placement="bottom"
                                            overlay={rescheduleText}
                                          >
                                            <Button
                                              variant="transparent"
                                              onClick={handleScreeningShow}
                                              className="reschedule-btn"
                                            >
                                              <FiRotateCw />
                                            </Button>
                                          </OverlayTrigger>
                                        </div>
                                      </div>
                                      <div>
                                        <span className="status-finished">
                                          Screening Done
                                        </span>
                                      </div>
                                    </td> */}
                                    <td>
                                      {/* <span
                                        className={`white-nowrap ${item?.is_profile_completed
                                          ? "status-finished"
                                          : "status-progress"
                                          }`}
                                      >
                                        {item?.is_profile_completed
                                          ? "Completed"
                                          : "Incomplete"}
                                      </span> */}
                                      <div className="d-flex gap-2 align-items-center">
                                        {item?.completed_steps < 7 ? <span className="d-inline-flex align-items-center status-ind">
                                          <PiUserCircle />
                                        </span> : <span className="d-inline-flex align-items-center status-ind" >
                                          <PiUserCircleCheck />
                                        </span>}
                                        {item?.completed_steps < 7 ? <span className="d-inline-flex align-items-center status-ind">
                                          <MdLaptopMac />
                                        </span> : <span className="d-inline-flex align-items-center status-ind">
                                          <CiCircleCheck />
                                        </span>}
                                      </div>
                                    </td>
                                    {/* <td>
                                      <div className="d-flex align-items-center gap-2 justify-content-center">
                                        <div className="d-inline-flex gap-1 align-items-center">
                                          <OverlayTrigger placement="bottom" overlay={sendEmail}>
                                            <span className="status-email position-relative"><span className="email_count"><FaEnvelope /></span>
                                              <span className="email_shot">1</span>
                                            </span>
                                          </OverlayTrigger>
                                        </div>
                                      </div>
                                    </td> */}
                                    <td className="text-center">
                                      {/* Show Schedule Screening button if no interviews */}
                                      {item?.interviews?.length <= 0 ? (
                                        <Button
                                          variant="transparent"
                                          onClick={() => handleShowScheduleScreening(item, item?.id)}
                                          className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none white-nowrap"
                                        >
                                          Schedule Screening
                                        </Button>
                                      ) : (
                                        (() => {
                                          // Sort interviews by created_at in descending order to get the latest interview first
                                          const sortedInterviews = [...item.interviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                                          const latestInterview = sortedInterviews[0];

                                          // Calculate average rating if there is feedback
                                          const feedbacks = latestInterview.shareFeedbacks || [];
                                          const skillRatingsMap = {};
                                          // Collect ratings by skill name
                                          feedbacks.forEach(feedback => {
                                            const skillRatings = feedback.skillRatings || [];
                                            skillRatings.forEach(rating => {
                                              if (!skillRatingsMap[rating.skill_name]) {
                                                skillRatingsMap[rating.skill_name] = [];
                                              }
                                              skillRatingsMap[rating.skill_name].push(rating.rating);
                                            });
                                          });

                                          // Calculate average rating per skill
                                          const skillAverages = Object.keys(skillRatingsMap).map(skillName => {
                                            const ratings = skillRatingsMap[skillName];
                                            const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
                                            return avgRating;
                                          });

                                          // Calculate overall average rating
                                          const overallAverageRating = skillAverages.length > 0 ? (skillAverages.reduce((a, b) => a + b, 0) / skillAverages.length).toFixed(1) : 'N/A';

                                          return (
                                            <>
                                              {/* Show Invite accepted status if the latest interview is accepted */}
                                              {latestInterview?.status === "scheduled" && (
                                                <div>
                                                  <span className="status-finished">Accepted</span>
                                                </div>
                                              )}

                                              {/* Show Invite declined status if the latest interview is pending and not accepted */}
                                              {latestInterview?.status === "declined" && (
                                                <div className="d-inline-flex align-items-center gap-2">
                                                  <span className="status-rejected">Rejected</span>
                                                  <OverlayTrigger placement="bottom" overlay={rescheduleBtn}>
                                                    <Button
                                                      onClick={() => handleShowScheduleScreening(item, item?.id)}
                                                      variant="transparent"
                                                      className="reschedule-btn"
                                                    >
                                                      <FaRotateRight />
                                                    </Button>
                                                  </OverlayTrigger>
                                                </div>
                                              )}

                                              {/* Show Invite sent status if the latest interview is pending and is_accepted is null */}
                                              {latestInterview?.status === "pending" && (
                                                <div>
                                                  <span className="status-upcoming">Invite sent</span>
                                                </div>
                                              )}

                                              {/* Show Share Feedback button if the latest interview is completed, accepted, and no feedbacks */}
                                              {latestInterview?.status === "completed" && feedbacks.length <= 0 && (
                                                <button
                                                  onClick={() => handleFeedbackClick(latestInterview?.id)}
                                                  className="main-btn font-14 text-decoration-none"
                                                >
                                                </button>
                                              )}

                                              {/* Show rating and view report link if there is feedback */}
                                              {latestInterview?.status === "completed" && feedbacks.length > 0 && (
                                                <div className="d-inline-flex align-items-center gap-2">
                                                  <span className="status-upcoming lh-1">
                                                    <span className="d-inline-flex align-items-center gap-1">
                                                      <FaStar />
                                                      {overallAverageRating}
                                                    </span>
                                                  </span>
                                                  <OverlayTrigger placement="bottom" overlay={viewReport}>
                                                    <button
                                                      onClick={() => handleInterviewReport(latestInterview.id)}
                                                      className="main-btn font-14 text-decoration-none"
                                                    >
                                                      <HiDocumentReport />
                                                    </button>
                                                  </OverlayTrigger>
                                                </div>
                                              )}
                                            </>
                                          );
                                        })()
                                      )}
                                    </td>
                                    {/* <td>
                                      {item?.is_profile_completed ? (
                                        <div className="d-flex gap-3">
                                          <RexettButton
                                            icon={
                                              selectedApprovedBtn === index ? (
                                                approvedLoader
                                              ) : (
                                                <IoCheckmark />
                                              )
                                            }
                                            className={`arrow-btn primary-arrow ${!item?.is_profile_completed &&
                                              "not-allowed"
                                              }`}
                                            variant="transparent"
                                            // disabled={!item?.is_profile_completed}
                                            onClick={(e) =>
                                              handleClick(
                                                e,
                                                item?.id,
                                                "approved",
                                                index
                                              )
                                            }
                                            isLoading={
                                              selectedApprovedBtn === index
                                                ? approvedLoader
                                                : false
                                            }
                                          />
                                          <RexettButton
                                            icon={
                                              selectedRejectedBtn === index ? (
                                                approvedLoader
                                              ) : (
                                                <IoCloseOutline />
                                              )
                                            }
                                            // disabled={!item?.is_profile_completed}
                                            className={`arrow-btn danger-arrow ${!item?.is_profile_completed &&
                                              "not-allowed"
                                              }`}
                                            variant={"transparent"}
                                            onClick={(e) =>
                                              handleClick(
                                                e,
                                                item?.id,
                                                "rejected",
                                                index
                                              )
                                            }
                                            isLoading={
                                              selectedRejectedBtn === index
                                                ? approvedLoader
                                                : false
                                            }
                                          />
                                        </div>
                                      ) : (
                                        <div className="d-flex gap-3">
                                          <div
                                            onClick={() =>
                                              !smallLoader &&
                                              redirectToWebsiteForm(
                                                "developer",
                                                item?.id,
                                                item,
                                                3
                                              )
                                            }
                                          >
                                            <span className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none d-inline-flex align-items-center gap-2 white-nowrap">

                                              Complete profile
                                              <FiExternalLink />
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </td> */}
                                    <td>
                                      <Dropdown>
                                        <Dropdown.Toggle variant="transparent" className="action-dropdown" id="action-dropdown">
                                          <BsThreeDotsVertical />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="action-dropdown-menu">

                                          {item?.is_profile_completed ? (
                                            <div className="d-flex justify-content-center gap-3">
                                              <RexettButton
                                                icon={
                                                  selectedApprovedBtn === index ? (
                                                    approvedLoader
                                                  ) : (
                                                    <IoCheckmark />
                                                  )
                                                }
                                                className={`arrow-btn primary-arrow ${!item?.is_profile_completed &&
                                                  "not-allowed"
                                                  }`}
                                                variant="transparent"
                                                // disabled={!item?.is_profile_completed}
                                                onClick={(e) =>
                                                  handleClick(
                                                    e,
                                                    item?.id,
                                                    "approved",
                                                    index
                                                  )
                                                }
                                                isLoading={
                                                  selectedApprovedBtn === index
                                                    ? approvedLoader
                                                    : false
                                                }
                                              />
                                              <RexettButton
                                                icon={
                                                  selectedRejectedBtn === index ? (
                                                    approvedLoader
                                                  ) : (
                                                    <IoCloseOutline />
                                                  )
                                                }
                                                // disabled={!item?.is_profile_completed}
                                                className={`arrow-btn danger-arrow ${!item?.is_profile_completed &&
                                                  "not-allowed"
                                                  }`}
                                                variant={"transparent"}
                                                onClick={(e) =>
                                                  handleClick(
                                                    e,
                                                    item?.id,
                                                    "rejected",
                                                    index
                                                  )
                                                }
                                                isLoading={
                                                  selectedRejectedBtn === index
                                                    ? approvedLoader
                                                    : false
                                                }
                                              />
                                            </div>
                                          ) : (
                                            <div className="d-flex justify-content-center gap-3">
                                              <div
                                                onClick={() =>
                                                  !smallLoader &&
                                                  redirectToWebsiteForm(
                                                    "developer",
                                                    item?.id,
                                                    item,
                                                    3

                                                  )
                                                }
                                              >
                                                <span className="project-link px-2 py-1 font-14 text-green text-decoration-none mb-1 d-inline-flex align-items-center gap-2">

                                                  Complete profile
                                                  <FiExternalLink />
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          <div className="text-center py-1">
                                            {/* <Link to={'#'} className="font-14 text-green">Edit Profile <LuPencil /> </Link> */}
                                          </div>
                                          <div className="text-center py-1">
                                            <div className="font-14 text-danger" onClick={() => deleteProfile(item?.id)}>Delete <FaTrashCan /> </div>

                                          </div>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </td>


                                  </tr>
                                  {expandedRow === index && (
                                    <tr
                                      className={`collapsible-row ${expandedRow === index ? "open" : ""
                                        }`}
                                    >
                                      <td colSpan="10">
                                        <div>
                                          <Row>
                                            {item?.name && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("developerName")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.name
                                                      ? item?.name
                                                      : "Not Mentioned"}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.address && (
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">
                                                    Address
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.address}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.country && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("country")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.country}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.state && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("state")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.state}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.city && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("city")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.city}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {/* <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col> */}

                                            {item?.email && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("email")}
                                                  </h3>
                                                  <p className="application-text">{item?.email}</p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.work_preference && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Work Preference
                                                  </h3>
                                                  <p className="application-text">{item?.work_preference}</p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.ready_to_relocate && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Ready to relocate
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.ready_to_relocate}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.time_zone && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Time Zone
                                                  </h3>
                                                  <p className="application-text">{item?.time_zone}</p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.language_preference && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Language
                                                  </h3>
                                                  <p className="application-text">
                                                    {
                                                      item?.language_preference
                                                    }
                                                  </p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.developer_detail
                                              ?.github_url && (
                                                <Col md={3} className="mb-3">
                                                  <div>
                                                    <h3 className="application-heading">
                                                      Github Url
                                                    </h3>
                                                    <p className="application-text">
                                                      {
                                                        item?.developer_detail
                                                          ?.github_url
                                                      }
                                                    </p>
                                                  </div>
                                                </Col>
                                              )}

                                            {item?.other_skills?.length > 0 && (
                                              <Col md={3} className="mb-3 ">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Skills
                                                  </h3>
                                                  <ul className="need-skill-list  mb-0">
                                                    {item?.other_skills?.map(
                                                      (item, index) => {
                                                        return (
                                                          <>
                                                            <li key={index}>
                                                              {item?.skill}
                                                            </li>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </ul>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.developer_detail
                                              ?.professional_title && (
                                                <Col md={3}>
                                                  <div>
                                                    <h3 className="application-heading">
                                                      Designation
                                                    </h3>
                                                    <p className="application-text">
                                                      {
                                                        item?.developer_detail
                                                          ?.professional_title
                                                      }
                                                    </p>
                                                  </div>
                                                </Col>
                                              )}

                                            {item?.developer_detail
                                              ?.how_did_you_hear_about_rexett && (
                                                <Col md={3}>
                                                  <div>
                                                    <h3 className="application-heading">
                                                      How Did you hear about
                                                      rexett?
                                                    </h3>
                                                    <p className="application-text">
                                                      {
                                                        item?.developer_detail
                                                          ?.how_did_you_hear_about_rexett
                                                      }
                                                    </p>
                                                  </div>
                                                </Col>
                                              )}
                                            {item?.created_at && (
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">
                                                    Created At
                                                  </h3>
                                                  <p className="application-text">
                                                    {moment(
                                                      item?.created_at
                                                    ).format("MMMM Do YYYY")}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.developer_detail
                                              ?.total_experience && (
                                                <Col md={3}>
                                                  <div>
                                                    <h3 className="application-heading">
                                                      Experience
                                                    </h3>
                                                    <p className="application-text">
                                                      {
                                                        item?.developer_detail
                                                          ?.total_experience
                                                      }
                                                    </p>
                                                  </div>
                                                </Col>
                                              )}
                                            {(
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">
                                                    Expertise Skills
                                                  </h3>
                                                  <p className="application-text">
                                                    {
                                                      item?.expertises[0]
                                                        ?.skill
                                                    }
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.developer_detail && (
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">Screening Round</h3>
                                                  {item.interviews && item.interviews.length > 0 ? (() => {
                                                    // Sort interviews by created_at in descending order to get the latest interview first
                                                    const sortedInterviews = [...item.interviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                                                    const latestInterview = sortedInterviews[0];

                                                    // Calculate average rating if there is feedback
                                                    const feedbacks = latestInterview.shareFeedbacks || [];
                                                    const skillRatingsMap = {};

                                                    // Collect ratings by skill name
                                                    feedbacks.forEach(feedback => {
                                                      const skillRatings = feedback.skillRatings || [];
                                                      skillRatings.forEach(rating => {
                                                        if (!skillRatingsMap[rating.skill_name]) {
                                                          skillRatingsMap[rating.skill_name] = [];
                                                        }
                                                        skillRatingsMap[rating.skill_name].push(rating.rating);
                                                      });
                                                    });

                                                    // Calculate average rating per skill
                                                    const skillAverages = Object.keys(skillRatingsMap).map(skillName => {
                                                      const ratings = skillRatingsMap[skillName];
                                                      const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
                                                      return avgRating;
                                                    });

                                                    // Calculate overall average rating
                                                    const overallAverageRating = skillAverages.length > 0 ? (skillAverages.reduce((a, b) => a + b, 0) / skillAverages.length).toFixed(1) : 'N/A';

                                                    return (
                                                      <div className="d-inline-flex align-items-center gap-2">
                                                        <span className="status-upcoming lh-1">
                                                          <span className="d-inline-flex align-items-center gap-1">
                                                            <FaStar />
                                                            {overallAverageRating}
                                                          </span>
                                                        </span>
                                                        {/* Show the "View Report" button only if there is feedback */}
                                                        {feedbacks.length > 0 && (
                                                          <button
                                                            onClick={() => handleInterviewReport(latestInterview.id)}
                                                            className="main-btn font-14 text-decoration-none"
                                                          >
                                                            View Report
                                                          </button>
                                                        )}
                                                      </div>
                                                    );
                                                  })() : (
                                                    <div>No Interviews Found</div>
                                                  )}
                                                </div>
                                              </Col>
                                            )}
                                            {item?.developer_detail && (
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">
                                                    Certifications
                                                  </h3>
                                                  <Link to={'#'} className="text-green text-decoration-none">AI certificate <FaEye /> </Link>
                                                </div>
                                              </Col>
                                            )}
                                            <Col>
                                              <div>
                                                <h3 className="application-heading">
                                                  Resume
                                                </h3>
                                                <RexettButton
                                                  onClick={(e) =>
                                                    handleDownload(
                                                      e,
                                                      item?.developer_detail?.resume
                                                    )
                                                  }
                                                  disabled={
                                                    !item?.developer_detail?.resume
                                                  }
                                                  icon={
                                                    selectedRejectedBtn === index ? (
                                                      approvedLoader
                                                    ) : (
                                                      <div ref={targetRef}>
                                                        <HiDownload />
                                                      </div>
                                                    )
                                                  }
                                                  className={`arrow-btn primary-arrow ${!item?.developer_detail?.resume &&
                                                    "not-allowed"
                                                    }`}
                                                />
                                              </div>
                                            </Col>
                                            {item?.is_profile_completed == false && <Col md={3}>
                                              <div>
                                                <h3 className="application-heading">
                                                  Send Email
                                                </h3>
                                                <div className="d-inline-flex gap-1 align-items-center">
                                                  <OverlayTrigger placement="bottom" overlay={sendEmail}>
                                                    <span className="status-email position-relative"
                                                      onClick={() => {
                                                        if (!loading && item?.verification_reminder_count < 3) {
                                                          handleSendEmail(item?.id, item?.email, item?.verification_reminder_count, index);
                                                        }
                                                      }}
                                                    >
                                                      <span className="email_count"> {emailIndx === index && loading ? <RexettSpinner /> : <FaEnvelope />}</span>
                                                      {item?.verification_reminder_count > 0 ? <span className="email_shot">{item?.verification_reminder_count}</span> : ""}
                                                    </span>
                                                  </OverlayTrigger>
                                                </div>
                                              </div>
                                            </Col>}
                                          </Row>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              ))
                            ) : (
                              <td colSpan={8}>
                                <NoDataFound />
                              </td>
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {allApplications?.totalDeveloperPages > 1 ? (
                    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                      {currentTab == "developers" ? (
                        <p className="showing-result">
                          {t("showing")} {allApplications?.developers?.length}{" "}
                          {t("results")}
                        </p>
                      ) : (
                        ""
                      )}
                      <RexettPagination
                        number={allApplications?.totalDeveloperPages}
                        setPage={setPage}
                        page={page}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="unregistered" className="py-4">
                  <div className="table-responsive">
                    <table className="table w-100 engagement-table table-ui-custom">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>
                            {t("email")} {t("address")}
                          </th>
                          <th>{t("phoneNumber")}</th>
                          <th>{t("typeOfCompany")}</th>
                          {/* <th>{t("engagements")}</th>
                      <th>
                        {t("engagements")} {t("last")}
                      </th>
                      <th>{t("availability")}</th> */}
                          <th>{t("status")}</th>
                          <th className="text-center">Send Email</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {screenLoader ? (
                          <ScreenLoader />
                        ) : (
                          <>
                            {currentTab == "unregistered" &&
                              application?.length > 0 ? (
                              application?.map((item, index) => (
                                <React.Fragment key={index}>
                                  <tr
                                    className="application-row"
                                    onClick={() => handleRowClick(index)}
                                  >
                                    <td className="white-nowrap">
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={
                                            arrowactive == index &&
                                              currentTab == "unregistered"
                                              ? "row-arrow active"
                                              : "row-arrow"
                                          }
                                        >
                                          <RxChevronRight />
                                        </span>
                                        <div className="user-imgbx application-userbx">
                                          <img
                                            src={
                                              item?.company_logo
                                                ? item?.company_logo
                                                : "/demo-user.png"
                                            }
                                            className="user-img"
                                          />
                                        </div>
                                        {item?.name}
                                      </div>
                                    </td>
                                    <td>
                                      <span className="application-mail">
                                        {item?.email}
                                      </span>
                                    </td>
                                    <td>{item?.phone_number}</td>
                                    <td>{item?.company_type}</td>
                                    {/* <td>{item?.company?.total_employees}</td>
                                <td>{item?.company?.website}</td>
                                <td>{item?.company?.yearly_revenue}</td> */}
                                    <td>
                                      <span
                                        className={`white-nowrap ${item?.is_profile_completed
                                          ? "status-finished"
                                          : "status-progress"
                                          }`}
                                      >
                                        {item?.is_profile_completed
                                          ? "Completed"
                                          : "Incomplete"}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-center gap-3">
                                        <div className="d-inline-flex gap-1 align-items-center">
                                          <OverlayTrigger placement="bottom" overlay={sendEmail}>
                                            <span className="status-email position-relative"
                                              onClick={() => {
                                                if (!loading && item?.verification_reminder_count < 3) {
                                                  handleSendEmail(item?.id, item?.email, item?.verification_reminder_count, index);
                                                }
                                              }}
                                            >
                                              <span className="email_count">{emailIndx === index && loading ? <RexettSpinner /> : <FaEnvelope />}</span>
                                              {item?.verification_reminder_count > 0 ? <span className="email_shot">{item?.verification_reminder_count}</span> : ""}
                                            </span>
                                          </OverlayTrigger>
                                        </div>
                                        {/* {item?.verification_reminder_count < 2 ? <div className="d-flex gap-3">
                                          <div
                                            onClick={() =>
                                              !smallLoader &&
                                              redirectToWebsiteForm(
                                                "vendor",
                                                item?.id,
                                                item?.verification_reminder_count
                                              )
                                            }
                                          >
                                            <span className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2">
                                              {item.id === loadingRow
                                                ? smallLoader && (
                                                  <RexettSpinner />
                                                )
                                                : "Send Email"
                                              }
                                              <FiExternalLink />
                                            </span>


                                          </div>
                                        </div> : "Maximum Limit reached"} */}
                                      </div>
                                    </td>

                                    {/* <td>
                                      {item?.is_profile_completed ? (
                                        <div className="d-flex gap-3">
                                          <RexettButton
                                            icon={
                                              selectedApprovedBtn === index ? (
                                                approvedLoader
                                              ) : (
                                                <IoCheckmark />
                                              )
                                            }
                                            className={`arrow-btn primary-arrow ${!item?.is_profile_completed &&
                                              "not-allowed"
                                              }`}
                                            variant="transparent"
                                            // disabled={!item?.is_profile_completed}
                                            onClick={(e) =>
                                              handleClick(
                                                e,
                                                item?.id,
                                                "approved",
                                                index
                                              )
                                            }
                                            isLoading={
                                              selectedApprovedBtn === index
                                                ? approvedLoader
                                                : false
                                            }
                                          />
                                          <RexettButton
                                            icon={
                                              selectedRejectedBtn === index ? (
                                                approvedLoader
                                              ) : (
                                                <IoCloseOutline />
                                              )
                                            }
                                            // disabled={!item?.is_profile_completed}
                                            className={`arrow-btn danger-arrow ${!item?.is_profile_completed &&
                                              "not-allowed"
                                              }`}
                                            variant={"transparent"}
                                            onClick={(e) =>
                                              handleClick(
                                                e,
                                                item?.id,
                                                "rejected",
                                                index
                                              )
                                            }
                                            isLoading={
                                              selectedRejectedBtn === index
                                                ? approvedLoader
                                                : false
                                            }
                                          />
                                        </div>
                                      ) : (
                                        <div className="d-flex gap-3">
                                          <div
                                            onClick={() =>
                                              !smallLoader &&
                                              redirectToWebsiteForm(
                                                "vendor",
                                                item?.id,
                                                item,
                                                3
                                              )
                                            }
                                          >
                                            <span className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2">

                                              Complete profile
                                              <FiExternalLink />
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </td> */}

                                    <td>
                                      <Dropdown>
                                        <Dropdown.Toggle variant="transparent" className="action-dropdown" id="action-dropdown">
                                          <BsThreeDotsVertical />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="action-dropdown-menu">

                                          {item?.is_profile_completed ? (
                                            <div className="d-flex gap-3">
                                              <RexettButton
                                                icon={
                                                  selectedApprovedBtn === index ? (
                                                    approvedLoader
                                                  ) : (
                                                    <IoCheckmark />
                                                  )
                                                }
                                                className={`arrow-btn primary-arrow ${!item?.is_profile_completed &&
                                                  "not-allowed"
                                                  }`}
                                                variant="transparent"
                                                // disabled={!item?.is_profile_completed}
                                                onClick={(e) =>
                                                  handleClick(
                                                    e,
                                                    item?.id,
                                                    "approved",
                                                    index
                                                  )
                                                }
                                                isLoading={
                                                  selectedApprovedBtn === index
                                                    ? approvedLoader
                                                    : false
                                                }
                                              />
                                              <RexettButton
                                                icon={
                                                  selectedRejectedBtn === index ? (
                                                    approvedLoader
                                                  ) : (
                                                    <IoCloseOutline />
                                                  )
                                                }
                                                // disabled={!item?.is_profile_completed}
                                                className={`arrow-btn danger-arrow ${!item?.is_profile_completed &&
                                                  "not-allowed"
                                                  }`}
                                                variant={"transparent"}
                                                onClick={(e) =>
                                                  handleClick(
                                                    e,
                                                    item?.id,
                                                    "rejected",
                                                    index
                                                  )
                                                }
                                                isLoading={
                                                  selectedRejectedBtn === index
                                                    ? approvedLoader
                                                    : false
                                                }
                                              />
                                            </div>
                                          ) : (
                                            <div className="d-flex justify-content-center gap-3">
                                              <div
                                                onClick={() =>
                                                  !smallLoader &&
                                                  redirectToWebsiteForm(
                                                    "developer",
                                                    item?.id,
                                                    item,
                                                    3

                                                  )
                                                }
                                              >
                                                <span className="project-link px-2 py-1 font-14 text-green text-decoration-none mb-1 d-inline-flex align-items-center gap-2">

                                                  Complete profile
                                                  <FiExternalLink />
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          <div className="text-center py-1">
                                            {/* <Link to={'#'} className="font-14 text-green">Edit Profile <LuPencil /> </Link> */}
                                          </div>
                                          <div className="text-center py-1">
                                            <div className="font-14 text-danger" onClick={() => deleteProfile(item?.id)}>Delete <FaTrashCan /> </div>
                                          </div>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </td>
                                  </tr>
                                  {expandedRow === index && (
                                    <tr
                                      className={`collapsible-row ${expandedRow === index ? "open" : ""
                                        }`}
                                    >
                                      <td colSpan="10">
                                        <div>
                                          <Row>
                                            {item?.name && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("developerName")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.name
                                                      ? item?.name
                                                      : "Not Mentioned"}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.address && (
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">
                                                    Address
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.address}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.country && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("country")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.country}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.state && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("state")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.state}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.city && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("city")}
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.city}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {/* <Col md={3} className="mb-3">
                                          <div>
                                            <h3 className="application-heading">
                                              {t("status")}
                                            </h3>
                                            <p className="status-progress text-capitalize">
                                              Under Review
                                            </p>
                                          </div>
                                        </Col> */}

                                            {item?.email && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    {t("email")}
                                                  </h3>
                                                  <p className="application-text">{item?.email}</p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.work_preference && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Work Preference
                                                  </h3>
                                                  <p className="application-text">{item?.work_preference}</p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.ready_to_relocate && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Ready to relocate
                                                  </h3>
                                                  <p className="application-text">
                                                    {item?.ready_to_relocate}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.time_zone && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Time Zone
                                                  </h3>
                                                  <p className="application-text">{item?.time_zone}</p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.language_preference && (
                                              <Col md={3} className="mb-3">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Language
                                                  </h3>
                                                  <p className="application-text">
                                                    {
                                                      item?.language_preference
                                                    }
                                                  </p>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.developer_detail
                                              ?.github_url && (
                                                <Col md={3} className="mb-3">
                                                  <div>
                                                    <h3 className="application-heading">
                                                      Github Url
                                                    </h3>
                                                    <p className="application-text">
                                                      {
                                                        item?.developer_detail
                                                          ?.github_url
                                                      }
                                                    </p>
                                                  </div>
                                                </Col>
                                              )}

                                            {item?.other_skills?.length > 0 && (
                                              <Col md={3} className="mb-3 ">
                                                <div>
                                                  <h3 className="application-heading">
                                                    Skills
                                                  </h3>
                                                  <ul className="need-skill-list  mb-0">
                                                    {item?.other_skills?.map(
                                                      (item, index) => {
                                                        return (
                                                          <>
                                                            <li key={index}>
                                                              {item?.skill}
                                                            </li>
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </ul>
                                                </div>
                                              </Col>
                                            )}

                                            {item?.developer_detail
                                              ?.professional_title && (
                                                <Col md={3}>
                                                  <div>
                                                    <h3 className="application-heading">
                                                      Designation
                                                    </h3>
                                                    <p className="application-text">
                                                      {
                                                        item?.developer_detail
                                                          ?.professional_title
                                                      }
                                                    </p>
                                                  </div>
                                                </Col>
                                              )}

                                            {item?.developer_detail
                                              ?.how_did_you_hear_about_rexett && (
                                                <Col md={3}>
                                                  <div>
                                                    <h3 className="application-heading">
                                                      How Did you hear about
                                                      rexett?
                                                    </h3>
                                                    <p className="application-text">
                                                      {
                                                        item?.developer_detail
                                                          ?.how_did_you_hear_about_rexett
                                                      }
                                                    </p>
                                                  </div>
                                                </Col>
                                              )}
                                            {item?.created_at && (
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">
                                                    Created At
                                                  </h3>
                                                  <p className="application-text">
                                                    {moment(
                                                      item?.created_at
                                                    ).format("MMMM Do YYYY")}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.developer_detail
                                              ?.total_experience && (
                                                <Col md={3}>
                                                  <div>
                                                    <h3 className="application-heading">
                                                      Experience
                                                    </h3>
                                                    <p className="application-text">
                                                      {
                                                        item?.developer_detail
                                                          ?.total_experience
                                                      }
                                                    </p>
                                                  </div>
                                                </Col>
                                              )}
                                            {(
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">
                                                    Expertise Skills
                                                  </h3>
                                                  <p className="application-text">
                                                    {/* {
                                                      item?.expertises[0]
                                                        ?.skill
                                                    } */}
                                                  </p>
                                                </div>
                                              </Col>
                                            )}
                                            {item?.developer_detail && (
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">Screening Round</h3>
                                                  {item.interviews && item.interviews.length > 0 ? (() => {
                                                    // Sort interviews by created_at in descending order to get the latest interview first
                                                    const sortedInterviews = [...item.interviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                                                    const latestInterview = sortedInterviews[0];

                                                    // Calculate average rating if there is feedback
                                                    const feedbacks = latestInterview.shareFeedbacks || [];
                                                    const skillRatingsMap = {};

                                                    // Collect ratings by skill name
                                                    feedbacks.forEach(feedback => {
                                                      const skillRatings = feedback.skillRatings || [];
                                                      skillRatings.forEach(rating => {
                                                        if (!skillRatingsMap[rating.skill_name]) {
                                                          skillRatingsMap[rating.skill_name] = [];
                                                        }
                                                        skillRatingsMap[rating.skill_name].push(rating.rating);
                                                      });
                                                    });

                                                    // Calculate average rating per skill
                                                    const skillAverages = Object.keys(skillRatingsMap).map(skillName => {
                                                      const ratings = skillRatingsMap[skillName];
                                                      const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
                                                      return avgRating;
                                                    });

                                                    // Calculate overall average rating
                                                    const overallAverageRating = skillAverages.length > 0 ? (skillAverages.reduce((a, b) => a + b, 0) / skillAverages.length).toFixed(1) : 'N/A';

                                                    return (
                                                      <div className="d-inline-flex align-items-center gap-2">
                                                        <span className="status-upcoming lh-1">
                                                          <span className="d-inline-flex align-items-center gap-1">
                                                            <FaStar />
                                                            {overallAverageRating}
                                                          </span>
                                                        </span>
                                                        {/* Show the "View Report" button only if there is feedback */}
                                                        {feedbacks.length > 0 && (
                                                          <button
                                                            onClick={() => handleInterviewReport(latestInterview.id)}
                                                            className="main-btn font-14 text-decoration-none"
                                                          >
                                                            View Report
                                                          </button>
                                                        )}
                                                      </div>
                                                    );
                                                  })() : (
                                                    <div>No Interviews Found</div>
                                                  )}
                                                </div>
                                              </Col>
                                            )}
                                            {item?.developer_detail && (
                                              <Col md={3}>
                                                <div>
                                                  <h3 className="application-heading">
                                                    Certifications
                                                  </h3>
                                                  <Link to={'#'} className="text-green text-decoration-none">AI certificate <FaEye /> </Link>
                                                </div>
                                              </Col>
                                            )}
                                            <Col md={3}>
                                              <div>
                                                <h3 className="application-heading">
                                                  Resume
                                                </h3>
                                                <RexettButton
                                                  onClick={(e) =>
                                                    handleDownload(
                                                      e,
                                                      item?.developer_detail?.resume
                                                    )
                                                  }
                                                  disabled={
                                                    !item?.developer_detail?.resume
                                                  }
                                                  icon={
                                                    selectedRejectedBtn === index ? (
                                                      approvedLoader
                                                    ) : (
                                                      <div ref={targetRef}>
                                                        <HiDownload />
                                                      </div>
                                                    )
                                                  }
                                                  className={`arrow-btn primary-arrow ${!item?.developer_detail?.resume &&
                                                    "not-allowed"
                                                    }`}
                                                />
                                              </div>
                                            </Col>
                                            <Col md={3}>
                                              <div>
                                                <h3 className="application-heading">
                                                  Screening Questions
                                                </h3>
                                                <div>
                                                  <Button onClick={handleShowQuestion} className="main-btn font-12 py-2">View Details</Button>
                                                </div>
                                              </div>
                                            </Col>
                                            <Col md={3}>
                                              <div>
                                                <h3 className="application-heading">
                                                  Send Email
                                                </h3>
                                                <div className="d-inline-flex gap-1 align-items-center">
                                                  <OverlayTrigger placement="bottom" overlay={sendEmail}>
                                                    <span className="status-email position-relative"
                                                      onClick={() => {
                                                        if (!loading && item?.verification_reminder_count < 3) {
                                                          handleSendEmail(item?.id, item?.email, item?.verification_reminder_count, index);
                                                        }
                                                      }}
                                                    >
                                                      <span className="email_count"> {emailIndx === index && loading ? <RexettSpinner /> : <FaEnvelope />}</span>
                                                      {item?.verification_reminder_count > 0 ? <span className="email_shot">{item?.verification_reminder_count}</span> : ""}
                                                    </span>
                                                  </OverlayTrigger>
                                                </div>
                                              </div>
                                            </Col>
                                          </Row>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              ))
                            ) : (
                              <td colSpan={8}>
                                <NoDataFound />
                              </td>
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {allApplications?.totalVendorPages > 1 ? (
                    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                      {currentTab == "clients" ? (
                        <p className="showing-result">
                          {t("showing")} {allApplications?.clients?.length}{" "}
                          {t("results")}
                        </p>
                      ) : (
                        <p className="showing-result">
                          {t("showing")} {allApplications?.vendors?.length}{" "}
                          {t("results")}
                        </p>
                      )}
                      <RexettPagination
                        number={allApplications?.totalVendorPages}
                        setPage={setPage}
                        page={page}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Tab.Pane>

              </Tab.Content>
            </Tab.Container>
          </div>
          <Offcanvas
            show={showScreening}
            placement="end"
            onHide={handleScreeningClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Schedule Screening</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="schedule-screening-wrapper">
                <div className="mb-4">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" className="common-field font-14" />
                </div>
                <div className="mb-4">
                  <Form.Label>Select Timeslots</Form.Label>
                  <div className="slot-wrapper">
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="09:00am - 10:00am"
                      id="nine-ten-am"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="10:00am - 11:00am"
                      id="ten-eleven-am"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="11:00am - 12:00pm"
                      id="eleven-twelve-pm"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="12:00pm - 01:00pm"
                      id="twelve-one-pm"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="01:00am - 02:00pm"
                      id="one-two-pm"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="02:00pm - 03:00pm"
                      id="two-three-pm"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="03:00pm - 04:00pm"
                      id="three-four-pm"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="04:00pm - 05:00pm"
                      id="four-five-pm"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="05:00pm - 06:00pm"
                      id="five-six-pm"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="06:00pm - 07:00pm"
                      id="six-seven-pm"
                    />
                    <Form.Check
                      type="radio"
                      name="timeslot"
                      className="timeslot-radio"
                      onChange={handleTimeslotChange}
                      label="Custom Timeslot"
                      id="custom-timelot"
                    />
                  </div>
                  {selectedTimeslot === "custom-timelot" && (
                    <div className="custom-timslot d-flex gap-3 align-items-center mt-3">
                      <div className="start-time-slot w-100">
                        <Form.Control
                          type="time"
                          className="common-field font-14"
                        />
                      </div>
                      <span>-</span>
                      <div className="end-time-slot w-100">
                        <Form.Control
                          type="time"
                          className="common-field font-14"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <Button variant="transparent" className="main-btn font-14">
                    Schedule Screening
                  </Button>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          {/* <ScheduleScreening
            show={schedulescreeening}
            handleClose={handleCloseScheduleScreening}
            selectedEmail={selectedEmail}
            selectedId={selectedId}
          /> */}

          {profileDeleted.isDeleted
            && (
              <ConfirmationModal
                show={profileDeleted.isDeleted}
                handleClose={deleteProfile}
                smallLoader={smallLoader}
                text={"Are you sure to delete this profile?"}
                handleAction={handleDeleteProlfile}
              />
            )}
          <Schedulemeeting show={schedulescreeening} selectedDeveloper={selectedEmail} handleClose={handleCloseScheduleScreening} type={"screen"} />

          <MeetingInfo show={screeninginfo} handleClose={handleCloseScreeningInfo} />
          <ScreeningQuestion show={showQuestions} handleClose={handleCloseQuestion}  />
        </>
      )}
    </>
  );
};
export default Applications;
