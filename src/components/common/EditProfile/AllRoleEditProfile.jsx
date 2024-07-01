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
  updateClientProfile,
} from "../../../redux/slices/clientDataSlice";
import {
  getProfileDetails,
  updateDeveloperProfile,
  updateProfileDetails,
} from "../../../redux/slices/developerDataSlice";
import ScreenLoader from "../../atomic/ScreenLoader";
import RexettButton from "../../atomic/RexettButton";
import ConfirmationModal from "../../../pages/views/Modals/ConfirmationModal";
import CommonInput from "../../atomic/CommonInput";
import CommonAutocomplete from "../../atomic/CommonAutoComplete";
import { getCurrentRoleEndPoint, updateCurrentRoleEndPoint } from "./helper";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import CommonReactSelect from "../../atomic/CommonReactSelect";
import { getConfigDetails, getUploadFile, updateAdminProfile } from "../../../redux/slices/adminDataSlice";

const AllRoleEditProfile = ({ role }) => {
  const userId = localStorage.getItem("userId");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [twoFactorStatus, setTwoFactorStatus] = useState(false);
  const { allTimeZones, countriesList, statesList, citiesList, timeZones } =
    useSelector((state) => state.clientData);
  const { t } = useTranslation();
  // const [countryList,setCountryList] = useState([]);

  console.log(countriesList, "countriesList")
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
      setValue("city",null);
    }
  }, [watch("country")]);

  useEffect(() => {
    if (watch("state")?.value) {
      dispatch(getCitiesList(watch("country")?.value, watch("state")?.value));
      setValue("city", null);
    }
  }, [watch("state")]);

  // useEffect(()=>{
  //   if(role==="admin"){
  //     dispatch(getConfigDetails())
  //   }
  // },[role ,dispatch])

  useEffect(() => {
    if (userProfileDetails?.data) {
      setValue("name", userProfileDetails?.data?.name);
      setValue("email", userProfileDetails?.data?.email);
      setValue("phone_number", userProfileDetails?.data?.phone_number);
      setValue("address", userProfileDetails?.data?.address);
      setValue("address_2", userProfileDetails?.data?.address_2);
      setValue("city", { label: userProfileDetails?.data?.city, value: null });
      setValue("country", { label: userProfileDetails?.data?.country, value: null });
      setValue("passcode", userProfileDetails?.data?.passcode);
      setValue("time_zone", { label: userProfileDetails?.data?.time_zone, value: userProfileDetails?.data?.time_zone });
      setValue("state", { label: userProfileDetails?.data?.state, value: null });
      if (userProfileDetails?.data?.is_2FA_enabled) {
        setValue("is_2FA_enabled", userProfileDetails?.data?.is_2FA_enabled);
      } else {
        setValue("is_2FA_enabled", false);
      }
    }
  }, [userProfileDetails]);


  const onSubmit = async (values) => {
    if (role === "admin") {
      let data = {
        ...values,
        company_name: values.name,
        company_address: values?.address,
        company_tex_id: values?.tax_id,
        company_contact_number: values?.phone_number,
        company_email: values?.email,
        company_time_zone: values?.time_zone,
      }
      await dispatch(getUploadFile(data))
      dispatch(getConfigDetails())

    }else{
    let currentRoleUpdateProfile = updateCurrentRoleEndPoint(role)
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
        country: values?.country?.label,
        country_iso_code: values?.country.value,
        state: values?.state?.label,
        state_iso_code: values?.state?.value,
        time_zone: values?.time_zone?.label,
        city: values?.city?.label
      };
      // dispatch(updateDeveloperProfile(data));
      // dispatch(updateAdminProfile(data))
      dispatch(updateProfileDetails(data, currentRoleUpdateProfile))
    } else {
      dispatch(filePreassignedUrlGenerate(fileData, (url) => {
        let data = {
          ...values,
          profile_picture: url,
          user_id: userId,
          country: values?.country?.label,
          country_iso_code: values?.country.value,
          state: values?.state?.label,
          state_iso_code: values?.state?.value,
          time_zone: values?.time_zone?.label,
          city: values?.city?.label
        }
        dispatch(updateProfileDetails(data, currentRoleUpdateProfile))
      })
      );
    }
  };
}
  const validatePassword = (value) => {
    if (value === "") {
      return true; 
    } else {
      const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!pattern.test(value)) {
        return "Password must contain at least a symbol, upper and lower case letters and a number";
      }
    }
    return true; 
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
              <Col md="12" className="mb-3">
                <h5 className="fw-semibold mb-3">Security</h5>
                <Form.Group className="mb-3">
                  <Row className="gx-4">
                    <Col md={8}>
                      <Form.Label className="common-label font-16 fw-semibold mb-0">
                        Enable Two Factor Authentication
                      </Form.Label>
                      <p className="font-14 mb-0">Two-Factor Authentication (2FA) is a security process in which users provide two different authentication factors to verify their identity. This method adds an additional layer of security, making it more difficult for unauthorized individuals to access your accounts.</p>
                    </Col>
                    <Col md={4}>
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
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              {role === 'admin' ? <Col md="12">
                <h5 className="fw-semibold mb-3">Company Information</h5>
              </Col> : <Col md="12">
                <h5 className="fw-semibold mb-3">Personal Information</h5>
              </Col>}
              <Col md="6">
                <div className="inner-form">
                  <CommonInput
                    label={t("name") + " *"}
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
              
              {role === "admin" &&
                <>
                    <div>
                      <CommonInput
                        label={t("Tax ID") + " *"}
                        name="tax_id"
                        control={control}
                        rules={{ required: "Tax Id is required" }}
                        error={errors.tax_id}
                      />
                    </div>
                    <div >
                      <CommonInput
                        label={t("CIN Number") + " *"}
                        name="cin_number"
                        control={control}
                        rules={{ required: "CIN Number is required" }}
                        error={errors.cin_number}
                      />
                    </div>
                </>
              }
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
          text={`Are you sure, you want to ${twoFactorStatus ? "enable" : "disable"
            } two factor authentication`}
        />
      )}
    </>
  );
};
export default AllRoleEditProfile;
