import React from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from '../../../assets/img/demo-img.jpg';
import { IoCameraOutline } from "react-icons/io5";
const DecisionMakers = () => {
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
                                                Decision Makers Details
                                            </h2>
                                            <p>Rexett invites you to join our platform as a software development vendor and be part of our dynamic community of IT professionals</p>
                                        </div>
                                        <p className="font-12 fw-medium">* includes a required field</p>
                                        <div>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Name *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. John" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Position *</Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select Position</option>
                                                            <option value="ceo">CEO</option>
                                                            <option value="cto">CTO</option>
                                                            <option value="cmo">CMO</option>
                                                            <option value="md">Managing Director</option>
                                                        </Form.Select>
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
                                                        <Form.Control type="email" className="common-field font-14" placeholder="e.g. johndoe123@gmail.com" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="">
                                                <Button variant="transparent" className="position-btn">+ Add another member</Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>

                                </div>
                                <div>
                                    <Link to={'/area-expertise'} className="main-btn font-14 text-decoration-none">Next: Area of Expertise</Link>
                                </div>
                            </div>
                        </div >
                    </Container >
                </div >
            </section >
        </>
    )
}
export default DecisionMakers;