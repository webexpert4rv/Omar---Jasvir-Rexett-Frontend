import React, { useEffect, useState } from "react";
import StepOne from "./Steps/Step1";
import StepTwo from "./Steps/Step2";
import StepThree from "./Steps/Step3";
import StepFour from "./Steps/Step4";
import StepFive from "./Steps/Step5";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Select from 'react-select';
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getDegreeList } from "../../redux/slices/developerDataSlice";



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
    const [currentStep, setCurrentStep] = useState(0);
    const { degreeList } = useSelector(state => state.developerData)
    const [disbaleYear, setDisbaleYear] = useState([]);
    const [disabledEndDates, setDisabledEndDates] = useState([]);



    function generateYears() {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = 1995; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    }

    const yearsArray = generateYears();


    const goToNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1);

    };
    useEffect(() => {
        dispatch(getDegreeList())
    }, [])

    const [experienceFields, setExperienceFields] = useState([
        {
            id: 1,
            company_name: '',
            job_title: '',
            jobDescription: '',
            start_date: '',
            end_date: '',
            is_still_working: false,
            description: ""
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
        name: "experiences",
        name: "educations",
        name: "social_links",
        name: "skills",
    });
    const handleCurrentlyWorkingChange =()=>{

    }

    const handleAddMoreExp = () => {
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
            id: 1,
            university_name: '',
            degree_id: '',
            address: '',
            start_year: '',
            end_year: '',
            currently_attending: false,
            description: ""
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
            currently_attending: false,
            description: "",
        };
        setEducationFields([...educationFields, newEducationField]);
    };
    const handleDeleteField = (id) => {
        const updatedEducationFields = educationFields.filter(field => field.id !== id);
        setEducationFields(updatedEducationFields);
    };
    const [selectedOption, setSelectedOption] = useState(null);
    const [socialMediaRows, setSocialMediaRows] = useState([
        { id: 1, socialMedia: '', url: '' } // Initial row
    ]);

    const handleAddMoreSocial = () => {
        const newRow = { id: socialMediaRows.length + 1, socialMedia: '', url: '' };
        setSocialMediaRows([...socialMediaRows, newRow]);
    };

    const handleDeleteRowSocial = (id) => {
        const updatedRows = socialMediaRows.filter(row => row.id !== id);
        setSocialMediaRows(updatedRows);
    };

    return (
        <>
            <section className="register-developer card-box">
                {/* <div className="step-counts">
                    {steps.map((step, index) => (
                        <span
                            key={index}
                            className={`count ${currentStep === index ? "current" : ""} ${currentStep > index ? "active" : ""}`}
                        >
                            {index + 1}
                        </span>
                    ))}
                </div> */}
                <div className="">
                    <Form onSubmit={handleSubmit(goToPreviousStep)}>
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Personal Details</h2>
                        <div className="inner-form mb-3">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Developer Name</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="name"
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
                                        <Form.Control type="text" className="common-field"
                                            name="email"
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
                                        <Form.Control type="text" className="common-field"
                                            name="phone_number"
                                            {...register("phone_number", {
                                                required: {
                                                    value: true,
                                                    message: "Phone number is required",
                                                },
                                            })} />
                                        <p className="error-message">
                                            {errors.phone_number?.message}
                                        </p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Address</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="address"
                                            {...register("address", {
                                                required: {
                                                    value: true,
                                                    message: "Address is required",
                                                },
                                            })} />
                                        <p className="error-message">
                                            {errors.address?.message}
                                        </p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">City</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="city"
                                            {...register("city", {
                                                required: {
                                                    value: true,
                                                    message: "City is required",
                                                },
                                            })} />
                                        <p className="error-message">
                                            {errors.city?.message}
                                        </p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">State</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="state"
                                            {...register("state", {
                                                required: {
                                                    value: true,
                                                    message: "State is required",
                                                },
                                            })} />
                                        <p className="error-message">
                                            {errors.state?.message}
                                        </p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Postal Code</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="post_code"
                                            {...register("post_code", {
                                                required: {
                                                    value: true,
                                                    message: "Postal code is required",
                                                },
                                            })} />
                                        <p className="error-message">
                                            {errors.post_code?.message}
                                        </p>
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
                                            })} />
                                        <p className="error-message">
                                            {errors.country?.message}
                                        </p>
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
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="company_name"
                                                placeholder="Enter Company Name"
                                                {...register(`experiences[${index}].company_name`, {
                                                    required: "Company name is required",
                                                })}
                                            />
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
                                                className="cv-field"
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
                                                className="cv-field"
                                                placeholder="Enter Start Date"
                                                max={new Date().toISOString().split("T")[0]}
                                                {...register(`experiences[${index}].start_date`, {
                                                    required: "Start Date is required",
                                                    validate: {
                                                        dateRange: (value) => {
                                                            const endDate = watch(`experiences[${index}].end_date`); // Get the value of the end date field
                                                            if (!endDate || value <= endDate) {
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
                                                className="cv-field"
                                                {...register(`experiences[${index}].is_still_working`, {
                                                    required: false,
                                                })}
                                                onChange={(e) => handleCurrentlyWorkingChange(e, index)}
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
                        <h2 className="overview-card-heading border-bottom-grey pb-2 mb-3">Enter Education Details </h2>
                        <div className="inner-form mb-3">
                            {educationFields.map(({ id, university, degree, address, startYear, endYear, currentlyAttending }, index) => (
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>University Name </Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                placeholder="Enter University Name"
                                                {...register(`educations.${index}.university_name`, { required: true })}

                                            />
                                            {errors && errors.educations && errors.educations[index] && errors.educations[index].university_name && (
                                                <p className="error-message">University name is required</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Degree Name</Form.Label>
                                            <Select
                                                options={degreeList}
                                                onChange={(val) => setValue(`educations.${index}.degree_id`, val ? val.value : '')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                placeholder="Enter Address"
                                                {...register(`educations.${index}.address`, { required: true })}

                                            />
                                            {errors && errors.educations && errors.educations[index] && errors.educations[index].address && (
                                                <p className="error-message">Address is required</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="cv-field common-field"
                                                placeholder="Enter Start Date"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="cv-field common-field"
                                                placeholder="Enter End Date"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md="12">
                                        <Form.Group className="mb-4 d-flex gap-2 align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                className="cv-field"
                                            />
                                            <Form.Label className="mb-0">Currently Attending</Form.Label>
                                        </Form.Group>
                                    </Col>
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
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
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
                                                    <Form.Select className="py-0 border-0 shadow-none bg-transparent">
                                                        <option value="facebook">Facebook</option>
                                                        <option value="linkedin">Linkedin</option>
                                                        <option value="twitter">Twitter</option>
                                                        <option value="github">Github</option>
                                                        <option value="instagram">Instagram</option>
                                                        <option value="gitlab">Gitlab</option>
                                                        <option value="pinterest">Pinterest</option>
                                                    </Form.Select>
                                                </InputGroup.Text>
                                                <Form.Control type="text" className="cv-field" placeholder="Enter Url"></Form.Control>
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
                            <Button
                                variant="transparent"
                                className="main-btn px-5"
                                onClick={goToPreviousStep}
                            >
                                Register
                            </Button>

                        </div>


                        {/* <div className="d-flex justify-content-center align-items-center gap-3">
                        {currentStep > 0 && (
                            <Button
                                variant="transparent"
                                className="main-btn px-5 outline-main-btn"
                                onClick={goToPreviousStep}
                            >
                                Back
                            </Button>
                        )}
                        {currentStep === steps.length - 1 ? (
                            <Button
                                variant="transparent"
                                className="main-btn px-5"
                                onClick={goToNextStep}
                            >
                                Finish
                            </Button>
                        ) : (
                            <Button
                                variant="transparent"
                                className="main-btn px-5"
                                onClick={goToNextStep}
                            >
                                Next
                            </Button>
                        )}
                    </div> */}
                    </Form>
                </div>
            </section>
        </>
    );
};

export default RegisterDeveloper;
