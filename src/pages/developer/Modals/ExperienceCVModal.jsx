import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ExperienceCV = ({ show, handleClose }) => {
    const [experienceFields, setExperienceFields] = useState([
        { id: 1, company: '', jobPosition: '', jobDescription: '', startDate: '', endDate: '', currentlyWorking: false }
    ]);

    const handleAddMore = () => {
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

    const handleDeleteField = (id) => {
        const updatedExperienceFields = experienceFields.filter(field => field.id !== id);
        setExperienceFields(updatedExperienceFields);
    };

    const handleChange = (id, field, value) => {
        const updatedExperienceFields = experienceFields.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setExperienceFields(updatedExperienceFields);
    };

    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg" scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Experience CV Section</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {experienceFields.map(({ id, company, jobPosition, jobDescription, startDate, endDate, currentlyWorking }, index) => (
                        <div className="experience-container mb-3" key={id}>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Company Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
                                            placeholder="Enter Company Name"
                                            value={company}
                                            onChange={(e) => handleChange(id, 'company', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Job Position</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
                                            placeholder="Enter Job Position"
                                            value={jobPosition}
                                            onChange={(e) => handleChange(id, 'jobPosition', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Job Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
                                            placeholder="Enter Job Description"
                                            value={jobDescription}
                                            onChange={(e) => handleChange(id, 'jobDescription', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            className="cv-field"
                                            placeholder="Enter Start Date"
                                            value={startDate}
                                            onChange={(e) => handleChange(id, 'startDate', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            className="cv-field"
                                            placeholder="Enter End Date"
                                            value={endDate}
                                            onChange={(e) => handleChange(id, 'endDate', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="12">
                                    <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                        <Form.Check
                                            type="checkbox"
                                            className="cv-field"
                                            checked={currentlyWorking}
                                            onChange={(e) => handleChange(id, 'currentlyWorking', e.target.checked)}
                                        />
                                        <Form.Label className="mb-0">Currently Working</Form.Label>
                                    </Form.Group>
                                </Col>
                                {index !== 0 && (
                                    <Col md="12" className="d-flex justify-content-end">
                                        <Button variant="danger" onClick={() => handleDeleteField(id)}>Delete</Button>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    ))}
                    <div className="text-end mb-3">
                        <Button className="main-btn py-2 px-3" onClick={handleAddMore}>Add More</Button>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ExperienceCV;
