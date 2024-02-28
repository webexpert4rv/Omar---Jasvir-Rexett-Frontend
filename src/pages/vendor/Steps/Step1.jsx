import React from "react";
import { Col, Form, Row } from "react-bootstrap";
const StepOne = () => {
    return(
        <>
            <section className="step-container">
                <h2 className="overview-card-heading">Enter Personal Details</h2>
                <Form>
                    <div className="inner-form">
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="common-label">Developer Name</Form.Label>
                                    <Form.Control type="text" className="common-field" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="common-label">Email</Form.Label>
                                    <Form.Control type="email" className="common-field" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="common-label">Phone Number</Form.Label>
                                    <Form.Control type="text" className="common-field" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="common-label">Address</Form.Label>
                                    <Form.Control type="text" className="common-field" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="common-label">City</Form.Label>
                                    <Form.Control type="text" className="common-field" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="common-label">State</Form.Label>
                                    <Form.Control type="text" className="common-field" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="common-label">Postal Code</Form.Label>
                                    <Form.Control type="text" className="common-field" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="common-label">Country</Form.Label>
                                    <Form.Control type="text" className="common-field" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </section>
        </>
    )
}
export default StepOne;