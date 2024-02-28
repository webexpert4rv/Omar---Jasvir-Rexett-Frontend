import React, {useState} from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
const StepThree = () => {
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
    return (
        <>
            <section className="step-container">
                <h2 className="overview-card-heading">Enter Education Details</h2>
                <Form>
                    <div className="inner-form">
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
                                        <Form.Label className="mb-0">Currently Attending</Form.Label>
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
export default StepThree;