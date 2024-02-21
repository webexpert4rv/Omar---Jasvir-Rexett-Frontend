import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const EducationCV = ({ show, handleClose }) => {
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

    const handleChange = (id, field, value) => {
        const updatedEducationFields = educationFields.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setEducationFields(updatedEducationFields);
    };

    return (
        <Modal show={show} onHide={handleClose} centered scrollable animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Education</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {educationFields.map(({ id, university, degree, address, startYear, endYear, currentlyAttending }) => (
                        <div className="experience-container mb-3" key={id}>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        <Form.Label>University Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
                                            placeholder="Enter University Name"
                                            value={university}
                                            onChange={(e) => handleChange(id, 'university', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Degree Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
                                            placeholder="Enter Degree Name"
                                            value={degree}
                                            onChange={(e) => handleChange(id, 'degree', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
                                            placeholder="Enter Address"
                                            value={address}
                                            onChange={(e) => handleChange(id, 'address', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Start Year</Form.Label>
                                        <Form.Control
                                            type="date"
                                            className="cv-field"
                                            placeholder="Enter Start Year"
                                            value={startYear}
                                            onChange={(e) => handleChange(id, 'startYear', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>End Year</Form.Label>
                                        <Form.Control
                                            type="date"
                                            className="cv-field"
                                            placeholder="Enter End Year"
                                            value={endYear}
                                            onChange={(e) => handleChange(id, 'endYear', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="12">
                                    <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                        <Form.Check
                                            type="checkbox"
                                            className="cv-field"
                                            checked={currentlyAttending}
                                            onChange={(e) => handleChange(id, 'currentlyAttending', e.target.checked)}
                                        />
                                        <Form.Label className="mb-0">Currently Attending</Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md="12" className="d-flex justify-content-end">
                                    <Button variant="danger" onClick={() => handleDeleteField(id)}>Delete</Button>
                                </Col>
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

export default EducationCV;
