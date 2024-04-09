import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getVenderProfile,
  updateVendorProfile,
} from "../../redux/slices/vendorDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";

const EditVendorProfile = () => {
  const dispatch = useDispatch();
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

  const [password, setPassword] = useState({
    firstPass: false,
    secondPass: false,
    thirdPass: false,
    fourthPass: false,
  })

  useEffect(() => {
    setValue("vendor_name", vendorProfile?.name);
    setValue("email", vendorProfile?.email);
    setValue("phone_number", vendorProfile?.phone_number);
    setValue("address", vendorProfile?.address);
    setValue("address_2", vendorProfile?.address_2);
    setValue("city", vendorProfile?.city);
    setValue("country", vendorProfile?.country);
    setValue("postcode", vendorProfile?.passcode);
    setValue("company_name", vendorProfile?.company?.name);
    setValue("company_email", vendorProfile?.company?.email);
    setValue("company_phone_number", vendorProfile?.company?.phone_number);
    // setValue("company_address", vendorProfile?.company?.address);
    // setValue("company_address_2", vendorProfile?.company?.address_2);
    setValue("company_city", vendorProfile?.company?.city);
    setValue("company_country", vendorProfile?.company?.country);
    setValue("company_postcode", vendorProfile?.company?.passcode);
  }, [vendorProfile]);

  useEffect(() => {
    dispatch(getVenderProfile());
  }, []);

  const onSubmit = (values) => {
    let payload = {
      name: values.name,
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

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <>
          <section className="card-box">
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <div>
                  <h2 className="section-head mb-4">Update Your Profile</h2>
                  <Row className="mb-4">
                    <Col md="6">
                      <div className="inner-form">
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Vendor Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="vendor_name"
                            placeholder="Enter Vendor Name"
                            {...register(`vendor_name`, {
                              required: "Name is required",
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
                            Email
                          </Form.Label>
                          <div>
                            <Form.Control
                              type="text"
                              className="cv-field"
                              name="email"
                              placeholder="Enter Email "
                              {...register(`email`, {
                                required: "Email is required",
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
                            Previous Password
                          </Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              type={password.firstPass ? "text" : "password"}
                              className="cv-field"
                              name="password"
                              placeholder="Enter password"
                              {...register(`password`, {
                                required: "Password is required",
                              })}
                            />
                            {errors?.password && (
                              <p className="error-message">
                                {errors.password.message}
                              </p>
                            )}
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
                            New Password
                          </Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              type={password.secondPass ? "text" : "password"}
                              className="cv-field"
                              name="new_password"
                              placeholder="Enter New password"
                              {...register(`new_password`, {
                                required: "New Password is required",
                              })}
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
                          {errors?.new_password && (
                            <p className="error-message">
                              {errors.new_password.message}
                            </p>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="number"
                            className="cv-field"
                            name="phone_number"
                            placeholder="Enter phone_number"
                            {...register(`phone_number`, {
                              required: "Phone number is required",
                            })}
                          />
                          {errors?.phone_number && (
                            <p className="error-message">
                              {errors.phone_number.message}
                            </p>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Address
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="address"
                            placeholder="Enter Address"
                            {...register(`address`, {
                              required: "Address is required",
                            })}
                          />
                          {errors?.address && (
                            <p className="error-message">
                              {errors.address.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md="6">
                      <div>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Address 2
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="address_2"
                            placeholder="Enter address 2"
                            {...register(`address_2`, {
                              required: "Address is required",
                            })}
                          />
                          {errors?.address_2 && (
                            <p className="error-message">
                              {errors.address_2.message}
                            </p>
                          )}
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                          <Form.Label className="common-label">Profile Picture</Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="profile_picture"
                            placeholder="Enter Profile Picture"
                            {...register(`profile_picture`, {
                              required: "profile_picture is required",
                            })}
                          />
                          {errors?.profile_picture && (
                            <p className="error-message">
                              {errors.profile_picture.message}
                            </p>
                          )}
                        </Form.Group> */}
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">City</Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="city"
                            placeholder="Enter City"
                            {...register(`city`, {
                              required: "City is required",
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
                            Postcode
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="postcode"
                            placeholder="Enter postcode"
                            {...register(`postcode`, {
                              required: "Postcode is required",
                            })}
                          />
                          {errors?.postcode && (
                            <p className="error-message">
                              {errors.postcode.message}
                            </p>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Country
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="country"
                            placeholder="Enter Country name"
                            {...register(`country`, {
                              required: "Country is required",
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
                  <h2 className="section-head mb-4">Update Company Profile</h2>

                  <Row className="mb-4">
                    <Col md="6">
                      <div className="inner-form">
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Company Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="company_name"
                            placeholder="Enter Company Name"
                            {...register(`company_name`, {
                              required: "Company name is required",
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
                            Type Of Company
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="type_of_company"
                            placeholder="Enter Company Name"
                            {...register(`type_of_company`, {
                              required: "Type of Company is required",
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
                            Email
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="company_email"
                            placeholder="Enter Email"
                            {...register(`company_email`, {
                              required: "Email is required",
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
                            Address
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="company_address"
                            placeholder="Enter Address"
                            {...register(`company_address`, {
                              required: "Address is required",
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
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="number"
                            className="cv-field"
                            name="company_phone_number"
                            placeholder="Enter phone_number"
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
                            Establishment Year
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="establishment_year"
                            placeholder="Establishment year"
                            {...register(`establishment_year`, {
                              required: "Establishment year is required",
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
                            Type Of Establishment
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="type_of_establishment"
                            placeholder="Enter Type of Establishment "
                            {...register(`type_of_establishment`, {
                              required: "Type of Establishment  is required",
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
                            Total Employees
                          </Form.Label>
                          <Form.Control
                            type="number"
                            className="cv-field"
                            name="total_employees"
                            placeholder="Total Employees"
                            {...register(`total_employees`, {
                              required: "Total Employees is required",
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
                            Total IT Recruiter
                          </Form.Label>
                          <Form.Control
                            type="number"
                            className="cv-field"
                            name="total_it_recruiter"
                            placeholder="Enter Total IT Recruiter"
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
                            Service Offering
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="service_offering"
                            placeholder="Enter Service Offering"
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
                            Specialization
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="specialization"
                            placeholder="Enter Specialization"
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
                            Turn around time to close contract position
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="turn_around_time_to_close_contract_position"
                            placeholder="Enter Turn Around Time To Close Contract Position"
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
                            Turn around time to close permanent position
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="turn_around_time_to_close_permanent_position"
                            placeholder="Enter Turn Around Time To Close Permanent Position"
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
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Success Story
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="success_story"
                            placeholder="Enter Success Story"
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
                            Yearly Revenue
                          </Form.Label>
                          <Form.Control
                            type="number"
                            className="cv-field"
                            name="yearly_revenue"
                            placeholder=" Enter Yearly Revenue"
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
                      </div>
                    </Col>
                    <Col md="6">
                      <div>
                        {/* <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Address 2
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="company_address2"
                            placeholder="Enter Address"
                            {...register(`company_address2`, {
                              required: "Address 2 is required",
                            })}
                          />
                          {errors?.company_address2 && (
                            <p className="error-message">
                              {errors.company_address2.message}
                            </p>
                          )} */}
                        {/* </Form.Group> */}
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">City</Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="company_city"
                            placeholder="Enter city"
                            {...register(`company_city`, {
                              required: "City is required",
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
                            State
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="state"
                            placeholder="Enter State"
                            {...register(`state`, {
                              required: {
                                value: true,
                                message: "State is required",
                              },
                              pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "State should not contain numbers or special character",
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
                            Postcode
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="company_postcode"
                            placeholder="Enter postcode"
                            {...register(`company_postcode`, {
                              required: "Postcode is required",
                            })}
                          />
                          {errors?.company_postcode && (
                            <p className="error-message">
                              {errors.company_postcode.message}
                            </p>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Country
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="company_country"
                            placeholder="Enter Country"
                            {...register(`company_country`, {
                              required: {
                                value: true,
                                message: "Country is required",
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
                            Country Code
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="country_code"
                            placeholder="Enter Country Code"
                            {...register(`country_code`, {
                              required: "Country code is required",
                            })}
                          />
                          {errors?.country_code && (
                            <p className="error-message">
                              {errors.country_code.message}
                            </p>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Website
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="website"
                            placeholder="Enter website"
                            {...register(`website`, {
                              required: "Website is required",
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
                            GST Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="gst_number"
                            placeholder="Enter GST number"
                            {...register(`gst_number`, {
                              required: "Gst Number is required",
                            })}
                          />
                          {errors?.gst_number && (
                            <p className="error-message">
                              {errors.gst_number.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div>
                  <h2 className="section-head mb-4">
                    Update Your Proprietor Profile
                  </h2>
                  <Row className="mb-4">
                    <Col md="6">
                      <div className="inner-form">
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Proprietor Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="proprietor_name"
                            placeholder="Enter Proprietor Name"
                            {...register(`proprietor_name`, {
                              required: "Name is required",
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
                            Proprietor Email
                          </Form.Label>
                          <div>
                            <Form.Control
                              type="text"
                              className="cv-field"
                              name="proprietor_email"
                              placeholder="Enter Proprietor Email"
                              {...register(`proprietor_email`, {
                                required: " Email is required",
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
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="number"
                            className="cv-field"
                            name="proprietor_contact_number"
                            placeholder="Enter Proprietor Contact Number"
                            {...register(`proprietor_contact_number`, {
                              required: "Contact number is required",
                            })}
                          />
                          {errors?.proprietor_contact_number && (
                            <p className="error-message">
                              {errors.proprietor_contact_number.message}
                            </p>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label">
                            Contact person name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="proprietor_contact_person_name"
                            placeholder="Enter Contact Person Name"
                            {...register(`proprietor_contact_person_name`, {
                              required: "Contact Person name is required",
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
                            Contact Phone Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="proprietor_contact_person_phone_number"
                            placeholder="Enter Contact Person Number"
                            {...register(`proprietor_contact_person_phone_number`, {
                              required: "Contact Phone number is required",
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
                            Contact Person Email
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="cv-field"
                            name="proprietor_contact_person_email"
                            placeholder="Enter Contact Person Email"
                            {...register(`proprietor_contact_person_email`, {
                              required: "Contact email is required",
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
                    text="Update profile"
                    className="main-btn px-4"
                    variant="transparent"
                    isLoading={smallLoader}
                  />
                </div>
              </div>
            </Form>
          </section>
        </>
      )}
    </>
  );
};
export default EditVendorProfile;



















