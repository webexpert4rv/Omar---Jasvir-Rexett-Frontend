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
import { useTranslation } from "react-i18next";

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
  const [skillCate, setSkillsCate] = useState([])
  const { jobPostedData } = useSelector(state => state.clientData)
  const { t } = useTranslation()

  const dispatch = useDispatch();
  let id=location.pathname.split("/")[2]
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});

  


  useEffect(()=>{
    if(id){
        dispatch(singleJobPostData(id,()=>{}))
    }
    },[])

  useEffect(() => {
    dispatch(getSkillList());
    dispatch(getJobCategoryList());
  }, [dispatch]);

  //   useEffect(() => {
  //     if (data) {
  //         const array = data.split(",").map(tech => ({ label: tech.trim(), value: tech.trim() }));
  //         setSelectedOption(array);
  //     }
  // }, [data]);

  const getCategory = (cat) => {
    if(cat!==undefined){
      console.log(cat,"cat")
      let data = jobCategoryList.find((item) => item.value == cat)
      console.log(data,"|d")
      if(data){
        setOtherCategory({label:data.label,value:data.value})
      }
    }
   
}


  useEffect(() => {
    if(id){
      setValue("title", jobPostedData?.data?.title)
      setValue("experience", jobPostedData?.data?.experience)
      setValue("contract_type", jobPostedData?.data?.contract_type)
      setValue("job_type", jobPostedData?.data?.job_type)
      setValue("description", jobPostedData?.data?.description)
      getCategory(jobPostedData?.data?.category)
      convertToArray(jobPostedData?.data?.skills)
    }else{
      reset()
      setOtherCategory(null)
      setSelectedOption([])

    }
  }, [jobPostedData,jobCategoryList ,id])

  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });


  useEffect(() => {
    setOptions(jobCategoryList);
    setSkillsCate(skillListMapped)
  }, [jobCategoryList, skillList]);

  const handleCreate = (inputValue) => {
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setOptions((prev) => [...prev, newOption]);
      let data = {
        title: inputValue
      }
      dispatch(createNewJobCategory(data, () => {
        dispatch(getJobCategoryList());
      }))
    }, 1000);
  };

  const onSubmit = (values) => {
    let convertArr = selectedOption.map((item) => item.label);
    let data = {
      ...values,
      skills: convertArr.toString(),
      category: otherCategory?.value,
    };
    if (id) {
      dispatch(clientUpdatePost(data, id, () => {
        navigate("/job-posted");
      }))
    } else {
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

  const convertToArray = (arr) => {
    if(arr){
      const skillsArray = arr?.split(",");
      console.log(skillsArray,"skillsArray")
      let data=skillsArray?.map((item)=>{
       return {
         value: item, label: item
       }
      })
      setSelectedOption(data)
    }
  
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
                <Form.Label>{t("jobName")}</Form.Label>
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
                <Form.Label>{t("jobCategory")}</Form.Label>

                <CreatableSelect
                  isClearable
                  onChange={(newValue) => {
                    console.log(newValue,"newValue")
                    setOtherCategory(newValue)
                  }}
                  onCreateOption={handleCreate}
                  options={options}
                  value={otherCategory}
                />
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
                  <option  disabled selected>
                    {t("select")} {t("experienceRequired")}
                  </option>
                  <option value="Less_than_one">{t("lessThan1Year")}</option>
                  <option value="1-2_Years">1 - 2 {t("years")}</option>
                  <option value="2-3_Years">2 - 3 {t("years")}</option>
                  <option value="3-4_Years">3 - 4 {t("years")}</option>
                  <option value="4-5_Years">4 - 5 {t("years")}</option>
                  <option value="5_more">5+ {t("years")}</option>
                </Form.Select>
              </Form.Group>
              <p className="error-message">{errors.experience?.message}</p>
            </Col>
            <Col md="6" className="mb-4">
              <Form.Group>
                <Form.Label className="d-block">{t("location")}</Form.Label>
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
                  <option value="" selected disabled>
                    {t("selectContract")}
                  </option>
                  <option value="Hourly">{t("hourly")}</option>
                  <option value="Project Base">{t("projectBase")}</option>
                  <option value="Six month contract">6 {t("MonthContract")}</option>
                  <option value="one Year Contract">1 {t("yearContract")}</option>
                  <option value="one Year Contract">1 {t("yearAndAbove")}</option>
                  <option value="permanent">{t("permanent")}</option>
                </Form.Select>
              </Form.Group>
              <p className="error-message ">{errors.contract_type?.message}</p>
            </Col>
            <Col md="6" className="mb-4">
              <Form.Group>
                <Form.Label>{t("skills")}</Form.Label>
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
                  value={selectedOption}
                />
              </Form.Group>
              {/* <p className="error-message ">
                                {errors.skills?.message}
                            </p> */}
            </Col>
            <Col md="12" className="mb-4">
              <Form.Group>
                <Form.Label>{t("jobDescription")}</Form.Label>
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
              text={t("submit")}
              className="main-btn px-5"
              disabled={smallLoader}
              isLoading={smallLoader}
            />
          </div>
        </form>
      </section>
    </>
  );
};
export default JobPost;
