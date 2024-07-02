import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { FaArrowLeft, FaCheck, FaChevronDown, FaFilter, FaPencil, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoAddOutline, IoCheckmark } from "react-icons/io5";
import ReactQuill from "react-quill";
import PreviewModal from "./Modals/PreviewResume";
const AddSummary = () => {
    const [valuedescr, setValueDescr] = useState('');
    const handleChange = (value) => {
        setValueDescr(value);
    };
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
                            <li className="active-step">
                                <span className="resume-count">
                                    <span className="resume-step">3</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Education</span>
                            </li>
                            <li className="active-step">
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
                                                Briefly tell us about your background
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
                                                        <div className="recommended-desc">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 fw-medium mb-1">Expert Recommended</p>
                                                                    <p className="font-14 mb-0">Experienced Web Developer with passion for creating attractive and interactive websites meeting customer needs and exceeding expectations. Well-versed in developing custom WordPress themes and plugins. Excels in HTML, CSS, JavaScript and PHP development.</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 fw-medium mb-1">Expert Recommended</p>
                                                                    <p className="font-14 mb-0">Driven Web Developer with a proven track record at Aviox, showcasing rapid adaptability and exceptional communication skills. Expert in CSS and Javascript, delivering high-quality web development projects. Demonstrates a unique blend of technical proficiency and collaborative teamwork, ensuring outstanding project outcomes.</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 mb-0">Logical and results-driven Web Developer dedicated to building and optimizing user-focused websites for customers with various business objectives. Judicious and creative when crafting effective websites, apps and platforms to propel competitive advantage and revenue growth. Technically proficient and analytical problem solver with calm and focused demeanor.</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button variant="transparent" className="arrow-btn primary-arrow shadow-none">
                                                                    <IoAddOutline />
                                                                </Button>
                                                                <div>
                                                                    <p className="font-14 mb-0">Goal-oriented Web Developer brings strong commitment to collaboration and solutions-oriented problem-solving. Use various web design packages to develop custom-crafted, customer-focused websites and designs. Committed to high standards of user experience, usability and speed over more than <strong className="text-green">[Number]</strong> years for multiple users. Lends detailed knowledge of SEO to increase visibility.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="generate-ai">
                                                        <div>

                                                        </div>
                                                    </div>
                                                    <Form.Label className="font-14 fw-medium">Bio</Form.Label>
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
                                    <Button variant="transparent" onClick={handleShowPreviewModal} className="font-14 outline-main-btn me-3">Preview</Button>
                                    <Link to={'/add-projects'} variant="transparent" className="main-btn font-14 text-decoration-none">Next</Link>
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
export default AddSummary;