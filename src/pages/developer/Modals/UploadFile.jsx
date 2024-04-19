import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const UploadFileModal = ({ show, handleClose }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Time Reports</h3>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    {/* <Form.Label>Select Category</Form.Label> */}
                                    <Form.Select>
                                        <option value="" selected disabled>Select Category</option>
                                        <option value="invoices">Invoices</option>
                                        <option value="contracts">Contracts</option>
                                        <option value="cv">CV</option>
                                        <option value="others">Others</option>
                                    </Form.Select>
                                    <Form.Control type="file" className="d-none" id="upload-file" />
                                    <Form.Label htmlFor="upload-file" className="upload-file-label">Upload File</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default UploadFileModal;