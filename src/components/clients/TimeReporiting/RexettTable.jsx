import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Tooltip } from "react-bootstrap";
import RexettButton from "../../atomic/RexettButton";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import ScreenLoader from "../../atomic/ScreenLoader";
import NoDataFound from "../../atomic/NoDataFound";
import { approvedClient } from "../../../redux/slices/developerDataSlice";
import userImage from "../../../assets/img/user-img.jpg";
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import moment from "moment";
import SingleTimeReporting from "./SingleTimeReporting";
import ConfirmationModal from "../../../pages/views/Modals/ConfirmationModal";
import {
  getReconciliationData,
  timeReporting,
} from "../../../redux/slices/clientDataSlice";
import remarkIcon from "../../../assets/img/remarks-icon.svg";
import { OverlayTrigger } from "react-bootstrap/esm";
import TimeReportRemark from "./TimeReportRemark";
import Guidelines from "../../common/Guidelines/Guidelines";
import { TIME_REPORTING } from "./constant";

const RexettTable = ({ selectedPeriod, headerColumn, data, role, page }) => {
  const [show, setShow] = useState(false);
  const [contractId, setContractID] = useState(null);
  const [isAnyReportEmpty, setIsAnyReportEmpty] = useState(false);
  const [selectedApprovedBtn, setSelectedApprovedBtn] = useState(null);
  const [approvedConfirmation, setApprovedConfirmation] = useState({
    isApproved: false,
    approvedId: null,
    startDate: null,
    endDate: null,
  });
  const [currentDetails, setCurrentDetails] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (data, index, isOff) => {
    if (!isOff?.is_off_day) {
      let memoDetails = data?.timeReports[index];
      let newData = {
        ...data,
        timeReports: memoDetails,
      };
      setCurrentDetails(newData);
      setShow(true);
    }
  };
  const isAnyTimeReportingEmpty = (timeReports) => {
    const index = timeReports?.findIndex(
      (curElem) =>
        !curElem?.is_holiday && !curElem?.is_off_day && !curElem?.memo
    );
    if (index === -1) {
      setIsAnyReportEmpty(false);
    } else {
      setIsAnyReportEmpty(true);
    }
  };
  const viewremark = <Tooltip id="tooltip">View Reconciliation</Tooltip>;

  const [remarkshow, setremarkShow] = useState(false);
  const handleremarkClose = () => setremarkShow(false);

  function filterReportDataByDate(reportData) {
    const today = new Date().toISOString().split('T')[0];
    return reportData.filter(entry => 
        entry.report_date <= today && 
        (!entry.is_off_day || entry.is_holiday)
    );
}

  const handleremarkShow = (data, index) => {

    let memoDetails = data?.timeReports[index];
    let newData = {
      ...data,
      timeReports: memoDetails,
      allSelectedTimeReport: filterReportDataByDate(data?.timeReports),
    };
    if (role == "client") {
      dispatch(getReconciliationData(data?.contractDetails?.contract_id));
    }
    setCurrentDetails(newData);
    setContractID(newData?.contractDetails?.contract_id);
    setremarkShow(true);
  };
  const { approvedLoader, smallLoader } = useSelector(
    (state) => state.developerData
  );
  const dispatch = useDispatch();
  const submitApproved = (id, index, startDate, endDate) => {
    setApprovedConfirmation({
      isApproved: true,
      approvedId: id,
      startDate: startDate,
      endDate: endDate,
    });
    // setSelectedApprovedBtn(index)
    // dispatch(approvedClient(id,role))
  };

  const handleCloseApproveModal = () => {
    setIsAnyReportEmpty(null);
    setApprovedConfirmation({
      isApproved: false,
      approvedId: null,
      startDate: null,
      endDate: null,
    });
  };

  const handleTimeSheetApprove = (e) => {
    e.preventDefault();
    const payload = {
      startDate: approvedConfirmation?.startDate,
      endDate: approvedConfirmation?.endDate,
    };
    dispatch(
      approvedClient(approvedConfirmation?.approvedId, payload, role, () => {
        setApprovedConfirmation({
          isApproved: false,
          approvedId: null,
        });
        let filterData = {
          page: page,
        };
        dispatch(timeReporting(filterData, role));
      })
    );
  };

  const currentTextData = (role, isApproved) => {
    if (role == "client") {
      if (isApproved) {
        return "Approved";
      } else {
        return "Submit & Approve";
      }
    } else {
      if (isApproved) {
        return "Approved";
      } else {
        return "Submit";
      }
    }
  };
  const shouldDisable = (isApproved) => {
    if (role == "client") {
      if (isApproved) {
        return true;
      } else {
        return false;
      }
    } else if (role == "developer") {
      if (isApproved) {
        return true;
      } else {
        return false;
      }
    }
  };
  // const isTodayMonthEnd = () => {
  //   const today = new Date();
  //   const lastDayOfMonth = new Date(
  //     today.getFullYear(),
  //     today.getMonth() + 1,
  //     0
  //   ); // The 0th day of the next month is the last day of the current month
  //   return today.getDate() === lastDayOfMonth.getDate();
  // };
  const isTodayFriday = () => {
    const today = new Date();
    // const isFriday = today.getDay() === 5; 
    return today.getDay() === 5
  }
  return (
    <>
      <div className={`weekly-report-table ${selectedPeriod}`}>
        <div className="table-responsive">
          {smallLoader ? (
            <ScreenLoader />
          ) : data?.length > 0 ? (
            <table className="table time-table table-bordered table-ui-custom">
              <thead>
                <th className="time-table-head">
                  <span>
                    {role !== "developer" ? "Developer Name" : "Client Name"}
                  </span>
                </th>

                {headerColumn?.map((item, index) => {
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
                {/* <th className="time-table-head">
                                        <span>Contract</span>
                                    </th> */}
                {/* <th className="time-table-head">
                                        <span>Project</span>
                                    </th> */}
                { role=="developer" &&<th className="time-table-head">
                  <span>Timesheet</span>
                </th>}
                <th className="time-table-head">
                  <span>Reconciliation</span>
                </th>
                {selectedPeriod == "weekly" && role!=="developer" ? (
                  <th className="time-table-head">
                    <span>Submit</span>
                  </th>
                ) : (
                  ""
                )}
              </thead>

              <tbody>
                {data?.length > 0 ? (
                  data?.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td className="time-table-data">
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex gap-2 align-items-center white-nowrap">
                                <div className="position-relative">
                                  <img
                                    src={
                                      item?.contractDetails?.user_details
                                        ?.profile_picture
                                        ? item?.contractDetails?.user_details
                                            ?.profile_picture
                                        : userImage
                                    }
                                    className="developer-img"
                                    alt=""
                                  />
                                  {/* <span className="number-count overlay">
                                    1
                                  </span> */}
                                </div>{" "}
                                {item?.contractDetails?.user_details?.name}
                              </div>
                            </div>
                          </td>
                          {item?.timeReports?.map((reprt, inx) => {
                            if (reprt.report_date) {
                              return (
                                <>
                                  <td
                                    onClick={() => handleShow(item, inx, reprt)}
                                    className={`time-table-data white-nowrap ${
                                      reprt?.is_public_holiday
                                        ?  "holiday-data" :
                                        reprt.is_off_day ?
                                        "offday-data"
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
                                        {reprt.start_time && reprt?.end_time
                                          ? `${moment(
                                              reprt?.start_time,
                                              "HH:mm"
                                            ).format("h:mm A")} - ${moment(
                                              reprt?.end_time,
                                              "HH:mm"
                                            ).format("h:mm A")} `
                                          : reprt?.is_holiday
                                          ? "Holiday"
                                          :  reprt?.is_public_holiday ? reprt?.holiday_name:reprt?.is_off_day ? "Leave" :""}
                                      </span>
                                      {reprt?.memo && (
                                        <p className="memo-text">
                                          {reprt?.memo ? reprt?.memo : ""}
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
                                    onClick={() => handleShow(item, inx, reprt)}
                                    className={`time-table-data white-nowrap ${
                                      reprt.is_off_week
                                        ? "offday-data"
                                        : "workday-data"
                                    }`}
                                  >
                                    <div>
                                      {reprt?.duration
                                        ? `${reprt?.duration.toFixed("2")} hr`
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
                                    onClick={() => handleShow(item, inx, reprt)}
                                    className={`time-table-data white-nowrap ${
                                      reprt.is_off_month
                                        ? "offday-data"
                                        : "workday-data"
                                    }`}
                                  >
                                    <div>
                                      {reprt?.duration
                                        ? `${reprt?.duration.toFixed("2")} hr`
                                        : "Holiday"}
                                    </div>
                                  </td>
                                  {/* <td className={`time-table-data ${reprt.is_off_year ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
                                </>
                              );
                            }
                          })}
                          <td className="time-table-data">
                            {item?.totalDuration > 0
                              ? item?.totalDuration.toFixed("2")
                              : item?.totalDuration}
                            hr
                          </td>
                          {/* <td className="time-table-data white-nowrap">{item?.contractDetails?.employment_type}</td> */}
                          {/* <td className="time-table-data">
                                                        <span className={item?.is_complete ? "status-progress white-nowrap" : "status-finished white-nowrap"}>{item?.is_complete ? "Progress" : "Finished"}</span>
                                                    </td> */}
                          {role=="developer" &&<td className="time-table-data">
                            <span className="status-progress white-nowrap">
                              {item?.isApproved ? "Reviewed" : "Under Review"}
                            </span>
                          </td>}
                          <td className="time-table-data">
                            <button
                              // disabled={item?.isApproved || !isTodayFriday()}
                              onClick={() => {
                                handleremarkShow(item, index);
                              }}
                              className="remarks-text position-relative white-nowrap removeBtnStyles"
                            >
                              {item?.contractDetails?.remarks?.length > 0 ? (
                                <img src={remarkIcon} className="remark-icon" />
                              ) : (
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={viewremark}
                                >
                                  <img
                                    src={remarkIcon}
                                    className="remark-icon"
                                  />
                                </OverlayTrigger>
                              )}{" "}
                              {/* <span className="number-count overlay">1</span> */}
                            </button>
                          </td>

                          {selectedPeriod == "weekly" && role!=="developer" ? (
                            <td className="time-table-data">
                              {item?.isApproved ? (
                                <span className="status-finished">
                                  Approved
                                </span>
                              ) : (
                                <RexettButton
                                  type="submit"
                                  text={currentTextData(role, item?.isApproved)}
                                  className={`outline-main-btn white-nowrap px-2 font-13`}
                                  variant="transparent"
                                  disabled={shouldDisable(item?.isApproved)}
                                  onClick={() => {
                                    isAnyTimeReportingEmpty(item?.timeReports);
                                    submitApproved(
                                      item?.contractDetails?.contract_id,
                                      index,
                                      item?.startDate,
                                      item?.endDate
                                    );
                                  }}
                                  isLoading={
                                    selectedApprovedBtn === index
                                      ? approvedLoader
                                      : false
                                  }
                                />
                              )}
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <td colSpan={17}> <div className="simple-no-data"><NoDataFound /></div>  </td>
                )}
              </tbody>
            </table>
          ) : (
            <td colSpan={10}> <div className="simple-no-data"><NoDataFound /></div>  </td>
          )}
        </div>
        <Offcanvas
          className="time-detail-sidepanel"
          show={show}
          onHide={handleClose}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Time Reporting</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {selectedPeriod == "weekly" && (
              <SingleTimeReporting
                currentDetails={currentDetails}
                selectedPeriod={selectedPeriod}
                role={role}
              />
            )}

            {selectedPeriod == "monthly" && (
              <SingleTimeReporting
                currentDetails={currentDetails}
                selectedPeriod={selectedPeriod}
                role={role}
              />
            )}

            {/* { selectedPeriod == "yearly" &&  <SingleTimeReporting currentDetails={currentDetails} selectedPeriod={selectedPeriod}/> } */}
            {selectedPeriod == "yearly" && (
              <SingleTimeReporting
                currentDetails={currentDetails}
                selectedPeriod={selectedPeriod}
                role={role}
              />
            )}
          </Offcanvas.Body>
        </Offcanvas>
        {remarkshow ? (
          <TimeReportRemark
            contractId={contractId}
            remarkshow={remarkshow}
            handleremarkClose={handleremarkClose}
            currentDetails={currentDetails}
            page={page}
            role={role}
            selectedPeriod={selectedPeriod}
          />

        ) : (
          ""
        )}
        <ConfirmationModal
          text={
            isAnyReportEmpty
              ? `Are you sure to submit this time sheet ? It looks like you haven't written your work status for all the days of the week.`
              : "Are you sure you want to submit this time sheet?"
          }
          show={approvedConfirmation?.isApproved}
          startDate={approvedConfirmation?.startDate}
          endDate={approvedConfirmation?.endDate}
          handleClose={handleCloseApproveModal}
          onClick={handleTimeSheetApprove}
          smallLoader={approvedLoader}
        />
      </div>
      {/* <div className="helper-text-section">
        <h3>Guiding You Through: Helpful Text to Navigate Time Reporting</h3>
        <ol className="ps-3 mb-0">
          <li className="mb-2">
            <p>All developers must check in before starting their workday.</p>
          </li>
          <li className="mb-2">
            <p>
              All developers must submit their time-sheets before the end of
              Friday.
            </p>
          </li>
          <li className="mb-2">
            <p>Please Check out at the end of your workday.</p>
          </li>
          <li className="mb-2">
            For Developers, Reconciliation get enable on every Friday.
          </li>
          <li className="mb-2">
            <p>
              Developers may work on weekends and reconcile their Time-sheets.
            </p>
          </li>
        </ol>
      </div> */}
      <Guidelines heading={"Guiding You Through: Helpful Text to Navigate Time Reporting"} guideLines={TIME_REPORTING}/>
    </>
  );
};

export default RexettTable;
