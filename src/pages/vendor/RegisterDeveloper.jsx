import React, { useEffect, useState } from "react";
import StepOne from "./Steps/Step1";
import StepTwo from "./Steps/Step2";
import StepThree from "./Steps/Step3";
import StepFour from "./Steps/Step4";
import StepFive from "./Steps/Step5";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { getAddNewDeveloper } from "../../redux/slices/vendorDataSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { getDegreeList } from "../../redux/slices/developerDataSlice";
import RexettButton from "../../components/atomic/RexettButton";

const options = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'JavaScript' },
    { value: 'jquery', label: 'jQuery' },
    { value: 'reactjs', label: 'ReactJS' },
    { value: 'vuejs', label: 'VueJS' },
    { value: 'angularjs', label: 'AngularJS' },
    { value: 'bootstrap', label: 'Bootstrap' },
];

const RegisterDeveloper = () => {
    const dispatch = useDispatch()
    const { smallLoader } = useSelector(state => state.vendorData)
    const [disbaleYear, setDisbaleYear] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [skills, setSkills] = useState(null);
    const [disabledEndDates, setDisabledEndDates] = useState([]);
    const { degreeList } = useSelector(state => state.developerData)
    const skillLabels = skills?.map(skill => skill.value);
    const skillSet = skillLabels?.toString()
    const [socialMediaRows, setSocialMediaRows] = useState([
        {
            name: '',
            url: ''
        } 
    ]);

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
            description: ""
        }
    ]);

    useEffect(() => {
        dispatch(getDegreeList())
    }, [])

    function generateYears() {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = 1995; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    }

    // Example usage:
    const yearsArray = generateYears();

    const onSubmit = (data, index) => {
        setCurrentStep(currentStep - 1);
        let formData = {
            ...data,
            skills: skillSet
        }
        dispatch(getAddNewDeveloper(formData))
    };
    const handleAddMoreExp = async () => {

        const newExperienceField = {
            id: experienceFields.length + 1,
            company_name: '',
            job_title: '',
            description: '',
            start_date: '',
            end_date: '',
            is_still_working: false
        };

        setExperienceFields([...experienceFields, newExperienceField]);

    };
    const handleDeleteFieldExp = (id) => {
        const updatedExperienceFields = experienceFields.filter(field => field.id !== id);
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
        }
    ]);

   

    const handleAddMore = () => {
        const newEducationField = {
            id: educationFields.length + 1,
            university_name: '',
            degree_id: '',
            address: '',
            start_year: '',
            end_year: '',
            currently_attending: false
        };
        setEducationFields([...educationFields, newEducationField]);
    };


    const handleDeleteField = (id) => {
        const updatedEducationFields = educationFields.filter(field => field.id !== id);
        setEducationFields(updatedEducationFields);
    };

    const handleAddMoreSocial = () => {
        const newRow = { id: socialMediaRows.length + 1, name: '', url: '' };
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

    }

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

    }


    return (
        <>
            <section className="register-developer card-box">
                <div className="">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Personal Details</h2>
                        <div className="inner-form mb-3">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Developer Name</Form.Label>
                                        <Form.Control type="text"
                                            className="common-field"
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: "Name is required",
                                                },
                                            })} />
                                        <p className="error-message">
                                            {errors.name?.message}
                                        </p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Email</Form.Label>
                                        <Form.Control type="email"
                                            className="common-field"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "Email is required",
                                                },
                                            })} />
                                        <p className="error-message">
                                            {errors.email?.message}
                                        </p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Phone Number</Form.Label>
                                        <Form.Control type="text"
                                            className="common-field"
                                            name="phone_number"
                                            {...register("phone_number", {
                                                required: {
                                                    value: true,
                                                    message: "Phone Number is required",
                                                },
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "Please enter a valid phone number"
                                                }
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.phone_number?.message} </p>

                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="address_2"
                                            {...register("address_2", {
                                                required: {
                                                    value: true,
                                                    message: "Address is required",
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.address_2?.message} </p>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Address 2</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="address"
                                            {...register("address", {
                                                required: {
                                                    value: true,
                                                    message: false,
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.address?.message} </p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">City</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="City"
                                            {...register("city", {
                                                required: {
                                                    value: true,
                                                    message: "City is required",
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z\s]+$/,
                                                    message: "Country should not contain numbers or special character",
                                                }
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.city?.message} </p>
                                    </Form.Group>

                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">State</Form.Label>
                                        <Form.Control type="text"
                                            className="common-field"
                                            name="state"
                                            {...register("state", {
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
                                        <p className="error-message">
                                            {errors.state?.message} </p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Postal Code</Form.Label>
                                        <Form.Control type="text"
                                            className="common-field"
                                            name="post_code"
                                            {...register("post_code", {
                                                required: {
                                                    value: true,
                                                    message: "Postal code is required",
                                                },
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Postal code should only contain numbers",
                                                }
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.post_code?.message} </p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Country</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="country"
                                            {...register("country", {
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
                                        <p className="error-message">
                                            {errors.country?.message} </p>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Experience</h2>
                        <div className="inner-form mb-3">
                            {experienceFields.map(({ id, company, jobPosition, jobDescription, startDate, endDate, currentlyWorking }, index) => (
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Company Name</Form.Label>
                                            <Form.Control type="text"
                                                
                                                {...register(`experiences[${index}].company_name`, {
                                                    required: {
                                                        value: true,
                                                        message: "Company name is required",
                                                    },
                                                })} />
                                            {errors?.experiences?.[index]?.company_name && (
                                                <p className="error-message">{errors.experiences[index].company_name.message}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Job Position</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="job_title"
                                                placeholder="Enter Job Position"
                                                {...register(`experiences[${index}].job_title`, {
                                                    required: "Job Position is required",
                                                })}
                                            />
                                            {errors?.experiences?.[index]?.job_title && (
                                                <p className="error-message">{errors.experiences[index].job_title.message}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Job Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                as="textarea"
                                                rows={3}
                                                placeholder="Enter Job Description"
                                                {...register(`experiences[${index}].description`, {
                                                    required: "Description name is required",
                                                })}
                                            />
                                            {errors?.experiences?.[index]?.description && (
                                                <p className="error-message">{errors.experiences[index].description.message}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Enter Start Date"
                                                max={new Date().toISOString().split("T")[0]}
                                                {...register(`experiences[${index}].start_date`, {
                                                    required: "Start Date is required",
                                                    validate: {
                                                        dateRange: (value) => {
                                                            const end_date = watch(`experiences[${index}].end_date`); // Get the value of the end date field
                                                            if (!end_date || value <= end_date) {
                                                                return true;
                                                            }
                                                            return "Start Date must be before End Date";
                                                        },
                                                    },
                                                })}
                                            />
                                            {errors?.experiences?.[index]?.start_date && (
                                                <p className="error-message">{errors.experiences[index].start_date.message}</p>
                                            )}

                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="cv-field"
                                                placeholder="Enter End Date"
                                                max={new Date().toISOString().split("T")[0]}
                                                {...register(`experiences[${index}].end_date`, {
                                                    required: {
                                                        value: disabledEndDates[index] ? false : true,
                                                        message: "End Date is required",
                                                    },
                                                })}
                                                disabled={disabledEndDates[index]}
                                            />
                                            {errors?.experiences?.[index]?.end_date && (
                                                <p className="error-message">{errors.experiences[index].end_date.message}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md="12">
                                        <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                            <Form.Check
                                                type="checkbox"

                                                {...register(`experiences[${index}].is_still_working`, {
                                                    required: false,
                                                })}
                                                onChange={(e) => handleCurrentlyWorkingChange(e, index,)}
                                            />
                                            <Form.Label className="mb-0">Currently Working</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {index !== 0 && (
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button variant="danger" onClick={() => handleDeleteFieldExp(id)}><FaTrash /></Button>
                                        </Col>
                                    )}
                                </Row>
                            ))}
                            <div className="text-end my-3">
                                <Button className="main-btn py-2 px-3" onClick={handleAddMoreExp}>+</Button>
                            </div>
                        </div>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Education Details</h2>
                        <div className="inner-form mb-3">
                            {educationFields.map(({ id, university_name, degree_id, address, start_year, end_year, currently_attending }, index) => (
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>University Name</Form.Label>
                                            <Form.Control type="text"
                                                {...register(`educations[${index}].university_name`, {
                                                    required: {
                                                        value: true,
                                                        message: "University name is required",
                                                    },
                                                })} />
                                            {errors?.educations?.[index]?.university_name && (
                                                <p className="error-message">{errors.educations[index].university_name.message}</p>
                                            )}

                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Degree Name</Form.Label>
                                            <Select
                                                options={degreeList}
                                                onChange={(val) => setValue(`educations[${index}].degree_id`, val ? val.value : '')}
                                                defaultValue={degreeList.find(option => option.value === degree_id)}

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text"

                                                {...register(`educations[${index}].address`, {
                                                    required: {
                                                        value: true,
                                                        message: "Address is required",
                                                    },
                                                })} />
                                            {errors?.educations?.[index]?.address && (
                                                <p className="error-message">{errors.educations[index].address.message}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Start Year</Form.Label>
                                            <Form.Select
                                                {...register(`educations.${index}.start_year`, {
                                                    required: 'Start Year is required',
                                                    validate: {
                                                        lessThanEndYear: value => {
                                                            const endYear = watch(`educations.${index}.end_year`);
                                                            if (!endYear || parseInt(value) < parseInt(endYear)) {
                                                                return true;
                                                            }
                                                            return 'Start Year must be less than End Year';
                                                        }
                                                    }
                                                })}
                                            >
                                                <option disabled selected>Please select year</option>
                                                {yearsArray?.map((item) => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                            </Form.Select>
                                            {errors && errors.educations && errors.educations[index] && errors.educations[index].start_year && (
                                                <p className="error-message">{errors.educations[index].start_year.message}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md="3">
                                        <Form.Group className="mb-3">
                                            <Form.Label>End Year</Form.Label>
                                            <Form.Select
                                                {...register(`educations.${index}.end_year`, {
                                                    required: {
                                                        value: disbaleYear[index] ? false : true,
                                                        message: "End year is required"
                                                    }
                                                })}
                                                disabled={disbaleYear[index]}
                                            >
                                                <option disabled selected >Please select year</option>
                                                {yearsArray?.map((item) => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                            </Form.Select>
                                            {errors && errors.educations && errors.educations[index] && errors.educations[index].end_year && (
                                                <p className="error-message">{errors.educations[index].end_year.message}</p>
                                            )}
                                        </Form.Group>
                                    </Col >
                                    <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                        <Form.Check
                                            type="checkbox"
                                            className="cv-field"
                                            {...register(`educations[${index}].currently_attending`, {
                                                required: false,
                                            })}
                                            onChange={(e) => handleCurrentlyAttendingChange(e, index,)}
                                        />
                                        <Form.Label className="mb-0">Currently Attending</Form.Label>
                                    </Form.Group>
                                    {index !== 0 && (
                                        <Col md="12" className="d-flex justify-content-end">
                                            <Button variant="danger" onClick={() => handleDeleteField(id)}><FaTrash /></Button>
                                        </Col>
                                    )}
                                </Row>
                            ))}
                            <div className="text-end my-3">
                                <Button className="main-btn py-2 px-3" onClick={handleAddMore}>+</Button>
                            </div>
                        </div>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Skills</h2>
                        <div className="inner-form mb-3">
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        {/* <Form.Label>Skills</Form.Label> */}
                                        <Select

                                            defaultValue={skills?.label}
                                            onChange={setSkills}
                                            options={options}
                                            isMulti
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Add Social Links</h2>
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
                                                        <option value="facebook_url">Facebook</option>
                                                        <option value="linkedin_url">Linkedin</option>
                                                        <option value="twitter_url">Twitter</option>
                                                        <option value="github_url">Github</option>
                                                    </Form.Select>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="text"
                                                    className="cv-field"
                                                    placeholder="Enter Url"
                                                    {...register(`social_links[${index}].url`, {
                                                        required: {
                                                            value: true,
                                                            message: "Url is required",
                                                        },
                                                    })} />

                                                {errors?.social_links?.url && (
                                                    <p className="error-message">{errors.social_links?.url.message}</p>
                                                )}
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            <div className="text-end mb-3">
                                <Button className="main-btn py-2 px-3" onClick={handleAddMoreSocial}>+</Button>
                            </div>
                        </div>
                        <div className="text-center">
                            <RexettButton
                                type="submit"
                                text="Register"
                                className="main-btn px-5"
                                variant="transparent"
                                isLoading={smallLoader}
                            />
                        </div>
                    </Form>
                </div >
            </section >
        </>
    );
};

export default RegisterDeveloper;
