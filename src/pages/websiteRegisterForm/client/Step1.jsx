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
import { getAllCountries } from "../../../redux/slices/authenticationDataSlice";

const Step1 = ({ register, errors, control, setValue, watch }) => {
  const userId = localStorage.getItem("userId");
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [isPassword, setPassword] = useState({
    firstPass: false,
    secondPass: false,
  });
  const [file, setFile] = useState(null);
  const { smallLoader, userProfileDetails, screenLoader, countries } =
    useSelector((state) => state.developerData);

  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;


  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  useEffect(() => {
    if (userProfileDetails?.data) {
      setValue("name", userProfileDetails?.data?.name);
      setValue("email", userProfileDetails?.data?.email);
      setValue("phone_number", userProfileDetails?.data?.phone_number);
      setValue("address", userProfileDetails?.data?.address);
      setValue("address_2", userProfileDetails?.data?.address_2);
      setValue("city", userProfileDetails?.data?.city);
      setValue("country", userProfileDetails?.data?.country);
      setValue("passcode", userProfileDetails?.data?.passcode);
    }
  }, [userProfileDetails]);

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

  return (
    <>
      <section className="card-box">
        <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
          <h2 className="section-head-sub mb-0 border-0">
            Add your Contact Details We are a Global tech talent and solutions
            provider. Join our platform and take advantage of the opportunity to
            enhance your talent acquisition journey with Rexett, all while
            enjoying significant savings of up to 72% on hiring staff. Join the
            ranks of over 100 satisfied clients who have chosen to partner with
            Rexett.
          </h2>
        </div>
        <div>
          {screenLoader ? (
            <ScreenLoader />
          ) : (
              <Row className="mb-4">
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
              </Row>

          )}
        </div>
      </section>
    </>
  );
};
export default Step1;
