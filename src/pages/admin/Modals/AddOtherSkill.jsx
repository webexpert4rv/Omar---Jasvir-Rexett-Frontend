import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
const AddOtherSkill = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Add Skill</h3>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="font-14 fw-medium" >Skill Name</Form.Label>
                            <Form.Control type="text" className="common-field font-14" />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="transparent" className="main-btn font-14">Add Skill</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default AddOtherSkill;