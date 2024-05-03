import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchDeveloperCv,
    updateDeveloperSkills,
} from "../../../redux/slices/developerDataSlice";
import { useTranslation } from "react-i18next";
import { getDeveloperDetails, getSkillList } from "../../../redux/slices/clientDataSlice";
import CreatableSelect from "react-select/creatable";
import { useFieldArray, useForm } from "react-hook-form";



const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
});

const ExpertiseModal = ({ show, handleClose, data, id, role }) => {
    const [selectedOption, setSelectedOption] = useState([]);
    const { smallLoader } = useSelector((state) => state.developerData);
    const [options, setOptions] = useState([]);

    const [skillCate, setSkillsCate] = useState()
    const { skillList } = useSelector(
        (state) => state.clientData
    );

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {
        register,
        control,
        setValue,
        watch,
        reset,
        trigger,
        setError,
        formState: { errors },
    } = useForm();

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "test",
    });
    const skillListMapped = skillList.map((item) => {
        return { value: item.id, label: item.title };
    });

    useEffect(() => {
        if (data) {
            const array = data
                .split(",")
                .map((tech) => ({ label: tech.trim(), value: tech.trim() }));
            setSelectedOption(array);
        }
    }, [data]);
    useEffect(() => {
        dispatch(getSkillList());
    }, [dispatch]);
    useEffect(() => {
        setSkillsCate(skillListMapped)
    }, [skillList]);




    const handleSubmit = (e) => {
        e.preventDefault();
        let convertString = selectedOption.map((item) => item.label);
        if (role === "developer") {
            let data = {
                skills: convertString.toString(),
                user_id: +id,
            };
            dispatch(
                updateDeveloperSkills(data, () => {
                    dispatch(fetchDeveloperCv());
                    handleClose();
                })
            );
        } else {
            let data = {
                skills: convertString.toString(),
                user_id: +id,
            };
            dispatch(
                updateDeveloperSkills(data, () => {
                    dispatch(getDeveloperDetails(id));
                    handleClose();
                })
            );
        }
    };
    const handleExperience = () => {

    }

    const handleAppend = async () => {
        // Trigger validation for all fields
        const isValid = await trigger();
        // Check if all fields are valid
        if (isValid) {
            append({
                skills: "",
                experience: ""
            });
        }
    };
    const addtooltip = (
        <Tooltip id="tooltip">
            {t("addRow")}
        </Tooltip>
    );

    // const filteredOptions = options.filter(
    //     (option) =>
    //         !selectedOption.find((selected) => selected.value === option.value)
    // );

    const onChangeSelect = (val) => {
        setTimeout(() => {
            const newOption = createOption(val);
            setSkillsCate((prev) => [...prev, newOption]);

        }, 1000);
    };


    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="custom-modal"
            animation
        >
            <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>
            <Modal.Body>
                <h3 className="popup-heading">{t("expertise")}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="experience-container">

                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Form.Label className="common-label">{t("Enter Skills")}</Form.Label>
                                    <CreatableSelect
                                        isMulti
                                        isClearable
                                        name={selectedOption}
                                        onChange={(newValue) => {
                                            setSelectedOption(newValue)
                                        }}
                                        onCreateOption={onChangeSelect}
                                        options={skillCate}
                                        value={selectedOption}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className="flex-none">
                        <Form.Label className="common-label">{t("experience")}</Form.Label>
                        <Form.Select className="filter-select shadow-none" onChange={(e) => handleExperience(e)}>
                            <option value="" > {t("selectExperience")} </option>
                            <option value="1 years" onClick={(e) => e.stopPropagation()}>1 {t("years")}</option>
                            <option value="2 years" onClick={(e) => e.stopPropagation()}>2 {t("years")}</option>
                            <option value="3 years" onClick={(e) => e.stopPropagation()}>3 {t("years")}</option>
                            <option value="5 years" onClick={(e) => e.stopPropagation()}>5 {t("years")}</option>
                            <option value="above 5" onClick={(e) => e.stopPropagation()}>above 5  {t("years")}</option>
                        </Form.Select>
                    </div>
                    {/* <p className="error-message">
                            {errors.professional_title?.message}
                        </p> */}

                    <div className="text-end mb-3">
                        <OverlayTrigger placement="bottom" overlay={addtooltip}>
                            <Button className="main-btn py-2 px-3" onClick={handleAppend}>
                                +
                            </Button>
                        </OverlayTrigger>
                    </div>
                    <div className="text-center">
                        <RexettButton
                            type="submit"
                            text="Submit"
                            className="main-btn px-4 font-14 fw-semibold"
                            variant="transparent"
                            disabled={smallLoader}
                            isLoading={smallLoader}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ExpertiseModal;
