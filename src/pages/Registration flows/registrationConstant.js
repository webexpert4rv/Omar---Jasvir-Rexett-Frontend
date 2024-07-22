import { TbRulerOff } from "react-icons/tb";
import {
  JOB_TYPES_OPTIONS,
  WORKPLACE_TYPES_OPTIONS,
  LANGUAGE_PREFERENCES_OPTIONS,
  MONTH_YEAR,
  YEAR_OPTIONS,
  WORK_TYPE,
  EXPERIENCE_YEAR
} from "../../components/common/JobPostForm/constant";



export const MODAL_INFORMATION={
  1:{
    heading:"Setting Up Your First Job post",
    paragraph:"We are really excited that you want to set up a new job with us. Our team is dedicated to providing you with the best possible experience as you embark on this new journey. We are committed to supporting you every step of the way and ensuring that your transition is smooth and successful. Welcome aboard, and we look forward to achieving great things together!"
  },
  4:{
     heading:"Thank you for applying",
     paragraph:<span>Welcome to the Rexett Community! <br/>  A Rexett Team  Will Reach Out to You Shortly for the Next Steps!</span>
  }
}

 const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SIDEBAR_ITEMS = {
  client: [
    { stepNumber: 1, label: "personal" },
    { stepNumber: 2, label: "jobInfo" },
    { stepNumber: 3, label: "jobDescription" },
    { stepNumber: 4, label: "screeningInfo" },
  ],
  vendor: [
    { stepNumber: 1, label: "personal" },
    { stepNumber: 2, label: "decisionMakersInfo" },
    { stepNumber: 3, label: "companyInfo" },
    { stepNumber: 4, label: "areaOfExpertise" },
  ],
  developer: [
    { stepNumber: 1, label: "heading" },
    { stepNumber: 2, label: "workHistory" },
    { stepNumber: 3, label: "education" },
    { stepNumber: 4, label: "skillsInfo" },
    { stepNumber: 5, label: "summary" },
    { stepNumber: 6, label: "projects" },
    { stepNumber: 7, label: "finalize" },
  ],
};

export const CLIENT_STEPPER_HEADINGS = {
  1: { heading: "clientStep1Heading", para: "clientStep1Para" },
  2: { heading: "clientStep2Heading", para: "clientStep2Para" },
  3: { heading: "clientStep3Heading", para: "clientStep3Para" },
  4: { heading: "clientStep4Heading", para: "clientStep4Para" },
  5: { heading: "clientStep5Heading", para: "clientStep5Para" },
  6: { heading: "clientStep6Heading", para: "clientStep6Para" },
  7: { heading: "clientStep7Heading", para: "clientStep7Para" },
};

export const VENDOR_STEPPER_HEADINGS = {
  1: { heading: "vendorStep1Heading", para: "vendorStep1Para" },
  2: { heading: "vendorStep2Heading", para: "vendorStep2Para" },
  3: { heading: "vendorStep3Heading", para: "vendorStep3Para" },
  4: { heading: "vendorStep4Heading", para: "vendorStep4Para" },
};

export const DEVELOPER_STEPPER_HEADINGS = {
  1: { heading: "developerStep1Heading", para: "developerStep1Para" },
  2: { heading: "developerStep2Heading", para: "developerStep2Para" },
  3: { heading: "developerStep3Heading", para: "developerStep3Para" },
  4: { heading: "developerStep4Heading", para: "developerStep4Para" },
};

export const DEVELOPER_NESTED_STEPPER_HEADINGS = {
  1: { heading: "developerNestedStep1Heading", para: "developerNestedStep1Para" },
  2: { heading: "developerNestedStep3Heading", para: "" },
  4:  { heading: "developerNestedStep4Heading", para: "developerNestedStep4Para" },
};

