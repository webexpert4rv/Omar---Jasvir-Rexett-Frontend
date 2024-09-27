import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Controller, useForm } from "react-hook-form";
import CommonInput from "../../../components/atomic/CommonInput";
import CommonAutocomplete from "../../../components/atomic/CommonAutoComplete";
import RexettButton from "../../../components/atomic/RexettButton";
import { getAllCountries } from "../../../redux/slices/authenticationDataSlice";
import { COMPANY_TYPE_SELECT_OPTIONS } from "./constant";
// import CommonReactSelect from "../../../components/atomic/CommonReactSelect";
import CommonReactSelect from "../../../components/atomic/CommonReactSelect";
import {
  getCitiesList,
  getCoutriesList,
  getStatesList,
  getTimeZoneForCountry,
} from "../../../redux/slices/clientDataSlice";
import { validatePassword } from "../../../components/utils";
import PasswordSection from "../developer/PasswordSection";
import LocationSection from "../developer/LocationSection";

const Step1 = ({
  register,
  errors,
  control,
  setValue,
  setError,
  clearErrors,
  watch,
  headingData,
  selectedImage,
  setSelectedImage,
}) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const GOOGLE_MAP_API_KEY = "AIzaSyCA-pKaniZ4oeXOpk34WX5CMZ116zBvy-g";

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="card-box">
        <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
          <h2>{headingData.h1}</h2>
          <p>{headingData.para}</p>
        </div>
        <div>
          <Row className="mb-4">
            <Col md="6">
              <div className="inner-form">
                <div>
                  <CommonInput
                    // label={t("As Individual")}
                    name="client_type"
                    control={control}
                    rules={{ required: "Client type  is required" }}
                    error={errors?.client_type}
                    type="radio"
                    options={[
                      { label: "As Individual", value: "individual" },
                      { label: "As Company", value: "company" },
                    ]}
                  />
                </div>
                {watch("client_type") === "company" && (
                  <>
                    <CommonInput
                      label={t("Type of Company") + " *"}
                      name="company_type"
                      type="select"
                      control={control}
                      rules={{ required: "Type of company is required" }}
                      error={errors?.company_type}
                      selectOptions={COMPANY_TYPE_SELECT_OPTIONS}
                    />
                    <CommonInput
                      label={t("Name of Company") + " *"}
                      name="company_name"
                      control={control}
                      rules={{ required: "Name of company is required" }}
                      error={errors?.company_name}
                    />
                    <CommonAutocomplete
                      label={t("Company Address") + " *"}
                      name="company_address"
                      control={control}
                      rules={{ required: "Company address is required" }}
                      error={errors?.company_address}
                      apiKey={GOOGLE_MAP_API_KEY}
                      onPlaceSelected={(place) => {
                        setValue("company_address", place.formatted_address);
                      }}
                      onChange={(e) => {
                        setValue("company_address", e.target.value);
                      }}
                      options={{ types: ["establishment", "geocode"] }}
                    />
                    <CommonInput
                      label={t("Tax ID") + " *"}
                      name="company_tax_id"
                      control={control}
                      rules={{ required: "Tax ID is required" }}
                      error={errors?.company_tax_id}
                    />
                  </>
                )}
                <CommonInput
                  label={t("Name") + " *"}
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  error={errors.name}
                />
                <CommonInput
                  label={t("email") + " *"}
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  }}
                  error={errors.email}
                  // readOnly
                />
                <PasswordSection
                  control={control}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  watch={watch}
                />{" "}
                <CommonAutocomplete
                  label={t("address") + " *"}
                  name="address"
                  control={control}
                  rules={{ required: "Address is required" }}
                  error={errors.address}
                  apiKey={GOOGLE_MAP_API_KEY}
                  onPlaceSelected={(place) => {
                    setValue("address", place.formatted_address);
                  }}
                  onChange={(e) => {
                    setValue("address", e.target.value);
                  }}
                  options={{ types: ["establishment", "geocode"] }}
                />
              </div>
            </Col>
            <Col md="6">
              <div>
                <CommonInput
                  label={t("phone") + "*"}
                  name="phone_number"
                  control={control}
                  type="phone"
                  rules={{
                    required: "Phone Number is required",
                    pattern: {
                      value: /^\+?[0-9]{10,14}$/,
                      message: "Please enter a valid phone number",
                    },
                  }}
                  error={errors.phone_number}
                />
                {/* <CommonInput
                    label={t("city") + "*"}
                    name="city"
                    control={control}
                    rules={{
                      required: "City is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "City should not contain numbers or special characters",
                      },
                    }}
                    error={errors.city}
                  /> */}
                {/* <CommonInput
                    label={t("postCode") + "*"}
                    name="passcode"
                    control={control}
                    rules={{
                      required: "Postcode is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Postcode should only contain numbers",
                      },
                    }}
                    error={errors.passcode}
                  /> */}

                {/* <CommonInput
                    label={t("country") + "*"}
                    name="country"
                    type="select"
                    control={control}
                    rules={{
                      required: "Country is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "Country should not contain numbers or special characters",
                      },
                    }}
                    selectOptions={countries}
                    error={errors.country}
                  /> */}

                {/* <CommonInput
                    label={t("state") + "*"}
                    name="state"
                    type="select"
                    control={control}
                    rules={{
                      required: "State is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "Country should not contain numbers or special characters",
                      },
                    }}
                    error={errors?.state}
                    selectOptions={countries}
                  /> */}
                {/* <CommonInput
                    label={t("City") + "*"}
                    name="city"
                    type="select"
                    control={control}
                    rules={{
                      required: "City is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "Country should not contain numbers or special characters",
                      },
                    }}
                    selectOptions={countries}
                    error={errors?.country}
                  /> */}

                <LocationSection
                  control={control}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                />
                {/* <CommonReactSelect
                  name="country_code"
                  errors={errors}
                  handleChange={handleDropDownChange}
                  watch={watch}
                  control={control}
                  required="Country is required"
                  label="Country"
                  type="country"
                  options={countriesList}
                />

                <CommonReactSelect
                  name="state_iso_code"
                  errors={errors}
                  handleChange={handleDropDownChange}
                  watch={watch}
                  control={control}
                  required="State is required"
                  label="State"
                  type="state"
                  options={statesList}
                />
                <CommonReactSelect
                  name="city"
                  errors={errors}
                  handleChange={handleDropDownChange}
                  control={control}
                  // required="City is required"
                  label="City"
                  type="city"
                  watch={watch}
                  options={citiesList}
                /> */}

                <CommonInput
                  label={t("Passcode") + "*"}
                  name="passcode"
                  control={control}
                  rules={{
                    required: "Postcode is required",
                    // pattern: {
                    //   value: /^[0-9]+$/,
                    //   message: "Postcode should only contain numbers",
                    // },
                  }}
                  error={errors.passcode}
                />
                {/* <Form.Label>Image</Form.Label>
                <Form.Label
                  htmlFor="developer-image"
                  className="upload-image-label d-block"
                >
                  <HiUpload />
                  {t("uploadImage")}
                </Form.Label>
                <Controller
                  name="profile_picture"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="developer-image"
                      className="visually-hidden common-field"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleFileChange(e, field);
                        field.onChange(e);
                      }}
                    />
                  )}
                /> */}
                <div>
                  {selectedImage && (
                    <img
                      src={selectedImage && selectedImage}
                      // alt="Selected"
                      className="uploaded-image"
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
export default Step1;
