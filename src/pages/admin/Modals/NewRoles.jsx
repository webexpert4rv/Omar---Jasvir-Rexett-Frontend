import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const NewRoles = ({ show, handleClose}) => {
    return(
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">New Roles</h3>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14" >Role Name</Form.Label>
                        <Form.Control className="common-field" placeholder="Enter role name" />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn font-14">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default NewRoles;