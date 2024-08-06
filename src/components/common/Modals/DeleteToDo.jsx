import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import RexettButton from "../../atomic/RexettButton";
const DeleteToDo = ({ show, handleClose ,handleDelete,smallLoader }) => {

    
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>
            <Modal.Body>
                <h3 className="popup-heading">Are you sure?</h3>
                <p className="font-14 texts-secondary text-center">This will permanently delete the todo.</p>
                <div className="text-center d-flex justify-content-center align-items-center gap-4">
                    <RexettButton  
                    variant="transparent" 
                    onClick={handleClose} 
                    className="font-14 border-0 shadow-none p-0 text-muted"
                    text="Cancel"
                    />
                    <RexettButton 
                    variant="transparent" 
                    className="delete-main-btn font-14 fw-semibold"
                    text={"Yes"}
                    onClick = {handleDelete}
                    disabled={smallLoader}
                    isLoading={smallLoader}
                    />
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default DeleteToDo;