import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  Nav,
  Tab,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../components/atomic/RexettButton";
import {
  getClientProfile,
  updateClientProfile,
  getDeleteAccount,
  getEnableDisableAccount,
} from "../../redux/slices/clientDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { useTranslation } from "react-i18next";
import { FaTrashCan } from "react-icons/fa6";
import EndJobModal from "./Modals/EndJob";
import ConfirmationModal from "./Modals/ConfirmationModal";
import companyLogo from "../../assets/img/amazon.png";
import { IoIosCamera } from "react-icons/io";
import Autocomplete from "react-google-autocomplete";

const EditProfile = () => {
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("inactive");
  const [logo, setLogo] = useState(null);
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,

    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const {
    register: registerCompanyDetails,
    setValue: setCompanyDetails,
    handleSubmit: handleCompanyDetailSubmit,
    formState: { errors: companyDetailErrors },
    watch: watchCompanyDetails,
    setError: setCompanyDetailsError,
    setValue: setCompanyDetailsValue,
    clearErrors: clearCompanyDetailsErrors,
  } = useForm({});
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isPassword, setPassword] = useState({
    firstPass: false,
    secondPass: false,
  });
  const { smallLoader, clientProfileDetails, screenLoader, approvedLoader } =
    useSelector((state) => state.clientData);

  useEffect(() => {
    dispatch(getClientProfile());
  }, [dispatch]);

  useEffect(() => {
    setValue("name", clientProfileDetails?.data?.name);
    setValue("email", clientProfileDetails?.data?.email);
    setValue("phone_number", clientProfileDetails?.data?.phone_number);
    setValue("address", clientProfileDetails?.data?.address);
    setValue("address_2", clientProfileDetails?.data?.address_2);
    setValue("city", clientProfileDetails?.data?.city);
    setValue("country", clientProfileDetails?.data?.country);
    setValue("passcode", clientProfileDetails?.data?.passcode);
    if (clientProfileDetails?.company_logo) {
      setLogo(clientProfileDetails?.company_logo);
    }
    const companyDetailsKeys = [
      "company_name",
      "company_address",
      "company_tax_id",
      "company_type",
    ];
    companyDetailsKeys.map((key) => {
      if (clientProfileDetails[key]) {
        setValue(key, clientProfileDetails[key]);
      }
    });
  }, [clientProfileDetails]);

  const onSubmit = (values) => {
    localStorage.setItem("newUserName", values?.name);
    let formData = {
      ...values,
      password: values.password ? values.password : null,
      previous_password: values.previous_password
        ? values.previous_password
        : null,
    };
    dispatch(updateClientProfile(formData), () => {
      dispatch(getClientProfile());
    });
  };
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
    dispatch(getEnableDisableAccount(data, handleJobStatusModal));
  };
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
    return true;
  };
  const onCompanyDetailSubmit = (data) => {
    const clientProfileDetails = watch();
    const payload = {
      ...data,
      ...clientProfileDetails,
      password: clientProfileDetails.password
        ? clientProfileDetails.password
        : null,
      previous_password: clientProfileDetails.previous_password
        ? clientProfileDetails.previous_password
        : null,
      company_logo: logo ? logo : null,
    };
    console.log(payload, "payload");
    dispatch(updateClientProfile(payload));
  };
  const handleCompanyLogo = (e) => {
    const file = e?.target?.files?.[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/svg"];
    if (file) {
      if (allowedTypes.includes(file.type)) {
        const fileUrl = URL.createObjectURL(file);
        setCompanyDetailsValue("company_logo", fileUrl);
        setLogo(fileUrl);
        clearCompanyDetailsErrors("company_logo");
      } else {
        setCompanyDetailsError("company_logo", {
          type: "manual",
          message:
            "Please select a valid image file i.e (.png,.jpg,.svg or jpeg)",
        });
        setLogo(null);
        setCompanyDetailsValue("company_logo", null);
      }
    }
  };
  return (
    <>
      <section className="card-box">
        <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
          <h2 className="section-head-sub mb-0 border-0">
            {t("updateYourProfile")}
          </h2>
          <OverlayTrigger placement="bottom" overlay={disableProfile}>
            <div class="form-check form-switch toggle-switch-wrapper">
              <input
                class="form-check-input toggle-switch-custom"
                type="checkbox"
                role="switch"
                onClick={handleToggle}
                checked
              />
            </div>
          </OverlayTrigger>
        </div>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="personal_details"
        >
          <Nav variant="pills" className="mb-4 application-pills">
            <Nav.Item className="application-item">
              <Nav.Link
                className="application-link"
                eventKey="personal_details"
              >
                Personal Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="application-item">
              <Nav.Link className="application-link" eventKey="company_details">
                Company Details
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="personal_details">
              <div>
                {screenLoader ? (
                  <ScreenLoader />
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row className="mb-4">
                      <Col md="6">
                        <div className="inner-form">
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("clientName")} *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="common-field"
                              name="name"
                              {...register("name", {
                                required: {
                                  value: true,
                                  message: "Name is required",
                                },
                              })}
                            />
                            <p className="error-message">
                              {errors.name?.message}
                            </p>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("email")} *
                            </Form.Label>
                            <Form.Control
                              readOnly
                              type="text"
                              className="common-field"
                              name="email"
                              {...register("email", {
                                required: {
                                  value: true,
                                  message: "Email is required",
                                },
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email format",
                                },
                              })}
                            />
                            <p className="error-message">
                              {errors.email?.message}
                            </p>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("phone")} *
                            </Form.Label>
                            <Form.Control
                              type="tel"
                              className="common-field"
                              name="phone_number"
                              {...register("phone_number", {
                                required: {
                                  value: true,
                                  message: "Phone Number is required",
                                },
                                pattern: {
                                  value: /^[0-9]{10}$/,
                                  message: "Please enter a valid phone number",
                                },
                              })}
                            />
                            <p className="error-message">
                              {errors.phone_number?.message}
                            </p>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("previousPassword")}
                            </Form.Label>
                            <div className="position-relative">
                              <Form.Control
                                type={
                                  isPassword.firstPass ? "text" : "password"
                                }
                                className="common-field"
                                name="previous_password"
                                {...register("previous_password", {
                                  validate: validatePassword,
                                })}
                              />
                              <span
                                className="eye-btn"
                                onClick={() =>
                                  setPassword({
                                    ...isPassword,
                                    firstPass: !isPassword.firstPass,
                                  })
                                }
                              >
                                <FaEye />
                              </span>
                            </div>
                            <p className="error-message">
                              {errors.previous_password?.message}
                            </p>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("newPassword")}
                            </Form.Label>
                            <div className="position-relative">
                              <Form.Control
                                type={
                                  isPassword.secondPass ? "text" : "password"
                                }
                                className="common-field"
                                name="password"
                                {...register("password", {
                                  validate: validatePassword,
                                })}
                              />
                              <span
                                className="eye-btn"
                                onClick={() =>
                                  setPassword({
                                    ...isPassword,
                                    secondPass: !isPassword.secondPass,
                                  })
                                }
                              >
                                <FaEye />
                              </span>
                            </div>
                            <p className="error-message">
                              {errors.password?.message}
                            </p>
                          </Form.Group>
                        </div>
                      </Col>
                      <Col md="6">
                        <div>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("address")} *
                            </Form.Label>
                            <Controller
                              name="address"
                              rules={{
                                required: "Address is required",
                              }}
                              className="common-field "
                              control={control}
                              render={({ field, fieldState }) => (
                                <Autocomplete
                                  style={{ width: "500px" }}
                                  errors={fieldState?.errors}
                                  className="common-field font-14 w-100 p-2"
                                  apiKey={
                                    "AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc"
                                  }
                                  onPlaceSelected={(place) => {
                                    console.log(place);
                                  }}
                                  options={{
                                    types: ["establishment", "geocode"],
                                  }}
                                />
                              )}
                            />
                            {errors?.address && (
                              <p className="error-message">
                                {errors.address?.message}
                              </p>
                            )}
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("address")} 2
                            </Form.Label>
                            <Controller
                              name="address_2"
                              className="common-field "
                              rules={{
                                required: "Address 2 is required",
                              }}
                              control={control}
                              render={({ field, fieldState }) => (
                                <Autocomplete
                                  style={{ width: "500px" }}
                                  errors={fieldState?.errors}
                                  className="common-field font-14 w-100 p-2"
                                  apiKey={
                                    "AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc"
                                  }
                                  onPlaceSelected={(place) => {
                                    console.log(place);
                                  }}
                                  options={{
                                    types: ["establishment", "geocode"],
                                  }}
                                />
                              )}
                            />
                            {errors?.address_2 && (
                              <p className="error-message">
                                {errors.address_2?.message}
                              </p>
                            )}
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("city")} *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="common-field"
                              name="city"
                              {...register("city", {
                                required: {
                                  value: true,
                                  message: "City is required",
                                },
                                pattern: {
                                  value: /^[A-Za-z\s]+$/,
                                  message:
                                    "City should not contain numbers or special character",
                                },
                              })}
                            />
                            <p className="error-message">
                              {errors.city?.message}{" "}
                            </p>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("postCode")} *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="common-field"
                              name="passcode"
                              {...register("passcode", {
                                required: {
                                  value: true,
                                  message: "Pass code is required",
                                },
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message:
                                    "Passcode should only contain numbers",
                                },
                              })}
                            />
                            <p className="error-message">
                              {errors.passcode?.message}{" "}
                            </p>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label className="common-label">
                              {t("country")} *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="common-field"
                              name="country"
                              {...register("country", {
                                required: {
                                  value: true,
                                  message: "Country is required",
                                },
                                pattern: {
                                  value: /^[A-Za-z\s]+$/,
                                  message:
                                    "Country should not contain numbers or special character",
                                },
                              })}
                            />
                            <p className="error-message">
                              {errors.country?.message}{" "}
                            </p>
                          </Form.Group>
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
            </Tab.Pane>
            <Tab.Pane eventKey="company_details">
              <div>
                <form
                  onSubmit={handleCompanyDetailSubmit(onCompanyDetailSubmit)}
                >
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-4">
                        <Form.Label className="common-label">
                          Company Logo
                        </Form.Label>
                        <Form.Control
                          {...registerCompanyDetails(
                            "company_logo",
                            (onchange = (e) => {
                              handleCompanyLogo(e);
                            })
                          )}
                          type="file"
                          id="company_logo_file"
                          placeholder="Company Name"
                          className="common-field d-none"
                        />
                        <div className="file_shown">
                          <img src={logo ? logo : companyLogo} />
                          <Form.Label
                            htmlFor="company_logo_file"
                            className="camera-btn mb-0"
                          >
                            <IoIosCamera />
                          </Form.Label>
                        </div>
                        {companyDetailErrors?.company_logo && (
                          <p className="error-message">
                            {companyDetailErrors.company_logo?.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          Company Name*
                        </Form.Label>
                        <Form.Control
                          {...registerCompanyDetails("company_name", {
                            required: "Company name is required",
                          })}
                          type="text"
                          placeholder="Company Name"
                          className="common-field"
                        />
                        {companyDetailErrors?.company_name && (
                          <p className="error-message">
                            {companyDetailErrors.company_name?.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          Type of Company*
                        </Form.Label>
                        <Form.Select
                          {...registerCompanyDetails("company_type", {
                            required: "Company type is required",
                          })}
                          className="common-field"
                        >
                          <option disabled selected value="">
                            Please select company type
                          </option>
                          <option value="sole_partnership">
                            Sole Partnership
                          </option>
                          <option value="partnership">Partnership</option>
                          <option value="limited_liability_company(LLC)">
                            Limited Liability Company(LLC)
                          </option>
                          <option value="corporation">Corporation</option>
                          <option value="nonprofit_organization">
                            Nonprofit Organization
                          </option>
                          <option value="cooperative">Cooperative</option>
                          <option value="franchise">Franchise</option>
                          <option value="joint_venture">Joint Venture</option>
                        </Form.Select>
                        {companyDetailErrors?.company_type && (
                          <p className="error-message">
                            {companyDetailErrors.company_type?.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          Company Address*
                        </Form.Label>
                        {/* <Form.Control
                          {...registerCompanyDetails("company_address", {
                            required: "Company address is required",
                          })}
                          type="text"
                          placeholder="Company Address"
                          className="common-field"
                        /> */}
                        <Controller
                          name="company_address"
                          className="common-field "
                          control={control}
                          rules={{
                            required: "Address is required",
                          }}
                          render={({ field, fieldState }) => (
                            <Autocomplete
                              style={{ width: "500px" }}
                              errors={fieldState?.errors}
                              className="common-field font-14 w-100 p-2"
                              apiKey={"AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc"}
                              onPlaceSelected={(place) => {
                                console.log(place);
                              }}
                              options={{
                                types: ["establishment", "geocode"],
                              }}
                            />
                          )}
                        />
                        {companyDetailErrors?.company_address && (
                          <p className="error-message">
                            {companyDetailErrors.company_address?.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          Tax ID*
                        </Form.Label>
                        <Form.Control
                          {...registerCompanyDetails("company_tax_id", {
                            required: "Company tax id is required",
                          })}
                          type="text"
                          placeholder="Tax Id"
                          className="common-field"
                        />
                        {companyDetailErrors?.company_tax_id && (
                          <p className="error-message">
                            {companyDetailErrors.company_tax_id?.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <div className="text-center">
                        <RexettButton
                          type="submit"
                          text={t("updateProfile")}
                          className="main-btn px-5 mt-4"
                          variant="transparent"
                          disabled={smallLoader}
                          isLoading={smallLoader}
                        />
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </section>
      <ConfirmationModal
        show={showModal}
        handleClose={handleJobStatusModal}
        onClick={handleAction}
        approvedLoader={approvedLoader}
        text={"Are you sure, you want to disable your account"}
      />
      {/* <EndJobModal show={showModal} handleClose={handleJobStatusModal} onClick={handleJobStatusAction} smallLoader={smallLoader} header={"Delete your Account"} feedbacks= {"Reasons"} submit={"Delete"} /> */}
    </>
  );
};
export default EditProfile;
