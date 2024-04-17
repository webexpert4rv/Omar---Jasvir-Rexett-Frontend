import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { clientJobPost, getJobCategoryList, getSkillList, jobCategoryList, skillList } from "../../redux/slices/clientDataSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
const JobPost = () => {
    const [selectedOption, setSelectedOption] = useState([]);
    const navigate = useNavigate()
    const { skillList, jobCategoryList, smallLoader } = useSelector(state => state.clientData)
    const [showTextInput, setShowTextInput] = useState(false);
    const [otherCategory, setOtherCategory] = useState('');
    const {t} = useTranslation()

    const dispatch = useDispatch()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});

    useEffect(() => {
        dispatch(getSkillList())
        dispatch(getJobCategoryList())
    }, [dispatch])

    const skillListMapped = skillList.map((item) => { return { value: item.title, label: item.title } })


    const onSubmit = (values) => {
        let convertArr = selectedOption.map((item) => item.label)
        let data = {
            ...values,
            skills: convertArr.toString(),
            category: showTextInput ? otherCategory : values.category
        }
        dispatch(clientJobPost(data, () => {
            navigate("/job-posted")
        }))
    }

    const onChangeSelect = (val) => {
        setSelectedOption(val)

    }

    const handleSelect = (e) => {
        let selectedValue = e
        if (selectedValue == "5") {
            setShowTextInput(true);
            setOtherCategory(selectedValue);
        }
        else setShowTextInput(false);

    }


    return (
        <>
            <section className="job-post-section card-box">
            <h2 className="mb-4 section-head"><Link to ="/job-posted"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16" className="back-button-icon">
                    <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
                </svg></Link> {t("jobPost")}</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>{t("jobName")}</Form.Label>
                                <Form.Control type="text" className="common-field" placeholder="Enter Job Name"
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: "Job name is Required",
                                        },
                                    })}

                                />
                            </Form.Group>
                            <p className="error-message ">
                                {errors.title?.message}
                            </p>
                        </Col>

                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>{t("jobCategory")}</Form.Label>
                                {showTextInput ?
                                    <div className="field">
                                        <div className="control ">
                                            <input
                                                className="input"
                                                id="otherCategory"
                                                // value={otherCategory}
                                                type="text"
                                                onChange={(e) => setOtherCategory(e.target.value)}
                                                placeholder="Enter Job Category"
                                                required
                                            />
                                        </div>
                                    </div>

                                    :
                                    <Form.Select

                                        className="common-field"
                                        onChange={(e) => handleSelect(e.target.value)}

                                    // {...register("category", {
                                    //     required: {
                                    //         value: true,
                                    //         message: "Job Type is Required",
                                    //     },
                                    // })}
                                    >
                                        <option value="" disabled selected>{t("selectJobCategory")}</option>

                                        {
                                            jobCategoryList?.map((item) => {
                                                return (
                                                    <>
                                                        <option value={item.id}>{item.title}</option>
                                                    </>
                                                )
                                            })
                                        }
                                        <option value="5" >{t("Others")}</option>
                                    </Form.Select>}
                            </Form.Group>
                        </Col>

                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>{t("experienceRequired")}</Form.Label>
                                <Form.Select
                                    className="common-field"
                                    {...register("experience", {
                                        required: {
                                            value: true,
                                            message: "Experienced is required",
                                        },
                                    })}
                                >
                                    <option value="" disabled selected>{t("selectExperienceRequired")}</option>
                                    <option value="less_one">{t("lessThan1Year")}</option>
                                    <option value="1-2 Years">1 - 2 {t("years")}</option>
                                    <option value="2-3 Years">2 - 3 {t("years")}</option>
                                    <option value="3-4 Years">3 - 4 {t("years")}</option>
                                    <option value="4-5 Years">4 - 5 {t("years")}</option>
                                    <option value="5 more">5+ {t("years")}</option>
                                </Form.Select>
                            </Form.Group>
                            <p className="error-message">
                                {errors.experience?.message}
                            </p>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label className="d-block">{t("location")}</Form.Label>
                                <div>
                                    <Form.Check type="radio" value="Remote" label="Remote" id="remote_loc" inline name="location_radio"
                                        {...register("job_type", {
                                            required: {
                                                value: true,
                                                message: "Job Type is required",
                                            },
                                        })}
                                    />
                                    <Form.Check type="radio" value="On Site" label="On Site" id="remote_loc" inline name="location_radio"
                                        {...register("job_type", {
                                            required: {
                                                value: true,
                                                message: "Job Type is required",
                                            },
                                        })}
                                    />
                                    <Form.Check type="radio" value="Hybrid" label="Hybrid" id="remote_loc" inline name="location_radio"
                                        {...register("job_type", {
                                            required: {
                                                value: true,
                                                message: "Job Type is required",
                                            },
                                        })}
                                    />
                                </div>
                                <p className="error-message ">
                                    {errors.job_type?.message}
                                </p>
                            </Form.Group>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>{t("contract")}</Form.Label>
                                <Form.Select
                                    className="common-field"
                                    {...register("contract_type", {
                                        required: {
                                            value: true,
                                            message: "Contract Type is required",
                                        },
                                    })}
                                >
                                    <option value="" selected disabled>{t("selectContract")}</option>
                                    <option value="Hourly">{t("hourly")}</option>
                                    <option value="Project Base">{t("projectBase")}</option>
                                    <option value="Six month contract">6 {t("monthContract")}</option>
                                    <option value="one Year Contract">1 {t("yearContract")}</option>
                                    <option value="one Year Contract">1 {t("yearAndAbove")}</option>
                                    <option value="permanent">{t("permanent")}</option>
                                </Form.Select>
                            </Form.Group>
                            <p className="error-message ">
                                {errors.contract_type?.message}
                            </p>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>Skills</Form.Label>
                                <Select
                                    options={skillListMapped}
                                    onChange={(val) => onChangeSelect(val)}
                                    name="skills"
                                    isMulti
                                // {...register("skills", {
                                //     required: {
                                //       value: true,
                                //       message: "Skills are required",
                                //     },
                                //   })}

                                />
                            </Form.Group>
                            {/* <p className="error-message ">
                                {errors.skills?.message}
                            </p> */}
                        </Col>
                        <Col md="12" className="mb-4">
                            <Form.Group>
                                <Form.Label>{t("jobDescription")}</Form.Label>
                                <Form.Control as="textarea" className="common-field" rows="5" placeholder="Enter Job Description"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: "Description is required",
                                        },
                                    })}
                                />
                            </Form.Group>
                            <p className="error-message ">
                                {errors.description?.message}
                            </p>
                        </Col>
                    </Row>
                    <div className="text-center">

                        <RexettButton
                            type="submit"
                            text="Submit"
                            className="main-btn px-5"
                            isLoading={smallLoader}
                        />
                    </div>
                </form>
            </section >
        </>
    )
}
export default JobPost;