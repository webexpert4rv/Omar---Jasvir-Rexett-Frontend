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
  clientDeleteHoliday,
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
import ListOfHolidays from "../../components/common/LeaveRequest/ListOfHolidays";
import ToolTip from "../../components/common/Tooltip/ToolTip";
import moment from "moment";

const LeaveRequest = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("first");
  const { leaveList } = useSelector((state) => state.clientData);
  const [status, setStatus] = useState({
    id: "",
    status: "",
  });
  const { screenLoader, smallLoader, clientLeaveHistory } = useSelector(
    (state) => state.clientData
  );
  const [leaveId, setLeaveId] = useState();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const handleSelect = (selectedTab) => {
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

  const [showEvent, setShowEvent] = useState(false);
  const handleShowEvent = (id, status) => {
    setShowEvent(!showEvent);
      setStatus({
        id: id,
        status: status,
      });
  };
  const handleCloseEvent = () => {
    setShowEvent(false);
  };
  useEffect(() => {
    dispatch(getLeaveList());
  }, []);

  const handleAproveDisapprove = async (id, status) => {
    const payload = {
      action: status,
    };
    await dispatch(getApproveDisapprove(payload, id));
    dispatch(getLeaveList());
  };

  const handleDelete = async (id) => {
    await dispatch(clientDeleteHoliday(id));
    dispatch(getLeaveList());
  };

  const listHolidays = (data) => {
    const holidays = data?.map((value) => new Date(value?.date));
    return holidays;
  };

  const [value, onChange] = useState(new Date());
  // Define the dates you want to mark
  const markedDates = listHolidays(leaveList);

  // Function to add custom content to tile
  const tileContent = ({ date, view }) => {
    const holidayForDate = leaveList.find((holiday) => {
      return new Date(holiday.date).toDateString() === date.toDateString();
    });

    if (
      view === "month" &&
      markedDates.find((d) => d.toDateString() === date.toDateString())
    ) {
      return <ToolTip text={holidayForDate?.name}><div className="dot"></div></ToolTip>;
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
              smallLoader={smallLoader}
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
            <ListOfHolidays
              onChange={onChange}
              value={value}
              tileContent={tileContent}
              holidayList={leaveList}
              handleShowEvent={handleShowEvent}
              handleDelete={handleDelete}
              handleAproveDisapprove={handleAproveDisapprove}
            />
          </Tab.Pane>
          <NewEvent
            show={showEvent}
            handleClose={handleCloseEvent}
            status={status}
          />
        </Tab.Content>
      </Tab.Container>
    </>
  );
};
export default LeaveRequest;
