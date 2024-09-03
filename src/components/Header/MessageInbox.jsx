import React, { useEffect, useState } from "react";
import Tabs from "../common/LeaveRequest/Tabs";
import { MESSAGE_TAB_TEXT } from "../clients/TimeReporiting/constant";
import { Button, Dropdown, Form, Offcanvas, Tab } from "react-bootstrap";
import devImg from "../../assets/img/user-img.jpg";
import { HiOutlineDotsVertical, HiOutlineLink } from "react-icons/hi";
import ToolTip from "../common/Tooltip/ToolTip";
import { MdEmojiEmotions, MdGifBox } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoArchiveSharp, IoClose, IoCloseCircleOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import { TbMessage } from "react-icons/tb";
import { GrAttachment } from "react-icons/gr";
import io from "socket.io-client";
import rexettLogo from "../../assets/img/favicon.png";
import AddUserConversation from "../common/Modals/AddUsers";
import MoreChatOptions from "../common/MessageBox/MoreChatOptions";
import MessageInboxCard from "../common/MessageBox/MessageInboxCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAdminEmployees,
  getAllArchiveMessages,
  getAllInboxMessage,
  getAllMessageTemplates,
  getReassign,
  getTemplateById,
  getUnreadMessages,
  messageSendFunc,
} from "../../redux/slices/adminDataSlice";
import { fileUploadForWeb, getAllMessages, getChatRoomData, getChatRoomMembers } from "../../redux/slices/developerDataSlice";
import moment from "moment";
import { NOTIFICATIONBASEURL } from "../../helper/utlis";
import { Controller, useForm } from "react-hook-form";
import PreviewModal from "../../pages/admin/ResumeSteps/Modals/PreviewResume";
import { filePreassignedUrlGenerate } from "../../redux/slices/clientDataSlice";
import RexettButton from "../atomic/RexettButton";

