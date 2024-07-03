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
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

const ClientStep1 = ({
  control,
  errors,
  activeStep,
  stepFields,
  setError,
  clearErrors,
  watch,
  setValue,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <div>
        <Link className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium">
          <FaArrowLeft /> Go Back
        </Link>
        <div>
          <Row>
            <Col md={12}>
              <StepperHeadingSection activeStep={activeStep} />
              <p className="font-12 fw-medium">* includes a required field</p>
              <div className="d-flex align-items-start gap-3">
                <div className="profile-upload-preview position-relative">
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
                </div>
                <Row>
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
                      isLocation,
                    }) =>
                      isPasswordSection ? (
                        <PasswordSection
                          control={control}
                          errors={errors}
                          setError={setError}
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
                          clearErrors={clearErrors}
                          isTimeZoneRequired={true}
                        />
                      ) : (
                        <Col md={columnWidth}>
                          {isAutocomplete && (
                            <CommonAutocomplete
                              label={t(`${label}`) + `${isRequired && " *"}`}
                              name={fieldName}
                              control={control}
                              rules={{ ...rules }}
                              error={errors?.[fieldName]}
                              apiKey={GOOGLE_MAP_API_KEY}
                              onPlaceSelected={(place) => {
                                setValue(fieldName, place.formatted_address);
                              }}
                              onChange={(e) => {
                                setValue(fieldName, e.target.value);
                              }}
                              options={{ types: ["establishment", "geocode"] }}
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
                                  label={
                                    t(`${label}`) + `${isRequired && " *"}`
                                  }
                                  name={fieldName}
                                  control={control}
                                  rules={{ ...rules }}
                                  error={errors?.[fieldName]}
                                  type={type}
                                  placeholder={placeholder}
                                />
                              )}
                            </div>
                          )}
                        </Col>
                      )
                  )}

                  <Col md={4}>
                    <div className="mb-3">
                      <Form.Label className="font-14 fw-medium">
                        Country
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="common-field font-14"
                        placeholder="e.g. India"
                      />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <Form.Label className="font-14 fw-medium">
                        State
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="common-field font-14"
                        placeholder="e.g. Punjab"
                      />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <Form.Label className="font-14 fw-medium">
                        City
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="common-field font-14"
                        placeholder="e.g. Amritsar"
                      />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <Form.Label className="font-14 fw-medium">
                        Pin Code
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="common-field font-14"
                        placeholder="e.g. 143001"
                      />
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="mb-3">
                      <Form.Label className="font-14 fw-medium">
                        Timezone
                      </Form.Label>
                      <Form.Select className="common-field font-14">
                        <option>Select Timezone</option>
                        <option>GMT (+5:30) Kolkata</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        {/* <div className="d-flex justify-content-between align-items-center">
          <div></div>
          <div>
            <Link
              to={"/client-engagement"}
              className="main-btn font-14 text-decoration-none"
            >
              Next: Engagement
            </Link>
          </div>
        </div> */}
      </div>
    </Container>
  );
};

export default ClientStep1;
