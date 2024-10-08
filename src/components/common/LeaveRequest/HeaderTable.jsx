import moment from "moment";
import React from "react";
import { Button, OverlayTrigger } from "react-bootstrap";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import associateLogo from "../../../assets/img/aviox-logo.png";
import ToolTip from "../Tooltip/ToolTip";
import { generateLeave } from "../../clients/TimeReporiting/constant";
import NoDataFound from "../../atomic/NoDataFound";
import userImg from "../../../assets/img/user-img.jpg";
import RexettButton from "../../atomic/RexettButton";
import RexettSpinner from "../../atomic/RexettSpinner";
import ScreenLoader from "../../atomic/ScreenLoader";

function HeaderTable({
  tableData,
  currentTab,
  handleApproveReject,
  approvedLoader,
  approveIndex,
  screenLoader,

}) {
  return (
    <div>
      {screenLoader ? <ScreenLoader/> : 
      tableData?.length > 0 ? (
        <table className="table time-table table-bordered table-ui-custom">
          <tbody>
            {tableData?.map((item, index) => (
              <tr>
                <td className="time-table-data text-start">
                  <div className="d-flex align-items-center gap-2 white-nowrap">
                    <div className="user-imgbx application-userbx">
                      <img
                        src={
                          item?.contract?.developer?.profile_picture
                            ? item?.contract?.developer?.profile_picture
                            : userImg
                        }
                        className="user-img"
                      />
                    </div>
                    <div className="user-imgbx application-imgbx mx-0 mb-0"></div>
                    {item?.contract?.developer?.name}
                  </div>
                </td>
                <td className="time-table-data text-start">
                  <h4 className="leave-type-heading mb-0 white-nowrap">
                    {generateLeave(item?.type)}
                  </h4>
                </td>
                <td className="time-table-data text-start">
                  <p className="leave-date white-nowrap">
                    {moment(item?.start_date).format("MM-DD-YYYY")} to
                    {moment(item.end_date).format("MM-DD-YYYY")}
                  </p>
                </td>
                <td className="time-table-data text-start reason-data">
                  <p className="font-14 mb-0">{item?.reason_for_leave}</p>
                </td>
                {/* <td className="time-table-data text-start white-nowrap">
                  AI Bot Project
                </td> */}
                {/* <td className="time-table-data text-start">
                  <ToolTip text="Aviox Technologies Pvt Ltd">
                    <div className="text-start">
                      <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                        <img src={associateLogo} className="user-img" />
                        ---
                      </div>
                    </div>
                  </ToolTip>
                </td> */}
                <td className="time-table-data text-start">
                  {currentTab !== "first" ? (
                    <span className="status-finished">
                      {item?.approval_status}
                    </span>
                  ) : (
                    <div className="d-flex justify-content-start gap-2">
                      <ToolTip text="Approve">
                        <RexettButton
                          variant="transparent"
                          className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none"
                          icon={approveIndex == index ? approvedLoader :  <IoCheckmark />}
                          onClick={() =>handleApproveReject(item?.id, "approved", index)}
                          isLoading = {approveIndex == index ? approvedLoader : false } 
                        />
                      </ToolTip>
                      <ToolTip text="Reject">
                        <RexettButton
                          variant="transparent"
                          className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none"
                          icon = { <IoCloseOutline />}
                          onClick={() =>
                            handleApproveReject(item?.id, "rejected" ,index)
                          }
                          // isLoading={  selectedRejectIndex == index ? approvedLoader: false}
                        >
                         
                        </RexettButton>
                      </ToolTip>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="simple-no-data"><NoDataFound /></div> 
      )}
    </div> 
  );
  
}

export default HeaderTable;
