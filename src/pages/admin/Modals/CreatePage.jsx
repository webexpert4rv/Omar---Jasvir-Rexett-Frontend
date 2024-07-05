import React from "react";
import { Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
const CreateWebsitePage = ({ show, handleClose }) => {
    return(
        <>
            <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Create new page</h3>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="font-14 fw-medium" >Page Name *</Form.Label>
                            <Form.Control type="text" className="common-field font-14" placeholder="E.g. Homepage" />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="font-14 fw-medium" >Select Template *</Form.Label>
                            <Form.Select className="common-field font-14">
                                <option>Select Template</option>
                                <option>Blank page</option>
                                <option>Homepage</option>
                                <option>About Us</option>
                                <option>Career</option>
                                <option>Single Career</option>
                                <option>Contact Us</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="text-center">
                            <Link to={'/admin/website-builder'} variant="transparent" className="main-btn font-14 text-decoration-none">Create new page</Link>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default CreateWebsitePage;