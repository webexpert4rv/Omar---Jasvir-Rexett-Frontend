import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch } from "react-redux";
import { addDeveloperCvExperience, deleteExperience, updateDeveloperCvExperience } from "../../../redux/slices/developerDataSlice";

const ExperienceCV = ({ show, handleClose, data }) => {
    const dispatch = useDispatch()
    const [experienceFields, setExperienceFields] = useState([
        { company_name: "", job_title: "", description: "", start_date: "", end_date: "", is_still_working: false }
    ]);

    useEffect(() => {
        if (data) {
            setExperienceFields(data)
        }
    }, [data])

    const handleAddMore = () => {
        const newExperienceField = {
            company_name: '',
            job_title: '',
            description: '',
            start_date: '',
            end_ate: '',
            is_still_working: false
        };
        setExperienceFields([...experienceFields, newExperienceField]);
    };

    // const handleDeleteField = (id) => {
    //     const updatedExperienceFields = experienceFields.filter(field => field.id !== id);
    //     setExperienceFields(updatedExperienceFields);
    // };

    const handleChange = (id, field, value) => {
        const updatedExperienceFields = experienceFields.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setExperienceFields(updatedExperienceFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let addExp = experienceFields.map((item) => {
            if (!item.id) {
                return { ...item }
            }
        }).filter((item) => item)
        if (addExp.length > 0) {
            dispatch(addDeveloperCvExperience(addExp))
        } else {
            experienceFields.forEach((item) => {
                if (item.id) {
                    dispatch(updateDeveloperCvExperience(item, item.id, () => {

                    }))

                }
            })
        }
    }

    const deleteDeveloperExperience = (id) => {
        dispatch(deleteExperience(id, () => {
            const updatedExperienceFields = experienceFields.filter(field => field.id !== id);
            setExperienceFields(updatedExperienceFields);
        }))

    }
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg" scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Experience CV Section</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {experienceFields.map(({ id, company_name, job_title, description, start_date, end_date, is_still_working }, index) => (
                        <div className="experience-container mb-3" key={id}>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Company Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
                                            name="company_name"
                                            placeholder="Enter Company Name"
                                            value={company_name}
                                            onChange={(e) => handleChange(id, 'company_name', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Job Position</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
                                            name="job_title"
                                            placeholder="Enter Job Position"
                                            value={job_title}
                                            onChange={(e) => handleChange(id, 'job_title', e.target.value)}
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
                                            value={description}
                                            onChange={(e) => handleChange(id, 'description', e.target.value)}
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
                                            value={start_date?.slice(0, 10)}
                                            onChange={(e) => handleChange(id, 'start_date', e.target.value)}
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
                                            value={end_date?.slice(0, 10)}
                                            onChange={(e) => handleChange(id, 'end_date', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="12">
                                    <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                        <Form.Check
                                            type="checkbox"
                                            className="cv-field"
                                            checked={is_still_working}
                                            onChange={(e) => handleChange(id, 'is_still_working', e.target.checked)}
                                        />
                                        <Form.Label className="mb-0">Currently Working</Form.Label>
                                    </Form.Group>
                                </Col>
                                {index !== 0 && (
                                    <Col md="12" className="d-flex justify-content-end">
                                        <Button variant="danger" onClick={() => deleteDeveloperExperience(id)}>Delete</Button>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    ))}
                    <div className="text-end mb-3">
                        <Button className="main-btn py-2 px-3" onClick={handleAddMore}>Add More</Button>
                    </div>
                    <div className="text-center">
                        <RexettButton
                            type="submit"
                            text="Submit"
                            className="main-btn px-4"
                            variant="transparent"
                            isLoading={false}
                        />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ExperienceCV;
