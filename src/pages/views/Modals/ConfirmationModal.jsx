import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
const ConfirmationModal = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            {/* <Modal.Title>End Job</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="d-block text-center font-18">Want to shortlist this developer?</Form.Label>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 me-3">Yes</Button>
                        <Button variant="transparent" onClick={handleClose} className="main-btn bg-transparent border-black text-black px-4">No</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default ConfirmationModal;