export const DEVELOPER_STEPPER_HEADINGS_FOR_STEP_3 = {
  2: { heading: "developerNestedStep1HeadingForStep3", para: "developerNestedStep1ParaForStep3" },
  3: { heading: "developerNestedStep2HeadingForStep3", para: "'" },
};
export const DEVELOPER_STEPPER_HEADINGS_FOR_STEP_4 = {
  1: { heading: "developerNestedStep1HeadingForStep4", para: "developerNestedStep1ParaForStep4" },
  2: { heading: "developerNestedStep2HeadingForStep4", para: "developerNestedStep2ParaForStep4" },
  4:  { heading: "developerNestedStep3HeadingForStep3", para: "" },
};

export const DEVELOPER_STEPPER_HEADINGS_FOR_STEP_5 = {
  1: { heading: "developerNestedStep1HeadingForStep5", para: "developerNestedStep1ParaForStep5" },

};

export const DEVELOPER_STEPPER_HEADINGS_FOR_STEP_6 = {
  1: { heading: "developerNestedStep1HeadingForStep6", para: "developerNestedStep1ParaForStep6" },
  2: { heading: "developerNestedStep2HeadingForStep6", para: "" },

};



export const DEVELOPER_INTRO_DATA = {
  2:{
    heading:"developerIntroData2Heading",
    mainHead:"developerMain2Head",
    heading1:"developerHeading2",
    para:"developer2Para"
  },
  3:{
    heading:"developerIntroData3Heading",
    mainHead:"developerMain3Head",
    heading1:"developerHeading3",
    para:"developer3Para"
  },
  4:{
    heading:"developerIntroData4Heading",
    mainHead:"developerMain4Head",
    heading1:"developerHeading4",
    para:"developer4Para"
  },
  5:{
    heading:"developerIntroData5Heading",
    mainHead:"developerMain5Head",
    heading1:"developerHeading5",
    para:"developer5Para"
  },
  6:{
    heading:"developerIntroData6Heading",
    mainHead:"developerMain6Head",
    heading1:"developerHeading6",
    para:"developer6Para"
  },


};


export const getActiveStepHeadingData = (activeStep ,type,nestedActiveStep ) => {
  if (type === 'client') {
    return CLIENT_STEPPER_HEADINGS[activeStep] ||{ heading: '' }; 
  } 
  else if (type === 'vendor') {
    return VENDOR_STEPPER_HEADINGS[activeStep] || { heading: '' }; 
  } else {
    if(nestedActiveStep>0 && activeStep==2){
      return DEVELOPER_NESTED_STEPPER_HEADINGS[nestedActiveStep] || { heading: '' }; 
    }else if(nestedActiveStep>0 && activeStep==3){
      console.log("hello33")
      return DEVELOPER_STEPPER_HEADINGS_FOR_STEP_3[nestedActiveStep] || { heading: '' }; 
    }else if(nestedActiveStep>0 && activeStep==4){
      return DEVELOPER_STEPPER_HEADINGS_FOR_STEP_4[nestedActiveStep] || { heading: '' }; 

    }else if(nestedActiveStep>0 && activeStep==5){
      return DEVELOPER_STEPPER_HEADINGS_FOR_STEP_5[nestedActiveStep] || { heading: '' }; 
     
    }else if(nestedActiveStep>0 && activeStep==6){
      return DEVELOPER_STEPPER_HEADINGS_FOR_STEP_6[nestedActiveStep] || { heading: '' };
    }
    else{
      return DEVELOPER_STEPPER_HEADINGS[activeStep] || { heading: '' };
    }
   
    
  }

  
}

export const getActiveStepVendorHeadingData = (activeStep) =>
  VENDOR_STEPPER_HEADINGS[activeStep] || null;

export const getStepperIntroData=(activeStep)=>{
   return DEVELOPER_INTRO_DATA[activeStep]

  
}

// export const getActiveStepVendorHeadingData = (activeStep) =>
//   VENDOR_STEPPER_HEADINGS[activeStep] || null;

