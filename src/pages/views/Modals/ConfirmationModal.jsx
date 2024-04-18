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
        <Modal show={show} onHide={(e)=>handleClose(e)} centered animation size="lg">
            <Modal.Header closeButton>
            {/* <Modal.Title>End Job</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="d-block text-center">{text}</Form.Label>
                    </Form.Group>
                    <div className="text-center">
                        <RexettButton
                            type="submit"
                            text="Yes"
                            onClick={callBackBtn}
                            className="main-btn px-4 me-3 font-14 fw-semibold"
                            variant="transparent"
                            isLoading={smallLoader}
                        />
                        <Button variant="transparent" onClick={handleClose} className="outline-main-btn font-14 fw-semibold bg-transparent border-black text-black px-4">No</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default ConfirmationModal;