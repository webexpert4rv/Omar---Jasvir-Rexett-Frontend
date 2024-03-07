import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch } from "react-redux";
import { addDeveloperCvExperience, deleteExperience, fetchDeveloperCv, updateDeveloperCvExperience } from "../../../redux/slices/developerDataSlice";

const ExperienceCVModal = ({ show, handleClose, data }) => {
    const dispatch=useDispatch()
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    trigger,
    setError,
    formState: { errors },
  } = useForm();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "test",
  });

  useEffect(() => {
    if (data) {
      data?.forEach((item, index) => {
        append({
          company_name: item.company_name,
          job_title: item.job_title,
          description: item.description,
          start_date:item.start_date?.slice(0, 10),
          end_date: item.end_date?.slice(0, 10),
          is_still_working: item.is_still_working,
          newId:item.id

        });
      });
    }
  }, [data]);



  const onSubmit = (value) => {
    let {test}=value
    let addExp = test?.map((item) => {
        if (!item.newId) {
            return { ...item }
        }
    }).filter((item) => item)
    console.log(addExp,"addexp")
    if (addExp.length > 0) {
        dispatch(addDeveloperCvExperience(addExp,()=>{
            dispatch(fetchDeveloperCv())
            handleClose()
        }))
    } 

    test?.forEach((item) => {
        if (item.newId) {
            dispatch(updateDeveloperCvExperience(item, item.newId, () => {
                dispatch(fetchDeveloperCv())
            handleClose()
                }))

            }
        })
    
  };

  const handleAppend = () => {
    append({
      company_name: "",
      job_title: "",
      description: "",
      start_date: "",
      end_date: "",
      is_still_working: false,
    });
  };

  const deleteDeveloperExperience = (id,index) => {     
    remove(index)
    if(id){
      dispatch(deleteExperience(id, () => {
        const updatedExperienceFields = data?.filter(field => field.id !== id);
        dispatch(fetchDeveloperCv())
    }))
    }
}

  console.log(fields, "fields");

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      animation
      size="lg"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Experience CV Section</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((item, index) => (
            <div className="experience-container mb-3" key={item.id}>
              <Row>
                <Col md="12">
                  <Form.Group className="mb-4">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="cv-field"
                      name="company_name"
                      placeholder="Enter Company Name"
                      {...register(`test[${index}].company_name`, {
                        required: "Company name is required",
                      })}
                    />
                    {errors?.test?.[index]?.company_name && (
                      <p className="error-message">{errors.test[index].company_name.message}</p>
                    )}
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
                      {...register(`test[${index}].job_title`, {
                        required: "Job Position is required",
                      })}
                    />
                    {errors?.test?.[index]?.job_title && (
                      <p className="error-message">{errors.test[index].job_title.message}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-4">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={3}
                      className="cv-field"
                      placeholder="Enter Job Description"
                      {...register(`test[${index}].description`, {
                        required: "Description name is required",
                      })}
                    />
                    {errors?.test?.[index]?.company_name && (
                      <p className="error-message">{errors.test[index].company_name.message}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-4">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      className="cv-field"
                      placeholder="Enter Start Date"
                      max={new Date().toISOString().split("T")[0]}
                      {...register(`test[${index}].start_date`, {
                        required: "Start Date is required",
                        validate: {
                          dateRange: (value) => {
                            const endDate = watch(`test[${index}].end_date`); // Get the value of the end date field
                            if (!endDate || value <= endDate) {
                              return true;
                            }
                            return "Start Date must be before End Date";
                          },
                        },
                      })}
                    />
                    {errors?.test?.[index]?.start_date && (
                      <p className="error-message">{errors.test[index].start_date.message}</p>
                    )}
                  </Form.Group>
                </Col>
               <Col md="6">
                  <Form.Group className="mb-4">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      className="cv-field"
                      placeholder="Enter End Date"
                      max={new Date().toISOString().split("T")[0]}
                      {...register(`test[${index}].end_date`, {
                        required: "End Date is required",
                      })}
                    />
                    {errors?.test?.[index]?.end_date && (
                      <p className="error-message">{errors.test[index].end_date.message}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                    <Form.Check
                      type="checkbox"
                      className="cv-field"
                      {...register(`test[${index}].is_still_working`, {
                        required: false,
                      })}
                    />
                    <Form.Label className="mb-0">Currently Working</Form.Label>
                  </Form.Group>
                </Col>
                {index !== 0 && (
                    <Col md="12" className="d-flex justify-content-end">
                        <Button variant="danger" onClick={() =>deleteDeveloperExperience(item.newId,index) }>Delete</Button>
                    </Col>
                )}
              </Row>
            </div>
          ))}
          <div className="text-end mb-3">
            <Button className="main-btn py-2 px-3" type="submit" onClick={handleAppend}>
              Add More
            </Button>
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

export default ExperienceCVModal;
