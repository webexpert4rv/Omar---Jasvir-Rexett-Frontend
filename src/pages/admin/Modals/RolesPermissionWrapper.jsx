import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CommonInput from "../../../components/atomic/CommonInput";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPermissionSeeder,
  newRoleCreate,
  newEmployeeCreate
} from "../../../redux/slices/adminDataSlice";
import AddCandidate from "./AddCandidate";
import NewEmployee from "./NewEmployee";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import LocationSection from "../../websiteRegisterForm/developer/LocationSection";
import { getCoutriesList } from "../../../redux/slices/clientDataSlice";

const PERMISSIONS = [
  { label: "Workspace Admin", value: "workspace_admin" },
  { label: "Admin", value: "admin" },
  { label: "Support Assistance", value: "support_assistance" },
  { label: "Maintainance", value: "maintainance" },
  { label: "Accountant", value: "accountant" },
  { label: "HR", value: "hr" },
  { label: "Assistance", value: "assistance" }
];
const RolesPermissionWrapper = ({
  show,
  handleClose,
  children,
  heading,
  options,
  modalName,
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
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  console.log(modalName, "modalname");
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(()=>{
    dispatch(getCoutriesList());
  },[])
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };
  const removeImage = () => {
    setUploadedImage(null);
  };

  const onSubmit = async (values) => {
    setDetails(values);
    let payload = {
      first_name: values?.first_name,
      last_name: values?.last_name,
      email: values?.email,
      phone_number: values?.phone_number,
      profile_picture: uploadedImage,
      country: values?.country_code?.label,
      state: values?.state_iso_code?.label,
      city: values?.city,
      passcode: values?.passcode,
      time_zone: values?.time_zone?.value,
      role: values?.role
    };
    await dispatch(newEmployeeCreate(payload));
    dispatch(getAllPermissionSeeder());
    handleClose();
    reset();
    setUploadedImage(null);
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
                {!uploadedImage && (
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
                {uploadedImage && (
                  <div className="uploaded-img">
                    <img
                      src={uploadedImage}
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
                  {/* <Col lg={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="font-14 fw-medium">
                        Country *
                      </Form.Label>
                      <Form.Select className="common-field font-14">
                        <option>Select country</option>
                        <option>India</option>
                        <option>Sweden</option>
                        <option>USA</option>
                        <option>UK</option>
                        <option>UAE</option>
                        <option>Russia</option>
                        <option>Italy</option>
                        <option>Germany</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="font-14 fw-medium">
                        State *
                      </Form.Label>
                      <Form.Select className="common-field font-14">
                        <option>Select State</option>
                        <option>Bohuslän</option>
                        <option>Dalsland</option>
                        <option>Västergötland</option>
                        <option>Östergötland</option>
                        <option>Småland</option>
                        <option>Öland</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="font-14 fw-medium">
                        City *
                      </Form.Label>
                      <Form.Select className="common-field font-14">
                        <option>Select City</option>
                        <option>Stockholm</option>
                        <option>Gothenburg</option>
                        <option>Malmö</option>
                        <option>Linköping</option>
                        <option>Kiruna</option>
                        <option>Ystad</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="font-14 fw-medium">
                        Postal code *
                      </Form.Label>
                      <Form.Control
                        className="common-field font-14"
                        placeholder="E.g. 11115"
                      />
                    </Form.Group>
                  </Col> */}
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
              text={modalName == "permission" ? "Submit" : "Send Invite"}
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
