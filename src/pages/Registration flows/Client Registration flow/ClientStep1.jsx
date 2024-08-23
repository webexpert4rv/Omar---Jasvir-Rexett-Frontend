import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import StepperHeadingSection from "../StepperHeadingSection";
import CommonInput from "../../../components/atomic/CommonInput";
import { useTranslation } from "react-i18next";
import PasswordSection from "../../websiteRegisterForm/developer/PasswordSection";
import CommonAutocomplete from "../../../components/atomic/CommonAutoComplete";
import LocationSection from "../../websiteRegisterForm/developer/LocationSection";
import CommonProfilePictureSection from "../../../components/common/CommonProfilePictureSection";
import UploadFile from "../DeveloperRegistrationFlow/UploadFile";
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

// const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;
// const GOOGLE_MAP_API_KEY = "AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc"

const ClientStep1 = ({
  control,
  errors,
  companyTypeOptions=null,
  activeStep,
  nestedActiveStep,
  type,
  name,
  stepFields,
  setError,
  clearErrors,
  watch,
  setValue,
  register,
  previewImage,
  setPreviewImage,
  setImageFile,
  imageFile,
  isProfileSectionRequired,
  isEditMode,
  skillOptions,
  stepData,
  countryCode
}) => {
  const { t } = useTranslation();
  console.log(countryCode,"countryCode")
  console.log(type,"typeClientStep1")
  let isStillWorking=watch("is_still_working")
  console.log(stepFields,"stepFields")
  // let isStillWorking=true
  return (
    <>
      <Row>
        <Col md={12}>
         { <StepperHeadingSection activeStep={activeStep} type = {type} nestedActiveStep={nestedActiveStep}/>}
          <p className="font-12 fw-medium">* includes a required field</p>
          <div className="d-flex align-items-start gap-3">
            {isProfileSectionRequired && (
              <CommonProfilePictureSection
              register={register}
              setValue={setValue}
              clearErrors={clearErrors}
              setImageFile={setImageFile}
              setPreviewImage={setPreviewImage}
              previewImage={previewImage}
              setError={setError}
              imageFile={imageFile}
              fieldName={"profile_picture"}
              errors={errors}
            />
            )}
            <Row className="w-100">
              {stepFields?.map(({label,
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
                  isMinRequired,
                  isMaxRequired,
                  readOnly,
                }) =>
                  isPasswordSection ? (
                    <PasswordSection
                      control={control}
                      errors={errors}
                      setError={setError}
                      invalidFieldRequired={true}
                      clearErrors={clearErrors}
                      watch={watch}
                      isColSixRequired={true}
                    />
                  ) : isLocation ? (
                    <LocationSection
                      control={control}
                      errors={errors}
                      watch={watch}
                      setValue={setValue}
                      setError={setError}
                      invalidFieldRequired={true}
                      clearErrors={clearErrors}
                      isTimeZoneRequired={true}
                      isRegistrationStep={true}
                    />
                  ) : (
                    <Col md={columnWidth}>
                      {isAutocomplete && (
                        <CommonAutocomplete
                          label={t(`${label}`) + `${isRequired && " *"}`}
                          name={fieldName}
                          control={control}
                          rules={{ ...rules }}
                          invalidFieldRequired={true}
                          error={errors?.[fieldName]}
                          apiKey={GOOGLE_MAP_API_KEY}
                          onPlaceSelected={(place) => {
                            setValue(fieldName, place?.formatted_address);
                          }}
                          onChange={(e) => {
                            setValue(fieldName, e.target.value);
                          }}
                          options={{
                            types: ["establishment", "geocode"],
                          }}
                        />
                      )}
                      {!isAutocomplete && (
                        <div className="mb-3">
                          {isPasswordSection && (
                            <PasswordSection
                              control={control}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              watch={watch}
                              isColSixRequired={true}
                            />
                          )}

                          {!isPasswordSection && type!=="upload" ? ( 
                            <CommonInput
                              label={t(`${label}`) + `${isRequired ? " *" :""}`}
                              name={fieldName}
                              control={control}
                              invalidFieldRequired={true}
                              rules={{ ...rules }}
                              error={errors?.[fieldName]}
                              type={type}
                              options={companyTypeOptions ? companyTypeOptions:skillOptions && label=="Skill" ? skillOptions: fieldName=="time_zone"? skillOptions :options}//get options
                              defaultOption={defaultOption}
                              placeholder={placeholder}
                              isMaxRequired={isMaxRequired}
                              disabled={isStillWorking}
                              isMinRequired={isMinRequired}
                              readOnly={readOnly ? true : false}
                              />
                          ): <UploadFile 
                          label={label}
                          placeholder={placeholder}
                          register={register}
                          setValue={setValue}
                          clearErrors={clearErrors}
                          setImageFile={setImageFile}
                          setPreviewImage={setPreviewImage}
                          previewImage={previewImage}
                          setError={setError}
                          imageFile={imageFile}
                          fieldName={fieldName}
                          errors={errors}
                          stepData={stepData}
                          />}

                        </div>
                      )}
                    
                    </Col>
                  )
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ClientStep1;
