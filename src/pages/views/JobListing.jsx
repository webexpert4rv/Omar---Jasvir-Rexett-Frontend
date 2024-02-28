import React from "react";
import { Col, Row, Pagination, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
const JobListing = () => {
    return (
        <>
            <section className="job-posted-section">
                <Tabs
                    defaultActiveKey="all_job"
                    id="justify-tab-example"
                    className="mb-3 notification-tabs"
                    justify
                >
                    <Tab eventKey="all_job" title="All">
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

                                    <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none"><FaEye /></Link>
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

                                    <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none"><FaEye /></Link>
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
                                        <p className="status-text endcontract">End Job</p>
                                    </div>

                                    <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none"><FaEye /></Link>
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
                                        <p className="status-text unpublishcontract">Unpublish</p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Link to={'/job-post'} className="px-3 mb-2 main-btn text-decoration-none"><MdModeEditOutline /></Link>
                                        <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none outline-main-btn"><FaEye /></Link>
                                        <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none bg-danger border-danger"><FaTrashAlt /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="inprogress_job" title="In Progress">
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

                                    <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none"><FaEye /></Link>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="completed_jobs" title="Completed">
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
                                        <p className="status-text completed">Completed</p>
                                    </div>

                                    <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none"><FaEye /></Link>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="end_jobs" title="End Jobs">
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
                                        <p className="status-text endcontract">End Job</p>
                                    </div>

                                    <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none"><FaEye /></Link>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="unpublish_jobs" title="Unpublish Jobs">
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
                                        <p className="status-text unpublishcontract">Unpublish</p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Link to={'/job-post'} className="px-3 mb-2 main-btn text-decoration-none"><MdModeEditOutline /></Link>
                                        <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none outline-main-btn"><FaEye /></Link>
                                        <Link to={'/single-job'} className="px-3 mb-2 main-btn text-decoration-none bg-danger border-danger"><FaTrashAlt /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </section>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="showing-result">Showing 1 - 10 results</p>
                <Pagination className="custom-pagination">
                    <Pagination.Prev className="custom-pagination-item custom-pagination-arrow" />
                    <Pagination.Item className="custom-pagination-item" active>{1}</Pagination.Item>
                    <Pagination.Item className="custom-pagination-item">{2}</Pagination.Item>
                    <Pagination.Item className="custom-pagination-item">{3}</Pagination.Item>
                    <Pagination.Ellipsis className="custom-pagination-item" />
                    <Pagination.Item className="custom-pagination-item">{8}</Pagination.Item>
                    <Pagination.Item className="custom-pagination-item">{9}</Pagination.Item>
                    <Pagination.Item className="custom-pagination-item">{10}</Pagination.Item>
                    <Pagination.Next className="custom-pagination-item custom-pagination-arrow" />
                </Pagination>
            </div>
        </>
    )
}
export default JobListing;