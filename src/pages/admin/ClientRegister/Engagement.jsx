import React from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from '../../../assets/img/demo-img.jpg';
import { IoCameraOutline } from "react-icons/io5";
const ClientEngagement = () => {
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
                                    <span className="resume-step">2</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Engagment</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">3</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Engagement length</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">4</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Start Team</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">5</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Availability</span>
                            </li>
                            <li>
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
                                                Select the ideal length for your engagement
                                            </h2>
                                            <p>Select the ideal length for your engagement</p>
                                        </div>
                                        <p className="font-12 fw-medium">* includes a required field</p>
                                        <div className="">
                                            <Row>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Check type="radio" name="engagement" id="additional_support" label="Additional support for your current team" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Check type="radio" name="engagement" id="starting_project" label="Starting fresh on a new project" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Check type="radio" name="engagement" id="need_help" label="Need help with specific tasks" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Check type="radio" name="engagement" id="not_sure" label="I am not sure at the moment" />
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
                                    <Link to={'/client-engagement-length'} className="main-btn font-14 text-decoration-none">Next: Engagement Length</Link>
                                </div>
                            </div>
                        </div >
                    </Container >
                </div >
            </section >
        </>
    )
}
export default ClientEngagement;