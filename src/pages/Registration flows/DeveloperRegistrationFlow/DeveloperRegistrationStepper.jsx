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
  fileUploadForWeb,
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
  let token = localStorage.getItem('token')
  const { smallLoader, developerRegistrationData } = useSelector(
    (state) => state?.developerData
  );
  const [countryCode, setCountryCode] = useState()
  const [educationLevel, setEducationLevel] = useState(null);
  const [isEditMode, setEditMode] = useState({
    isEdit: false,
    id: null
  })
  const [ifDone, setDone] = useState(true);
  const [selectedRecommend, setSelectedRecommend] = useState(null)
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
  const [registrationType, setRegistrationType] = useState("individual"); //for register as indivisual or company
  const [showSetUpModal, setShowSetUpJobModal] = useState({
    recommendation: false,
    introVideo: false,
    isDelete: false,
  });
  let arrPercentage = [0, 0, 30, 40, 50, 70, 80, 100]
  const [isRegistrationStepModal, setIsRegistrationStepModal] = useState(false);
  const [filteredStepData, setFilteredStepData] = useState([]);
  let developer_id = localStorage.getItem("developerId");
  const activeStepFields = getDeveloperActiveStepFields(
    activeStep,
    nestedActiveStep
  );
  const activeStpperKey = stepperFormKeys(activeStep)
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
  const storedStep = localStorage.getItem("clientActiveStep");
  const stripHtmlTags = (str) => {
    return str?.replace(/<\/?[^>]+(>|$)/g, "");
  }

  console.log(filteredStepData, "filteredStepDataDeveloperStepper")
  useEffect(() => {
    setFilteredStepData(stepData);
  }, [stepData])

  useEffect(() => {
    const storedNestedStep = localStorage.getItem("nestedActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
      setNestedActiveStep(Number(storedNestedStep));
    }
    if (developer_id) {
      dispatch(getDeveloperProfileDetails(developer_id));
    }
  }, []);

  let fields = watch();

  let name = stepData?.name ? stepData?.name?.split(' ') : '';
  let [firstName, ...rest] = name;
  let lastName = rest.join(' ');
  const devId = localStorage.getItem("developerId")


  useEffect(() => {
    const activeStepKeys = {
      1: "step1",
      2: "step2",
      3: "step3",
      4: "step4",
      5: "step5",
      6: "step6",
    };

    if (devId) {
      dispatch(getDeveloperProfileDetails(devId, (response) => {
        const currentStep = activeStepKeys[storedStep];
        const data = response[activeStepKeys[storedStep]];
        for (let key in data) {
          if (key === "name") {
            const [firstName, surName] = data[key]?.split(" ");
            setValue("first_name", firstName);
            setValue("last_name", surName);
          } else if (key === "country_code") {
            const newValue = {
              label: data["country"],
              value: data[key],
            };
            setCountryCode(newValue?.value);
            setValue(key, newValue);
          } else if (key === "state_iso_code") {
            const newValue = { label: data["state"], value: data[key] };
            setValue(key, newValue);
          } else if (key === "city") {
            const newValue = { 
              label: data["city"], 
              value: data[key] };
            setValue(key, newValue)
          } else if (key === "time_zone") {
            const newValue = { label: data[key], value: data[key] };
            setValue(key, newValue);
          } 
          // else if(key === "resume"){
          //   setImageFile({resume:data[key]})
          // }else if(key === "intro_video_url"){
          //   setImageFile({introVideo:data[key]})
          // }
          else if (key === "profile_picture") {
            setPreviewImage({ profile_picture: data?.profile_picture });
          } else if (key === "professional_title") {
            setValue("profession", data[key]);
          } else {
            setValue(key, data[key]);
          }
        }

        if (currentStep === "step2") {
          const details = data?.find((item, idx) => idx === data.length - 1)

          if (details) {
            for (let key in details) {
              if (key === "start_date") {
                const startDate = details[key]?.slice(0, 10);
                setValue("start_date", startDate);
              } else if (key === "end_date") {
                const endDate = details["end_date"]?.slice(0, 10);
                setValue("end_date", endDate);
              } else if (key === "description") {
                const desc = stripHtmlTags(details[key]);
                if (currentStep === "step2") {
                  setValue("project_description", desc);
                } else {
                  setValue("education_description", desc);
                }
              } else {
                setValue(key, details[key]);
              }
            }
          }
        }

        if (currentStep === "step4") {
          const details = data?.find((item, idx) => idx === data.length - 1)
          console.log(details, "details")




          if (details) {
            for (let key in details) {
              setValue(key, details[key]);
            }
          }
        }
        if (currentStep === "step5") {
          if (data) {
            for (let key in data) {
              if (key === "bio") {
                const newBio = stripHtmlTags(data[key]);
                setValue("description", newBio);
              }
            }
          }
        }
        if (currentStep === "step6") {
          console.log("step6")
          const details = data?.find((item, idx) => idx === data.length - 1)
          if (details) {
            for (let key in details) {
              if (key == "project_start_date") {
                const startDate = details[key].slice(0, 10);
                setValue("project_start_date", startDate);
              } else if (key === "project_end_date") {
                const endDate = details[key].slice(0, 10);
                setValue("project_end_date", endDate);
              } else {
                setValue(key, details[key]);
              }
            }
          }
        }
      }));
    }
  }, [devId, storedStep, nestedActiveStep]);


  useEffect(() => {
    // setValue("description",selectedRecommend? selectedRecommend: stepData ? stepData[0]?.description : null );
    setValue("skills", fields?.skills?.map(skill => ({
      ...skill,
      title: selectedRecommend ? selectedRecommend : stepData ? stepData[0]?.description : null
    })));
  }, [selectedRecommend])

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

  const handleSetSelectedRecommended = (itemToSet) => {
    setSelectedRecommend(itemToSet);
  }

  // const decreaseStepCount = () => {

  //   switch(activeStep){
  //     case 2:
  //       switch(nestedActiveStep){
  //         case 0:
  //           setActiveStep((prev) => prev - 1);
  //           localStorage.setItem("clientActiveStep", activeStep - 1);
  //          break;
  //          case 1:
  //           case 2:
  //           setNestedActiveStep((prev)=>prev-1);
  //           localStorage.setItem("nestedActiveStep", nestedActiveStep - 1);
  //           break;
  //       }
  //      case 3:
  //       switch(nestedActiveStep){
  //         case 0:
  //           setActiveStep((prev) => prev - 1);
  //           localStorage.setItem("clientActiveStep", activeStep - 1);
  //           setNestedActiveStep(2);
  //           localStorage.setItem("nestedActiveStep", 2);
  //          break;
  //          case 1:
  //           case 2:
  //           case 3:
  //             setNestedActiveStep((prev)=>prev-1);
  //             localStorage.setItem("nestedActiveStep", nestedActiveStep - 1);
  //           break;
  //       }
  //       case 4:
  //         switch(nestedActiveStep){
  //           case 0:
  //             setActiveStep((prev) => prev - 1);
  //             localStorage.setItem("clientActiveStep", activeStep - 1);
  //             setNestedActiveStep(3);
  //             localStorage.setItem("nestedActiveStep", 3);
  //            break;
  //            case 1:
  //             case 2:
  //               setNestedActiveStep((prev)=>prev-1);
  //               localStorage.setItem("nestedActiveStep", nestedActiveStep - 1);
  //             break;
  //         }
  //         case 5:
  //           switch(nestedActiveStep){
  //             case 0:
  //               setActiveStep((prev) => prev - 1);
  //               localStorage.setItem("clientActiveStep", activeStep - 1);
  //               setNestedActiveStep(2);
  //               localStorage.setItem("nestedActiveStep", 2);
  //              break;
  //              case 1:
  //                 setNestedActiveStep((prev)=>prev-1);
  //                 localStorage.setItem("nestedActiveStep", nestedActiveStep - 1);
  //               break;
  //           }

  //           case 6:
  //           switch(nestedActiveStep){
  //             case 0:
  //               setActiveStep((prev) => prev - 1);
  //               localStorage.setItem("clientActiveStep", activeStep - 1);
  //               setNestedActiveStep(1);
  //               localStorage.setItem("nestedActiveStep", 1);
  //              break;
  //              case 1:
  //               case 2:
  //                 setNestedActiveStep((prev)=>prev-1);
  //                 localStorage.setItem("nestedActiveStep", nestedActiveStep - 1);
  //               break;
  //           }
  //           case 7: 
  //           setActiveStep((prev) => prev - 1);
  //           localStorage.setItem("clientActiveStep", activeStep - 1);
  //           setNestedActiveStep(2);
  //           localStorage.setItem("nestedActiveStep", 2);


  //   }

  // };

  const resetAllFields = () => {
    // Define blank values for all fields here
    const blankValues = {
      job_title: "",
      company_name: "",
      description: "",
      start_date: "",
      end_date: "",
      work_type: "",
      location: "",
    };

    reset(blankValues);
  };


  const decreaseStepCount = () => {
    setIsRegistrationStepModal(false);
    const updateSteps = (mainStep, nestedStep) => {
      setActiveStep(mainStep);
      localStorage.setItem("clientActiveStep", mainStep);
      setNestedActiveStep(nestedStep);
      localStorage.setItem("nestedActiveStep", nestedStep);
    };
    switch (activeStep) {
      case 1:
        setActiveStep(prev => prev + 1);
        localStorage.setItem("clientActiveStep", activeStep + 1);
        break;
      case 2:
        switch (nestedActiveStep) {
          case 0:
            updateSteps(activeStep - 1, nestedActiveStep);
            break;
          case 1:
          case 2:
            setNestedActiveStep((prev) => prev - 1);
            localStorage.setItem("nestedActiveStep", nestedActiveStep - 1);
            break;
        }
        break;

      case 3:
      case 5:
        switch (nestedActiveStep) {
          case 0:
            updateSteps(activeStep - 1, 2);
            break;
          case 1:
          case 2:
          case 3:
            setNestedActiveStep((prev) => prev - 1);
            localStorage.setItem("nestedActiveStep", nestedActiveStep - 1);
            break;
        }
        break;

      case 4:
        switch (nestedActiveStep) {
          case 0:
            updateSteps(activeStep - 1, 3);
            break;
          case 1:
          case 2:
            setNestedActiveStep((prev) => prev - 1);
            localStorage.setItem("nestedActiveStep", nestedActiveStep - 1);
            break;
        }
        break;

      case 6:
        switch (nestedActiveStep) {
          case 0:
            updateSteps(activeStep - 1, 1);
            break;
          case 1:
          case 2:
            setNestedActiveStep((prev) => prev - 1);
            localStorage.setItem("nestedActiveStep", nestedActiveStep - 1);
            break;
        }
        break;

      case 7:
        updateSteps(activeStep - 1, 2);
        break;
    }
  };
  console.log(stepData, "stepData")


  const handleEducationLevel = (item) => {
    setEducationLevel(item);
    setNestedActiveStep((prev) => prev + 1);
    localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);
  };

  const addAnotherPosition = () => {
    console.log(watch(), 'watch');
    if (activeStep == 2) {
      setValue("job_title", "");
      setValue("company_name", "");
      setValue("description", "");
      setValue("is_still_working", false);
      setValue("start_date", "");
      setValue("end_date", "");
      setValue("work_type", "");
      setValue("location", "");
      setValue("job_location", "");
      localStorage.setItem("nestedActiveStep", 1);
      setNestedActiveStep(1);
    }
    // }

    else if (activeStep == 6) {
      setValue("project_title", '');
      setValue("project_description", '');
      setValue("tech_stacks_used", '');
      setValue("role_in_project", '');
      setValue("project_team_size", '');
      setValue("project_link", '');
      setValue("project_start_date", '');
      setValue("project_end_date", '');
      setValue("project_type", '');
      localStorage.setItem("nestedActiveStep", 1);
      setNestedActiveStep(1);
    }

    else if (activeStep == 3) {
      console.log(watch(), 'watch stepthree')
      setValue("university_name", '');
      setValue("location", '');
      setValue("degree_id", 0);
      setValue("field_of_study", '');
      setValue("start_year", 0);
      setValue("end_month", '');
      setValue("end_year", 0);
      setValue("currently_attending", true);
      setValue("project_description", '');
      setValue('graduate_date', '')
      setValue('name', '');
      setValue('study', '')
      localStorage.setItem("nestedActiveStep", 2);
      setNestedActiveStep(2);
    }
  };



  const editSummary = (id) => {
    let selectedEditData = stepData?.find(it => it.id == id)
    console.log(selectedEditData, "selectedEditData")
    if (activeStep == 6 && selectedEditData) {

      setValue("project_title", selectedEditData?.project_title);
      setValue("project_description", selectedEditData?.project_description);
      setValue("tech_stacks_used", selectedEditData?.tech_stacks_used);
      setValue("role_in_project", selectedEditData?.role_in_project);
      setValue("project_team_size", selectedEditData?.project_team_size);
      setValue("project_link", selectedEditData?.project_link);
      setValue("project_start_date", selectedEditData?.project_start_date?.slice(0, 10));
      setValue("project_end_date", selectedEditData?.project_end_date?.slice(0, 10));
      setValue("project_type", selectedEditData?.project_type);
      localStorage.setItem("nestedActiveStep", 1);
      setNestedActiveStep(1);


    } else if (activeStep == 2 && selectedEditData) {
      console.log(watch(), 'watch steptwo');

      setValue("job_title", selectedEditData?.job_title);
      setValue("company_name", selectedEditData?.company_name);
      setValue("project_description", selectedEditData?.description);
      setValue("is_still_working", selectedEditData?.is_still_working);
      setValue("start_date", selectedEditData?.start_date?.slice(0, 10));
      setValue("end_date", selectedEditData?.end_date?.slice(0, 10));
      setValue("work_type", selectedEditData?.work_type);
      setValue("job_location", selectedEditData?.job_location);
      localStorage.setItem("nestedActiveStep", 1);
      setNestedActiveStep(1);
    }
    else if (activeStep == 3 && selectedEditData) {
      setValue("university_name", selectedEditData?.university_name);
      setValue("location", selectedEditData?.address);
      setValue("degree_id", 0);
      setValue("field_of_study", selectedEditData?.field_of_study);
      setValue("start_year", 0);
      setValue("end_month", "string");
      setValue("end_year", 0);
      setValue("currently_attending", true);
      setValue("description", selectedEditData?.description)
      localStorage.setItem("nestedActiveStep", 2);
      setNestedActiveStep(2);
    }
    setEditMode({
      id: id,
      isEdit: true
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
            stepData={stepData}
            countryCode={countryCode}
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
                setSelectedRecommend={handleSetSelectedRecommended}
                name="project_description"
              />
            );
          case 2:
            return (
              <Summary
                nestedActiveStep={nestedActiveStep}
                filteredStepData={filteredStepData}
                setFilteredStepData={setFilteredStepData}
                // handleDelete={handleDelete}
                handleCloseUploadFileModal={handleClose}
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
                name="education_description"
                selectedRecommend={selectedRecommend}
                setSelectedRecommend={handleSetSelectedRecommended}
              />
            );

          case 3:
            return (
              <Summary
                nestedActiveStep={nestedActiveStep}
                filteredStepData={filteredStepData}
                setFilteredStepData={setFilteredStepData}
                // handleDelete={handleDelete}
                handleCloseUploadFileModal={handleClose}
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
                selectedRecommend={selectedRecommend}
                setSelectedRecommend={setSelectedRecommend}
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
                selectedRecommend={selectedRecommend}
                setSelectedRecommend={handleSetSelectedRecommended}
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
                name="summary_description"
                skillsOption={skillOptions}
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
                skillOptions={skillOptions}
                name="project_description"
                selectedRecommend={selectedRecommend}
                setSelectedRecommend={handleSetSelectedRecommended}
              />
            )

          case 2:
            return (
              <Summary
                nestedActiveStep={nestedActiveStep}
                filteredStepData={filteredStepData}
                setFilteredStepData={setFilteredStepData}
                // handleDelete={handleDelete}
                handleCloseUploadFileModal={handleClose}
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
          <FinalizeResume />
        )

    }
  };

  const onSubmit = (values) => {
    console.log(values, "project_description");
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
      console.log(uploadedUrls?.profile_picture, "imagess")

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
          city: values?.city.label,
          state: values?.state_iso_code?.label,
          country_iso_code: values?.country_iso_code?.value,
          state_iso_code: values?.state_iso_code?.value,
          passcode: values?.passcode,
          country_code: values?.country_code.value,
          phone_number: values?.phone_number,
          language_preference: values?.language_preference,
          total_experience: values?.total_experience,
          time_zone: values?.time_zone?.label,
          resume: uploadedUrls?.resume,
          linkedin_url: values?.linkedin_url,
          github_url: values?.github_url,
          intro_video_url: uploadedUrls?.introVideo,
          user_id: developer_id ? developer_id : null
        };
        dispatch(developerRegistration(payload, () => {
          if (!ifDone) {
            setIsRegistrationStepModal(true);
          } else {
            increaseStepCount(false)
          }
          setDone(true)
        }));
      });
    };

    if (activeStep == 2) {
      let developer_experience = [];
      if (nestedActiveStep == 1) {
        if (isEditMode?.isEdit) {
          let index = stepData.findIndex((it) => it.id === isEditMode.id);
          let copyObj = [...stepData]
          if (index !== -1) {
            copyObj[index] = {
              job_title: values?.job_title,
              company_name: values?.company_name,
              start_date: values?.start_date,
              end_date: values?.is_still_working ? null : values?.end_date,
              work_type: values?.work_type,
              is_still_working: values?.is_still_working,
              description: (stripHtmlTags(values?.project_description)),
              job_location: values?.job_location
            };
          }
          dispatch(registerDeveloperExperience(copyObj, developer_id, () => {
            increaseStepCount(true);
          }));
        } else {
          if (stepData) {
            developer_experience = [
              ...stepData,
              {
                job_title: values?.job_title,
                company_name: values?.company_name,
                start_date: values?.start_date,
                end_date: values?.is_still_working ? null : values?.end_date,
                work_type: values?.work_type,
                is_still_working: values?.is_still_working,
                description: (stripHtmlTags(values?.project_description)),
                job_location: values?.job_location
              },
            ];
            dispatch(registerDeveloperExperience(developer_experience, developer_id, () => {
              increaseStepCount(true);
            }));
          } else {
            developer_experience = [
              {
                job_title: values?.job_title,
                company_name: values?.company_name,
                start_date: values?.start_date,
                end_date: values?.is_still_working ? null : values?.end_date,
                work_type: values?.work_type,
                is_still_working: values?.is_still_working,
                description: (stripHtmlTags(values?.project_description)),
                job_location: values?.job_location
              },
            ];
            dispatch(registerDeveloperExperience(developer_experience, developer_id, () => {
              increaseStepCount(true);
            }));
          }
        }
      } else if (nestedActiveStep == 0) {
        increaseStepCount(true);
      } else {
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
          let newData = stepData?.map((val) => {
            let updatedVal = { ...val };

            if (updatedVal.end_year === null) {
              updatedVal.end_year = 0;
              updatedVal.degree_id = 0;
              delete updatedVal.id;
              updatedVal.start_year = 0;
            }

            return updatedVal;
          });
          console.log(newData, 'hibye', stepData)
          let developer_education = [
            ...newData,
            {
              university_name: values?.university_name,
              address: values?.address,
              degree_id: 0,
              field_of_study: values?.field_of_study,
              start_year: 0,
              end_month: values?.end_month,
              end_year: 0,
              currently_attending: true,
              description: (stripHtmlTags(values?.education_description)),
            },
          ];
          dispatch(
            registerDeveloperEducation(developer_education, developer_id, () => {
              increaseStepCount(true);
            })
          );
        } else {
          increaseStepCount(true);
        }
      }
    } else if (activeStep == 4) {

      if (nestedActiveStep == 2) {

        const transformData = (data) => {
          return data?.map(item => ({
            skill: item.title.label,
            experience: item.experience.value.toString(),
            skill_weight: item.level.value
          }));
        };
        const output = transformData(values?.skills);
        let payload = {
          developer_id: localStorage.getItem("developerId"),
          skills: output
        }
        dispatch(registerDeveloperSkills(payload))
        setNestedActiveStep(0);
        localStorage.setItem("nestedActiveStep", 0);
        increaseStepCount(false)

      } else if (nestedActiveStep == 1) {
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
        let payload = {
          developer_id: localStorage.getItem("developerId"),
          skills: output
        }

        dispatch(registerDeveloperSkills(payload))
      } else {
        setNestedActiveStep((prev) => prev + 1);
        localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);

      }

    } else if (activeStep == 5) {
      if (nestedActiveStep == 1) {
        let payload = {
          developer_id: localStorage.getItem("developerId"),
          bio: values?.description
        }
        dispatch(developerRegistrationBio(payload))
        setNestedActiveStep(0);
        localStorage.setItem("nestedActiveStep", 0);
        increaseStepCount(false)


      } else {
        setNestedActiveStep((prev) => prev + 1);
        localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);

      }
    }

    else if (activeStep == 6) {
      if (nestedActiveStep == 1) {
        let developer_project = [
          ...stepData,
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
        let payalod = {
          user_id: localStorage.getItem("developerId"),
          projects: developer_project
        }
        dispatch(addDeveloperRegisProject(payalod, () => {
          increaseStepCount(true)
        }))

      } else if (nestedActiveStep == 0) {
        setNestedActiveStep((prev) => prev + 1);
        localStorage.setItem("nestedActiveStep", nestedActiveStep + 1);
      } else {
        setNestedActiveStep(0);
        localStorage.setItem("nestedActiveStep", 0);
        increaseStepCount(false)
      }

    }
    else if (activeStep == 7) {
      setIsRegistrationStepModal(true);
    }
    else {
      console.log(values, "these are values");
      uploadFiles({
        resume: imageFile.resume,
        introVideo: imageFile.introVideo,
        profile_picture: imageFile.profile_picture,
      });
    }
    setSelectedRecommend(null);
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
        switch (nestedActiveStep) {
          case 0:
          case 1:
            return "Next"
          case 2:
            return "Next: Education";
        }
      // case 2: 
      // return "Next : Job Description";

      case 3:

        switch (nestedActiveStep) {
          case 0:
          case 1:
          case 2:
            return "Next"
          case 3:
            return "Next: Skills"
        }
      case 4:
        switch (nestedActiveStep) {
          case 0:
            return "Next"
          case 1:
            return "Submit"
        }
      case 5:
        return "Submit"
      case 6:
        return "Next"
      case 7:
        return 'Finalize'
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
      case 7:
        return "Done"
    }
  };

  const handleRegistrationType = (registrationType) => {
    setRegistrationType(registrationType);
    increaseStepCount();
  };
  const handleClose = () => {
    setShowSetUpJobModal({
      recommendation: false,
      isDelete: false,
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

  };
  const profileSubmitIfDone = () => {
    setDone(false)

  }


  const handleRegistrationModal = () => {
    setIsRegistrationStepModal(false);
  }




  return (
    <section className={`${token ? "edit-developer-wrapper resume-section-wrapper" : "resume-section-wrapper"}`}>
      <SidebarSection
        activeStep={activeStep}
        handleSetActiveStep={handleSetActiveStep}
        stepperSideBarItems={SIDEBAR_ITEMS?.developer}
        arrPercentage={arrPercentage}
      />

      <div className="resume-main-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            {activeStep !== 1 && <div>
              <span
                onClick={() => {
                  decreaseStepCount();
                  resetAllFields();
                }}
                className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium cursor-pointer"
              >
                <FaArrowLeft /> Go Back
              </span>
            </div>}
            <Row>
              <Col md={nestedActiveStep == 3 || nestedActiveStep == 4 || activeStep == 1 || activeStep == 6 || activeStep == 2 || activeStep == 3 || activeStep == 7 ? 12 : 8}>
                {renderActiveStep()}
              </Col>
              {/* {nestedActiveStep !== 3 || activeStep!==1 && (
                <Col md={4}>
                  <ResumeOverView activeStep={activeStep} />
                </Col>
              )} */}
            </Row>

            {true ? <div className="d-flex justify-content-end align-items-center ">
              <div className="me-3">
                <RexettButton
                  type="submit"
                  text={getActiveDecreaseStepText()}
                  className="outline-main-btn px-4 font-14 mr-2"
                  onClick={profileSubmitIfDone}
                  disabled={!ifDone && smallLoader}
                  isLoading={!ifDone && smallLoader}
                />
              </div>
              <div>
                <RexettButton
                  type="submit"
                  text={getActiveStepText()}
                  className="main-btn px-4 font-14 mr-2"
                  disabled={smallLoader}
                  isLoading={smallLoader}
                />
              </div>
            </div> : ""}
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
        nextStep={decreaseStepCount}
        role = {"developer"}
      />
    </section>
  );
};

export default DeveloperRegistrationStepper;

