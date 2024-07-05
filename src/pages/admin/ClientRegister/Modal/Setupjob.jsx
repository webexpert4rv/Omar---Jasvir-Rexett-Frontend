import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
const SetupJob = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Setting Up Your First Job</h3>
                    <p className="text-center font-14">We are really excited that you want to set up a new job with us.</p>
                    <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
                        <Button variant="transparent" onClick={handleClose} className="outline-main-btn font-14 text-decoration-none rounded-3">Cancel</Button>
                        <Link to={'/job-info'} variant="transparent" onClick={handleClose} className="main-btn font-14 text-decoration-none">Proceed</Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default SetupJob;