import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import StepperHeadingSection from "../StepperHeadingSection";
import { useForm } from "react-hook-form";
import { getActiveStepHeadingData, getVendorActiveStepFields } from "../registrationConstant";
import { FaArrowLeft } from "react-icons/fa";
import CommonInput from "../../../components/atomic/CommonInput";
import { useTranslation } from "react-i18next";

const VendorDecisionMakers = ({
  activeStep,
  type,
  activeStepFields,
  setError,
  clearErrors,
  setValue,
  previewImage,
  setImageFile,
  errors,
  control,
  watch,
  register,
  getActiveStepText,
  smallLoader,
  setPreviewImage,
  imageFile
}) => {

  const { t } = useTranslation()
  // const fields = getVendorActiveStepFields(activeStep);
  const fields = activeStepFields;
console.log(fields,"fields")
console.log(errors?.proprietor_email,"proprietor_email")



  return (
    <>
      <section>
        <div>
          <Row>
            <Col md={12}>
              <StepperHeadingSection activeStep={activeStep} type={"vendor"} />
              <p className="font-12 fw-medium">* includes a required field</p>
              <div>
                <Row className="w-100">
                  {fields?.map(
                    (
                      {
                        label,
                        fieldName,
                        type,
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
                    ) => (

                      <>
                      {console.log(fieldName,"errror inside loop")}
                      <div className="mb-3">
                        <Col md={columnWidth} >
                        <CommonInput
                              label={t(`${label}`) + `${isRequired && " *"}`}
                              name={fieldName}
                              control={control}
                              invalidFieldRequired={true}
                              rules={{ ...rules }}
                              error={errors?.[fieldName]}
                              type={type}
                              defaultOption={defaultOption}
                              placeholder={placeholder}
                            />

                        </Col>
                        </div>
                      </>

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
