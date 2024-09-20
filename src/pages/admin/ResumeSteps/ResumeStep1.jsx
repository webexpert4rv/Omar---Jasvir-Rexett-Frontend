import React, { useState } from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowUp, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin, FaUpload } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from '../../../assets/img/demo-img.jpg';
import { IoCameraOutline, IoClose, IoCloudUpload, IoPlay } from "react-icons/io5";
import { MdLocalPhone, MdLocationOn, MdWork } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import videoImg from '../../../assets/img/user-img.jpg'
import IntroVideo from "../../../components/common/Modals/IntroVideo";
import PreviewModal from "./Modals/PreviewResume";
const ResumeStep1 = () => {
    const [showintrovideo , setShowIntroVideo] = useState(false);
    const handleShowIntroModal = () => {
        setShowIntroVideo(!showintrovideo);
    }
    const handleCloseIntroModal = () => {
        setShowIntroVideo(false);
    }
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
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">1</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Heading</span>
                            </li>
                            <li>
                                <span className="resume-count">2</span>
                                <span>Work History</span>
                            </li>
                            <li>
                                <span className="resume-count">3</span>
                                <span>Education</span>
                            </li>
                            <li>
                                <span className="resume-count">4</span>
                                <span>Skills</span>
                            </li>
                            <li>
                                <span className="resume-count">5</span>
                                <span>Summary</span>
                            </li>
                            <li>
                                <span className="resume-count">6</span>
                                <span>Projects</span>
                            </li>
                            <li>
                                <span className="resume-count">7</span>
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
                                                        <Form.Label className="font-14 fw-medium">First Name</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. John" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Surname</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Doe" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Profession</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. Software Engineer" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Phone Number</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. +91 123 456 7890" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Email *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. johndoe123@gmail.com" />
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
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Resume *</Form.Label>
                                                        <Form.Control type="file" className="d-none" id="intro-video" />
                                                        <Form.Label htmlFor="intro-video" className="upload-intro-file">Upload Resume</Form.Label>
                                                    </div>
                                                    <div>
                                                        <div className="d-flex justify-content-between align-items-center gap-5 p-2 bg-light rounded-3 mb-3">
                                                            <span className="font-14 fw-medium">resume-doc1.pdf</span>
                                                            <span className="cursor-pointer text-danger"><IoClose /> </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Intro Video *</Form.Label>
                                                        <Form.Control type="file" className="d-none" id="intro-video" />
                                                        <Form.Label htmlFor="intro-video" className="upload-intro-file">Upload Intro Video</Form.Label>
                                                    </div>
                                                    <div className="profile-upload-preview position-relative preview_intro mb-3">
                                                        <div className="profile-img-preview w-100 h-100">
                                                            <img src={videoImg} />
                                                        </div>
                                                        <div className="playback_intro" onClick={handleShowIntroModal}>
                                                            <IoPlay />
                                                        </div>
                                                        <Form.Label htmlFor="intro-video" className="profile-img-label">
                                                            <FaUpload />
                                                        </Form.Label>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">LinkedIn *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. www.linkedin.com/profile/12345" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Github *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. www.github.com/profile" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div>
                                                        <Form.Label className="fw-medium">Add additional information to your resume</Form.Label>
                                                        <div>
                                                            <Button variant="transparent" className="outline-main-btn font-14">Linkedin +</Button>
                                                            <Button variant="transparent" className="outline-main-btn font-14 ms-2">Github +</Button>
                                                            <Button variant="transparent" className="outline-main-btn font-14 ms-2">Intro Video +</Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="d-flex align-items-start gap-2 mt-3">
                                                        <Form.Check type="checkbox" id="privacy-check" className="mt-0"  />
                                                        <Form.Label htmlFor="privacy-check" className="font-14">"Please be informed that when you click the Continue button Rexett will process your personal data in accordance with our Privacy notice for the purpose of providing you with appropriate information."</Form.Label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    {/* <Col md={4}>
                                        <div>
                                            <p className="font-14 resume-delivers"> <FaArrowUp /> Our Resume delivers results</p>
                                            <div className="preview-resume-form">
                                                <section className="overview-cv">
                                                    <div className="cv-template-section">
                                                        <div className="">
                                                            <h2 className="section-head mb-0 border-0">Overview</h2>
                                                            <Row>
                                                                <Col md={6} className="px-0 h-100">
                                                                    <div className="resume-basic-info text-center highlight-resume-section">
                                                                        <div className="resume-imgbx mx-auto mb-2">
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
                                                                    <div className="about-info px-2 pt-2">
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
                                    </Col> */}
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>

                                </div>
                                <div>
                                    <Button variant="transparent" onClick={handleShowPreviewModal} className="font-14 outline-main-btn me-3">Preview</Button>
                                    <Link to={'/resume-work-detail'} className="main-btn font-14 text-decoration-none">Next: Work History</Link>
                                </div>
                            </div>
                        </div >
                    </Container >
                </div >
            </section >
            <IntroVideo show={showintrovideo} handleClose={handleCloseIntroModal} />
            <PreviewModal show={showpreviewmodal} handleClose={handleClosePreviewModal} />
        </>
    )
}
export default ResumeStep1;