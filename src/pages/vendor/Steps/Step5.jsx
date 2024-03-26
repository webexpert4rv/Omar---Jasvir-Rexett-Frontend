import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";

const StepFive = () => {
    const [socialMediaRows, setSocialMediaRows] = useState([
        { id: 1, socialMedia: '', url: '' } // Initial row
    ]);

    const handleAddMore = () => {
        const newRow = { id: socialMediaRows.length + 1, socialMedia: '', url: '' };
        setSocialMediaRows([...socialMediaRows, newRow]);
    };

    const handleDeleteRow = (id) => {
        const updatedRows = socialMediaRows.filter(row => row.id !== id);
        setSocialMediaRows(updatedRows);
    };
    return (
        <>
            <section className="step-container">
                <h2 className="overview-card-heading">Add Social Links</h2>
                <Form>
                    <div className="inner-form">
                        {socialMediaRows.map((row, index) => (
                            <div className="experience-container">
                                <Row>
                                    <Col md="12">
                                        <Form.Group className="mb-4">
                                            <Form.Select className="mb-2">
                                                <option value="facebook">Facebook</option>
                                                <option value="linkedin">Linkedin</option>
                                                <option value="twitter">Twitter</option>
                                                <option value="github">Github</option>
                                                <option value="instagram">Instagram</option>
                                                <option value="gitlab">Gitlab</option>
                                                <option value="pinterest">Pinterest</option>
                                            </Form.Select>
                                            <Form.Control type="text" className="cv-field" placeholder="Enter Url"></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                        <div className="text-end mb-3">
                            <Button className="main-btn py-2 px-3" onClick={handleAddMore}>Add More</Button>
                        </div>
                    </div>
                </Form>
            </section>
        </>
    )
}
export default StepFive;