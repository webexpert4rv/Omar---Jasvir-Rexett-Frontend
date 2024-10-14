import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button, Dropdown, Form, Nav, Offcanvas, OverlayTrigger, Tab, Tooltip } from "react-bootstrap";
import Notification from "../atomic/Notfication";
import LanguageChange from "../atomic/LanguageChange";
import { GoArrowLeft } from "react-icons/go";
import ToolTip from "../common/Tooltip/ToolTip";
import DeveloperCheckInOut from "./DeveloperCheckInOut";
import RexettMarquee from "./RexettMarquee";
import moment from "moment";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaPencil, FaRegCircleCheck, FaTrash } from "react-icons/fa6";
import { RiChat3Line } from "react-icons/ri";

import MeetingInfo from "../../pages/admin/Modals/MeetingInfo";

import { FaCalendarDays } from "react-icons/fa6";

import 'react-quill/dist/quill.snow.css';
import Schedulemeeting from "../common/Modals/ScheduleMeeting";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, getAllPermissionDetails, getConfigDetails, getToDoById } from "../../redux/slices/adminDataSlice";
import { TbArrowBarToLeft } from "react-icons/tb";
import ToDoComponent from "./ToDoComponent";
import MessageInbox from "./MessageInbox";
import Meetings from "../common/meetings/Meetings";

// const clientName = localStorage.getItem("userName")?.toString().replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
const  clientName = localStorage.getItem("userName")
const profileImg =  localStorage.getItem("profile_picture")

const RexettHeader = ({ role, handleCollapseSidebar, collapseLayout }) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState()
  const { t } = useTranslation();
  const [fridayMarquee, setFridayMarquee] = useState(false);
  const { pathname } = useLocation();
  const isSingleJob = pathname.split("/")[2];
  const [createdMeetings, setCreatedMeetings] = useState()
  const { configDetails } = useSelector(state => state.adminData)
  const dispatch = useDispatch()
  const routePath = (isSingleJob) => {
    const data = {
      "single-job": "/client/job-posted",
      "client-single-developer": "/client/dashboard",
      "admin-single-job": "/admin/admin-job-listing",
      "admin": "admin/notification-admin",
      "client": "client/notification-client",
      "developer": "developer/notification-developer",
      "vendor": "notification-vendor"
    };

    return data[isSingleJob] || false;
  };

  const [showToDo, setShowToDo] = useState(false);

  const handleCloseToDo = () => setShowToDo(false);
  const handleShowToDo = () => setShowToDo(true);

  const [showMeetings, setShowMeetings] = useState(false);

  const handleCloseMeetings = () => setShowMeetings(false);
  const handleShowMeetings = () => setShowMeetings(true);

  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const handleShowMeetingInfo = (item) => {
    console.log(item, "value======")
    setDetails(item)
    setShowMeetingInfo(!showMeetingInfo)
  }

  useEffect(()=>{
    if(role==="admin"){
     dispatch(getAllPermissionDetails(role))
    }
  },[role])

  console.log(details, "details")
  const handleCloseMeetingInfo = () => {
    setShowMeetingInfo(false)
  }

  const [showMessagesInfo, setShowMessagesInfo] = useState(false);
  const handleShowMessages = () => {
    setShowMessagesInfo(!showMessagesInfo)
  }

  useEffect(() => {
    const dt = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format("dddd");
    setFridayMarquee(dt);
  }, []);

  const color1 = configDetails?.crm_sidebar_bg_gradient_color_1;
  const color2 = configDetails?.crm_sidebar_bg_gradient_color_2;
  const solidColor = configDetails?.crm_sidebar_bg_solid_color
  const primaryColor = configDetails?.crm_primary_color
  const filename = configDetails?.favicon
  const linkColor = configDetails?.crm_sidebar_link_color
  const sideBarFontSize = configDetails?.crm_sidebar_font_size
  const headingFontSize = configDetails?.crm_heading_font_size
  const bodyFontSize = configDetails?.crm_body_font_size
  const headingTextColor = configDetails?.crm_heading_color
  const bodyTextColor = configDetails?.crm_body_text_color
  const linkBgColor = configDetails?.crm_sidebar_bg_link_color
  const sideBarIconColor = configDetails?.side_bar_icon_color
  const sideBarIconWidth = configDetails?.side_bar_icon_width
  const sideBarIconHeight = configDetails?.side_bar_icon_height



  useEffect(() => {
    if (solidColor) {
      document.documentElement.style.setProperty('--sidebar-bg', solidColor)
    } else {
      document.documentElement.style.setProperty('--sidebar-bg', `linear-gradient(to bottom,${color1},${color2})`)
    }
    document.documentElement.style.setProperty('--primary', primaryColor)
    document.documentElement.style.setProperty('--sidebar-link-color', linkColor)
    document.documentElement.style.setProperty('--sideLink_font_size', `${sideBarFontSize}px`)
    document.documentElement.style.setProperty('--heading_font_size', `${headingFontSize}px`)
    document.documentElement.style.setProperty('--body_font_size', `${bodyFontSize}px`)
    document.documentElement.style.setProperty('--heading_color', headingTextColor)
    document.documentElement.style.setProperty('--body_text_color', bodyTextColor)
    document.documentElement.style.setProperty('--sidebar-link-bg-color', linkBgColor)
    document.documentElement.style.setProperty('--sidebar_icon_font_color', sideBarIconColor)
    document.documentElement.style.setProperty('--sidebar_icon_font_width', sideBarIconWidth)
    document.documentElement.style.setProperty('--sidebar_icon_font_height', sideBarIconHeight)
    document.getElementById('favicon').href = filename;
  }, [configDetails])

  useEffect(() => {
    dispatch(getConfigDetails())
    dispatch(getAllEvents())
  }, [dispatch])

  const backBtn = () => {
    navigate(-1)
    // let routeName = routePath(isSingleJob);
    // navigate(routeName);
  };

  const [currentTab, setCurrentTab] = useState("first")
  const [deletetodo, showDeletetodo] = useState(false);
  const handleShowDeleteToDo = () => {
    showDeletetodo(!deletetodo);
  }
  const handleCloseDeleteToDo = () => {
    showDeletetodo(false);
  }

  const [showschedulemeeting, ShowScheduleMeeting] = useState(false);
  const handleShowSchedule = () => {
    ShowScheduleMeeting(!showschedulemeeting);
  }
  const handleCloseSchdule = () => {
    ShowScheduleMeeting(false);
  }

  console.log(createdMeetings, "createdMeetings")


  return (
    <>
      {role == "developer" ? (
        <RexettMarquee fridayMarquee={fridayMarquee} />
      ) : (
        ""
      )}
      <header className="mb-4 zIndex3 dash_header">
          
        <div className="d-flex align-items-center justify-content-between gap-3">
          {/* <span className="d-flex justify-content-start align-items-center fw-500 welcome_Text" >Welcome {clientName}</span> */}
          <div>
            {/* <Button onClick={handleCollapseSidebar} variant="transparent" className={collapseLayout ? "shadow-none p-0 collapsable_btn me-2" : "shadow-none p-0 collapsable_btn me-2 active-collapse"}><TbArrowBarToLeft /></Button> */}
            {routePath(isSingleJob) && (
              <Button
                onClick={backBtn}
                className="outline-main-btn px-3 py-2 font-14 me-4"
              >
                <GoArrowLeft />
                Back
              </Button>
            )}
          </div>
          <div className="d-flex align-items-center gap-3 secondary_nav">
            {role == "admin" ? (
              <Button className="main-btn font-14">View Clients</Button>
              ) : ("")}
            {role == "admin" ? (
              <ToolTip text={"To Do List"} >
                <span onClick={handleShowToDo} className="cursor-pointer to-do-icon">
                  <FaRegCircleCheck />
                </span>
              </ToolTip>
            ) : (
              ""
            )}
            {role == "admin" || role=="developer" ? (
              <ToolTip text={"Messages"} >
                <span onClick={handleShowMessages} className="email-icon">
                  <RiChat3Line />
                </span>
              </ToolTip>) : ("")}
            {role == "admin" ? (
              <ToolTip text={"Meeting Booking"}>
                <span onClick={handleShowMeetings} className="booking-icon cursor-pointer">
                  <FaCalendarDays />
                </span>
              </ToolTip>) : ("")}
            {role == "developer" ? <DeveloperCheckInOut /> : ""}
            {/* <LanguageChange /> */}
            <Notification
              route={routePath(role)}
              job="single-job"
              doc="documents"
            />
            {role == "client" || role == "admin" ? (
              <ToolTip text="Create Job">
                <button
                  className="main-btn add-new-job-btn"
                  onClick={() =>
                    {
                      navigate(`/${role}/job-post`)
                      localStorage.removeItem("jobId")
                    } }
                >
                  +
                </button>
              </ToolTip>
            ) : (
              ""
            )}
            {role == "vendor" ? (
              <Link
                to={"/vendor/developer-registration"}
                className="text-decoration-none main-btn"
              >
                {t("registerNewDeveloper")}
              </Link>
            ) : (
              ""
            )}
            <ToolTip text={clientName}>
              <Dropdown className="profile-dropdown">
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                  <div className="profile-view">
                    {/* <span>{clientName?.charAt(0)}</span> */}
                    <img src={profileImg ? profileImg : "/demo-user.png"} />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sort-dropdown">
                  <Dropdown.Item href="/admin/customization">Configuration</Dropdown.Item>
                  <Dropdown.Item href="/admin/website-pages">Pages</Dropdown.Item>
                  <Dropdown.Item href="#">Website</Dropdown.Item>
                  <Dropdown.Item href="#" className="text-danger">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ToolTip>
          </div>
        </div>
      </header>

      <Meetings showMeetings={showMeetings} handleCloseMeetings={handleCloseMeetings} handleShowSchedule={handleShowSchedule} handleShowMeetingInfo={handleShowMeetingInfo} />
      {showMessagesInfo && <MessageInbox showMessagesInfo={showMessagesInfo} setShowMessagesInfo={setShowMessagesInfo} />}
      <ToDoComponent showToDo={showToDo} setShowToDo={setShowToDo} />
      <MeetingInfo show={showMeetingInfo} handleClose={handleCloseMeetingInfo} createdMeetings={createdMeetings} details={details} />
      <Schedulemeeting show={showschedulemeeting} handleClose={handleCloseSchdule} setCreatedMeetings={setCreatedMeetings} createdMeetings={createdMeetings} type={"events"} />
    </>
  );
};

export default RexettHeader;
