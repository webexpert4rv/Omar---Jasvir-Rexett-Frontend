import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
const NewUser = ({ show, handleClose }) => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
        }
    };
    const removeImage = () => {
        setUploadedImage(null);
    };
    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">New Employee</h3>

                <div className="text-center mb-3">
                    {!uploadedImage && (
                        <div className="upload-img">
                            <input type="file" className="d-none" id="upload-imgbx" onChange={handleImageUpload} />
                            <label className="upload-img" htmlFor="upload-imgbx">
                                <span><IoCloudUploadOutline /></span>
                                Upload image
                            </label>
                        </div>
                    )}
                    {uploadedImage && (
                        <div className="uploaded-img">
                            <img src={uploadedImage} className="img-uploaded" alt="Uploaded" />
                            <Button variant="transparent" className="shadow-none p-0 remove-upload-img" onClick={removeImage}>
                                <IoClose />
                            </Button>
                        </div>
                    )}
                </div>
                <Form>
                    <Row>
                        <Col lg={6}>
                            <div className="mb-2">
                                <Form.Label className="font-14 fw-medium">First Name *</Form.Label>
                                <Form.Control type="text" className="common-field font-14" placeholder="E.g. John" />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="mb-2">
                                <Form.Label className="font-14 fw-medium">Last Name *</Form.Label>
                                <Form.Control type="text" className="common-field font-14" placeholder="E.g. Doe" />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="mb-2">
                                <Form.Label className="font-14 fw-medium">Phone number *</Form.Label>
                                <Form.Control type="text" className="common-field font-14" placeholder="E.g. +91 123 456 7890" />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-2">
                                <Form.Label className="font-14 fw-medium" >Email Address *</Form.Label>
                                <Form.Control className="common-field font-14" placeholder="E.g. johndoe123@gmail.com" />
                            </Form.Group>
                        </Col>
                        <Col lg={12}>
                            <Form.Group className="mb-4">
                                <Form.Label className="font-14 fw-medium" >Select Role</Form.Label>
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
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-2">
                                <Form.Label className="font-14 fw-medium" >Country *</Form.Label>
                                <Form.Select className="common-field font-14">
                                    <option>Select country</option>
                                    <option>India</option>
                                    <option>Sweden</option>
                                    <option>USA</option>
                                    <option>UK</option>
                                    <option>UAE</option>
                                    <option>Russia</option>
                                    <option>Italy</option>
                                    <option>Germany</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-2">
                                <Form.Label className="font-14 fw-medium" >State *</Form.Label>
                                <Form.Select className="common-field font-14">
                                    <option>Select State</option>
                                    <option>Bohuslän</option>
                                    <option>Dalsland</option>
                                    <option>Västergötland</option>
                                    <option>Östergötland</option>
                                    <option>Småland</option>
                                    <option>Öland</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-2">
                                <Form.Label className="font-14 fw-medium" >City *</Form.Label>
                                <Form.Select className="common-field font-14">
                                    <option>Select City</option>
                                    <option>Stockholm</option>
                                    <option>Gothenburg</option>
                                    <option>Malmö</option>
                                    <option>Linköping</option>
                                    <option>Kiruna</option>
                                    <option>Ystad</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-2">
                                <Form.Label className="font-14 fw-medium" >Postal code *</Form.Label>
                                <Form.Control className="common-field font-14" placeholder="E.g. 11115" />
                            </Form.Group>
                        </Col>
                        <Col lg={8}>
                            <div className="mb-2">
                                <Form.Label className="font-14 fw-medium">Timezone</Form.Label>
                                <Form.Select className="common-field font-14">
                                    <option>Select Timezone</option>
                                    <option>GMT (+5:30) Kolkata</option>
                                    <option>GMT (+5:30) Chennai</option>
                                    <option>GMT (+5:30) New Delhi</option>
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                    <div className="text-center mt-4">
                        <Button variant="transparent" className="main-btn font-14">Send Invite</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default NewUser;