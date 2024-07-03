import React from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { Col, Container, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { BsQuestionCircleFill } from "react-icons/bs";
const JobInfo = () => {
    const jobTitleTooltip = (
        <Tooltip id="tooltip">
            Make your job, more discoverable to job seekers by entering your job
            title.
        </Tooltip>
    );
    const jobLocationTooltip = (
      <Tooltip id="tooltip">
        Picking a specific city or metro area can make your on-site job more
        discoverable by job seekers in those area.
      </Tooltip>
    );
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
                                <span>Personal</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">3</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Job Info</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">4</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Job Description</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">5</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Screening info</span>
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
                                                Job Information
                                            </h2>
                                            <p>Enter job information</p>
                                        </div>
                                        <p className="font-12 fw-medium">* includes a required field</p>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <div>
                                            <Form.Label className="d-flex gap-2 align-items-center font-14 fw-medium">
                                                Job Title *
                                                <OverlayTrigger placement="bottom" overlay={jobTitleTooltip}>
                                                    <span>
                                                        <BsQuestionCircleFill />
                                                    </span>
                                                </OverlayTrigger>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="common-field font-14"
                                                placeholder="Enter Job Name" />
                                        </div>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <div>
                                            <Form.Label className="d-flex gap-2 align-items-center font-14 fw-medium">
                                                Workplace Type *
                                            </Form.Label>
                                            <Form.Select className="font-14 common-field">
                                                <option>Select workplace</option>
                                                <option value="hybrid">Hybrid</option>
                                                <option value="remote">Remote</option>
                                                <option value="onsite">OnSite</option>
                                            </Form.Select>
                                        </div>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <div>
                                            <Form.Label className="d-flex gap-2 align-items-center font-14 fw-medium">
                                                Job Location *
                                                <OverlayTrigger placement="bottom" overlay={jobTitleTooltip}>
                                                    <span>
                                                        <BsQuestionCircleFill />
                                                    </span>
                                                </OverlayTrigger>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="common-field font-14"
                                                placeholder="E.g. New Delhi, India" />
                                        </div>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <div>
                                            <Form.Label className="d-flex gap-2 align-items-center font-14 fw-medium">
                                                Job type *
                                            </Form.Label>
                                            <Form.Select className="font-14 common-field">
                                                <option>Select job type</option>
                                                <option value="fulltime">Full time</option>
                                                <option value="parttime">Part time</option>
                                                <option value="contract">Contract</option>
                                            </Form.Select>
                                        </div>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <div>
                                            <Form.Label className="d-flex gap-2 align-items-center font-14 fw-medium">
                                                Positions available for the job
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="common-field font-14"
                                                placeholder="E.g. 10" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>

                                </div>
                                <div>
                                    <Link to={'/job-description'} className="main-btn font-14 text-decoration-none">Next: Job Description</Link>
                                </div>
                            </div>
                        </div >
                    </Container >
                </div >
            </section >
        </>
    )
}
export default JobInfo;