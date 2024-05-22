import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import NoDataFound from "./NoDataFound";
import ScreenLoader from "./ScreenLoader";
import { useTranslation } from "react-i18next";

const   JobTabs = ({ jobListing, jobCategoryList,screenLoader }) => {
  const { t } = useTranslation() 
  const getCategory = (cat) => {
    let data = jobCategoryList.find((item) => item.id == cat);
    return data?.title;
  };

  const convertToArray = (arr) => {
    const skillsArray = arr?.split(",");
    return skillsArray;
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
          return "unpublished";
      default:
        return;
    }
  };

  return (
    <div className="job-posted-wrapper">
      {screenLoader?<ScreenLoader/>: jobListing?.length > 0 ? (
        jobListing.map((item, index) => {
          return (
            <>
              <div className="job-posted-list">
                <div>
                  <div>
                    <h2 className="job-title">{item?.title}</h2>
                    <h4 className="job-category">
                      {getCategory(item.category)}
                    </h4>
                    <div className="profile-req">
                      <p className="grid-text">{item?.experience?.split("_").join(" ")}</p>
                      <p className="grid-text">{item?.contract_type?.split("-").join(" ").replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}</p>
                      <p className="grid-text">{item?.job_type}</p>
                    </div>
                    <p className="job-description">{item?.description}</p>
                    <Row>
                      <Col md="12">
                        <div className="info-grid">
                          <h4 className="grid-heading">{t("skillsRequired")}</h4> 
                          {item?.skills?.length>0?<ul className="need-skill-list">
                            {convertToArray(item?.skills)?.map((item) => {
                              return (
                                <>
                                  <li>{item}</li>
                                </>
                              );
                            })}
                          </ul>:"Not Mentioned"}
                        </div>
                      </Col>
                    </Row>
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
                    Posted Date: <strong>{item.created_at.slice(0, 10)}</strong>
                  </p>

                  <Link
                    to={`/admin-single-job/${item?.id}`}
                    className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none"
                  >
                    <FaEye />
                  </Link>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default JobTabs;
