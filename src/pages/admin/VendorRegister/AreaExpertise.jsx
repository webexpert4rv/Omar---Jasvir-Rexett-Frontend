import React, { useState } from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from '../../../assets/img/demo-img.jpg';
import { IoCameraOutline } from "react-icons/io5";
import ThankRegister from "../ResumeSteps/Modals/ThankRegister";
const AreaExpertise = () => {
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
                                <span>Decision makers info</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">4</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Area of expertise</span>
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
                                                Area of Expertise
                                            </h2>
                                            <p>Rexett invites you to join our platform as a software development vendor and be part of our dynamic community of IT professionals</p>
                                        </div>
                                        <p className="font-12 fw-medium">* includes a required field</p>
                                        <div>
                                            <Row>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Area of Specialization *</Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select</option>
                                                            <option>Healthcare</option>
                                                            <option>Automobile</option>
                                                            <option>Ecommerce</option>
                                                            <option>Information Technology</option>
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Service Offerings *</Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select</option>
                                                            <option>Web Development</option>
                                                            <option>Designing</option>
                                                            <option>Mobile Development</option>
                                                            <option>IoT</option>
                                                            <option>Digital Marketing</option>
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Your Turnaround time to close Contract Positions *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. 8 hours" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Your Turnaround time to close Permanent Positions *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. 24 hours" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Please share your success Stories with atleast 2 of your exiting IT customers and their Contact details for reference check *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Desc" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
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
export default AreaExpertise;