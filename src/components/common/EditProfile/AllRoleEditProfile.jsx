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
import {
  filePreassignedUrlGenerate,
  getCitiesList,
  getCoutriesList,
  getEnableDisableAccount,
  getStatesList,
  getTimeZoneForCountry,
} from "../../../redux/slices/clientDataSlice";
import {
  getProfileDetails,
  updateDeveloperProfile,
} from "../../../redux/slices/developerDataSlice";
import ScreenLoader from "../../atomic/ScreenLoader";
import RexettButton from "../../atomic/RexettButton";
import ConfirmationModal from "../../../pages/views/Modals/ConfirmationModal";
import CommonInput from "../../atomic/CommonInput";
import CommonAutocomplete from "../../atomic/CommonAutoComplete";
import { getCurrentRoleEndPoint } from "./helper";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import CommonReactSelect from "../../atomic/CommonReactSelect";

const AllRoleEditProfile = ({ role }) => {
  const userId = localStorage.getItem("userId");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [twoFactorStatus, setTwoFactorStatus] = useState(false);
  const { allTimeZones, countriesList, statesList, citiesList, timeZones } =
    useSelector((state) => state.clientData);
  const { t } = useTranslation();
  // const [countryList,setCountryList] = useState([]);
  const {
    register,
    setValue,
    watch,
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
  const { smallLoader, userProfileDetails, screenLoader } = useSelector(
    (state) => state.developerData
  );
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

  const handleJobStatusModal = () => {
    setStatus(!status);
    setShowModal(false);
  };
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
    let subEndPoint = getCurrentRoleEndPoint(role);
    dispatch(getProfileDetails(subEndPoint));
    dispatch(getCoutriesList());
  }, [dispatch]);

  useEffect(() => {
    if (watch("country")?.value) {
      dispatch(getStatesList(watch("country")?.value));
      dispatch(getTimeZoneForCountry(watch("country")?.value));
      setValue("time_zone", null);
      setValue("state", null);
      // setValue("city",null);
    }
  }, [watch("country")]);

  useEffect(() => {
    if (watch("state")?.value) {
      dispatch(getCitiesList(watch("country")?.value, watch("state")?.label));
      setValue("city", null);
    }
  }, [watch("state")]);

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
      setValue("country", userProfileDetails?.data?.country);
      setValue("time_zone", userProfileDetails?.data?.time_zone);
      setValue("state", userProfileDetails?.data?.state);
      if (userProfileDetails?.data?.is_2FA_enabled) {
        setValue("is_2FA_enabled", userProfileDetails?.data?.is_2FA_enabled);
      } else {
        setValue("is_2FA_enabled", false);
      }
    }
  }, [userProfileDetails]);

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
        // country: values?.country?.label,
        // state: values?.state?.label,
        // time_zone: values?.time_zone?.label,
        // city :values?.city?.label
      };
      dispatch(updateDeveloperProfile(data));
    } else {
      dispatch(
        filePreassignedUrlGenerate(fileData, (url) => {
          let data = {
            ...values,
            profile_picture: url,
            user_id: userId,
            // country: values?.country?.label,
            // state: values?.state?.label,
            // time_zone: values?.time_zone?.label,
            // city :values?.city?.label
          };
          dispatch(updateDeveloperProfile(data));
          // dispatch(updateAdminProfile(formData))
          // dispatch(updateClientProfile(data));
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
  const toggleConfirmationModal = (e) => {
    const { checked } = e?.target;
    setShowConfirmationModal(!showConfirmationModal);
    setTwoFactorStatus(checked);
  };
  const closeConfirmationModal = () => setShowConfirmationModal(false);
  const handleTwoFaAction = () => {
    setValue("is_2FA_enabled", twoFactorStatus);
    closeConfirmationModal();
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
                    onTogglePassword={() =>
                      setPassword({
                        ...isPassword,
                        firstPass: !isPassword.firstPass,
                      })
                    }
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
                  <CommonAutocomplete
                    label={t("address") + " 2"}
                    name="address_2"
                    control={control}
                    rules={{ required: false }}
                    error={errors.address_2}
                    apiKey={GOOGLE_MAP_API_KEY}
                    onPlaceSelected={(place) => {
                      setValue("address_2", place.formatted_address);
                    }}
                    onChange={(e) => {
                      setValue("address_2", e.target.value);
                    }}
                    // value={watchCompanyDetails("company_address")}
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
                  <CommonReactSelect
                    name="country"
                    errors={errors}
                    // watch={watch}
                    control={control}
                    required="Country is required"
                    label="Country"
                    type="country"
                    options={countriesList}
                  />

                  <CommonReactSelect
                    name="state"
                    errors={errors}
                    control={control}
                    required="State is required"
                    label="State"
                    type="state"
                    options={statesList}
                  />
                  <CommonReactSelect
                    name="city"
                    errors={errors}
                    control={control}
                    // required="City is required"
                    label="City"
                    type="city"
                    options={citiesList}
                  />
                  <CommonReactSelect
                    name="time_zone"
                    errors={errors}
                    type="timezones"
                    control={control}
                    options={timeZones}
                    required="Time zone is required"
                    label="Time Zone"
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
                  {/* <CommonInput
                    label={t("country") + "*"}
                    name="country"
                    control={control}
                    rules={{
                      required: "Country is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "Country should not contain numbers or special characters",
                      },
                    }}
                    error={errors.country}
                  /> */}

                  {/* <CommonInput
                    label={t("image") + "*"}
                    name="profile_picture"
                    type="file"
                    control={control} 
                    rules={{ required: false }}
                    onChange={(e) => handleFileChange(e)}
                    accept="image/*"
                  /> */}
                  <Form.Label>Image*</Form.Label>
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
                        onChange={(e) => handleFileChange(e)}

                      />
                    )}
                  />
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
              <Col md="6">
                <Form.Group className="mb-3">
                  <Form.Label className="common-label">
                    Enable Two Factor Authentication
                  </Form.Label>
                  {/* <Form.Control> */}
                  <div class="form-check form-switch toggle-switch-wrapper">
                    <Controller
                      name="is_2FA_enabled"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          onChange={(e) => {
                            toggleConfirmationModal(e);
                          }}
                          checked={
                            watch("is_2FA_enabled") === true ? true : false
                          }
                          class="form-check-input toggle-switch-custom"
                          type="checkbox"
                          role="switch"
                        />
                      )}
                    />
                  </div>
                  {/* </Form.Control> */}
                </Form.Group>
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
      {showConfirmationModal && (
        <ConfirmationModal
          show={showConfirmationModal}
          handleClose={closeConfirmationModal}
          handleAction={handleTwoFaAction}
          smallLoader={smallLoader}
          text={`Are you sure, you want to ${
            twoFactorStatus ? "enable" : "disable"
          } two factor authentication`}
        />
      )}
    </>
  );
};
export default AllRoleEditProfile;
