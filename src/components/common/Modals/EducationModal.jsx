import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addDegree, addDeveloperCvEducation, deleteEducationCv, fetchDeveloperCv, getDegreeList, updateDeveloperCvEducation } from "../../../redux/slices/developerDataSlice";
import RexettButton from "../../../components/atomic/RexettButton";
import { useForm, useFieldArray } from "react-hook-form";
import Select from 'react-select';
import { FaTrashAlt } from "react-icons/fa";
import { getDeveloperDetails } from "../../../redux/slices/clientDataSlice";
import CreatableSelect from "react-select/creatable";

<<<<<<< HEAD:src/pages/developer/Modals/EducationModal.jsx
const EducationCV = ({ show, handleClose, data, smallLoader }) => {
    const dispatch = useDispatch();
    const [disbaleYear, setDisbaleYear] = useState([]);
    const [renderModalData, setRenderModalData] = useState(data)
    const { degreeList } = useSelector(state => state.developerData)
=======
const EducationCV = ({ show, handleClose, data, id, role }) => {
    const dispatch = useDispatch();
    const [disbaleYear, setDisbaleYear] = useState([]);
    const [renderModalData, setRenderModalData] = useState(data)
    const { degreeList,smallLoader } = useSelector(state => state.developerData)
>>>>>>> 0eaab4e61f74dde94ccea768db9464b94852b453:src/components/common/Modals/EducationModal.jsx
    const { register, control, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "educations" });

    function generateYears() {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = 1995; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    }
    console.log(data,"data")
    console.log(degreeList,"degreeeelist")

    // Example usage:
    const yearsArray = generateYears();

    useEffect(() => {
        if (data) { 
            data.forEach((item , index) => {
                append({
                    new_id: item.id,
                    university_name: item.university_name,
                    degree_id: item.degree_id,
                    address: item.address,
                    start_year: item.start_year,
                    end_year: item.end_year,
                    currently_attending: item.currently_attending,
                    developerId:item?.developer_id
                });
                setDisbaleYear(prevState => [...prevState, item.currently_attending]);
            });
        }
    }, [renderModalData]);

    useEffect(() => {
        dispatch(getDegreeList())
        
    }, [])

    const handleCurrentlyWorkingChange = (e, index) => {
        if (e.target.checked) {
            const end_year = watch(`educations[${index}].end_year`);
            const updatedDisabledEndDates = [...disbaleYear];
            updatedDisabledEndDates[index] = true;
            setDisbaleYear(updatedDisabledEndDates);
            setValue(`educations[${index}].end_year`, null);
        } else {
            const end_year = watch(`educations[${index}].end_year`);
            const updatedDisabledEndDates = [...disbaleYear];
            updatedDisabledEndDates[index] = false;
            setDisbaleYear(updatedDisabledEndDates);
            setValue(`educations[${index}].end_year`, end_year);
        }

    }

    const handleAddMore = async () => {
        const isValid = await trigger();
        if (isValid) {
            append({
                university_name: '',
                degree_id: '',
                address: '',
                start_year: '',
                end_year: '',
                currently_attending: false
            });
        }
    };


<<<<<<< HEAD:src/pages/developer/Modals/EducationModal.jsx
    const deleteDeveloperExperience = (id, index) => {
        remove(index)
        if (id) {
            dispatch(deleteEducationCv(id, () => {
                dispatch(fetchDeveloperCv())
=======
    const deleteDeveloperEducation = (id,devId, index) => {
        console.log(id,"id------")
        remove(index)
        if (id) {
            dispatch(deleteEducationCv(id,devId, () => {
                if (role == "developer") {
                    dispatch(fetchDeveloperCv())
                } else {
                    dispatch(getDeveloperDetails(devId))
                }
                handleClose()

>>>>>>> 0eaab4e61f74dde94ccea768db9464b94852b453:src/components/common/Modals/EducationModal.jsx
            }))
        }
    }



    const onSubmit = (value) => {
        let { educations } = value
        let addEdu = educations?.map((item) => {
            if (!item.new_id) {
                return { ...item }
            }
        }).filter((item) => item)
<<<<<<< HEAD:src/pages/developer/Modals/EducationModal.jsx
        if (addEdu.length > 0) {
            dispatch(addDeveloperCvEducation(addEdu, () => {
                dispatch(fetchDeveloperCv())
=======
        if (addEdu.length > 0){
            let data={
                educations:addEdu,
                user_id:+id
            }
            dispatch(addDeveloperCvEducation(data, () => {
                if (role == "developer") {
                    dispatch(fetchDeveloperCv())
                } else {
                    dispatch(getDeveloperDetails(id))
                }
>>>>>>> 0eaab4e61f74dde94ccea768db9464b94852b453:src/components/common/Modals/EducationModal.jsx
                handleClose()
            }))
        }

<<<<<<< HEAD:src/pages/developer/Modals/EducationModal.jsx
        educations?.forEach((item) => {
            if (item.new_id) {
                dispatch(updateDeveloperCvEducation(item, item.new_id, () => {
                    dispatch(fetchDeveloperCv())
                    handleClose()
                }))

            }
        })

    };
=======

    educations?.forEach((item) => {
        if (item.new_id) {
            dispatch(updateDeveloperCvEducation(item, item.new_id, () => {
                if (role == "developer") {
                    dispatch(fetchDeveloperCv())
                } else {
                    dispatch(getDeveloperDetails(id))
                }
                handleClose()
            }))
        }
    })
}
   const handleCreate = (inputValue) => {
    const payload = {
        title : inputValue
    }
    dispatch(addDegree(payload, () => {
        dispatch(getDegreeList());
      }))
   } 

    const deletetooltip = (
        <Tooltip id="tooltip">
            Delete Row
        </Tooltip>
    );
    const addtooltip = (
        <Tooltip id="tooltip">
            Add Row
        </Tooltip>
    );
    console.log(fields,"----educationfirld")
   const next= degreeList.find(option => option.value === fields.degree_id)
   console.log(next,"next")
>>>>>>> 0eaab4e61f74dde94ccea768db9464b94852b453:src/components/common/Modals/EducationModal.jsx
    return (
        <Modal show={show} onHide={handleClose} centered scrollable className="custom-modal" animation size="lg">
            <Modal.Header closeButton className="border-0 pb-3">
                {/* <Modal.Title>Education</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Education</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((item, index) => (
                        <div className="experience-container mb-3" key={item.id}>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        <Form.Label className="font-14">University Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="common-field"
                                            placeholder="Enter University Name"
                                            {...register(`educations.${index}.university_name`, { required: true })}
                                            defaultValue={item.university_name}
                                        />
                                        {errors && errors.educations && errors.educations[index] && errors.educations[index].university_name && (
                                            <p className="error-message">University name is required</p>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label className="font-14">Degree Name</Form.Label>
                                        <CreatableSelect
                                        isClearable
                                        onChange={(val) => setValue(`educations.${index}.degree_id`, val ? val.value : '')}
                                        value={degreeList.find(option => option.value === item.degree_id)}
                                        onCreateOption={handleCreate}
                                        options={degreeList}
                                        />
                                            {/* <Select
                                            options={degreeList}
                                            onCreateOption={handleCreate}
                                            onChange={(val) => setValue(`educations.${index}.degree_id`, val ? val.value : '')}
                                            defaultValue={degreeList.find(option => option.value === item.degree_id)}

<<<<<<< HEAD:src/pages/developer/Modals/EducationModal.jsx
                                        />
=======
                                        /> */}
>>>>>>> 0eaab4e61f74dde94ccea768db9464b94852b453:src/components/common/Modals/EducationModal.jsx

                                    </Form.Group>

                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label className="font-14">Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="common-field"
                                            placeholder="Enter Address"
                                            {...register(`educations.${index}.address`, { required: true })}
                                            defaultValue={item.address}
                                        />
                                        {errors && errors.educations && errors.educations[index] && errors.educations[index].address && (
                                            <p className="error-message">Address is required</p>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label className="font-14">Start Year</Form.Label>
                                        <Form.Select
                                            {...register(`educations.${index}.start_year`, {
                                                required: 'Start Year is required',
                                                validate: {
                                                    lessThanEndYear: value => {
                                                        const endYear = watch(`educations.${index}.end_year`);
                                                        if (!endYear || parseInt(value) < parseInt(endYear)) {
                                                            return true;
                                                        }
                                                        return 'Start Year must be less than End Year';
                                                    }
                                                }
                                            })}
                                        >
                                            <option disabled selected>Please select year</option>
                                            {yearsArray?.map((item) => (
                                                <option key={item} value={item}>{item}</option>
                                            ))}
                                        </Form.Select>
                                        {errors && errors.educations && errors.educations[index] && errors.educations[index].start_year && (
                                            <p className="error-message">{errors.educations[index].start_year.message}</p>
                                        )}

                                    </Form.Group>
                                </Col>
                                {!disbaleYear[index] ? <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label className="font-14">End Year</Form.Label>
                                        <Form.Select
                                            {...register(`educations.${index}.end_year`, {
                                                required: {
                                                    value: disbaleYear[index] ? false : true,
<<<<<<< HEAD:src/pages/developer/Modals/EducationModal.jsx
                                                    message: "End Date is required",
=======
                                                    message: "End year is required",
>>>>>>> 0eaab4e61f74dde94ccea768db9464b94852b453:src/components/common/Modals/EducationModal.jsx
                                                },

                                            })}
                                            disabled={disbaleYear[index]}
                                        >
                                            <option disabled selected>Please select year</option>
                                            {yearsArray?.map((item) => (
                                                <option key={item} value={item}>{item}</option>
                                            ))}
                                        </Form.Select>
                                        {errors && errors.educations && errors.educations[index] && errors.educations[index].end_year && (
                                            <p className="error-message">{errors.educations[index].end_year.message}</p>
                                        )}

                                    </Form.Group>
                                </Col> : ""}
                                <Col md="12">
<<<<<<< HEAD:src/pages/developer/Modals/EducationModal.jsx
                                    <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                        <Form.Check
                                            type="checkbox"
                                            className="cv-field"
                                            id={`currently_attending_${index}`}
                                            {...register(`educations.${index}.currently_attending`)}
                                            defaultChecked={item.currently_attending}
                                            onChange={(e) => handleCurrentlyWorkingChange(e, index)}
                                        />
                                        <Form.Label htmlFor={`currently_attending_${index}`} className="mb-0">Currently Attending</Form.Label>
                                    </Form.Group>
                                </Col>
                                {index !== 0 && (
                                    <Col md="12" className="d-flex justify-content-end">
                                        <Button variant="danger" onClick={() => deleteDeveloperExperience(item.new_id, index)}>Delete</Button>
                                    </Col>
                                )}
=======
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <Form.Group className="d-flex gap-2 align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                className="cv-field"
                                                id={`currently_attending_${index}`}
                                                {...register(`educations.${index}.currently_attending`)}
                                                defaultChecked={item.currently_attending}
                                                onChange={(e) => handleCurrentlyWorkingChange(e, index)}
                                            />
                                            <Form.Label htmlFor={`currently_attending_${index}`} className="mb-0 font-14">Currently Attending</Form.Label>
                                        </Form.Group>

                                        {index !== 0 && (
                                            <div>
                                                <OverlayTrigger placement="bottom" overlay={deletetooltip}>
                                                    <Button variant="danger" onClick={() => deleteDeveloperEducation(item.new_id,item?.developerId, index)}><FaTrashAlt /></Button>
                                                </OverlayTrigger>
                                            </div>
                                        )}
                                    </div>
                                </Col>
>>>>>>> 0eaab4e61f74dde94ccea768db9464b94852b453:src/components/common/Modals/EducationModal.jsx
                            </Row>
                        </div>
                    ))}
                    <div className="text-end mb-3">
                        <OverlayTrigger placement="bottom" overlay={addtooltip}>
                            <Button className="main-btn
                        py-2 px-3" onClick={handleAddMore}>+</Button>
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

export default EducationCV;
