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
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import RexettButton from "../../atomic/RexettButton";
import {
  addProjects,
  deleteProjects,
  fetchDeveloperCv,
  updateProjects,
} from "../../../redux/slices/developerDataSlice";
import { getDeveloperDetails } from "../../../redux/slices/clientDataSlice";
import moment from "moment";
const TEAM_SIZE_OPTIONS = ["1-5", "5-10", "10-15", "15-20"];

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const ProjectsModal = ({ show, handleClose, data, id, role }) => {
  const [renderModalData, setRenderModalData] = useState(data);
  console.log(data, "Editdata");
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
  } = useForm({
    defaultValues: {
      projects: [
        {
          project_title: "",
          project_description: "",
          tech_stacks_used: "",
          project_start_date: "",
          project_end_date: "",
          project_team_size: "",
          project_link: "",
          role_in_project: "",
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "projects",
  });
  useEffect(() => {
    if (data.length) {
      setValue("projects", data);
      data.map((curElem, index) => {
        for (let key in curElem) {
          if (key === "tech_stacks_used") {
            const techStackArray = curElem[key].split(",");
            const techStackArrayForSelect = skillCate.map((curElem) => {
              if (techStackArray.includes(curElem.label)) {
                return curElem;
              }
            });
            setValue(`projects?.${index}?.${key}`,techStackArrayForSelect);
          }
          if (key === "project_start_date" || key === "project_end_date") {
            const formattedDate = moment(curElem[key]).format("MM/DD/YYYY'");
            setValue(`projects?.${index}?.project_start_date`, formattedDate);
          } else {
            setValue(`projects?.${index}?.${key}`, curElem[key]);
          }
        }
      });
    }

    // else {
    //   setValue("projects", [
    //     {
    //       project_title: "",
    //       project_description: "",
    //       tech_stacks_used: "",
    //       project_start_date: "",
    //       project_end_date: "",
    //       // project_link: "",
    //       role_in_project: "",
    //     },
    //   ]);
    // }
  }, [renderModalData]);
  useEffect(() => {
    // setSkillOptions(skillListMapped);
    let formattedData = [];
    formattedData = data?.map((curElem) => {
      const skill = {
        label: curElem.skill,
        value: curElem.skill,
        id: curElem.id,
      };
      return {
        ...curElem,
        skill: skill,
      };
    });
    setValue("skills", formattedData);
  }, [dispatch]);

  const onSubmit = (values) => {
    let { projects } = values;
    let addExp = projects
      ?.map((item) => {
        if (!item.newId) {
          return { ...item };
        }
      })
      .filter((item) => item);
    const formattedProjects = projects.map((curElem, index) => {
      const tempTechStack = curElem.tech_stacks_used.map(
        (curElem) => curElem.label
      );
      const convertedTechStack = tempTechStack.toString();
      return {
        ...curElem,
        tech_stacks_used: convertedTechStack,
        project_team_size: 5,
      };
    });

    let payload = {
      projects: [...formattedProjects],
      user_id: +id,
    };
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

    projects?.forEach((item) => {
      if (item.id) {
        dispatch(
          updateProjects(item.id, () => {
            if (role == "developer") {
              dispatch(fetchDeveloperCv());
            } else {
              dispatch(getDeveloperDetails(id));
            }
            handleClose();
          })
        );
      }
    });
  };

  const handleAppend = async () => {
    const index = watch("projects").findIndex(
      (curElem) =>
        curElem.project_description === "" ||
        curElem.project_title === "" ||
        curElem.tech_stacks_used === "" ||
        curElem.role_in_project === "" ||
        curElem.project_link === "" ||
        curElem.project_start_date === "" ||
        curElem.project_end_date === "" ||
        curElem.project_team_size === ""
    );
    if (index === -1) {
      append({
        project_title: "",
        project_description: "",
        tech_stacks_used: "",
        role_in_project: "",
        project_link: "",
        project_start_date: "",
        project_end_date: "",
        project_team_size: "",
      });
    }
    // const isValid = await trigger();
    // if (isValid) {
    //   append({
    //     project_title: "",
    //     project_description: "",
    //     tech_stacks_used: "",
    //     role_in_project: "",
    //     project_link: "",
    //     project_start_date: "",
    //     project_end_date: "",
    //   });
    // }
  };

  const deleteDeveloperProject = (project_id, index) => {
    remove(index);
    if (project_id) {
      dispatch(
        deleteProjects(project_id, () => {
          if (role == "developer") {
            dispatch(fetchDeveloperCv());
          } else {
            dispatch(getDeveloperDetails(id));
          }
          handleClose();
        })
      );
    }
  };

  const onChangeSelect = (val) => {
    setTimeout(() => {
      const newOption = createOption(val);
      setSelectedOption((prev) => [...prev, newOption]);
      setSkillsCate((prev) => [...prev, newOption]);
    }, 1000);
  };
  console.log(watch("projects"), "projects");
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
                  <Form.Label className="font-14">
                    {t("projectTitle")}
                  </Form.Label>
                  <Form.Control
                    name="name"
                    className="common-field"
                    placeholder="Enter Project Title"
                    {...register(`projects.${index}.project_title`, {
                      required: "Project title is required",
                    })}
                  ></Form.Control>
                  {errors?.projects?.[index]?.project_title && (
                    <p className="error-message">
                      {errors.projects[index].project_title.message}
                    </p>
                  )}
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
                    {...register(`projects.${index}.project_description`, {
                      required: " Project Description is required",
                    })}
                  />
                  {errors?.projects?.[index]?.project_description && (
                    <p className="error-message">
                      {errors.projects[index].project_description.message}
                    </p>
                  )}
                </Form.Group>
                <Form.Label className="font-14">
                  {t("techStackUsed")}
                </Form.Label>
                <div className="experience-container">
                  <Form.Group className="mb-4">
                    <Row>
                      <Col md="12">
                        <Controller
                          name={`projects.${index}.tech_stacks_used`}
                          control={control}
                          rules={{ required: "Tech stacks used are required" }}
                          render={({ field }) => (
                            <CreatableSelect
                              {...field}
                              // defaultValue={[]}

                              onChange={(newValue) => {
                                field.onChange(newValue);
                                // setValue(
                                //   `projects.${index}.tech_stacks_used`,
                                //   newValue
                                // );
                                // clearErrors("tech_stacks_used");
                              }}
                              isMulti
                              isClearable
                              // name={selectedOption}
                              onCreateOption={onChangeSelect}
                              options={skillCate}
                              // value={selectedOption}
                            />
                          )}
                        />
                      </Col>
                    </Row>
                    {errors?.projects?.[index]?.tech_stacks_used && (
                      <p className="error-message">
                        {errors.projects[index].tech_stacks_used.message}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="font-14">
                      {t("roleInProject")}
                    </Form.Label>
                    <Form.Control
                      name="name"
                      className="common-field"
                      placeholder="Enter your Role In Project"
                      {...register(`projects.${index}.role_in_project`, {
                        required: " Role in project required",
                      })}
                    ></Form.Control>
                    <p className="error-message">
                      {errors?.projects?.[index]?.role_in_project && (
                        <p className="error-message">
                          {errors.projects[index]?.role_in_project.message}
                        </p>
                      )}
                    </p>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>{t("projectTeamSize")}</Form.Label>
                    <Form.Select
                      {...register(`projects.${index}.project_team_size`, {
                        required: "Project's team size is required",
                      })}
                      className="filter-select width-full shadow-none "
                    >
                      <option disabled selected>
                        Please select project's team size
                      </option>
                      {TEAM_SIZE_OPTIONS.map((val, idx) => (
                        <option key={idx} value={val}>
                          {val}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.projects?.[index]?.project_team_size && (
                      <p className="error-message">
                        {errors.projects[index]?.project_team_size.message}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Label className="font-14">
                    {t("projectLink")}
                  </Form.Label>
                  <Form.Group>
                    <Form.Control
                      name="name"
                      className="common-field"
                      placeholder="Enter Project Link"
                      {...register(`projects.${index}.project_link`, {
                        required: "Project link is required",
                      })}
                    ></Form.Control>
                    {errors?.projects?.[index]?.project_link && (
                      <p className="error-message">
                        {errors.projects[index]?.project_link.message}
                      </p>
                    )}
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
                          {...register(`projects.${index}.project_start_date`, {
                            required: "Start Date is required",
                            onChange: (e) => {
                              setValue(
                                `projects.${index}.project_start_date`,
                                e.target.value
                              );
                            },
                            validate: {
                              dateRange: (value) => {
                                const endDate = watch(
                                  `projects.${index}.project_end_date`
                                ); // Get the value of the end date field
                                if (!endDate || value <= endDate) {
                                  return true;
                                }
                                return "Start Date must be before End Date";
                              },
                            },
                          })}
                        />
                        {errors?.projects?.[index]?.project_start_date && (
                          <p className="error-message">
                            {errors.projects[index].project_start_date.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="mb-4">
                        <Form.Label className="font-14">
                          {t("endDate")}
                        </Form.Label>
                        <Form.Control
                          type="date"
                          className="common-field"
                          placeholder="Enter End Date"
                          {...register(`projects.${index}.project_end_date`, {
                            required: {
                              value: disabledEndDates[index] ? false : true,
                              message: "End Date is required",
                            },
                            onChange: (e) => {
                              setValue(
                                `projects.${index}.project_end_date`,
                                e.target.value
                              );
                            },
                          })}
                          min={
                            watch(`projects?.${index}?.project_start_date`)
                              ? new Date(
                                  watch(`projects.${index}.project_start_date`)
                                )
                                  ?.toISOString()
                                  ?.split("T")[0]
                              : undefined
                          }
                          max={new Date().toISOString().split("T")[0]}
                          // onChange={(e) => {
                          //   const formattedDate = moment(e.target.value).format(
                          //     "MM/DD/yyyy"
                          //   );
                          //   setValue(
                          //     `projects.${index}.project_end_date`,
                          //     formattedDate
                          //   );
                          // }}
                          disabled={disabledEndDates[index]}
                        />
                        {errors?.projects?.[index]?.project_end_date && (
                          <p className="error-message">
                            {errors.projects[index].project_end_date.message}
                          </p>
                        )}
                      </Form.Group>
                      {watch("projects").length !== 1 && (
                        <div>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={deletetooltip}
                          >
                            <Button
                              variant="danger"
                              className="font-14"
                              onClick={() => {
                                deleteDeveloperProject(
                                  watch(`projects.${index}.id`),
                                  index
                                );
                              }}
                            >
                              <FaTrashAlt />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              </Fragment>
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
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectsModal;