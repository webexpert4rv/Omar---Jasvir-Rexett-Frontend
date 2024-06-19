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

const Step1 = ({ register, errors, control, setValue, watch, headingData, selectedImage,setSelectedImage }) => {
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();
  // const {countriesList,statesList,citiesList} = useSelector((state)=>state.clientData)

  const dispatch = useDispatch();

  const [isPassword, setPassword] = useState({
    firstPass: false,
    secondPass: false,
  });
  const [file, setFile] = useState(null);
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;
 const { countriesList,statesList,citiesList} = useSelector((state)=>state.clientData)
  useEffect(() => {
    // dispatch(getCoutriesList());
  }, []);

  // useEffect(() => {
  //   if (watch("country_code")?.value) {
  //     dispatch(getStatesList(watch("country_code")?.value));
  //     dispatch(getTimeZoneForCountry(watch("country_code")?.value));
  //     setValue("time_zone", null);
  //     setValue("state_iso_code", null);
  //     setValue("city", null);
  //   }
  // }, [watch("country_code")]);

  // useEffect(() => {
  //   if (watch("state_iso_code")?.value) {
  //     dispatch(
  //       getCitiesList(
  //         watch("country_code")?.value,
  //         watch("state_iso_code")?.label
  //       )
  //     );
  //     setValue("city", null);
  //   }
  // }, [watch("state_iso_code")]);

  // useEffect(() => {
  //   if (userProfileDetails?.data) {
  //     setValue("name", userProfileDetails?.data?.name);
  //     setValue("email", userProfileDetails?.data?.email);
  //     setValue("phone_number", userProfileDetails?.data?.phone_number);
  //     setValue("address", userProfileDetails?.data?.address);
  //     setValue("address_2", userProfileDetails?.data?.address_2);
  //     setValue("city", userProfileDetails?.data?.city);
  //     setValue("country", userProfileDetails?.data?.country);
  //     setValue("passcode", userProfileDetails?.data?.passcode);
  //   }
  // }, [userProfileDetails]);

  const disableProfile = <Tooltip id="tooltip">Disable your Account</Tooltip>;

  const onSubmit = (values) => {
    // let formData = new FormData();
    // let fileData = new FormData();
    // for (const key in values) {
    //   formData.append(key, values[key]);
    // }
    // fileData.append("file", file);
    // if (file == null) {
    //   let data = {
    //     ...values,
    //     user_id: userId,
    //   };
    //   dispatch(updateDeveloperProfile(data));
    // } else {
    //   dispatch(
    //     filePreassignedUrlGenerate(fileData, (url) => {
    //       let data = {
    //         ...values,
    //         profile_picture: url,
    //         user_id: userId,
    //       };
    //       dispatch(updateDeveloperProfile(data));
    //     })
    //   );
    // }
  };
  // const validatePassword = (value) => {
  //   if (value === "") {
  //     return true; // Password is not required, so return true if empty
  //   } else {
  //     // Check if password matches the pattern
  //     const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  //     if (!pattern.test(value)) {
  //       return "Password must contain at least a symbol, upper and lower case letters and a number";
  //     }
  //   }
  //   return true; // Password meets the criteria
  // };

  const handleFileChange = (event,field) => {
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
  const handleDropDownChange = (value,name) => {
    if (name === "country_code") {  
       setValue("country_code",value);
      dispatch(getStatesList(watch("country_code")?.value));
        dispatch(getTimeZoneForCountry(watch("country_code")?.value));
        setValue("time_zone", null);
        setValue("state_iso_code", null);
        setValue("city", null);
    } else if (name === "state_iso_code") {
      setValue("state_iso_code",value);
      dispatch(
        getCitiesList(
          watch("country_code")?.value,
          watch("state_iso_code")?.label
        )
      );
      setValue("city", null);
    }
  }

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
                    {/* <CommonInput
                        // label={t("As Company")}
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        error={errors.name}
                        type="radio"
                        options={[{ label: "As Company", value: "as_company" }]}
                      /> */}
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
                  <CommonInput
                    label={t("Password")}
                    name="password"
                    control={control}
                    type={isPassword.firstPass ? "text" : "password"}
                    rules={{ validate: validatePassword }}
                    error={errors?.password}
                    isPassword
                    onTogglePassword={() =>
                      setPassword({
                        ...isPassword,
                        firstPass: !isPassword.firstPass,
                      })
                    }
                    icon={isPassword.firstPass ? <FaEyeSlash /> : <FaEye />}
                  />
                  <CommonInput
                    label={t("Confirm Password")}
                    name="confirm_password"
                    control={control}
                    type={isPassword.secondPass ? "text" : "password"}
                    rules={{ validate: validatePassword }}
                    error={errors?.confirm_password}
                    isPassword
                    onTogglePassword={() =>
                      setPassword({
                        ...isPassword,
                        secondPass: !isPassword.secondPass,
                      })
                    }
                    icon={isPassword.secondPass ? <FaEyeSlash /> : <FaEye />}
                  />
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

                  <CommonReactSelect
                    name="country_code"
                    errors={errors}
                    handleChange = {handleDropDownChange}
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
                    handleChange = {handleDropDownChange}
                    control={control}
                    // required="City is required"
                    label="City"
                    type="city"
                    watch={watch}
                    options={citiesList}
                  />
                  {/* <CommonReactSelect
                    name="time_zone"
                    errors={errors}
                    type="timezones"
                    control={control}
                    options={timeZones}
                    required="Time zone is required"
                    label="Time Zone"
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
                  <Form.Label>Image</Form.Label>
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
                          handleFileChange(e,field);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  <div>
                    {
                      selectedImage && 
                    <img
                      src={
                         selectedImage
                          && selectedImage
                      }
                      // alt="Selected"
                      className="uploaded-image"
                    />
                    }
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