const CLIENT_STEP_1_FIELDS = {
  indivisual: [
    {
      label: "firstName",
      fieldName: "first_name",
      type: "text",
      placeholder: "e.g. John",
      rules: { required: "First name is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "surname",
      fieldName: "last_name",
      type: "text",
      placeholder: "e.g. Doe",
      rules: { required: "Surname is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "phoneNumber",
      fieldName: "phone_number",
      type: "phone",
      placeholder: "e.g. +91 1234567890",
      rules: { required: "Phone number is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "email",
      fieldName: "email",
      type: "email",
      placeholder: "e.g. johndoe123@gmail.com",
      rules: {
        required: "Email is required",
        pattern: {
          value: EMAIL_REGEX,
          message: "Invalid Email",
        },
      },
      columnWidth: 6,
      isRequired: true,
    },
    {
      isPasswordSection: true,
    },
    {
      label: "taxId",
      fieldName: "company_tax_id",
      type: "text",
      placeholder: "Enter Tax ID",
      rules: { required: "Phone number is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "yearlyRevenue",
      fieldName: "yearly_revenue",
      type: "text",
      placeholder: "Enter yearly revenue",
      rules: { required: "Yearly revenue is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "address",
      fieldName: "company_address",
      type: "select",
      placeholder: "e.g. Street 1341,New area,CA,USA",
      rules: { required: "Address is required" },
      columnWidth: 12,
      isRequired: true,
      isAutocomplete: true,
    },
    {
      isLocation: true,
    },
  ],
  company: [
    {
      label: "companyName",
      fieldName: "company_name",
      type: "text",
      placeholder: "e.g. Google",
      rules: { required: "Company name is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "taxId",
      fieldName: "company_tax_id",
      type: "text",
      placeholder: "Enter Tax ID",
      rules: { required: "Tax ID is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "establishmentYear",
      fieldName: "establishment_year",
      type: "date",
      isMinRequired: true,
      isMaxRequired:false,
      // placeholder: "Enter Tax ID",
      rules: { required: "Tax ID is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "websiteUrl",
      fieldName: "website_url",
      type: "text",
      placeholder: "e.g. www.xyztechnology.com",
      rules: { required: "Tax ID is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "yearlyRevenueInUsd",
      fieldName: "yearly_revenue",
      type: "text",
      placeholder: "e.g. 15,000",
      rules: { required: "Yearly revenue is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "employeesStrength",
      fieldName: "employee_strength",
      type: "text",
      placeholder: "e.g. 100",
      rules: { required: "Employees strength is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "phoneNumber",
      fieldName: "phone_number",
      type: "phone",
      placeholder: "e.g. +91 1234567890",
      rules: { required: "Phone number is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "email",
      fieldName: "email",
      type: "email",
      placeholder: "e.g. johndoe123@gmail.com",
      rules: {
        required: "Email is required",
        pattern: {
          value: EMAIL_REGEX,
          message: "Invalid Email",
        },
      },
      columnWidth: 6,
      isRequired: true,
    },
    {
      isPasswordSection: true,
    },
    {
      label: "address",
      fieldName: "address",
      type: "select",
      placeholder: "e.g. Street 1341,New area,CA,USA",
      rules: { required: "Address is required" },
      columnWidth: 12,
      isRequired: true,
      isAutocomplete: true,
    },
    {
      isLocation: true,
    },
  ],
};
const CLIENT_STEP_2_FIELDS = [
  {
    label: "jobTitle",
    type: "text",
    fieldName: "job_title",
    isRequired: true,
    columnWidth: 6,
    rules: { required: "Job title is Required" },
    placeholder: "Enter job title",
  },
  {
    label: "workplaceType",
    type: "normal-select",
    fieldName: "workplace_type",
    isRequired: true,
    columnWidth: 6,
    rules: { required: "Workplace type is Required" },
    placeholder: "Select Workplace",
    options: WORKPLACE_TYPES_OPTIONS,
    defaultOption: "Select workplace",
  },
  {
    label: "jobLocation",
    fieldName: "job_location",
    type: "select",
    placeholder: "e.g. Street 1341,New area,CA,USA",
    rules: { required: "Job location is required" },
    columnWidth: 6,
    isRequired: true,
    isAutocomplete: true,
  },
  {
    label: "jobType",
    type: "normal-select",
    fieldName: "job_type",
    isRequired: true,
    columnWidth: 6,
    rules: { required: "Job type is Required" },
    placeholder: "Select Job type",
    options: JOB_TYPES_OPTIONS,
    defaultOption: "Select job type",
  },
  {
    label: "availablePositions",
    type: "text",
    fieldName: "available_positions",
    isRequired: true,
    columnWidth: 6,
    rules: { required: "Number of positions available are Required" },
    placeholder: "e.g 10",
  },
];
const CLIENT_ACTIVE_STEP_FIELDS = {
  1: CLIENT_STEP_1_FIELDS,
  2: CLIENT_STEP_2_FIELDS,
};

export const getActiveStepFields = (activeStep, registrationType) => {
  if (activeStep === 1) {
    return CLIENT_ACTIVE_STEP_FIELDS[activeStep][registrationType] || null;
  } else {
    return CLIENT_ACTIVE_STEP_FIELDS[activeStep] || null;
  }
};

export const DEFAULT_SCREENING_DATA = [
  {
    optionId: 1,
    label: "Work Experience",
    title: "",
    question_type: "",
    question: "How many years of experience do you currently have?",
    isRecommended: true,
  },
  {
    optionId: 2,
    label: "Education",
    question_type: "Degree",
    title: "",
    ideal_answer: "Yes",
    question: "Have you completed the following level of education: [Degree]",
    isRecommended: true,
  },
  {
    optionId: 3,
    label: "Language",
    title: "",
    question_type: "language",
    question: "What is your level of proficiency in [Language]?",
    isRecommended: true,
  },
];
const VENDOR_STEP_1_FIELDS = [
  {
    label: "companyName",
    fieldName: "name_of_the_company",
    type: "text",
    placeholder: "e.g. Microsoft",
    rules: { required: "Company name is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "typeOfCompany",
    fieldName: "type_of_company",
    type: "normal-select",
    // placeholder: "",
    rules: { required: "Type of company is required" },
    columnWidth: 6,
    isRequired: true,
    defaultOption: "Select company type",
  },
  {
    label: "taxId",
    fieldName: "tax_id",
    type: "text",
    placeholder: "Enter Tax ID",
    rules: { required: "Tax ID is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "cinNumber",
    fieldName: "cin_number",
    type: "text",
    placeholder: "Enter CIN Number",
    rules: { required: "CIN number is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "establishmentYear",
    fieldName: "establishment_year",
    type: "date",
    isMinRequired: true,
      isMaxRequired:false,
    rules: { required: "Establishment year is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "websiteUrl",
    fieldName: "website_url",
    type: "text",
    placeholder: "e.g. www.xyztechnology.com",
    rules: { required: "Website URL is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "yearlyRevenueInUsd",
    fieldName: "yearly_revenue",
    type: "text",
    placeholder: "e.g. 15,000",
    rules: { required: "Yearly revenue is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "employeeStrength",
    fieldName: "total_employee", // need to change this field according to the API
    type: "text",
    placeholder: "e.g. 100",
    rules: { required: "Employees strength is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "phoneNumber",
    fieldName: "phone_number",
    type: "phone",
    rules: { required: "Phone number is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    isPasswordSection: true,
  },
  {
    label: "email",
    fieldName: "email",
    type: "email",
    placeholder: "e.g. johndoe123@gmail.com",
    rules: {
      required: "Email is required",
      pattern: {
        value: EMAIL_REGEX,
        message: "Invalid Email",
      },
    },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "address",
    fieldName: "address",
    type: "select",
    placeholder: "e.g. Street 1341,New area,CA,USA",
    rules: { required: "Address is required" },
    columnWidth: 12,
    isRequired: true,
    isAutocomplete: true,
  },
  {
    isLocation: true,
  },
];
 const VENDOR_STEP_2_FIELDS = [
  {
    label: "Name",
    fieldName: "name",
    type: "text",
    placeholder: "e.g. John",
    rules: { required: "Name is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "Position",
    fieldName: "position",
    type: "text",
    placeholder: "e.g. Microsoft",
    rules: { required: "Position is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "Phone Number",
    fieldName: "phone_number",
    type: "phone",
    placeholder: "e.g. +918979003975",
    rules: { required: "Phone number is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "Email",
    fieldName: "email",
    type: "email",
    placeholder: "e.g. johndoe123@gmail.com",
    rules: {
      required: "Email is required",
      pattern: {
        value: EMAIL_REGEX,
        message: "Invalid Email",
      },
    },
    columnWidth: 6,
    isRequired: true,
  },
];
const VENDOR_STEP_4_FIELDS = [
  {
    label: "areaOfSpecialization",
    fieldName: "area_of_specialization",
    type: "normal-select",
    // placeholder: "",
    rules: { required: "Type of specialization is required" },
    columnWidth: 12,
    isRequired: true,
    defaultOption: "Select Specialization type",
  },

  {
    label: "serviceOffering",
    fieldName: "service_offering",
    type: "normal-select",
    // placeholder: "",
    rules: { required: "Service offering is required" },
    columnWidth: 12,
    isRequired: true,
    defaultOption: "Select",
  },

  {
    label: "Your Turnaround time to close Contract Positions",
    fieldName: "Your_Turnaround_time_to_close_Contract_Positions",
    type: "text",
    placeholder: "e.g. 8 hours",
    rules: { required: "This field is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "Your Turnaround time to close Permanent Positions",
    fieldName: "Your_Turnaround_time_to_close_Permanent_Positions",
    type: "text",
    placeholder: "e.g. 24 hours",
    rules: { required: "This field is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "Please share your success Stories with atleast 2 of your exiting IT customers and their Contact details for reference check ",
    fieldName: "Please_share_your_success_Stories_with_atleast_2_of_your_exiting_IT_customers_and_their_Contact_details_for_reference_check ",
    type: "text",
    placeholder: "e.g. Desc",
    rules: { required: "This field is required" },
    columnWidth: 6,
    isRequired: true,
  },
]
const VENDOR_STEP_3_FIELDS=[
  {
    label: "Estbl. Year",
    fieldName: "estiblashment_year",
    type: "text",
    placeholder: "e.g. 8 hours",
    rules: { required: "Establishment is required" },
    columnWidth: 12,
    isRequired: true,
  },
  {

  label: "Type of Establishment",
  fieldName: "type_estiblashment_year",
    type: "normal-select",
  rules: { required: "Type of Establishment is required" },
  columnWidth: 12,
  isRequired: true,
},
  {
    label: "Total Employees in Company",
    fieldName: "Total_Employees_in_Company",
    type: "text",
    placeholder: "e.g. 8 hours",
    rules: { required: "This field is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "Total nos. of IT Recruiters ",
    fieldName: "Total_nos._of_IT_Recruiters ",
    type: "text",
    placeholder: "e.g. 8 hours",
    rules: { required: "This field is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "Yearly Revenues",
    fieldName: "Yearly_Revenues",
    type: "text",
    placeholder: "e.g. 8 hours",
    rules: { required: "This field is required" },
    columnWidth: 6,
    isRequired: true,
  },
  
]
const VENDOR_STEP_FIELDS = {
  1: VENDOR_STEP_1_FIELDS,
  2: VENDOR_STEP_2_FIELDS,
  3: VENDOR_STEP_3_FIELDS,
  4: VENDOR_STEP_4_FIELDS,
};

export const getVendorActiveStepFields = (activeStep) =>
  VENDOR_STEP_FIELDS[activeStep] || null;


const DEVELOPER_STEP_1_FIELDS = [
    {
      label: "firstName",
      fieldName: "first_name",
      type: "text",
      placeholder: "e.g. John",
      rules: { required: "First name is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "Last Name",
      fieldName: "last_name",
      type: "text",
      placeholder: "e.g. Doe",
      rules: { required: "Last name is required" },
      columnWidth: 6,
      isRequired: true,
      
    },
    {
      label: "Profession",
      fieldName: "profession",
      type: "text",
      placeholder: "e.g. Software Engineer",
      rules: { required: "Profession is required" },
      columnWidth: 12,
      isRequired: true,
    },
    {
      label: "Language Preferences",
      fieldName: "language_preference",
      type: "normal-select",
      rules: { required: "Preferences is required" },
      columnWidth: 6,
      isRequired: true,
      options:LANGUAGE_PREFERENCES_OPTIONS,
      defaultOption: "Select",
    },
    {
      label: "Experience",
      fieldName: "total_experience",
      type: "normal-select",
      rules: { required: "Experience is required" },
      columnWidth: 6,
      isRequired: true,
      options:EXPERIENCE_YEAR,
      defaultOption: "Select",
    },
    {
      label: "phoneNumber",
      fieldName: "phone_number",
      type: "phone",
      placeholder: "e.g. +91 1234567890",
      rules: { required: "Phone number is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "email",
      fieldName: "email",
      type: "email",
      placeholder: "e.g. johndoe123@gmail.com",
      rules: {
        required: "Email is required",
        pattern: {
          value: EMAIL_REGEX,
          message: "Invalid Email",
        },
      },
      columnWidth: 6,
      isRequired: true,
      readOnly:false
    },
    {
      isPasswordSection: true,
    },
    {
      isLocation: true,
    },
    
    {
      label: "address",
      fieldName: "address",
      type: "select",
      placeholder: "e.g. Street 1341,New area,CA,USA",
      rules: { required: "Address is required" },
      columnWidth: 12,
      isRequired: true,
      isAutocomplete: true,
      defaultOption: "Select",
    },
    {
      label: "Resume",
      fieldName: "upload_resume",
      type: "upload",
      placeholder: "Upload Resume",
      rules: { required: "Resume Required" },
      columnWidth: 12,
      isRequired: true,
    },
    {
      label: "Intro Video",
      fieldName: "intro_video",
      type: "upload",
      placeholder: "Upload Intro Video",
      rules: { required: "Intro Video is required" },
      columnWidth: 12,
      isRequired: true,
    },
    {
      label: "LinkedIn",
      fieldName: "linked_in",
      type: "text",
      placeholder: "e.g. www.linkedin.com/profile/12345",
      rules: { required: "Linked in is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "Github",
      fieldName: "git_hub", 
      type: "text",
      placeholder: "e.g. www.github.com/profile/12345",
      rules: { required: "GitHub in is required" },
      columnWidth: 6,
      isRequired: true,
    },
    // {
    //   label: "Github",
    //   fieldName: "git_hub", 
    //   type: "text",
    //   placeholder: "e.g. www.github.com/profile/12345",
    //   rules: { required: "GitHub in is required" },
    //   columnWidth: 2,
    //   isRequired: true,
    // },
    // {
    //   label: "Github",
    //   fieldName: "git_hub", 
    //   type: "text",
    //   placeholder: "e.g. www.github.com/profile/12345",
    //   rules: { required: "GitHub in is required" },
    //   columnWidth: 2,
    //   isRequired: true,
    // },
    // {
    //   label: "Github",
    //   fieldName: "git_hub", 
    //   type: "text",
    //   placeholder: "e.g. www.github.com/profile/12345",
    //   rules: { required: "GitHub in is required" },
    //   columnWidth: 2,
    //   isRequired: true,
    // },
    
  ]

  const NESTED_DEVELOPER_STEP_1_FIELDS = [
    {
      label: "Job Title",
      fieldName: "job_title",
      type: "text",
      placeholder: "e.g. Web Developer",
      rules: { required: "Job Title is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "Employer",
      fieldName: "company_name",
      type: "text",
      placeholder: "e.g. Microsoft",
      rules: { required: "Employer is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "Location",
      fieldName: "job_location",
      type: "select",
      placeholder: "e.g. Street 1341,New area,CA,USA",
      rules: { required: "Location is required" },
      columnWidth: 6,
      isRequired: true,
      isAutocomplete: true,
    },
    {
      label: "Work Type",
      fieldName: "work_type",
      type: "normal-select",
      options:WORK_TYPE,
      // placeholder: "e.g. Street 1341,New area,CA,USA",
      rules: { required: "Work type is required" },
      columnWidth: 6,
      isRequired: true,
      defaultOption: "Select Type",
    },
    {
      label: "Start Date",
      fieldName: "start_date",
      type: "date",
      isMinRequired: true,
      isMaxRequired:false,
      rules: { required: "Start date is required" },
      columnWidth: 6,
      isRequired: true,
      defaultOption: "Select Month",
    },
  

    {
      label: "End Date",
      fieldName: "end_date",
      type: "date",
      // placeholder: "e.g. Street 1341,New area,CA,USA",
      isMinRequired: true,
      isMaxRequired:false,
      // rules: { required: "End date is required" },
      columnWidth: 6,
      // isRequired: false,
      defaultOption: "Select Month",
    },
    
    {
      label: "Are you currently Working in this job?",
      fieldName: "is_still_working",
      type: "checkbox",
      // rules: { required: "Job location is required" },
      columnWidth: 12,
      isRequired: false,
    },
  ]

  const NESTED_DEVELOPER_STEP_2_FIELDS=[
    {
      label: "University Name",
      fieldName: "name",
      type: "text",
      placeholder: "e.g. Delhi University",
      rules: { required: "University name is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "University Location",
      fieldName: "location",
      type: "text",
      placeholder: "e.g. Delhi,India",
      rules: { required: "University location is required" },
      columnWidth: 6,
      isRequired: true,
    },
    // {
    //   label: "Degree",
    //   fieldName: "degree",
    //   type: "normal-select",
    //   placeholder: "e.g. Delhi,India",
    //   rules: { required: "University location is required" },
    //   columnWidth: 6,
    //   isRequired: true,
    // },
    // {
    //   label: "Enter Degree",
    //   fieldName: "degree",
    //   type: "text",
    //   placeholder: "e.g. Delhi,India",
    //   rules: { required: "University location is required" },
    //   columnWidth: 6,
    //   isRequired: true,
    // },
    {
      label: "Field of Study",
      fieldName: "study",
      type: "text",
      placeholder: "e.g. Delhi,India",
      rules: { required: "University location is required" },
      columnWidth: 6,
      isRequired: true,
    },
    
    {
      label: "Graduation Date",
      fieldName: "graduate_date",
      type: "date",
      isMinRequired: true,
      isMaxRequired:false,
      // placeholder: "e.g. Street 1341,New area,CA,USA",
      rules: { required: "Job location is required" },
      columnWidth: 6,
      isRequired: true,
      defaultOption: "Select Month",
    },

  ]


  const NESTED_DEVELOPER_STEP_6_FIELDS=[
    {
      label: "Project Title",
      fieldName: "project_title",
      type: "text",
      placeholder: "e.g. AI chat bot",
      rules: { required: "Project title is required" },
      columnWidth: 6,
      isRequired: true,
    },
    {
      label: "Role",
      fieldName: "role_in_project",
      type: "text",
      placeholder: "e.g. Team Lead",
      rules: { required: "Role is required" },
      columnWidth: 6,
      isRequired: true,
    },
    // {
    //   label: "Degree",
    //   fieldName: "degree",
    //   type: "normal-select",
    //   placeholder: "e.g. Delhi,India",
    //   rules: { required: "University location is required" },
    //   columnWidth: 6,
    //   isRequired: true,
    // },
    // {
    //   label: "Enter Degree",
    //   fieldName: "degree",
    //   type: "text",
    //   placeholder: "e.g. Delhi,India",
    //   rules: { required: "University location is required" },
    //   columnWidth: 6,
    //   isRequired: true,
    // },
    {
      label: "Project Type",
      fieldName: "project_type",
      type: "normal-select",
      placeholder: "e.g. Delhi,India",
      rules: { required: "Project is required" },
      columnWidth: 12,
      isRequired: true,
      options: WORKPLACE_TYPES_OPTIONS,
    },
    
    {
      label: "Project URL",
      fieldName: "project_link",
      type: "text",
      placeholder: "e.g. https://example.com",
      rules: { required: "Project url is required" },
      columnWidth: 6,
      isRequired: true,
      defaultOption: "",
    },
    {
      label: "Skill",
      fieldName: "tech_stacks_used",
      type: "text",
      placeholder: "e.g. HTML",
      rules: { required: "Skill is required" },
      columnWidth: 6,
      isRequired: true,
      defaultOption: "",
    },
    {
      label: "Start Date",
      fieldName: "project_start_date",
      type: "date",
      isMinRequired: true,
      isMaxRequired:false,
      rules: { required: "Job location is required" },
      columnWidth: 6,
      isRequired: true,
      defaultOption: "Select Month",
    },
  

    {
      label: "End Date",
      fieldName: "project_end_date",
      type: "date",
      // placeholder: "e.g. Street 1341,New area,CA,USA",
      rules: { required: "Job location is required" },
      columnWidth: 6,
      isMinRequired: true,
      isMaxRequired:false,
      isRequired: true,
      defaultOption: "Select Month",
    },

  ]



const DEVELOPER_STEP_FIELDS = {
  1: DEVELOPER_STEP_1_FIELDS,
};

const NESTED_DEVELOPER_STEP_FIELDS={
  1:NESTED_DEVELOPER_STEP_1_FIELDS,
}
const DEVELOPER_STEP_FIELDS_FOR_STEP_3={
  3:NESTED_DEVELOPER_STEP_2_FIELDS,
}
const DEVELOPER_STEP_FIELDS_FOR_STEP_6={
  1:NESTED_DEVELOPER_STEP_6_FIELDS,
}

export const getDeveloperActiveStepFields = (activeStep,nestedActiveStep) =>{
  console.log(activeStep,nestedActiveStep,"cosn")
  if(nestedActiveStep>0  &&activeStep==2){
    return NESTED_DEVELOPER_STEP_FIELDS[1] || null;
  }else if(nestedActiveStep>0  &&activeStep==3){
   return DEVELOPER_STEP_FIELDS_FOR_STEP_3[3] || null;
  }else if(nestedActiveStep>0  &&activeStep==6){
   return DEVELOPER_STEP_FIELDS_FOR_STEP_6[1] || null
  }
  else{
    return DEVELOPER_STEP_FIELDS[activeStep] || null
   }
}
  
  
export const getStepDataFromAPI=(data,activeStep)=>{
  if(data){
    return data[`step${activeStep}`]
  }else{
    return {}
  }
}


const EDUCATION_KEYS= {
  university_name: "",
  address: "",
  degree_id: "",
  field_of_study: "",
  start_year: "",
  end_month: "",
  end_year: 0,
  currently_attending: "",
  description: "",
}


const PROJECT_KEYS={
    "project_title": "",
    "project_description": "",
    "tech_stacks_used": "",
    "role_in_project": "",
    "project_team_size": "",
    "project_link": "",
    "project_start_date": "",
    "project_end_date": "",
    "project_type":  "" 
}


const KEYS={
  5:EDUCATION_KEYS,
  6:PROJECT_KEYS
}

export const stepperFormKeys=(activeStep)=>{
 return KEYS[activeStep]

}



