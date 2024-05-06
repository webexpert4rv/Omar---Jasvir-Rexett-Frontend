import React, { useEffect, useState } from "react";
import { HiUpload } from "react-icons/hi";
import { Button, Col, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAddNewDeveloper, getSkillList } from "../../redux/slices/clientDataSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { addDegree, getDegreeList } from "../../redux/slices/developerDataSlice";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { filePreassignedUrlGenerate } from "../../redux/slices/clientDataSlice";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import { INVALID_FILE_TYPE } from "../../components/clients/TimeReporiting/constant";
import { Controller } from "react-hook-form";
import { min } from "moment";


const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});
const RegisterDeveloper = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const { smallLoader, skillList } = useSelector((state) => state.clientData);
  const [options, setOptions] = useState([]);
  const [disbaleYear, setDisbaleYear] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState(null);
  const [disabledEndDates, setDisabledEndDates] = useState([]);
  const [skillCate, setSkillsCate] = useState([]);
  const { degreeList } = useSelector((state) => state.developerData);
  const skillLabels = skillCate?.map((skill) => skill.value);
  const skillSet = skillLabels?.toString();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState([]);
  const [fileTypeError, setFileTypeError] = useState(false);
  const navigate = useNavigate();
  const [socialMediaRows, setSocialMediaRows] = useState([
    {
      name: "",
      url: "",
    },
  ]);

  const {
    register,
    control,
    setValue,
    clearErrors,
    watch,
    handleSubmit,
    reset,
    trigger,
    setError,
    formState: { errors },
  } = useForm();

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "educations",
    name: "experiences",
    name: "social_links",
  });

  const [experienceFields, setExperienceFields] = useState([
    {
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      is_still_working: true,
      description: "",
    },
  ]);

  useEffect(() => {
    dispatch(getDegreeList());
  }, []);


  useEffect(() => {
    dispatch(getSkillList());
  }, [dispatch]);
  useEffect(() => {
    setSkillsCate(skillListMapped)
  }, [skillList]);


  console.log(skillCate, "skillCate")
  function generateYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1995; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  }

  const yearsArray = generateYears();

  const onSubmit = (data, index) => {
    let convertArr = selectedOption.map((item) => item.label);
    let formData = {
      ...data,
      skills: convertArr.toString(),
    };

    let fileData = new FormData();
    fileData.append("file", file);

    dispatch(
      filePreassignedUrlGenerate(fileData, (url) => {
        let data = {
          ...formData,
          profile_picture: url,
        };
        dispatch(
          getAddNewDeveloper(data, () => {
            navigate("/vendor-dashboard");
          })
        );
      })
    );
  };

  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });

  const handleExperience = () => {

  }

  const handleAppend = async () => {
    // Trigger validation for all fields
    const isValid = await trigger();
    // Check if all fields are valid
    if (isValid) {
      append({
        skills: "",
        experience: ""
      });
    }
  };
  const addtooltip = (
    <Tooltip id="tooltip">
      {t("addRow")}
    </Tooltip>
  );

  const handleAddMoreExp = async () => {
    const experiences = watch("experiences");
    // to check if any of the field inside experiences array is empty
    const index = experiences?.findIndex(
      ({ job_title, company_name, description, start_date, end_date }) =>
        !company_name || !job_title || !description || !start_date || !end_date
    );
    // if index is greater than -1 means there is field inside element that is empty
    if (index === -1) {
      const newExperienceField = {
        id: experienceFields.length + 1,
        company_name: "",
        job_title: "",
        description: "",
        start_date: "",
        end_date: "",
        is_still_working: false,
      };
      setExperienceFields([...experienceFields, newExperienceField]);
    }
  };
  const handleDeleteFieldExp = (id) => {
    const updatedExperienceFields = experienceFields.filter(
      (field) => field.id !== id
    );
    setExperienceFields(updatedExperienceFields);
  };
  const [educationFields, setEducationFields] = useState([
    {
      university_name: "",
      degree_id: "",
      address: "",
      start_year: "",
      end_year: "",
      currently_attending: true,
      description: "",
    },
  ]);
  useEffect(() => {
    dispatch(getDegreeList());
  }, []);

  const handleAddMore = () => {
    const educations = watch("educations");
    const index = educations.findIndex(
      ({ university_name, degree_id, address, start_year, end_year }) =>
        !university_name ||
        !degree_id ||
        !address ||
        end_year === "Please Select Year" ||
        start_year === "Please Select Year"
    );
    if (index === -1) {
      const newEducationField = {
        id: educationFields.length + 1,
        university_name: "",
        degree_id: "",
        address: "",
        start_year: "",
        end_year: "",
        currently_attending: false,
      };
      setEducationFields([...educationFields, newEducationField]);
    }
  };
  const handleDeleteField = (id) => {
    const updatedEducationFields = educationFields.filter(
      (field) => field.id !== id
    );
    setEducationFields(updatedEducationFields);
  };

  const handleAddMoreSocial = () => {
    const newRow = { id: socialMediaRows.length + 1, name: "", url: "" };
    setSocialMediaRows([...socialMediaRows, newRow]);
  };

  const handleCurrentlyWorkingChange = (e, index) => {
    if (e.target.checked) {
      const isChecked = watch(`experiences[${index}].is_still_working`);
      const updatedDisabledEndDates = [...disabledEndDates];
      updatedDisabledEndDates[index] = true;
      setDisabledEndDates(updatedDisabledEndDates);
      setValue(`experiences[${index}].end_date`, null);
    } else {
      const isChecked = watch(`experiences[${index}].is_still_working`);
      const updatedDisabledEndDates = [...disabledEndDates];
      updatedDisabledEndDates[index] = false;
      setDisabledEndDates(updatedDisabledEndDates);
    }
  };

  const handleCurrentlyAttendingChange = (e, index) => {
    if (e.target.checked) {
      const isChecked = watch(`educations[${index}].is_still_attending`);
      const end_year = watch(`educations[${index}].end_year`);
      const updatedDisabledEndDates = [...disbaleYear];
      updatedDisabledEndDates[index] = true;
      setDisbaleYear(updatedDisabledEndDates);
      setValue(`educations[${index}].end_year`, null);
    } else {
      const isChecked = watch(`educations[${index}].is_still_attending`);
      const end_year = watch(`educations[${index}].end_year`);
      const updatedDisabledEndDates = [...disbaleYear];
      updatedDisabledEndDates[index] = false;
      setDisbaleYear(updatedDisabledEndDates);
      setValue(`educations[${index}].end_year`, end_year);
    }
  };

  const handleFileChange = (event) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const file = event.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      // clearErrors("profile_picture");
      setFileTypeError(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    } else {
      // setError("profile_picture", {
      //   type: "manual",
      //   message: t("invalid_file_type"),
      // });
      setFileTypeError(true);
      setSelectedImage(null);
      // setValue("profile_picture","")
    }
  };

  const onChangeSelect = (val) => {
    const newOption = createOption(val);
    setSelectedOption((prev) => [...prev, newOption]);
    setSkillsCate((prev) => [...prev, newOption]);
  };
  const handleCreate = (inputValue) => {
    const payload = {
        title : inputValue
    }
    dispatch(addDegree(payload, () => {
        dispatch(getDegreeList());
      }))
   } 

  return (
    <>
      <section className="register-developer card-box">
        <div className="">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">
              {t("enterPersonalDetails")}
            </h2>
            <div className="inner-form mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("developerName")} *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field"
                      {...register("name", {
                        required: {
                          value: true,
                          message: t("nameValidation"),
                        },
                      })}
                    />
                    <p className="error-message">{errors.name?.message}</p>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("email")} *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      className="common-field"
                      {...register("email", {
                        required: {
                          value: true,
                          message: t("emailValidation"),
                        },
                        pattern: {
                          value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                          message: t("invalidEmail"),
                        },
                      })}
                    />
                    <p className="error-message">{errors.email?.message}</p>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("phoneNumber")} *
                    </Form.Label>
                    {/* <Form.Control
                      type="text"
                      className="common-field"
                      name="phone_number"
                      {...register("phone_number", {
                        required: {
                          value: true,
                          message: t("phoneNumberValidation"),
                        },
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                    /> */}
                    <Controller
                      name="phone_number"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: t("phoneNumberValidation"),
                        },
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter a valid phone number",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="common-field form-control"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            field.onChange(numericValue);
                          }}
                        />
                      )}
                    />
                    {errors?.phone_number && (
                      <p className="error-message">
                        {errors?.phone_number?.message}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("address")} *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field"
                      // name="address"
                      {...register("address", {
                        required: t("addressValidation"),
                      })}
                    />
                    {errors?.address && (
                      <p className="error-message">{errors.address.message} </p>
                    )}
                  </Form.Group>
                </Col>

                {/* <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("address")} 
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field"
                      name="address_2"
                      {...register("address", {
                        required: {
                          value: false,
                          message: false,
                        },
                      })}
                    />
                    <p className="error-message">{errors.address?.message} </p>
                  </Form.Group>
                </Col> */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("city")} *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field"
                      name="City"
                      {...register("city", {
                        required: {
                          value: true,
                          message: t("cityValidation"),
                        },
                        // pattern: {
                        //     value: /^[A-Za-z\s]+$/,
                        //     message: "Country should not contain numbers or special character",
                        // }
                      })}
                    />
                    <p className="error-message">{errors.city?.message} </p>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("state")} *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field"
                      name="state"
                      {...register("state", {
                        required: {
                          value: true,
                          message: t("stateValidation"),
                        },
                        // pattern: {
                        //     value: /^[A-Za-z\s]+$/,
                        //     message: "State should not contain numbers or special character",
                        // }
                      })}
                    />
                    <p className="error-message">{errors.state?.message} </p>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("postCode")} *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field"
                      name="post_code"
                      {...register("post_code", {
                        required: {
                          value: true,
                          message: t("postCodeValidation"),
                        },
                        // pattern: {
                        //     value: /^[0-9]+$/,
                        //     message: "Postal code should only contain numbers",
                        // }
                      })}
                    />
                    <p className="error-message">
                      {errors.post_code?.message}{" "}
                    </p>
                  </Form.Group>
                </Col>
                <Col md={6}>
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
                          message: t("countryValidation"),
                        },
                        // pattern: {
                        //     value: /^[A-Za-z\s]+$/,
                        //     message: "Country should not contain numbers or special character",
                        // }
                      })}
                    />
                    <p className="error-message">{errors.country?.message} </p>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("professional_title")} *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field"
                      name="professional_title"
                      {...register("professional_title", {
                        required: {
                          value: true,
                          message: t("professionalTitleValidation"),
                        },
                        // pattern: {
                        //     value: /^[A-Za-z\s]+$/,
                        //     message: "Country should not contain numbers or special character",
                        // }
                      })}
                    />
                    <p className="error-message">
                      {errors.professional_title?.message}{" "}
                    </p>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label">
                      {t("image")}*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      id="developer-image"
                      name="profile_picture"
                      {...register("profile_picture", {
                        onChange: (e) => handleFileChange(e),
                        required: {
                          value: true,
                          message: t("profilePictureValidation"),
                        },
                      })}
                      className="d-none"
                    />
                    {/* <Controller
                      name="profile_picture"
                      control={control}
                      rules={{ required: t("profilePictureValidation") }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="file"
                          className="d-none"
                          onChange={(e) => {
                            field.onChange(e);
                            handleFileChange(e);
                          }}
                        />
                      )}
                    /> */}

                    <Form.Label
                      htmlFor="developer-image"
                      className="upload-image-label d-block"
                    >
                      <HiUpload />
                      {t("uploadImage")}
                    </Form.Label>
                  </Form.Group>
                  {fileTypeError ? (
                    <p className="error-message">{t("invalid_file_type")}</p>
                  ) : (
                    errors?.profile_picture && (
                      <p className="error-message">
                        {" "}
                        {errors?.profile_picture?.message}
                      </p>
                    )
                  )}
                  {/* {errors?.profile_picture && (
                    <p className="error-message">
                      {errors?.profile_picture?.message}
                    </p>
                  )} */}
                  {selectedImage && (
                    <div>
                      <img
                        src={selectedImage && selectedImage}
                        alt="Selected"
                        className="uploaded-image"
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </div>
            <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">
              {t("enterExperience")}
            </h2>
            <div className="inner-form mb-3">
              {experienceFields.map(
                (
                  {
                    id,
                    company,
                    jobPosition,
                    jobDescription,
                    startDate,
                    endDate,
                    currentlyWorking,
                  },
                  index
                ) => (
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("companyName")} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          {...register(`experiences[${index}].company_name`, {
                            required: {
                              value: true,
                              message: t("compnyNameValidation"),
                            },
                          })}
                        />
                        {errors?.experiences?.[index]?.company_name && (
                          <p className="error-message">
                            {errors.experiences[index].company_name.message}
                          </p>
                        )}

                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("jobPosition")} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          name="job_title"
                          placeholder={t("enterJobPosition")}
                          {...register(`experiences[${index}].job_title`, {
                            required: t("jobPositionValidation"),
                          })}
                        />
                        {errors?.experiences?.[index]?.job_title && (
                          <p className="error-message">
                            {errors.experiences[index].job_title.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="common-label">
                          {t("jobDescription")} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows={3}
                          // placeholder="Enter Job Description"
                          {...register(`experiences[${index}].description`, {
                            required: t("descriptionValidation"),
                          })}
                        />
                        {errors?.experiences?.[index]?.description && (
                          <p className="error-message">
                            {errors.experiences[index].description.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-4">
                        <Form.Label>{t("startDate")} *</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder={t("enterStartDate")}
                          max={new Date().toISOString().split("T")[0]}
                          {...register(`experiences[${index}].start_date`, {
                            required: t("startDateValidation"),
                            validate: {
                              dateRange: (value) => {
                                const end_date = watch(
                                  `experiences[${index}].end_date`
                                ); // Get the value of the end date field
                                // if (!end_date || value <= end_date) {
                                //     return true;
                                // }
                                // return "Start Date must be before End Date";
                              },
                            },
                          })}
                        />
                        {errors?.experiences?.[index]?.start_date && (
                          <p className="error-message">
                            {errors.experiences[index].start_date.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-4">
                        <Form.Label>{t("endDate")} *</Form.Label>
                        <Form.Control
                          type="date"
                          className="cv-field"
                          placeholder={t("enterEndDate")}
                          max={new Date().toISOString().split("T")[0]}
                          {...register(`experiences[${index}].end_date`, {
                            required: {
                              value: disabledEndDates[index] ? false : true,
                              message: t("endDateValidation"),
                            },
                          })}
                          disabled={disabledEndDates[index]}
                        />
                        {errors?.experiences?.[index]?.end_date && (
                          <p className="error-message">
                            {errors.experiences[index].end_date.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                        <Form.Check
                          type="checkbox"
                          {...register(
                            `experiences[${index}].is_still_working`,
                            {
                              required: false,
                            }
                          )}
                          onChange={(e) =>
                            handleCurrentlyWorkingChange(e, index)
                          }
                        />
                        <Form.Label className="mb-0">
                          {t("currentlyWorking")}
                        </Form.Label>
                      </Form.Group>
                    </Col>
                    {index !== 0 && (
                      <Col md="12" className="d-flex justify-content-end">
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteFieldExp(id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    )}
                  </Row>
                )
              )}
              <div className="text-end my-3">
                <Button
                  className="main-btn py-2 px-3"
                  onClick={handleAddMoreExp}
                >
                  +
                </Button>
              </div>
            </div>
            {/* <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">
              {t("enterExpertise")}
            </h2>
            <Row>
              <Col md="12">
                <Form.Group className="mb-4">
                  <Form.Label className="common-label">{t("Enter Skills")}</Form.Label>
                  <CreatableSelect
                    isMulti
                    isClearable
                    name={selectedOption}
                    onChange={(newValue) => {
                      setSelectedOption(newValue);
                    }}
                    onCreateOption={onChangeSelect}
                    options={skillCate}
                    value={selectedOption}
                  />
                </Form.Group>
              </Col>
            </Row> */}
            {/* <div className="flex-none">
              <Form.Label className="common-label">{t("experience")}</Form.Label>
              <Form.Select className="filter-select shadow-none" onChange={(e) => handleExperience(e)}>
                <option value="" > {t("selectExperience")} </option>
                <option value="1 years" onClick={(e) => e.stopPropagation()}>1 {t("years")}</option>
                <option value="2 years" onClick={(e) => e.stopPropagation()}>2 {t("years")}</option>
                <option value="3 years" onClick={(e) => e.stopPropagation()}>3 {t("years")}</option>
                <option value="5 years" onClick={(e) => e.stopPropagation()}>5 {t("years")}</option>
                <option value="above 5" onClick={(e) => e.stopPropagation()}>above 5  {t("years")}</option>
              </Form.Select>
            </div>


            <div className="text-end mb-3">
              <OverlayTrigger placement="bottom" overlay={addtooltip}>
                <Button className="main-btn py-2 px-3" onClick={handleAppend}>
                  +
                </Button>
              </OverlayTrigger>
            </div> */}
            {/* <div className="text-center">
              <RexettButton
                type="submit"
                text="Submit"
                className="main-btn px-4 font-14 fw-semibold"
                variant="transparent"
                disabled={smallLoader}
                isLoading={smallLoader}
              />
            </div> */}
            <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">
              {t("enterEducationDetails")}
            </h2>
            <div className="inner-form mb-3">
              {educationFields.map(
                (
                  {
                    id,
                    university_name,
                    degree_id,
                    address,
                    start_year,
                    end_year,
                    currently_attending,
                  },
                  index
                ) => (
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("universityName")} *</Form.Label>
                        <Form.Control
                          type="text"
                          {...register(`educations[${index}].university_name`, {
                            required: {
                              value: true,
                              message: t("universityNameValidation"),
                            },
                          })}
                        />
                        {errors?.educations?.[index]?.university_name && (
                          <p className="error-message">
                            {errors.educations[index].university_name.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{t("degreeName")} *</Form.Label>
                        {/* <Select
                          options={degreeList}
                          onChange={(val) =>
                            setValue(
                              `educations[${index}].degree_id`,
                              val ? val.value : ""
                            )
                          }
                          defaultValue={degreeList.find(
                            (option) => option.value === degree_id
                          )}
                        /> */}
                        <CreatableSelect
                          isClearable
                          onChange={(val) =>
                            setValue(
                              `educations[${index}].degree_id`,
                              val ? val.value : ""
                            )
                          }
                          defaultValue={degreeList.find(
                            (option) => option.value === degree_id
                          )}
                          onCreateOption={handleCreate}
                          options={degreeList}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("address")} *</Form.Label>
                        <Form.Control
                          type="text"
                          {...register(`educations[${index}].address`, {
                            required: {
                              value: true,
                              message: t("addressValidation"),
                            },
                          })}
                        />
                        {errors?.educations?.[index]?.address && (
                          <p className="error-message">
                            {errors.educations[index].address.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>{t("startYear")} *</Form.Label>
                        <Form.Select
                          {...register(`educations.${index}.start_year`, {
                            required: t("startYearValidation"),
                            validate: {
                              lessThanEndYear: (value) => {
                                const endYear = watch(
                                  `educations.${index}.end_year`
                                );
                                // if (!endYear || parseInt(value) < parseInt(endYear)) {
                                //     return true;
                                // }
                                // return 'Start Year must be less than End Year';
                              },
                            },
                          })}
                        >
                          <option disabled selected>
                            {t("pleaseSelectYear")}
                          </option>
                          {yearsArray?.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </Form.Select>
                        {errors &&
                          errors.educations &&
                          errors.educations[index] &&
                          errors.educations[index].start_year && (
                            <p className="error-message">
                              {errors.educations[index].start_year.message}
                            </p>
                          )}
                      </Form.Group>
                    </Col>
                    <Col md="3">
                      <Form.Group className="mb-3">
                        <Form.Label>{t("endYear")} *</Form.Label>
                        <Form.Select
                          {...register(`educations.${index}.end_year`, {
                            required: {
                              value: disbaleYear[index] ? false : true,
                              message: t("endYearValidation"),
                            },
                          })}
                          disabled={disbaleYear[index]}
                        >
                          <option disabled selected>
                            {t("pleaseSelectYear")}
                          </option>
                          {yearsArray?.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </Form.Select>
                        {errors &&
                          errors.educations &&
                          errors.educations[index] &&
                          errors.educations[index].end_year && (
                            <p className="error-message">
                              {errors.educations[index].end_year.message}
                            </p>
                          )}
                      </Form.Group>
                    </Col>
                    <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                      <Form.Check
                        type="checkbox"
                        className="cv-field"
                        {...register(
                          `educations[${index}].currently_attending`,
                          {
                            required: false,
                          }
                        )}
                        onChange={(e) =>
                          handleCurrentlyAttendingChange(e, index)
                        }
                      />
                      <Form.Label className="mb-0">
                        {t("currentlyAttending")}
                      </Form.Label>
                    </Form.Group>
                    {index !== 0 && (
                      <Col md="12" className="d-flex justify-content-end">
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteField(id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    )}
                  </Row>
                )
              )}
              <div className="text-end my-3">
                <Button className="main-btn py-2 px-3" onClick={handleAddMore}>
                  +
                </Button>
              </div>
            </div>
            <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">
              {t("enterAbout")} *
            </h2>
            <div className="inner-form mb-3">
              <Row>
                <Col md="12">
                  <Form.Group className="mb-4">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Add your about"
                      className="common-field"
                      name="bio"
                      {...register("bio", {
                        required: {
                          value: true,
                          message: `${t("AboutRequired")}`,
                        },
                      })}
                    />
                    <p className="error-message">{errors.bio?.message} </p>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">
              {t("enterSkills")}
            </h2>
            <div className="inner-form mb-3">
              <Row>
                <Col md="12">
                  <Form.Group className="mb-4">
                    {/* <Form.Label>Skills</Form.Label> */}

                    <CreatableSelect
                      isMulti
                      isClearable
                      name={selectedOption}
                      onChange={(newValue) => {
                        setSelectedOption(newValue);
                      }}
                      onCreateOption={onChangeSelect}
                      options={skillCate}
                      value={selectedOption}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">
              {t("addSocialLinks")}
            </h2>
            <div className="inner-form">
              {socialMediaRows.map((row, index) => (
                <div className="experience-container">
                  <Row>
                    <Col md="12">
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1 px-0">
                          <Form.Select
                            className="py-0 border-0 shadow-none bg-transparent"
                            {...register(`social_links[${index}].name`)} // Register the name field
                          >
                            {/* <option value="facebook_url">Facebook</option> */}
                            <option value="linkedin_url">
                              {t("linkedIn")}
                            </option>
                            {/* <option value="twitter_url">Twitter</option> */}
                            <option value="github_url">{t("github")}</option>
                          </Form.Select>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          className="cv-field"
                          placeholder={t("enterUrl")}
                          {...register(`social_links[${index}].url`, {
                            required: {
                              value: true,
                              message: "Url is required",
                            },
                          })}
                        />

                        {errors?.social_links?.url && (
                          <p className="error-message">
                            {errors.social_links?.url.message}
                          </p>
                        )}
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
              ))}
              <div className="text-end mb-3">
                <Button
                  className="main-btn py-2 px-3"
                  onClick={handleAddMoreSocial}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="text-center">
              <RexettButton
                type="submit"
                text={t("register")}
                className="main-btn px-5"
                variant="transparent"
                disabled={smallLoader}
                isLoading={smallLoader}
              />
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default RegisterDeveloper;
