import React, { Fragment, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { STEP_4_FIELDS, getYearFromDate } from "./developeStepConstant";
import CommonInput from "../../../components/atomic/CommonInput";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { addDeveloperEducation } from "../../../redux/slices/developerDataSlice";
import CommonListingCard from "../../../components/atomic/CommonListingCard";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import DateSection from "./DateSection";

const EducationSection = ({
  degreeOptions,
  educationData,
  educations,
  setEducations,
  atLeastOneError,
  setAtLeastOneError,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loader, setloader] = useState(false);
  const [smallLoader, setSmallLoader] = useState(false);
  const developerId = localStorage.getItem("developerId");
  useEffect(() => {
    setEducations(educationData);
  }, [educationData]);

  const handleApiCall = ({ action, values, id, index }) => {
    let payload = [];
    if (action === "post") {
      setSmallLoader(true);
      setAtLeastOneError(null);
      payload = [...educations, { ...values }];
    } else {
      setloader(true);
      if (id) {
        payload = educations.filter((curElem) => curElem.id !== id);
      } else {
        const temp = [...educations];
        temp.splice(index, 1);
        payload = [...temp];
      }
    }
    resetForm();
    dispatch(
      addDeveloperEducation(developerId, payload, action, (data) => {
        setEducations(data);
        setloader(false);
        setSmallLoader(false);
      })
    );
  };
  const {
    handleSubmit: handleEducationSubmit,
    control: educationControl,
    register: educationRegister,
    formState: { errors: educationErrors },
    setValue: setEducationValue,
    watch: watchEducation,
    clearErrors: clearEducationErrors,
    setError: setEducationError,
  } = useForm();
  const beforeSubmit = (e) => {
    e.preventDefault();
    handleEducationSubmit(onEducationSubmit)();
  };
  const onEducationSubmit = (data) => {
    const values = {
      ...data,
      degree_id: Number(data?.degree_id?.value),
      start_year: getYearFromDate(data.start_year),
      end_year: getYearFromDate(data.end_year),
      currently_attending: false,
      degree: data?.degree_id?.label,
    };
    handleApiCall({ action: "post", values: values });
  };
  const handleEducationDelete = (id, index) => {
    if (id) {
      handleApiCall({ action: "delete", id: id });
    } else {
      handleApiCall({ action: "delete", index: index });
    }
  };
  const resetForm = () => {
    const valuesToReset = [
      "degree_id",
      "description",
      "end_year",
      "start_year",
      "university_name",
    ];
    valuesToReset.map((key) => setEducationValue(key, ""));
  };
  return (
    <>
      {loader ? (
        <ScreenLoader />
      ) : (
        <section className="card-box">
          <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
            <h2>Education History</h2>
            <p>Education</p>
          </div>
          <div>
            <Row className="mb-4">
              <Col md="6">
                <div className="inner-form">
                  <div className="input fields">
                    <Form>
                      {STEP_4_FIELDS?.map(
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
                                errors={educationErrors}
                                register={educationRegister}
                                watch={watchEducation}
                                startDateLabel={"from"}
                                startDateField={"start_year"}
                                endDateField={"end_year"}
                                endDateLabel={"to"}
                                startDateRequired={{
                                  required: "Start year is required",
                                }}
                                endDateRequired={{
                                  required: "End year is required",
                                }}
                                setError={setEducationError}
                                clearErrors={clearEducationErrors}
                              />
                            ) : (
                              <CommonInput
                                label={t(`${label}`) + `${isRequired && " *"}`}
                                name={fieldName}
                                type={inputType}
                                control={educationControl}
                                rules={{ ...rules }}
                                error={educationErrors?.[fieldName]}
                                rows={rows}
                                isMinRequired={isMinRequired}
                                isMaxRequired={isMaxRequired}
                                selectOptions={degreeOptions}
                              />
                            )}
                          </Fragment>
                        )
                      )}

                      <RexettButton
                        type="button"
                        text={t("addEducation")}
                        onClick={beforeSubmit}
                        className="main-btn px-5"
                        disabled={smallLoader}
                        isLoading={smallLoader}
                      />
                    </Form>
                    <div className="experience-listing">
                      {educations?.map((curData, index) => (
                        <CommonListingCard
                          key={index}
                          title={
                            curData?.degree
                              ? curData?.degree
                              : curData?.Degree?.title
                          }
                          startDate={curData?.start_year}
                          endDate={curData?.end_year}
                          id={curData?.id}
                          onRemove={handleEducationDelete}
                          bodyTitle1={curData?.university_name}
                          bodyTitle2={
                            curData?.description
                              ? curData?.description
                              : curData?.Degree?.description
                          }
                          index={index}
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

export default EducationSection;
