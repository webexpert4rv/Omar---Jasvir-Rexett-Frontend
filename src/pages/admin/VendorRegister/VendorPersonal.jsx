import React from "react";
import rexettLogo from '../../../assets/img/rexett-logo-white.png'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from '../../../assets/img/dummy-logo.jpg';
import { IoCameraOutline, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
const VendorPersonal = () => {
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
                                <span>Personal</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">2</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Decision makers info</span>
                            </li>
                            <li>
                                <span className="resume-count">
                                    <span className="resume-step">4</span>
                                    <span className="resume-check">
                                        <FaCheck />
                                    </span>
                                </span>
                                <span>Area of expertise</span>
                            </li>
                        </ul>
                    </div>
                    <h4 className="resume-sideheading mt-3">Completeness:</h4>
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
                                                Join Rexett as Partner
                                            </h2>
                                            <p>Rexett invites you to join our platform as a software development vendor and be part of our dynamic community of IT professionals</p>
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
                                                        <Form.Label className="font-14 fw-medium">Company Name *</Form.Label>
                                                        <div className="position-relative resume-field-wrapper">
                                                            <Form.Control type="text" className="common-field font-14" placeholder="E.g. Microsoft" />
                                                            <span className="valid-data">
                                                                <IoCheckmarkCircle />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Type of company *</Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select</option>
                                                            <option>Sole Parternship</option>
                                                            <option>Parternship</option>
                                                            <option>LLC</option>
                                                            <option>Corporation</option>
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Tax ID *</Form.Label>
                                                        <div className="position-relative resume-field-wrapper">
                                                            <Form.Control type="text" className="common-field font-14 invalid-field" placeholder="Enter Tax Id" />
                                                            <span className="invalid-data">
                                                                <IoCloseCircle />
                                                            </span>
                                                        </div>
                                                        <p className="field-error">This field is required</p>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">CIN Number *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="Enter CIN Number" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Estbl. Year *</Form.Label>
                                                        <Form.Control type="date" className="common-field font-14" placeholder="E.g. 15,000" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Website URL *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="E.g. www.xyztechnology.com" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Yearly revenue (in USD) *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="E.g. 15,000" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Employees strength *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="E.g. 100" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Phone Number *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. +91 123 456 7890" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Email *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. johndoe123@gmail.com" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Password *</Form.Label>
                                                        <Form.Control type="password" className="common-field font-14" placeholder="Enter password" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Confirm new password *</Form.Label>
                                                        <Form.Control type="password" className="common-field font-14" placeholder="Enter confirm password" />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Address *</Form.Label>
                                                        <Form.Control type="password" className="common-field font-14" placeholder="E.g. Street 1341, New area, CA, USA" />
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Country *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. India" />
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">State *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. New Delhi" />
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">City *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. New Delhi" />
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Pin Code *</Form.Label>
                                                        <Form.Control type="text" className="common-field font-14" placeholder="e.g. 110001" />
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="mb-3">
                                                        <Form.Label className="font-14 fw-medium">Timezone *</Form.Label>
                                                        <Form.Select className="common-field font-14">
                                                            <option>Select Timezone</option>
                                                            <option>GMT (+5:30) Kolkata</option>
                                                        </Form.Select>
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
                                </Row>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>

                                </div>
                                <div>
                                    <Link to={'/desicion-makers'} className="main-btn font-14 text-decoration-none">Next: Decision Makers</Link>
                                </div>
                            </div>
                        </div >
                    </Container >
                </div >
            </section >
        </>
    )
}
export default VendorPersonal;