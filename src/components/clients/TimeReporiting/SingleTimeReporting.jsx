import React, { useEffect, useState } from "react";

import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import moment from "moment";
import MemoWithTimeReport from "./MemoWithTimeReport";
import { Nav, Tab } from "react-bootstrap";

const SingleTimeReporting = ({ currentDetails, selectedPeriod, role }) => {
  const [updateWeeklyData, setUpdateWeeklyData] = useState();
  let {
    contractDetails: { user_details },
    endDate,
    startDate,
    timeReports: {
      end_time,
      start_time,
      memo,
      weeklyDetails,
      monthlyDetails,
      report_date,
      week,
      month,
    },
    totalDuration,
  } = currentDetails;

  useEffect(() => {
    if (weeklyDetails !== undefined) {
      setUpdateWeeklyData(weeklyDetails);
    } else if (monthlyDetails !== undefined) {
      setUpdateWeeklyData(monthlyDetails[0]?.weeklyDetails);
    }
  }, []);

  const selectCurrentTab = (select) => {
    let montData = monthlyDetails?.find((item) => item.week == select);
    setUpdateWeeklyData(montData?.weeklyDetails);
  };

  console.log(currentDetails,"weeklyDetails")
  console.log(month,"role")
  return (
    <>
      {selectedPeriod == "weekly" ? (
        <div className="detail-view day-view">
          <div className="client-info mb-3">
            <h4 className="sidebar-heading">
              {role !== "developer" ? "Developer Name" : "Client Name"}
            </h4>
            <p className="client-name-heading">
              <img src={user_details?.profile_picture} />
              {user_details?.name}
            </p>
          </div>
          <div className="client-info mb-3 d-`flex gap-5">
            <div className="mb-0">
              <p className="client-name-heading d-flex gap-1 align-items-center mb-2">
                <FiCalendar />
                {report_date}
              </p>
            </div>
            <div className="d-flex gap-4 justify-content-between">
              <div className="d-flex gap-3 align-items-center">
                <p className="client-name-heading d-flex gap-1 align-items-center">
                  <FaRegClock />
                  {start_time
                    ? moment(start_time, "HH:mm").format("h:mm A")
                    : "00:00"}
                </p>
                <p className="client-name-heading">-</p>
                <p className="client-name-heading d-flex gap-1 align-items-center">
                  <FaRegClock />
                  {start_time
                    ? moment(end_time, "HH:mm").format("h:mm A")
                    : "00:00"}
                </p>
              </div>
            </div>
          </div>
          <div class="weekly-detail">
            <div className="client-info">
              <h4 className="sidebar-heading">Memo</h4>
              <p className="client-name-heading">
                {memo ? memo : "Memo not found"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {selectedPeriod == "monthly" ? (
        <div className="detail-view weekly-view">
          <div className="client-info mb-3">
          {role !== "developer" ? "Developer Name" : "Client Name"}
            <p className="client-name-heading">
              <img src={user_details?.profile_picture} />
              {user_details?.name}
            </p>
          </div>
          {selectedPeriod == "monthly" ? (
            <div className="client-info mb-3 gap-5 d-flex align-items-center">
              <div className="mb-0">
                <p className="client-name-heading d-flex gap-1 align-items-center">
                  <FiCalendar />
                  {week} {report_date}
                </p>
              </div>
              <div className="d-flex gap-4 justify-content-between">
                <div className="d-flex gap-3 align-items-center">
                  <p className="client-name-heading d-flex gap-1 align-items-center fw-semibold">
                    <FaRegClock /> {totalDuration} hrs
                  </p>
                </div>
              </div>
              <div>
                <span className="status-progress">Progress</span>
              </div>
            </div>
          ) : (
            ""
          )}

          {updateWeeklyData?.map((item, index) => {
            return (
              <>
                <MemoWithTimeReport item={item} />
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}

      {selectedPeriod == "yearly" ? (
        <div className="detail-view monthly-view">
          <div className="client-info mb-3">
          {role !== "developer" ? "Developer Name" : "Client Name"}
            <p className="client-name-heading">
              <img src={user_details?.profile_picture} />
              {user_details?.name}
            </p>
          </div>
          <div className="client-info mb-3 gap-5 d-flex align-items-center">
            <div className="mb-0">
              <p className="client-name-heading d-flex gap-1 align-items-center">
                <FiCalendar />
                {month} {report_date}
              </p>
            </div>
            <div className="d-flex gap-4 justify-content-between">
              <div className="d-flex gap-3 align-items-center">
                <p className="client-name-heading d-flex gap-1 align-items-center fw-semibold">
                  <FaRegClock /> {totalDuration.toFixed("2")} hrs
                </p>
              </div>
            </div>
            <div>
              <span className="status-progress">Progress</span>
            </div>
          </div>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="Week 1"
            onSelect={selectCurrentTab}
          >
            <Nav variant="pills" className="weekly-tabs">
              <Nav.Item className="weekly-tab-item">
                <Nav.Link className="weekly-tab-link" eventKey="Week 1">
                  Week 1
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="weekly-tab-item">
                <Nav.Link className="weekly-tab-link" eventKey="Week 2">
                  Week 2
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="weekly-tab-item">
                <Nav.Link className="weekly-tab-link" eventKey="Week 3">
                  Week 3
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="weekly-tab-item">
                <Nav.Link className="weekly-tab-link" eventKey="Week 4">
                  Week 4
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="Week 1">
                {updateWeeklyData?.map((item, index) => {
                  return (
                    <>
                      <MemoWithTimeReport item={item} />
                    </>
                  );
                })}
              </Tab.Pane>
              <Tab.Pane eventKey="Week 2">
                {updateWeeklyData?.map((item, index) => {
                  return (
                    <>
                      <MemoWithTimeReport item={item} />
                    </>
                  );
                })}
              </Tab.Pane>
              <Tab.Pane eventKey="Week 3">
                {updateWeeklyData?.map((item, index) => {
                  return (
                    <>
                      <MemoWithTimeReport item={item} />
                    </>
                  );
                })}
              </Tab.Pane>
              <Tab.Pane eventKey="Week 4">
                {updateWeeklyData?.map((item, index) => {
                  return (
                    <>
                      <MemoWithTimeReport item={item} />
                    </>
                  );
                })}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SingleTimeReporting;
