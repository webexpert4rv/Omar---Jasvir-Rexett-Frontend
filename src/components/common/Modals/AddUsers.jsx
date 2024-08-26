import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const AddUserConversation = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Add users to conversation</h3>
                <Form>
                    <Form.Control type="text" className="common-field font-14" placeholder="Search Employee" />
                    <p className="font-12 text-muted">Who would you like to add to this conversation? You can only add users with access to the candidate.</p>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold">Add Selected User</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default AddUserConversation;