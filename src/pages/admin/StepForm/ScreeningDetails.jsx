import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import devImg from '../../../assets/img/Dev-1.png';
const ScreeningDetails = () => {
    return (
        <>
            <div className="apply-job-section">
                <Container>
                    <div>
                        <Row className="align-items-center">
                            <Col md={7}>
                                <div className="apply-form-card">
                                    <div>
                                        <h2 className="apply-form-heading">Enter <span className="fw-bold">Screening</span> Details</h2>
                                        <p className="font-14 text-white">Explore thrilling remote opportunities with Europe's top companies, become part of a dynamic community, and enjoy exclusive perks</p>
                                        <Row>
                                            <Col lg={8} className="mb-3">
                                                <div>
                                                    <Form.Label className="text-white">Do you have <strong>4 years</strong> of experience?</Form.Label>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mb-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <Form.Check type="radio" className="screening-radio" name="exp-radio" label="Yes" id="exp-yes" />
                                                    <Form.Check type="radio" className="screening-radio" name="exp-radio" label="No" id="exp-no" />
                                                </div>
                                            </Col>
                                            <Col lg={8} className="mb-3">
                                                <div>
                                                    <Form.Label className="text-white">Are you willing to work in  <strong>Mohali</strong> location?</Form.Label>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mb-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <Form.Check type="radio" className="screening-radio" name="loc-radio" label="Yes" id="loc-yes" />
                                                    <Form.Check type="radio" className="screening-radio" name="loc-radio" label="No" id="loc-no" />
                                                </div>
                                            </Col>
                                            <Col lg={8} className="mb-3">
                                                <div>
                                                    <Form.Label className="text-white">Have you worked with  <strong>Next.js</strong>?</Form.Label>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mb-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <Form.Check type="radio" className="screening-radio" name="skill-radio" label="Yes" id="skill-yes" />
                                                    <Form.Check type="radio" className="screening-radio" name="skill-radio" label="No" id="skill-no" />
                                                </div>
                                            </Col>
                                            <Col lg={8} className="mb-3">
                                                <div>
                                                    <Form.Label className="text-white">Have you comfortable to work <strong>remotely</strong>?</Form.Label>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mb-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <Form.Check type="radio" className="screening-radio" name="remote-radio" label="Yes" id="remote-yes" />
                                                    <Form.Check type="radio" className="screening-radio" name="remote-radio" label="No" id="remote-no" />
                                                </div>
                                            </Col>
                                            
                                        </Row>
                                    </div>
                                    <div className="text-center">
                                        <Link to={'/thank-you'} variant="transparent" className="submit-form-btn text-decoration-none text-black">Submit</Link>
                                        <Link to={'/apply-job'} variant="transparent" className="submit-form-btn bg-transparent text-decoration-none text-white ms-2">Back</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="h-100">
                                    <img src={devImg} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default ScreeningDetails;