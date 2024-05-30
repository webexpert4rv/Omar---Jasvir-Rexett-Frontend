import React, { useEffect, useState } from "react";
import associateLogo from "../../assets/img/aviox-logo.png";
import userImage from "../../assets/img/user-img.jpg";
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getLeaveHistory } from "../../redux/slices/developerDataSlice";
import Header from "../../components/common/LeaveRequest/Header";
import Tabs from "../../components/common/LeaveRequest/Tabs";
import HeaderTable from "../../components/common/LeaveRequest/HeaderTable";
import { Row, Col, Button, Form, Tab, Nav } from "react-bootstrap";
import {
  getClientLeaveHistory,
  getClientLeaveStatus,
} from "../../redux/slices/clientDataSlice";
import { HEADER } from "../../components/clients/TimeReporiting/constant";
import { tabText } from "../../components/clients/TimeReporiting/constant";
import RejectModal from "./Modals/EndJob";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import {
  getApproveDisapprove,
  getLeaveList,
} from "../../redux/slices/clientDataSlice";
import { TiEdit } from "react-icons/ti";
import Calendar from "react-calendar";
import NewEvent from "./Modals/NewEvent";

const LeaveRequest = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("first");
  const { screenLoader, smallLoader, clientLeaveHistory } = useSelector(
    (state) => state.clientData
  );
  const [leaveId, setLeaveId] = useState();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const handleSelect = (selectedTab) => {
    console.log(selectedTab, "selectedtab")
    setCurrentTab(selectedTab);
  };
  const handleClose = () => {
    setShowRejectModal(!showRejectModal);
  };
  const handleClick = async (e, reason) => {
    let payload = {
      leaveId: leaveId,
      approval_status: "Not Approved",
      rejection_reason: reason,
    };
    await dispatch(getClientLeaveStatus(payload));
    let data = {
      approval_status: "Under Approval",
    };
    dispatch(getClientLeaveHistory(data));
    setShowRejectModal(!showRejectModal);
  };

  const handleApproveReject = async (id, status) => {
    setLeaveId(id);
    if (status === "Approved") {
      let payload = {
        leaveId: id,
        approval_status: status,
        rejection_reason: null,
      };
      await dispatch(getClientLeaveStatus(payload));
      let data = {
        approval_status: "Under Approval",
      };
      dispatch(getClientLeaveHistory(data));
    } else {
      setShowRejectModal(true);
    }
  };

  useEffect(() => {
    let data;
    if (currentTab === "first") {
      data = {
        approval_status: "Under Approval",
      };
    } else if (currentTab === "second") {
      data = {
        approval_status: "Not Approved",
      };
    } else if (currentTab === "third") {
      data = {
        approval_status: "Approved",
      };
    } else {
      data = {
        approval_status: "Withdrawn",
      };
    }
    dispatch(getClientLeaveHistory(data));
  }, [currentTab]);

  const tableHeader = () => {
    if (currentTab === "first") {
      HEADER[HEADER.length - 1] = "Action";
    } else {
      HEADER[HEADER.length - 1] = "Leave Status";
    }
    return HEADER;
  };


  const [value, onChange] = useState(new Date());
  const [showEvent, setShowEvent] = useState(false);
  const handleShowEvent = () => {
    setShowEvent(!showEvent);
  };
  const { leaveList } = useSelector((state) => state.clientData);
  console.log(leaveList, "leaveList");
  const handleCloseEvent = () => {
    setShowEvent(false);
  };
  useEffect(() => {
    dispatch(getLeaveList());
  }, []);

  const handleAproveDisapprove = async (id, status) => {
    console.log(status, "status");
    console.log(id, "id");
    const payload = {
      action: status,
    };
    await dispatch(getApproveDisapprove(payload, id));
    dispatch(getLeaveList());
  };

  const markedDates = [
    new Date(2024, 4, 1),
    new Date(2024, 4, 8),
    new Date(2024, 4, 11),
    new Date(2024, 4, 14),
    new Date(2024, 4, 23),
    new Date(2024, 4, 31),
  ];

  // Function to add custom content to tile
  const tileContent = ({ date, view }) => {
    if (
      view === "month" &&
      markedDates.find((d) => d.toDateString() === date.toDateString())
    ) {
      return <div className="dot"></div>;
    }
    return null;
  };

  return (
        <>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="devleave-request"
            onSelect={handleSelect}
          >
            <Nav variant="pills" className="mb-4 application-pills">
              <Nav.Item className="application-item">
                <Nav.Link className="application-link" eventKey="devleave-request">
                  Leave Request
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="application-item">
                <Nav.Link className="application-link" eventKey="public-holiday">
                  Public Holiday
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="devleave-request">
                <Tabs
                  handleSelect={handleSelect}
                  tabText={tabText}
                  currentTab={currentTab}
                />
                <Header data={tableHeader()} />
                <HeaderTable
                  // screenLoader={screenLoader}
                  tableData={clientLeaveHistory}
                  currentTab={currentTab}
                  handleApproveReject={handleApproveReject}
                />
                {showRejectModal && (
                  <RejectModal
                    show={showRejectModal}
                    handleClose={handleClose}
                    header={"Rejection Reason"}
                    feedbacks={"Reasons"}
                    submit={"Submit"}
                    handleClick={handleClick}
                  />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="public-holiday">
                <section className="">
                  <div className="calendar-container card-box">
                    <div className="mb-3">
                      <Button
                        className="main-btn px-3 py-2 font-14"
                        onClick={handleShowEvent}
                      >
                        + Create New Holiday
                      </Button>
                    </div>
                    <Row>
                      <Col md={7}>
                        <Calendar
                          onChange={onChange}
                          value={value}
                          tileContent={tileContent}
                        />
                      </Col>
                      <Col md={5}>
                        <div className="holiday-listing px-0 pt-4">
                          <div className="d-flex justify-content-between align-items-center px-3 mb-3">
                            <h3 className="mb-0">Holidays</h3>
                            <div className="d-flex align-items-center gap-1">
                              <Form.Select className="common-field w-auto font-14 py-2">
                                <option>This Month</option>
                                <option>This Year</option>
                                <option>Created</option>
                              </Form.Select>
                              <Form.Select className="common-field w-auto font-14 py-2">
                                <option>All</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                              </Form.Select>
                            </div>
                          </div>
                          <div className="event-container">
                            {leaveList?.map((item, index) => (
                              <div className="event-wrapper">
                                <div className="event-info">
                                  <div className="holiday-date">
                                    <span className="eventdate-text">
                                      {item?.date}
                                      <br />
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="event-name mb-0">{item?.name}</h4>
                                  </div>
                                </div>
                                <div className="d-flex gap-2">
                                  <Button
                                    variant="transparent"
                                    className="px-3 arrow-btn primary-arrow font-16 text-decoration-none"
                                    onClick={(e) =>
                                      handleAproveDisapprove(item?.id, "approve")
                                    }
                                  >
                                    <IoCheckmark />
                                  </Button>
                                  <Button
                                    variant="transparent"
                                    className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                                    onClick={(e) =>
                                      handleAproveDisapprove(item?.id, "disapprove")
                                    }
                                  >
                                    <IoCloseOutline />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <div className="event-wrapper">
                              <div className="event-info">
                                <div className="holiday-date">
                                  <span className="eventdate-text">
                                    31 MAY
                                    <br />
                                    <span className="year-text">2024</span>
                                  </span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                  <h4 className="event-name mb-0">Urgent Work</h4>
                                  <span className="associate-text">
                                    <span className="associate">Created</span>
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex gap-2">
                                <Button
                                  variant="transparent"
                                  className="px-3 arrow-btn info-arrow font-16 text-decoration-none"
                                >
                                  <TiEdit />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                                >
                                  <IoCloseOutline />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </section>
                <NewEvent show={showEvent} handleClose={handleCloseEvent} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </>)
};
export default LeaveRequest;
