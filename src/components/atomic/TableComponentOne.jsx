import React, { Fragment } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import paidInvoice from "../../assets/img/invoice_paid.png";
import unpaidInvoice from "../../assets/img/invoice_unpaid.png";
import timeSheetNotApproved from "../../assets/img/timesheet_notapproved.png";
import timeSheetApproved from "../../assets/img/timesheet_approved.png";
import NoDataFound from "./NoDataFound";
import RexettPagination from "./RexettPagination";
import { useTranslation } from "react-i18next";

const TableComponentOne = ({ data, columns, page, setPage, totalPages}) => {
  const { t } = useTranslation()
  const downloadtimesheet = <Tooltip id="tooltip">Download Timesheet</Tooltip>;
  const downloadinvoice = <Tooltip id="tooltip">Download Invoice</Tooltip>;

  const handleDownload = (fileUrl) => {
    if (fileUrl) {
      const newTab = window.open(fileUrl, "_blank");
      if (newTab) {
        newTab.focus();
      } else {
        alert(
          "Please allow pop-ups for this site to download the file in a new tab." 
        );
      }
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
                  {columns?.map(
                    ({
                      key,
                      subkey,
                      profilePictureKey,
                      isStatus,
                      isHours,
                      isAction,
                      timesheetStatusKey,
                      invoiceUrlKey,
                      invoiceStatusKey,
                      timeSheetUrlKey,
                    },index) => (
                      <Fragment key={index}>
                        {profilePictureKey ? (
                          <td className="time-table-data text-start">
                            <div className="d-flex align-items-center gap-2">
                              <div className="user-imgbx application-imgbx mx-0 mb-0">
                                <img
                                  src={
                                    curData?.[key][profilePictureKey]
                                      ? curData[key][profilePictureKey]
                                      : "/demo-user.png"
                                  }
                                  className="user-img"
                                />
                              </div>
                              {curData[key][subkey]}
                            </div>
                          </td>
                        ) : isStatus ? (
                          <td className="time-table-data text-start">
                            {curData?.[key]?.[subkey] && (
                              <span
                                className={`white-nowrap text-capitalize ${
                                  curData?.[key]?.[subkey] === "Progress" ||
                                  curData?.[key]?.[subkey] === "progress"
                                    ? "status-progress"
                                    : "status-finished"
                                }`}
                              >
                                {curData?.[key]?.[subkey]}
                              </span>
                            )}
                          </td>
                        ) : isAction ? (
                          <td className="time-table-data text-start">
                            <div className="d-flex align-items-center gap-2">
                              <OverlayTrigger
                                placeholder="bottom"
                                overlay={downloadtimesheet}
                              >
                                <img
                                // may be need to check condition after getting data from API
                                  src={curData[timesheetStatusKey]==="pending" ? timeSheetNotApproved: timeSheetApproved}
                                  className="approved_icon pointer"
                                  onClick={() => {
                                    handleDownload(curData[timeSheetUrlKey]);
                                  }}
                                />
                              </OverlayTrigger>
                              <OverlayTrigger
                                placeholder="bottom"
                                overlay={downloadinvoice}
                              >
                                <img
                                  src={curData?.[invoiceStatusKey] === "pending" ? unpaidInvoice : paidInvoice}
                                  className="approved_icon pointer"
                                  onClick={() => {
                                    handleDownload(curData[invoiceUrlKey]);
                                  }}
                                />
                              </OverlayTrigger>
                            </div>
                          </td>
                        ) : key === "invoiceMonth" ? (
                          <td className="time-table-data text-start">
                            <div className="d-flex align-items-center gap-2">
                              {curData?.[key]}
                            </div>
                          </td>
                        ) : (
                          <td className="time-table-data text-start">
                            <div className="d-flex align-items-center gap-2">
                              {curData?.[key]?.[subkey]} {isHours && "hrs" }
                            </div>
                          </td>
                        )}
                      </Fragment>
                    )
                  )}
                </tr>
              ))
            ) : (
              <td colSpan={10}> <div className="simple-no-data"><NoDataFound /></div>  </td>
            
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 ? (
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
          <p className="showing-result">
            {t("showing")} {data?.length} {t("results")}
          </p>
          <RexettPagination number={totalPages} page={page} setPage={setPage} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TableComponentOne;
