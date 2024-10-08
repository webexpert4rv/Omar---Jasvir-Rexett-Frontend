import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { getSkillList } from "../../../redux/slices/clientDataSlice";

const ClientAddOtherSkill = ({ show, handleClose, onAddSkills }) => {
    const dispatch = useDispatch();
    const skillList = useSelector((state) => state.clientData.skillList);

    const [selectedOption, setSelectedOption] = useState([]);
    const [skillCate, setSkillsCate] = useState([]);

    useEffect(() => {
        dispatch(getSkillList()).catch(err => console.error("Failed to fetch skills:", err));
    }, [dispatch]);

    useEffect(() => {
        const skillListMapped = skillList.map((item) => ({
            value: item.id,
            label: item.title,
        }));
        setSkillsCate(skillListMapped);
    }, [skillList]);

    const handleSkillChange = (newValue) => {
        setSelectedOption(newValue);
    };

    const handleCreateSkill = (newSkill) => {
        const newSkillOption = { value: newSkill, label: newSkill };
        setSkillsCate(prevSkills => {
            if (!prevSkills.some(skill => skill.label === newSkill)) {
                return [...prevSkills, newSkillOption];
            }
            return prevSkills;
        });
        setSelectedOption(prevSelected => [...prevSelected, newSkillOption]);
    };
    

    const handleAddSkills = () => {
        if (onAddSkills) {
            onAddSkills(selectedOption);
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>
            <Modal.Body>
                <h3 className="popup-heading">Add Skill</h3>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14 fw-medium">Skill Name</Form.Label>
                        <CreatableSelect
                            className="common-field font-14"
                            isMulti
                            isClearable
                            name="skills"
                            onChange={handleSkillChange}
                            onCreateOption={handleCreateSkill}
                            options={skillCate}
                            value={selectedOption}
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn font-14" onClick={handleAddSkills}>
                            Add Skill
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ClientAddOtherSkill;