import React from "react";
import { RxChevronRight } from "react-icons/rx";
import userImg from "../../../assets/img/user-img.jpg";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import RexettButton from "../../atomic/RexettButton";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ApplicationTableRow = ({
  idx,
  row,
  handleClick,
  columns,
  expandedRow,
  arrowActive,
  handleRowClick,
  selectedRejectedBtn,
  selectedApprovedBtn,
  approvedLoader,
  currentTab,
}) => {
  const { t } = useTranslation();
  const approvedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("approve")}
    </Tooltip>
  );
  const rejectedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("reject")}
    </Tooltip>
  );

  const convertToArray = (arr) => {
    const skillsArray = arr?.split(",");
    return skillsArray;
  };
  return (
    <>
      <tr
        className="application-row"
        onClick={() => {
          handleRowClick(idx);
        }}
      >
        {columns.map(({ key, type, subkey }, index) => (
          <>
            {type === "image" ? (
              <td className="white-nowrap">
                <div className="d-flex align-rows-center">
                  <span
                    className={
                      arrowActive == idx ? "row-arrow active" : "row-arrow"
                    }
                  >
                    <RxChevronRight />
                  </span>{" "}
                  <div className="user-imgbx application-userbx">
                    {currentTab === "vendors" ? (
                      <img
                        src={
                          row?.profile_picture ? row?.profile_picture : userImg
                        }
                        className="user-img"
                      />
                    ) : (
                      <img
                        src={
                          row?.profile_picture
                            ? row?.profile_picture
                            : row?.client_type == "company"
                            ? row?.company_logo
                            : userImg
                        }
                        className="user-img"
                      />
                    )}
                    {}
                  </div>
                  {row[key]}
                </div>
              </td>
            ) : type === "action" ? (
              <td>
                <div className="d-flex gap-3">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={approvedTooltip}
                  >
                    <RexettButton
                      icon={
                        selectedApprovedBtn === index ? (
                          approvedLoader
                        ) : (
                          <IoCheckmark />
                        )
                      }
                      className="arrow-btn primary-arrow"
                      variant="transparent"
                      onClick={(e) =>
                        handleClick(e, row?.id, "approved", index)
                      }
                      isLoading={
                        selectedApprovedBtn === index ? approvedLoader : false
                      }
                    />
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={rejectedTooltip}>
                    <RexettButton
                      icon={
                        selectedRejectedBtn === index ? (
                          approvedLoader
                        ) : (
                          <IoCloseOutline />
                        )
                      }
                      className="arrow-btn danger-arrow"
                      variant="transparent"
                      onClick={(e) =>
                        handleClick(e, row?.id, "rejected", index)
                      }
                      isLoading={
                        selectedRejectedBtn === index ? approvedLoader : false
                      }
                    />
                  </OverlayTrigger>
                </div>
              </td>
            ) : type === "status" ? (
              <td>
                <span
                  className={`${
                    row?.approval_status == "approved"
                      ? "status-finished text-capitalize"
                      : "status-rejected text-capitalize"
                  }`}
                >
                  {row?.approval_status}
                </span>
              </td>
            ) : subkey ? (
              <td>{row[key][subkey]}</td>
            ) : (
              key && <td> {row[key]}</td>
            )}
            {/* {key && <td> {row[key]}</td>} */}
          </>
        ))}
      </tr>

      {currentTab === "clients" && expandedRow === idx && (
        <tr className={`collapsible-row ${expandedRow === idx ? "open" : ""}`}>
          <td colSpan="8">
            <div>
              <Row>
                {row?.client_type == "company" && (
                  <Col md={3} className="mb-3">
                    <div>
                      <h3 className="application-heading">Company Name</h3>
                      <p className="application-text">
                        {row?.company_name
                          ? row?.company_name
                          : "Not Mentioned"}
                      </p>
                    </div>
                  </Col>
                )}
                {row?.client_type == "company" && (
                  <Col md={3} className="mb-3">
                    <div>
                      <h3 className="application-heading">Company Address</h3>
                      <p className="application-text">
                        {row?.company_address
                          ? row?.company_address
                          : "Not Mentioned"}
                      </p>
                    </div>
                  </Col>
                )}

                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">{t("appliedOn")}</h3>
                    <p className="application-text">
                      {row?.created_at?.slice(0, 10)}
                    </p>
                  </div>
                </Col>

                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">{t("email")}</h3>
                    <p className="application-text">{row?.email}</p>
                  </div>
                </Col>

                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">{t("status")}</h3>
                    <p className="status-progress text-capitalize">
                      Under Review
                    </p>
                  </div>
                </Col>
                {row?.client_type == "company" && (
                  <Col md={3} className="mb-3">
                    <div>
                      <h3 className="application-heading">Company Tax id</h3>
                      <p className="application-text">{row?.company_tax_id}</p>
                    </div>
                  </Col>
                )}

                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">Contact Person name</h3>
                    <p className="application-text">---</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <h3 className="application-heading">
                      Contact Person Email
                    </h3>
                    <p className="application-text">---</p>
                  </div>
                </Col>
              </Row>
            </div>
          </td>
        </tr>
      )}
      {currentTab === "developers" && expandedRow === idx && (
        <tr className={`collapsible-row ${expandedRow === idx ? "open" : ""}`}>
          <td colSpan="8">
            <div>
              <Row>
                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">
                      {t("developerName")}
                    </h3>
                    <p className="application-text">
                      {row?.name ? row?.name : "Not Mentioned"}
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <h3 className="application-heading">Address</h3>
                    <p className="application-text">Not Mentioned</p>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">{t("country")}</h3>
                    <p className="application-text">{row?.country}</p>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">{t("status")}</h3>
                    <p className="status-progress text-capitalize">
                      Under Review
                    </p>
                  </div>
                </Col>

                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">
                      {t("skillsetNeeded")}
                    </h3>
                    <ul className="need-skill-list">
                      {row?.developer_skills?.skills
                        ? convertToArray(row?.developer_skills?.skills)?.map(
                            (row, index) => {
                              return (
                                <>
                                  <li key={index}>{row}</li>
                                </>
                              );
                            }
                          )
                        : "Not Mentioned"}
                    </ul>
                  </div>
                </Col>

                <Col md={3}>
                  <div>
                    <h3 className="application-heading">Designation</h3>
                    <p className="application-text">
                      {row?.developer_detail?.professional_title
                        ? row?.developer_detail?.professional_title
                        : "Not mentioned"}
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <h3 className="application-heading">Experience</h3>
                    <p className="application-text">2 years</p>
                  </div>
                </Col>
              </Row>
            </div>
          </td>
        </tr>
      )}
      {currentTab === "vendors" && expandedRow === idx && (
        <tr className={`collapsible-row ${expandedRow === idx ? "open" : ""}`}>
          <td colSpan="8">
            <div>
              <Row>
                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">{t("companyName")}</h3>
                    <p className="application-text">{row?.company?.name}</p>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">{t("email")}</h3>
                    <p className="application-text">{row?.company?.email}</p>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">
                      {t("totalEmployees")}
                    </h3>
                    <p className="application-text">
                      {row?.company?.total_employees
                        ? row?.company?.total_employees
                        : " ----"}
                    </p>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div>
                    <h3 className="application-heading">{t("location")}</h3>
                    <p className="application-text">
                      {row?.company?.location ? row?.company?.location : "----"}
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <h3 className="application-heading">{t("phoneNumber")}</h3>
                    <p className="application-text">
                      {row?.company?.phone_number}
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <h3 className="application-heading">
                      {t("typeOfCompany")}
                    </h3>
                    <p className="application-text">
                      {row?.company?.type_of_company}
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <h3 className="application-heading">{t("status")}</h3>
                    <p className="status-progress text-capitalize">
                      Under Review
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <h3 className="application-heading">{t("city")}</h3>
                    <p className="application-text">{row?.city}</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <h3 className="application-heading">{t("country")}</h3>
                    <p className="application-text">{row?.country}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ApplicationTableRow;
