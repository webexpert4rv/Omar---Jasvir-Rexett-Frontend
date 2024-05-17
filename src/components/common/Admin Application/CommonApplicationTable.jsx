import React, { Fragment } from "react";
import { Col, OverlayTrigger, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ScreenLoader from "../../atomic/ScreenLoader";
import NoDataFound from "../../atomic/NoDataFound";
import { RxChevronRight } from "react-icons/rx";
import RexettButton from "../../atomic/RexettButton";
import { IoCloseOutline } from "react-icons/io5";
import ApplicationTableRow from "./ApplicationTableRow";

const CommonApplicationTable = ({
  columns,
  currentTab,
  screenLoader,
  expandedRow,
  handleClick,
  application,
  selectedApprovedButton,
  selectedRejectedButton,
  arrowActive,
  handleRowClick,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Tab.Pane eventKey={currentTab} className="py-4">
        <div className="table-responsive">
          <table className="table w-100 engagement-table table-ui-custom">
            <thead>
              <tr>
                {columns.map(({ header }, idx) => (
                  <th key={idx}>{t(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {screenLoader ? (
                <ScreenLoader />
              ) : application?.length > 0 ? (
                application.map((row, idx) => (
                  <ApplicationTableRow
                    key={idx}
                    currentTab={currentTab}
                    handleClick={handleClick}
                    row={row}
                    expandedRow = {expandedRow}
                    columns={columns}
                    selectedApprovedBtn={selectedApprovedButton}
                    selectedRejectedBtn={selectedRejectedButton}
                    arrowActive={arrowActive}
                    handleRowClick={handleRowClick}
                    idx={idx}
                  />
                ))
              ) : (
                <td colSpan={8}>
                  <NoDataFound />
                </td>
              )}
            </tbody>
            {/* <tbody>
              {screenLoader ? (
                <ScreenLoader />
              ) : (
                application.length ?  
                application.map((curElem,index) => (
                    <Fragment key={index}>
                    <tr
                      className="application-row"
                      onClick={() => handleRowClick(index)}
                    >
                      <td className="white-nowrap">
                        <div className="d-flex align-items-center">
                          <span
                            className={
                                arrowActive == index &&
                              currentTab == "clients"
                                ? "row-arrow active"
                                : "row-arrow"
                            }
                          >
                            <RxChevronRight />
                          </span>{" "}
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
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={rejectedTooltip}
                          >
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
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr
                        className={`collapsible-row ${
                          expandedRow === index ? "open" : ""
                        }`}
                      >
                        <td colSpan="8">
                          <div>
                            <Row>
                              {item?.client_type == "company" && (
                                <Col md={3} className="mb-3">
                                  <div>
                                    <h3 className="application-heading">
                                      Company Name
                                    </h3>
                                    <p className="application-text">
                                      {item?.company_name
                                        ? item?.company_name
                                        : "Not Mentioned"}
                                    </p>
                                  </div>
                                </Col>
                              )}
                              {item?.client_type == "company" && (
                                <Col md={3} className="mb-3">
                                  <div>
                                    <h3 className="application-heading">
                                      Company Address
                                    </h3>
                                    <p className="application-text">
                                      {item?.company_address
                                        ? item?.company_address
                                        : "Not Mentioned"}
                                    </p>
                                  </div>
                                </Col>
                              )}

                              <Col md={3} className="mb-3">
                                <div>
                                  <h3 className="application-heading">
                                    {t("appliedOn")}
                                  </h3>
                                  <p className="application-text">
                                    {item?.created_at?.slice(0, 10)}
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
                                    {t("status")}
                                  </h3>
                                  <p className="status-progress text-capitalize">
                                    Under Review
                                  </p>
                                </div>
                              </Col>
                              {item?.client_type == "company" && (
                                <Col md={3} className="mb-3">
                                  <div>
                                    <h3 className="application-heading">
                                      Company Tax id
                                    </h3>
                                    <p className="application-text">
                                      {item?.company_tax_id}
                                    </p>
                                  </div>
                                </Col>
                              )}

                              <Col md={3} className="mb-3">
                                <div>
                                  <h3 className="application-heading">
                                    Contact Person name
                                  </h3>
                                  <p className="application-text">
                                    ---
                                  </p>
                                </div>
                              </Col>
                              <Col md={3}>
                                <div>
                                  <h3 className="application-heading">
                                    Contact Person Email
                                  </h3>
                                  <p className="application-text">
                                    ---
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )) : <td colSpan={8}>
                <NoDataFound />
              </td>
              )}
            </tbody> */}
          </table>
        </div>
      </Tab.Pane>
    </>
  );
};

export default CommonApplicationTable;
