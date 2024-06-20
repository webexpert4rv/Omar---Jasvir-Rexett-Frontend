import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const NewUser = ({ show, handleClose}) => {
    return(
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">New Employee</h3>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14" >Email Address</Form.Label>
                        <Form.Control className="common-field font-14" placeholder="Enter email address" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14" >Select Role</Form.Label>
                        <Form.Select className="common-field font-14">
                            <option>Select Permission</option>
                            <option value="workspace_admin">Workspace Admin</option>
                            <option value="admin">Admin</option>
                            <option value="support_assistance">Support Assistance</option>
                            <option value="maintainance">Maintainance</option>
                            <option value="accountant">Accountant</option>
                            <option value="hr">HR</option>
                            <option value="assistance">Assistance</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn font-14">Send Invite</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default NewUser;