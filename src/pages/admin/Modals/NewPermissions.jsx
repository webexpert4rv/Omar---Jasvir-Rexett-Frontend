import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const NewPermissions = ({ show, handleClose}) => {
    return(
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">New Permission</h3>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14" >Permission Name</Form.Label>
                        <Form.Control className="common-field" placeholder="Enter permission name" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14" >Permission Category</Form.Label>
                        <Form.Select className="common-field font-14">
                            <option>Select Category</option>
                            <option value="new_category">New Category</option>
                            <option value="new_application">New Application</option>
                            <option value="jobs">Jobs</option>
                            <option value="time_reporting">Time Reporting</option>
                            <option value="invoices">Invoices</option>
                            <option value="profile_updation">Profile Updation</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn font-14">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default NewPermissions;