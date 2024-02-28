import React, {useState} from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
const StepTwo = () => {
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
    return (
        <>
            <section className="step-container">
                <h2 className="overview-card-heading">Enter Experience</h2>
                <Form>
                    <div className="inner-form">
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
                                <Col md={6}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            className="cv-field common-field"
                                            placeholder="Enter Start Date"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
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
                                        <Button variant="danger" onClick={() => handleDeleteField(id)}>Delete</Button>
                                    </Col>
                                )}
                            </Row>
                        ))}
                        <div className="text-end my-3">
                            <Button className="main-btn py-2 px-3" onClick={handleAddMore}>Add More</Button>
                        </div>
                    </div>
                </Form>
            </section>
        </>
    )
}
export default StepTwo;