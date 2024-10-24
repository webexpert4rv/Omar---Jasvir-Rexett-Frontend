import React, { useEffect, useState, useMemo, useCallback } from "react";
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
import { FaEye, FaClipboardUser, FaUsers, FaHandshake } from "react-icons/fa";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import NoDataFound from "../../components/atomic/NoDataFound";
import { useTranslation } from "react-i18next";
import { PiChatsFill } from "react-icons/pi";
import { MdWorkHistory } from "react-icons/md";
import { JOB_LISTING_PER_PAGE } from "./constant";
import { accessModalAccordingToRoles } from "../../components/common/EditProfile/helper";

const JobListing = () => {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const role = localStorage.getItem("role")
  console.log(role,"role")
  const dispatch = useDispatch();
  const { screenLoader, allPermissionDetails } = useSelector(state => state.adminData)
  const [accessPermissions, setAccessPermissions] = useState([]);
  const { jobList, jobCategoryList } = useSelector(
    (state) => state.clientData
  );

  const { t } = useTranslation();


  useEffect(() => {
    if (allPermissionDetails?.permissionCategories?.length > 0) {
      let permission = accessModalAccordingToRoles(allPermissionDetails?.permissionCategories, "job listing")
      setAccessPermissions(permission?.permissions)
    }
  }, [allPermissionDetails?.permissionCategories])


  useEffect(() => {
    dispatch(getJobCategoryList());
  }, [dispatch]);

  useEffect(() => {
    const filters = {
      page: page,
      type: activeTab,
      perPage: JOB_LISTING_PER_PAGE,
    };
    dispatch(getJobLists(filters));
  }, [page, activeTab, dispatch]);

  const getCategory = useCallback(
    (cat) => {
      const data = jobCategoryList.find((item) => item.id === cat);
      return data?.title;
    },
    [jobCategoryList]
  );

  const convertToArray = useCallback((arr) => arr?.split(","), []);

  const viewTooltip = useMemo(() => <Tooltip id="tooltip">{t("viewJob")}</Tooltip>, [t]);

  const currentStatusCssClass = useCallback((status) => {
    switch (status) {
      case "ended":
      case "unpublished":
        return "status-rejected";
      case "Initiated":
        return "status-progress";
      case "completed":
      case "published":
        return "status-finished";
      default:
        return "";
    }
  }, []);

  const returnExperienceFromScreeningQuestions = useCallback((screeningQuestions) => {
    if (screeningQuestions?.length) {
      const requiredElement = screeningQuestions?.find(
        (curElem) =>
          curElem?.question === "How many years of experience do you currently have?"
      );
      return requiredElement?.ideal_answer;
    }
  }, []);

  const renderJobList = (jobs) => {
    if (jobs?.length > 0) {
      return jobs.map((item) => (
        <div className="job-posted-list d-block" key={item.id}>
          <div className="d-xl-flex justify-content-between align-items-start">
            <div className="job-info-wrapper">
              <h2 className="job-title">{item.title}</h2>
              <div className="profile-req">
                <p className={returnExperienceFromScreeningQuestions(item?.screening_questions) ? "grid-text" : ""}>
                  {returnExperienceFromScreeningQuestions(item?.screening_questions)}{" "}
                  {returnExperienceFromScreeningQuestions(item?.screening_questions) && " years"}
                </p>
                <p className="grid-text">{item?.contract_type}</p>
                <p className="grid-text">{item.job_type}</p>
              </div>
              <p
                className="job-description mb-0"
                dangerouslySetInnerHTML={{ __html: item?.description }}
              ></p>
              <Row>
                <Col md="12">
                  <div className="info-grid">
                    <h4 className="grid-heading">{t("skillsRequired")}</h4>
                    <ul className="need-skill-list">
                      {item?.skills?.length > 0
                        ? convertToArray(item.skills)?.map((skill) => <li key={skill}>{skill}</li>)
                        : "Not Mentioned"}
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="status-wrapper">
              <div className="d-flex gap-3 align-items-center mb-2">
                <p className={currentStatusCssClass(item?.status)}>
                  {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}
                </p>
              </div>
              <p className="font-15">
                {t("postedDate")}: <strong>{item.created_at.slice(0, 10)}</strong>
              </p>
              <OverlayTrigger placement="bottom" overlay={viewTooltip}>
                <Link
                  to={`/client/single-job/${item.id}`}
                  state={{
                    workExperienceyears: returnExperienceFromScreeningQuestions(item?.screening_questions),
                  }}
                  className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none"
                >
                  <FaEye />
                </Link>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      ));
    } else {
      return (
          <div className="simple-no-data">
            <NoDataFound data="No Jobs are available" />
          </div>
      );
    }
  };

  const stagesTooltip = (text) => <Tooltip>{text}</Tooltip>
  
  const subModulesAccess = (slug) => {
    if (role == "employee") {
      if (accessPermissions?.length > 0) {
        let slugWithPermission = accessPermissions?.find((item) => item.slug == slug)
        return slugWithPermission?.status == "active" ? true : false
      }
    } else {
      return true
    }
  }

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
            onSelect={(selectedTab) => setActiveTab(selectedTab)}
            className="mb-3 notification-tabs job-listing-tabs gap-md-0 gap-3"
          >
             <Tab eventKey="new-job-post" title="New Job Post">
              <section className="job-posted-section">
                <div className="job-posted-wrapper">
                  {renderJobList(jobList?.data)}
                </div>
              </section>
              {jobList?.totalCount > 5 && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="showing-result">
                    {t("showing")} {jobList?.data?.length} {t("results")}
                  </p>
                  <RexettPagination number={jobList?.totalPages} setPage={setPage} page={page} />
                </div>
              )}
            </Tab>
            <Tab eventKey="in-progress" title={t("inProgress")}>
              <section className="job-posted-section">
                <div className="job-posted-wrapper">
                  {renderJobList(jobList?.data)}
                </div>
              </section>
              {jobList?.totalCount > 5 && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="showing-result">
                    {t("showing")} {jobList?.data?.length} {t("results")}
                  </p>
                  <RexettPagination number={jobList?.totalPages} setPage={setPage} page={page} />
                </div>
              )}
            </Tab>
            <Tab eventKey="in-contract" title={t("in Contract")}>
              <section className="job-posted-section">
                <div className="job-posted-wrapper">
                  {renderJobList(jobList?.data)}
                </div>
              </section>
              {jobList?.totalCount > 5 && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="showing-result">
                    {t("showing")} {jobList?.data?.length} {t("results")}
                  </p>
                  <RexettPagination number={jobList?.totalPages} setPage={setPage} page={page} />
                </div>
              )}
            </Tab>
            <Tab eventKey="ended" title={t("endJobs")}>
              <section className="job-posted-section">
                <div className="job-posted-wrapper">
                  {renderJobList(jobList?.data)}
                </div>
              </section>
              {jobList?.totalCount > 5 && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="showing-result">
                    {t("showing")} {jobList?.data?.length} {t("results")}
                  </p>
                  <RexettPagination number={jobList?.totalPages} setPage={setPage} page={page} />
                </div>
              )}
            </Tab>
            <Tab eventKey="all" title={t("all")}>
              <section className="job-posted-section">
                <div className="job-posted-wrapper">
                  {renderJobList(jobList?.data)}
                </div>
              </section>
              {jobList?.totalCount > 5 && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="showing-result">
                    {t("showing")} {jobList?.data?.length} {t("results")}
                  </p>
                  <RexettPagination number={jobList?.totalPages} setPage={setPage} page={page} />
                </div>
              )}
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
};

export default JobListing;
