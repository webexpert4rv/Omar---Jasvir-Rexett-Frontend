import React from "react";
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
const MeetingInfo = ({ show, handleClose }) => {
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
                                <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Developer Name</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex align-items-center gap-3 client-imgbx">
                                    <img src={devImg} />
                                    <p className="font-14 mb-0">Rohit Sharma</p>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><BiFont /></span>Title</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div>
                                    Interview Call for Figma to UI Project
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Company Name</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex align-items-center gap-3 client-imgbx">
                                    <img src={clientImg} />
                                    <p className="font-14 mb-0">Amazon</p>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Interviewer's List</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex flex-wrap gap-2 align-items-start">
                                    <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <img src={devImg} />
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
                                    </div>
                                    <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div>
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
                                        <Link to={'/admin/video-screen'} target="_blank" variant="transparent" className="text-decoration-none main-btn font-14 py-2">
                                            <FaVideo /> Join
                                        </Link>
                                        <Button variant="transparent" className="main-btn font-14 ms-2 py-2">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><FaClock /></span>Time and Date</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex align-items-center gap-3 mb-2">
                                    <p className="font-14 mb-0">18:30</p>
                                    <span className="arrow-icon">
                                        <FaArrowRightLong />
                                    </span>
                                    <p className="font-14 mb-0">19:30</p>
                                    <span className="font-14">1h</span>
                                </div>
                                <div className="mb-2 datefield-wrapper">
                                    <p className="font-14">19-06-2024</p>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading">Status</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <span className="status-finished mb-2">Accepted</span>
                                <div className="">
                                    <span className="status-rejected mb-2">Declined</span>
                                    <div>
                                        <p className="fw-semibold font-14 mb-1">Reason</p>
                                        <p className="font-14 mb-0">I have some urgent work, need to go out of station. So I'll be available on <strong>25-06-2024</strong></p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button variant="transparent" className="cancel-btn font-14">Cancel Meeting</Button>
                        </div>
                        <div>
                            <Button variant="transparent" className="outline-main-btn font-14">Edit Meeting</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default MeetingInfo;