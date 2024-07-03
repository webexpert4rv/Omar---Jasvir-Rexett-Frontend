import React, { useState } from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from '../../../assets/img/demo-img.jpg';
import { IoCameraOutline, IoClose } from "react-icons/io5";
import ThankRegister from "../ResumeSteps/Modals/ThankRegister";
const ScreeningInfo = () => {
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
                                    <span className="resume-step">3</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Job Info</span>
                            </li>
                            <li className="active-step">
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
                                                Screening questions
                                            </h2>
                                            <p>We recommend adding 3 or more questions.</p>
                                        </div>
                                        {/* <p className="font-12 fw-medium">* includes a required field</p> */}
                                        <div className="screening-wrapper mb-4">
                                            <div className="d-flex justify-content-between align-items-center screen-wrapper-heading gap-5">
                                                <Form.Control className="common-field font-14 bg-white" />
                                                <Button
                                                    variant="transparent"
                                                    className="border-0 p-0"
                                                >
                                                    <IoClose />
                                                </Button>
                                            </div>
                                            <Row className="align-items-start screening-grid">
                                                <Col md="4" className="mb-md-0 mb-4">
                                                    <Form.Group>
                                                        <Form.Label className="font-14">
                                                            Response Type
                                                        </Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option value="yes/no">Yes/No</option>
                                                            <option value="subjective">Subjective</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="4" className="mb-md-0 mb-4">
                                                    <Form.Group>
                                                        <Form.Label className="font-14">Ideal answer</Form.Label>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <Form.Check type="radio" name="ideal-radio" className="font-14" label="Yes" id="ideal-yes" />
                                                            <Form.Check type="radio" name="ideal-radio" className="font-14" label="No" id="ideal-no" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="4" className="mb-md-0 mb-4">
                                                    <Form.Group>
                                                        <Form.Label className="font-14">Ideal answer</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            className="common-field font-14"
                                                            placeholder="Enter Answer"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <p className="font-14 mb-2">Add screening questions:</p>
                                <div className="mb-3">
                                    <Button
                                        variant="transparent"
                                        className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer">
                                        + Work Experience
                                    </Button>
                                    <Button
                                        variant="transparent"
                                        className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer">
                                        + Education
                                    </Button>
                                    <Button
                                        variant="transparent"
                                        className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer">
                                        + Language
                                    </Button>
                                    <Button
                                        variant="transparent"
                                        className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer">
                                        + Location
                                    </Button>
                                    <Button
                                        variant="transparent"
                                        className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer">
                                        + Remote work
                                    </Button>
                                    <Button
                                        variant="transparent"
                                        className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer">
                                        + Expertise with skill
                                    </Button>
                                    <Button
                                        variant="transparent"
                                        className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer">
                                        + Onsite work
                                    </Button>
                                    <Button
                                        variant="transparent"
                                        className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer">
                                        Custom question
                                    </Button>
                                </div>
                                <h4 className="section-head font-18 border-0 pb-0 mb-2">
                                    Qualification Settings
                                </h4>
                                <Form.Check
                                    type="checkbox"
                                    className="font-14 job-post-checkbox"
                                    id="filter-check"
                                    label="Filter out and send rejections to applicants who don't meet any must have qualifications." />
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
export default ScreeningInfo;