import React, { useEffect, useState } from "react";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import { Col, Form, Row } from "react-bootstrap";
import CommonInput from "../../../components/atomic/CommonInput";
import { useSelector } from "react-redux";
import { formatSkillOptionsForSelect } from "./constant";
import { Controller } from "react-hook-form";
// this component will be used for  step 2,3,4,5,6,7,8
const RemainingSteps = ({
  headingData,
  name,
  inputType,
  label,
  skillList,
  control,
  options,
  errors,
  setValue
}) => {
  // const { skillList } = useSelector((state) => state.clientData);
  const [skillOptions, setSkillOptions] = useState([]);
  useEffect(() => {
    if(skillList?.length) {
        setSkillOptions(formatSkillOptionsForSelect(skillList));
    }
  }, [skillList]);
  console.log(skillOptions,"skillOptions")
  return (
    <>
      <section className="card-box">
        <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
          <h2>{headingData.h1}</h2>
          <p>{headingData.para}</p>
        </div>
        <div>
          {false ? (
            <ScreenLoader />
          ) : (
            <>
              <Row className="mb-4">
                <Col md="6">
                  <div className="inner-form">
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
                            <CommonInput
                            type="time"
                            control={control}
                            label={"Select start time"}
                            name={"meeting_start_time"}
                            rules={{ required: "This field is required" }}
                            error={errors?.meeting_start_time}
                          />
                            <CommonInput
                            type="time"
                            control={control}
                            name={"meeting_end_time"}
                            label={"Select end time"}
                            rules={{ required: "This field is required" }}
                            error={errors?.meeting_end_time}
                          />
                          {/* <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                          Select your Date
                          </Form.Label>
                          <div className="position-relative">
                            <Controller
                              name={name}
                              rules={{ required: "This field is required" }}
                              control={control}
                              render={({ field }) => (
                                <input {...field} type="date" min={new Date().toISOString().split("T")[0]} />
                              )}
                            />
                          </div>
                        </Form.Group> */}
                          {/* <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              Select your Time Slot
                            </Form.Label>
                            <div className="position-relative">
                              <Controller
                                name="meeting_start_time"
                                rules={{ required: "This field is required" }}
                                control={control}
                                render={({ field }) => (
                                  <input {...field} type="time" />
                                )}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              Select your Time Slot
                            </Form.Label>
                            <div className="position-relative">
                              <Controller
                                name="meeting_end_time"
                                rules={{ required: "This field is required" }}
                                control={control}
                                render={({ field }) => (
                                  <input {...field} type="time" />
                                )}
                              />
                            </div>
                          </Form.Group> */}
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default RemainingSteps;
