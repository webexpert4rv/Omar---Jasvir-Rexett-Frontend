import React, { useEffect, useState } from "react";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import { Col, Container, Form, Row } from "react-bootstrap";
import CommonInput from "../../../components/atomic/CommonInput";
import { useSelector } from "react-redux";
import { formatSkillOptionsForSelect } from "./constant";
import { Controller } from "react-hook-form";
import DateSection from "../developer/DateSection";
// this component will be used for  step 2,3,4,5,6,7,8
const RemainingSteps = ({
  headingData,
  name,
  inputType,
  label,
  watch,
  skillList,
  register,
  control,
  options,
  setError,
  clearErrors,
  errors,
  setValue,
}) => {
  // const { skillList } = useSelector((state) => state.clientData);
  const [skillOptions, setSkillOptions] = useState([]);
  useEffect(() => {
    if (skillList?.length) {
      setSkillOptions(formatSkillOptionsForSelect(skillList));
    }
  }, [skillList]);
  return (
    <>
      <section className="card-box">
        <Container>
          <Row>

            <div>
              <Row className="mb-4">
                <Col md="6">
                  
                  <div className="registration-form">
                  <div className="gap-3 align-items-center pb-2 mb-3 ">
                    <h2>{headingData.h1}</h2>
                    <p>{headingData.para}</p>
                  </div>
                    <div className="inner-form select-idel-length">
                      <div>
                        {inputType === "radio" && (
                          <CommonInput
                            label={headingData.h1}
                            name={name}
                            control={control}
                            rules={{ required: `This field  is required` }}
                            error={errors[name]}
                            type="radio"
                            options={options}
                          />
                        )}
                        {inputType === "multi-select" && (
                          <CommonInput
                            label={label}
                            name={name}
                            isMulti={true}
                            type="multi-select"
                            control={control}
                            rules={{
                              required: "This field is required",
                            }}
                            selectOptions={skillOptions}
                            error={errors?.[name]}
                          />
                        )}
                        {inputType === "date" && (
                          <>
                            <CommonInput
                              type="date"
                              name={name}
                              control={control}
                              label={"Select your Date"}
                              isMinRequired={true}
                              rules={{ required: "This field is required" }}
                              error={errors?.[name]}
                            />
                            <Form.Group className="mb-3">
                              <Form.Label className="common-label">
                                Select start time
                              </Form.Label>
                              <div className="position-relative">
                                <Form.Control
                                  {...register("meeting_start_time", {
                                    required: "Start time is required",
                                    validate: (value) => {
                                      const endTime = watch("meeting_end_time");
                                      if (endTime && value >= endTime) {
                                        return "Start time must be before end time";
                                      }
                                      return true;
                                    },
                                  })}
                                  type="time"
                                  className="common-field"
                                />
                                {/* <Controller
                            name="meeting_start_time"
                            control={control}
                            rules={{
                              required: "Start time is required",
                              validate: (value) => {
                                const endTime = watch("meeting_end_time");
                                if (endTime && value >= endTime) {
                                  return "Start time must be before end time";
                                }
                                return true;
                              },
                            }}
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                rules
                                type="time"
                                className="common-field"
                              />
                            )}
                          /> */}
                              </div>
                              {errors?.meeting_start_time && (
                                <p className="error-message">
                                  {errors?.meeting_start_time?.message}
                                </p>
                              )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label className="common-label">
                                Select end time
                              </Form.Label>
                              <div className="position-relative">
                                <Form.Control
                                  {...register(
                                    "meeting_end_time",
                                    {
                                      required: "End time is required",
                                    },
                                    (onchange = (e) => {
                                      const startTime = watch("meeting_start_time");
                                      const endTime = watch("meeting_end_time");
                                      if (endTime) {
                                        if (startTime < endTime) {
                                          clearErrors("meeting_start_time");
                                        } else {
                                          setError("meeting_start_time", {
                                            type: "manual",
                                            message:
                                              "Start time must be before end time",
                                          });
                                        }
                                      }
                                    })
                                  )}
                                  type="time"
                                  className="common-field"
                                />
                              </div>
                              {errors?.meeting_end_time && (
                                <p className="error-message">
                                  {errors?.meeting_end_time?.message}
                                </p>
                              )}
                            </Form.Group>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default RemainingSteps;
