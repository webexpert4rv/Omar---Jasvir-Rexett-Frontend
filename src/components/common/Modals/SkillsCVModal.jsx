import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from 'react-select';
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeveloperCv, updateDeveloperSkills } from "../../../redux/slices/developerDataSlice";
import { useTranslation } from "react-i18next";
import { getDeveloperDetails } from "../../../redux/slices/clientDataSlice";
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
const SkillsModal = ({ show, handleClose, data ,id}) => {
    const [selectedOption, setSelectedOption] = useState([]);
    const { smallLoader } = useSelector(state => state.developerData)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    useEffect(() => {
        if (data) {
            const array = data.split(",").map(tech => ({ label: tech.trim(), value: tech.trim() }));
            setSelectedOption(array);
        }
    }, [data]);

    const handleChange = (e) => {
        setSelectedOption(e)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let convertString = selectedOption.map((item) => item.label)
        let data= {
             "skills" : convertString.toString(),
             "user_id" : +id
        }
        console.log(data,"data")
        dispatch(updateDeveloperSkills(data, () => {
            dispatch(getDeveloperDetails(id))
            handleClose()

        }))
    }

    const filteredOptions = options.filter(option => !selectedOption.find(selected => selected.value === option.value));

    return (
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>
            <Modal.Body>
                <h3 className="popup-heading">{t("skills")}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
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
                            text={t("submit")}
                            className="main-btn px-4 font-14 fw-semibold"
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