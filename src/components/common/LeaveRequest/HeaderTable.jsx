import moment from "moment";
import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import associateLogo from "../../../assets/img/aviox-logo.png";

function HeaderTable({ tableData, currentTab, handleApproveReject }) {
  
  return (
    <div>
      <table className="table time-table table-bordered table-ui-custom">
        <tbody>
          {tableData?.map((item, index) => (
            <tr>
              <td className="time-table-data text-start">
                <div className="d-flex align-items-center gap-2 white-nowrap">
                  <div className="user-imgbx application-imgbx mx-0 mb-0">
                    {/* <img src={userImage} className="user-img" /> */}
                  </div>
                  {item?.contract?.developer?.name}
                </div>
              </td>
              <td className="time-table-data text-start">
                <h4 className="leave-type-heading mb-0 white-nowrap">
                  {item?.type}
                </h4>
              </td>
              <td className="time-table-data text-start">
                <p className="leave-date white-nowrap">
                  {moment(item?.start_date).format("MM-DD-YYYY")} to{" "}
                  {moment(item.end_date).format("MM-DD-YYYY")}
                </p>
              </td>
              <td className="time-table-data text-start reason-data">
                <p className="font-14 mb-0">{item?.reason_for_leave}</p>
              </td>
              <td className="time-table-data text-start white-nowrap">
                AI Bot Project
              </td>
              <td className="time-table-data text-start">
                <OverlayTrigger placement="bottom" overlay={Tooltip}>
                  <div className="text-start">
                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                      <img src={associateLogo} className="user-img" />
                    </div>
                  </div>
                </OverlayTrigger>
              </td>
              <td className="time-table-data text-start">
                {currentTab === "third" ? (
                  <span className="status-finished">
                    {item?.approval_status}
                  </span>
                ) : (
                  <div className="d-flex justify-content-start gap-2">
                    <OverlayTrigger placement="bottom" overlay={Tooltip}>
                      <Button
                        variant="transparent"
                        className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none"
                        onClick={() => handleApproveReject("approve")}
                      >
                        <IoCheckmark />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={Tooltip}>
                      <Button
                        variant="transparent"
                        className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none"
                        onClick={() => handleApproveReject("reject")}
                      >
                        <IoCloseOutline />
                      </Button>
                    </OverlayTrigger>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HeaderTable;
