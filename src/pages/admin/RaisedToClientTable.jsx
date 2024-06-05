import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { HiDownload } from "react-icons/hi";
import userImage from "../../assets/img/user-img.jpg";
import associateLogo from "../../assets/img/aviox-logo.png";
import { FaRegEye } from "react-icons/fa6";
const RaisedToClientTable = ({ columns, data ,isRaisedByDevAndVendor = false }) => {
  const companyname = (
    <Tooltip id="tooltip">Aviox Technologies Pvt Ltd</Tooltip>
  );
  const downloadinvoice = <Tooltip id="tooltip"> Download Invoice</Tooltip>;
  const handleDownload = (e, resume) => {
    e.stopPropagation();
    window.open(resume, "_blank");
  };
  const getDataForVendor = () => {
    const arr = data?.map((curElem,idx)=>curElem.contracts[0])
    return arr;
  }
  const viewtimesheet = <Tooltip id="tooltip">View Timesheet</Tooltip>;
  const dataToMap = (isRaisedByDevAndVendor) ? (getDataForVendor()) : data?.[0]?.contracts

  const handleRaiseInvoice = () => {};

  return (
    <div className="table-responsive">
      <table className="table time-table table-bordered table-ui-custom">
        <thead>
          {columns.map(({ label }, idx) => (
            <th key={idx} className="time-table-head text-start text-uppercase">
              {label}
            </th>
          ))}
        </thead>
        <tbody>
          {dataToMap?.map((curData, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map(({ key, subkey, isStatus }) => (
                <>
                  {subkey ? (
                    <td className="time-table-data text-start">
                      <div className="d-flex align-items-center gap-2">
                        <div className="user-imgbx application-imgbx mx-0 mb-0">
                          <img
                            src={curData[subkey] ? curData[subkey] : "/demo-user.png"}
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
                  ) : key === "invoice_status" ? (
                    <td className="time-table-data text-start">
                      {
                        <span
                          className={`white-nowrap ${
                            curData?.[key]
                              ? "status-finished"
                              : "status-progress"
                          }`}
                        >
                          {curData?.[key] ? "Paid" : "Unpaid"}
                        </span>
                      }
                    </td>
                  ) : key === "invoice" ? (
                    <td>
                      {curData?.invoice ? (
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
                          curData?.invoice_status === false && (
                            <Button
                              disabled
                              className="main-btn px-3 py-1 font-14"
                            >
                              Invoice Raised
                            </Button>
                          )
                        )
                      ) : (
                        <Button
                          className="main-btn px-3 py-1 font-14"
                          onClick={() => {
                            handleRaiseInvoice();
                          }}
                        >
                          Raise Invoice
                        </Button>
                      )}
                    </td>
                  ) : key === "timesheet_status" ? (
                    <td>
                      <div className="d-flex gap-2 align-items-center justify-content-between">
                        <span className={`white-nowrap ${curData?.[key] ? "status-finished" :"status-progress"} `}>
                          {curData?.[key] ? "Approved" : "Under Review"}
                        </span>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={viewtimesheet}
                        >
                          <Button
                            variant="transparent"
                            className="main-btn view-time-btn"
                          >
                            <FaRegEye />
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
          ))}

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
  );
};

export default RaisedToClientTable;
