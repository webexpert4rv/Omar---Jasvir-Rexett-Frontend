import React, { Fragment, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  STEP_5_FIELDS,
  convertDateIntoRequiredFormat,
} from "./developeStepConstant";
import CommonInput from "../../../components/atomic/CommonInput";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeveloperProject,
  deleteDeveloperProject,
  getDeveloperProjects,
} from "../../../redux/slices/developerDataSlice";
import CommonListingCard from "../../../components/atomic/CommonListingCard";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import DateSection from "./DateSection";

const ProjectsSection = ({
  projectData,
  projects,
  projectOptions,
  setProjects,
  atLeastOneError,
  setAtLeastOneError,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [smallLoader, setSmallLoader] = useState(false);
  const developerId = localStorage.getItem("developerId");
  const closeLoader = () => {
    setLoader(false);
    setSmallLoader(false);
  };
  useEffect(() => {
    setLoader(true);
    handleGetProjects();
  }, []);
  const handleGetProjects = () => {
    dispatch(
      getDeveloperProjects(
        developerId,
        (data) => {
          setProjects(data);
        },
        closeLoader
      )
    );
  };
  const { t } = useTranslation();
  const {
    handleSubmit: handleProjectSubmit,
    control: projectControl,
    formState: { errors: projectErrors },
    register: projectRegister,
    setError: setProjectError,
    clearErrors: clearProjectErrors,
    setValue: setProjectsValue,
    watch: watchProject,
  } = useForm();
  const beforeSubmit = (e) => {
    e.preventDefault();
    handleProjectSubmit(onProjectSubmit)();
  };

  const onProjectSubmit = (values) => {
    handleApiCall({ action: "post", values: values });
  };
  const handleApiCall = ({ action, values, id, index }) => {
    let payload = [];
    if (action === "post") {
      const formattedValues = {
        ...values,
        project_type: values.project_type.label,
      };
      payload = {
        user_id: developerId,
        projects: [...projects, { ...formattedValues }],
      };
      setAtLeastOneError(null);
    } else {
      payload = projects.filter((curElem) => curElem.id !== id);
    }
    resetForm();
    if (action === "post") {
      setSmallLoader(true);
      dispatch(
        addDeveloperProject(
          payload,
          (data) => {
            handleGetProjects();
          },
          closeLoader
        )
      );
    } else {
      setLoader(true);
      dispatch(
        deleteDeveloperProject(id, payload, (data) => {
          setProjects(data);
          closeLoader();
        },closeLoader)
      );
    }
  };
  const handleDeleteProject = (id, index) => {
    handleApiCall({ action: "delete", id: id });
  };
  const resetForm = () => {
    const valuesToReset = [
      "project_start_date",
      "project_end_date",
      "project_description",
      "project_title",
      "company_name",
      "project_link",
      "project_type",
      "role_in_project",
    ];
    valuesToReset.map((key) => setProjectsValue(key, ""));
  };

  return (
    <>
      {loader ? (
        <ScreenLoader />
      ) : (
        <section className="card-box">
          <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
            <h2>Project History</h2>
            <p>Projects</p>
          </div>
          <div>
            <Row className="mb-4">
              <Col md="6">
                <div className="inner-form">
                  <div className="input fields">
                    <Form>
                      {STEP_5_FIELDS?.map(
                        (
                          {
                            fieldName,
                            label,
                            inputType,
                            isRequired,
                            rules,
                            rows,
                            isMinRequired,
                            isMaxRequired,
                            isDateSection,
                          },
                          index
                        ) => (
                          <Fragment key={index}>
                            {isDateSection ? (
                              <DateSection
                                errors={projectErrors}
                                register={projectRegister}
                                watch={watchProject}
                                startDateLabel={"from"}
                                startDateField={"project_start_date"}
                                endDateField={"project_end_date"}
                                endDateLabel={"to"}
                                startDateRequired={{
                                  required: "Start date is required",
                                }}
                                endDateRequired={{
                                  required: "End date is required",
                                }}
                                setError={setProjectError}
                                clearErrors={clearProjectErrors}
                              />
                            ) : (
                              <CommonInput
                                label={t(`${label}`) + `${isRequired && " *"}`}
                                name={fieldName}
                                type={inputType}
                                control={projectControl}
                                rules={{ ...rules }}
                                error={projectErrors?.[fieldName]}
                                rows={rows}
                                selectOptions={
                                  fieldName === "project_type" && projectOptions
                                }
                                isMinRequired={isMinRequired}
                                isMaxRequired={isMaxRequired}
                              />
                            )}
                          </Fragment>
                        )
                      )}

                      <RexettButton
                        type="button"
                        text={t("addProject")}
                        onClick={beforeSubmit}
                        className="main-btn px-5"
                        disabled={smallLoader}
                        isLoading={smallLoader}
                      />
                    </Form>
                    <div className="experience-listing">
                      {projects?.map((curData, index) => (
                        <CommonListingCard
                          key={index}
                          title={curData?.project_title}
                          startDate={convertDateIntoRequiredFormat(
                            curData?.project_start_date
                          )}
                          endDate={convertDateIntoRequiredFormat(
                            curData?.project_end_date
                          )}
                          id={curData?.id}
                          index={index}
                          onRemove={handleDeleteProject}
                          // this we have to verify either tech stack used or skills
                          // bodyTitle1={curData?.company_name}
                          bodyTitle2={curData?.project_description}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {atLeastOneError && (
              <h4 className="error-message">{atLeastOneError}</h4>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ProjectsSection;
