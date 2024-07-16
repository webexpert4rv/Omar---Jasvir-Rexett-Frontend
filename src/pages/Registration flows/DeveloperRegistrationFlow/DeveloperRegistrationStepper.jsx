import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SidebarSection from "../SidebarSection";
import {
  DEFAULT_SCREENING_DATA,
  MODAL_INFORMATION,
  SIDEBAR_ITEMS,
  getActiveStepFields,
  getDeveloperActiveStepFields,
  getStepDataFromAPI,
  stepperFormKeys,
} from "../registrationConstant";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import {
  applyAsClient,
  filePreassignedUrlGenerate,
  fileUploadForWeb,
  getCoutriesList,
  getWebsiteSkills,
  uploadFileToS3Bucket,
} from "../../../redux/slices/clientDataSlice";
import SetUpJobModal from "../../../components/common/Modals/SetUpJobModal.jsx";
import {
  addDeveloperProject,
  addDeveloperRegisProject,
  developerRegistration,
  developerRegistrationBio,
  editDeveloperExperience,
  getDeveloperProfileDetails,
  getSkillOptions,
  registerDeveloperEducation,
  registerDeveloperExperience,
  registerDeveloperSkills,
} from "../../../redux/slices/developerDataSlice.js";
import {
  FaArrowLeft,
  FaCheck,
  FaCirclePlay,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaUpload,
} from "react-icons/fa6";
import ClientStep1 from "../Client Registration flow/ClientStep1.jsx";
import RegistrationType from "../Client Registration flow/RegistrationType.jsx";
import ResumeOverView from "./ResumeOverView.jsx";
import StepperIntro from "./StepperIntro.jsx";
import RecomdModal from "../../admin/ResumeSteps/Modals/RecomdModal.jsx";
import WorkHistory from "./WorkHistory.jsx";
import Summary from "./Summary.jsx";
import PreviewModal from "../../admin/ResumeSteps/Modals/PreviewResume.jsx";
import EducationLevelSelect from "./EducationLevelSelect.jsx";
import AddEducation from "../../admin/ResumeSteps/AddEducation.jsx";
import SkillAdd from "./SkillAdd.jsx";
import DeveloperCvModal from "./DeveloperCvModal.jsx";
import SummaryPreview from "../../admin/ResumeSteps/SummaryPreview.jsx";
import FinalizeResume from "../../admin/ResumeSteps/FinalizeResume.jsx";
import RegistrationStepModal from "../../views/Modals/RegistrationStepModal.jsx";

