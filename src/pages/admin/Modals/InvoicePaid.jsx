import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
const InvoicePaidModal = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            {/* <Modal.Title>End Job</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="d-block text-center font-18">Are you sure?</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control className="common-field" placeholder="Enter Transaction ID*" />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default InvoicePaidModal;