function MessageInbox({ showMessagesInfo, setShowMessagesInfo }) {
  let userId = localStorage.getItem("userId");
  const [selectedTab, setSelectedTab] = useState("")
  const [currentTab, setCurrentTab] = useState();
  const [hasContent, setHasContent] = useState(false);
  const [isEditorFocused, setIsEditorFocused] = useState(true);
  const [valuemessga, setValuemessga] = useState("");
  const [messageWrapperVisible, setMessageWrapperVisible] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [chtRoomId, setChtRoomId] = useState(null)
  const [selectedChat, setSelectedChat] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [selectedImg, setSelectedImg] = useState()
  const { chatRoomMessageList } = useSelector((state) => state.developerData)
  const [filteredName, setFilteredName] = useState("")
  const [type, setType] = useState("")
  const{memberList} = useSelector(state=>state.developerData)
  const dispatch = useDispatch();
  const { messageTemplates, chatRoom } = useSelector(
    (state) => state.adminData
  );

  const { chatData } = useSelector((state) => state.developerData);
  const { approvedLoader } = useSelector((state) => state.adminData);
  const { allAdminEmployees } = useSelector(state => state.adminData)
  const [chatmessages, setChatMessages] = useState([])
  const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm();
  const socket = io(NOTIFICATIONBASEURL);
  const [adduserconversation, showAddUserConversation] = useState(false);

  useEffect(() => {
    setChatMessages(chatData)
    setValuemessga("")
    setHasContent("")
    setSelectedImg("")
    setPreviewUrl("")
  }, [chatData])

 

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    socket.on(`new_message_received_${userId}`, (message) => {
      // setChatMessages([...chatmessages, message]); 

      if(message){
      setChatMessages(prevMessages => [...prevMessages, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [])


  const stripHtmlTags = (str) => {
    return str?.replace(/<\/?[^>]+(>|$)/g, "");
  };



  useEffect(() => {
    dispatch(getAllAdminEmployees())
    dispatch(getAllMessages(userId));
    dispatch(getAllMessageTemplates());

  }, [userId]);

  const handleShowUserConversation = () => {
    showAddUserConversation(!adduserconversation);
  };
  const handleSelect = (selectedTab) => {
    if (currentTab === "first") {
      setSelectedTab("inbox")
    } else if (currentTab === "second") {
      setSelectedTab("unread")
    } else {
      setSelectedTab("archive")
    }
    if (selectedTab === "first") {
      const payload = {
        type: "inbox",
        // developer_name : "pankaj_pundir",
        page: "1",
        per_page: "10"
      }
      dispatch(getAllMessages(userId, payload));
    } else if (selectedTab === "second") {
      const payload = {
        type: "unread",
        // developer_name : "pankaj_pundir",
        page: "1",
        per_page: "10"
      }
      dispatch(getAllMessages(userId, payload));
    } else {
      const payload = {
        type: "archive",
        // developer_name : "pankaj_pundir",
        page: "1",
        per_page: "10"
      }
      dispatch(getAllMessages(userId, payload));
    }
    setCurrentTab(selectedTab);
  };
  const handleCloseMessageWrapper = () => {
    setMessageWrapperVisible(false);
  };
  const handleCloseUserConversation = () => {
    showAddUserConversation(false);
  };


  const handleChatProfileClick = (roomId) => {
    const selectedChat = chatRoomMessageList?.chatRooms?.find(itm => itm.id == roomId)
    setSelectedChat(selectedChat)
    setChtRoomId(roomId)
    dispatch(getChatRoomData(roomId));
    dispatch(getChatRoomMembers(roomId))
    setMessageWrapperVisible(true);
  };
  const handleCloseMessages = () => {
    setShowMessagesInfo(false);
  };

  const handleEditorFocus = () => {
    setIsEditorFocused(true);
  };

  const handleEditorBlur = () => {
    setIsEditorFocused(false);
  };

  const handleMessageChange = (e, name) => {
    const newValue = e;
    if (name == "msg") {
      setValuemessga(newValue);
      setHasContent(newValue.trim().length > 0);
      // } else {
      // setMessageTitle(newValue.target.value);
    }
  };
  const onSubmit = (values) => {
    let payload;
    if (selectedImg) {
      let fileData = new FormData()
      fileData.append("file", selectedImg);
      dispatch(fileUploadForWeb(fileData, (url) => {
        payload = {
          chatroom_id: chtRoomId,
          sender_id: userId,
          message_title: "string",
          message_body: (stripHtmlTags(values?.message)),
          file_type: type,
          message_attachment_url: url,
        };
        dispatch(messageSendFunc(payload));
      }))
    } else {
      payload = {
        chatroom_id: chtRoomId,
        sender_id: userId,
        message_title: "string",
        message_body: (stripHtmlTags(values?.message)),
        message_attachment_url: "string",
        file_type: "",
      }
      dispatch(messageSendFunc(payload))
    }
    // setMessageTitle("")
    setValuemessga("")
    setHasContent("")
    setSelectedImg("")
    setPreviewUrl("")
    socket.on(`new_message_sent_${userId}`, (rmsg) => {
    })
    reset()
  };


  const popuplateOntheMessage = (data) => {
    dispatch(
      getTemplateById(data?.id, (response) => {
        setValuemessga(response?.message);
        // setMessageTitle(response?.subject);
      })
    );
  };
  const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"]
  const handleFileUpload = (event) => {
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg", "image/svg+xml", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",];
    const file = event.target.files[0];
    setType(file?.type)
    setSelectedImg(file)
    if (file && allowedTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewUrl(reader.result);
        }
      }
      reader.readAsDataURL(file);
    }
  }

  const handleEmpSelect = (emp) => {
    let payload = {
      "user_id": userId,
      "assigned_member_id": emp?.id,
      "assigned_member_role": emp?.role
    }
    dispatch(getReassign(payload))
  }


  const filterByName = (event) => {
    const searchValue = event.target.value;
    const filteredChatRooms = chatRoomMessageList?.chatRooms?.filter(chatRoom =>
      chatRoom.members[0]?.user?.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredName(filteredChatRooms)
    return filteredChatRooms;
  };


  const handleClose = () => {
    setMessageWrapperVisible(false);
  }
  const handleClear = () => {
    setSelectedImg()
  }


  return (
    <div>
      <Offcanvas
        show={showMessagesInfo}
        placement="end"
        className={`message-offcanvas ${messageWrapperVisible ? "visible" : ""
          }`}
        onHide={handleCloseMessages}
      >
        <div className="d-flex align-items-start">
          <div
            className={`message-wrapper ${messageWrapperVisible ? "visible" : ""
              }`}
          >
            <div className="message-wrapper-header">
              <div className="about-chat">
                <img src={selectedChat?.members[0]?.user?.profile_picture} />
                <h3>{selectedChat?.members[0]?.user?.name}</h3>
              </div>
              <div className="message-options">
                <span className="message-header-icon">
                  <Dropdown className="assign-dropdown">
                    <Dropdown.Toggle
                      variant="transparent"
                      className="asssign-dropdown-toggle"
                      id="dropdown-basic"
                    >
                      <ToolTip text={"Reassign User"}>
                        <span className="assign-user cursor-pointer">
                          <FaUserCircle />
                        </span>
                      </ToolTip>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="assign-dropdown-menu">
                      <div className="search-field-employee">
                        <Form.Control
                          type="text"
                          className="common-field font-12 mb-2"
                          placeholder="Search Employee"
                        />
                      </div>
                      <div className="employee-listing">
                        {allAdminEmployees?.map((emp, idx) => {
                          return (
                            <>
                              <div className="d-flex align-items-center gap-2 employee-item cursor-pointer" key={idx} onClick={() => handleEmpSelect(emp)}>
                                <span className="profile-pic-prefix">{emp?.profile_picture}</span>
                                <span className="font-12">{emp?.name}</span>
                              </div>
                            </>
                          )
                        }
                        )}
                        {/* <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="profile-pic-prefix">RG</span>
                          <span className="font-12">robingautam@gmail.com</span>
                        </div> */}
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
                {/* <span className="message-header-icon">
                  <IoArchiveSharp />
                </span> */}
                <span className="message-header-icon">
                  <Dropdown className="assign-dropdown">
                    <Dropdown.Toggle
                      variant="transparent"
                      className="asssign-dropdown-toggle"
                      id="dropdown-basic"
                    >
                      <span className="assign-user cursor-pointer">
                        <HiOutlineDotsVertical />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="assign-dropdown-menu more-option-menu">
                      <div className="employee-listing">
                        {/* <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="font-14">Mark as unread</span>
                        </div> */}
                        {/* <div className="d-flex align-items-center gap-2 employee-item cursor-pointer"> */}
                        {/* <span
                            className="font-14 d-inline-block cursor-pointer"
                            onClick={handleShowUserConversation}
                          >
                            Add users
                          </span> */}
                        {/* </div> */}
                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                          <span className="font-14 text-danger" onClick={handleClose}>
                            Leave conversation
                          </span>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
                <span
                  className="message-header-icon"
                  onClick={handleCloseMessageWrapper}
                >
                  <IoClose />
                </span>
              </div>
            </div>
            <div className="main-message-area">
              <div className="area-profile mb-4">
                <img src={selectedChat?.members[0]?.user?.profile_picture} />
                <h4>{selectedChat?.members[0]?.user?.name}</h4>
                <span className="status-info">Developer</span>
              </div>
              <div>
                <p className="msg-subject-name">
                  <span className="subject-name">Invited</span>
                </p>
                {chatmessages?.length > 0
                  ? chatmessages?.map((item, index) => {
                    let isReceiver = item?.sender_id == userId
                    let data = item?.message_body
                    let file = item?.message_attachment_url
                    let file_type = item?.file_type




                    const showTime =
                      index === chatmessages.length - 1 ||
                      chatmessages[index + 1].sender_id !== item.sender_id;


                    return (
                      <>
                        <div className={isReceiver ? "receiver-message" : "sender-message"}>
                          {isReceiver && showTime && <div className="sender-profile">
                            <img src={memberList[0].profile_picture} />
                          </div>
                          
                          }
                          <div>

                            {/* <div>
                            <p className="message" dangerouslySetInnerHTML={{ __html: data }} />
                            {showTime && <p className="message-time">{moment(item?.created_at).fromNow()}</p>}
                          </div> */}


                            {file_type && data ? (
                              <div >
                                {imageTypes?.includes(file_type) ?
                                  <div className="preview-upload-imgwrapper">
                                    <img src={file} className="upload-preview-img" alt="Preview" />
                                  </div>
                                  :
                                  <a href={file} target="_blank" rel="noopener noreferrer">{file} </a>
                                }
                                <p className="message" dangerouslySetInnerHTML={{ __html: data }} />
                                {showTime && <p className="message-time">{moment(item?.created_at).fromNow()}</p>}
                              </div>
                            ) : (
                              data && (
                                <div>
                                  <p className="message" dangerouslySetInnerHTML={{ __html: data }} />
                                  {showTime && <p className="message-time">{moment(item?.created_at).fromNow()}</p>}
                                </div>
                              )
                            )}
                          </div>
                          {!isReceiver && showTime && <div className="sender-profile">
                            <img src={memberList[1]?.profile_picture} />
                          </div>}
                        </div>
                        {/* <div className="receiver-message">
                            <div className="receiver-profile">
                              <img src={devImg} />
                            </div>
                            <div>
                              <p className="message">
                                I need your help in timesheet reporting. I am
                                facing in submission.
                              </p>
                              <p className="message-time">1 hour ago</p>
                            </div>
                          </div>
                          <div className="receiver-message mt-3">
                            <div className="receiver-profile">
                              <img src={rexettLogo} />
                            </div>
                            <div>
                              <p className="message">
                                <span className="admin-badge">Admin</span>{" "}
                                <br /> Hi, <br /> Lorem Ipsum is simply dummy
                                text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard
                                dummy text ever since the 1500s.
                              </p>
                              <p className="message-time">1 hour ago</p>
                            </div>
                          </div>
                          <div className="sender-message">
                            <div>
                              <div className="message">
                                <p>
                                  Hi, <br /> <br />
                                  Welcome and thank you for showing an interest
                                  in Aviox technologies pvt ltd. Being connected
                                  to our company means you get the chance to let
                                  us get to know you even more. Start by
                                  introducing yourself on your personal profile.
                                  A good and informative profile will help us
                                  find a right match. We will keep you up to
                                  date with jobs that suit your profile. <br />{" "}
                                  <br />
                                  Have a great day
                                </p>
                                <div className="attachment_preview">
                                  <p className="mb-0">Privacy Policy.pdf</p>
                                  <p className="del-attac mb-0">
                                    <IoCloseCircleOutline />
                                  </p>
                                </div>
                                <p>
                                  {" "}
                                  -- <br />
                                  <br /> Aviox Technologies Pvt Ltd.
                                </p>
                              </div>
                              <p className="message-time">1 hour ago</p>
                            </div>
                            <div className="sender-profile">
                              <img src={devImg} />
                            </div>
                          </div> */}
                      </>
                    );
                  })
                  : ""}
              </div>
            </div>
            <div className="write-message-area">
              {/* <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0">
                  <span className="fw-medium">
                    Subject:{" "}
                    <span className="ongoing-subject">Re: Invited</span>
                  </span>
                  <span className="new-subject">+ New Subject</span>
                </p>
                <div className="sender-profile">
                  <img src={selectedChat?.members[0]?.user?.profile_picture} />
                </div>
              </div> */}
              {/* <div>
                <Form.Control
                  type="text"
                  value={messageTitle}
                  className="common-field font-14 mb-2"
                  placeholder=""
                  onChange={(e) => handleMessageChange(e, "title")}
                />
              </div> */}
              {selectedImg ? <div className="py-1 px-2 mb-1 attachment-msg rounded-2 d-flex justify-content-between align-items-center">
                {/* <p className="mb-0 font-14">  */}
                {imageTypes.includes(selectedImg?.type) ?
                  <div className="preview-upload-imgwrapper">
                    <img src={previewUrl} className="upload-preview-img" alt="URL" />
                  </div>
                  : <a href={previewUrl} target="_blank" rel="noopener noreferrer">{previewUrl} </a>}
                {/* </p> */}
                <button className="bg-transparent cursor-pointer border-0 outline-none shadow-none" onClick={handleClear}>&times;</button>
              </div> : ""}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="position-relative">
                  <div
                    className={`custom-rich-editor message-field ${isEditorFocused || hasContent ? "focused" : ""
                      }`}
                  >
                    <Controller
                      name="message"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field: { onChange, value } }) => (
                        <ReactQuill
                          value={valuemessga ? valuemessga : value}
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors?.message && (
                      <p className="error-message ">{errors.message?.message}</p>
                    )}

                  </div>
                  <div
                    className={`field-msg-options d-flex align-items-center gap-3 ${isEditorFocused || hasContent ? "focused" : ""
                      }`}
                  >
                    <div className="inner-field-msg-options">
                      <Dropdown className="assign-dropdown">
                        <Dropdown.Toggle
                          variant="transparent"
                          className="asssign-dropdown-toggle"
                          id="dropdown-basic"
                        >
                          <ToolTip text={"Message Template"}>
                            <span>
                              <TbMessage />
                            </span>
                          </ToolTip>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="assign-dropdown-menu more-option-menu">
                          <div className="search-field-employee">
                            <Form.Control
                              type="text"
                              className="common-field font-12 mb-2"
                              placeholder="Search Template"
                            />
                          </div>
                          <div className="employee-listing">
                            {messageTemplates?.templates?.map((item) => {
                              return (
                                <>
                                  <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                                    <span
                                      className="font-14"
                                      onClick={() => popuplateOntheMessage(item)}
                                    >
                                      {item.template_name}
                                    </span>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Form.Control
                        type="file"
                        id="attach-file-msg"
                        name="message_attachment_url"
                        className="d-none"
                        onChange={handleFileUpload}
                      />
                      {/* {imageTypes.includes(selectedImg?.type) ? <div className="preview-upload-imgwrapper">
                        <img src={previewUrl} className="upload-preview-img" alt="URL" />
                      </div> : <a href={previewUrl} target="_blank" rel="noopener noreferrer">{previewUrl} </a>} */}
                      <ToolTip text={"Add Attachment"}>
                        <label htmlFor="attach-file-msg">
                          <span>
                            <GrAttachment />
                          </span>
                        </label>
                      </ToolTip>
                      <Dropdown className="assign-dropdown">
                        <Dropdown.Toggle
                          variant="transparent"
                          className="asssign-dropdown-toggle"
                          id="dropdown-basic"
                        >
                          <ToolTip text={" Smart Link"}>
                            <span>
                              <HiOutlineLink />
                            </span>
                          </ToolTip>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="assign-dropdown-menu more-option-menu">
                          <div className="search-field-employee">
                            <Form.Control
                              type="text"
                              className="common-field font-12 mb-2"
                              placeholder="Search Pages"
                            />
                          </div>
                          {/* <div className="employee-listing">
                            <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                              <span className="font-14">Career page</span>
                            </div>
                            <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                              <span className="font-14">Job page</span>
                            </div>
                          </div> */}
                        </Dropdown.Menu>
                      </Dropdown>
                      {/* <ToolTip text={"Add gif"}>
                      <span>
                        <MdGifBox />
                      </span>
                    </ToolTip>
                    <ToolTip text={"Add emoji"}>
                      <span>
                        <MdEmojiEmotions />
                      </span>
                    </ToolTip> */}
                    </div>
                    <RexettButton
                      type={"submit"}
                      text={"Send Message"}
                      variant="transparent"
                      // onClick={sendMessage}
                      className="main-btn font-14"
                      isLoading={approvedLoader}
                      disabled={approvedLoader}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="inner-message-area">
            {/* <Offcanvas.Header className="border-bottom-grey pb-3" closeButton>
              <div className="d-flex align-items-center gap-2">
                <Offcanvas.Title>Message Inbox</Offcanvas.Title>
              </div>
            </Offcanvas.Header> */}
            <Offcanvas.Body className="message-canvas-body">
              <div>
                <div>
                  <Form.Control
                    type="text"
                    placeholder="Search here..."
                    className="common-field font-14 mb-2"
                    onChange={(e) => filterByName(e)}
                  />
                </div>
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey="all-message"
                >
                  <Tab.Content>
                    <Tab.Pane eventKey="all-message" className="pt-3 pb-4">
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="all-in-message"
                      >
                        <Tabs
                          handleSelect={handleSelect}
                          tabText={MESSAGE_TAB_TEXT}
                          currentTab={currentTab}
                        />
                        <Tab.Content>
                          <Tab.Pane eventKey="all-in-message" className="mt-2">
                            <MessageInboxCard
                              type={selectedTab}
                              chatRoom={chatRoom}
                              messageWrapperVisible={messageWrapperVisible}
                              handleChatProfileClick={handleChatProfileClick}
                              stripHtmlTags={stripHtmlTags}
                              filteredName={filteredName}
                              setSelectedTab={setSelectedTab}
                            />
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
      <AddUserConversation
        show={adduserconversation}
        handleClose={handleCloseUserConversation}
      />
    </div>
  );
}

export default MessageInbox;
