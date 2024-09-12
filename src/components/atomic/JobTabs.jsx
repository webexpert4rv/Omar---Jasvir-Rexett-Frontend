import React, { useEffect, useState } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import NoDataFound from "./NoDataFound";
import ScreenLoader from "./ScreenLoader";
import { useTranslation } from "react-i18next";
import { FaClipboardUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiChatsFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { DUMMY_DATA } from "../../helper/constant";

const JobTabs = ({ jobListing, jobCategoryList, screenLoader }) => {
  const role = localStorage.getItem("role")
  const { t } = useTranslation()
  const [stateJobs, setStateJob] = useState([])
  const navigate = useNavigate()
  const getCategory = (cat) => {
    let data = jobCategoryList?.find((item) => item.id == cat);
    return data?.title;
  };

  useEffect(() => {
    if (jobListing?.length > 0) {
      setStateJob(jobListing)
    } else {
      setStateJob(DUMMY_DATA)
    }

  }, [jobListing])

  const convertToArray = (arr) => {
    if(arr){
    const skillsArray = arr?.split(",");
    return skillsArray;
    }
  };

  const currentStatusCssClass = (status) => {
    console.log(status, "status")
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
        return "status-unpublished";
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

  const suggestText = (
    <Tooltip>Suggested</Tooltip>
  )
  const shortlistText = (
    <Tooltip>Shortlisted</Tooltip>
  )
  const interviewText = (
    <Tooltip>Interview</Tooltip>
  )
  const offerText = (
    <Tooltip>Offers</Tooltip>
  )
  const hiredText = (
    <Tooltip>Hired</Tooltip>
  )

  const handleViewRedirection = (id) => {
    navigate(`/${role}/${role}-single-job/${id}`)
  }

  return (
    <div className="job-posted-wrapper">
      {screenLoader ? <ScreenLoader /> : stateJobs?.length > 0 ? (
        stateJobs.map((item, index) => {
          return (
            <>
              <div className="job-posted-list flex-column">
                <div className="d-xl-flex justify-content-between align-items-start">
                  <div className="job-info-wrapper">
                    <div>
                      <h2 className="job-title">{item?.title}</h2>
                      <h4 className="job-category">
                        {getCategory(item.category)}
                      </h4>
                      <div className="profile-req">
                        <p className={returnExperienceFromScreeningQuestions(
                          item?.screening_questions
                        ) ? `grid-text` : ""} >
                          {item?.screening_questions &&
                            returnExperienceFromScreeningQuestions(
                              item?.screening_questions
                            )}
                          {returnExperienceFromScreeningQuestions(
                            item?.screening_questions
                          ) && " years"}
                        </p>
                        <p className="grid-text">{item?.contract_type?.split("-").join(" ").replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}</p>
                        <p className="grid-text">{item?.job_type}</p>
                      </div>
                      <p className="job-description"
                        dangerouslySetInnerHTML={{
                          __html: item?.description,
                        }}
                      ></p>
                      <Row>
                        {/* <Col md="12">
                          <div className="info-grid">
                            <h4 className="grid-heading">{t("skillsRequired")}</h4>
                            {item?.skills?.length > 0 ? <ul className="need-skill-list">
                              {convertToArray(item?.skills)?.map((item) => {
                                return (
                                  <>
                                    <li>{item}</li>
                                  </>
                                );
                              })}
                            </ul> : "Not Mentioned"}
                          </div>
                        </Col> */}
                      </Row>
                    </div>
                  </div>
                  <div>
                    {role == "developer" &&
                      <><div>
                        <span className="status-finished w-auto d-inline-block mb-2">Matching with your profile - <strong>95%</strong></span>
                      </div><div>
                          <span className="status-upcoming w-auto d-inline-block mb-2">Matching with your profile - <strong>60%</strong></span>
                        </div><div>
                          <span className="status-progress w-auto d-inline-block mb-2">Matching with your profile - <strong>40%</strong></span>
                        </div><div>
                          <span className="status-rejected w-auto d-inline-block mb-2">Matching with your profile - <strong>20%</strong></span>
                        </div></>
                    }
                    <div className="mb-3 mt-xl-0 mt-3">
                      <h4 className="stage-heading mb-3">Stages</h4>
                      <div className="stage-wrapper">
                        <OverlayTrigger placement="bottom" overlay={suggestText}>
                          <div className="stage-indicator stage-suggest gap-1">
                            <span className="stage-icon"><FaUsers /></span>4</div>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={shortlistText}>
                          <div className="stage-indicator stage-shortlist gap-1">
                            <span className="stage-icon"><FaClipboardUser /></span> 1
                          </div>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={interviewText}>
                          <div className="stage-indicator stage-interview gap-1">
                            <span className="stage-icon"> <PiChatsFill /> </span>2</div>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={offerText}>
                          <div className="stage-indicator stage-offer gap-1">
                            <span className="stage-icon"> <FaHandshake /> </span> 0
                          </div>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={hiredText}>
                          <div className="stage-indicator stage-hired gap-1">
                            <span className="stage-icon"> <MdWorkHistory /> </span> 0
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                  <div className="status-wrapper">
                    <div>
                      <p
                        className={`${currentStatusCssClass(
                          item?.status
                        )}`}
                      >
                        {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}
                      </p>
                    </div>
                    <p className="font-15">
                      Posted Date: <strong>{item?.created_at?.slice(0, 10)}</strong>
                    </p>
                    <p className="font-15"> 
                      Response Time: <strong>15 Days</strong>
                    </p>
                    <div className="d-flex align-items-center gap-3">

                      {role == "developer" &&
                        <div>
                          <Button variant="transparent" className="main-btn font-14 mb-2">Apply this job</Button>
                        </div>
                      }
                      <span
                        onClick={() => handleViewRedirection(item?.id)}
                        className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none cursor-pointer"
                      >
                        <FaEye />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <div className="simple-no-data"><NoDataFound /></div>
      )}
    </div>
  );
};

export default JobTabs;
