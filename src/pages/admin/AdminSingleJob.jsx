import React, { useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import userImg from '../../assets/img/user-img.jpg'
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import EndJobModal from "./Modals/EndJobs";
import amazonImg from '../../assets/img/amazon.png'
const SingleJob = () => {

    const [showEndJobModal, setShowEndJobModal] = useState(false);
    const handleShowEndJobModal = () => {
        setShowEndJobModal(true);
    };

    const handleCloseEndJobModal = () => {
        setShowEndJobModal(false);
    };
    return (
        <>
            <Tabs
                defaultActiveKey="application"
                id="fill-tab-example"
                className="mb-3 job-tabs"
                fill
            >
                <Tab eventKey="application" title="Application">
                    <section className="single-job-section">
                        <div className="single-job-card job-information-wrapper">
                            <h2 className="jobclient-name"><img src={amazonImg} /> Amazon</h2>
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="single-job-title mb-0">Want to Convert Figma to HTML</h2>
                                <div className="d-flex gap-3 align-items-center">
                                    <p className="mb-0">Status <span className="status-text inprogress status-info">In progress</span></p>
                                    <Button variant="transparent" onClick={handleShowEndJobModal} className="px-5 closed-job-btn">End Job</Button>
                                </div>
                            </div>
                            <h4 className="single-job-category">Website Design</h4>
                            <p className="single-job-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="single-job-card">
                            <Row>
                                <Col md="4">
                                    <h3 className="req-heading">Experience Requirements</h3>
                                    <p className="req-text">1 - 2 years</p>
                                </Col>
                                <Col md="4">
                                    <h3 className="req-heading">Contract</h3>
                                    <p className="req-text">Hourly</p>
                                </Col>
                                <Col md="4">
                                    <h3 className="req-heading">Location</h3>
                                    <p className="req-text">Remote</p>
                                </Col>
                            </Row>
                        </div>
                        <div className="single-job-card">
                            <h3 className="req-heading">Skills</h3>
                            <ul className="skills-listing mb-0">
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>Bootstrap</li>
                                <li>JavaScript</li>
                                <li>jQuery</li>
                                <li>Tailwind CSS</li>
                                <li>Sass</li>
                            </ul>
                        </div>
                    </section>
                </Tab>
                <Tab eventKey="suggested" title="Suggestions">
                    <div className="text-center mb-3">
                        <Button className="main-btn px-5">+ Suggest Developers</Button>
                    </div>
                    <div className="developers-list job-card">
                        <div className="developer-card">
                            <div className="tag-developer">Suggested</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
                                <ul className="social-icons">
                                    <li>
                                        <Link to="#"><FaGithub /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><FaLinkedin /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><MdEmail /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="shortlisted" title="Shortlisted">
                    <div className="developers-list job-card">
                        <div className="developer-card">
                            <div className="tag-developer">Shortlisted</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
                                <ul className="social-icons">
                                    <li>
                                        <Link to="#"><FaGithub /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><FaLinkedin /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><MdEmail /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="interviewing" title="Interviewing">
                    <div className="developers-list job-card">
                        <div className="developer-card">
                            <div className="tag-developer">Interviewing</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
                                <ul className="social-icons">
                                    <li>
                                        <Link to="#"><FaGithub /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><FaLinkedin /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><MdEmail /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="hired" title="Hired">
                    <div className="developers-list job-card">
                        <div className="developer-card">
                            <div className="tag-developer">Hired</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
                                <ul className="social-icons">
                                    <li>
                                        <Link to="#"><FaGithub /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><FaLinkedin /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><MdEmail /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="developer-card">
                            <div className="tag-developer">End Job</div>
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Test dev</h3>
                                <p className="designation-user">Software Developer</p>
                                <p className="email-user">dev@rexett.com</p>
                                <ul className="social-icons">
                                    <li>
                                        <Link to="#"><FaGithub /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><FaLinkedin /></Link>
                                    </li>
                                    <li>
                                        <Link to="#"><MdEmail /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
            <EndJobModal show={showEndJobModal} handleClose={handleCloseEndJobModal} />
        </>
    )
}
export default SingleJob;