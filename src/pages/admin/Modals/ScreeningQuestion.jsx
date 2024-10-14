import React from "react";
import { Modal } from "react-bootstrap";
const ScreeningQuestion = ({ show, handleClose }) => {
    return(
        <>
            <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Screening Questions</h3>
                    <div>
                        <div className="question-wrapper">
                            <h4>How many years of experience you have?</h4>
                            <p>5 years</p>
                        </div>
                        <div className="question-wrapper">
                            <h4>Are you willing to do remote job?</h4>
                            <p>Yes</p>
                        </div>
                        <div className="question-wrapper">
                            <h4>Do you have graduation degree?</h4>
                            <p>Yes</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ScreeningQuestion;