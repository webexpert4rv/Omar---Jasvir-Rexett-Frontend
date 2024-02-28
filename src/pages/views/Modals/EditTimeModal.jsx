import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
const EditTimeModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                {/* <Modal.Title>End Job</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div>
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
                    </div>
                    <Form.Group className="mb-4">
                        <Form.Label>Having issue in time report?</Form.Label>
                        <Form.Control as="textarea" rows="6" placeholder="Enter your reason, why do you request for edit time request?"></Form.Control>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Send Request</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default EditTimeModal;