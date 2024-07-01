import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { IoCloudUploadOutline, IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddCandidate = ({ show, handleClose }) => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedResume, setUploadedResume] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

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

    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
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
                );
            case 2:
                return (
                    <div className="expertise-form candidate-form px-3">
                        <Row>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">How many years of work experience?</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select years</option>
                                        <option>0 to 1 years</option>
                                        <option>1 to 2 years</option>
                                        <option>2 to 3 years</option>
                                        <option>5+ years</option>
                                        <option>10+ years</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Job type</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select Type</option>
                                        <option>Remote</option>
                                        <option>Hybrid</option>
                                        <option>Onsite</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Select Primary Language</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select language</option>
                                        <option>English</option>
                                        <option>Swedish</option>
                                        <option>German</option>
                                        <option>French</option>
                                        <option>Hindi</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Primary Language Level</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select level</option>
                                        <option>Starter</option>
                                        <option>Intermediate</option>
                                        <option>Expert</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Select Alternative Language</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select language</option>
                                        <option>English</option>
                                        <option>Swedish</option>
                                        <option>German</option>
                                        <option>French</option>
                                        <option>Hindi</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Alternative Language Level</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select level</option>
                                        <option>Starter</option>
                                        <option>Intermediate</option>
                                        <option>Expert</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Select your expertise</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select skills</option>
                                        <option>React JS</option>
                                        <option>Vue JS</option>
                                        <option>Javascript</option>
                                        <option>HTML</option>
                                        <option>CSS</option>
                                        <option>React Native</option>
                                        <option>Angular</option>
                                        <option>PHP</option>
                                        <option>Python</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Select good to have skills</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select skills</option>
                                        <option>React JS</option>
                                        <option>Vue JS</option>
                                        <option>Javascript</option>
                                        <option>HTML</option>
                                        <option>CSS</option>
                                        <option>React Native</option>
                                        <option>Angular</option>
                                        <option>PHP</option>
                                        <option>Python</option>
                                    </Form.Select>
                                </div>
                            </Col>
                        </Row>
                    </div>
                );
            case 3:
                return (
                    <div className="past-success-form candidate-form px-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="mb-0">Experience</h4>
                            <Button variant="transparent" className="main-btn font-14">+ Add Experieence</Button>
                        </div>
                        <Row>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Professional title</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Company Name</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">From</Form.Label>
                                    <Form.Control type="date" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">To</Form.Label>
                                    <Form.Control type="date" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} className="common-field font-14" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                );
            case 4:
                return (
                    <div className="education-history-form candidate-form px-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="mb-0">Education</h4>
                            <Button variant="transparent" className="main-btn font-14">+ Add Education</Button>
                        </div>
                        <Row>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Degree/Diploma</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select Degree/Diploma</option>
                                        <option>Bachelor of Science</option>
                                        <option>Master of Computer Science</option>
                                        <option>Bachelor of Arts</option>
                                        <option>Ph.D in Electical Engineering</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">College/Universtity Name</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">From</Form.Label>
                                    <Form.Control type="date" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">To</Form.Label>
                                    <Form.Control type="date" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} className="common-field font-14" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                );
            case 5:
                return (
                    <div className="project-history-form candidate-form px-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="mb-0">Project History</h4>
                            <Button variant="transparent" className="main-btn font-14">+ Add Project</Button>
                        </div>
                        <Row>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Title</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Skills</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select skills</option>
                                        <option>React JS</option>
                                        <option>Vue JS</option>
                                        <option>Javascript</option>
                                        <option>HTML</option>
                                        <option>CSS</option>
                                        <option>React Native</option>
                                        <option>Angular</option>
                                        <option>PHP</option>
                                        <option>Python</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Role</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Project Type</Form.Label>
                                    <Form.Select className="common-field font-14">
                                        <option>Select Type</option>
                                        <option>Ecommerce</option>
                                        <option>Dating Apps/Website</option>
                                        <option>Healthcare</option>
                                        <option>Artificial Intelligence</option>
                                    </Form.Select>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Project URL</Form.Label>
                                    <Form.Control type="text" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">From</Form.Label>
                                    <Form.Control type="date" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">To</Form.Label>
                                    <Form.Control type="date" className="common-field font-14" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-2">
                                    <Form.Label className="font-14 fw-medium">Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} className="common-field font-14" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>
            <Modal.Body>
                <h3 className="popup-heading">Add Candidate</h3>
                {renderStepContent()}
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="secondary" onClick={prevStep} disabled={currentStep === 1}>
                    Previous
                </Button>
                {currentStep < 5 && (
                    <div className="text-center pt-3">
                        <Button variant="transparent" onClick={nextStep} className="main-btn font-14">Continue</Button>
                    </div>
                )}
                {currentStep === 5 && (
                    <Button variant="transparent" onClick={handleClose} className="main-btn font-14">Submit</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default AddCandidate;
