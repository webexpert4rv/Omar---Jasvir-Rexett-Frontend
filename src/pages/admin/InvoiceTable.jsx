import React, { Fragment } from "react";
import NoDataFound from "../../components/atomic/NoDataFound";
import timeSheetIcon from "../../assets/img/timesheet_approved.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import invoiceIcon from "../../assets/img/invoice_paid.png";
import invoicePendingIcon from "../../assets/img/invoice_unpaid.png";

const InvoiceTable = ({ data, columns, isRaisedByDev = false }) => {
  const downloadtimesheet = <Tooltip id="tooltip">Download Timesheet</Tooltip>;
  const downloadinvoice = <Tooltip id="tooltip">Download Invoice</Tooltip>;

  const handleDownload = (fileUrl) => {
    const newTab = window.open(fileUrl, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      // If the popup blocker prevents opening the new tab
      alert(
        "Please allow pop-ups for this site to download the file in a new tab."
      );
    }
  };
  return (
    <>
      <div className="table-responsive">
        <table className="table time-table table-bordered table-ui-custom">
          <thead>
            {columns?.length > 0 &&
              columns?.map(({ label }, idx) => (
                <th
                  key={idx}
                  className="time-table-head text-start text-uppercase"
                >
                  {label}
                </th>
              ))}
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((curData, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map(({ key, subKey, isAction }, idx) => (
                    <Fragment key={idx}>
                      {subKey ? (
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img
                                src={
                                  curData[subKey]
                                    ? curData[subKey]
                                    : "/demo-user.png"
                                }
                                className="user-img"
                              />
                            </div>
                            {curData?.[key]}
                          </div>
                        </td>
                      ) : key === "projectStatus" ? (
                        <td className="time-table-data text-start">
                          {
                            <span
                              className={`white-nowrap text-capitalize ${
                                curData?.[key]
                                  ? curData?.[key] === "ended"
                                    ? "status-finished"
                                    : "status-progress"
                                  : ""
                              }`}
                            >
                              {curData?.[key] === "ended"
                                ? "Completed"
                                : curData?.[key]}
                            </span>
                          }
                        </td>
                      ) : key === "associatedWith" ? (
                        <td className="time-table-data">
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span
                              className={`${
                                curData?.[key] && "associate"
                              } mb-1 font-14`}
                            >
                              {curData?.[key]}
                            </span>
                          </p>
                        </td>
                      ) : isAction ? (
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            {isRaisedByDev && (
                              <OverlayTrigger
                                placeholder="bottom"
                                overlay={downloadtimesheet}
                              >
                                <img
                                  onClick={() => {
                                    // handleDownload(curData?.[timeSheetUrlkey]);
                                  }}
                                  //   src={curData?.[timeSheetUrlkey] ? timeSheetIcon :}
                                  src={timeSheetIcon}
                                  className="approved_icon"
                                />
                              </OverlayTrigger>
                            )}
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadinvoice}
                            >
                              <img
                                onClick={() => {
                                  handleDownload(curData?.["invoiceUrl"]);
                                }}
                                src={
                                  curData?.[key] === "pending"
                                    ? invoicePendingIcon
                                    : invoiceIcon
                                }
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                      ) : (
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            {curData?.[key]} {key === "totalHours" && "hrs"}
                          </div>
                        </td>
                      )}
                    </Fragment>
                  ))}
                </tr>
              ))
            ) : (
              <NoDataFound />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvoiceTable;
