import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Tooltip,
  OverlayTrigger,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getJobCategoryList,
  getJobLists,
} from "../../redux/slices/clientDataSlice";
import RexettPagination from "../../components/atomic/RexettPagination";
import { FaEye } from "react-icons/fa6";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import NoDataFound from "../../components/atomic/NoDataFound";
import { useTranslation } from "react-i18next";
import { FaClipboardUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiChatsFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { JOB_LISTING_PER_PAGE } from "./constant";

const JobListing = () => {
  const [page, setPage] = useState(1);
  const [activeTab,setActiveTab] = useState("all");
  const dispatch = useDispatch();
  // const { jobList, jobCategoryList, screenLoader } = useSelector(
  //   (state) => state.clientData
  // );
  const { jobList, jobCategoryList, screenLoader } = useSelector(
    (state) => state.clientData
  );

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getJobCategoryList());
  }, [dispatch]);

  useEffect(() => {
    const filters = {
      page:page,
      type: activeTab,
      perPage:JOB_LISTING_PER_PAGE
    }
    dispatch(getJobLists(filters));
  }, [page,activeTab]);

  const getCategory = (cat) => {
    let data = jobCategoryList.find((item) => item.id == cat);
    return data?.title;
  };

  const convertToArray = (arr) => {
    const skillsArray = arr?.split(",");
    return skillsArray;
  };
  const viewtooltip = <Tooltip id="tooltip">{t("viewJob")}</Tooltip>;

  const currentStatusCssClass = (status) => {
    console.log(status, "sttt")
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
        return "status-rejected";
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
  console.log(jobList,"jobList")
  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <>
          <Tabs
            defaultActiveKey="all"
            id="justify-tab-example"
            activeKey={activeTab}
            onSelect={(selectedTab)=>setActiveTab(selectedTab)}
            className="mb-3 notification-tabs job-listing-tabs gap-md-0 gap-3"
          >
            <Tab eventKey="all" title={t("all")}>
              <section className="job-posted-section">
                <div className="job-posted-wrapper">
                  {jobList?.data?.length > 0 ? (
                    jobList?.data?.map((item) => {
                      return (
                        <>
                          <div className="job-posted-list d-block" key={item.id}>
                            <div className="d-xl-flex justify-content-between align-items-start">
                              <div className="job-info-wrapper">
                                <h2 className="job-title">{item.title}</h2>
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
                                  <p className="grid-text">
                                    {item?.contract_type}
                                  </p>
                                  <p className="grid-text">{item.job_type}</p>
                                </div>
                                <p
                                  className="job-description mb-0"
                                  dangerouslySetInnerHTML={{
                                    __html: item?.description,
                                  }}
                                ></p>
                                <Row>
                                  <Col md="12">
                                    <div className="info-grid">
                                      <h4 className="grid-heading">
                                        {t("skillsRequired")}
                                      </h4>
                                      <ul className="need-skill-list ">
                                        {item?.skills?.length > 0
                                          ? convertToArray(item.skills)?.map(
                                            (item) => {
                                              return (
                                                <>
                                                  <li>{item}</li>
                                                </>
                                              );
                                            }
                                          )
                                          : "Not Mentioned"}
                                      </ul>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <div>

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
                                <div className="d-flex gap-3 align-items-center mb-2">
                                  <p
                                    className={`${currentStatusCssClass(
                                      item?.status
                                    )}`}
                                  >
                                    {item?.status.charAt(0).toUpperCase() +
                                      item?.status.slice(1)}
                                  </p>
                                </div>
                                <p className="font-15">
                                  {t("postedDate")}:{" "}
                                  <strong>{item.created_at.slice(0, 10)}</strong>
                                </p>
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={viewtooltip}
                                >
                                  <Link
                                    to={`/client/single-job/${item.id}`}
                                    state={{
                                      workExperienceyears:
                                        item?.screening_questions &&
                                        returnExperienceFromScreeningQuestions(
                                          item?.screening_questions
                                        ) &&
                                        returnExperienceFromScreeningQuestions(
                                          item?.screening_questions
                                        ),
                                    }}
                                    className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none"
                                  >
                                    <FaEye />
                                  </Link>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (

                    <td colSpan={10}> <div className="simple-no-data">  <NoDataFound data="No Jobs are available" /></div>  </td>
                  )}
                </div>
              </section>
              {jobList?.totalCount > 5 ? (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="showing-result">
                    {t("showing")} {jobList?.data?.length}{" "}
                    {t("results")}
                  </p>
                  <RexettPagination
                    number={jobList?.totalPages}
                    setPage={setPage}
                    page={page}
                  />
                </div>
              ) : (
                ""
              )}
            </Tab>
            <Tab eventKey="in-progress" title={t("inProgress")}>
              <section className="job-posted-section">
                <div className="job-posted-wrapper">
                  {jobList?.data?.length > 0 ? (
                    jobList?.data?.map((item) => {
                      return (
                        <>
                          <div className="job-posted-list" key={item.id}>
                            <div>
                              <h2 className="job-title">{item.title}</h2>
                              {/* <h4 className="job-category">{item.client.name}</h4> */}
                              <div className="profile-req">
                                <p className="grid-text">
                                  {item?.experience?.split("_").join(" ")} of
                                  exp
                                </p>
                                <p className="grid-text">
                                  {item?.contract_type}
                                </p>
                                <p className="grid-text">{item.job_type}</p>
                              </div>
                              <p
                                className="job-description"
                                dangerouslySetInnerHTML={{
                                  __html: item?.description,
                                }}
                              ></p>
                              <Row>
                                <Col md="12">
                                  <div className="info-grid">
                                    <h4 className="grid-heading">
                                      {t("skillsRequired")}
                                    </h4>
                                    <ul className="need-skill-list ">
                                      {convertToArray(item.skills)?.map(
                                        (item) => {
                                          return (
                                            <>
                                              <li>{item}</li>
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div className="status-wrapper">
                              <div className="d-flex gap-3 align-items-center mb-2">
                                <p
                                  className={`${currentStatusCssClass(
                                    item?.status
                                  )}`}
                                >
                                  {item?.status.charAt(0).toUpperCase() +
                                    item?.status.slice(1)}
                                </p>
                              </div>
                              <p className="font-15">
                                {t("postedDate")}:{" "}
                                <strong>{item.created_at.slice(0, 10)}</strong>
                              </p>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={viewtooltip}
                              >
                                <Link
                                  to={`/client/single-job/${item.id}`}
                                  className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none"
                                >
                                  <FaEye />
                                </Link>
                              </OverlayTrigger>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <NoDataFound data="No Jobs are available" />
                  )}
                </div>
              </section>
              {jobList?.totalCount > 5 ? (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="showing-result">
                    {t("showing")} {jobList?.data?.length}{" "}
                    {t("results")}
                  </p>
                  <RexettPagination
                    number={jobList?.totalPages}
                    setPage={setPage}
                    page={page}
                  />
                </div>
              ) : (
                ""
              )}
            </Tab>
            <Tab eventKey="ended" title={t("endJobs")}>
              <section className="job-posted-section">
                <div className="job-posted-wrapper">
                  {jobList?.data?.length > 0 ? (
                    jobList?.data?.map((item) => {
                      return (
                        <>
                          <div className="job-posted-list" key={item.id}>
                            <div>
                              <h2 className="job-title">{item.title}</h2>
                              {/* <h4 className="job-category">{item.client.name}</h4> */}
                              <div className="profile-req">
                                <p className="grid-text">
                                  {item?.experience?.split("_").join(" ")} of
                                  exp
                                </p>
                                <p className="grid-text">
                                  {item?.contract_type}
                                </p>
                                <p className="grid-text">{item.job_type}</p>
                              </div>
                              <p
                                className="job-description"
                                dangerouslySetInnerHTML={{
                                  __html: item?.description,
                                }}
                              ></p>
                              <Row>
                                <Col md="12">
                                  <div className="info-grid">
                                    <h4 className="grid-heading">
                                      {t("skillsRequired")}
                                    </h4>
                                    <ul className="need-skill-list ">
                                      {convertToArray(item.skills)?.map(
                                        (item) => {
                                          return (
                                            <>
                                              <li>{item}</li>
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div className="status-wrapper">
                              <div className="d-flex gap-3 align-items-center mb-2">
                                <p
                                  className={`${currentStatusCssClass(
                                    item?.status
                                  )}`}
                                >
                                  {item?.status.charAt(0).toUpperCase() +
                                    item?.status.slice(1)}
                                </p>
                              </div>
                              <p className="font-15">
                                {t("postedDate")}:{" "}
                                <strong>{item.created_at.slice(0, 10)}</strong>
                              </p>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={viewtooltip}
                              >
                                <Link
                                  to={`/client/single-job/${item.id}`}
                                  className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none"
                                >
                                  <FaEye />
                                </Link>
                              </OverlayTrigger>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <NoDataFound data="No Jobs are available" />
                  )}
                </div>
              </section>
              {jobList?.totalCount > 5 ? (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="showing-result">
                    {t("showing")} {jobList?.data?.length}{" "}
                    {t("results")}
                  </p>
                  <RexettPagination
                    number={jobList?.totalPages}
                    setPage={setPage}
                    page={page}
                  />
                </div>
              ) : (
                ""
              )}
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
};
export default JobListing;
