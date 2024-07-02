import React, { useState } from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from '../../../assets/img/demo-img.jpg';
import { IoCameraOutline } from "react-icons/io5";
import { MdLocalPhone, MdLocationOn, MdWork } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import PreviewModal from "./Modals/PreviewResume";
const EducationSelect = () => {
    const [showpreviewmodal , setShowPreviewModal] = useState(false);
    const handleShowPreviewModal = () => {
        setShowPreviewModal(!showpreviewmodal);
    }
    const handleClosePreviewModal = () => {
        setShowPreviewModal(false);
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
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">3</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Education</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">4</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Skills</span>
                            </li>
                            <li>
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
                                <h2 className="resume-heading">
                                    What best describes your level of education?
                                </h2>
                                <p className="fw-semibold">Select the best option and we'll help you structure your education section.</p>
                                <Row className="justify-content-center">
                                    <Col md={10}>
                                        <div>
                                            <div className="mt-5">
                                                <div className="selection-wrapper">
                                                    <Link to={'/add-education'} className="education-selection">Secondary School </Link>
                                                    <Link to={'/add-education'} className="education-selection">Vocational Certificate or Diploma</Link>
                                                    <Link to={'/add-education'} className="education-selection">Apprenticeship or Internship Training</Link>
                                                    <Link to={'/add-education'} className="education-selection">Associates </Link>
                                                    <Link to={'/add-education'} className="education-selection">Bachelors</Link>
                                                    <Link to={'/add-education'} className="education-selection">Masters</Link>
                                                    <Link to={'/add-education'} className="education-selection">Doctorate or Ph. D</Link>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <Link to={'/add-education'} className="text-green text-decoration-none font-14 fw-medium">Pefer not to answer</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
            <PreviewModal show={showpreviewmodal} handleClose={handleClosePreviewModal} />
        </>
    )
}
export default EducationSelect;