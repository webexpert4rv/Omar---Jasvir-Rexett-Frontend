import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { FaArrowLeft, FaCheck, FaChevronDown, FaFilter, FaPencil, FaPlus, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoAddOutline, IoCheckmark } from "react-icons/io5";
import ReactQuill from "react-quill";
import RecomdModal from "./Modals/RecomdModal";
import PreviewModal from "./Modals/PreviewResume";
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
                                    <Button variant="transparent" onClick={handleShowPreviewModal} className="font-14 outline-main-btn me-3">Preview</Button>
                                    <Link to={'/work-summary'} className="main-btn font-14 text-decoration-none">Next</Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
            <RecomdModal show={showRecomdModal} handleClose={handleCloseRecomd} />
            <PreviewModal show={showpreviewmodal} handleClose={handleClosePreviewModal} />
        </>
    )
}
export default DescribeWork;