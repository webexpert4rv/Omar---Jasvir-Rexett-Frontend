import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { FaArrowLeft, FaCheck, FaChevronDown, FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
const ProjectSummary = () => {
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
                                                Project summary
                                            </h2>
                                        </div>
                                        <div className="work-summary-wrapper mb-3">
                                            <span className="work-count">1</span>
                                            <div className="w-100 pt-4">
                                                <h4 className="summary-heading mb-2 fw-semibold">
                                                    AI chat bot, Team Lead
                                                </h4>
                                                <p className="font-14 mb-1">Healthcare | February 2023 - January 2025</p>
                                                <p className="font-14">https://www.aichat.com</p>
                                                <ul>
                                                    <li className="font-14">
                                                        Self-motivated, with a strong sense of personal responsibility.
                                                    </li>
                                                    <li className="font-14">Excellent communication skills, both verbal and written.
                                                    </li>
                                                </ul>
                                                <div className="d-flex align-items-center justify-content-between mt-4">
                                                    <Link className="text-decoration-none text-green font-14">
                                                        <FaPencil /> Edit description
                                                    </Link>
                                                    <Link className="text-decoration-none text-green font-14">
                                                        Show more detail <FaChevronDown />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <Button variant="transparent" className="position-btn">+ Add another project</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>

                                </div>
                                <div>
                                    <Button variant="transparent" className="font-14 outline-main-btn me-3">Preview</Button>
                                    <Link to={'/finalize-resume'} className="main-btn font-14 text-decoration-none">Finalize</Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}
export default ProjectSummary;