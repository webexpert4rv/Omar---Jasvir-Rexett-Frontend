import React, { useEffect, useState } from "react";
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
import RejectModal from "./Modals/RejectModal";
import EndJobModal from "./Modals/EndJob";
import ConfirmationModal from "./Modals/ConfirmationModal";
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
} from "../../redux/slices/clientDataSlice";
import JobCard from "../../components/common/SingleJob/JobCard";
import RexettSpinner from "../../components/atomic/RexettSpinner";
import { jobPostConfirmMessage } from "../../helper/utlis";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { BsFillSendXFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FaBriefcase, FaCheck, FaGithub, FaLinkedin, FaStar, FaTrashCan } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import RexettButton from "../../components/atomic/RexettButton";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { FaRegHandshake } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import devImg from '../../assets/img/demo-img.jpg';
import { FaLink } from "react-icons/fa6";
import Schedulemeeting from "../../components/common/Modals/ScheduleMeeting";
import MeetingInfo from "./Modals/MeetingInfo";
import ReactQuill from "react-quill";
import { FaClipboardUser } from "react-icons/fa6";
import { FaListUl, FaTimes, FaUsers } from "react-icons/fa";
import { PiChatsFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { IoGrid } from "react-icons/io5";
import InterviewCard from "../../components/atomic/InterviewCard";
import TableView from "../../components/atomic/TableView";

const SingleJob = () => {
  const role = localStorage.getItem("role")
  const [selectedTabsData, setSelectedTabsData] = useState([]);
  const [currentTabsStatus, setCurrnetTabsStatus] = useState("application");
  const [currentTab, setCurrentTab] = useState("application");
  const [statusModal, setStatusModal] = useState({
    isTrue: false,
    id: null,
  });
  const [singleJobDescription, setSingleJobDescription] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let id = location.pathname.split("/")[3];
  const clientId = localStorage.getItem("userId")
  console.log(clientId, "clientid")
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
      dispatch(getShortListInterview(id))
    }
    dispatch(getJobCategoryList());
  }, []);

  useEffect(() => {
    setSingleJobDescription(jobPostedData?.data);
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
    setSelectedTabsData(jobPostedData[key]);
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
                let prevData = { ...jobPostedData };
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

    const handleJobStatusModal = (e, id, status) => {
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
              let prevData = { ...jobPostedData };
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
      const savedStep = localStorage.getItem("activeStep");
      if (savedStep) {
        localStorage.setItem("activeStep", 1);
      }
      navigate(`/client/job-edit-post/${id}`);
    }
  };

  const handleJobStatusModal = (e, id, status) => {
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

  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const handleShowMeetingInfo = () => {
    setShowMeetingInfo(!showMeetingInfo)
  }
  const handleCloseMeetingInfo = () => {
    setShowMeetingInfo(false)
  }

  const [showScheduleMeeting, setShowScheduleMeet] = useState(false);
  const handleShowScheduleMeeting = () => {
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
                    {/* <div className="table-responsive">
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
                    </div> */}
                    <TableView handleShowScheduleMeeting={handleShowScheduleMeeting} scheduleInterview={scheduleInterview} rejectedApply={rejectedApply}/>
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
            <JobCard
              handleJobStatusModal={handleJobStatusModal}
              type="Shortlisted"
              data={selectedTabsData}
              jobStatus={singleJobDescription?.status}
              role="client"
            />
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
                <Col lg={4}>
               <InterviewCard handleShowMeetingInfo={handleShowMeetingInfo}/>
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
      <EndJobModal
        show={statusModal?.ended}
        handleClose={handleJobStatusModal}
        onClick={handleJobStatusAction}
        smallLoader={smallLoader}
        header="End Job"
        feedbacks={"Feedbacks"}
        submit={"Request"}
      />
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
      <MeetingInfo show={showMeetingInfo} handleClose={handleCloseMeetingInfo} />
      <Schedulemeeting show={showScheduleMeeting} handleClose={handleCloseScheduleMeeting} />
    </>
  );
};
export default SingleJob;
