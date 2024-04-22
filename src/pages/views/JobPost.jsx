import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { useForm } from "react-hook-form";
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  clientJobPost,
  clientUpdatePost,
  createNewJobCategory,
  getJobCategoryList,
  getSkillList,
  singleJobPostData,
} from "../../redux/slices/clientDataSlice";
import { useNavigate,useLocation } from "react-router";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { IoArrowBack } from "react-icons/io5";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const JobPost = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const navigate = useNavigate();
  const location=useLocation();
  const { skillList, jobCategoryList, smallLoader } = useSelector(
    (state) => state.clientData
  );
  const [otherCategory, setOtherCategory] = useState(null);
  const [options, setOptions] = useState([]);
  const [skillCate,setSkillsCate]=useState([])
  const {jobPostedData} = useSelector(state => state.clientData)

  const dispatch = useDispatch();
  const jobId = jobPostedData?.data?.id
  const route =   `/job-edit-post/${jobId}`
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});

  let id=location.pathname.split("/")[2]


  useEffect(()=>{
    if(id){
        dispatch(singleJobPostData(id,()=>{}))
    }
    },[])

  useEffect(() => {
    dispatch(getSkillList());
    dispatch(getJobCategoryList());
  }, [dispatch]);


  console.log(jobId,"jobid")
  console.log(jobPostedData,"jobPostedData")
  console.log(otherCategory , "otherCategory")
  useEffect(() => {

    setValue("title", jobPostedData?.data?.title)
    setValue("experience", jobPostedData?.data?.experience)
    setValue("contract_type", jobPostedData?.data?.contract_type)
    setValue("job_type", jobPostedData?.data?.job_type)
    setValue("description", jobPostedData?.data?.description)
    setValue("selectedOption", jobPostedData?.data?.skills)
    setValue("otherCategory", jobPostedData?.job_category?.title)

}, [jobPostedData])

  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });


  useEffect(() => {
    setOptions(jobCategoryList);
    setSkillsCate(skillListMapped)
  }, [jobCategoryList,skillList]);

  const handleCreate = (inputValue) => {
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setOptions((prev) => [...prev, newOption]);
      let data={
        title:inputValue
      }
      dispatch(createNewJobCategory(data,()=>{
        dispatch(getJobCategoryList());
      }))
    }, 1000);
  };


  const onSubmit = (values ,jobId) => {
    let convertArr = selectedOption.map((item) => item.label);
    let data = {
      ...values,
      skills: convertArr.toString(),
      category: otherCategory.label,
    };
    if(route){
      dispatch(clientUpdatePost(data ,jobId , ()=> { 
        navigate("/job-posted");
      }))
    }else{
    dispatch(
      clientJobPost(data, () => {
        navigate("/job-posted");
      })
    );
  };
}

  const onChangeSelect = (val) => {
    setTimeout(() => {
      const newOption = createOption(val);
      setSkillsCate((prev) => [...prev, newOption]);
   
    }, 1000);
  };

  const getCategory = (cat) => {
    console.log(cat,"cat")
    let data = jobCategoryList.find((item) => item.id == cat)
    console.log(data,"|d")
    // return {label:data.title,value:data.title}
}


  return (
    <>
      <section className="job-post-section card-box">
        <h2 className="mb-4 section-head d-flex align-items-center gap-3">
          <Link className="main-btn outline-main-btn mb-0" to="/job-posted">
            <IoArrowBack />
          </Link>{" "}
          { id ? "Edit Post" :"Job Post"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row>
            <Col md="6" className="mb-4">
              <Form.Group>
                <Form.Label>Job Name</Form.Label>
                <Form.Control
                  type="text"
                  className="common-field"
                  placeholder="Enter Job Name"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Job name is Required",
                    },
                  })}
                />
              </Form.Group>
              <p className="error-message ">{errors.title?.message}</p>
            </Col>

            <Col md="6" className="mb-4">
              <Form.Group>
                <Form.Label>Job Category</Form.Label>

                <CreatableSelect
                  isClearable
                  defaultValue={{ label: "Web develop", value: "Web develop" }}
                  onChange={(newValue) => {
                    setOtherCategory(newValue)
                  }}
                  onCreateOption={handleCreate}
                  options={options}
                  value={getCategory(jobPostedData?.data?.category)}
                />
              </Form.Group>
            </Col>

            <Col md="6" className="mb-4">
              <Form.Group>
                <Form.Label>Experience Required</Form.Label>
                <Form.Select
                  className="common-field"
                  {...register("experience", {
                    required: {
                      value: true,
                      message: "Experienced is required",
                    },
                  })}
                >
                  <option value="" disabled selected>
                    Select Experience Required
                  </option>
                  <option value="less_one">Less than 1 year</option>
                  <option value="1-2 Years">1 - 2 years</option>
                  <option value="2-3 Years">2 - 3 years</option>
                  <option value="3-4 Years">3 - 4 years</option>
                  <option value="4-5 Years">4 - 5 years</option>
                  <option value="5 more">5+ years</option>
                </Form.Select>
              </Form.Group>
              <p className="error-message">{errors.experience?.message}</p>
            </Col>
            <Col md="6" className="mb-4">
              <Form.Group>
                <Form.Label className="d-block">Location</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    value="Remote"
                    label="Remote"
                    id="remote_loc"
                    inline
                    name="location_radio"
                    {...register("job_type", {
                      required: {
                        value: true,
                        message: "Job Type is required",
                      },
                    })}
                  />
                  <Form.Check
                    type="radio"
                    value="On Site"
                    label="On Site"
                    id="remote_onsite"
                    inline
                    name="location_radio"
                    {...register("job_type", {
                      required: {
                        value: true,
                        message: "Job Type is required",
                      },
                    })}
                  />
                  <Form.Check
                    type="radio"
                    value="Hybrid"
                    label="Hybrid"
                    id="remote_hybrid"
                    inline
                    name="location_radio"
                    {...register("job_type", {
                      required: {
                        value: true,
                        message: "Job Type is required",
                      },
                    })}
                  />
                </div>
                <p className="error-message ">{errors.job_type?.message}</p>
              </Form.Group>
            </Col>
            <Col md="6" className="mb-4">
              <Form.Group>
                <Form.Label>Contract</Form.Label>
                <Form.Select
                  className="common-field"
                  {...register("contract_type", {
                    required: {
                      value: true,
                      message: "Contract Type is required",
                    },
                  })}
                >
                  <option value="" selected disabled>
                    Select Contract
                  </option>
                  <option value="Hourly">Hourly</option>
                  <option value="Project Base">Project Base</option>
                  <option value="Six month contract">6 month contract</option>
                  <option value="one Year Contract">1 year contract</option>
                  <option value="one Year Contract">1 year and above</option>
                  <option value="permanent">Permanent</option>
                </Form.Select>
              </Form.Group>
              <p className="error-message ">{errors.contract_type?.message}</p>
            </Col>
            <Col md="6" className="mb-4">
              <Form.Group>
                <Form.Label>Skills</Form.Label>
                {/* <Select
                  options={skillListMapped}
                  onChange={(val) => onChangeSelect(val)}
                  name="skills"
                  isMulti
               
                /> */}
                    <CreatableSelect
                    isMulti
                  isClearable
                  name={selectedOption}
                  onChange={(newValue) => {
                    setSelectedOption(newValue)
                  }}
                  onCreateOption={onChangeSelect}
                  options={skillCate}
                  defaultValue={{ label: "Web develop", value: "Web develop" }}                
                />
              </Form.Group>
              {/* <p className="error-message ">
                                {errors.skills?.message}
                            </p> */}
            </Col>
            <Col md="12" className="mb-4">
              <Form.Group>
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  className="common-field"
                  rows="5"
                  placeholder="Enter Job Description"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  })}
                />
              </Form.Group>
              <p className="error-message ">{errors.description?.message}</p>
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
  );
};
export default JobPost;
