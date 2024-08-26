import React from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import ToolTip from '../Tooltip/ToolTip'
import { IoArchiveSharp, IoClose, IoCloseCircleOutline } from 'react-icons/io5'
import { HiOutlineDotsVertical, HiOutlineLink } from 'react-icons/hi'
import { MdEmojiEmotions, MdGifBox } from 'react-icons/md'
import { GrAttachment } from 'react-icons/gr'
import { FaUserCircle } from 'react-icons/fa'
import { TbMessage } from 'react-icons/tb'
import ReactQuill from 'react-quill'
import devImg from "../../../assets/img/user-img.jpg"
import { useSelector } from 'react-redux'

const MessengerDrawer = ({messageWrapperVisible,handleCloseMessageWrapper,isEditorFocused,
    handleShowUserConversation,valuemessga,hasContent,handleEditorFocus,handleEditorBlur,
    handleChange
}) => {


    

    return (
        <>
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
                                    <ToolTip text={"Reassign User"} >
                                        <span className="assign-user cursor-pointer">
                                            <FaUserCircle />
                                        </span>
                                    </ToolTip>
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
                                        <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                                            <span className="font-14 d-inline-block cursor-pointer" onClick={handleShowUserConversation}>Add users</span>
                                        </div>
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
                                <p className="message">I need your help in timesheet reporting. I am facing in submission.</p>
                                <p className="message-time">1 hour ago</p>
                            </div>
                        </div>
                        <div className="receiver-message mt-3">
                            <div className="receiver-profile">
                                <img src={rexettLogo} />
                            </div>
                            <div>

                                <p className="message"><span className="admin-badge">Admin</span> <br /> Hi, <br /> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                <p className="message-time">1 hour ago</p>
                            </div>
                        </div>
                        <div className="sender-message">
                            <div>
                                <div className="message">
                                    <p>Hi, <br /> <br />Welcome and thank you for showing an interest in Aviox technologies pvt ltd. Being connected to our company means you get the chance to let us get to know you even more. Start by introducing yourself on your personal profile. A good and informative profile will help us find a right match. We will keep you up to date with jobs that suit your profile. <br /> <br />Have a great day</p>
                                    <div className='attachment_preview'>
                                        <p className='mb-0'>Privacy Policy.pdf</p>
                                        <p className='del-attac mb-0'>
                                            <IoCloseCircleOutline />
                                        </p>
                                    </div>
                                    <p> -- <br /><br /> Aviox Technologies Pvt Ltd.</p>
                                </div>
                                <p className="message-time">1 hour ago</p>
                            </div>
                            <div className="sender-profile">
                                <img src={devImg} />
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
                                        <ToolTip text={"Message Template"} >
                                            <span>
                                                <TbMessage />
                                            </span>
                                        </ToolTip>
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
                                            <div className="d-flex align-items-center gap-2 employee-item cursor-pointer">
                                                <span className="font-14">Welcome to company</span>
                                            </div>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <input type="file" id="attach-file-msg" className="d-none" />
                                <ToolTip text={"Add Attachment"}>
                                    <label htmlFor="attach-file-msg">
                                        <span>
                                            <GrAttachment />
                                        </span>
                                    </label>
                                </ToolTip>
                                <Dropdown className="assign-dropdown">
                                    <Dropdown.Toggle variant="transparent" className="asssign-dropdown-toggle" id="dropdown-basic">
                                        <ToolTip text={" Smart Link"}>
                                            <span>
                                                <HiOutlineLink />
                                            </span>
                                        </ToolTip>
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
                                <ToolTip text={"Add gif"}>
                                    <span>
                                        <MdGifBox />
                                    </span>
                                </ToolTip>
                                <ToolTip text={"Add emoji"} >
                                    <span>
                                        <MdEmojiEmotions />
                                    </span>
                                </ToolTip>
                            </div>
                            <Button variant="transparent" className="main-btn font-14">Send Message</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessengerDrawer