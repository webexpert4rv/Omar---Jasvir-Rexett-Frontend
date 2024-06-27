import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { IoCloudUploadOutline, IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import devImg from '../../../assets/img/user-img.jpg';

const AddCandidate = ({ show, handleClose }) => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedResume, setUploadedResume] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
        }
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedResume(file.name);
        }
    };

    const removeImage = () => {
        setUploadedImage(null);
    };

    const removeResume = () => {
        setUploadedResume(null);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Add Candidate</h3>
                    <div className="steps-popup d-flex justify-content-between font-14">
                        <div className="text-center step-countbx active">
                            <span className="step-count">1</span>
                            <p>Contact Details</p>
                        </div>
                        <div className="text-center">
                            <span className="step-count">2</span>
                            <p>Expertise</p>
                        </div>
                        <div className="text-center">
                            <span className="step-count">3</span>
                            <p>Past Success</p>
                        </div>
                        <div className="text-center">
                            <span className="step-count">4</span>
                            <p>Education</p>
                        </div>
                        <div className="text-center">
                            <span className="step-count">5</span>
                            <p>Project History</p>
                        </div>
                    </div>
                    <div className="candidate-form px-3">
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
                        <Row>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">First Name</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Last Name</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Email Address</Form.Label>
                                    <Form.Control type="email" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Phone Number</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Address</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Country</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select Country</option>
                                        <option>Sweden</option>
                                        <option>India</option>
                                        <option>USA</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">State</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select State</option>
                                        <option>Bohuslän</option>
                                        <option>Dalsland</option>
                                        <option>Västergötland</option>
                                        <option>Östergötland</option>
                                        <option>Småland</option>
                                        <option>Öland</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">City</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select City</option>
                                        <option>Stockholm</option>
                                        <option>Gothenburg</option>
                                        <option>Malmö</option>
                                        <option>Linköping</option>
                                        <option>Kiruna</option>
                                        <option>Ystad</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Zipcode</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={12}>
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
                            <Col lg={12} className="my-3">
                                {!uploadedResume && (
                                    <div>
                                        <input type="file" className="d-none" id="resume-upload" onChange={handleResumeUpload} />
                                        <Form.Label htmlFor="resume-upload" className="upload-resume-field">
                                            <span><IoCloudUploadOutline /></span> Upload your resume
                                        </Form.Label>
                                    </div>
                                )}
                                {uploadedResume && (
                                    <div className="d-flex justify-content-between align-items-center p-3 resume-uploaded-wrapper">
                                        <Link className="font-14 fw-medium text-green">
                                            {uploadedResume}
                                        </Link>
                                        <div className="d-flex align-items-center gap-3">
                                            <Link className="link-btn font-18">
                                                <FaEye />
                                            </Link>
                                            <Button variant="transparent" className="text-danger p-0 border-0 shadow-none font-18" onClick={removeResume}>
                                                <IoClose />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center pt-3">
                        <Button variant="transparent" className="main-btn font-14">Continue</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddCandidate;
