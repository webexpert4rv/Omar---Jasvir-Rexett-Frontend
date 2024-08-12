import React, { Fragment, useEffect, useState } from "react";
import { HiUpload } from "react-icons/hi";
import {
  Accordion,
  Button,
  Col,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  filePreassignedUrlGenerate,
  getAddNewDeveloper,
  getCitiesList,
  getCoutriesList,
  getSkillList,
  getStatesList,
  getTimeZoneForCountry,
} from "../../redux/slices/clientDataSlice";
import { useFieldArray, useForm } from "react-hook-form";
import {
  addDegree,
  getDegreeList,
} from "../../redux/slices/developerDataSlice";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { EXPERIENCE_OPTIONS } from "../../helper/utlis";
import Autocomplete from "react-google-autocomplete";
import { GOOGLE_AUTOCOMPLETE_API_KEY } from "../../components/clients/TimeReporiting/constant";
import CommonReactSelect from "../../components/atomic/CommonReactSelect";
import ExperienceCV from "../../components/common/Modals/ExperienceCVModal";
import demoImg from '../../assets/img/demo-img.jpg';
import { IoCameraOutline } from "react-icons/io5";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});
const RegisterDeveloper = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [CvFile, setCVFile] = useState(null);
  const { smallLoader, skillList } = useSelector((state) => state.clientData);
  const [disbaleYear, setDisbaleYear] = useState([]);
  const [selectedCv, setSelectedCv] = useState(null);
  const [selectedCvErr, setSelectedCvErr] = useState(null);
  const [disabledEndDates, setDisabledEndDates] = useState([]);
  const [skillCate, setSkillsCate] = useState([]);
  const { degreeList } = useSelector((state) => state.developerData);
  const skillLabels = skillCate?.map((skill) => skill.value);
  const skillSet = skillLabels?.toString();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState([]);
  const [expertSkill, setExpertSkill] = useState([]);
  const [fileTypeError, setFileTypeError] = useState(false);
  const [socialMediaRows, setSocialMediaRows] = useState([
    {
      name: "",
      url: "",
    },
  ]);
  const { allTimeZones, countriesList, statesList, citiesList, timeZones } =
    useSelector((state) => state.clientData);
  const navigate = useNavigate();
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
  } = useForm({
    defaultValues: {
      educations: [
        {
          university_name: "",
          degree_id: "",
          address: "",
          start_year: "",
          end_year: "",
          currently_attending: false,
          description: "",
        },
      ],
    },
  });
  console.log(selectedOption, "select-----");
  console.log(expertSkill, "experskilll");
  const { fields, append, remove, replace } = useFieldArray({
    control,
    // name: "educations",
    name: "experiences",
    name: "expertise",
    name: "social_links",
    name: "skills",
  });
  const {
    fields: educationField,
    append: appendEducationField,
    remove: removeEducationField,
  } = useFieldArray({
    control,
    name: "educations",
  });

  const [experienceFields, setExperienceFields] = useState([
    {
      id: 0,
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      is_still_working: true,
      description: "",
    },
  ]);
  const [expertiseFields, setExpertiseFields] = useState([
    { id: 0, skill: "", experience: "" },
  ]);
  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });

  useEffect(() => {
    dispatch(getDegreeList());
    dispatch(getCoutriesList());
  }, []);

  useEffect(() => {
    dispatch(getSkillList());
  }, [dispatch]);

  useEffect(() => {
    setSkillsCate(skillListMapped);
  }, [skillList]);

  const handleAppend = () => {
    const expertise = watch("expertise");
    let index = expertise?.findIndex(
      (item) => item.skill == undefined || item.experience == ""
    );
    if (index == -1) {
      setExpertiseFields([
        ...expertiseFields,
        { id: expertiseFields?.id + 1, skill: "", experience: "" },
      ]);
    }
  };

  const handleDelete = (id, index) => {
    const expertise = watch("expertise");
    expertise.splice(index, 1);
    let expertiseFieldsCopy = [...expertiseFields];
    expertiseFieldsCopy.splice(index, 1);
    // const updatedExpertFields = expertiseFieldsCopy.filter(
    //   (field) => field.id !== id
    // );
    setExpertiseFields(expertiseFieldsCopy);
  };

  function generateYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1995; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  }

  const yearsArray = generateYears();

  const onSubmit = (data) => {
    console.log(data, "data---");
    // let fileData = new FormData();
    // fileData.append("file", file);
    // let fileCVData = new FormData();
    // fileCVData.append("file", CvFile);
    // let formattedExpertise = [];
    // formattedExpertise = data?.expertise?.map((val) => {
    //   return { skill: val?.skill?.label, experience: val?.experience };
    // });
    // let formattedSkills = [];
    // let convertString = selectedOption?.map((item) => item.label);
    // formattedSkills = convertString.map((item) => {
    //   return { skill: item, experience: null };
    // });

    // const EducationFieldCpy = [...data.educations];
    // let formattedEducationField = [];
    // formattedEducationField = EducationFieldCpy.map((curElem) => {
    //   return { ...curElem, degree_id: curElem.degree_id.value };
    // });

    // if (data) {
    //   let resume;
    //   console.log(data, "formData");
    //   dispatch(
    //     filePreassignedUrlGenerate(fileCVData, (url) => {
    //       resume=url
    //     }))
    //   dispatch(
    //     filePreassignedUrlGenerate(fileData, (url) => {
    //       let formData = {
    //         ...data,
    //         skills: formattedSkills,
    //         expertise: formattedExpertise,
    //         profile_picture: url,
    //         educations: formattedEducationField,
    //       };
    //       dispatch(
    //         getAddNewDeveloper(formData, () => {
    //           navigate("/vendor-dashboard");
    //         })
    //       );
    //     })
    //   );
    // }
  };

  const addtooltip = <Tooltip id="tooltip">{t("addRow")}</Tooltip>;

  const handleAddMoreExp = async () => {
    const experiences = watch("experiences");
    console.log(experiences, "experiences")
    const index = experiences?.findIndex(
      ({
        job_title,
        company_name,
        description,
        start_date,
        end_date,
        is_still_working,
      }) =>
        !company_name ||
        !job_title ||
        !description ||
        !start_date ||
        (!is_still_working && !end_date)
    );
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
  const handleDeleteFieldExp = (index, id) => {
    const experiencesCopy = watch("experiences"); // Copy the experiences array
    const expCop = [...experienceFields]; // Copy the experienceFields array
    experiencesCopy.splice(index, 1);
    const updatedExpertFields = expCop.filter(
      (field) => field.id !== parseInt(id)
    );

    // Set the state with the updated arrays
    setExperienceFields([...updatedExpertFields]);
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

  useEffect(() => {
    if (watch("country")?.value) {
      dispatch(getStatesList(watch("country")?.value));
      dispatch(getTimeZoneForCountry(watch("country")?.value));
    }
  }, [watch("country")]);

  useEffect(() => {
    if (watch("state")?.value) {
      dispatch(getCitiesList(watch("country")?.value, watch("state")?.value));
      setValue("city", null);
    }
  }, [watch("state")]);

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
      // setEducationFields([...educationFields, newEducationField]);
      appendEducationField({
        // id: educationFields.length + 1,
        university_name: "",
        degree_id: "",
        address: "",
        start_year: "",
        end_year: "",
        currently_attending: false,
      });
      setEducationFields([...watch("educations"), newEducationField]);
    }
  };
  const handleDeleteField = (index, id) => {
    const educations = watch("educations");
    educations.splice(index, 1);
    console.log(educationFields, "educationfield");

    // const educationFieldsCpy=[...educationFields];
    const temp = [...educationFields];
    temp.splice(index, 1);
    // const updatedEducationFields = educationFields.filter(
    //   (field) => field.id !== id
    // );
    setEducationFields(temp);
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
    const allowedTypes = ["image/jpeg", "image/png", "image/svg"];
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

  const handleUploadCv = (event) => {
    const allowedTypes = ["application/pdf"];
    const file = event.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setFileTypeError(false);
      setCVFile(file);
      setSelectedCv(file.name);
      setSelectedCvErr(null);
    } else {
      setSelectedCvErr(true);
    }
  };
  const onChangeSelect = (val, arg) => {
    const newOption = createOption(val);
    if (arg == "skills") {
      setSelectedOption((prev) => [...prev, newOption]);
      setSkillsCate((prev) => [...prev, newOption]);
    } else {
      setExpertSkill((prev) => [...prev, newOption]);
    }
  };
  const handleCreate = (inputValue, index) => {
    const payload = {
      title: inputValue,
    };

    dispatch(
      addDegree(payload, () => {
        dispatch(getDegreeList());
      })
    );
  };
  return (
    <>
      <section className="register-developer card-box">
        <div className="">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Accordion className="register-collapse-main" defaultActiveKey="0">
              <Accordion.Item className="register-collapse-item completed" eventKey="0">
                <Accordion.Header className="register-collapse-header">
                  <h2 className="subheading-resume mb-0">
                    <span className="resume-step"><span className="count">1</span> <span className="compl-check"><FaCheck /></span> </span> {t("enterPersonalDetails")}
                  </h2>
                </Accordion.Header>
                <Accordion.Body className="register-collapse-body">

                  <div className="inner-form mb-3">
                    <Row>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="font-14 fw-medium">Image*</Form.Label>
                          <div className="profile-upload-preview position-relative">
                            <div className="profile-img-preview w-100 h-100">
                              <img src={demoImg} className="demo-upload-img" />
                            </div>
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

                            <Form.Label
                              htmlFor="developer-image"
                              className="profile-img-label border"
                            >
                              <IoCameraOutline />
                            </Form.Label>
                          </div>
                          <span className="font-12">{t("uploadImage")}</span>
                        </Form.Group>
                        {fileTypeError ? (
                          <p className="error-message">{t("invalid_file_type")}</p>
                        ) : (
                          errors?.profile_picture && (
                            <p className="error-message">
                              {errors?.profile_picture?.message}
                            </p>
                          )
                        )}
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
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label font-14 fw-medium">
                            Upload CV*
                          </Form.Label>
                          <Form.Control
                            type="file"
                            id="upload_cv"
                            name="upload_cv"
                            {...register("upload_cv", {
                              onChange: (e) => handleUploadCv(e),
                              required: {
                                value: true,
                                message: t("profilePictureValidation"),
                              },
                            })}
                            className="d-none"
                          />

                          <Form.Label
                            htmlFor="upload_cv"
                            className="upload-cv-label"
                          >
                            <HiUpload />
                            Upload your CV
                          </Form.Label>
                          <span className="font-12">Please upload only pdf, jpeg, png format file. Max file size 5MB.</span>
                        </Form.Group>
                        {selectedCvErr && (
                          <p style={{ color: "red" }}>
                            Please upload a valid PDF file.
                          </p>
                        )}
                        {selectedCv && <div>{selectedCv}</div>}
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label font-14 fw-medium">
                            {t("developerName")} *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="common-field font-14"
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
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label font-14 fw-medium">
                            {t("email")} *
                          </Form.Label>
                          <Form.Control
                            type="email"
                            className="common-field font-14"
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
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label font-14 fw-medium">
                            {t("phoneNumber")} *
                          </Form.Label>
                          {/* <Form.Control
                      type="text"
                      className="common-field font-14"
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
                                className="common-field font-14 form-control"
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
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label font-14 fw-medium">
                            {t("address")} *
                          </Form.Label>
                          {/* <Form.Control
                      type="text"
                      className="common-field font-14"
                      // name="address"
                      {...register("address", {
                        required: t("addressValidation"),
                      })}
                    /> */}
                          <Controller
                            name="address"
                            rules={{
                              required: "Address is required",
                            }}
                            className="common-field font-14 "
                            control={control}
                            render={({ field, fieldState }) => (
                              <Autocomplete
                                style={{ width: "500px" }}
                                errors={fieldState?.errors}
                                className="common-field font-14 w-100"
                                apiKey={GOOGLE_AUTOCOMPLETE_API_KEY}
                                onPlaceSelected={(place) => {
                                  console.log(place);
                                }}
                                options={{
                                  types: ["establishment", "geocode"],
                                }}
                                onChange={(event) => {
                                  field.onChange(event.target.value);
                                }}
                                onLoadFailed={(error) => {
                                  console.error(
                                    "Google Places Autocomplete failed to load",
                                    error
                                  );
                                }}
                              />
                            )}
                          />
                          {errors?.address && (
                            <p className="error-message">{errors.address.message} </p>
                          )}
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="common-label font-14 fw-medium">
                            {t("professional_title")} *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="common-field font-14"
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
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>{t("experienceRequired")}*</Form.Label>
                          <Form.Select
                            className="common-field font-14"
                            {...register("total_experience", {
                              required: {
                                value: true,
                                message: "Experienced is required",
                              },
                            })}
                          >
                            <option disabled selected value="">
                              {t("select")} {t("experienceRequired")}
                            </option>
                            <option value="Less_than_one">
                              {t("lessThan1Year")}
                            </option>
                            <option value="1 year">1 {t("year")}</option>
                            <option value="2 years">2 {t("year")}</option>
                            <option value="3 years">3 {t("year")}</option>
                            <option value="4 years">4 {t("year")}</option>
                            <option value="5 years">5 {t("year")}</option>
                            <option value="6+ years ">6 +{t("year")}</option>
                          </Form.Select>
                        </Form.Group>
                        <p className="error-message">{errors.experience?.message}</p>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <CommonReactSelect
                            name="country"
                            errors={errors}
                            // watch={watch}
                            control={control}
                            required="Country is required"
                            label="Country"
                            className="common-field font-14"
                            type="country"
                            options={countriesList}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">

                          <CommonReactSelect
                            name="state"
                            errors={errors}
                            control={control}
                            required="State is required"
                            label="State"
                            type="state"
                            options={statesList}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <CommonReactSelect
                            name="city"
                            errors={errors}
                            control={control}
                            // required="City is required"
                            label="City"
                            type="city"
                            options={citiesList}
                          />
                        </Form.Group>
                      </Col>
                      {/* <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="common-label font-14 fw-medium">
                      {t("experience")} *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="common-field font-14"
                      name="experience"
                      {...register("professional_title", {
                        required: {
                          value: true,
                          message: t("experienceValidation"),
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
                </Col> */}
                    </Row>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="register-collapse-item" eventKey="1">
                <Accordion.Header className="register-collapse-header">
                  <h2 className="subheading-resume mb-0"><span className="resume-step">2</span>Add Bio *</h2>
                </Accordion.Header>
                <Accordion.Body className="register-collapse-body">
                  <div className="inner-form mb-3">
                    <Row>
                      <Col md="12">
                        <Form.Group className="mb-4">
                          <Form.Label className="font-14 fw-medium">Bio</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Add your about"
                            className="common-field font-14"
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="register-collapse-item" eventKey="2">
                <Accordion.Header className="register-collapse-header">
                  <h2 className="subheading-resume mb-0"><span className="resume-step">3</span> {t("enterExpertise")}</h2>
                </Accordion.Header>
                <Accordion.Body className="register-collapse-body">
                  {expertiseFields.map((field, index) => {
                    return (
                      <Fragment key={field?.id}>
                        <div>
                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label className="common-label font-14 fw-medium">
                                  {t("enterSkill")}
                                </Form.Label>
                                <CreatableSelect
                                  className="common-field font-14"
                                  {...register(`expertise.${index}.skill`, {
                                    required: {
                                      value: true,
                                      message: t("required_message"),
                                    },
                                  })}
                                  isClearable
                                  options={skillCate}
                                  onChange={(newValue) => {
                                    // setExpertSkill([newValue]);x
                                    setValue(`expertise.${index}.skill`, newValue);
                                    clearErrors(`expertise.${index}.skill`);
                                  }}
                                  onCreateOption={(val) => {
                                    onChangeSelect(val, "expertise");
                                  }}
                                // value={expertSkill}
                                // name={expertSkill}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <div className="flex-none">
                                <Form.Label className="common-label font-14 fw-medium">
                                  {t("experience")}
                                </Form.Label>
                                <Form.Select
                                  {...register(`expertise.${index}.experience`, {
                                    required: {
                                      value: true,
                                      message: t("required_message"),
                                    },
                                  })}
                                  className="common-field font-14 shadow-none"
                                >
                                  <option value=""> {t("selectExperience")} </option>
                                  {EXPERIENCE_OPTIONS.map(
                                    ({ label, value }, index) => (
                                      <option value={value} key={index}>
                                        {label} {t("years")}
                                      </option>
                                    )
                                  )}
                                </Form.Select>
                                {errors?.skills?.[index]?.experience && (
                                  <p className="error-message">
                                    {errors?.skills[index]?.experience?.message}
                                  </p>
                                )}
                              </div>
                            </Col>
                          </Row>
                          {errors?.skills?.[index]?.skill && (
                            <p className="error-message">
                              {errors?.skills[index]?.skill?.message}
                            </p>
                          )}
                        </div>
                        {expertiseFields?.length > 1 && (
                          <Col md="12" className="d-flex justify-content-end">
                            <Button
                              className="arrow-btn danger-arrow ms-auto"
                              onClick={() => handleDelete(field?.id, index)}
                            >
                              <FaTrash />
                            </Button>
                          </Col>
                        )}
                      </Fragment>
                    );
                  })}

                  <div className="text-end mb-3">
                    <OverlayTrigger placement="bottom" overlay={addtooltip}>
                      <Button
                        className="arrow-btn primary-arrow ms-auto"
                        onClick={handleAppend}
                      >
                        +
                      </Button>
                    </OverlayTrigger>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="register-collapse-item" eventKey="3">
                <Accordion.Header className="register-collapse-header">
                  <h2 className="subheading-resume mb-0">
                  <span className="resume-step">4</span> {t("enterEducationDetails")}
                  </h2>
                </Accordion.Header>
                <Accordion.Body className="register-collapse-body">
                  {educationField.map(
                    (
                      item,
                      // {
                      //   id,
                      //   university_name,
                      //   degree_id,
                      //   address,
                      //   start_year,
                      //   end_year,
                      //   currently_attending,
                      // },
                      index
                    ) => (
                      <Row key={item.id}>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label className="font-14 fw-medium">{t("universityName")} *</Form.Label>
                            <Form.Control
                              type="text"
                              className="common-field font-14 shadow-none"
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
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label className="font-14 fw-medium">{t("degreeName")} *</Form.Label>
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
                            {/* <Controller
                          name={`educations.${index}.degree_id`}
                          control={control}
                          rules={{required:{
                            value:true,
                            message:t("required_message")
                          }}}
                          render={({ field }) => (
                            <CreatableSelect
                              {...field}
                              value={watch(`educations?.${index}.degree_id`)}
                              isClearable
                              onChange={(val) => {
                                setValue(`educations.${index}.degree_id`, val);
                              }}
                              // defaultValue={degreeList.find(
                              //   (option) => option.value === watch(`educations.${index}.degree_id`)
                              // )}
                              onCreateOption={handleCreate}
                              options={degreeList}
                            />
                          )}
                        /> */}
                            <CreatableSelect
                              className="common-field font-14"
                              {...register(`educations.${index}.degree_id`, {
                                required: {
                                  value: true,
                                  message: t("degree_name_required_msg"),
                                },
                              })}
                              // value={watch(`educations.${index}.degree_id`)}
                              isClearable
                              onChange={(val) => {
                                setValue(`educations.${index}.degree_id`, val);
                              }}
                              // value={degreeList.find((curElem)=>curElem.label === item.label)}
                              onCreateOption={handleCreate}
                              options={degreeList}
                            />
                            {errors?.educations?.[index]?.degree_id && (
                              <p className="error-message">
                                {errors.educations[index].degree_id.message}
                              </p>
                            )}
                            {/* <CreatableSelect
                            {...register(`expertise.${index}.skill`, {
                              required: {
                                value: true,
                                message: t("required_message"),
                              },
                            })}
                            isClearable
                            options={skillCate}
                            onChange={(newValue) => {
                              // setExpertSkill([newValue]);x
                              setValue(`expertise.${index}.skill`, newValue);
                              clearErrors(`expertise.${index}.skill`);
                            }}
                            onCreateOption={(val) => {
                              onChangeSelect(val, "expertise");
                            }}
                            // value={expertSkill}
                            // name={expertSkill}
                          /> */}
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label className="font-14 fw-medium">{t("address")} *</Form.Label>
                            {/* <Form.Control
                          className="common-field font-14"
                          type="text"
                          {...register(`educations[${index}].address`, {
                            required: {
                              value: true,
                              message: t("addressValidation"),
                            },
                          })}
                        /> */}
                            <Controller
                              name="address"
                              rules={{
                                required: "Address is required",
                              }}
                              className="common-field font-14 "
                              control={control}
                              render={({ field, fieldState }) => (
                                <Autocomplete
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
                            {errors?.educations?.[index]?.address && (
                              <p className="error-message">
                                {errors.educations[index].address.message}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label className="font-14 fw-medium">{t("startYear")} *</Form.Label>
                            <Form.Select
                              className="common-field font-14"
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
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label className="font-14 fw-medium">{t("endYear")} *</Form.Label>
                            <Form.Select
                              className="common-field font-14"
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
                            className="job-post-checkbox font-14 fw-medium"
                            id="edu-checkbox"
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
                          <Form.Label className="mb-0" htmlFor="edu-checkbox">
                            {t("currentlyAttending")}
                          </Form.Label>
                        </Form.Group>
                        {watch("educations")?.length > 1 && (
                          <Col md="12" className="d-flex justify-content-end">
                            <Button
                              className="arrow-btn danger-arrow"
                              // onClick={() => handleDeleteField(index,id)}
                              onClick={() => {
                                removeEducationField(index);
                              }}
                            >
                              <FaTrash />
                            </Button>
                          </Col>
                        )}
                      </Row>
                    )
                  )}

                  <div className="text-end my-3">
                    <OverlayTrigger placement="bottom" overlay={addtooltip}>
                      <Button
                        className="arrow-btn primary-arrow ms-auto"
                        onClick={handleAddMore}
                      >
                        +
                      </Button>
                    </OverlayTrigger>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="register-collapse-item" eventKey="4">
                <Accordion.Header className="register-collapse-header">
                  <h2 className="subheading-resume mb-0"><span className="resume-step">5</span> {t("enterExperience")}</h2>
                </Accordion.Header>
                <Accordion.Body className="register-collapse-body">
                  <ExperienceCV data={null} role="vendor" onSubmitVendor={onSubmit} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="register-collapse-item" eventKey="5">
                <Accordion.Header className="register-collapse-header">
                  <h2 className="subheading-resume mb-0"><span className="resume-step">6</span> Add Skills *</h2>
                </Accordion.Header>
                <Accordion.Body className="register-collapse-body">
                  <Row>
                    <Col md="12">
                      <Form.Group className="mb-4">
                        <Form.Label className="font-14 fw-medium">Add your skills</Form.Label>
                        <CreatableSelect
                          className="common-field font-14"
                          isMulti
                          isClearable
                          name={selectedOption}
                          onChange={(newValue) => {
                            setSelectedOption(newValue);
                          }}
                          onCreateOption={(val) => {
                            onChangeSelect(val, "skills");
                          }}
                          options={skillCate}
                          value={selectedOption}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="register-collapse-item" eventKey="6">
                <Accordion.Header className="register-collapse-header">
                  <h2 className="subheading-resume mb-0"><span className="resume-step">7</span> {t("addSocialLinks")}</h2>
                </Accordion.Header>
                <Accordion.Body className="register-collapse-body">
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
                              className="common-field font-14"
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
                    <OverlayTrigger placement="bottom" overlay={addtooltip}>
                      <Button
                        className="arrow-btn primary-arrow ms-auto"
                        onClick={handleAddMoreSocial}
                      >
                        +
                      </Button>
                    </OverlayTrigger>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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
