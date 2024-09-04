import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { BiFont } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import clientImg from '../../../assets/img/amazon.png';
import rexettLogo from '../../../assets/img/favicon.png';
import devImg from '../../../assets/img/demo-img.jpg'
import { FaRegCopy } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { meetingCancel } from "../../../redux/slices/clientDataSlice";
import RejectModal from "./RejectModal";
const MeetingInfo = ({ show, handleClose,details }) => {
    const dispatch=useDispatch()
    const [isCancelModal,setCancelModal]=useState({
        isTrue:false,
        data:{}
    })
    const {interview:{id,title,developer_name,interviewers_list,meeting_date,meeting_time,status}}=details
    const cancelMeeting=()=>{
        setCancelModal({isTrue:true})
     
    }
    const onClick=(e,data)=>{
        let payload={
            "reason": data?.rejection_reason
          }
        dispatch(meetingCancel(id,payload))
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Meeting Details</h3>

                    <div>
                        <Row>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><BiFont /></span>Title</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div>
                                    {details?.interview?.title}
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Developer Name</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex align-items-center gap-3 client-imgbx">
                                    <img src={details?.developer?.profile_picture} />
                                    <p className="font-14 mb-0">{details?.developer?.name}</p>
                                </div>
                            </Col>
                            {/* <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Company Name</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex align-items-center gap-3 client-imgbx">
                                    <img src={clientImg} />
                                    <p className="font-14 mb-0">Amazon</p>
                                </div>
                            </Col> */}
                            {/* <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Interviewer's List</p>
                            </Col> */}
                            <Col lg={8} className="mb-3">
                                <div className="d-flex flex-wrap gap-2 align-items-start">
                                    {/* <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <img src={devImg} />
                                            <p className="mb-0">{interviewers_list}</p>
                                        </div>
                                    </div> */}
                                    {/* <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div> */}
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><FaVideo /></span>Video Meeting Solution</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-3 video-meetbx">
                                        <img src={rexettLogo} />
                                        <p className="font-14 mb-0">Video Meeting (Rexett)</p>
                                    </div>
                                    <div>
                                        <Button variant="transparent" className="copy-link">
                                            <FaRegCopy />
                                        </Button>
                                        <Link to={details?.interview?.meeting_link} target="_blank" variant="transparent" className="text-decoration-none main-btn font-14 py-2">
                                            <FaVideo /> Join
                                        </Link>
                                        {/* <Button variant="transparent" className="main-btn font-14 ms-2 py-2">
                                            View Details
                                        </Button> */}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><FaClock /></span>Time and Date</p>
                            </Col>
                            <Col lg={8} className="mb-3 associate-text">
                                <div className="d-inline-flex align-items-center gap-2">
                                    <div className="datefield-wrapper associate">
                                        <p className="font-14 mb-0">{meeting_date}</p>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 associate">
                                        <p className="font-14 mb-0">{meeting_time}</p>
                                        {/* <span className="arrow-icon">
                                            <FaArrowRightLong />
                                        </span>
                                        <p className="font-14 mb-0">19:30</p>
                                        <span className="font-14">1h</span> */}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading">Status</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                              {  status=="scheduled"? <span className="status-finished mb-2">Accepted</span>
                                :<div className="">
                                    <span className="status-rejected mb-2">Declined</span>
                                    <div>
                                        <p className="fw-semibold font-14 mb-1">Reason</p>
                                        <p className="font-14 mb-0">I have some urgent work, need to go out of station. So I'll be available on <strong>25-06-2024</strong></p>
                                    </div>
                                </div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button variant="transparent" className="cancel-btn font-14" onClick={cancelMeeting}>Cancel Meeting</Button>
                        </div>
                        <div>
                            <Button variant="transparent" className="outline-main-btn font-14">Interview Completed</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <RejectModal show={isCancelModal?.isTrue} onClick={onClick}/>
        </>
    )
}
export default MeetingInfo;