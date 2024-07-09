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
import devImg from '../../assets/img/user-img.jpg';
import Calendar from 'react-calendar';
import MeetingInfo from "../../pages/admin/Modals/MeetingInfo";
import { RiUserAddFill } from "react-icons/ri";
import { FaCalendarDays } from "react-icons/fa6";
import { IoArrowForward, IoCloseCircleOutline } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoArchiveSharp } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TbMessage } from "react-icons/tb";
import { GrAttachment } from "react-icons/gr";
import { HiOutlineLink } from "react-icons/hi";
import { MdGifBox } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import Schedulemeeting from "../common/Modals/ScheduleMeeting";
import { useDispatch, useSelector } from "react-redux";
import { getConfigDetails } from "../../redux/slices/adminDataSlice";
import { CgCalendar } from "react-icons/cg";
import { TbCalendarShare } from "react-icons/tb";
import { TiWeatherSunny } from "react-icons/ti";
import { TbArrowBarToLeft } from "react-icons/tb";
import AddUserConversation from "../common/Modals/AddUsers";
import DeleteToDo from "../common/Modals/DeleteToDo";
import rexettLogo from '../../assets/img/favicon.png'
import { Todo_tabText } from "../clients/TimeReporiting/constant";
import Tabs from "../common/LeaveRequest/Tabs";
import NewToDo from "./NewToDo";
import ToDoComponent from "./ToDoComponent";
import MessageInbox from "./MessageInbox";

const clientName = localStorage.getItem("userName")?.toString().replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

const RexettHeader = ({ role, handleCollapseSidebar, collapseLayout }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [fridayMarquee, setFridayMarquee] = useState(false);
  const { pathname } = useLocation();
  const isSingleJob = pathname.split("/")[2];
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
  const handleShowMeetingInfo = () => {
    setShowMeetingInfo(!showMeetingInfo)
  }
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
    document.getElementById('favicon').href = filename;

  }, [configDetails])

  useEffect(() => {
    dispatch(getConfigDetails())
  }, [dispatch])



  const backBtn = () => {
    navigate(-1)
    // let routeName = routePath(isSingleJob);
    // navigate(routeName);
  };

  const [value, onChange] = useState(new Date());
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


  return (
    <>
      {role == "developer" ? (
        <RexettMarquee fridayMarquee={fridayMarquee} />
      ) : (
        ""
      )}
      <header className="mb-4 zIndex3">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <Button onClick={handleCollapseSidebar} variant="transparent" className={collapseLayout ? "shadow-none p-0 collapsable_btn me-2 active-collapse" : "shadow-none p-0 collapsable_btn me-2"}><TbArrowBarToLeft /></Button>
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
          <div className="d-flex align-items-center gap-3">
            {role == "admin" ? (
              <ToolTip text={"To Do List"} >
                <span onClick={handleShowToDo} className="cursor-pointer to-do-icon">
                  <FaRegCircleCheck />
                </span>
              </ToolTip>
            ) : (
              ""
            )}
            {role == "admin" ? (
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
            <LanguageChange />
            <Notification
              route={routePath(role)}
              job="single-job"
              doc="documents"
            />
            {role == "client" || role == "admin" ? (
              <ToolTip text="Create Job">
                <button
                  className="main-btn add-new-job-btn"
                  onClick={() => navigate(`/${role}/job-post`)}
                >
                  +
                </button>
              </ToolTip>
            ) : (
              ""
            )}
            {role == "vendor" ? (
              <Link
                to={"/resume-detail"}
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
                    <span>{clientName?.charAt(0)}</span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="sort-dropdown">
                  <Dropdown.Item href="/admin/website-pages">Pages</Dropdown.Item>
                  <Dropdown.Item href="#">Website</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ToolTip>
          </div>
        </div>
      </header>
      <Offcanvas show={showMeetings} placement="end" onHide={handleCloseMeetings}>
        <Offcanvas.Header className="border-bottom-grey pb-3" closeButton>
          <div className="d-flex align-items-center gap-2">
            <Offcanvas.Title>Meetings</Offcanvas.Title>
            <ToolTip text={"New Meeting"}>
              <Button onClick={handleShowSchedule} className="main-btn px-2 add-new-btn cursor-pointer upload-btn mb-0">+</Button>
            </ToolTip>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <div className="meeting-booking">
            <Calendar onChange={onChange} value={value} />
            <div className="interview-scheduled sidebar-meetings mt-4">

              <div onClick={handleShowMeetingInfo} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4">
                <div>
                  <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                  <p className="dev-name mb-2 font-14">
                    <div className="me-1">
                      <img src={devImg} />
                    </div>
                    Pankaj Pundir
                  </p>
                  <p className="interview-timing mb-2 font-14">Tuesday 22-06-24, 22:00 - 23:00</p>
                </div>
                <div className="mb-2 status-interview">
                  <span className="status-upcoming">Upcoming in 1hr</span>
                </div>
              </div>
              <div onClick={handleShowMeetingInfo} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4">
                <div>
                  <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                  <p className="dev-name mb-2 font-14">
                    <div className="me-1">
                      <img src={devImg} />
                    </div>
                    Pankaj Pundir
                  </p>
                  <p className="interview-timing mb-2 font-14">Tuesday 22-06-24, 22:00 - 23:00</p>
                </div>
                <div className="mb-2 status-interview">
                  <span className="status-upcoming">Upcoming in 3hr</span>
                </div>
              </div>
              <div onClick={handleShowMeetingInfo} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4">
                <div>
                  <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                  <p className="dev-name mb-2 font-14">
                    <div className="me-1">
                      <img src={devImg} />
                    </div>
                    Pankaj Pundir
                  </p>
                  <p className="interview-timing mb-2 font-14">Tuesday 22-06-24, 22:00 - 23:00</p>
                </div>
                <div className="mb-2 status-interview">
                  <span className="status-upcoming">Upcoming in 5hr</span>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <MessageInbox showMessagesInfo={showMessagesInfo} setShowMessagesInfo={setShowMessagesInfo} />
      <ToDoComponent showToDo={showToDo} setShowToDo={setShowToDo} />
      <MeetingInfo show={showMeetingInfo} handleClose={handleCloseMeetingInfo} />
      <Schedulemeeting show={showschedulemeeting} handleClose={handleCloseSchdule} />
    </>
  );
};

export default RexettHeader;
