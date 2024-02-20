import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const EducationCV = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Education</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Form.Label>University Name</Form.Label>
                                    <Form.Control type="text" className="cv-field" placeholder="Enter University Name"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-4">
                                    <Form.Label>Degree Name</Form.Label>
                                    <Form.Control type="text" className="cv-field" placeholder="Enter Degree Name"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-4">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" className="cv-field" placeholder="Enter Address"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-4">
                                    <Form.Label>Start Year</Form.Label>
                                    <Form.Control type="date" className="cv-field" placeholder="Enter Job Position"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-4">
                                    <Form.Label>End Year</Form.Label>
                                    <Form.Control type="date" className="cv-field" placeholder="Enter Job Position"></Form.Control>
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                <Form.Check type="checkbox" className="cv-field" placeholder="Enter Job Position"></Form.Check>
                                <Form.Label className="mb-0">Currently</Form.Label>
                            </Form.Group>
                        </Row>
                    </div>
                    <div className="text-end mb-3">
                        <Button className="main-btn py-2 px-3">Add More</Button>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default EducationCV;