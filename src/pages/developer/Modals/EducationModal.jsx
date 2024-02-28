import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteEducationCv, updateDeveloperCvEducation } from "../../../redux/slices/developerDataSlice";
import RexettButton from "../../../components/atomic/RexettButton";

const EducationCV = ({ show, handleClose,data }) => {
    const dispatch =useDispatch()
    const [educationFields, setEducationFields] = useState([
        { university: '', degree: '', address: '', startYear: '', endYear: '', currentlyAttending: false }
    ]);

    const handleAddMore = () => {
        const newEducationField = {
            university: '',
            degree: '',
            address: '',
            startYear: '',
            endYear: '',
            currentlyAttending: false
        };
        setEducationFields([...educationFields, newEducationField]);
    };

    useEffect(()=>{
        if(data){
            setEducationFields(data) 
        }

    },[data])

    const handleDeleteField = (id) => {
        dispatch(deleteEducationCv(id,()=>{
            const updatedEducationFields = educationFields.filter(field => field.id !== id);
            setEducationFields(updatedEducationFields);
        }))
        
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

    const handleSubmit=(e)=>{
       e.preventDefault();
       dispatch(updateDeveloperCvEducation(educationFields))
    }

    return (
        <Modal show={show} onHide={handleClose} centered scrollable animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Education</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {educationFields.map(({ id, university_name, Degree, address, startYear, endYear, currently_attending }) => (
                        <div className="experience-container mb-3" key={id}>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        <Form.Label>University Name Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
                                            placeholder="Enter University  Name"
                                            value={university_name}
                                            onChange={(e) => handleChange(id, 'university_name', e.target.value)}
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
                                            value={Degree?.title}
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
                                            checked={currently_attending}
                                            onChange={(e) => handleChange(id, 'currently_attending', e.target.checked)}
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
                        <RexettButton 
                                        type="submit" 
                                        text="Submit"
                                        className="main-btn px-4"
                                        variant="transparent"
                                        isLoading={false}
                                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EducationCV;
