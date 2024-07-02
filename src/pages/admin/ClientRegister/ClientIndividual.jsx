import React, { useState } from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from '../../../assets/img/dummy-logo.jpg';
import { IoCameraOutline } from "react-icons/io5";
import SetupJob from "./Modal/Setupjob";
import ThankRegister from "../ResumeSteps/Modals/ThankRegister";
const ClientIndividual = () => {
    const [showsetupjob, showSetupjob] = useState(false);
    const handleShowSetupjob = () => {
        showSetupjob(!showsetupjob);
    }
    const handleCloseSetupjob = () => {
        showSetupjob(false);
    }
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
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">3</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Job Info</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">4</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Job Description</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">5</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Screening info</span>
                            </li>
                        </ul>
                    </div>
                    <h4 className="resume-sideheading mt-3">Resume Completeness:</h4>
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
                                                What's the most convenient way for us to reach out to you?
                                            </h2>
                                            <p>We suggest including an email and phone number</p>
                                        </div>
                                        <p className="font-12 fw-medium">* includes a required field</p>
                                        <div className="d-flex align-items-start gap-3">
                                            <div className="profile-upload-preview position-relative">
                                                <div className="profile-img-preview w-100 h-100">
                                                    <img src={profileImg} />
                                                </div>
                                                <Form.Control type="file" className="d-none" id="profile-img-upload" />
                                                <Form.Label htmlFor="profile-img-upload" className="profile-img-label">
                                                    <IoCameraOutline />
                                                </Form.Label>
                                            </div>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">First Name *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. John" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Surname *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Doe" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Phone Number *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. +91 123 456 7890" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Email *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. johndoe123@gmail.com" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Password</Form.Label>
                                                        <Form.Control type="password" className="common-field font-14" placeholder="Enter password" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Confirm new password</Form.Label>
                                                        <Form.Control type="password" className="common-field font-14" placeholder="Enter confirm password" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Tax ID</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="Enter Tax ID" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Yearly revenue</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="Enter Tax ID" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Address</Form.Label>
                                                        <Form.Control type="password" className="common-field font-14" placeholder="E.g. Street 1341, New area, CA, USA" />
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Country</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. India" />
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">State</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Punjab" />
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">City</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Amritsar" />
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Pin Code</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. 143001" />
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Timezone</Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select Timezone</option>
                                                            <option>GMT (+5:30) Kolkata</option>
                                                        </Form.Select>
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
                                    <Button onClick={handleShowThanksRegister} className="outline-main-btn font-14 text-decoration-none me-3">Done</Button>
                                    <Button onClick={handleShowSetupjob} className="main-btn font-14 text-decoration-none">Next: Setup job</Button>
                                </div>
                            </div>
                        </div >
                    </Container >
                </div >
            </section>
            <SetupJob show={showsetupjob} handleClose={handleCloseSetupjob} />
            <ThankRegister show={showthanksregister} handleClose={handleCloseThanksRegister} /> 
        </>
    )
}
export default ClientIndividual;