const DeveloperRegistrationStepper = () => {
  const dispatch = useDispatch();
  const { smallLoader, developerRegistrationData } = useSelector(
    (state) => state?.developerData
  );
  const [educationLevel, setEducationLevel] = useState(null);
  const [isEditMode,setEditMode]=useState({
    isEdit:false,
    id:null
  })
  const [ifDone,setDone]=useState(true);
  const [selectedRecommend,setSelectedRecommend]=useState(null)
  const [activeStep, setActiveStep] = useState(1);
  const [isAnotherData, setIsAnotherData] = useState(true);
  const [nestedActiveStep, setNestedActiveStep] = useState(0);
  const [previewImage, setPreviewImage] = useState({
    profile_picture: "",
    resume: "",
    introVideo: "",
  });
  const [imageFile, setImageFile] = useState({
    resume: "",
    introVideo: "",
  });
  const [registrationType, setRegistrationType] = useState("indivisual"); //for register as indivisual or company
  const [showSetUpModal, setShowSetUpJobModal] = useState({
    recommendation: false,
    introVideo: false,
    isDelete: false,
  });
  const [isRegistrationStepModal, setIsRegistrationStepModal] = useState(false);

  console.log(developerRegistrationData, "developerRegistrationData");
  let developer_id = localStorage.getItem("developerId");
  const activeStepFields = getDeveloperActiveStepFields(
    activeStep,
    nestedActiveStep
  );
  const activeStpperKey=stepperFormKeys(activeStep)
  console.log(activeStepFields, "activeStepFields");
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
    watch,
    setError,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      skills: [{ title: "", level: "" }],
      screening_questions: DEFAULT_SCREENING_DATA,
    },
  });
  const { skillOptions } = useSelector((state) => state.developerData);

  let stepData = getStepDataFromAPI(developerRegistrationData, activeStep);

  useEffect(() => {
    const storedStep = localStorage.getItem("clientActiveStep");
    const storedNestedStep = localStorage.getItem("nestedActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
      setNestedActiveStep(Number(storedNestedStep));
    }
    if(developer_id){
    dispatch(getDeveloperProfileDetails(developer_id));
    }
  }, []);

  useEffect(() => {
    if (stepData) {
      setValue("job_title", stepData[0]?.job_title);
      setValue("company_name", stepData[0]?.company_name);
      setValue("description",selectedRecommend? selectedRecommend: stepData[0]?.description );
      setValue("is_still_working", stepData[0]?.is_still_working);
      setValue("start_date", stepData[0]?.start_date?.slice(0, 10));
      setValue("end_date", stepData[0]?.end_date?.slice(0, 10));
      setValue("work_type", stepData[0]?.work_type);
      setValue("location", stepData[0]?.location);
    }
  }, [stepData,selectedRecommend]);

  useEffect(() => {
  
    if (activeStep === 1) {
      dispatch(getCoutriesList());
    }
    if (activeStep === 3) {
      dispatch(getSkillOptions());
    }
    dispatch(getSkillOptions());
  }, [activeStep]);

  const increaseStepCount = (isNested) => {
    if (isNested) {
      setNestedActiveStep((prev) => prev + 1);
      localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);
    } else {
      setActiveStep((prev) => prev + 1);
      localStorage.setItem("clientActiveStep", activeStep + 1);
    }
  };

  const decreaseStepCount = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("clientActiveStep", activeStep - 1);
  };

  const handleDelete = () => {};

  const handleEducationLevel = (item) => {
    setEducationLevel(item);
    setNestedActiveStep((prev) => prev + 1);
    localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);
  };

  const addAnotherPosition = () => {
    localStorage.setItem("nestedActiveStep", 1);
    setNestedActiveStep(1);
    setValue("job_title", "");
    setValue("company_name", "");
    setValue("description", "");
    setValue("is_still_working", "");
    setValue("start_date", "");
    setValue("end_date", "");
    setValue("work_type", "");
    setValue("location", "");
  };

  console.log(nestedActiveStep, "nestedActiveStep");
  console.log(activeStep);

  const editSummary=(id)=>{
    let selectedEditData=stepData?.find(it=>it.id==id)
    console.log(selectedEditData,"selectedEditData")
   if(activeStep==6 && selectedEditData){

    setValue("project_title", "amitt");
    setValue("project_description", selectedEditData?.project_description);
    setValue("tech_stacks_used", selectedEditData?.tech_stacks_used);
    setValue("role_in_project", selectedEditData?.role_in_project);
    setValue("project_team_size", selectedEditData?.project_team_size);
    setValue("project_link", selectedEditData?.project_link);
    setValue("project_start_date", selectedEditData?.project_start_date?.slice(0,10));
    setValue("project_end_date", selectedEditData?.project_end_date?.slice(0,10));
    setValue("project_type", selectedEditData?.project_type);
    localStorage.setItem("nestedActiveStep", 1);
    setNestedActiveStep(1);


   }else if(activeStep==5 && selectedEditData){
   
    setValue("job_title", selectedEditData?.job_title);
    setValue("company_name", selectedEditData?.company_name);
    setValue("description", selectedEditData?.description);
    setValue("is_still_working",selectedEditData?.is_still_working);
    setValue("start_date",selectedEditData?.start_date);
    setValue("end_date",selectedEditData?.end_date);
    setValue("work_type",selectedEditData?.work_type);
    setValue("location", selectedEditData?.location);
    localStorage.setItem("nestedActiveStep", 1);
    setNestedActiveStep(1);
   }
   setEditMode({
    id:id,
    isEdit:true
   })
  
  }
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <ClientStep1
            control={control}
            errors={errors}
            activeStep={activeStep}
            nestedActiveStep={nestedActiveStep}
            type={"developer"}
            register={register}
            stepFields={activeStepFields}
            setError={setError}
            clearErrors={clearErrors}
            watch={watch}
            setValue={setValue}
            previewImage={previewImage}
            imageFile={imageFile}
            setPreviewImage={setPreviewImage}
            setImageFile={setImageFile}
            isProfileSectionRequired={activeStep === 1 && nestedActiveStep == 0}
          />
        );

      case 2:
        switch (nestedActiveStep) {
          
          case 0:
            return (
              <StepperIntro
                nestedActiveStep={nestedActiveStep}
                activeStep={activeStep}
              />
            );
          case 1:
            // return (
            //   // this step will be used for both first and second
            //   <ClientStep1
            //     control={control}
            //     errors={errors}
            //     activeStep={activeStep}
            //     nestedActiveStep={nestedActiveStep}
            //     type={"developer"}
            //     register={register}
            //     stepFields={activeStepFields}
            //     setError={setError}
            //     clearErrors={clearErrors}
            //     watch={watch}
            //     setValue={setValue}
            //     previewImage={previewImage}
            //     imageFile={imageFile}
            //     setPreviewImage={setPreviewImage}
            //     setImageFile={setImageFile}
            //     isProfileSectionRequired={
            //       activeStep === 1 && nestedActiveStep == 0
            //     }
            //   />
            // );
            return (
              <AddEducation
                control={control}
                errors={errors}
                activeStep={activeStep}
                nestedActiveStep={nestedActiveStep}
                type={"developer"}
                register={register}
                stepFields={activeStepFields}
                setError={setError}
                clearErrors={clearErrors}
                watch={watch}
                setValue={setValue}
                previewImage={previewImage}
                imageFile={imageFile}
                setPreviewImage={setPreviewImage}
                setImageFile={setImageFile}
                isProfileSectionRequired={
                  activeStep === 1 && nestedActiveStep == 0
                }
                selectedRecommend={selectedRecommend}
                setSelectedRecommend={setSelectedRecommend}
              />
            );
          case 2:
            return (
              <Summary
                nestedActiveStep={nestedActiveStep}
                stepData={stepData}
                handleDelete={handleDelete}
                handleClose={handleClose}
                smallLoader={smallLoader}
                showSetUpModal={showSetUpModal}
                setShowSetUpJobModal={setShowSetUpJobModal}
                addAnotherPosition={addAnotherPosition}
                 activeStep={activeStep}
                type="developer"
                editSummary={editSummary}
              />
            );
        }
      case 3:
        switch (nestedActiveStep) {
          case 0:
            return (
              <StepperIntro
                nestedActiveStep={nestedActiveStep}
                activeStep={activeStep}
              />
            );
          case 1:
            return (
              <EducationLevelSelect
                handleEducationLevel={handleEducationLevel}
              />
            );
          case 2:
            return (
              <AddEducation
                control={control}
                errors={errors}
                activeStep={activeStep}
                nestedActiveStep={nestedActiveStep}
                type={"developer"}
                register={register}
                stepFields={activeStepFields}
                setError={setError}
                clearErrors={clearErrors}
                watch={watch}
                setValue={setValue}
                previewImage={previewImage}
                imageFile={imageFile}
                setPreviewImage={setPreviewImage}
                setImageFile={setImageFile}
                isProfileSectionRequired={
                  activeStep === 1 && nestedActiveStep == 0
                }
              />
            );

          case 3:
            return (
              <Summary
                nestedActiveStep={nestedActiveStep}
                stepData={stepData}
                handleDelete={handleDelete}
                handleClose={handleClose}
                smallLoader={smallLoader}
                showSetUpModal={showSetUpModal}
                setShowSetUpJobModal={setShowSetUpJobModal}
                addAnotherPosition={addAnotherPosition}
                activeStep={activeStep}
                type="developer"
              />
            );
        }

      case 4:
        switch (nestedActiveStep) {
          case 0:
            return (
              <StepperIntro
                nestedActiveStep={nestedActiveStep}
                activeStep={activeStep}
              />
            );
          case 1:
          case 2:
            return (
              <SkillAdd
                register={register}
                stepFields={activeStepFields}
                errors={errors}
                skillOptions={skillOptions}
                activeStep={activeStep}
                watch={watch}
                setValue={setValue}
                control={control}
                  nestedActiveStep={nestedActiveStep}
                type="developer"
              />
            );
        }
        case 5:
          switch (nestedActiveStep) {
            case 0: 
              return (
                <StepperIntro
                  nestedActiveStep={nestedActiveStep}
                  activeStep={activeStep}
                />
              );  
            case 1:
              return (
                <SkillAdd
                register={register}
                stepFields={activeStepFields}
                errors={errors}
                skillOptions={skillOptions}
                activeStep={activeStep}
                watch={watch}
                setValue={setValue}
                control={control}
                nestedActiveStep={nestedActiveStep}
                type="developer"
              />
              )
            case 2:
              return (
                <AddEducation
                control={control}
                errors={errors}
                activeStep={activeStep}
                nestedActiveStep={nestedActiveStep}
                type={"developer"}
                register={register}
                stepFields={activeStepFields}
                setError={setError}
                clearErrors={clearErrors}
                watch={watch}
                setValue={setValue}
                previewImage={previewImage}
                imageFile={imageFile}
                setPreviewImage={setPreviewImage}
                setImageFile={setImageFile}
                isProfileSectionRequired={
                  activeStep === 1 && nestedActiveStep == 0
                }
              />
              )  

          }

          case 6:
          switch (nestedActiveStep) {
            case 0: 
              return (
                <StepperIntro
                  nestedActiveStep={nestedActiveStep}
                  activeStep={activeStep}
                />
              ); 

              case 1:
                return (
                  <AddEducation
                  control={control}
                  errors={errors}
                  activeStep={activeStep}
                  nestedActiveStep={nestedActiveStep}
                  type={"developer"}
                  register={register}
                  stepFields={activeStepFields}
                  setError={setError}
                  clearErrors={clearErrors}
                  watch={watch}
                  setValue={setValue}
                  previewImage={previewImage}
                  imageFile={imageFile}
                  setPreviewImage={setPreviewImage}
                  setImageFile={setImageFile}
                  isProfileSectionRequired={
                    activeStep === 1 && nestedActiveStep == 0
                  }
                  />
                )

               case 2:
                return (
                  <Summary
                  nestedActiveStep={nestedActiveStep}
                  stepData={stepData}
                  handleDelete={handleDelete}
                  handleClose={handleClose}
                  smallLoader={smallLoader}
                  showSetUpModal={showSetUpModal}
                  setShowSetUpJobModal={setShowSetUpJobModal}
                  addAnotherPosition={addAnotherPosition}
                  activeStep={activeStep}
                  type="developer"
                  objectKeys={activeStpperKey}
                  editSummary={editSummary}
                />
                ) 
            }
          case 7:
            return (
              <FinalizeResume/>
            )  

    }
  };

  const onSubmit = (values) => {
    console.log(values, "va");

    const uploadFiles = (files) => {
      let uploadedUrls = {};

      const uploadPromises = Object.keys(files).map((key) => {
        if (files[key]) {
          let fileData = new FormData();
          fileData.append("file", files[key]);

          return new Promise((resolve) => {
            dispatch(
              fileUploadForWeb(fileData, (url) => {
                console.log(url, `${key} url`);
                uploadedUrls[key] = url;
                resolve();
              })
            );
          });
        } else {
          return Promise.resolve(); // Resolve immediately if no file to upload
        }
      });

      Promise.all(uploadPromises).then(() => {
        let payload = {
          first_name: values?.first_name,
          last_name: values?.last_name,
          profile_picture: uploadedUrls?.profile_picture,
          profession: values?.profession,
          email: values?.email,
          country: values?.country_code?.label,
          address: values?.address,
          password: values?.password,
          city: values?.city,
          state: values?.state_iso_code?.label,
          country_iso_code: "string",
          state_iso_code: values?.state_iso_code?.value,
          passcode: values?.passcode,
          country_code: values?.country_code.value,
          phone_number: values?.phone_number,
          language_proficiency: values?.language_proficiency,
          time_zone: values?.time_zone?.label,
          resume: uploadedUrls?.resume,
          linkedin_url: "https://www.linkedin.com/",
          github_url: "https://github.com/",
          intro_video_url: uploadedUrls?.introVideo,
        };

        dispatch(developerRegistration(payload));
      });
    };

    if(activeStep==2){
      let developer_experience = [];
      if(nestedActiveStep==1){
        if(isEditMode?.isEdit){
          developer_experience = [
            {
              job_title: values?.job_title,
              company_name: values?.company_name,
              start_date:  values?.start_date,
              end_date: values?.is_still_working?null: values?.end_date,
              work_type: values?.work_type,
              is_still_working: values?.is_still_working,
              description: values?.description,
            },
          ];
          dispatch(editDeveloperExperience(developer_experience,isEditMode?.id ));
          increaseStepCount(true);

        }else{

        }
         developer_experience = [
          {
            job_title: values?.job_title,
            company_name: values?.company_name,
            start_date:  values?.start_date,
            end_date: values?.is_still_working?null: values?.end_date,
            work_type: values?.work_type,
            is_still_working: values?.is_still_working,
            description: values?.description,
          },
        ];
        dispatch(registerDeveloperExperience(developer_experience, developer_id));
        increaseStepCount(true);

      }else if(nestedActiveStep==0) {
        
        increaseStepCount(true);
      }else{
        setNestedActiveStep(0);
        localStorage.setItem("nestedActiveStep", 0);
        increaseStepCount(false);
      }
     } else if (activeStep === 3) {


      if (activeStep == nestedActiveStep) {
        setNestedActiveStep(0);
        localStorage.setItem("nestedActiveStep", 0);
        increaseStepCount(false);
      } else {
        if (nestedActiveStep == 2) {
          let developer_education = [
            {
              university_name: values?.name,
              address: values?.location,
              degree_id: 0,
              field_of_study: values?.study,
              start_year: 0,
              end_month: "string",
              end_year: 0,
              currently_attending: true,
              description: values?.description,
            },
          ];
          dispatch(
            registerDeveloperEducation(developer_education, developer_id)
          );
          increaseStepCount(true);
          
        }else{
          increaseStepCount(true);
        }
      }
    } else if (activeStep == 4) {

      if(nestedActiveStep==2){
      
      const transformData = (data) => {
        return data?.map(item => ({
          skill: item.title.label,
          experience: `${item.experience.value} years`,
          skill_weight: item.level.value
        }));
      };
      const output = transformData(values?.skills);
      let payload ={
        developer_id:localStorage.getItem("developerId"),
        skills:output
      }

      dispatch(registerDeveloperSkills(payload))
      setNestedActiveStep(0);
      localStorage.setItem("nestedActiveStep", 0);
      increaseStepCount(false)

      }else if(nestedActiveStep==1 ){
   
      setNestedActiveStep((prev) => prev + 1);
      localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);
      const transformData = (data) => {
        return data?.map(item => ({
          skill: item.title.label,
          experience: `${item.experience.value} years`,
          skill_weight: item.level.value
        }));
      };
      const output = transformData(values?.skills);
      let payload ={
        developer_id:localStorage.getItem("developerId"),
        skills:output
      }

      dispatch(registerDeveloperSkills(payload))
    }else{
      setNestedActiveStep((prev) => prev + 1);
      localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);

    }

    } else if(activeStep==5) {
      if(nestedActiveStep==1){
        let payload={
          developer_id:localStorage.getItem("developerId"),
          bio:values?.description
        }
        dispatch(developerRegistrationBio(payload))
        setNestedActiveStep(0);
        localStorage.setItem("nestedActiveStep", 0);
        increaseStepCount(false)


      }else{
        setNestedActiveStep((prev) => prev + 1);
        localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);

      }
    }

      else if(activeStep==6){
        
        if(nestedActiveStep==1){
          let developer_project=[
            {
              "project_title": values?.project_title,
              "project_description": values?.project_description,
              "tech_stacks_used": values?.tech_stacks_used,
              "role_in_project": values?.role_in_project,
              "project_team_size": values?.project_team_size,
              "project_link": values?.project_link,
              "project_start_date": values?.project_start_date,
              "project_end_date": values?.project_end_date,
              "project_type": values?.project_type
            }
          ]
          let payalod={
            user_id:localStorage.getItem("developerId"),
            projects:developer_project
          }
          dispatch(addDeveloperRegisProject(payalod))
          increaseStepCount(true)
        }else if(nestedActiveStep==0){
          setNestedActiveStep((prev) => prev + 1);
          localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);
        }else{
          setNestedActiveStep(0);
          localStorage.setItem("nestedActiveStep", 0);
          increaseStepCount(false)
        }

      }
      else{
      console.log(values, "these are values");
      uploadFiles({
        resume: imageFile.resume,
        introVideo: imageFile.introVideo,
        profile_picture: imageFile.profile_picture,
      });
      if(ifDone){
        increaseStepCount(false);
        setDone(true)
      }

   
    }
  };
  const handleSetActiveStep = (step) => {
    if (activeStep > step) {
      setActiveStep(step);
      localStorage.setItem("clientActiveStep", step);
    }
  };
  //   add this inside constant file
  const getActiveStepText = () => {
    switch (activeStep) {
      case 1:

          return "Next : Work History";
         
      case 2:
        switch (nestedActiveStep){
          case 0:
          case 1:
            case 2:
            return "Next";
            }
            case 2: 
            return "Next : Job Description";
      
      case 3:
        return "Next:Screening Info";
      case 4:
        return "Submit";
        case 5:
          return "Submit";
        case 6:
          return "Next"  
    }
  };

  const getActiveDecreaseStepText = () => {
    switch (activeStep) {
      case 1:
        return "Done";
       case 2:
        case 3:
          case 4:
            case 5:
              case 6: 
       return "Preview"
    }
  };

  const handleRegistrationType = (registrationType) => {
    setRegistrationType(registrationType);
    increaseStepCount();
  };
  const handleClose = () => {
    setShowSetUpJobModal({
      recommendation: false,
    });
  };
  const handleProceed = () => {
    const stepData = watch();
    const payload = {
      ...stepData,
      country_code: stepData["country_code"]?.value,
      state_iso_code: stepData["state_iso_code"]?.value,
      country: stepData["country_code"]?.label,
      state: stepData["state_iso_code"]?.label,
      // profile_picture: selectedImage,
    };
    setShowSetUpJobModal({
      recommendation: false,
    });
    increaseStepCount();
    // const handleAfterApiSuccess = () => {
    //   increaseStepCount();
    //   reset();
    // };
    // console.log(stepData,"stepData")
    // const filePayload = { file: imageFile };
    // dispatch(
    //   uploadFileToS3Bucket(filePayload, (url) => {
    //     const payload = {
    //       ...stepData,
    //       country_code: stepData["country_code"]?.value,
    //       state_iso_code: stepData["state_iso_code"]?.value,
    //       country: stepData["country_code"]?.label,
    //       state: stepData["state_iso_code"]?.label,
    //       profile_picture: url,
    //     };
    //     console.log(payload,"payload")
    //     dispatch(applyAsClient(payload, handleAfterApiSuccess));
    //   })
    // );

    // replace trigger verification modal with last callback function
    //  dispatch(applyAsClient(payload,handleAfterApiSuccess,()=>{}))
  };
  const profileSubmitIfDone=()=>{
    // setActiveStep(1);
    //   localStorage.setItem("clientActiveStep", activeStep + 1);
    if(activeStep === 1){
      setDone(false)
    }
    else{
      setIsRegistrationStepModal(true);
    }
    

  }


