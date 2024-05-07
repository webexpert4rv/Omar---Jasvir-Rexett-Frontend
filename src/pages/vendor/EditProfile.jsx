import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Tabs, Tab, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getVenderProfile,
  updateVendorProfile,
} from "../../redux/slices/vendorDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { useTranslation } from "react-i18next";
import { getDeleteAccount } from "../../redux/slices/clientDataSlice";
import { FaTrashCan } from "react-icons/fa6";
import EndJobModal from "./../views/Modals/EndJob";


const EditVendorProfile = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false)
  const { vendorProfile, screenLoader, smallLoader } = useSelector(
    (state) => state.vendorData
  );
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    trigger,
    setError,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation()
  const [password, setPassword] = useState({
    firstPass: false,
    secondPass: false,
    thirdPass: false,
    fourthPass: false,
  })
  console.log(vendorProfile?.company?.trun_around_time_to_close_permanent_position, "vendorProfile")


  useEffect(() => {
    setValue("vendor_name", vendorProfile?.name);
    setValue("email", vendorProfile?.email);
    setValue("phone_number", vendorProfile?.phone_number);
    setValue("address", vendorProfile?.address);
    setValue("address_2", vendorProfile?.address_2);
    setValue("city", vendorProfile?.city);
    setValue("country", vendorProfile?.country);
    setValue("passcode", vendorProfile?.passcode);
    setValue("company_name", vendorProfile?.company?.name);
    setValue("company_email", vendorProfile?.company?.email);
    setValue("company_address", vendorProfile?.company?.address);
    setValue("company_phone_number", vendorProfile?.company?.phone_number);
    setValue("success_story", vendorProfile?.company?.success_story);
    setValue("total_employees", vendorProfile?.company?.total_employees);
    setValue("company_city", vendorProfile?.company?.city);
    setValue("company_country", vendorProfile?.company?.country);
    setValue("country_code", vendorProfile?.company?.country_code);
    setValue("state", vendorProfile?.company?.state);
    setValue("establishment_year", vendorProfile?.company?.establishment_year);
    setValue("gst_number", vendorProfile?.company?.gst_number);
    setValue("total_it_recruiter", vendorProfile?.company?.total_it_recruiter);
    setValue("turn_around_time_to_close_contract_position", vendorProfile?.company?.trun_around_time_to_close_contract_position);
    setValue("turn_around_time_to_close_permanent_position", vendorProfile?.company?.trun_around_time_to_close_permanent_position);
    setValue("type_of_company", vendorProfile?.company?.type_of_company);
    setValue("website", vendorProfile?.company?.website);
    setValue("yearly_revenue", vendorProfile?.company?.yearly_revenue);
    setValue("type_of_establishment", vendorProfile?.company?.type_of_establishment);
    setValue("post_code", vendorProfile?.company?.post_code);
    setValue("service_offering", vendorProfile?.company?.service_offering);
    setValue("specialization", vendorProfile?.company?.specialization);
    setValue("proprietor_name", vendorProfile?.company?.proprietor_name);
    setValue("proprietor_contact_number", vendorProfile?.company?.proprietor_contact_number);
    setValue("proprietor_email", vendorProfile?.company?.proprietor_email);
    setValue("proprietor_contact_person_name", vendorProfile?.company?.proprietor_contact_person_name);
    setValue("proprietor_contact_person_phone_number", vendorProfile?.company?.proprietor_contact_person_phone_number);
    setValue("proprietor_contact_person_email", vendorProfile?.company?.proprietor_contact_person_email);




  }, [vendorProfile]);

  useEffect(() => {
    dispatch(getVenderProfile());
  }, []);



  const handleJobStatusModal = (id) => {
    setShowModal(!showModal)
  }


  // const handleJobStatusAction = (e, data) => {
  //   console.log(data, "data")
  //   e.preventDefault()
  //   dispatch(getDeleteAccount(data))
  //   setShowModal(false)
  // }
  const deleteprofile = (
    <Tooltip id="tooltip">
      Delete Profile
    </Tooltip>
  );

  const onSubmit = (values) => {
    console.log(values, "vennnnnnnndor")
    localStorage.setItem("vendorName", values?.vendor_name)
    let payload = {
      name: values.vendor_name,
      email: values.email,
      previous_password: values.previous_password,
      password: values.password,
      phone_number: values.phone_number,
      address: values.address,
      address_2: values.address_2,
      city: values.city,
      passcode: values.passcode,
      country: values.country,
      company: {
        name: values.company_name,
        email: values.email, // Example email, replace with actual value
        country_code: values.company_country_code,
        phone_number: values.company_phone_number,
        type_of_company: values.type_of_company,
        city: values.company_city,
        state: values.company_state,
        country: values.company_country,
        post_code: values.company_post_code,
        establishment_year: values.establishment_year,
        type_of_establishment: values.type_of_establishment,
        total_employees: values.total_employees,
        total_it_recruiter: values.total_it_recruiter,
        yearly_revenue: values.yearly_revenue,
        website: values.website,
        gst_number: values.gst_number,
        service_offering: values.service_offering,
        specialization: values.specialization,
        turn_around_time_to_close_contract_position:
          values.turn_around_time_to_close_contract_position,
        turn_around_time_to_close_permanent_position:
          values.turn_around_time_to_close_permanent_position,
        success_story: values.success_story,
        proprietor_name: values.proprietor_name,
        proprietor_contact_number: values.proprietor_contact_number,
        proprietor_email: values.proprietor_email, // Example email, replace with actual value
        proprietor_contact_person_name: values.proprietor_contact_person_name,
        proprietor_contact_person_phone_number:
          values.proprietor_contact_person_phone_number,
      },
    };

    dispatch(updateVendorProfile(payload));
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
    return true;
  };

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <>
          <section className="card-box">
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <div className="d-flex justify-content-between pb-2 mb-3 border-bottom-grey">
                  <h2 className="section-head-sub mb-0 border-0">{t("updateYourProfile")}</h2>
                  {/* <OverlayTrigger placement="bottom" overlay={deleteprofile}>
                    <Button onClick={() => handleJobStatusModal(vendorProfile?.data?.id)} className="delete-btn"><FaTrashCan /></Button>
                  </OverlayTrigger> */}
                </div>
                <Row className="mb-4">
                  <Col md="6">
                    <div className="inner-form">
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("vendorName")} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="vendor_name"
                          placeholder={t("enterVendorName")}
                          {...register(`vendor_name`, {
                            required: t("nameValidation"),
                          })}
                        />
                        {errors?.vendor_name && (
                          <p className="error-message">
                            {errors.vendor_name.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("email")} *
                        </Form.Label>
                        <div>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="email"
                            placeholder={t("enterEmail")}
                            {...register(`email`, {
                              required: t("emailValidation"),
                            })}
                          />
                          {errors?.email && (
                            <p className="error-message">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("previousPassword")}
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={password.firstPass ? "text" : "password"}
                            className="cv-field"
                            name="password"
                            placeholder={t("enterPassword")}
                            {...register("previous_password", {
                              validate: validatePassword
                            })}
                          />
                          <p className="error-message">
                            {errors.previous_password?.message} </p>
                          <span
                            className="eye-btn"
                            onClick={() =>
                              setPassword({
                                ...password,
                                firstPass: !password.firstPass,
                              })
                            }
                          >
                            <FaEye />
                          </span>
                        </div>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("newPassword")}
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={password.secondPass ? "text" : "password"}
                            className="cv-field"
                            name="new_password"
                            placeholder={t("enterNewPassword")}
                          // {...register(`new_password`, {
                          //   required: t("newPasswordValidation"),
                          // })}
                          />
                          <span
                            className="eye-btn"
                            onClick={() =>
                              setPassword({
                                ...password,
                                secondPass: !password.secondPass,
                              })
                            }
                          >
                            <FaEye />
                          </span>
                        </div>
                        {/* {errors?.new_password && (
                            <p className="error-message">
                              {errors.new_password.message}
                            </p>
                          )} */}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("phoneNumber")} *
                        </Form.Label>
                        <Form.Control
                          type="number"
                          className="cv-field"
                          name="phone_number"
                          placeholder={t("enterPhoneNumber")}
                          {...register(`phone_number`, {
                            required: t("phoneNumberValidation"),
                          })}
                        />
                        {errors?.phone_number && (
                          <p className="error-message">
                            {errors.phone_number.message}
                          </p>
                        )}
                      </Form.Group>
                    </div>
                  </Col>
                  <Col md="6">
                    <div>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("address")} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="address"
                          placeholder={t("enterAddress")}
                          {...register(`address`, {
                            required: t("addressValidation"),
                          })}
                        />
                        {errors?.address && (
                          <p className="error-message">
                            {errors.address.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">{t("city")} *</Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="city"
                          placeholder={t("enterCity")}
                          {...register(`city`, {
                            required: t("cityValidation"),
                          })}
                        />
                        {errors?.city && (
                          <p className="error-message">
                            {errors.city.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("postCode")} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="passcode"
                          placeholder={t("enterPostCode")}
                          {...register(`passcode`, {
                            required: t("postCodeValidation"),
                          })}
                        />
                        {errors?.passcode && (
                          <p className="error-message">
                            {errors.passcode.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("country")} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="country"
                          placeholder={t("enterCountryName")}
                          {...register(`country`, {
                            required: t("countryValidation"),
                          })}
                        />
                        {errors?.country && (
                          <p className="error-message">
                            {errors.country.message}
                          </p>
                        )}
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <h2 className="section-head mb-4">{t("updateCompanyProfile")}</h2>

                <Row className="mb-4">
                  <Col md="6">
                    <div className="inner-form">
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("companyName")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="company_name"
                          placeholder={t("enterCompanyName")}
                          {...register(`company_name`, {
                            required: t("compnyNameValidation"),
                          })}
                        />
                        {errors?.company_name && (
                          <p className="error-message">
                            {errors.company_name.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("typeOfCompany")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="type_of_company"
                          placeholder={t("enterCompanyType")}
                          {...register(`type_of_company`, {
                            required: t("compnyTypeValidation"),
                          })}
                        />
                        {errors?.type_of_company && (
                          <p className="error-message">
                            {errors.type_of_company.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("email")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="company_email"
                          placeholder={t("enterEmail")}
                          {...register(`company_email`, {
                            required: t("emailValidation"),
                          })}
                        />
                        {errors?.company_email && (
                          <p className="error-message">
                            {errors.company_email.message}
                          </p>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("address")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="company_address"
                          placeholder={t("enterAddress")}
                          {...register(`company_address`, {
                            required: t("addressValidation"),
                          })}
                        />
                        {errors?.company_address && (
                          <p className="error-message">
                            {errors.company_address.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("phoneNumber")}*
                        </Form.Label>
                        <Form.Control
                          type="number"
                          className="cv-field"
                          name="company_phone_number"
                          placeholder={t("enterPhoneNumber")}
                          {...register(`company_phone_number`, {
                            required: "Phone number is required",
                          })}
                        />
                        {errors?.company_phone_number && (
                          <p className="error-message">
                            {errors.company_phone_number.message}
                          </p>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("establishmentYear")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="establishment_year"
                          placeholder={t("establishmentYear")}
                          {...register(`establishment_year`, {
                            required: t("establishmentValidation"),
                          })}
                        />
                        {errors?.establishment_year && (
                          <p className="error-message">
                            {errors.establishment_year.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("typeOfEstablishment")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="type_of_establishment"
                          placeholder={t("enterTypeOfEstablishment")}
                          {...register(`type_of_establishment`, {
                            required: t("typeOfEstablishmentValidation"),
                          })}
                        />
                        {errors?.type_of_establishment && (
                          <p className="error-message">
                            {errors.type_of_establishment.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("website")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="website"
                          placeholder={t("enterWebsite")}
                          {...register(`website`, {
                            required: t("websiteValidation"),
                          })}
                        />
                        {errors?.website && (
                          <p className="error-message">
                            {errors.website.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("GSTNumber")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="gst_number"
                          placeholder={t("enterGSTNumber")}
                          {...register(`gst_number`, {
                            required: t("gstValidation"),
                          })}
                        />
                        {errors?.gst_number && (
                          <p className="error-message">
                            {errors.gst_number.message}
                          </p>
                        )}
                      </Form.Group>
                    </div>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label">
                        {t("successStory")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="cv-field"
                        name="success_story"
                        placeholder={t("enterSuccessStory")}
                        {...register(`success_story`, {
                          required: false,
                        })}
                      />
                      {errors?.success_story && (
                        <p className="error-message">
                          {errors.success_story.message}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label">
                        {t("yearlyRevenue")}
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="cv-field"
                        name="yearly_revenue"
                        placeholder={t("enterYearlyRevenue")}
                        {...register(`yearly_revenue`, {
                          required: false,
                        })}
                      />
                      {errors?.yearly_revenue && (
                        <p className="error-message">
                          {errors.yearly_revenue.message}
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md="6">

                    <Form.Group className="mb-3">
                      <Form.Label className="common-label">
                        {t("totalEmployees")}*
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="cv-field"
                        name="total_employees"
                        placeholder={t("totalEmployees")}
                        {...register(`total_employees`, {
                          required: t("totalEmployeesValidation"),
                        })}
                      />
                      {errors?.total_employees && (
                        <p className="error-message">
                          {errors.total_employees.message}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label">
                        {t("totalITRecruiter")}
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="cv-field"
                        name="total_it_recruiter"
                        placeholder={t("enterTotalITRecruiter")}
                        {...register(`total_it_recruiter`, {
                          required: false,
                        })}
                      />
                      {errors?.total_it_recruiter && (
                        <p className="error-message">
                          {errors.total_it_recruiter.message}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label">
                        {t("serviceOffering")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="cv-field"
                        name="service_offering"
                        placeholder={t("enterServiceOffering")}
                        {...register(`service_offering`, {
                          required: false,
                        })}
                      />
                      {errors?.service_offering && (
                        <p className="error-message">
                          {errors.service_offering.message}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label">
                        {t("specialization")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="cv-field"
                        name="specialization"
                        placeholder={t("enterSpecialization")}
                        {...register(`specialization`, {
                          required: false,
                        })}
                      />
                      {errors?.specialization && (
                        <p className="error-message">
                          {errors.specialization.message}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label">
                        {t("closeContract")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="cv-field"
                        name="turn_around_time_to_close_contract_position"
                        placeholder={t("enterCloseContract")}
                        {...register(`turn_around_time_to_close_contract_position`, {
                          required: false,
                        })}
                      />
                      {errors?.turn_around_time_to_close_contract_position && (
                        <p className="error-message">
                          {errors.turn_around_time_to_close_contract_position.message}
                        </p>
                      )}
                    </Form.Group> <Form.Group className="mb-3">
                      <Form.Label className="common-label">
                        {t("closePermanent")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="cv-field"
                        name="turn_around_time_to_close_permanent_position"
                        placeholder={t("enterClosePermanent")}
                        {...register(`turn_around_time_to_close_permanent_position`, {
                          required: false,
                        })}
                      />
                      {errors?.turn_around_time_to_close_permanent_position && (
                        <p className="error-message">
                          {errors.turn_around_time_to_close_permanent_position.message}
                        </p>
                      )}
                    </Form.Group>

                    <div>

                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">{t("city")}*</Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="company_city"
                          placeholder={t("enterCity")}
                          {...register(`company_city`, {
                            required: t("cityValidation"),
                          })}
                        />
                        {errors?.company_city && (
                          <p className="error-message">
                            {errors.company_city.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("state")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="state"
                          placeholder={t("enterState")}
                          {...register(`state`, {
                            required: {
                              value: true,
                              message: t("stateValidation"),
                            },
                            pattern: {
                              value: /^[A-Za-z\s]+$/,
                              message: "State should not contain numbers ",
                            }
                          })}
                        />
                        {errors?.state && (
                          <p className="error-message">
                            {errors.state.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("postCode")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="post_code"
                          placeholder={t("enterPostCode")}
                          {...register(`post_code`, {
                            required: t("postCodeValidation"),
                          })}
                        />
                        {errors?.post_code && (
                          <p className="error-message">
                            {errors.post_code.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("country")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="company_country"
                          placeholder={t("enterCountry")}
                          {...register(`company_country`, {
                            required: {
                              value: true,
                              message: t("countryValidation"),
                            },
                            pattern: {
                              value: /^[A-Za-z\s]+$/,
                              message: "Country should not contain numbers or special character",
                            }
                          })}
                        />
                        {errors?.company_country && (
                          <p className="error-message">
                            {errors.company_country.message}
                          </p>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("countryCode")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="country_code"
                          placeholder={t("enterCountryCode")}
                          {...register(`country_code`, {
                            required: {
                              value: true,
                              message: t("countryCodeValidation"),
                            },
                            pattern: {
                              value: /^(\+?\d{1,3}|\d{1,5})$/,
                              message: "Country should not be greater than 5 digits ",
                            }
                          })}
                        />
                        {errors?.country_code && (
                          <p className="error-message">
                            {errors.country_code.message}
                          </p>
                        )}
                      </Form.Group>
                    </div>
                  </Col>
                  <Col md="6">

                  </Col>
                </Row>
              </div>
              <div>
                <h2 className="section-head mb-4">
                  {t("updateYourProprietorProfile")}
                </h2>
                <Row className="mb-4">
                  <Col md="6">
                    <div className="inner-form">
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("proprietorName")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="proprietor_name"
                          placeholder={t("enterProprietorName")}
                          {...register(`proprietor_name`, {
                            required: t("nameValidation"),
                          })}
                        />
                        {errors?.proprietor_name && (
                          <p className="error-message">
                            {errors.proprietor_name.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("proprietor")} {t("email")}*
                        </Form.Label>
                        <div>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="proprietor_email"
                            placeholder={t("enterProprietorEmail")}
                            {...register(`proprietor_email`, {
                              required: t("emailValidation"),
                            })}
                          />
                          {errors?.proprietor_email && (
                            <p className="error-message">
                              {errors.proprietor_email.message}
                            </p>
                          )}
                        </div>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("phoneNumber")}*
                        </Form.Label>
                        <Form.Control
                          type="number"
                          className="cv-field"
                          name="proprietor_contact_number"
                          placeholder={t("enterProprietorContactNumber")}
                          {...register(`proprietor_contact_number`, {
                            required: t("contactNumberValidation"),
                          })}
                        />
                        {errors?.proprietor_contact_number && (
                          <p className="error-message">
                            {errors.proprietor_contact_number.message}
                          </p>
                        )}
                      </Form.Group>

                    </div>
                  </Col>
                  <Col md="6">
                    <div className="inner-form">
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("contactPersonName")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="proprietor_contact_person_name"
                          placeholder={t("enterContactPersonName")}
                          {...register(`proprietor_contact_person_name`, {
                            required: t("contactNameValidation"),
                          })}
                        />
                        {errors?.proprietor_contact_person_name && (
                          <p className="error-message">
                            {errors.proprietor_contact_person_name.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("contactPhoneNumber")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="proprietor_contact_person_phone_number"
                          placeholder={t("enterContactPersonNumber")}
                          {...register(`proprietor_contact_person_phone_number`, {
                            required: t("contactNameValidation"),
                          })}
                        />
                        {errors?.proprietor_contact_person_phone_number && (
                          <p className="error-message">
                            {errors.proprietor_contact_person_phone_number.message}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("contactPersonEmail")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="proprietor_contact_person_email"
                          placeholder={t("enterContactPersonEmail")}
                          {...register(`proprietor_contact_person_email`, {
                            required: t("contactEmailValidation"),
                          })}
                        />
                        {errors?.proprietor_contact_person_email && (
                          <p className="error-message">
                            {errors.proprietor_contact_person_email.message}
                          </p>
                        )}
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="text-center">
                <RexettButton
                  type="submit"
                  text={t("updateProfile")}
                  className="main-btn px-4"
                  variant="transparent"
                  disabled={smallLoader}
                  isLoading={smallLoader}
                />
              </div>
            </Form>
          </section>
          {/* <EndJobModal show={showModal} handleClose={handleJobStatusModal} onClick={handleJobStatusAction} smallLoader={smallLoader} header={"Delete your Account"} feedbacks= {"Reasons"} submit={"Delete"} /> */}
        </>
      )}
    </>
  );
};
export default EditVendorProfile;



















