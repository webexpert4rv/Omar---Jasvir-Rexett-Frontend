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
import { IoArrowForward } from "react-icons/io5";
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

const clientName = localStorage
  .getItem("userName")
  ?.toString()
  .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

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
  const handleCloseMessages = () => {
    setShowMessagesInfo(false)
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
    if(solidColor){
    document.documentElement.style.setProperty('--sidebar-bg', solidColor)
    }else{
     document.documentElement.style.setProperty('--sidebar-bg', `linear-gradient(to bottom,${color1},${color2})`)
    }
    document.documentElement.style.setProperty('--primary', primaryColor )
    document.documentElement.style.setProperty('--sidebar-link-color', linkColor )
    document.documentElement.style.setProperty('--sideLink_font_size',  `${sideBarFontSize}px`)
    document.documentElement.style.setProperty('--heading_font_size',  `${headingFontSize}px`)
    document.documentElement.style.setProperty('--body_font_size',  `${bodyFontSize}px`)
    document.documentElement.style.setProperty('--heading_color',  headingTextColor)
    document.documentElement.style.setProperty('--body_text_color',  bodyTextColor)
    document.documentElement.style.setProperty('--sidebar-link-bg-color',  linkBgColor)
    document.getElementById('favicon').href = filename;

  }, [configDetails])

  useEffect(() => {
    dispatch(getConfigDetails())
  }, [dispatch])



  const backBtn = () => {
    let routeName = routePath(isSingleJob);
    navigate(routeName);
  };
  const todoList = (
    <Tooltip>To Do List</Tooltip>
  )
  const chatText = (
    <Tooltip>Messages</Tooltip>
  )
  const booking = (
    <Tooltip>Meeting Booking</Tooltip>
  )
  const assignText = (
    <Tooltip>Assign to employee</Tooltip>
  )
  const calendarText = (
    <Tooltip>Select Date</Tooltip>
  )
  const newTodoText = (
    <Tooltip>New To Do</Tooltip>
  )
  const templateText = (
    <Tooltip>Message Template</Tooltip>
  )
  const attachmentText = (
    <Tooltip>Add Attachment</Tooltip>
  )
  const smartLinkText = (
    <Tooltip>Smart Link</Tooltip>
  )
  const gifText = (
    <Tooltip>Add gif</Tooltip>
  )
  const emojiText = (
    <Tooltip>Add emoji</Tooltip>
  )
  const newMeeting = (
    <Tooltip>New Meeting</Tooltip>
  )
  const assignUser = (
    <Tooltip>Reassign User</Tooltip>
  )
  const [value, onChange] = useState(new Date());
  const [messageWrapperVisible, setMessageWrapperVisible] = useState(false);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [valuemessga, setValuemessga] = useState('');

  const handleChatProfileClick = () => {
    setMessageWrapperVisible(true);
  };

  const handleCloseMessageWrapper = () => {
    setMessageWrapperVisible(false);
  };
  const handleEditorFocus = () => {
    setIsEditorFocused(true);
  };

  const handleEditorBlur = () => {
    setIsEditorFocused(false);
  };

  const handleChange = (value) => {
    setValuemessga(value);
    setHasContent(value.trim().length > 0);
  };

  const [adduserconversation, showAddUserConversation] = useState(false);
  const handleShowUserConversation = () => {
    showAddUserConversation(!adduserconversation);
  }
  const handleCloseUserConversation = () => {
    showAddUserConversation(false);
  }

  const [deletetodo, showDeletetodo] = useState(false);
  const handleShowDeleteToDo = () => {
    showDeletetodo(!deletetodo);
  }
  const handleCloseDeleteToDo = () => {
    showDeletetodo(false);
  }

  console.log(routePath(role), "routePath(isSingleJob)")

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
                <GoArrowLeft /> Back
              </Button>
            )}
          </div>
          <div className="d-flex align-items-center gap-3">
            {role == "admin" ? (
              <OverlayTrigger placement="bottom" overlay={todoList}>
                <span onClick={handleShowToDo} className="cursor-pointer to-do-icon">
                  <FaRegCircleCheck />
                </span>
              </OverlayTrigger>
            ) : (
              ""
            )}
            {role == "admin" ? (
              <OverlayTrigger placement="bottom" overlay={chatText}>
                <span onClick={handleShowMessages} className="email-icon">
                  <RiChat3Line />
                </span>
              </OverlayTrigger>) : ("")}
            {role == "admin" ? (
              <OverlayTrigger placement="bottom" overlay={booking}>
                <span onClick={handleShowMeetings} className="booking-icon cursor-pointer">
                  <FaCalendarDays />
                </span>
              </OverlayTrigger>) : ("")}
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
              <div className="profile-view">
                <span>{clientName?.charAt(0)}</span>
              </div>
            </ToolTip>
          </div>
        </div>
      </header>
      <Offcanvas show={showMeetings} placement="end" onHide={handleCloseMeetings}>
        <Offcanvas.Header className="border-bottom-grey pb-3" closeButton>
          <div className="d-flex align-items-center gap-2">
            <Offcanvas.Title>Meetings</Offcanvas.Title>
            <OverlayTrigger placement="bottom" overlay={newMeeting}>
              <Button className="main-btn px-2 add-new-btn cursor-pointer upload-btn mb-0">+</Button>
            </OverlayTrigger>
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
      <Offcanvas show={showMessagesInfo} placement="end" className={`message-offcanvas ${messageWrapperVisible ? 'visible' : ''}`} onHide={handleCloseMessages}>
        <div className="d-flex align-items-start">

          <div className={`message-wrapper ${messageWrapperVisible ? 'visible' : ''}`}>
            <div className="message-wrapper-header">
              <div className="about-chat">
                <img src={devImg} />
                <h3>Pankaj Pundir</h3>
              </div>
              <div className="message-options">
                <span className="message-header-icon">
                  <Dropdown className="assign-dropdown">
                    <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                      <OverlayTrigger placement="bottom" overlay={assignUser}>
                        <span className="assign-user cursor-pointer">
                          <FaUserCircle />
                        </span>
                      </OverlayTrigger>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="assign-dropdown-menu">
                      <div className="search-field-employee">
                        <Form.Control type="text" className="common-field font-12 mb-2" placeholder="Search Employee" />
                      </div>
                      <div className="employee-listing">
                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="profile-pic-prefix">RG</span>
                          <span className="font-12">robingautam@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="profile-pic-prefix">RG</span>
                          <span className="font-12">robingautam@gmail.com</span>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
                <span className="message-header-icon">
                  <IoArchiveSharp />
                </span>
                <span className="message-header-icon">
                  <Dropdown className="assign-dropdown">
                    <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                      <span className="assign-user cursor-pointer">
                        <HiOutlineDotsVertical />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="assign-dropdown-menu more-option-menu">
                      <div className="employee-listing">
                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="font-14">Mark as unread</span>
                        </div>
                        {/* <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="font-14 d-inline-block cursor-pointer" onClick={handleShowUserConversation}>Add users</span>
                        </div> */}
                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="font-14 text-danger">Leave conversation</span>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
                <span className="message-header-icon" onClick={handleCloseMessageWrapper}>
                  <IoClose />
                </span>
              </div>
            </div>
            <div className="main-message-area">
              <div className="area-profile mb-4">
                <img src={devImg} />
                <h4>Pankaj Pundir</h4>
                <span className="status-info">Developer</span>
              </div>
              <div>
                <p className="msg-subject-name"><span className="subject-name">Invited</span></p>
                <div className="sender-message">
                  <div>
                    <p className="message">You are invited<br /><br /> -- <br /><br /> Aviox Technologies Pvt Ltd.</p>
                    <p className="message-time">1 hour ago</p>
                  </div>
                  <div className="sender-profile">
                    <img src={devImg} />
                  </div>
                </div>
                <div className="receiver-message">
                  <div className="receiver-profile">
                    <img src={devImg} />
                  </div>
                  <div>
                    <p className="message">You are invited<br /><br /> -- <br /><br /> Aviox Technologies Pvt Ltd.</p>
                    <p className="message-time">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="write-message-area">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0"><span className="fw-medium">Subject: <span className="ongoing-subject">Re: Invited</span></span> <span className="new-subject">+ New Subject</span></p>
                <div className="sender-profile">
                  <img src={devImg} />
                </div>
              </div>
              <div>
                <Form.Control type="text" className="common-field font-14 mb-2" placeholder="Enter new subject" />
              </div>
              <div className="position-relative">
                <div className={`custom-rich-editor message-field ${(isEditorFocused || hasContent) ? 'focused' : ''}`}>
                  <ReactQuill value={valuemessga} onChange={handleChange} onFocus={handleEditorFocus} onBlur={handleEditorBlur} />
                </div>
                <div className={`field-msg-options d-flex align-items-center gap-3 ${(isEditorFocused || hasContent) ? 'focused' : ''}`}>
                  <div className="inner-field-msg-options">
                    <Dropdown className="assign-dropdown">
                      <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                        <OverlayTrigger placement="top" overlay={templateText}>
                          <span>
                            <TbMessage />
                          </span>
                        </OverlayTrigger>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="assign-dropdown-menu more-option-menu">
                        <div className="search-field-employee">
                          <Form.Control type="text" className="common-field font-12 mb-2" placeholder="Search Template" />
                        </div>
                        <div className="employee-listing">
                          <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                            <span className="font-14">Default reply</span>
                          </div>
                          <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                            <span className="font-14">Reject mail</span>
                          </div>
                          {/* <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                            <span className="font-14">Welcome to company</span>
                          </div> */}
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                    <input type="file" id="attach-file-msg" className="d-none" />
                    <OverlayTrigger placement="top" overlay={attachmentText}>
                      <label htmlFor="attach-file-msg">
                        <span>
                          <GrAttachment />
                        </span>
                      </label>
                    </OverlayTrigger>
                    <Dropdown className="assign-dropdown">
                      <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                        <OverlayTrigger placement="top" overlay={smartLinkText}>
                          <span>
                            <HiOutlineLink />
                          </span>

                        </OverlayTrigger>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="assign-dropdown-menu more-option-menu">
                        <div className="search-field-employee">
                          <Form.Control type="text" className="common-field font-12 mb-2" placeholder="Search Pages" />
                        </div>
                        <div className="employee-listing">
                          <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                            <span className="font-14">Career page</span>
                          </div>
                          <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                            <span className="font-14">Job page</span>
                          </div>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                    <OverlayTrigger placement="top" overlay={gifText}>
                      <span>
                        <MdGifBox />
                      </span>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={emojiText}>
                      <span>
                        <MdEmojiEmotions />
                      </span>
                    </OverlayTrigger>
                  </div>
                  <Button variant="transparent" className="main-btn font-14">Send Message</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="inner-message-area">
            <Offcanvas.Header className="border-bottom-grey pb-3" closeButton>
              <div className="d-flex align-items-center gap-2">
                <Offcanvas.Title>Message Inbox</Offcanvas.Title>
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body className="message-canvas-body">
              <div>
                <div>
                  <Form.Control type="text" placeholder="Search here..." className="common-field font-14 mb-2" />
                </div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="all-message">
                  <Tab.Content>
                    <Tab.Pane eventKey="all-message" className="pt-3 pb-4">
                      <Tab.Container id="left-tabs-example" defaultActiveKey="all-in-message">
                        <div className="d-flex">
                          <Nav variant="pills" className="application-pills message-info-pills">
                            <Nav.Item className="application-item">
                              <Nav.Link eventKey="all-in-message" className="application-link inner_tab_link">Inbox</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="application-item">
                              <Nav.Link eventKey="unread-all-message" className="application-link inner_tab_link">Unread</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="application-item">
                              <Nav.Link eventKey="archieve-all-messages" className="application-link inner_tab_link">Archieve</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </div>
                        <Tab.Content>
                          <Tab.Pane eventKey="all-in-message" className="mt-2">
                            <div className={messageWrapperVisible ? "chat-profile-wrapper position-relative active-chat py-2 px-3" : "chat-profile-wrapper position-relative py-2 px-3"} onClick={handleChatProfileClick}>
                              <span className="more-chat-options">
                                <Dropdown className="assign-dropdown">
                                  <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                                    <span className="assign-user cursor-pointer">
                                      <HiOutlineDotsVertical />
                                    </span>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu className="assign-dropdown-menu more-option-menu">
                                    <div className="employee-listing">
                                      <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                                        <span className="font-14">Mark as unread</span>
                                      </div>
                                      <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                                        <span className="font-14">Reassign user</span>
                                      </div>
                                      {/* <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                                        <span className="font-14 d-inline-block cursor-pointer" onClick={handleShowUserConversation}>Add users</span>
                                      </div> */}
                                      <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                                        <span className="font-14">Archieve</span>
                                      </div>
                                    </div>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </span>
                              <div className="chat-profile-img">
                                <img src={devImg} />
                              </div>
                              <div className="chat-profile-info">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h3 className="chat-name">Pankaj Pundir</h3>
                                  <p className="chat-time">8 hours</p>
                                </div>
                                <p className="chat-message mb-0">
                                  Hi,Welcome and thank you for showing an interest in Aviox technologies pvt ltd. Being connected to our company means you get the chance to let us get to know you even more. Start by introducing yourself on your personal profile. A good and informative profile will help us find a right match. We will keep you up to date with jobs that suit your profile.
                                </p>
                              </div>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </Offcanvas.Body>
          </div>
        </div>
      </Offcanvas>
      <Offcanvas show={showToDo} placement="end" className="todo-canvas" onHide={handleCloseToDo}>
        <Offcanvas.Header className="border-bottom-grey pb-3" closeButton>
          <div className="d-flex align-items-center gap-2">
            <Offcanvas.Title>
              To do list
            </Offcanvas.Title>
            <div className="d-flex align-items-center gap-1">
              <Dropdown className="d-inline mx-2" autoClose="outside">
                <Dropdown.Toggle className="filter-btn" id="dropdown-autoclose-outside">
                  <IoFilter />
                </Dropdown.Toggle>

                <Dropdown.Menu className="sort-dropdown">
                  <Dropdown.Item href="#" className="font-14">By due date</Dropdown.Item>
                  <Dropdown.Item href="#" className="font-14">By title</Dropdown.Item>
                  <Dropdown.Item href="#" className="font-14">By candidate</Dropdown.Item>
                  <div className="d-flex align-items-center px-3 justify-content-between complete-wrapper">
                    <Form.Label htmlFor="completed-task" className="font-14 mb-0">Show Completed to-dos</Form.Label>
                    <div class="form-check form-switch toggle-switch-wrapper d-inline-block ps-0">
                      <input
                        class="form-check-input toggle-switch-custom ps-0 ms-0 shadow-none"
                        type="checkbox"
                        role="switch"
                        id="completed-task"
                      />
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              {/* <OverlayTrigger placement="bottom" overlay={newTodoText}>
                <Button className="main-btn px-2 add-new-btn cursor-pointer upload-btn mb-0">+</Button>
              </OverlayTrigger> */}
            </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="todo-canvas-body">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="my-to-dos"
          >
            <div className="d-flex justify-content-center">
              <Nav variant="pills" className="application-pills">
                <Nav.Item className="application-item">
                  <Nav.Link eventKey="my-to-dos" className="application-link">
                    My To-Dos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="application-item">
                  <Nav.Link eventKey="assigned-to-dos" className="application-link">
                    Assigned To-Dos
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="my-to-dos" className="py-4">
                <div className="to-dos-wrapper">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="font-14 fw-semibold">Today</span>
                    <span className="font-14 fw-semibold">0/3</span>
                  </div>
                  <div className="mb-3">
                    <div className="todo-wrapper position-relative mb-3">
                      <div className="todo-option">
                        <Button variant="transparent" className="shadow-none">
                          <FaPencil />
                        </Button>
                        <Button variant="transparent" onClick={handleShowDeleteToDo} className="shadow-none text-danger">
                          <FaTrash />
                        </Button>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <div>
                          <Form.Check type="checkbox" className="checkbox-custom" />
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                          <p className="mb-2 font-14">Review it and create  an appliacation</p>
                          <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-1 today-text font-14">
                              <span><FaCalendarDays /></span>
                              <span>Today</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="todo-wrapper position-relative mb-3">
                      <div className="todo-option">
                        <Button variant="transparent" className="shadow-none">
                          <FaPencil />
                        </Button>
                        <Button variant="transparent" onClick={handleShowDeleteToDo} className="shadow-none text-danger">
                          <FaTrash />
                        </Button>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <div>
                          <Form.Check type="checkbox" className="checkbox-custom" />
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                          <p className="mb-2 font-14">Review it and create  an appliacation</p>
                          <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-1 today-text font-14">
                              <span><FaCalendarDays /></span>
                              <span>Today</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="todo-wrapper mb-2">
                      <div className="d-flex align-items-start gap-2">
                        <div>
                          <Form.Check type="checkbox" className="checkbox-custom" />
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                          <p className="mb-2 font-14">Review it and create  an appliacation</p>
                          <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-1 today-text font-14">
                              <span><FaCalendarDays /></span>
                              <span>Today</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="font-14 fw-semibold">Tomorrow</span>
                    <span className="font-14 fw-semibold">1</span>
                  </div>
                  <div className="todo-wrapper position-relative mb-2">
                    <div className="todo-option">
                      <Button variant="transparent" className="shadow-none">
                        <FaPencil />
                      </Button>
                      <Button variant="transparent" onClick={handleShowDeleteToDo} className="shadow-none text-danger">
                        <FaTrash />
                      </Button>
                    </div>
                    <div className="d-flex align-items-start gap-2">
                      <div>
                        <Form.Check type="checkbox" className="checkbox-custom" />
                      </div>
                      <div>
                        <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                        <p className="mb-2 font-14">Review it and create  an appliacation</p>
                        <div className="d-flex align-items-center gap-3">
                          <div className="d-flex align-items-center gap-1 tomorrow-text font-14">
                            <span><FaCalendarDays /></span>
                            <span>Tomorrow</span>
                          </div>
                          <div className="d-flex align-items-center gap-1 assigned-user font-14">
                            <img src={devImg} />
                            Rohit Sharma
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="font-14 fw-semibold">Completed</span>
                    <span className="font-14 fw-semibold">1</span>
                  </div>
                  <div className="todo-wrapper mb-2">
                    <div className="d-flex align-items-start gap-2">
                      <div>
                        <Form.Check type="checkbox" className="checkbox-custom" checked />
                      </div>
                      <div>
                        <p className="mb-0 fw-semibold completed-task">Create job ad for upcoming marketing manager position</p>
                        <p className="mb-2 font-14 completed-task">Review it and create  an appliacation</p>
                        <div className="d-flex align-items-center gap-3">
                          <div className="d-flex align-items-center gap-1 today-text font-14">
                            <span><FaCalendarDays /></span>
                            <span>Today</span>
                          </div>
                          <div className="d-flex align-items-center gap-1 assigned-user font-14">
                            <img src={devImg} />
                            Rohit Sharma
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="assigned-to-dos" className="py-4">
                <div className="to-dos-wrapper">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="font-14 fw-semibold">Today</span>
                    <span className="font-14 fw-semibold">0/3</span>
                  </div>
                  <div className="mb-3">
                    <div className="todo-wrapper mb-2">
                      <div className="d-flex align-items-start gap-2">
                        <div>
                          <Form.Check type="checkbox" className="checkbox-custom" />
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                          <p className="mb-2 font-14">Review it and create  an appliacation</p>
                          <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-1 today-text font-14">
                              <span><FaCalendarDays /></span>
                              <span>Today</span>
                            </div>
                            <div className="d-flex align-items-center gap-1 assigned-user font-14">
                              <img src={devImg} />
                              Rohit Sharma
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="todo-wrapper mb-2">
                      <div className="d-flex align-items-start gap-2">
                        <div>
                          <Form.Check type="checkbox" className="checkbox-custom" />
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                          <p className="mb-2 font-14">Review it and create  an appliacation</p>
                          <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-1 today-text font-14">
                              <span><FaCalendarDays /></span>
                              <span>Today</span>
                            </div>
                            <div className="d-flex align-items-center gap-1 assigned-user font-14">
                              <img src={devImg} />
                              Rohit Sharma
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="todo-wrapper mb-2">
                      <div className="d-flex align-items-start gap-2">
                        <div>
                          <Form.Check type="checkbox" className="checkbox-custom" />
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                          <p className="mb-2 font-14">Review it and create  an appliacation</p>
                          <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-1 today-text font-14">
                              <span><FaCalendarDays /></span>
                              <span>Today</span>
                            </div>
                            <div className="d-flex align-items-center gap-1 assigned-user font-14">
                              <img src={devImg} />
                              Rohit Sharma
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="font-14 fw-semibold">Tomorrow</span>
                    <span className="font-14 fw-semibold">1</span>
                  </div>
                  <div className="todo-wrapper mb-2">
                    <div className="d-flex align-items-start gap-2">
                      <div>
                        <Form.Check type="checkbox" className="checkbox-custom" />
                      </div>
                      <div>
                        <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                        <p className="mb-2 font-14">Review it and create  an appliacation</p>
                        <div className="d-flex align-items-center gap-3">
                          <div className="d-flex align-items-center gap-1 tomorrow-text font-14">
                            <span><FaCalendarDays /></span>
                            <span>Tomorrow</span>
                          </div>
                          <div className="d-flex align-items-center gap-1 assigned-user font-14">
                            <img src={devImg} />
                            Rohit Sharma
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="todo-wrapper mb-2">
                    <div className="d-flex align-items-start gap-2">
                      <div>
                        <Form.Check type="checkbox" className="checkbox-custom" />
                      </div>
                      <div>
                        <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                        <p className="mb-2 font-14">Review it and create  an appliacation</p>
                        <div className="d-flex align-items-center gap-3">
                          <div className="d-flex align-items-center gap-1 tomorrow-text font-14">
                            <span><FaCalendarDays /></span>
                            <span>Tomorrow</span>
                          </div>
                          <div className="d-flex align-items-center gap-1 assigned-user font-14">
                            <img src={devImg} />
                            Rohit Sharma
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          <div className="new-todo">
            <div className="">
              <Form.Control type="text" className="common-field font-14 mb-2" placeholder="Add your to-do..." />
              <Form.Control type="text" className="common-field font-14 mb-2" placeholder="Add your to-do description..." />
              <div className="d-flex justify-content-between align-items-center pt-2">
                <div className="d-flex align-items-center gap-3">
                  <Dropdown className="assign-dropdown">
                    <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                      <OverlayTrigger placement="top" overlay={assignText}>
                        <span className="assign-user cursor-pointer">
                          <RiUserAddFill />
                        </span>
                      </OverlayTrigger>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="assign-dropdown-menu">
                      <div className="search-field-employee">
                        <Form.Control type="text" className="common-field font-12 mb-2" placeholder="Search Employee" />
                      </div>
                      <div className="employee-listing">
                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="profile-pic-prefix">RG</span>
                          <span className="font-12">robingautam@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="profile-pic-prefix">RG</span>
                          <span className="font-12">robingautam@gmail.com</span>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="assign-dropdown">
                    <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                      <OverlayTrigger placement="top" overlay={calendarText}>
                        <span className="calendar-assign">
                          <FaCalendarDays />
                        </span>
                      </OverlayTrigger>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="assign-dropdown-menu">
                      <div>
                        <span className="font-14 fw-medium d-block mb-2">Quick schedule</span>
                      </div>
                      <ul className="quick-listing">
                        <li>
                          <span className="d-inline-flex align-items-center gap-1">
                            <span className="quick-icon">
                              <CgCalendar />
                            </span>
                            Today
                          </span>
                          <span className="fw-medium">26 Jun</span>
                        </li>
                        <li>
                          <span className="d-inline-flex align-items-center gap-1">
                            <span className="quick-icon">
                              <TiWeatherSunny />
                            </span>
                            Tomorrow
                          </span>
                          <span className="fw-medium">27 Jun</span>
                        </li>
                        <li>
                          <span className="d-inline-flex align-items-center gap-1">
                            <span className="quick-icon">
                              <TbCalendarShare />
                            </span>
                            Friday
                          </span>
                          <span className="fw-medium">28 Jun</span>
                        </li>
                      </ul>
                      <div className="meeting-booking mt-3 to-doschedule mb-0">
                        <Calendar onChange={onChange} value={value} />
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button variant="transparent" className="font-14 border-0 p-0">Cancel</Button>
                  <Button variant="transparent" className="font-14 main-btn pt-2"><IoArrowForward /></Button>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <MeetingInfo show={showMeetingInfo} handleClose={handleCloseMeetingInfo} />
      <AddUserConversation show={adduserconversation} handleClose={handleCloseUserConversation} />
      <DeleteToDo show={deletetodo} handleClose={handleCloseDeleteToDo} />
    </>
  );
};

export default RexettHeader;
