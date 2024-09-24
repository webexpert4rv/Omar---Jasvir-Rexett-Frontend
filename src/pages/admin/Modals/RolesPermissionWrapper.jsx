import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CommonInput from "../../../components/atomic/CommonInput";
import { useForm } from "react-hook-form";
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

// const PERMISSIONS = [
//   { label: "Workspace Admin", value: "workspace_admin" },
//   { label: "Admin", value: "admin" },
//   { label: "Support Assistance", value: "support_assistance" },
//   { label: "Maintainance", value: "maintainance" },
//   { label: "Accountant", value: "accountant" },
//   { label: "HR", value: "hr" },
//   { label: "Assistance", value: "assistance" }
// ];
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
  const [previewImg , setPreviewImage] = useState()



  console.log(isEdit, "editttt")
  console.log(allAdminEmployees, "allAdminEmployees")
  console.log(data, "data")
  console.log(id, "id---------")

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
    }else{
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
    setDetails(values);
    let fileData = new FormData();
    fileData.append("file", uploadedImage)
   
    dispatch(uploadFileToS3Bucket(fileData,(url) => {
      let payload = {
        first_name: values?.first_name,
        last_name: values?.last_name,
        email: values?.email,
        phone_number: values?.phone_number,
        profile_picture: url,
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
        if (modalName === "role") {
          let data = {
            description: "Role description here", // You can customize this description
            name: values?.role,
          };
          dispatch(newRoleCreate(data));
        } else {
           dispatch(newEmployeeCreate(payload));
        }
      }
      dispatch(getAllPermissionSeeder());
      handleClose();
      reset();
      setUploadedImage(null);
    }));
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
                {!previewImg && (
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
                )}
                {previewImg && (
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
                )}
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
                      error={errors.role}
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
                      error={errors.role}
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
                      error={errors.role}
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
                    error={errors.role}
                  />
                </Col>
                <Col lg={12}>
                  <CommonInput
                    label="Select Role"
                    name="role"
                    type="normal-select"
                    control={control}
                    defaultOption="Select Permission"
                    options={PERMISSIONS}
                    rules={{ required: "Role is required" }}
                    error={errors.role}
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
