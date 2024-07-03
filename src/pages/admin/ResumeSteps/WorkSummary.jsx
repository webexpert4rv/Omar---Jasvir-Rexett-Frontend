import React, { useState } from "react";
import { Button, Col, Container, OverlayTrigger, Popover, Row } from "react-bootstrap";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { FaArrowLeft, FaCheck, FaChevronDown, FaLightbulb, FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PreviewModal from "./Modals/PreviewResume";
import { TiEdit } from "react-icons/ti";
import { IoCloseOutline } from "react-icons/io5";
import DeleteEntry from "./Modals/DeleteEntry";
const WorkSummary = () => {
    const [showpreviewmodal , setShowPreviewModal] = useState(false);
    const handleShowPreviewModal = () => {
        setShowPreviewModal(!showpreviewmodal);
    }
    const handleClosePreviewModal = () => {
        setShowPreviewModal(false);
    }
    const [showdeleteentry , setShowDeleteEntry] = useState(false);
    const handleShowDeleteEntry = () => {
        setShowDeleteEntry(!showdeleteentry);
    }
    const handleCloseDeleteEntry = () => {
        setShowDeleteEntry(false);
    }

    const tipstext = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Expert Insights</Popover.Header>
            <Popover.Body>
                {/* <p className="font-14 mb-2">Short cut: If you don’t have time to tailor your entire resume for a specific job application, at least change this section so that it matches the opportunity.</p> */}
                <ul className="ps-3 mb-0 tip-listing">
                    <li className="font-12">Write a career overview so that hiring managers can immediately see the value that you bring.</li>
                    <li className="font-12">Not sure how to write this? Choose one of our examples and edit it to match your background.</li>
                    <li className="font-12">Make your summary sound stronger by writing it in the present tense. Focus on what you can do for a company, rather than what you did in the past.</li>
                </ul>
            </Popover.Body>
        </Popover>
    )
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
                            <li>
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
                                <Row>
                                    <Col md={12}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h2 className="resume-heading mb-0">
                                                    Work history summary
                                                </h2>
                                                <div>
                                                    <OverlayTrigger trigger="click" placement="bottom" overlay={tipstext}>
                                                        <span className="text-green d-flex align-items-center gap-2 cursor-pointer">
                                                            <FaLightbulb />
                                                            Tips
                                                        </span>
                                                    </OverlayTrigger>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="work-summary-wrapper mb-3 position-relative">
                                            <div className="w-100">
                                                <h4 className="summary-heading mb-2 fw-semibold">
                                                    Web Developer, Aviox
                                                </h4>
                                                <p className="font-14">New Delhi, India |February 2023 - January 2024</p>
                                                <ul>
                                                    <li className="font-14">
                                                        Self-motivated, with a strong sense of personal responsibility.
                                                    </li>
                                                    <li className="font-14">Excellent communication skills, both verbal and written.
                                                    </li>
                                                </ul>
                                                <div className="d-flex align-items-center justify-content-between mt-4">
                                                    <Link to={'/describe-work'} className="text-decoration-none text-green font-14">
                                                        <FaPencil /> Edit description
                                                    </Link>
                                                    <Link className="text-decoration-none text-green font-14">
                                                        Show more detail <FaChevronDown />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="education-action">
                                                <Button variant="transparent" className="arrow-btn info-arrow shadow-none">
                                                    <TiEdit />
                                                </Button>
                                                <Button variant="transparent" onClick={handleShowDeleteEntry} className="arrow-btn danger-arrow shadow-none">
                                                    <IoCloseOutline />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="">
                                            <Button variant="transparent" className="position-btn">+ Add another position</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>

                                </div>
                                <div>
                                    <Button variant="transparent" onClick={handleShowPreviewModal} className="font-14 outline-main-btn me-3">Preview</Button>
                                    <Link to={'/education-preview'} className="main-btn font-14 text-decoration-none">Next: Education</Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
            <DeleteEntry show={showdeleteentry} handleClose={handleCloseDeleteEntry} />
            <PreviewModal show={showpreviewmodal} handleClose={handleClosePreviewModal} />
        </>
    )
}
export default WorkSummary;