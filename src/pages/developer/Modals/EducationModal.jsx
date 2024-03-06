import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addDeveloperCvEducation, deleteEducationCv, fetchDeveloperCv, getDegreeList, updateDeveloperCvEducation } from "../../../redux/slices/developerDataSlice";
import RexettButton from "../../../components/atomic/RexettButton";
import Select from 'react-select';

const EducationCV = ({ show, handleClose,data }) => {
    const dispatch =useDispatch();
    const {degreeList}=useSelector(state=>state.developerData)
    const [formErrors, setFormErrors] = useState([]);
    const [educationFields, setEducationFields] = useState([
        { university_name: '', degree_id: '', address: '', start_year: '', end_year: '', currently_attending: false }
    ]);
    function generateYears() {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = 1995; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    }
    
    // Example usage:
    const yearsArray = generateYears();

    const handleAddMore = () => {
        // const errors = validateForm();
        // console.log(errors,"eee")
        const newEducationField = {
            university_name: '',
            degree_id: '',
            address: '',
            start_year: '',
            end_year: '',
            currently_attending: false
        };
        setEducationFields([...educationFields, newEducationField]);
    };
    useEffect(()=>{
    dispatch(getDegreeList())
    },[])

    useEffect(()=>{
        if(data){
            setEducationFields(data) 
        }

    },[data])

    const handleDeleteField = (id) => {
        dispatch(deleteEducationCv(id,()=>{
            const updatedEducationFields = educationFields.filter(field => field.id !== id);
            setEducationFields(updatedEducationFields);
            
            dispatch(fetchDeveloperCv())

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
    //    dispatch(addDeveloperCvEducation(educationFields,()=>{
    //     handleClose()
    //     dispatch(fetchDeveloperCv())
    //    }))


       let addEdu = educationFields.map((item) => {
        if (!item.id) {
            return { ...item }
        }
    }).filter((item) => item)
    if (addEdu.length > 0) {
        dispatch(addDeveloperCvEducation(addEdu,()=>{
            dispatch(fetchDeveloperCv())
            handleClose()
        }))
    } else {
        educationFields.forEach((item) => {
            if (item.id) {
                dispatch(updateDeveloperCvEducation(item, item.id, () => {
                    dispatch(fetchDeveloperCv())
                    handleClose()
                }))

            }
        })
    }
    }

    // const validateForm = () => {
    //     const errors = [];
    //     educationFields.forEach(field => {
    //         if (!field.university || !field.degree || !field.address || !field.start_year || !field.end_year) {
    //             errors.push("All fields are required.");
    //         }
    //     });
    //     return errors;
    // };

    return (
        <Modal show={show} onHide={handleClose} centered scrollable animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Education</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {educationFields.map(({ id, university_name, Degree, address, start_year, end_year, currently_attending }) => (
                        <div className="experience-container mb-3" key={id}>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        <Form.Label>University Name </Form.Label>
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
                                        {/* <Form.Control
                                            type="text"
                                            className="cv-field"
                                            placeholder="Enter Degree Name"
                                            value={Degree?.title}
                                            onChange={(e) => handleChange(id, 'degree', e.target.value)}
                                        /> */}
                                             <Select
                                    options={degreeList}
                                    onChange={(val) => handleChange(id, 'degree_id', val.value)}
                                   
                                    
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
                                        {/* <Form.Control
                                            type="date"
                                            className="cv-field"
                                            placeholder="Enter Start Year"
                                            value={start_year}
                                            onChange={(e) => handleChange(id, 'start_year', e.target.value)}
                                        /> */}
                                        <Form.Select   onChange={(e) => handleChange(id, 'start_year', e.target.value)}>
                                        <option disabled selected>Please select year</option>
                                         {yearsArray?.map((item)=>{
                                            return(
                                                <>
                                                <option>{item}</option>
                                                </>
                                            )
                                        })}
                                         </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>End Year</Form.Label>
                                        {/* <Form.Control
                                            type="date"
                                            className="cv-field"
                                            placeholder="Enter End Year"
                                            value={end_year}
                                            onChange={(e) => handleChange(id, 'end_year', e.target.value)}
                                            max={new Date().toISOString().split("T")[0]}
                                        /> */}
                                         <Form.Select  onChange={(e) => handleChange(id, 'end_year', e.target.value)}>
                                         <option disabled selected>Please select year</option>
                                         {yearsArray?.map((item)=>{
                                            return(
                                                <>
                                                <option>{item}</option>
                                                </>
                                            )
                                        })}
                                         </Form.Select>
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
