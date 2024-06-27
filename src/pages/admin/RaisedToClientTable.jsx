import React, { Fragment, useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { HiDownload } from "react-icons/hi";
import userImage from "../../assets/img/user-img.jpg";
import associateLogo from "../../assets/img/aviox-logo.png";
import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import NoDataFound from "../../components/atomic/NoDataFound";
import { useDispatch, useSelector } from "react-redux";
import { timeReporting } from "../../redux/slices/clientDataSlice";
import { weeklyTimeReports } from "../../components/clients/TimeReporiting/constant";
import moment from "moment";
import { useTranslation } from "react-i18next";
import RexettPagination from "../../components/atomic/RexettPagination";
import { getDeveloperTimeReport } from "../../redux/slices/adminDataSlice";
import RexettSpinner from "../../components/atomic/RexettSpinner";
import InvoicePaidModal from "./Modals/InvoicePaid";

const RaisedToClientTable = ({
  columns,
  totalPages,
  data,
  page,
  setPage,
  isRaisedByDevAndVendor = false,
}) => {
  const { t } = useTranslation();
  const { timeReportDetails, developerTimeReport, smallLoader } = useSelector(
    (state) => state.adminData
  );
  const [expandedRow, setExpandedRow] = useState(null);
  const [iconActive, setIconActive] = useState(null);
  const dispatch = useDispatch();
  const [showInvoicePaidModal, setShowInvoicePaidModal] = useState(false);
  const toggleInvoicePaidModal = () =>
    setShowInvoicePaidModal(!showInvoicePaidModal);
  useEffect(() => {
    // dispatch(timeReporting({}, "developer"));
  }, []);
  const companyname = (
    <Tooltip id="tooltip">Aviox Technologies Pvt Ltd</Tooltip>
  );
  const downloadinvoice = <Tooltip id="tooltip"> Download Invoice</Tooltip>;
  const handleDownload = (e, resume) => {
    e.stopPropagation();
    window.open(resume, "_blank");
  };
  const getDataForVendor = () => {
    const arr = data?.map((curElem, idx) => curElem.contracts[0]);
    return arr;
  };
  const viewtimesheet = <Tooltip id="tooltip">View Timesheet</Tooltip>;
  const closetimesheet = <Tooltip id="tooltip">Close Timesheet</Tooltip>;

  const dataToMap = data[0]?.invoices;

  const handleRaiseInvoice = () => {};
  const handleViewTimesheet = (id, idx) => {
    dispatch(
      getDeveloperTimeReport(id, (timesheet) => {
        setExpandedRow(
          expandedRow?.index === idx
            ? null
            : { index: idx, item: timesheet ? timesheet : null }
        );
        setIconActive(idx == iconActive ? null : idx);
      })
    );
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table time-table table-bordered table-ui-custom">
          <thead>
            {columns.map(({ label }, idx) => (
              <th
                key={idx}
                className="time-table-head text-start text-uppercase"
              >
                {label}
              </th>
            ))}
          </thead>
          <tbody>
            {dataToMap?.length > 0 ? (
              dataToMap?.map((curData, rowIdx) => (
                <Fragment key={rowIdx}>
                  <tr>
                    {columns.map(({ key, subkey }) => (
                      <>
                        {subkey ? (
                          <td className="time-table-data text-start">
                            <div className="d-flex align-items-center gap-2">
                              <div className="user-imgbx application-imgbx mx-0 mb-0">
                                <img
                                  src={
                                    curData[subkey]
                                      ? curData[subkey]
                                      : "/demo-user.png"
                                  }
                                  className="user-img"
                                />
                              </div>
                              {curData?.[key]}
                            </div>
                          </td>
                        ) : key === "associated_with" ? (
                          <td className="time-table-data">
                            <p className="associate-text font-14 mt-2 mb-2">
                              <span className="associate mb-1 font-14">
                                {curData?.[key]}
                              </span>
                            </p>
                          </td>
                        ) : key === "invoiceStatus" ? (
                          <td className="time-table-data text-start">
                            {
                              <span
                                className={`white-nowrap ${
                                  curData?.[key] === "pending"
                                    ? "status-progress"
                                    : "status-finished"
                                }`}
                              >
                                {curData?.[key]}
                              </span>
                            }
                          </td>
                        ) : key === "invoice" ? (
                          <td>
                            {/* {curData?.invoice ? (
                              // true or may be paid
                              curData?.invoice_status === true ? (
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={downloadinvoice}
                                >
                                  <Button
                                    variant="transparent"
                                    className="arrow-btn primary-arrow"
                                    onClick={handleDownload}
                                  >
                                    <HiDownload />
                                  </Button>
                                </OverlayTrigger>
                              ) : (
                                curData?.invoiceStatus === "pending" && (
                                  <Button
                                    disabled
                                    className="main-btn px-3 py-1 font-14"
                                  >
                                    Pay Invoice
                                  </Button>
                                )
                              )
                            ) : (
                              <Button
                                className="main-btn px-3 py-1 font-14"
                                 onClick={toggleInvoicePaidModal}
                              >
                                Pay Invoice
                              </Button>
                            )} */}
                            {curData?.invoiceUrl ? (
                              curData?.invoiceStatus === "approved" ? (
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={downloadinvoice}
                                >
                                  <Button
                                    variant="transparent"
                                    className="arrow-btn primary-arrow"
                                    onClick={handleDownload}
                                  >
                                    <HiDownload />
                                  </Button>
                                </OverlayTrigger>
                              ) : (
                                <Button
                                  className="main-btn px-3 py-1 font-14"
                                  onClick={toggleInvoicePaidModal}
                                >
                                  Pay Invoice
                                </Button>
                              )
                            ) : (
                              <Button
                                className="main-btn px-3 py-1 font-14"
                                disabled
                              >
                                Pay Invoice
                              </Button>
                            )}
                          </td>
                        ) : key === "timesheet_status" ? (
                          <td>
                            <div className="d-flex gap-2 align-items-center justify-content-between">
                              <span
                                className={`white-nowrap ${
                                  curData?.[key]
                                    ? "status-finished"
                                    : "status-progress"
                                } `}
                              >
                                {curData?.[key] ? "Approved" : "Under Review"}
                              </span>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  iconActive === rowIdx
                                    ? closetimesheet
                                    : viewtimesheet
                                }
                              >
                                <Button
                                  onClick={() => {
                                    handleViewTimesheet(
                                      curData?.developer_id,
                                      rowIdx
                                    );
                                  }}
                                  variant="transparent"
                                  className="main-btn view-time-btn"
                                >
                                  {iconActive === rowIdx ? (
                                    <FaEyeSlash />
                                  ) : (
                                    <FaRegEye />
                                  )}
                                </Button>
                              </OverlayTrigger>
                            </div>
                          </td>
                        ) : key === "project_status" ? (
                          <td className="time-table-data text-start">
                            {
                              <span
                                className={`white-nowrap ${
                                  curData?.[key]
                                    ? "status-finished"
                                    : "status-progress"
                                }`}
                              >
                                {curData?.[key] ? "Completed" : "In-progress"}
                              </span>
                            }
                          </td>
                        ) : (
                          <td className="time-table-data text-start">
                            {curData?.[key]}
                            {key === "total_hours" && " hrs"}
                          </td>
                        )}
                      </>
                      // (key === "") && (
                      //   <td className="time-table-data">
                      //   <p className="associate-text font-14 mt-2 mb-2">
                      //     <span className="associate mb-1 font-14">{curData?.[key]}</span>
                      //   </p>
                      // </td>
                      // )
                    ))}
                  </tr>
                  {smallLoader ? (
                    <RexettSpinner />
                  ) : (
                    // <h5>Developer timesheet</h5>
                    expandedRow?.index === rowIdx && (
                      <tr>
                        <td colSpan={9}>
                          <table className="table time-table table-bordered table-ui-custom">
                            <thead>
                              {weeklyTimeReports(expandedRow?.item, "weekly")
                                .length > 0 &&
                                weeklyTimeReports(
                                  expandedRow?.item,
                                  "weekly"
                                )?.map((item, index) => {
                                  return (
                                    <>
                                      <th className="time-table-head">
                                        <span>{item} </span>
                                      </th>
                                    </>
                                  );
                                })}
                              <th className="time-table-head">
                                <span>Total Hours</span>
                              </th>
                            </thead>
                            <tr
                              className={`collapsible-row ${
                                expandedRow?.index === rowIdx ? "open" : ""
                              }`}
                            >
                              {expandedRow?.item &&
                              Object.keys(expandedRow?.item)?.length > 0 ? (
                                <>
                                  {expandedRow?.item?.timeReports?.map(
                                    (reprt, inx) => {
                                      if (reprt.report_date) {
                                        return (
                                          <>
                                            <td
                                              className={`time-table-data white-nowrap ${
                                                reprt.is_off_day
                                                  ? "offday-data"
                                                  : "workday-data"
                                              }`}
                                            >
                                              <div>
                                                <span
                                                  className={`${
                                                    reprt.is_off_day
                                                      ? ""
                                                      : "timing-text d-inline-block"
                                                  }`}
                                                >
                                                  {reprt.start_time &&
                                                  reprt?.end_time
                                                    ? `${moment(
                                                        reprt?.start_time,
                                                        "HH:mm"
                                                      ).format(
                                                        "h:mm A"
                                                      )} - ${moment(
                                                        reprt?.end_time,
                                                        "HH:mm"
                                                      ).format("h:mm A")} `
                                                    : reprt?.is_holiday
                                                    ? "Holiday"
                                                    : reprt?.is_off_day
                                                    ? "Leave"
                                                    : reprt?.is_public_holiday
                                                    ? reprt?.holiday_name
                                                    : ""}
                                                </span>
                                                {reprt?.memo && (
                                                  <p className="memo-text">
                                                    {reprt?.memo
                                                      ? reprt?.memo
                                                      : ""}
                                                  </p>
                                                )}
                                              </div>
                                            </td>
                                          </>
                                        );
                                      } else if (reprt?.week) {
                                        return (
                                          <>
                                            <td
                                              className={`time-table-data white-nowrap ${
                                                reprt.is_off_week
                                                  ? "offday-data"
                                                  : "workday-data"
                                              }`}
                                            >
                                              <div>
                                                {reprt?.duration
                                                  ? `${reprt?.duration.toFixed(
                                                      "2"
                                                    )} hr`
                                                  : "Holiday"}
                                              </div>
                                            </td>
                                            {/* <td className={`time-table-data ${reprt.is_off_month ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
                                          </>
                                        );
                                      } else {
                                        return (
                                          <>
                                            <td
                                              className={`time-table-data white-nowrap ${
                                                reprt.is_off_month
                                                  ? "offday-data"
                                                  : "workday-data"
                                              }`}
                                            >
                                              <div>
                                                {reprt?.duration
                                                  ? `${reprt?.duration.toFixed(
                                                      "2"
                                                    )} hr`
                                                  : "Holiday"}
                                              </div>
                                            </td>
                                            {/* <td className={`time-table-data ${reprt.is_off_year ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
                                          </>
                                        );
                                      }
                                    }
                                  )}
                                  <td className="time-table-data">
                                    {expandedRow?.item?.totalDuration > 0
                                      ? expandedRow?.item?.totalDuration.toFixed(
                                          "2"
                                        )
                                      : expandedRow?.item?.totalDuration}
                                    hr
                                  </td>
                                </>
                              ) : (
                                "No timesheet found"
                              )}
                            </tr>
                          </table>
                        </td>
                      </tr>
                    )
                  )}
                </Fragment>
              ))
            ) : (
              <NoDataFound />
            )}

            {/* <tr>
            <td className="time-table-data text-start">Figma to UI</td>
            <td className="time-table-data text-start">
              <div className="d-flex align-items-center gap-2">
                <div className="user-imgbx application-imgbx mx-0 mb-0">
                  <img src={userImage} className="user-img" />
                </div>
                Rohit Sharma
              </div>
            </td>
            <td className="time-table-data text-start">140 hrs</td>
            <td className="time-table-data text-start">Jan 2024</td>
            <td className="time-table-data">
              <p className="associate-text font-14 mt-2 mb-2">
                <span className="associate mb-1 font-14">Individual</span>
              </p>
            </td>
            <td className="time-table-data text-start">
              <span className="status-progress white-nowrap">Unpaid</span>
            </td>
            <td className="time-table-data text-start">
              <Button className="main-btn px-3 py-1 font-14" disabled>
                Invoice Raised
              </Button>
            </td>
          </tr>
          <tr>
            <td className="time-table-data text-start">Figma to UI</td>
            <td className="time-table-data text-start">
              <div className="d-flex align-items-center gap-2">
                <div className="user-imgbx application-imgbx mx-0 mb-0">
                  <img src={userImage} className="user-img" />
                </div>
                Rohit Sharma
              </div>
            </td>
            <td className="time-table-data text-start">140 hrs</td>
            <td className="time-table-data text-start">Jan 2024</td>
            <td className="time-table-data text-start">
              <OverlayTrigger placement="bottom" overlay={companyname}>
                <div className="text-center">
                  <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                    <img src={associateLogo} className="user-img" />
                  </div>
                </div>
              </OverlayTrigger>
            </td>
            <td className="time-table-data text-start">
              <span className="status-finished white-nowrap">Paid</span>
            </td>
            <td className="time-table-data text-start">
              <OverlayTrigger placement="bottom" overlay={downloadinvoice}>
                <Button 
                  variant="transparent"
                  className="arrow-btn primary-arrow"
                >
                  <HiDownload />
                </Button>
              </OverlayTrigger>
            </td>
          </tr> */}
          </tbody>
        </table>
      </div>
      {totalPages > 1 ? (
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
          <p className="showing-result">
            {/* {t("showing")} {timeReportDetails?.length} {t("results")} */}
          </p>
          <RexettPagination number={totalPages} setPage={setPage} page={page} />
        </div>
      ) : (
        ""
      )}
      {showInvoicePaidModal && (
        <InvoicePaidModal
          show={showInvoicePaidModal}
          handleClose={toggleInvoicePaidModal}
        />
      )}
    </>
  );
};

export default RaisedToClientTable;
