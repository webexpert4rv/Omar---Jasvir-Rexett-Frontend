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
  const { clientLeaveHIstory } = useSelector((state) => state.clientData);
  const [showRejectModal,setShowRejectModal] =  useState(false)
  const handleSelect = (selectedTab) => {
    setCurrentTab(selectedTab)
  };
  const handleClose=()=>{
    setShowRejectModal(!showRejectModal)
  }
  const handleClick=(reason)=>{
    let payload={
      leaveId: "",
      approval_status: "",
      rejection_reason: reason,
    }
    dispatch(getClientLeaveStatus(payload));
    setShowRejectModal(!showRejectModal)
  }

  const handleApproveReject = (status) => {
    if (status === "approve") {
      let data = {
        leaveId: "",
        approval_status: status,
        rejection_reason: "",
      };
      dispatch(getClientLeaveStatus(data));
    }else{
      setShowRejectModal(true)
    }
  };


  useEffect(() => {
    dispatch(getClientLeaveHistory());
  }, []);

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
      <Tabs handleSelect={handleSelect} tabText={tabText} currentTab={currentTab}/>
      <Header data={tableHeader()} />
      <HeaderTable
        tableData={clientLeaveHIstory}
        currentTab={currentTab}
        handleApproveReject={handleApproveReject}
      />
      {showRejectModal && <RejectModal show={showRejectModal} handleClose={handleClose} header={"Rejection Reason"} feedbacks={"Reasons"}  submit={"Submit"} onClick={handleClick}/>}
    </>
  );
};
export default LeaveRequest;
