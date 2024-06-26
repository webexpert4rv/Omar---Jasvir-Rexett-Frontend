import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
const EditRole = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Edit Role</h3>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14 fw-medium" >Name</Form.Label>
                        <Form.Control className="common-field font-14" placeholder="Enter role name" value="John Smith" readOnly />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14 fw-medium" >Permission</Form.Label>
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
                    {/* <div className="d-flex gap-3 align-items-center mb-4">
                        <Form.Label htmlFor="deactivate-toggle" className="font-14 lh-1 cursor-pointer fw-medium">Deactivate Account</Form.Label>
                        <div class="form-check form-switch toggle-switch-wrapper">
                            <input
                                class="form-check-input toggle-switch-custom mt-0 cursor-pointer shadow-none"
                                type="checkbox"
                                role="switch"
                                id="deactivate-toggle"
                            />
                        </div>
                    </div> */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                            <Button variant="transparent" className="cancel-btn font-14 bg-transparent">Deactivate Account</Button>
                        </div>
                        <div className="text-center">
                            <Button variant="transparent" className="main-btn font-14">Update Role</Button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default EditRole;