const handleRegistrationModal = () => {
  setIsRegistrationStepModal(false);
}

  return (
    <section className="resume-section-wrapper">
      <SidebarSection
        activeStep={activeStep}
        handleSetActiveStep={handleSetActiveStep}
        stepperSideBarItems={SIDEBAR_ITEMS?.developer}
      />

      <div className="resume-main-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <div>
              <span
                onClick={decreaseStepCount}
                className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium cursor-pointer"
              >
                <FaArrowLeft /> Go Back
              </span>
            </div>
            <Row>
              <Col md={nestedActiveStep == 3 || nestedActiveStep == 4 ? 12 : 8}>
                {renderActiveStep()}
              </Col>
              {nestedActiveStep !== 3 && (
                <Col md={4}>
                  <ResumeOverView activeStep={activeStep} />
                </Col>
              )}
            </Row>

            <div className="d-flex justify-content-end align-items-center ">
              <div className="me-3">
                <RexettButton
                  type="submit"
                  text={getActiveDecreaseStepText()}
                  className="main-btn px-5 mr-2"
                  onClick={profileSubmitIfDone}
                  disabled={smallLoader}
                  isLoading={smallLoader}
                />
              </div>
              <div>
                <RexettButton
                  type="submit"
                  text={getActiveStepText()}
                  className="main-btn px-5 mr-2"
                  disabled={smallLoader}
                  isLoading={smallLoader}
                />
              </div>
            </div>
          </Container>
        </form>
      </div>
      <RecomdModal
        show={showSetUpModal.recommendation}
        handleClose={handleClose}
      />
      <PreviewModal
        show={showSetUpModal.introVideo}
        handleClose={handleClose}
      />
      <RegistrationStepModal
      show={isRegistrationStepModal}
      handleClose={handleRegistrationModal}
      />
    </section>
  );
};

export default DeveloperRegistrationStepper;
