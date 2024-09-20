import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
const CreateNewPlan = () => {
    return (
        <>
            <div className="card-box">
                <div className="d-flex gap-3 justify-content-between align-items-center pb-2 mb-3 border-bottom-grey">
                    <h2 className="section-head-sub mb-0 border-0">
                        Create new plan
                    </h2>
                </div>
                <div>
                    <Row>
                        <Col md={6}>
                            <div className="mb-3">
                                <Form.Label className="font-14 fw-medium">Plan Name *</Form.Label>
                                <Form.Control type="text" placeholder="E.g. Basic" className="common-field font-14" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <Form.Label className="font-14 fw-medium">Billing Period *</Form.Label>
                                <div>
                                    <Form.Check type="radio" name="billing_radio" className="billing_radio" label="Monthly" id="monthly_bill" />
                                    <Form.Check type="radio" name="billing_radio" className="billing_radio" label="Annual" id="annual_bill" />
                                    <Form.Check type="radio" name="billing_radio" className="billing_radio" label="Trail" id="trail_bill" />
                                    <Form.Check type="radio" name="billing_radio" className="billing_radio" label="Offer" id="offer_bill" />
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <Form.Label className="font-14 fw-medium">Price *</Form.Label>
                                <div className="d-flex gap-2 align-items-center">
                                    <Form.Control type="text" className="common-field font-14 dollar-field" value="$" readOnly />
                                    <Form.Control type="text" placeholder="E.g. $12.99" className="common-field font-14 w-100" />
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <Form.Label className="font-14 fw-medium">Offer Price *</Form.Label>
                                <div className="d-flex gap-2 align-items-center">
                                    <Form.Control type="text" className="common-field font-14 dollar-field" value="$" readOnly />
                                    <Form.Control type="text" placeholder="E.g. $12.99" className="common-field font-14 w-100" />
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <Form.Label className="font-14 fw-medium">Trial Period *</Form.Label>
                                <Form.Select className="common-field font-14">
                                    <option value="">Select Period</option>
                                    <option value="15_days">15 days</option>
                                    <option value="30_days">30 days</option>
                                    <option value="45_days">45 days</option>
                                </Form.Select>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <Form.Label className="font-14 fw-medium">Status *</Form.Label>
                                <div class="form-check form-switch toggle-switch-wrapper">
                                    <input
                                        class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                        type="checkbox"
                                        role="switch"
                                        checked
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="mb-2">
                                <Form.Label className="font-14 fw-medium">Features *</Form.Label>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <Form.Control type="text" placeholder="E.g. Access Time Reporting" className="common-field font-14" />
                                    <Button className="arrow-btn danger-arrow">
                                        <IoCloseOutline />
                                    </Button>
                                </div>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <Form.Control type="text" placeholder="E.g. Access Time Reporting" className="common-field font-14" />
                                    <Button className="arrow-btn primary-arrow">
                                        <IoAddOutline />
                                    </Button>
                                    <Button className="arrow-btn danger-arrow">
                                        <IoCloseOutline />
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="text-center mt-4">
                        <Button variant="transparent" className="main-btn font-14">Submit</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateNewPlan;