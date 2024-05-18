import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Tab,
  Tabs,
  Tooltip,
  OverlayTrigger,
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
import { FaTrashCan } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";

const SingleJob = () => {
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
  let id = location.pathname.split("/")[2];
  const {
    allJobPostedList,
    jobCategoryList,
    jobPostedData,
    approvedLoader,
    smallLoader,
  } = useSelector((state) => state.clientData);
  const { t } = useTranslation();
  useEffect(() => {
    if (id) {
      dispatch(singleJobPostData(id, () => {}));
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
        dispatch(singleJobPostData(id, () => {}));
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
    const handleJobStatusAction = (e, data) => {
        console.log("jkk")
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
        if (singleJobDescription?.status == "Unpublished") {
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


    const handleDelete = (status, id) => {
        if (singleJobDescription?.status == "Unpublished") {
            setStatusModal({
                [status]: !statusModal.isTrue,
                id: id
            })
        }
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
          dispatch(singleJobPostData(id, () => {}));
        })
      );
    } else if (data.status == "application") {
      dispatch(
        getDeleteJob(statusModal?.id, () => {
          setStatusModal({});
          navigate("/job-posted");
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
    if (singleJobDescription?.status == "published") {
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
    console.log(status, "st");
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
              <p className="req-heading mb-1 mt-3">About this job</p>
              <p className="single-job-description mb-0">
                {singleJobDescription?.description}
              </p>
            </div>
            <div className="single-job-card">
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
                    {singleJobDescription?.experience?.split("_").join(" ")}
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
            </div>
            <div className="single-job-card">
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
          </section>
        </Tab>
        <Tab eventKey="suggested" title={t("suggestions")}>
          <div className="text-end">
            <Button className="main-btn px-4 py-2 font-14">Make Suggestion Request</Button>
          </div>
          <JobCard
            handleJobStatusModal={handleJobStatusModal}
            type="Suggested"
            data={selectedTabsData}
            jobStatus={singleJobDescription?.status}
            role="client"
          />
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
          <JobCard
            handleJobStatusModal={handleJobStatusModal}
            type="Shortlisted"
            data={selectedTabsData}
            jobStatus={singleJobDescription?.status}
            role="client"
          />
        </Tab>
        <Tab eventKey="interviewing" title={t("interviewing")}>
          <JobCard
            handleJobStatusModal={handleJobStatusModal}
            type="Interviewing"
            data={selectedTabsData}
            jobStatus={singleJobDescription?.status}
          />
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
          <JobCard
            handleJobStatusModal={handleJobStatusModal}
            type="Hired"
            data={selectedTabsData}
            jobStatus={singleJobDescription?.status}
          />
        </Tab>
      </Tabs>
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
      {/* <ConfirmationModal
                text={ `Are you sure you want to delete this job`}
                show={showModal} onClick={handleAction}
                handleClose={handleDelete}
                smallLoader={smallLoader}
            /> */}
    </>
  );
};
export default SingleJob;
