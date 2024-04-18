import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RexettSpinner from "../../../components/atomic/RexettSpinner";
const RejectModal = ({ show, handleClose,onClick,smallLoader }) => {
    const [feedback,setFeedback]=useState("")
    const handleFeedback=(e)=>{
        setFeedback(e.target.value)
    }
    return(
        <Modal show={show} onHide={(e)=>handleClose(e)} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>End Job</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label>Feedbacks</Form.Label>
                        <Form.Control as="textarea" rows="6" placeholder="Enter your feedback, why you want to reject?" onChange={handleFeedback}></Form.Control>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4" onClick={(e)=>{
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