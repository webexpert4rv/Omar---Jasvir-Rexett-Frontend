import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addDeveloperCvEducation, deleteEducationCv, fetchDeveloperCv, getDegreeList, updateDeveloperCvEducation } from "../../../redux/slices/developerDataSlice";
import RexettButton from "../../../components/atomic/RexettButton";
import { useForm, useFieldArray } from "react-hook-form";
import Select from 'react-select';

const EducationCV = ({ show, handleClose, data }) => {
    const dispatch = useDispatch();
    const [disbaleYear, setDisbaleYear] = useState([]);
    const [renderModalData,setRenderModalData]=useState(data)
    const { degreeList } = useSelector(state => state.developerData)
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

    // Example usage:
    const yearsArray = generateYears();

    useEffect(() => {
        if (data) {
            data.forEach((item) => {
                append({
                    new_id: item.id,
                    university_name: item.university_name,
                    degree_id: item.degree_id,
                    address: item.address,
                    start_year: item.start_year,
                    end_year: item.end_year,
                    currently_attending: item.currently_attending
                });
                setDisbaleYear(prevState => [...prevState, item.currently_attending]);
            });
        }
    }, [renderModalData]);

    console.log(degreeList, "degreeList")
    useEffect(() => {
        dispatch(getDegreeList())
    }, [])

    const handleCurrentlyWorkingChange = (e,index) => {
        if(e.target.checked){
          const isChecked = watch(`educations[${index}].currently_attending`);
          const updatedDisabledEndDates = [...disbaleYear];
          updatedDisabledEndDates[index] = true;
          setDisbaleYear(updatedDisabledEndDates);
          setValue(`educations[${index}].end_year`, null);
        }else{
          const isChecked = watch(`educations[${index}].currently_attending`);
          const updatedDisabledEndDates = [...disbaleYear];
          updatedDisabledEndDates[index] = false;
          setDisbaleYear(updatedDisabledEndDates);
          setValue(`educations[${index}].end_year`, "2024");
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

   
  const deleteDeveloperExperience = (id,index) => {     
    remove(index)
    if(id){
      dispatch(deleteEducationCv(id, () => {
        dispatch(fetchDeveloperCv())
    }))
    }
}
  


    const onSubmit = (value) => {
        let {educations}=value
        let addEdu = educations?.map((item) => {
            if (!item.new_id) {
                return { ...item }
            }
        }).filter((item) => item)
        console.log(addEdu,"addedu")
        if (addEdu.length > 0) {
            dispatch(addDeveloperCvEducation(addEdu,()=>{
                dispatch(fetchDeveloperCv())
                handleClose()
            }))
        } 
    
        educations?.forEach((item) => {
            if (item.new_id) {
                dispatch(updateDeveloperCvEducation(item, item.new_id, () => {
                    dispatch(fetchDeveloperCv())
                handleClose()
                    }))
    
                }
            })
        
      };
    console.log(errors, "errors")
    return (
        <Modal show={show} onHide={handleClose} centered scrollable animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Education</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((item, index) => (
                        <div className="experience-container mb-3" key={item.id}>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        <Form.Label>University Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="cv-field"
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
                                        <Form.Label>Degree Name</Form.Label>
                                        <Select
                                            options={degreeList}
                                            onChange={(val) => setValue(`educations.${index}.degree_id`, val ? val.value : '')}
                                            defaultValue={degreeList.find(option => option.value === item.degree_id)}
                                          
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
                                        <Form.Label>Start Year</Form.Label>
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
                                <Col md="6">
                                    <Form.Group className="mb-4">
                                        <Form.Label>End Year</Form.Label>
                                        <Form.Select
                                            {...register(`educations.${index}.end_year`, {
                                                required: {
                                                    value: disbaleYear[index]?false:true,
                                                    message: "End Date is required",
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
                                </Col>
                                <Col md="12">
                                    <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                        <Form.Check
                                            type="checkbox"
                                            className="cv-field"
                                            id={`currently_attending_${index}`}
                                            {...register(`educations.${index}.currently_attending`)}
                                            defaultChecked={item.currently_attending}
                                            onChange={(e) => handleCurrentlyWorkingChange(e,index)}
                                        />
                                        <Form.Label htmlFor={`currently_attending_${index}`} className="mb-0">Currently Attending</Form.Label>
                                    </Form.Group>
                                </Col>
                                {index !== 0 && (
                    <Col md="12" className="d-flex justify-content-end">
                        <Button variant="danger" onClick={() =>deleteDeveloperExperience(item.new_id,index) }>Delete</Button>
                    </Col>
                )}
                            </Row>
                        </div>
                    ))}
                    <div className="text-end mb-3">
                        <Button className="main-btn
                        py-2 px-3" onClick={handleAddMore}>Add More</Button>
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
