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
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

const ClientStep1 = ({
  control,
  errors,
  companyTypeOptions=null,
  activeStep,
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
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Row>
        <Col md={12}>
          <StepperHeadingSection activeStep={activeStep} />
          <p className="font-12 fw-medium">* includes a required field</p>
          <div className="d-flex align-items-start gap-3">
            {/* <div className="profile-upload-preview position-relative">
                    <div className="profile-img-preview w-100 h-100">
                      <img src={"/demo-user.png"} />
                    </div>
                    <Form.Control
                      type="file"
                      className="d-none"
                      id="profile-img-upload"
                    />
                    <Form.Label
                      htmlFor="profile-img-upload"
                      className="profile-img-label"
                    >
                      <IoCameraOutline />
                    </Form.Label>
                  </div> */}
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
              {stepFields?.map(
                ({
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
                  defaultOption
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
                            setValue(fieldName, place.formatted_address);
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
                          {!isPasswordSection && (
                            <CommonInput
                              label={t(`${label}`) + `${isRequired && " *"}`}
                              name={fieldName}
                              control={control}
                              invalidFieldRequired={true}
                              rules={{ ...rules }}
                              error={errors?.[fieldName]}
                              type={type}
                              options={companyTypeOptions ? companyTypeOptions:options}
                              defaultOption={defaultOption}
                              placeholder={placeholder}
                            />
                          )}
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