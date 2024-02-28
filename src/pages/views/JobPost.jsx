import React, {useEffect, useState} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { clientJobPost, getJobCategoryList, getSkillList, jobCategoryList, skillList } from "../../redux/slices/clientDataSlice";

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
    const {skillList,jobCategoryList,smallLoader}=useSelector(state=>state.clientData)
    const dispatch =useDispatch()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});

      useEffect(()=>{
      dispatch(getSkillList())
      dispatch(getJobCategoryList())
      },[dispatch])

      const skillListMapped=skillList.map((item)=>{return {value:item.title,label:item.title}})

      console.log(skillListMapped,jobCategoryList,"skillList")

      const onSubmit=(values)=>{
        console.log(values,"op")
        let convertArr=selectedOption.map((item)=>item.label)
        let data={
            ...values,
            skills:convertArr.toString()
        }
        dispatch(clientJobPost(data))
      }

      const onChangeSelect=(val)=>{
        console.log(val,"l;")
        setSelectedOption(val)

      }
    return (
        <>
            <section className="job-post-section">
                <h2 className="overview-card-heading mb-4">Job Post</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>Job Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Job Name" 
                                {...register("title", {
                                    required: {
                                      value: true,
                                      message: "Job name is Required",
                                    },
                                  })}
                                
                                />
                            </Form.Group>
                            <p className="error-message">
                                {errors.title?.message}
                            </p>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>Job Category</Form.Label>
                                <Form.Select
                                 {...register("category", {
                                    required: {
                                      value: true,
                                      message: "Job Type is Required",
                                    },
                                  })}
                                >
                                    <option value="" disabled selected>Select Job Category</option>
                                  
                                    {
                                        jobCategoryList?.map((item)=>{
                                            return (
                                                <>
                                                 <option value={item.id}>{item.title}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <p className="error-message">
                                {errors.category?.message}
                            </p>
                        </Col>
                        <Col md="12" className="mb-4">
                            <Form.Group>
                                <Form.Label>Job Description</Form.Label>
                                <Form.Control as="textarea" rows="5" placeholder="Enter Job Description"
                                {...register("description", {
                                    required: {
                                      value: true,
                                      message: "Description is required",
                                    },
                                  })}
                                />
                            </Form.Group>
                            <p className="error-message">
                                {errors.description?.message}
                            </p>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>Experience Required</Form.Label>
                                <Form.Select 
                                 {...register("experience", {
                                    required: {
                                      value: true,
                                      message: "Experienced is required",
                                    },
                                  })}
                                >
                                    <option value="" disabled selected>Select Experience Required</option>
                                    <option value="less_one">Less than 1 year</option>
                                    <option value="1-2 Years">1 - 2 years</option>
                                    <option value="2-3 Years">2 - 3 years</option>
                                    <option value="3-4 Years">3 - 4 years</option>
                                    <option value="4-5 Years">4 - 5 years</option>
                                    <option value="5 more">5+ years</option>
                                </Form.Select>
                            </Form.Group>
                            <p className="error-message">
                                {errors.experience?.message}
                            </p>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label className="d-block">Location</Form.Label>
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
                                </div>
                                <p className="error-message">
                                {errors.job_type?.message}
                            </p>
                            </Form.Group>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group>
                                <Form.Label>Contract</Form.Label>
                                <Form.Select
                                 {...register("contract_type", {
                                    required: {
                                      value: true,
                                      message: "Contract Type is required",
                                    },
                                  })}
                                >
                                    <option value="" selected disabled>Select Contract</option>
                                    <option value="Hourly">Hourly</option>
                                    <option value="Project Base">Project Base</option>
                                    <option value="Six month contract">6 month contract</option>
                                    <option value="one Year Contract">1 year contract</option>
                                </Form.Select>
                            </Form.Group>
                            <p className="error-message">
                                {errors.contract_type?.message}
                            </p>
                        </Col>
                        <Col md="6" className="mb-4">
                            <Form.Group className="mb-4">
                                <Form.Label>Skills</Form.Label>
                                <Select
                                    options={skillListMapped}
                                    onChange={(val) => onChangeSelect(val)}
                                    name="skills"
                                    isMulti
                                    // {...register("skills", {
                                    //     required: {
                                    //       value: false,
                                    //       message: "Skills is required",
                                    //     },
                                    //   })}
                                    
                                />
                            </Form.Group>
                            {/* <p className="error-message">
                                {errors.skills?.message}
                            </p> */}
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
            </section>
        </>
    )
}
export default JobPost;