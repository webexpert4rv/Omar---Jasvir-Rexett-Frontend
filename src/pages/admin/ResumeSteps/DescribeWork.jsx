import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { FaArrowLeft, FaCheck, FaChevronDown, FaFilter, FaPencil, FaPlus, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoAddOutline, IoCheckmark } from "react-icons/io5";
import ReactQuill from "react-quill";
import RecomdModal from "./Modals/RecomdModal";
const DescribeWork = () => {
    const [valuedescr, setValueDescr] = useState('');
    const handleChange = (value) => {
        setValueDescr(value);
    };
    const [showRecomdModal , setShowRecomdModal] = useState(true);
    // setShowRecomdModal(showRecomdModal);
    const handleCloseRecomd = () => {
        setShowRecomdModal(false);
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
                                            <h2 className="resume-heading">
                                                Let's describe what you did
                                            </h2>
                                            <p>Choose from our pre-written examples below or write your own.</p>
                                        </div>
                                        <div>
                                            <Row>
                                                <Col md={6}>
                                                    <div>
                                                        <div className="search-filter mb-3">
                                                            <p className="font-14 fw-semibold mb-1">Search By Job Title For Pre-Written Examples</p>
                                                            <Form.Control type="text" placeholder="Search by job title" className="common-field font-14" />
                                                        </div>
                                                        <div className="showing-results-wrapper mb-3">
                                                            <div>
                                                                <p className="font-14 mb-0">Showing results for</p>
                                                                <p className="font-14 mb-0 fw-semibold">Web Developer</p>
                                                            </div>
                                                            <div>
                                                                <Button variant="transparent" className="p-0 border-0 shadow-none text-green fw-semibold">Filter by keyword <FaFilter /> </Button>
                                                            </div>
                                                        </div>
                                                        <Form.Control type="text" placeholder="Search keywords" className="common-field font-14 mb-2" />
                                                        <div className="recommended-desc">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 fw-medium mb-1"><FaStar /> Expert Recommended</p>
                                                                    <p className="font-14 mb-0">Coded website using HTML, CSS, JavaScript, and jQuery languages.</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 fw-medium mb-1"> <FaStar /> Expert Recommended</p>
                                                                    <p className="font-14 mb-0">Coded website using HTML, CSS, JavaScript, and jQuery languages.</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 fw-medium mb-1"><FaStar /> Expert Recommended</p>
                                                                    <p className="font-14 mb-0">Coded website using HTML, CSS, JavaScript, and jQuery languages.</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 mb-0">Coded website using HTML, CSS, JavaScript, and jQuery languages.</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 mb-0">Coded website using HTML, CSS, JavaScript, and jQuery languages.</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 mb-0">Coded website using HTML, CSS, JavaScript, and jQuery languages.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div>
                                                        <p className="fw-semibold mb-2">Web Developer|Aviox</p>
                                                        <p className="mb-4 font-14">New Delhi, India - February 2023 - January 2024</p>
                                                    </div>
                                                    <Form.Label className="font-14 fw-medium mb-2">Job description</Form.Label>
                                                    <div id="custom-ck">
                                                        <ReactQuill value={valuedescr} onChange={handleChange} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>

                                </div>
                                <div>
                                    <Button variant="transparent" className="font-14 outline-main-btn me-3">Preview</Button>
                                    <Link to={'/work-summary'} className="main-btn font-14 text-decoration-none">Next</Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
            <RecomdModal show={showRecomdModal} handleClose={handleCloseRecomd} />
        </>
    )
}
export default DescribeWork;