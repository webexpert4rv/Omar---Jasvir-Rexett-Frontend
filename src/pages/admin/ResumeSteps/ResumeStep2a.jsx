import React, { useState } from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaCircleInfo, FaCirclePlay, FaEnvelope, FaGithub, FaInfo, FaLightbulb, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import profileImg from '../../../assets/img/demo-img.jpg';
import { IoCameraOutline } from "react-icons/io5";
import { MdLocalPhone, MdLocationOn, MdWork } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import PreviewModal from "./Modals/PreviewResume";
const ResumeStep2a = () => {
    const [showpreviewmodal , setShowPreviewModal] = useState(false);
    const handleShowPreviewModal = () => {
        setShowPreviewModal(!showpreviewmodal);
    }
    const handleClosePreviewModal = () => {
        setShowPreviewModal(false);
    }
    const infoRemote = (
        <Tooltip>
            Was this job remote? Checking this box will let the others know. This selection is optional.
        </Tooltip>
    )
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
                                    <Col md={8}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h2 className="resume-heading mb-0">
                                                    Tell us about your most recent job
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
                                            <p>We'll start there and work backward.</p>
                                        </div>
                                        <p className="font-12 fw-medium">* includes a required field</p>
                                        <div>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Job title *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Web Developer" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Employer</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Microsoft" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Location</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. CA, USA" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3 d-flex align-items-center gap-3">
                                                        <Form.Check type="checkbox" label="Remote" className="font-14" />
                                                        <div>
                                                            <OverlayTrigger placement="bottom" overlay={infoRemote}>
                                                                <span className="font-14 lh-1 mt-n7 align-middle d-inline-block">
                                                                    <FaCircleInfo />
                                                                </span>
                                                            </OverlayTrigger>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}></Col>
                                                <Col md={3}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Start Date</Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select Month</option>
                                                            <option>January</option>
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                                <Col md={3} className="align-self-end">
                                                    <div className="mb-3">
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select Year</option>
                                                            <option>2024</option>
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">End Date</Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select Month</option>
                                                            <option>January</option>
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                                <Col md={3} className="align-self-end">
                                                    <div className="mb-3">
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select Year</option>
                                                            <option>2024</option>
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Check type="checkbox" label="I currently work here" className="font-14" />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div>
                                            <p className="font-12">Our Resume delivers results</p>
                                            <div className="preview-resume-form">
                                                <section className="overview-cv">
                                                    <div className="cv-template-section">
                                                        <div className="">
                                                            <h2 className="section-head mb-0 border-0">Overview</h2>
                                                            <Row>
                                                                <Col md={6} className="px-0 h-100">
                                                                    <div className="resume-basic-info text-center">
                                                                        <div className="resume-imgbx mx-auto mb-2">
                                                                            {/* <img
                                                                                
                                                                                className="resume-img"
                                                                            /> */}
                                                                        </div>
                                                                        <h3 className="resume-name">
                                                                            John Doe
                                                                            <span className="text-green ms-2 cursor-pointer">
                                                                                <FaCirclePlay />
                                                                            </span>
                                                                        </h3>
                                                                        <p className="resume-designation">John doe</p>
                                                                        <div className="text-start mt-1 d-flex align-items-center flex-wrap justify-content-center mb-1 personal-info-wrapper">
                                                                            <div>
                                                                                <p className="mb-0 font-14">
                                                                                    <span><FaEnvelope /></span> robertjohnson@gmail.com</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="mb-0 font-14">
                                                                                    <span><MdLocalPhone /></span> +91 123456789</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="mb-0 font-14">
                                                                                    <span><MdWork /></span> 5 years</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="mb-0 font-14">
                                                                                    <span><MdLocationOn /></span>India</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="mb-0 font-14">
                                                                                    <span><MdWork /></span> Remote</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="mb-0 font-14">
                                                                                    <span><GoClockFill /></span> GMT(+5:30) Kolkata</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="px-3 d-flex justify-content-center align-items-center gap-2">
                                                                            <ul className="social-media">
                                                                                <li>
                                                                                    <FaGithub />
                                                                                </li>
                                                                                <li>
                                                                                    <FaLinkedin />
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connect-social-media px-2">
                                                                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                                                                            <h3 className="subheading-resume mb-0">
                                                                                Expertise
                                                                            </h3>
                                                                        </div>
                                                                        <div className="">

                                                                            <div className="exp-wrapper expertise-card"
                                                                            >
                                                                                {/* <img src={skill_icon?.icon_url} /> */}
                                                                                <p className="expertise-skill">Laravel</p>
                                                                                <p className="expertise-exp">1 year
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connect-social-media px-2">
                                                                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                                                                            <h3 className="subheading-resume text-center mb-0">
                                                                                Skills
                                                                            </h3>
                                                                        </div>
                                                                        <ul className="skills-pill text-center">

                                                                            <li>
                                                                                <span>Drupal</span>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="connect-social-media px-2">
                                                                        <div>
                                                                            <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                                                                                <h3 className="subheading-resume mb-0">
                                                                                    Projects
                                                                                </h3>
                                                                            </div>
                                                                            <div>
                                                                                <div
                                                                                    className="project-wrapper"
                                                                                >
                                                                                    <div>
                                                                                        <p className="project-title mb-0">
                                                                                            AI bot project
                                                                                        </p>
                                                                                        <p className="project-role p-0 bg-transparent mb-0 d-block mb-2">
                                                                                            Web developer
                                                                                        </p>
                                                                                        <p className="project-role mb-1">
                                                                                            Healthcare
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="d-flex align-items-center gap-2 project-date-wrapper status-finished">
                                                                                        <p className="project-date mb-0 font-10">10-05-2024</p>
                                                                                        -
                                                                                        <p className="project-date mb-0 font-10">12-05-2024</p>
                                                                                    </div>
                                                                                </div>
                                                                                <label className="font-14 mb-1">
                                                                                    Tech Skill Used
                                                                                </label>
                                                                                <div className="d-flex justify-content-between align-items-start">
                                                                                    <div>
                                                                                        <ul className="skills-pill text-start">
                                                                                            <li>
                                                                                                <span>HTML</span>
                                                                                                <span>CSS</span>
                                                                                                <span>Javascript</span>
                                                                                                <span>Bootstrap</span>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div>
                                                                                        <a
                                                                                            href={'/'}
                                                                                            className="project-link main-btn px-1 py-1 font-10 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2"
                                                                                        >
                                                                                            Show Project <FiExternalLink />
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md={6} className="px-0 h-100">
                                                                    <div className="about-info px-2">
                                                                        <div className="">
                                                                            <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                                                                                <h3 className="subheading-resume mb-0">
                                                                                    About Me
                                                                                </h3>
                                                                            </div>
                                                                            <p className="resume-text">
                                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="about-info px-2 pt-2 highlight-resume-section">
                                                                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                                                                            <h3 className="subheading-resume mb-0">
                                                                                Experience
                                                                            </h3>
                                                                        </div>
                                                                        <div className="exp-timeline">
                                                                            <div>
                                                                                <h5>XYZ Company Pvt Ltd</h5>
                                                                                <p>3 years</p>
                                                                                <div>
                                                                                    <div className="sub-exp">
                                                                                        <h4 className="role-text">Web Developer </h4>
                                                                                        <p className="exp-date">
                                                                                            Present - 2023
                                                                                        </p>
                                                                                        <p className="exp-desc">
                                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="about-info px-2 pt-2">
                                                                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                                                                            <h3 className="subheading-resume mb-0">
                                                                                Education
                                                                            </h3>
                                                                        </div>
                                                                        <div className="exp-wrapper">
                                                                            <p className="font-10">
                                                                                20-06-2016 - 10-06-2020 | B.Tech Computer Science
                                                                            </p>
                                                                            <ul className="exp-role">
                                                                                <li className="font-10">Panjab University</li>
                                                                                <li className="font-10">Bachelor of Science</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>

                                </div>
                                <div>
                                    <Button variant="transparent" onClick={handleShowPreviewModal} className="font-14 outline-main-btn me-3">Preview</Button>
                                    <Link to={'/describe-work'} className="main-btn font-14 text-decoration-none">Next</Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
            <PreviewModal show={showpreviewmodal} handleClose={handleClosePreviewModal} />
        </>
    )
}
export default ResumeStep2a;