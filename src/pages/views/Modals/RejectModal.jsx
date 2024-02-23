import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
const RejectModal = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Reject</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label>Feedbacks</Form.Label>
                        <Form.Control as="textarea" rows="6" placeholder="Enter your feedback, why you want to reject?"></Form.Control>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default RejectModal;