import { COMPANY_TYPE_SELECT_OPTIONS } from "../client/constant";
import { EXPERTISE_LEVEL_OPTIONS } from "../developer/developeStepConstant";
export const VENDOR_STEP1_FIELDS = [
  {
    label: "typeOfCompany",
    type: "normal-select",
    options: COMPANY_TYPE_SELECT_OPTIONS,
    rules: { required: "Company type is required" },
    defaultOption: "Select your company type",
    isRequired: true,
    fieldName: "type_of_company",
  },
  {
    label: "nameOfCompany",
    type: "text",
    rules: { required: "Company name is required" },
    isRequired: true,
    fieldName: "name_of_the_company",
  },
  {
    label: "emailAddress",
    type: "text",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
    isRequired: true,
    fieldName: "email",
  },
  {
    isPassword: true,
  },
  {
    label: "phoneNumber",
    type: "phone",
    rules: {
      required: "Phone number is required",
    },
    isRequired: true,
    fieldName: "phone_number",
  },
  {
    label: "companyAddress",
    type: "location",
    rules: {
      required: "Company address is required",
    },
    isAutoComplete: true,
    isRequired: true,
    fieldName: "address",
  },
  {
    isCountry: true,
  },
  {
    label: "zipcode",
    type: "onlyNumber",
    rules: {
      required: "Zipcode is required",
    },
    isRequired: true,
    fieldName: "pin_code",
  },
];
const ESTABLISHMENT_TYPE_OPTIONS = [
  { label: "Proprietorships", value: "proprietorships" },
  { label: "Partnerships", value: "partnerships" },
  { label: "Corporations", value: "corporations" },
  { label: "Cooperatives", value: "Cooperatives" },
];
const SERVICE_OFFERING_OPTIONS = [
  { label: "Designing", value: "designing" },
  { label: "Development", value: "development" },
  { label: "App Design", value: "appDesign" },
  { label: "Custom Development", value: "customDevelopment" },
];

const VENDOR_STEP2_FIELDS = [
  {
    label: "establishmentYear",
    type: "year-picker",
    isYearPicker:true,
    isMaxRequired: true,
    rules: { required: "Establishment Year is required" },
    isRequired: true,
    fieldName: "establishment_year_date",
  },
  {
    label: "typeOfEstablishment",
    type: "normal-select",
    isMaxRequired: true,
    rules: { required: "Establishment Type is required" },
    isRequired: true,
    options: ESTABLISHMENT_TYPE_OPTIONS,
    defaultOption: "Select type of establishment",
    fieldName: "type_of_establishment",
  },
  {
    label: "totalEmployeesInComapny",
    type: "onlyNumber",
    rules: { required: "Total number of employees is required" },
    isRequired: true,
    fieldName: "total_employees",
  },
  {
    label: "totalItRcruiters",
    type: "onlyNumber",
    rules: { required: "Total number of IT recruiters is required" },
    isRequired: true,
    fieldName: "total_it_recruiter",
  },
  {
    label: "yearlyRevenues",
    type: "onlyNumber",
    rules: { required: "Yearly revenue is required" },
    isRequired: true,
    fieldName: "yearly_revenue",
  },
  {
    label: "websiteAddress",
    type: "text",
    rules: { required: "Website address is required" },
    isRequired: true,
    fieldName: "website",
  },
  {
    label: "GSTNumber",
    type: "onlyNumber",
    rules: { required: "GST number is required" },
    isRequired: true,
    fieldName: "gst_number",
  },
];
const VENDOR_STEP3_FIELDS = [
  {
    label: "serviceOfferings",
    type: "normal-select",
    rules: { required: "Service  is required" },
    isRequired: true,
    options: SERVICE_OFFERING_OPTIONS,
    defaultOption: "Select service",
    fieldName: "service_offering",
  },
  {
    label: "areaOfSpecialization",
    type: "select2",
    rules: { required: "Area of specialization  is required" },
    isRequired: true,
    fieldName: "specialization",
  },
  {
    label: "selectSkill",
    type: "select2",
    rules: { required: "Skill  is required" },
    isRequired: true,
    fieldName: "skill",
  },
  {
    label: "skillExperience",
    type: "normal-select",
    rules: { required: "Skill experience  is required" },
    isRequired: true,
    fieldName: "experience",
    defaultOption: "Select skill experience",
    options: EXPERTISE_LEVEL_OPTIONS,
  },
  //   may be need to convert these fields to date or time field
  {
    label: "turnAroundTimeContract",
    type: "onlyNumber",
    rules: { required: "This field  is required" },
    isRequired: true,
    fieldName: "trun_around_time_to_close_contract_position",
  },
  {
    label: "turnAroundTimePermanent",
    type: "onlyNumber",
    rules: { required: "This field  is required" },
    isRequired: true,
    fieldName: "trun_around_time_to_close_permanent_position",
  },
  {
    label: "sucessStory",
    type: "textarea",
    rules: { required: "This field  is required" },
    isRequired: true,
    rows: 4,
    fieldName: "success_story",
  },
];

