import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const JobListing = () => {
    return(
        <>
            <section className="job-posted-section">
                <div className="job-posted-wrapper">
                    <div className="job-posted-list">
                        <div>
                            <h2 className="job-title">Want to Convert Figma to HTML</h2>
                            <h4 className="job-category">Website Design</h4>
                            <div className="profile-req">
                                <p className="grid-text">1 - 2 years of exp</p>
                                <p className="grid-text">Hourly</p>
                                <p className="grid-text">Remote</p>
                            </div>
                            <p className="job-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <Row>
                                <Col md="12">
                                    <div className="info-grid">
                                        <h4 className="grid-heading">Skills Req.</h4>
                                        <ul className="skills-listing">
                                            <li>HTML</li>
                                            <li>CSS</li>
                                            <li>Bootstrap</li>
                                            <li>JavaScript</li>
                                            <li>jQuery</li>
                                            <li>Tailwind CSS</li>
                                            <li>Sass</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="status-wrapper">
                            <div>
                                <h3 className="status-heading">Status</h3>
                                <p className="status-text inprogress">In Progress</p>
                            </div>
                            <p className="font-15">Posted Date: <strong>20-02-2023</strong></p>
                            <Link to={'/single-job'} className="px-5 mb-2 main-btn text-decoration-none">View Details</Link>
                        </div>
                    </div>
                    <div className="job-posted-list">
                        <div>
                            <h2 className="job-title">Want to Convert Figma to HTML</h2>
                            <h4 className="job-category">Website Design</h4>
                            <div className="profile-req">
                                <p className="grid-text">1 - 2 years of exp</p>
                                <p className="grid-text">Hourly</p>
                                <p className="grid-text">Remote</p>
                            </div>
                            <p className="job-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <Row>
                                <Col md="12">
                                    <div className="info-grid">
                                        <h4 className="grid-heading">Skills Req.</h4>
                                        <ul className="skills-listing">
                                            <li>HTML</li>
                                            <li>CSS</li>
                                            <li>Bootstrap</li>
                                            <li>JavaScript</li>
                                            <li>jQuery</li>
                                            <li>Tailwind CSS</li>
                                            <li>Sass</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="status-wrapper">
                            <div>
                                <h3 className="status-heading">Status</h3>
                                <p className="status-text completed">Completed</p>
                            </div>
                            <Link to={'/single-job'} className="px-5 mb-2 main-btn text-decoration-none">View Details</Link>
                        </div>
                    </div>
                    <div className="job-posted-list">
                        <div>
                            <h2 className="job-title">Want to Convert Figma to HTML</h2>
                            <h4 className="job-category">Website Design</h4>
                            <div className="profile-req">
                                <p className="grid-text">1 - 2 years of exp</p>
                                <p className="grid-text">Hourly</p>
                                <p className="grid-text">Remote</p>
                            </div>
                            <p className="job-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <Row>
                                <Col md="12">
                                    <div className="info-grid">
                                        <h4 className="grid-heading">Skills Req.</h4>
                                        <ul className="skills-listing">
                                            <li>HTML</li>
                                            <li>CSS</li>
                                            <li>Bootstrap</li>
                                            <li>JavaScript</li>
                                            <li>jQuery</li>
                                            <li>Tailwind CSS</li>
                                            <li>Sass</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="status-wrapper">
                            <div>
                                <h3 className="status-heading">Status</h3>
                                <p className="status-text endcontract">End contract</p>
                            </div>
                            <Link to={'/single-job'} className="px-5 mb-2 main-btn text-decoration-none">View Details</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default JobListing;