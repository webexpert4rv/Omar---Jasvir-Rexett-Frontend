import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaVideo } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import attendeeImg from '../../assets/img/demo-img.jpg';
const VideoCallScreen = () => {
    return(
        <>
            <div className="video-screen">
                <div className="inner-video-screen">
                    <Row>
                        <Col lg={6}>
                            <div className="screen-col">
                                <div className="video-box">

                                </div>
                                <div className="p-3">
                                    <div className="media-field-wrapper mb-3">
                                        <span className="media-icon">
                                            <FaVideo />
                                        </span>
                                        <Form.Select className="common-field font-14">
                                            <option value="integrated-camera">Integrated Camera (04f2:b6c2)</option>
                                            <option value="lenovo-webcam">Lenovo Webcam v5 (f62:123g)</option>
                                        </Form.Select>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="media-field-wrapper">
                                            <span className="media-icon">
                                                <FaMicrophone />
                                            </span>
                                            <Form.Select className="common-field font-14">
                                                <option value="default-microphone">Default - Microphone Array Realtek(R) Audio</option>
                                                <option value="communication - microphone">Communication - Microphone Array Realtek(R) Audio</option>
                                                <option value="microphone-array">Microphone Array Realtek(R) Audio</option>
                                            </Form.Select>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <FaMicrophone />
                                            <div className="mic-bars">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="meeting-info-wrapper card-box">
                                <h3 className="meeting-title">Interview Call for Figma to UI Project</h3>
                                <div className="mb-4 d-flex align-items-center gap-3">
                                    <p className="d-flex align-items-center gap-1 font-14 mb-1">
                                        <FaClock /> 18:30 - 19:30 (CEST)
                                    </p>
                                    <p className="d-flex align-items-center gap-1 font-14 mb-1">
                                        <FaCalendarDays /> Tue, 19-08-2024
                                    </p>
                                </div>
                                <div>
                                    <h4 className="attendee-heading">Attendees (1)</h4>
                                    <div className="attendee-wrapper mb-3">
                                        <div className="attendee-imgbx">
                                            <img src={attendeeImg} />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <Form.Control type="text" className="common-field font-14" placeholder="Enter your name" />
                                        <Button variant="transparent" className="main-btn font-14">Join</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default VideoCallScreen