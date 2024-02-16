import React from "react";
import { Col, Row } from "react-bootstrap";
import resumeImg from '../../assets/img/user-img.jpg'
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
const DeveloperCV = () => {
    return(
        <>
            <section className="overview-cv">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="section-head mb-0">Overview</h2>
                    <button className="main-btn px-5">Download Resume</button>
                </div>
                <Row>
                    <Col lg={6} className="px-0">
                        <div className="resume-basic-info text-center">
                            <div className="resume-imgbx mx-auto mb-4">
                                <img src={resumeImg} className="resume-img" />
                            </div>
                            <h3 className="resume-name">Alfredo Smith</h3>
                            <p className="resume-designation">Software Developer</p>
                        </div>
                        <div className="connect-social-media">
                            <h3 className="subheading-resume text-center mb-3">Skills</h3>
                            <ul className="skills-pill text-center">
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                                <li>
                                    <span>HTML</span>
                                </li>
                            </ul>
                        </div>
                        <div className="connect-social-media">
                            <h3 className="subheading-resume text-center mb-3">Connect With Me</h3>
                            <ul className="social-media">
                                <li>
                                    <Link to={'#'} className="social-media-link">
                                        <FaFacebookF/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'#'} className="social-media-link">
                                        <FaLinkedinIn/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'#'} className="social-media-link">
                                        <FaTwitter/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'#'} className="social-media-link">
                                        <FaInstagram/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg={6} className="px-0 h-100">
                        <div className="about-info px-4">
                            <h3 className="subheading-resume mb-4">About Me</h3>
                            <h2 className="mainheading-resume">Art Changes Us</h2>
                            <p className="resume-text">Experienced software developer with a passion for creating efficient and innovative solutions. Seeking a challenging position where I can contribute my technical skills and creativity to develop cutting-edge software applications.</p>
                        </div>
                        <div className="about-info px-4 pt-4">
                            <h3 className="subheading-resume mb-4">Experience</h3>
                            <div className="exp-wrapper">
                                <p className="exp-year">2018 - 2023 Software Developer Google</p>
                                <ul className="exp-role">
                                    <li className="resume-text">Collaborated with cross-functional teams to design, develop, and deploy software solutions.</li>
                                    <li className="resume-text">Collaborated with cross-functional teams to design, develop, and deploy software solutions.</li>
                                    <li className="resume-text">Collaborated with cross-functional teams to design, develop, and deploy software solutions.</li>
                                </ul>
                            </div>
                            <h3 className="subheading-resume mb-4">Education</h3>
                            <div className="exp-wrapper">
                                <p className="exp-year">2006 Bachelor of Science in Computer Science</p>
                                <ul className="exp-role">
                                    <li className="resume-text">Tresswood University</li>
                                    <li className="resume-text">Phyllis Schwaiger Memorial Award</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    )
}
export default DeveloperCV;
