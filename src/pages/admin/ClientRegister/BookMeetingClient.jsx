import React, { useState } from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from '../../../assets/img/demo-img.jpg';
import { IoCameraOutline } from "react-icons/io5";
import ThankRegister from "../ResumeSteps/Modals/ThankRegister";
const ClientBookMeeting = () => {
    const [showthanksregister , setShowThanksRegister] = useState(false);
    const handleShowThanksRegister = () =>{
        setShowThanksRegister(!showthanksregister)
    }
    const handleCloseThanksRegister = () =>{
        setShowThanksRegister(false);
    }
    return (
        <>
            <section className="resume-section-wrapper">
                <div className="resume-sidebar">
                    <div className="resume-sidelogo mb-4">
                        <img src={rexettLogo} />
                    </div>
                    <div>
                        <ul>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">1</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Personal</span>
                            </li>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">2</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Engagment</span>
                            </li>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">3</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Engagement length</span>
                            </li>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">4</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Start Team</span>
                            </li>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">5</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Availability</span>
                            </li>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">6</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Skillset</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">7</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Book Meeting</span>
                            </li>
                        </ul>
                    </div>
                    <h4 className="resume-sideheading mt-3">Completeness:</h4>
                    <div className="resume-progress-wrapper">
                        <div className="resume-progressbx">
                            <div></div>
                        </div>
                        <span className="resume-progress-status font-12 fw-medium">33%</span>
                    </div>
                </div>
                <div className="resume-main-wrapper">
                    <Container>
                        <div>
                            <Link className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium"><FaArrowLeft /> Go Back</Link>
                            <div>
                                <Row>
                                    <Col md={12}>
                                        <div>
                                            <h2 className="resume-heading">
                                                Book a Meeting with your Personal Matcher
                                            </h2>
                                            <p>We suggest including an email and phone number</p>
                                        </div>
                                        <p className="font-12 fw-medium">* includes a required field</p>
                                        <div>
                                            <Row>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Select your date</Form.Label>
                                                        <Form.Control type="date" className="common-field font-14" placeholder="e.g. John" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-0">
                                                        <Form.Label className="font-14 fw-medium">Select Timeslot</Form.Label>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className="w-25">
                                                                <Form.Label className="font-14 fw-medium">From</Form.Label>
                                                                <Form.Control type="time" className="common-field font-14" />
                                                            </div>
                                                            <span className="d-inline-block mt-4">
                                                                <FaArrowRight />
                                                            </span>
                                                            <div className="w-25">
                                                                <Form.Label className="font-14 fw-medium">To</Form.Label>
                                                                <Form.Control type="time" className="common-field font-14" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>

                                </div>
                                <div>
                                    <Button onClick={handleShowThanksRegister} className="main-btn font-14 text-decoration-none">Submit</Button>
                                </div>
                            </div>
                        </div >
                    </Container >
                </div >
            </section >
            <ThankRegister show={showthanksregister} handleClose={handleCloseThanksRegister} />
        </>
    )
}
export default ClientBookMeeting;