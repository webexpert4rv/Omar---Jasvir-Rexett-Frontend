import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const SkillsModal = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Skills</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Form.Label>Skills</Form.Label>
                                    <Form.Control type="text" className="cv-field" placeholder="Enter Skills"></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default SkillsModal;