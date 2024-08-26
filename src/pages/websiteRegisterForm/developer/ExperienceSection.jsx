import React, { Fragment, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  STEP_3_FIELDS,
  convertDateIntoRequiredFormat,
} from "./developeStepConstant";
import CommonInput from "../../../components/atomic/CommonInput";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch } from "react-redux";
import { addDeveloperExperience } from "../../../redux/slices/developerDataSlice";
import CommonListingCard from "../../../components/atomic/CommonListingCard";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import DateSection from "./DateSection";

const ExperienceSection = ({
  experienceData,
  experiences,
  setExperiences,
  atLeastOneError,
  setAtLeastOneError,
}) => {
  const [loader, setLoader] = useState(false);
  const [smallLoader, setSmallLoader] = useState(false);
  const [testing, setTesting] = useState(1);
  const { t } = useTranslation();
  const developerId = localStorage.getItem("developerId");
  const dispatch = useDispatch();
  const {
    handleSubmit: handlExperienceSubmit,
    control: experienceControl,
    register: registerExperience,
    formState: { errors: experienceErrors },
    setValue: setExperienceValue,
    reset: resetExperience,
    watch:watchExperiences,
    setError:setExperienceErrors,
    clearErrors:clearExperienceErrors

  } = useForm({});

  const resetForm = () => {
    const valuesToReset = [
      "start_date",
      "end_date",
      "description",
      "job_title",
      "company_name",
    ];
    valuesToReset.map((key) => setExperienceValue(key, ""));
  };

  const handleApiCall = ({ action, values, id, index }) => {
    let payload = [];
    if (action === "post") {
      setSmallLoader(true);
      setAtLeastOneError(null);
      payload = [...experiences, { ...values }];
    } else {
      setLoader(true);
      if (id) {
        payload = experiences?.filter((curElem) => curElem?.id !== id);
      } else {
        const temp = [...experiences];
        temp.splice(index, 1);
        payload = [...temp];
      }
    }
    resetForm();
    dispatch(
      addDeveloperExperience(developerId, payload, action, (data) => {
        setExperiences(data);
        setLoader(false);
        setSmallLoader(false);
      })
    );
  };

  useEffect(() => {
    setExperiences(experienceData);
  }, [experienceData]);

  const beforeSubmit = (e) => {
    e.preventDefault();
    handlExperienceSubmit(onExperienecSubmit)();
  };
  const onExperienecSubmit = (values) => {
    handleApiCall({ action: "post", values: values });
  };
  const handleDeleteExperience = (id, index) => {
    if (id) {
      handleApiCall({ action: "delete", id: id });
    } else {
      handleApiCall({ action: "delete", index: index });
    }
  };
  return (
    <>
      {loader ? (
        <ScreenLoader />
      ) : (
        <section className="card-box">
          <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
            <h2>Past Success</h2>
            <p>Experience</p>
          </div>
          <div>
            <Row className="mb-4">
              <Col md="6">
                <div className="inner-form">
                  <div className="input fields">
                    <Form>
                      {STEP_3_FIELDS?.map(
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
                                errors={experienceErrors}
                                register={registerExperience}
                                watch={watchExperiences}
                                startDateLabel={"from"}
                                startDateRequired={{required:"Start date is required"}}
                                endDateRequired={{required:"End date is required"}}
                                startDateField={"start_date"}
                                endDateField={"end_date"}
                                endDateLabel={"to"}
                                setError={setExperienceErrors}
                                clearErrors={clearExperienceErrors}
                              />
                            ) : (
                              <CommonInput
                                label={t(`${label}`) + `${isRequired && " *"}`}
                                name={fieldName}
                                type={inputType}
                                control={experienceControl}
                                rules={{ ...rules }}
                                error={experienceErrors?.[fieldName]}
                                rows={rows}
                                isMinRequired={isMinRequired}
                                isMaxRequired={isMaxRequired}
                              />
                            )}
                          </Fragment>
                        )
                      )}

                      <RexettButton
                        type="button"
                        text={t("addExperience")}
                        onClick={beforeSubmit}
                        className="main-btn px-5"
                        disabled={smallLoader}
                        isLoading={smallLoader}
                      />
                      {/* <input type="text" {...register("name")}/> */}
                    </Form>
                    <div className="experience-listing">
                      {experiences?.map((curData, index) => (
                        <CommonListingCard
                          key={index}
                          title={curData?.job_title}
                          startDate={convertDateIntoRequiredFormat(
                            curData?.start_date
                          )}
                          endDate={convertDateIntoRequiredFormat(
                            curData?.end_date
                          )}
                          id={curData?.id}
                          onRemove={handleDeleteExperience}
                          bodyTitle1={curData?.company_name}
                          bodyTitle2={curData?.description}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Col>
              {atLeastOneError && (
                <h4 className="error-message">{atLeastOneError}</h4>
              )}
            </Row>
          </div>
        </section>
      )}
    </>
  );
};

export default ExperienceSection;
