import React, { Fragment, useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import RexettButton from "../../atomic/RexettButton";
import {
  addProjects,
  fetchDeveloperCv,
} from "../../../redux/slices/developerDataSlice";
import { getDeveloperDetails } from "../../../redux/slices/clientDataSlice";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const ProjectsModal = ({ show, handleClose, data, id, role }) => {
  const [renderModalData, setRenderModalData] = useState(data);
  console.log(data, "data");
  console.log(id, "id--------------");
  const { skillList } = useSelector((state) => state.clientData);
  const { smallLoader } = useSelector((state) => state.developerData);
  const [selectedOption, setSelectedOption] = useState([]);
  const [disabledEndDates, setDisabledEndDates] = useState([]);
  const dispatch = useDispatch();
  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });
  const [skillCate, setSkillsCate] = useState(skillListMapped);

  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    trigger,
    setError,
    formState: { errors },
  } = useForm();

  const { fields, append, remove, replace } = useFieldArray({
    control,
  });

  useEffect(() => {
    setValue("project_title", data?.project_title);
    setValue("project_description",  data?.project_description);
  }, []);
  const onSubmit = (values) => {
    console.log(values, "values-----");
    let payload = {
      ...values,
      user_id: +id,
    };
    console.log(payload, "payload");
    dispatch(
      addProjects(payload, () => {
        if (role == "developer") {
          dispatch(fetchDeveloperCv());
        } else {
          dispatch(getDeveloperDetails(id));
        }
        handleClose();
      })
    );
  };

  const handleAppend = async () => {
    const isValid = await trigger();
    if (isValid) {
      append({
        project_title: "",
        project_description: "",
        tech_stacks_used: "",
        role_in_project: "",
        project_link: "",
        project_start_date: "",
        project_end_date: "",
      });
    }
  };

  // const deleteDeveloperProject = ( devId,index) => {
  //   console.log(id,"experienceid")
  //   console.log(devId,"deviddddd-----------")
  //   remove(index)
  //   if (id) {
  //     dispatch(deleteExperience(id,devId, () => {
  //         if (role == "developer") {
  //             dispatch(fetchDeveloperCv())
  //         } else {
  //             dispatch(getDeveloperDetails(devId))
  //         }
  //         handleClose()

  //     }))
  //   }
  // }

  const onChangeSelect = (val) => {
    setTimeout(() => {
      const newOption = createOption(val);
      setSelectedOption((prev) => [...prev, newOption]);
      setSkillsCate((prev) => [...prev, newOption]);
    }, 1000);
  };
  const deletetooltip = <Tooltip id="tooltip">{t("deleteRow")}</Tooltip>;
  const addtooltip = <Tooltip id="tooltip">{t("addRow")}</Tooltip>;

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
        <div>
          <h3 className="popup-heading">
            {t("projects")} {t("section")}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
            <Form.Group className="mb-4">
              <Form.Label className="font-14">{t("projectTitle")}</Form.Label>
              <Form.Control
                name="name"
                className="common-field"
                placeholder="Enter your name"
                {...register("project_title", {
                  required: {
                    value: true,
                    message: "Please Enter Name",
                  },
                })}
              ></Form.Control>
              <p className="error-message">{errors.project_title?.message}</p>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="font-14">
                {t("projectDescription")}
              </Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                className="common-field"
                placeholder="Enter Project Description"
                {...register(`project_description`, {
                  required: "Project Description is required",
                })}
              />
              {errors?.project_description && (
                <p className="error-message">
                  {errors.project_description.message}
                </p>
              )}
            </Form.Group>
            <Form.Label className="font-14">{t("techStackUsed")}</Form.Label>
            <div className="experience-container">
              <Form.Group className="mb-4">
                <Row>
                  <Col md="12">
                    <CreatableSelect
                      isMulti
                      isClearable
                      name={selectedOption}
                      onChange={(newValue) => {
                        setSelectedOption(newValue);
                      }}
                      onCreateOption={onChangeSelect}
                      options={skillCate}
                      value={selectedOption}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="font-14">
                  {t("roleInProject")}
                </Form.Label>
                <Form.Control
                  name="name"
                  className="common-field"
                  placeholder="Enter your name"
                  {...register("role_in_project", {
                    required: {
                      value: true,
                      message: "Please Enter Name",
                    },
                  })}
                ></Form.Control>
                <p className="error-message">
                  {errors.role_in_project?.message}
                </p>
              </Form.Group>
              <Form.Label className="font-14">{t("projectLink")}</Form.Label>
              <Form.Group>
                <Form.Control
                  name="name"
                  className="common-field"
                  placeholder="Enter Project Link"
                  {...register("project_link", {
                    required: {
                      value: true,
                      message: "Please Enter Projecy Link",
                    },
                  })}
                ></Form.Control>
                <p className="error-message">{errors.project_link?.message}</p>
              </Form.Group>
              <Row>
                <Col md="6">
                  <Form.Group className="mb-4">
                    <Form.Label className="font-14">
                      {t("startDate")}
                    </Form.Label>
                    <Form.Control
                      type="date"
                      className="common-field"
                      placeholder="Enter Start Date"
                      max={new Date().toISOString().split("T")[0]}
                      {...register(`project_start_date`, {
                        required: "Start Date is required",
                        validate: {
                          dateRange: (value) => {
                            const endDate = watch(`project_start_date`); // Get the value of the end date field
                            if (!endDate || value <= endDate) {
                              return true;
                            }
                            return "Start Date must be before End Date";
                          },
                        },
                      })}
                    />
                    {errors?.project_start_date && (
                      <p className="error-message">
                        {errors.project_start_date.message}
                      </p>
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
                      {...register(`project_end_date`, {
                        required: {
                          // value: disabledEndDates[index] ? false : true,
                          message: "End Date is required",
                        },
                      })}
                      // disabled={disabledEndDates[index]}
                    />
                    {errors?.project_end_date && (
                      <p className="error-message">
                        {errors.project_end_date.message}
                      </p>
                    )}
                  </Form.Group>
                  {/* {index !== 0 && (
                      <div>
                        <OverlayTrigger placement="bottom" overlay={deletetooltip}>
                          <Button variant="danger" className="font-14" onClick={() => deleteDeveloperProject(item.newId , index)
                          }><FaTrashAlt /></Button>
                        </OverlayTrigger>
                      </div>
                    )} */}
                </Col>
              </Row>
            </div>
            </Fragment>))}
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
        </div>
        
      </Modal.Body>
    </Modal>
  );
};

export default ProjectsModal;
