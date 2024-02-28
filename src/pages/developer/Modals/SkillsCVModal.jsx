import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from 'react-select';
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { updateDeveloperSkills } from "../../../redux/slices/developerDataSlice";
const options = [
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'jQuery', label: 'jQuery' },
    { value: 'ReactJS', label: 'ReactJS' },
    { value: 'VueJS', label: 'VueJS' },
    { value: 'AngularJS', label: 'AngularJS' },
    { value: 'Bootstrap', label: 'Bootstrap' },
  ];
const SkillsModal = ({ show, handleClose,data }) => {
    const [selectedOption, setSelectedOption] = useState([]);
    const {smallLoader}=useSelector(state=>state.developerData)
    const dispatch=useDispatch()
   useEffect(() => {
        if (data) {
            const array = data.split(",").map(tech => ({ label: tech.trim(), value: tech.trim() }));
            setSelectedOption(array);
        }
    }, [data]);

    const handleChange=(e)=>{
        setSelectedOption(e)
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
       let convertString= selectedOption.map((item)=>item.label)
        dispatch(updateDeveloperSkills(convertString.toString(),()=>{

        }))
    }

    const filteredOptions = options.filter(option => !selectedOption.find(selected => selected.value === option.value));

    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Skills</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Form.Label>Skills</Form.Label>
                                    <Select
                                        value={selectedOption}
                                        onChange={handleChange}
                                        options={filteredOptions}
                                        isMulti
                                        
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center">
                        <RexettButton 
                                        type="submit" 
                                        text="Submit"
                                        className="main-btn px-4"
                                        variant="transparent"
                                        isLoading={smallLoader}
                                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default SkillsModal;