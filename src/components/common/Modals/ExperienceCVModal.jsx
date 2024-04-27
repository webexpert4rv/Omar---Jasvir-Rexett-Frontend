import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { addDeveloperCvExperience, deleteExperience, fetchDeveloperCv, updateDeveloperCvExperience } from "../../../redux/slices/developerDataSlice";
import { useTranslation } from "react-i18next";
import { getDeveloperDetails } from "../../../redux/slices/clientDataSlice";

const ExperienceCVModal = ({ show, handleClose, data ,id ,role }) => {
  const [renderModalData, setRenderModalData] = useState(data)
  const [disabledEndDates, setDisabledEndDates] = useState([]);
  const dispatch = useDispatch()
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
  const { t } =  useTranslation()
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "test",
  });
  const {smallLoader } = useSelector(state => state.developerData)

  useEffect(() => {
    if (data) {
      data?.forEach((item, index) => {
        append({
          company_name: item.company_name,
          job_title: item.job_title,
          description: item.description,
          start_date: item.start_date?.slice(0, 10),
          end_date: item.end_date?.slice(0, 10),
          is_still_working: item.is_still_working,
          newId: item.id

        });
        setDisabledEndDates(prevState => [...prevState, item.is_still_working]);
      });
    }
  }, [renderModalData]);

  const handleCurrentlyWorkingChange = (e, index) => {
    if (e.target.checked) {
      const isChecked = watch(`test[${index}].is_still_working`);
      const updatedDisabledEndDates = [...disabledEndDates];
      updatedDisabledEndDates[index] = true;
      setDisabledEndDates(updatedDisabledEndDates);
      setValue(`test[${index}].end_date`, "");
    } else {
      const isChecked = watch(`test[${index}].is_still_working`);
      const updatedDisabledEndDates = [...disabledEndDates];
      updatedDisabledEndDates[index] = false;
      setDisabledEndDates(updatedDisabledEndDates);
    }

  }

  const onSubmit = (value) => {
    let { test } = value
    let addExp = test?.map((item) => {
      if (!item.newId) {
        return { ...item}
      }
    }).filter((item) => item)
    let data ={

    }
    if (addExp.length > 0) {
      let data={
        experiences:addExp,
        user_id:+id
    }
      dispatch(addDeveloperCvExperience(data, () => {
        if(role=="developer"){
        dispatch(fetchDeveloperCv())
        }else{
          dispatch(getDeveloperDetails(id))
        }
        handleClose()
      }))
    }

    test?.forEach((item) => {
      if (item.newId) {
        
        dispatch(updateDeveloperCvExperience(item, item.newId, () => {
          if(role=="developer"){
            dispatch(fetchDeveloperCv())
          }else{
            dispatch(getDeveloperDetails(id))
          }
          handleClose()
        }))
      }
    })

  };

  const handleAppend = async () => {
    // Trigger validation for all fields
    const isValid = await trigger();
    // Check if all fields are valid
    if (isValid) {
      append({
        company_name: "",
        job_title: "",
        description: "",
        start_date: "",
        end_date: "",
        is_still_working: false,
      });
    }
  };

  const deleteDeveloperExperience = (id, index) => {
    remove(index)
    if (id) {
      dispatch(deleteExperience(id, () => {
        dispatch(fetchDeveloperCv())
      }))
    }
  }
  const deletetooltip = (
    <Tooltip id="tooltip">
     {t("deleteRow")}
    </Tooltip>
  );
  const addtooltip = (
    <Tooltip id="tooltip">
      {t("addRow")}
    </Tooltip>
  );


  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="custom-modal"
      size="lg"
      animation
      scrollable
    >
      <Modal.Header closeButton className="border-0 pb-3">
        {/* <Modal.Title>Experience CV Section</Modal.Title> */}
      </Modal.Header>

      <Modal.Body>

        <h3 className="popup-heading">{t("experience")} CV {t("section")}</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((item, index) => (
            <div className="experience-container mb-3" key={item.id}>
              <Row>
                <Col md="12">
                  <Form.Group className="mb-4">
                    <Form.Label className="font-14">{t("companyName")}</Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field"
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
                    <Form.Label className="font-14">{t("jobPosition")}</Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field"
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
                    <Form.Label className="font-14">{t("jobDescription")}</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={3}
                      className="common-field"
                      placeholder="Enter Job Description"
                      {...register(`test[${index}].description`, {
                        required: "Description name is required",
                      })}
                    />
                    {errors?.test?.[index]?.description && (
                      <p className="error-message">{errors.test[index].description.message}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-4">
                    <Form.Label className="font-14">{t("startDate")}</Form.Label>
                    <Form.Control
                      type="date"
                      className="common-field"
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
                    <Form.Label className="font-14">{t("endDate")}</Form.Label>
                    <Form.Control
                      type="date"
                      className="common-field"
                      placeholder="Enter End Date"
                      max={new Date().toISOString().split("T")[0]}
                      {...register(`test[${index}].end_date`, {
                        required: {
                          value: disabledEndDates[index] ? false : true,
                          message: "End Date is required",
                        },
                      })}
                      disabled={disabledEndDates[index]}
                    />
                    {errors?.test?.[index]?.end_date && (
                      <p className="error-message">{errors.test[index].end_date.message}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="12">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Group className="d-flex gap-2 align-items-center">
                      <Form.Check
                        type="checkbox"
                        className="cv-field"
                        {...register(`test[${index}].is_still_working`, {
                          required: false,
                        })}
                        onChange={(e) => handleCurrentlyWorkingChange(e, index)}
                      />
                      <Form.Label className="mb-0 font-14">{t("currentlyWorking")}</Form.Label>
                    </Form.Group>
                    {index !== 0 && (
                      <div>
                        <OverlayTrigger placement="bottom" overlay={deletetooltip}>
                          <Button variant="danger" className="font-14" onClick={() => deleteDeveloperExperience(item.newId, index)}><FaTrashAlt /></Button>
                        </OverlayTrigger>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          ))}
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

export default ExperienceCVModal;
