import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RexettSpinner from "../../../components/atomic/RexettSpinner";
const RejectModal = ({ show, handleClose,onClick,smallLoader }) => {
    const [feedback,setFeedback]=useState("")
    const handleFeedback=(e)=>{
        setFeedback(e.target.value)
    }
    return(
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">End Job</h3>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14">Feedbacks</Form.Label>
                        <Form.Control as="textarea" className="common-field" rows="6" placeholder="Enter your feedback, why you want to reject?" onChange={handleFeedback}></Form.Control>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold" onClick={(e)=>{
                            let data={
                                status:"ended",
                                end_reason:feedback
                            }
                            onClick(e,data)
                            }}>{smallLoader?<RexettSpinner/>:"Request"} </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default RejectModal;