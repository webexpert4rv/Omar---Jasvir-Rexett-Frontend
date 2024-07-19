import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import StepperHeadingSection from "../StepperHeadingSection";
import { useForm } from "react-hook-form";
import { getActiveStepHeadingData, getVendorActiveStepFields } from "../registrationConstant";
import { FaArrowLeft } from "react-icons/fa";
import CommonInput from "../../../components/atomic/CommonInput";
import { useTranslation } from "react-i18next";

const VendorDecisionMakers = ({
  activeStepFields,
  setError,
  type,
  clearErrors,
  setValue,
  previewImage,
  setImageFile,
  errors,
  control,
  activeStep,
  getActiveStepText,
  smallLoader,
  setPreviewImage,
  imageFile,
  // register
  watch
}) => {
  // const { register, handleSubmit, reset, watch } = useForm({});

  // const onSubmit = (values) => {
  //   console.log(values, "values");
  // };
  // console.log(activeStepFields,"activeStepFields")

  const fields = getVendorActiveStepFields(activeStep);
  console.log(fields, "fields")
  console.log(watch("proprietor_name"),"wertyuiNAME")
  const {t } = useTranslation()


  return (
    <>
      <section>
        <div>

          <Row>
            <Col md={12}>
              <StepperHeadingSection activeStep={activeStep} type={type} />
              <p className="font-12 fw-medium">* includes a required field</p>
              <div>
                <Row className="w-100">
                  {fields?.map(
                    (
                      {
                        label,
                        fieldName,
                        rules,
                        placeholder,
                        columnWidth,
                        isRequired,
                        isPasswordSection,
                        isAutocomplete,
                        options,
                        isLocation,
                        defaultOption,
                      },
                      index
                    ) =>
                        (
                          <Col md={columnWidth} key={index}>
                               <CommonInput
                              label={t(`${label}`) + `${isRequired ? " *" :""}`}
                              name={fieldName}
                              control={control}
                              invalidFieldRequired={true}
                              rules={{ ...rules }}
                              error={errors?.[fieldName]}
                              type={type}
                              placeholder={placeholder}
                            />
                          </Col>
                        )
                      
                  )}
                </Row>
                {/* <div className="">
                  <Button variant="transparent" className="position-btn">
                    + Add another member
                  </Button>
                </div> */}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default VendorDecisionMakers;
