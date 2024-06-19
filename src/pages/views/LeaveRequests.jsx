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
  getClientHolidayList,
} from "../../redux/slices/clientDataSlice";
import { TiEdit } from "react-icons/ti";
import Calendar from "react-calendar";
import NewEvent from "./Modals/NewEvent";
import ListOfHolidays from "../../components/common/LeaveRequest/ListOfHolidays";
import ToolTip from "../../components/common/Tooltip/ToolTip";
import moment from "moment";
import ConfirmationModal from "./Modals/ConfirmationModal";

const LeaveRequest = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("first");
  const { clientHolidayList } = useSelector((state) => state.clientData);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedRejectIndex , setSelectedRejectIndex] = useState(null)
  const [approveIndex , setApproveIndex] =  useState(null)
  const [status, setStatus] = useState({
    id: "",
    status: "",
  });
  const { screenLoader, approvedLoader, smallLoader, clientLeaveHistory } =useSelector((state) => state.clientData);
  const [leaveId, setLeaveId] = useState();
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const handleSelect = (selectedTab) => {
    setCurrentTab(selectedTab);
  };

 
  console.log(deleteId, "deleteId");
  const handleCloseDeleteModal = () => {
    setDeleteShowModal(false);
  };

  const handleClose = () => {
    setShowRejectModal(false);
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

  const handleApproveReject = async (id, status, index) => {
    console.log(status,"status")
    console.log(index,"index")
      setApproveIndex(index);
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
    console.log(data,"data")
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
    dispatch(getClientHolidayList());
  }, []);

  const handleAproveDisapprove = async (id, status, idx) => {
    if(status== "disapprove"){
    setSelectedRejectIndex(idx)
    }else {
    setSelectedIndex(idx);
    }
    const payload = {
      action: status,
    };
    await dispatch(getApproveDisapprove(payload, id));
    let data = {
      approval_status: "Under Approval",
    };
    dispatch(getClientHolidayList(data));
  };

  const handleDelete = (id) => {
    setDeleteShowModal(!deleteShowModal);
    setDeleteId(id);
  };
  const handleAction = async (e) => {
    e.preventDefault();
    await dispatch(clientDeleteHoliday(deleteId));
    dispatch(getClientHolidayList());
    setDeleteShowModal(false);
  };

  const listHolidays = (data) => {
    const holidays = data?.map((value) => new Date(value?.date));
    return holidays;
  };

  const [value, onChange] = useState(new Date());
  // Define the dates you want to mark
  const markedDates = listHolidays(clientHolidayList);

  // Function to add custom content to tile
  const tileContent = ({ date, view }) => {
    const holidayForDate = clientHolidayList.find((holiday) => {
      return new Date(holiday.date).toDateString() === date.toDateString();
    });

    if (
      view === "month" &&
      markedDates.find((d) => d.toDateString() === date.toDateString())
    ) {
      return (
        <ToolTip text={holidayForDate?.name}>
          <div className="dot"></div>
        </ToolTip>
      );
    }
    return null;
  };

  return (
    <>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="devleave-request"
        // onSelect={handleSelect}
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
              tableData={clientLeaveHistory}
              currentTab={currentTab}
              handleApproveReject={handleApproveReject}
              approvedLoader={approvedLoader}
              approveIndex={approveIndex}
              screenLoader={screenLoader}
            />
            {showRejectModal && (
              <RejectModal
                show={showRejectModal}
                handleClose={handleClose}
                header={"Rejection Reason"}
                feedbacks={"Reasons"}
                submit={"Submit"}
                handleClick={handleClick}
                smallLoader={smallLoader}
              />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="public-holiday">
            <ListOfHolidays
              onChange={onChange}
              value={value}
              tileContent={tileContent}
              holidayList={clientHolidayList}
              handleShowEvent={handleShowEvent}
              handleDelete={handleDelete}
              handleAproveDisapprove={handleAproveDisapprove}
              selectedIndex={selectedIndex}
              selectedRejectIndex = {selectedRejectIndex}
              approvedLoader = {approvedLoader}
            />
          </Tab.Pane>
          <NewEvent
            show={showEvent}
            handleClose={handleCloseEvent}
            status={status}
          />
          <ConfirmationModal
            show={deleteShowModal}
            handleClose={handleCloseDeleteModal}
            onClick={handleAction}
            smallLoader={smallLoader}
            text={"Are you sure, you want to delete this holiday"}
          />
        </Tab.Content>
      </Tab.Container>
    </>
  );
};
export default LeaveRequest;
