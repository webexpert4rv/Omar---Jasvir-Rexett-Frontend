import React, { Fragment, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CommonInput from "../../../components/atomic/CommonInput";
import { useTranslation } from "react-i18next";
import { formatSkillOptionsForSelect } from "../client/constant";
import { getActiveStepHeading } from "./vendorConstant";
import { Controller } from "react-hook-form";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import PhoneInput from "react-phone-number-input";

const VendorRemainingSteps = ({
  control,
  errors,
  activeStepFields,
  register,
  skillOptions,
  watch,
  specializationOptions,
  activeStep,
}) => {
  const { t } = useTranslation();
  const [skillOptionsForSelect, setSkillOptionsForSelect] = useState([]);
  useEffect(() => {
    if (skillOptions?.length) {
      setSkillOptionsForSelect(formatSkillOptionsForSelect(skillOptions));
    }
  }, [skillOptions]);
  console.log(specializationOptions, "specializationOptions insid estep");
  return (
    <>
      {activeStep === 5 ? (
        <section className="card-box">
          <h1>Thank you for applying</h1>
          <h4>Welcome to the Rexett as an Vendor</h4>
          <p>
            A Rexett Family Team Member Will Reach Out to You Shortly for the
            Next Steps!!
          </p>
        </section>
      ) : (
        <section className="card-box">
          <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
            <h2>{getActiveStepHeading(activeStep)}</h2>
            <p>
              Rexett invites you to join our platform as a software development
              vendor and be part of our dynamic community of IT professionals
            </p>
          </div>
          <Row className="mb-4">
            <Col md="6">
              <div className="inner-form">
                <div className="input fields">
                  {activeStepFields?.map(
                    (
                      {
                        label,
                        isYearPicker,
                        type,
                        options,
                        rules,
                        isRequired,
                        defaultOption,
                        fieldName,
                        rows,
                      },
                      index
                    ) => (
                      <Fragment key={index}>
                        {isYearPicker ? (
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t(label)} *
                            </Form.Label>
                            <div className="position-relative">
                              <Controller
                                name={fieldName}
                                control={control}
                                render={({ field }) => (
                                  <DatePicker
                                    {...field}
                                    selected={watch("establishment_year_date")}
                                    maxDate={
                                      new Date().toISOString().split("T")[0]
                                    }
                                    maxDetail="decade"
                                    onChange={(date) => field.onChange(date)}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    placeholderText="Select year"
                                    className="common-field"
                                  />
                                )}
                              />
                            </div>
                          </Form.Group>
                        ) : (
                          //  type === "phone" ? (
                          //   <>
                          //     <Form.Group className="mb-3">
                          //       <Form.Label className="common-label">
                          //         {t(`${label}`)} *
                          //       </Form.Label>
                          //       <PhoneInput
                          //         {...register(fieldName, { ...rules })}
                          //         // placeholder={placeholder}
                          //         // value={field.value}
                          //         // onChange={field.onChange}
                          //         inputProps={{
                          //           name: name,
                          //           // autoComplete: autoComplete,
                          //           className: "common-field",
                          //         }}
                          //       />
                          //     </Form.Group>
                          //   </>
                          // )
                          <CommonInput
                            label={t(`${label}`) + `${isRequired && " *"}`}
                            name={fieldName}
                            type={type}
                            control={control}
                            rules={{ ...rules }}
                            error={errors?.[fieldName]}
                            options={options}
                            defaultOption={defaultOption}
                            rows={rows}
                            watch={watch}
                            selectOptions={
                              fieldName === "specialization"
                                ? specializationOptions
                                : skillOptionsForSelect
                            }
                          />
                        )}
                      </Fragment>
                    )
                  )}
                  {/* <Controller
                    name="year"
                    control={control}
                    defaultValue={null}
                    rules={{ required: "Year is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <DatePicker
                          {...field}
                          selected={field.value}
                          maxDetail="decade"
                          onChange={(date) => field.onChange(date)}
                          showYearPicker
                          dateFormat="yyyy"
                          placeholderText="Select year"
                          className="form-control"
                        />
                        {error && (
                          <p className="error-message">{error.message}</p>
                        )}
                      </>
                    )}
                  /> */}
                </div>
              </div>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default VendorRemainingSteps;
