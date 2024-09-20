import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const DeleteEntry = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Delete this entry?</h3>
                <p className="font-14 texts-secondary text-center">This can't be undone.</p>
                <div className="text-center d-flex justify-content-center align-items-center gap-4">
                    <Button variant="transparent" onClick={handleClose} className="font-14 border-0 shadow-none p-0 text-muted">Cancel</Button>
                    <Button variant="transparent" onClick={handleClose} className="delete-main-btn font-14 fw-semibold">Yes</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default DeleteEntry;