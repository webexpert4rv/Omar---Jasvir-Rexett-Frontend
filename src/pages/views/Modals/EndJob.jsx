import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
const EndJobModal = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>End Job</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label>Reason</Form.Label>
                        <Form.Control as="textarea" rows="6" placeholder="Enter your reason, why you want to end this job?"></Form.Control>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Send Request</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default EndJobModal;