import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const CustomFieldModal = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Custom Field</h3>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Label className="font-14 fw-medium">Name <span className="req-text">*</span></Form.Label>
                                <Form.Control type="text" placeholder="E.g. Email Field" className="common-field font-14"  />
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Label className="font-14 fw-medium">Type <span className="req-text">*</span></Form.Label>
                                <Form.Select className="common-field font-14">
                                    <option>Text</option>
                                    <option>Email</option>
                                    <option>Phone Number</option>
                                    <option>Signature</option>
                                    <option>Date Signed</option>
                                    <option>Price</option>
                                    <option>Working hours</option>
                                    <option>Address</option>
                                    <option>Textarea</option>
                                </Form.Select>
                            </Col>
                            <Col md={12}>
                                <Form.Label className="font-14 fw-medium d-block">Metadata Options <span className="req-text">*</span></Form.Label>
                                <Form.Check type="checkbox" className="font-14" label="Required" inline />
                                <Form.Check type="checkbox" className="font-14" label="Readonly" inline />
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold">Save</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default CustomFieldModal;