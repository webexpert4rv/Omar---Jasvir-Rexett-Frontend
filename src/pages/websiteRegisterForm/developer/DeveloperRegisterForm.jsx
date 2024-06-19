import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import CommonInput from "../../../components/atomic/CommonInput";
import ScreenLoader from "../../../components/atomic/ScreenLoader";
import CommonAutocomplete from "../../../components/atomic/CommonAutoComplete";
import RexettButton from "../../../components/atomic/RexettButton";
import CommonStep1 from "./CommonStep1";
import { getActiveStepURL, getCurrentStepInfo } from "./developeStepConstant";
import { getCoutriesList } from "../../../redux/slices/clientDataSlice";
import { postDeveloperStepData } from "../../../redux/slices/developerDataSlice";
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;
const DeveloperRegisterForm = ({ role }) => {
  const userId = localStorage.getItem("userId");
  const [activeStep, setActiveStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();
  const {
    register,
    watch = { watch },
    setValue,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const dispatch = useDispatch();

  // const [isPassword, setPassword] = useState({
  //   firstPass: false,
  //   secondPass: false,
  // });
  const [file, setFile] = useState(null);
  const { smallLoader, userProfileDetails, screenLoader, countries } =
    useSelector((state) => state.developerData);
  let { headingData, fields } = getCurrentStepInfo(activeStep);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(getCoutriesList());
    }
  }, [activeStep]);

  const disableProfile = <Tooltip id="tooltip">Disable your Account</Tooltip>;

  const validatePassword = (value) => {
    if (value === "") {
      return true; // Password is not required, so return true if empty
    } else {
      // Check if password matches the pattern
      const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!pattern.test(value)) {
        return "Password must contain at least a symbol, upper and lower case letters and a number";
      }
    }
    return true; // Password meets the criteria
  };

  const handleFileChange = (event) => {
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
  const increaseActiveStepCount = () => {
    setActiveStep((prev) => prev + 1);
  };
  const decreaseActiveStepCount = () => {
    setActiveStep((prev) => prev - 1);
  };
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
      case 2:
        return (
          <CommonStep1
            control={control}
            errors={errors}
            fields={fields}
            headingData={headingData}
            setValue={setValue}
            watch={watch}
            countries={countries}
          />
        );
    }
  };

  const onSubmit = (values) => {
    const URL = getActiveStepURL(activeStep)
    let payload = {}
    if(activeStep === 1) {
      payload = {
        ...values,
      }
    }
    postDeveloperStepData(URL,payload,increaseActiveStepCount)
  };

  return (
    <>
      <section className="card-box">
        <div>
          {screenLoader ? (
            <ScreenLoader />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {renderActiveStep()}
              {/* <Row className="mb-4">
                <Col md="6">
                  <div className="inner-form">
                    <div>
                      <CommonInput
                        // label={t("As Individual")}
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        error={errors.name}
                        type="radio"
                        options={[
                          { label: "As Individual", value: "as_individual" },
                        ]}
                      />
                      <CommonInput
                        // label={t("As Company")}
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        error={errors.name}
                        type="radio"
                        options={[{ label: "As Company", value: "as_company" }]}
                      />
                    </div>

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
                      readOnly
                    />
                    <CommonInput
                      label={t("Password")}
                      name="password"
                      control={control}
                      type={isPassword.firstPass ? "text" : "password"}
                      rules={{ validate: validatePassword }}
                      error={errors.previous_password}
                      isPassword
                      onTogglePassword={() =>
                        setPassword({
                          ...isPassword,
                          firstPass: !isPassword.firstPass,
                        })
                      }
                      icon={<FaEye />}
                    />
                    <CommonInput
                      label={t("Confirm Password")}
                      name="confirm_password"
                      control={control}
                      type={isPassword.secondPass ? "text" : "password"}
                      rules={{ validate: validatePassword }}
                      error={errors.password}
                      isPassword
                      onTogglePassword={() =>
                        setPassword({
                          ...isPassword,
                          secondPass: !isPassword.secondPass,
                        })
                      }
                      icon={<FaEye />}
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
                    <CommonInput
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
                    />
                    <CommonInput
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
                    />

                    <CommonInput
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
                    />

                    <CommonInput
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
                      error={errors.country}
                      selectOptions={countries}
                    />
                    <CommonInput
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
                      error={errors.country}
                    />

                    <CommonInput
                      label={t("image") + "*"}
                      name="profile_picture"
                      type="file"
                      control={control}
                      rules={{ required: false }}
                      onChange={(e) => handleFileChange(e)}
                      accept="image/*"
                    />
                    <Form.Label
                      htmlFor="developer-image"
                      className="upload-image-label d-block"
                    >
                      <HiUpload />
                      {t("uploadImage")}
                    </Form.Label>
                    <div>
                      <img
                        src={
                          selectedImage
                            ? selectedImage
                            : userProfileDetails?.data?.profile_picture
                        }
                        alt="Selected"
                        className="uploaded-image"
                      />
                    </div>
                  </div>
                </Col>
              </Row> */}
              <div className="text-center">
                {activeStep !== 1 && (
                  <RexettButton
                    type="button"
                    text="Back"
                    onClick={() => {
                      setActiveStep((prev) => prev - 1);
                    }}
                    className="main-btn outline-main-btn px-5"
                    // disabled={smallLoader}
                    // isLoading={smallLoader}
                  />
                )}
                <RexettButton
                  type="submit"
                  text={activeStep < 8 ? "Continue" : t("submit")}
                  className="main-btn px-5"
                  // onClick={() => {
                  //   setActiveStep((prev) => prev + 1);
                  // }}
                  // disabled={smallLoader}
                  // isLoading={smallLoader}
                />
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};
export default DeveloperRegisterForm;
