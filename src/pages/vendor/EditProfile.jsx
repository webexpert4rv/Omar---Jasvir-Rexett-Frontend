import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Tabs, Tab, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getVenderProfile,
  updateVendorProfile,
} from "../../redux/slices/vendorDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { useTranslation } from "react-i18next";
import { filePreassignedUrlGenerate, getCitiesList, getCoutriesList, getDeleteAccount, getStatesList, getTimeZoneForCountry } from "../../redux/slices/clientDataSlice";
import { FaTrashCan } from "react-icons/fa6";
import EndJobModal from "./../views/Modals/EndJob";
import ProfileWrapper from "../../components/common/EditProfile/ProfileWrapper";
import AllRoleEditProfile from "../../components/common/EditProfile/AllRoleEditProfile";
import CommonReactSelect from "../../components/atomic/CommonReactSelect";
import CommonInput from "../../components/atomic/CommonInput";
import { HiUpload } from "react-icons/hi";
import CommonAutocomplete from "../../components/atomic/CommonAutoComplete";
import { companyType } from "../../components/clients/TimeReporiting/constant";
import LocationSection from "../websiteRegisterForm/developer/LocationSection";


const EditVendorProfile = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedType, setSelectedType] = useState("")
  const { vendorProfile, screenLoader, smallLoader } = useSelector(
    (state) => state.vendorData
  );
  const { allTimeZones, countriesList, statesList, citiesList, timeZones } =
    useSelector((state) => state.clientData);
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation()
  const [password, setPassword] = useState({
    firstPass: false,
    secondPass: false,
    thirdPass: false,
    fourthPass: false,
  })
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;

  console.log(vendorProfile, "vendorProfile")
  console.log(countriesList, "countriesList")


  useEffect(() => {
    // setValue("name", vendorProfile?.name);
    setValue("email", vendorProfile?.email);
    setValue("phone_number", vendorProfile?.phone_number);
    setValue("address", vendorProfile?.address);
    // for setting country value
    const countryValue = {
      label: vendorProfile?.["country"],
      value: vendorProfile?.["country_code"],
    };
    setValue("country_code", countryValue);
    // for setting time value
    const stateValue = {
      label: vendorProfile?.["state"],
      value: vendorProfile?.["state_iso_code"],
    }
    setValue("state_iso_code", stateValue);

    // for setting city value
    const cityValue = {
      label: vendorProfile?.["city"],
      value: vendorProfile?.["city_iso_code"],
    }
    setValue("city_iso_code", cityValue);


    // for setting time zone
    const timezoneValue = {
      label: vendorProfile?.["time_zone"],
      value: vendorProfile?.["time_zone"],
    }
    setValue("time_zone", timezoneValue);
    setValue("passcode", vendorProfile?.passcode);
    setValue("company_name", vendorProfile?.company?.name);
    setValue("company_email", vendorProfile?.company?.email);
    setValue("company_address", vendorProfile?.company?.address);
    setValue("company_phone_number", vendorProfile?.company?.phone_number);
    setValue("success_story", vendorProfile?.company?.success_story);
    setValue("total_employees", vendorProfile?.company?.total_employees);
    setValue("establishment_year", vendorProfile?.company?.establishment_year);
    setValue("gst_number", vendorProfile?.company?.gst_number);
    setValue("cin", vendorProfile?.company?.cin);
    setValue("total_it_recruiter", vendorProfile?.company?.total_it_recruiter);
    setValue("turn_around_time_to_close_contract_position", vendorProfile?.company?.trun_around_time_to_close_contract_position);
    setValue("turn_around_time_to_close_permanent_position", vendorProfile?.company?.trun_around_time_to_close_permanent_position);
    // setValue("type_of_company", vendorProfile?.company?.type_of_company);
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
    dispatch(getCoutriesList());
  }, []);

  
  const handleSelect = (event) => {
    setSelectedType(event.target.value)
  }




  const handleJobStatusModal = (id) => {
    setShowModal(!showModal)
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file, 'file')
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const deleteprofile = (
    <Tooltip id="tooltip">
      Delete Profile
    </Tooltip>
  );

  const onSubmit = (values) => {
    localStorage.setItem("vendorName", values?.name)
    let formData = new FormData();
    let fileData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    fileData.append("file", file);


    dispatch(filePreassignedUrlGenerate(fileData, (url) => {

      let payload = {
        email: values.email,
        previous_password: values.previous_password,
        password: values.password,
        phone_number: values.phone_number,
        address: values.address,
        address_2: values.address_2,
        // city: values.city,
        passcode: values.passcode,
        time_zone: values?.time_zone?.label,
        profile_picture: url,
        country: values.country_code.label,
        // state: values.state.label,
        // city: values.city.label,
        company: {
          name: values.company_name,
          email: values.email,
          country:values.country_code?.label,
          country_code: values.country_code?.value,
          state:values.state_iso_code?.label,
          state_iso_code:values.state_iso_code?.value,
          time_zone:values?.time_zone?.label,
          // may be need to uncomment in future
          // city:values?.city?.label,  
          country: values.country_code?.label,
          time_zone: values?.time_zone?.label,
          city: values?.city?.label,
          phone_number: values.company_phone_number,
          // type_of_company: values.type_of_company,
          city: values.company_city,
          state: values.company_state,
          country: values.company_country,
          post_code: values.company_post_code,
          type_of_company: selectedType,
          establishment_year: values.establishment_year,
          type_of_establishment: values.type_of_establishment,
          total_employees: values.total_employees,
          total_it_recruiter: values.total_it_recruiter,
          yearly_revenue: values.yearly_revenue,
          website: values.website,
          tax_id: values.tax_id,
          cin:values.cin,
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
          proprietor_contact_person_email: values.proprietor_contact_person_email,
          proprietor_contact_person_phone_number:
            values.proprietor_contact_person_phone_number,
        },
      };
      dispatch(updateVendorProfile(payload));
    }))
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
                  <h2 className="section-head-sub mb-0 border-0">Update Your Personal Profile</h2>
                  {/* <OverlayTrigger placement="bottom" overlay={deleteprofile}>
                    <Button onClick={() => handleJobStatusModal(vendorProfile?.data?.id)} className="delete-btn"><FaTrashCan /></Button>
                  </OverlayTrigger> */}
                </div>
                <Row className="mb-4">
                  <Col md="12">
                    <div className="inner-form">
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
                              : vendorProfile?.profile_picture
                          }
                          alt="Selected"
                          className="uploaded-image"
                        />
                      </div>
                      {/* <Form.Group className="mb-3">
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
                  </Form.Group> */}
                    </div>
                  </Col>
                  <Col md={6}>
                    <Form.Label className="common-label font-14 fw-medium">
                      {t("typeOfCompany")}*
                    </Form.Label>
                    <Form.Select
                      className="filter-select shadow-none font-14"
                      name="type_of_company"
                      value={selectedType ? selectedType : vendorProfile?.company?.type_of_company}
                      onChange={handleSelect}
                    // {...register("type_of_company", {
                    //   required: "Company type is required",
                    // })}
                    >
                      <option disabled selected > {t("enterCompanyType")} </option>
                      {companyType?.map((item, idx) => (
                        <option key={item?.key} value={item?.key}>{item?.value}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label font-14 fw-medium">
                        {t("companyName")}*
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="common-field font-14"
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
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label font-14 fw-medium">
                        {t("email")} *
                      </Form.Label>
                      <div>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label font-14 fw-medium">
                        {t("previousPassword")}
                      </Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={password.firstPass ? "text" : "password"}
                          className="common-field font-14"
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
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label font-14 fw-medium">
                        {t("newPassword")}
                      </Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={password.secondPass ? "text" : "password"}
                          className="common-field font-14"
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
                      {errors?.new_password && (
                        <p className="error-message">
                          {errors.new_password.message}
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="common-label font-14 fw-medium">
                        {t("phoneNumber")} *
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="common-field font-14"
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
                  </Col>
                  <Col md="6">
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
                  </Col>
                  <Col md={6}>

                    <LocationSection
                      control={control}
                      errors={errors}
                      watch={watch}
                      setValue={setValue}
                      setError={setError}
                      clearErrors={clearErrors}
                    />
                    {/* <CommonReactSelect
                        name="country"
                        errors={errors}
                        watch={watch}
                        // defaultValue={vendorProfile?.country}
                        control={control}
                        required="Country is required"
                        label="Country"
                        type="country"
                        options={countriesList}
                      /> */}

                    {/* <CommonReactSelect
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
                        required="City is required"
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
                      /> */}
                    <CommonInput
                      label={t("postCode") + "*"}
                      className="common-field font-14 fw-medium"
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
                  </Col>
                </Row>
              </div>
              <div>
                <div className="d-flex justify-content-between pb-2 mb-3 border-bottom-grey">
                  <h2 className="section-head-sub mb-0 border-0">Company Information Details</h2>
                </div>
                <div className="inner-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("establishmentYear")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("typeOfEstablishment")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("totalEmployees")}*
                        </Form.Label>
                        <Form.Control
                          type="number"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("totalITRecruiter")}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("yearlyRevenue")}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          className="common-field font-14"
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
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("website")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          Tax ID*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          CIN Number*
                        </Form.Label>
                        <Form.Control
                         type="text"
                         placeholder="CIN Number"
                        className="common-field font-14"
                        name="cin" 
                        {...register(`cin`, {
                          required: t("cin"),
                        })}
                      />
                      {errors?.cin && (
                        <p className="error-message">
                          {errors.cin.message}
                        </p>
                      )}
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Form.Group className="mb-3">
                  <Form.Control
                      type="text"
                      className="cv-field"
                      name="cin"
                      placeholder="Enter CIN number"
                      {...register(`cin`, {
                        required: t("CIN number is required"),
                      })}
                    />
                    {errors?.cin && (
                      <p className="error-message">
                        {errors.cin.message}
                      </p>
                    )}
                  </Form.Group> */}
                </div>
                <div className="d-flex justify-content-between pb-2 mb-3 border-bottom-grey">
                  <h2 className="section-head-sub mb-0 border-0">Expertise Details</h2>
                </div>
                <div className="inner-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("serviceOffering")}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("specialization")}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("closeContract")}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("closePermanent")}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("successStory")}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                  </Row>
                </div>
                <div className="d-flex justify-content-between pb-2 mb-3 border-bottom-grey">
                  <h2 className="section-head-sub mb-0 border-0">Decision makers Details</h2>
                </div>
                <div className="inner-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          CEO Name*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          CEO Contact Number*
                        </Form.Label>
                        <Form.Control
                          type="number"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          CEO {t("email")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("contactPersonName")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("contactPhoneNumber")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label font-14 fw-medium">
                          {t("contactPersonEmail")}*
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="common-field font-14"
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
                    </Col>
                  </Row>
                </div>
                <div className="text-center mt-3">
                  <RexettButton
                    type="submit"
                    text={t("updateProfile")}
                    className="main-btn px-4"
                    variant="transparent"
                    disabled={smallLoader}
                    isLoading={smallLoader}
                  />
                </div>
              </div>

            </Form>
          </section>
        </>)
      }
    </>
  );
};
export default EditVendorProfile;



















