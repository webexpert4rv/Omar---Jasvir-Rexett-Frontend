import React, { useState } from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoAddOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
const AddProjects = () => {
    const [valuedescr, setValueDescr] = useState('');
    const handleChange = (value) => {
        setValueDescr(value);
    };
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
                                <span>Heading</span>
                            </li>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">2</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Work History</span>
                            </li>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">3</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Education</span>
                            </li>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">4</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Skills</span>
                            </li>
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">5</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Summary</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">6</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Projects</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">7</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Finalize</span>
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
                                                Tell us about your project history
                                            </h2>
                                            <p>We'll start there and work backward.</p>
                                        </div>
                                        <p className="font-12 fw-medium">* includes a required field</p>
                                        <div>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Project title *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Ai chat bot" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Role *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Team Lead" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Project Tyepe *</Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select type</option>
                                                            <option>Healthcare</option>
                                                            <option>Artificial Intelligence</option>
                                                            <option>E-commerce</option>
                                                            <option>Gaming</option>
                                                            <option>LegalTech</option>
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Project URL *</Form.Label>
                                                        <Form.Control type="type" placeholder="E.g. https://www.dummywebsite.com" className="common-field font-14" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Skills</Form.Label>
                                                        <Form.Control type="type" placeholder="Eg.g. HTML" className="common-field font-14" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Start Date</Form.Label>
                                                        <Form.Control type="date" className="common-field font-14" />
                                                    </div>
                                                </Col>
                                                <Col md={6} className="align-self-end">
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">End Date</Form.Label>
                                                        <Form.Control type="date" className="common-field font-14" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Label className="font-14 fw-medium">Recommended description</Form.Label>
                                                <div>
                                                    <div className="recommended-desc">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                <IoAddOutline />
                                                            </Button>
                                                            <div>
                                                                <p className="font-14 fw-medium mb-1">Expert Recommended</p>
                                                                <p className="font-14 mb-0">Experienced Web Developer with passion for creating attractive and interactive websites meeting customer needs and exceeding expectations.</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                <IoAddOutline />
                                                            </Button>
                                                            <div>
                                                                <p className="font-14 fw-medium mb-1">Expert Recommended</p>
                                                                <p className="font-14 mb-0">Driven Web Developer with a proven track record at Aviox, showcasing rapid adaptability and exceptional communication skills.</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                <IoAddOutline />
                                                            </Button>
                                                            <div>
                                                                <p className="font-14 mb-0">Logical and results-driven Web Developer dedicated to building and optimizing user-focused websites for customers with various business objectives.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label className="font-14 fw-medium">Project description</Form.Label>
                                                <div id="custom-ck">
                                                    <ReactQuill value={valuedescr} onChange={handleChange} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>

                                </div>
                                <div>
                                    <Button variant="transparent" className="font-14 outline-main-btn me-3">Preview</Button>
                                    <Link to={'/project-summary'} className="main-btn font-14 text-decoration-none">Next</Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}
export default AddProjects;