const VENDOR_STEP4_FIELDS = [
  {
    label: "proprietorName",
    type: "text",
    isMaxRequired: true,
    rules: { required: "Proprietor/ CEO Name is required" },
    isRequired: true,
    fieldName: "proprietor_name",
  },
  {
    label: "contactNumber",
    type: "phone",
    rules: { required: "Contact number is required" },
    isRequired: true,
    fieldName: "proprietor_contact_number",
  },
  {
    label: "emailId",
    type: "text",
    rules: {
      required: "Email id is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
    isRequired: true,
    fieldName: "proprietor_email",
  },
  {
    label: "contactPersonsName",
    type: "text",
    rules: { required: "Contact person's name is required" },
    isRequired: true,
    fieldName: "proprietor_contact_person_name",
  },
  {
    label: "contactPersonsPhone",
    type: "phone",
    rules: { required: "Contact person's phone number is required" },
    isRequired: true,
    fieldName: "proprietor_contact_person_phone_number",
  },
  {
    label: "contactPersonsEmail",
    type: "text",
    rules: {
      required: "Contact person's email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
    isRequired: true,
    fieldName: "proprietor_contact_person_email",
  },
];

const VENDOR_STEP_FIELDS = {
  1: VENDOR_STEP1_FIELDS,
  2: VENDOR_STEP2_FIELDS,
  3: VENDOR_STEP3_FIELDS,
  4: VENDOR_STEP4_FIELDS,
};
export const getActiveStepData = (activeStep) =>
  VENDOR_STEP_FIELDS[activeStep] || null;
const VENDOR_POST_API_URL = {
  1: "web/apply-as-vendor",
  2: "web/add-company-info",
  3: "web/add-company-specialization",
  4: "web/add-proprietor-details",
};

export const getActiveStepPostAPIUrl = (activeStep) =>
  VENDOR_POST_API_URL[activeStep] || null;
export const getYearFromData = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return year;
  // const month = date.getMonth() + 1;
  // return { year, month };
};

const ACTIVE_STEP_KEYS = {
  1: [
    "name_of_the_company",
    "email",
    "country_code",
    "phone_number",
    // "",
    "state_iso_code",
    "city",
    "pin_code",
    "type_of_company",
    "address",
    "logo",
  ],
  2: [
    "website",
    "yearly_revenue",
    "type_of_establishment",
    "total_employees",
    "total_it_recruiter",
    "gst_number",
    "establishment_year_date"
  ],
  3: [
    "specialization",
    "skill",
    "experience",
    "service_offering",
    "trun_around_time_to_close_contract_position",
    "trun_around_time_to_close_permanent_position",
    "success_story",
    
  ],
  4: [
    "proprietor_contact_number",
    "proprietor_contact_person_email",
    "proprietor_contact_person_name",
    "proprietor_contact_person_phone_number",
    "proprietor_name",
    "proprietor_email"
  ],
};
export const getActiveVendorStepKeys = (activeStep) =>
  ACTIVE_STEP_KEYS[activeStep] ||null;

const VENDOR_HEADINGS = {
2:"Enter Company Information",
3:"Area of Expertise",
4:"Proprietor Details"
}
export const getActiveStepHeading = (activeStep) =>VENDOR_HEADINGS[activeStep] || null
