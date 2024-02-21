import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const SocialMediaModal = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Add Social Media</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Form.Label>Add Social Media</Form.Label>
                                    <Form.Select className="mb-2">
                                        <option value="facebook">Facebook</option>
                                        <option value="linkedin">Linkedin</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="github">Github</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="gitlab">Gitlab</option>
                                        <option value="pintereset">Pintereset</option>
                                    </Form.Select>
                                    <Form.Control type="text" className="cv-field" placeholder="Enter Url"></Form.Control>
                                </Form.Group>
                            </Col>
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
export default SocialMediaModal;