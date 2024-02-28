import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const EditTimeReport = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>End Time Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row>
                        <Col md="12">
                            <Form.Group className="mb-4">
                                <Form.Label>Select Client</Form.Label>
                                <Form.Select>
                                    <option value="" selected disabled>Select Client</option>
                                    <option value="amazon">Amazon</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="bmw">BMW</option>
                                    <option value="google">Google</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="12">
                            <Form.Group className="mb-4">
                                <Form.Label>Select Developer</Form.Label>
                                <Form.Select>
                                    <option value="" selected disabled>Select Developer</option>
                                    <option value="rohit_sharma">Rohit Sharma</option>
                                    <option value="john_doe">John Doe</option>
                                    <option value="rohit_sharma">Rohit Sharma</option>
                                    <option value="john_doe">John Doe</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="12">
                            <Form.Group className="mb-4">
                                <Form.Label>Total Hours</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default EditTimeReport;