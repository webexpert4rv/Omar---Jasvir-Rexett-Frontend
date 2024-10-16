import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CommonInput from "../../../components/atomic/CommonInput";
import { Controller, useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPermissionSeeder,
  newRoleCreate,
  newEmployeeCreate,
  getAllAdminEmployees,
  updateEmployeeProfile,
} from "../../../redux/slices/adminDataSlice";
import AddCandidate from "./AddCandidate";
import NewEmployee from "./NewEmployee";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import LocationSection from "../../websiteRegisterForm/developer/LocationSection";
import { getCoutriesList, uploadFileToS3Bucket } from "../../../redux/slices/clientDataSlice";
import { GOOGLE_AUTOCOMPLETE_API_KEY } from "../../../components/clients/TimeReporiting/constant";
import CommonAutocomplete from "../../../components/atomic/CommonAutoComplete";
// const PERMISSIONS = [
//   { label: "Workspace Admin", value: "workspace_admin" },
//   { label: "Admin", value: "admin" },
//   { label: "Support Assistance", value: "support_assistance" },
//   { label: "Maintainance", value: "maintainance" },
//   { label: "Accountant", value: "accountant" },
//   { label: "HR", value: "hr" },
//   { label: "Assistance", value: "assistance" }
// ];

// const GOOGLE_MAP_API_KEY = "AIzaSyDRb_BGMWY3XocACa_K976a0g6y-5QwkqU"
const RolesPermissionWrapper = ({
  show,
  handleClose,
  children,
  heading,
  options,
  modalName,
  id,
  data,
  setIsEdit,
  isEdit
}) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
    watch,
    setError,
    setValue,
    clearErrors,
  } = useForm();
  const { smallLoader } = useSelector((state) => state.adminData);
  const { allPermissionList, allAdminEmployees } = useSelector((state) => state.adminData)
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewImg, setPreviewImage] = useState()


  let PERMISSIONS = allPermissionList?.roles?.map((val) => (
    { label: val?.name, value: val?.name }
  ))

  useEffect(() => {
    dispatch(getCoutriesList());
    dispatch(getAllAdminEmployees())
  }, [])

  useEffect(() => {
    if (isEdit === true) {
      setIsEdit(true)
      const [firstName, surname] = data?.name?.split(" ")
      setValue("first_name", firstName)
      setValue("last_name", surname)
      setValue("email", data?.email)
      setValue("passcode", data?.passcode)
      setValue("phone_number", data?.phone_number)
      setValue("role", data?.roles[0]?.name)
      setPreviewImage(data?.profile_picture)
      const newValue = {
        label: data?.country,
        value: data?.country_iso_code,
      };
      setValue("country_code", newValue)
      const timeZone = {
        label: data?.time_zone,
        value: data?.time_zone,
      }
      setValue("time_zone", timeZone)
    } else {
      reset()
      setPreviewImage(null);
    }
  }, [data, isEdit])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setPreviewImage(null);
  };

  const onSubmit = async (values) => {
    console.log(values, "values")
    if (modalName === "role") {
      let data = {
        description: "Role description here", // You can customize this description
        name: values?.role,
      };
      dispatch(newRoleCreate(data));
    }
    else {
      setDetails(values);
      let fileData = new FormData();
      fileData.append("file", uploadedImage)

      dispatch(uploadFileToS3Bucket(fileData, (url) => {
        let payload = {
          first_name: values?.first_name,
          last_name: values?.last_name,
          email: values?.email,
          phone_number: values?.phone_number,
          profile_picture: url,
          address: values?.address,
          country: values?.country_code?.label,
          country_iso_code: values?.country_code?.value,
          passcode: values?.passcode,
          time_zone: values?.time_zone?.value,
          role: values?.role,
        };

        if (isEdit) {
          console.log(payload, "payload for update");
          dispatch(updateEmployeeProfile(payload, id));
          dispatch(getAllAdminEmployees());
        } else {
          // if (modalName === "role") {
          //   let data = {
          //     description: "Role description here", // You can customize this description
          //     name: values?.role,
          //   };
          //   dispatch(newRoleCreate(data));
          // } else {
          dispatch(newEmployeeCreate(payload));
          // }
        }

      }));
    }
    dispatch(getAllPermissionSeeder());
    reset();
    setUploadedImage(null);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="custom-modal"
      animation
    >
      <Modal.Header closeButton className="popup-heading">
        {heading}
      </Modal.Header>

      <Modal.Body>
        {/* <h3 className="popup-heading">{heading}</h3> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {modalName == "employee" && (
            <>
              {/* <h3 className="popup-heading">New Employee</h3> */}

              <div className="text-center mb-3">
                {/* {!previewImg && (
                  <div className="upload-img">
                    <input
                      type="file"
                      className="d-none"
                      id="upload-imgbx"
                      onChange={handleImageUpload}
                    />
                    <label className="upload-img" htmlFor="upload-imgbx">
                      <span>
                        <IoCloudUploadOutline />
                      </span>
                      Upload image
                    </label>
                  </div>
                )} */}
                <Form.Group >
                  <Form.Control
                    type="file"
                    id="upload-imgbx"
                    name="profile_picture"
                    {...register("profile_picture", {
                      onChange: (e) => handleImageUpload(e),
                      required: {
                        value: true,
                        message: "Profile Picture is required",
                      },
                    })}
                    className="d-none" />



                  {/* <Form.Label htmlFor="upload-imgbx" className="upload-img">
                  {previewImg ? (
                    <div className="uploaded-img">
                      <img
                        src={previewImg}
                        className="img-uploaded"
                        alt="Uploaded"
                      />
                      <Button
                        variant="transparent"
                        className="shadow-none p-0 remove-upload-img"
                        onClick={removeImage}
                      >
                        <IoClose />
                      </Button>
                    </div>
                  :
                    
                    <span>
                      <IoCloudUploadOutline />
                    </span>
                    Upload Image
                  )}
                  </Form.Label> */}

                  <Form.Label htmlFor="upload-imgbx" className="upload-img">
                    {previewImg ? (
                      <div className="img-uploaded">
                        <img
                          src={previewImg}
                          className="img-uploaded"
                          alt="Uploaded"
                        />
                        <Button
                          variant="transparent"
                          className="shadow-none p-0 remove-upload-img"
                          onClick={removeImage}
                        >
                          <IoClose />
                        </Button>
                      </div>
                    ) : (
                      <span>
                        <IoCloudUploadOutline />
                        Upload Image
                      </span>
                    )}
                  </Form.Label>

                  {errors.profile_picture &&
                    <p className="error-message">
                      {errors.profile_picture.message}
                    </p>}

                </Form.Group>

              </div>
              <Row>
                <Col lg={6}>
                  <div className="mb-2">
                    <CommonInput
                      label="First Name *"
                      name="first_name"
                      type="text"
                      placeholder="eg : John Doe"
                      control={control}
                      rules={{ required: "First name is required" }}
                      error={errors.first_name}
                    />

                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-2">
                    <CommonInput
                      label="Last Name *"
                      name="last_name"
                      type="text"
                      placeholder="eg : Doe"
                      control={control}
                      rules={{ required: "Last name is required" }}
                      error={errors.last_name}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-2">
                    <CommonInput
                      label="Phone number *"
                      name="phone_number"
                      type="phone"
                      control={control}
                      rules={{ required: "Phone is required" }}
                      error={errors.phone_number}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <CommonInput
                    label="Email Address *"
                    name="email"
                    type="text"
                    placeholder="eg : john@gmail.com"
                    disabled={isEdit}
                    control={control}
                    rules={{ required: "Email is required" }}
                    error={errors.email}
                  />
                </Col>
                <Col lg={12}>
                  <CommonInput
                    label="Select Position"
                    name="position"
                    type="normal-select"
                    control={control}
                    defaultOption="Select Position"
                    options={PERMISSIONS}
                    rules={{ required: "Position is required" }}
                    error={errors.position}
                  />
                </Col>
                {/* <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="font-14 fw-medium">Address *</Form.Label>
                    <Controller
                      name="address"
                      rules={{
                        required: "Address is required",
                      }}
                      className="common-field font-14 "
                      control={control}
                      render={({ field, fieldState }) => (
                        <Autocomplete
                          {...field}
                          style={{ width: "500px" }}
                          errors={fieldState?.errors}
                          className="common-field font-14 font-14 w-100 p-2"
                          apiKey={GOOGLE_AUTOCOMPLETE_API_KEY}
                          onPlaceSelected={(place) => {
                            console.log(place);
                          }}
                          options={{
                            types: ["establishment", "geocode"],
                          }}
                        />
                      )}
                    />
                    {errors.address && (
                      <p className="error-message">
                        {errors.address.message}
                      </p>
                    )}
                  </Form.Group>
                </Col> */}
                <Col md={4}>
                  <CommonAutocomplete
                    label={"Address" + `${true && " *"}`}
                    name={"address"}
                    control={control}
                    rules={{ required: "Address is required" }}
                    invalidFieldRequired={true}
                    error={errors?.["address"]}
                    apiKey={"AIzaSyDRb_BGMWY3XocACa_K976a0g6y-5QwkqU"}
                    onPlaceSelected={async (place) => {
                      console.log(place,"place")
                      setValue("address", place?.formatted_address);
                      // Extract ZIP code from address components
                      if (!place.geometry) {
                        console.error("No geometry found for place:", place);
                        return; // Exit if geometry is not available
                      }
                      const { lat, lng } = place.geometry.location;
                      console.log("Latitude:", lat, "Longitude:", lng);
                      // Continue with your logic...
                    

                      const addressComponents = place?.address_components;
                      const zipCodeObj = addressComponents?.find(component =>
                        component.types.includes("postal_code")
                      )

                      const countryObj = addressComponents?.find(component =>
                        component.types.includes("country")
                      );
                      const country = countryObj ? countryObj.long_name : null;
                      setValue(`country_code`, country);
                      const zipCode = zipCodeObj ? zipCodeObj.long_name : null;
                      setValue('passcode', zipCode);
                      console.log(zipCodeObj, "zipCodeObj")
                      console.log(place, "place")

                      // const { lat, lng } = place.geometry.location;
                      // Call Google Timezone API to get the timezone
                      try {
                        const response = await fetch(
                          `https://maps.googleapis.com/maps/api/timezone/json?location=${lat()},${lng()}&timestamp=${Math.floor(Date.now() / 1000)}&key=${GOOGLE_AUTOCOMPLETE_API_KEY}`
                        );
                        const data = await response.json();
                        if (data.status === "OK") {

                          const rawOffset = data.rawOffset;  // Raw offset from the response (in seconds)
                          const dstOffset = data.dstOffset;   // DST offset (in seconds)
                          const totalOffset = rawOffset + dstOffset;  // Total offset (considering DST)

                          // Convert total offset from seconds to hours and minutes
                          const hours = Math.floor(totalOffset / 3600);
                          const minutes = Math.abs((totalOffset % 3600) / 60);

                          // Determine the UTC offset sign
                          const sign = hours >= 0 ? "+" : "-";

                          // Construct the formatted string
                          const utcOffsetString = `UTC ${sign}${Math.abs(hours)}:${minutes === 0 ? '00' : minutes}`;

                          // Use the timeZoneId from the response (Asia/Calcutta) and combine it with the UTC offse
                          const timezone = data.timeZoneId;
                          const formattedResponse = `${timezone} ${utcOffsetString}`;
                          setValue('time_zone', formattedResponse);
                        } else {
                          console.error("Error fetching timezone data: ", data.status);
                        }
                      } catch (error) {
                        console.error("Error calling Google Timezone API: ", error);
                      }
                    }}
                    onChange={(e) => {
                      console.log(e.target.value, "vall")
                      // setValue("address", e.target.value);
                    }}
                    options={{
                      types: ["establishment", "geocode"],
                    }}
                  />
                </Col>
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
              </Row>
            </>
          )}

          {modalName == "role" && (
            <Form.Group className="mb-4">
              <CommonInput
                label="Role Name"
                name="role"
                type="text"
                control={control}
                defaultValue={details}
                placeholder="Add new Role"
                rules={{ required: "Role is required" }}
                error={errors.role}
              />
            </Form.Group>
          )}

          {modalName == "permission" && (
            <Form.Group className="mb-4">
              <CommonInput
                label="Add File"
                name="role"
                type="file"
                control={control}
                defaultOption="Select Permission"
                options={options}
                rules={{ required: "Role is required" }}
                error={errors.role}
              />
            </Form.Group>
          )}

          <div className="text-center">
            <RexettButton
              type="submit"
              text={modalName == "permission" ? "Submit" : modalName == "role" ? "Submit" : "Send Invite"}
              className="main-btn px-4 font-14 fw-semibold"
              variant="transparent"
              isLoading={smallLoader}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default RolesPermissionWrapper;
