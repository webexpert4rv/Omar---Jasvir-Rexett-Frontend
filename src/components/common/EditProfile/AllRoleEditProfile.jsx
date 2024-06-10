import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { FaTrashCan } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import Autocomplete from "react-google-autocomplete";
import { filePreassignedUrlGenerate, getEnableDisableAccount } from "../../../redux/slices/clientDataSlice";
import { getDeveloperProfileDetails, updateDeveloperProfile } from "../../../redux/slices/developerDataSlice";
import ScreenLoader from "../../atomic/ScreenLoader";
import RexettButton from "../../atomic/RexettButton";
import ConfirmationModal from "../../../pages/views/Modals/ConfirmationModal";
import CommonInput from "../../atomic/CommonInput";
import CommonAutocomplete from "../../atomic/CommonAutoComplete";



const AllRoleEditProfile = () => {
  const userId = localStorage.getItem("userId");
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("inactive");
  const [isPassword, setPassword] = useState({
    firstPass: false,
    secondPass: false,
  });
  const [file, setFile] = useState(null);
  const { smallLoader, developerProfileData, screenLoader } = useSelector(
    (state) => state.developerData
  );
  const GOOGLE_MAP_API_KEY=process.env.REACT_APP_GOOGLE_MAP_API

  const handleJobStatusModal = () => {
    setStatus(!status);
    setShowModal(false);
  };
  console.log(status, "status");
  const handleToggle = () => {
    setStatus("active");
    setShowModal(true);
  };
  const handleAction = () => {
    let data = {
      user_id: +userId,
      status: status,
    };
    dispatch(getEnableDisableAccount(data));
  };

  useEffect(() => {
    dispatch(getDeveloperProfileDetails());
  }, [dispatch]);

  useEffect(() => {
    setValue("name", developerProfileData?.data?.name);
    setValue("email", developerProfileData?.data?.email);
    setValue("phone_number", developerProfileData?.data?.phone_number);
    setValue("address", developerProfileData?.data?.address);
    setValue("address_2", developerProfileData?.data?.address_2);
    setValue("city", developerProfileData?.data?.city);
    setValue("country", developerProfileData?.data?.country);
    setValue("passcode", developerProfileData?.data?.passcode);
    setValue("profile_picture", developerProfileData?.data?.profile_picture);
  }, [developerProfileData]);
  
  const disableProfile = <Tooltip id="tooltip">Disable your Account</Tooltip>;

  const onSubmit = (values) => {
    let formData = new FormData();
    let fileData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    fileData.append("file", file);
    if (file == null) {
      let data = {
        ...values,
        user_id: userId,
      };
      dispatch(updateDeveloperProfile(data));
    } else {
      dispatch(
        filePreassignedUrlGenerate(fileData, (url) => {
          let data = {
            ...values,
            profile_picture: url,
            user_id: userId,
          };
          // formData.append("file",data.s3_path);
          dispatch(updateDeveloperProfile(data));
        })
      );
    }
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
        <div>
          {screenLoader ? (
            <ScreenLoader />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row className="mb-4">
              <Col md="6">
                <div className="inner-form">
                  <CommonInput
                    label={t("clientName") + " *"}
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
                    label={t("previousPassword")}
                    name="previous_password"
                    control={control}
                    type={isPassword.firstPass ? "text" : "password"}
                    rules={{ validate: validatePassword }}
                    error={errors.previous_password}
                    isPassword
                    onTogglePassword={() => setPassword({ ...isPassword, firstPass: !isPassword.firstPass })}
                    icon={<FaEye />}
                  />
                  <CommonInput
                    label={t("newPassword")}
                    name="password"
                    control={control}
                    type={isPassword.secondPass ? "text" : "password"}
                    rules={{ validate: validatePassword }}
                    error={errors.password}
                    isPassword
                    onTogglePassword={() => setPassword({ ...isPassword, secondPass: !isPassword.secondPass })}
                    icon={<FaEye />}
                  />
                  <CommonAutocomplete
                    label={t("address") + " *"}
                    name="address"
                    control={control}
                    rules={{ required: "Address is required" }}
                    error={errors.address}
                    apiKey={GOOGLE_MAP_API_KEY}
                    onPlaceSelected={(place) => console.log(place)}
                    options={{ types: ["establishment", "geocode"] }}
                  />
                  <CommonAutocomplete
                    label={t("address") + " 2"}
                    name="address_2"
                    control={control}
                    rules={{ required: false }}
                    error={errors.address_2}
                    apiKey={GOOGLE_MAP_API_KEY}
                    onPlaceSelected={(place) => console.log(place)}
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
                    type="text"
                    rules={{
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
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
                        message: "City should not contain numbers or special characters",
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
                    control={control}
                    rules={{
                      required: "Country is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Country should not contain numbers or special characters",
                      },
                    }}
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
                  <Form.Label htmlFor="developer-image" className="upload-image-label d-block">
                    <HiUpload />
                    {t("uploadImage")}
                  </Form.Label>
                  <div>
                    <img
                      src={selectedImage ? selectedImage : developerProfileData?.data?.profile_picture}
                      alt="Selected"
                      className="uploaded-image"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <RexettButton
                type="submit"
                text={t("updateProfile")}
                className="main-btn px-5"
                variant="transparent"
                disabled={smallLoader}
                isLoading={smallLoader}
              />
            </div>
          </form>
          )}
        </div>
      <ConfirmationModal
        show={showModal}
        handleClose={handleJobStatusModal}
        onClick={handleAction}
        smallLoader={smallLoader}
        text={"Are you sure, you want to disable your account"}
      />
    </>
  );
};
export default AllRoleEditProfile;



