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
import {
  getClientLeaveHistory,
  getClientLeaveStatus,
} from "../../redux/slices/clientDataSlice";
import { HEADER } from "../../components/clients/TimeReporiting/constant";
import { tabText } from "../../components/clients/TimeReporiting/constant";
import RejectModal from "./Modals/EndJob";

const LeaveRequest = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("first");
  const { clientLeaveHistory } = useSelector((state) => state.clientData);
  const [leaveId,setLeaveId] = useState()
  const [showRejectModal, setShowRejectModal] = useState(false);
  const handleSelect = (selectedTab) => {
    setCurrentTab(selectedTab);
  };
  const handleClose = () => {
    setShowRejectModal(!showRejectModal);
  };
  const handleClick = (e,reason) => {
    console.log(reason,"reason")
    let payload = {
      leaveId: leaveId,
      approval_status: null,
      rejection_reason: reason,
    };
    console.log(payload,"payload")
    dispatch(getClientLeaveStatus(payload));
    setShowRejectModal(!showRejectModal);
  };

  const handleApproveReject = (id,status) => {
    setLeaveId(id)
    if (status === "Approved") {
      let payload = {
        leaveId: id,
        approval_status: status,
        rejection_reason: null,
      };
      dispatch(getClientLeaveStatus(payload));
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
    } else if(currentTab ==="third"){
      data = {
        approval_status: "Approved",
      }
    }else{
        data = {
        approval_status: "withdrawn ",
        
      }
    }
    dispatch(getClientLeaveHistory(data));
  }, [currentTab]);

  const tableHeader = () => {
    if (currentTab === "third") {
      HEADER[HEADER.length - 1] = "Leave Status";
    } else {
      HEADER[HEADER.length - 1] = "Action";
    }
    return HEADER;
  };

  return (
    <>
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
    </>
  );
};
export default LeaveRequest;
