import React, { useState } from "react";
import StepOne from "./Steps/Step1";
import StepTwo from "./Steps/Step2";
import StepThree from "./Steps/Step3";
import StepFour from "./Steps/Step4";
import StepFive from "./Steps/Step5";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Select from 'react-select';
const options = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'JavaScript' },
    { value: 'jquery', label: 'jQuery' },
    { value: 'reactjs', label: 'ReactJS' },
    { value: 'vuejs', label: 'VueJS' },
    { value: 'angularjs', label: 'AngularJS' },
    { value: 'bootstrap', label: 'Bootstrap' },
  ];

const RegisterDeveloper = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const goToNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const [experienceFields, setExperienceFields] = useState([
        { id: 1, company: '', jobPosition: '', jobDescription: '', startDate: '', endDate: '', currentlyWorking: false }
    ]);

    const handleAddMoreExp = () => {
        const newExperienceField = {
            id: experienceFields.length + 1,
            company: '',
            jobPosition: '',
            jobDescription: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false
        };
        setExperienceFields([...experienceFields, newExperienceField]);
    };
    const handleDeleteFieldExp = (id) => {
        const updatedExperienceFields = experienceFields.filter(field => field.id !== id);
        setExperienceFields(updatedExperienceFields);
    };
    const [educationFields, setEducationFields] = useState([
        { id: 1, university: '', degree: '', address: '', startYear: '', endYear: '', currentlyAttending: false }
    ]);

    const handleAddMore = () => {
        const newEducationField = {
            id: educationFields.length + 1,
            university: '',
            degree: '',
            address: '',
            startYear: '',
            endYear: '',
            currentlyAttending: false
        };
        setEducationFields([...educationFields, newEducationField]);
    };
    const handleDeleteField = (id) => {
        const updatedEducationFields = educationFields.filter(field => field.id !== id);
        setEducationFields(updatedEducationFields);
    };
    const [selectedOption, setSelectedOption] = useState(null);
    const [socialMediaRows, setSocialMediaRows] = useState([
        { id: 1, socialMedia: '', url: '' } // Initial row
    ]);

    const handleAddMoreSocial = () => {
        const newRow = { id: socialMediaRows.length + 1, socialMedia: '', url: '' };
        setSocialMediaRows([...socialMediaRows, newRow]);
    };

    const handleDeleteRowSocial = (id) => {
        const updatedRows = socialMediaRows.filter(row => row.id !== id);
        setSocialMediaRows(updatedRows);
    };

    return (
        <>
            <section className="register-developer card-box">
                {/* <div className="step-counts">
                    {steps.map((step, index) => (
                        <span
                            key={index}
                            className={`count ${currentStep === index ? "current" : ""} ${currentStep > index ? "active" : ""}`}
                        >
                            {index + 1}
                        </span>
                    ))}
                </div> */}
                <div className="">
                    <Form>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Personal Details</h2>
                        <div className="inner-form mb-3">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Developer Name</Form.Label>
                                        <Form.Control type="text" className="common-field" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Email</Form.Label>
                                        <Form.Control type="email" className="common-field" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Phone Number</Form.Label>
                                        <Form.Control type="text" className="common-field" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Address</Form.Label>
                                        <Form.Control type="text" className="common-field" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">City</Form.Label>
                                        <Form.Control type="text" className="common-field" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">State</Form.Label>
                                        <Form.Control type="text" className="common-field" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Postal Code</Form.Label>
                                        <Form.Control type="text" className="common-field" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Country</Form.Label>
                                        <Form.Control type="text" className="common-field" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Experience</h2>
                        <div className="inner-form mb-3">
                            {experienceFields.map(({ id, company, jobPosition, jobDescription, startDate, endDate, currentlyWorking }, index) => (
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Company Name</Form.Label>
                                            <Form.Control type="text" className="common-field" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Job Position</Form.Label>
                                            <Form.Control type="text" className="common-field" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Job Description</Form.Label>
                                            <Form.Control type="text" className="common-field" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="cv-field common-field"
                                                placeholder="Enter Start Date"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="cv-field common-field"
                                                placeholder="Enter End Date"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md="12">
                                        <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                className="cv-field"
                                            />
                                            <Form.Label className="mb-0">Currently Working</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {index !== 0 && (
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button variant="danger" onClick={() => handleDeleteFieldExp(id)}><FaTrash /></Button>
                                        </Col>
                                    )}
                                </Row>
                            ))}
                            <div className="text-end my-3">
                                <Button className="main-btn py-2 px-3" onClick={handleAddMoreExp}>+</Button>
                            </div>
                        </div>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Education Details</h2>
                        <div className="inner-form mb-3">
                            {educationFields.map(({ id, university, degree, address, startYear, endYear, currentlyAttending }, index) => (
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>University Name</Form.Label>
                                            <Form.Control type="text" className="common-field" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Degree Name</Form.Label>
                                            <Form.Control type="text" className="common-field" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" className="common-field" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="cv-field common-field"
                                                placeholder="Enter Start Date"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="cv-field common-field"
                                                placeholder="Enter End Date"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md="12">
                                        <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                className="cv-field"
                                            />
                                            <Form.Label className="mb-0">Currently Attending</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {index !== 0 && (
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button variant="danger" onClick={() => handleDeleteField(id)}><FaTrash /></Button>
                                        </Col>
                                    )}
                                </Row>
                            ))}
                            <div className="text-end my-3">
                                <Button className="main-btn py-2 px-3" onClick={handleAddMore}>+</Button>
                            </div>
                        </div>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Skills</h2>
                        <div className="inner-form mb-3">
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        {/* <Form.Label>Skills</Form.Label> */}
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                            isMulti
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Add Social Links</h2>
                        <div className="inner-form">
                            {socialMediaRows.map((row, index) => (
                                <div className="experience-container">
                                    <Row>
                                        <Col md="12">
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1 px-0">
                                                    <Form.Select className="py-0 border-0 shadow-none bg-transparent">
                                                        <option value="facebook">Facebook</option>
                                                        <option value="linkedin">Linkedin</option>
                                                        <option value="twitter">Twitter</option>
                                                        <option value="github">Github</option>
                                                        <option value="instagram">Instagram</option>
                                                        <option value="gitlab">Gitlab</option>
                                                        <option value="pinterest">Pinterest</option>
                                                    </Form.Select>
                                                </InputGroup.Text>
                                                <Form.Control type="text" className="cv-field" placeholder="Enter Url"></Form.Control>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            <div className="text-end mb-3">
                                <Button className="main-btn py-2 px-3" onClick={handleAddMoreSocial}>+</Button>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="transparent"
                                className="main-btn px-5"
                                onClick={goToPreviousStep}
                            >
                                Register
                            </Button>
                        </div>
                    </Form>
                    {/* <div className="d-flex justify-content-center align-items-center gap-3">
                        {currentStep > 0 && (
                            <Button
                                variant="transparent"
                                className="main-btn px-5 outline-main-btn"
                                onClick={goToPreviousStep}
                            >
                                Back
                            </Button>
                        )}
                        {currentStep === steps.length - 1 ? (
                            <Button
                                variant="transparent"
                                className="main-btn px-5"
                                onClick={goToNextStep}
                            >
                                Finish
                            </Button>
                        ) : (
                            <Button
                                variant="transparent"
                                className="main-btn px-5"
                                onClick={goToNextStep}
                            >
                                Next
                            </Button>
                        )}
                    </div> */}
                </div>
            </section>
        </>
    );
};

export default RegisterDeveloper;
