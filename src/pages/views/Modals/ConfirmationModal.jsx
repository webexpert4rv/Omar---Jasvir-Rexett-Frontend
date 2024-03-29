import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
const ConfirmationModal = ({ text,show, handleClose,onClick,smallLoader,type}) => {
    const callBackBtn=(e)=>{
        let data={
            status: type
        }
        onClick(e,data)
    }
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            {/* <Modal.Title>End Job</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="d-block text-center font-18">{text}</Form.Label>
                    </Form.Group>
                    <div className="text-center">
                        <RexettButton
                            type="submit"
                            text="Yes"
                            onClick={callBackBtn}
                            className="main-btn px-4 me-3"
                            variant="transparent"
                            isLoading={smallLoader}
                        />
                        <Button variant="transparent" onClick={handleClose} className="main-btn bg-transparent border-black text-black px-4">No</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default ConfirmationModal;