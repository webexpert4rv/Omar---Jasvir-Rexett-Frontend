export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SIDEBAR_ITEMS = {
  client: [
    { stepNumber: 1, label: "personal" },
    { stepNumber: 2, label: "engagement" },
    { stepNumber: 3, label: "engagementLength" },
    { stepNumber: 4, label: "startTeam" },
    { stepNumber: 5, label: "availability" },
    { stepNumber: 6, label: "skillset" },
    { stepNumber: 7, label: "bookMeeting" },
  ],
  vendor: [],
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
export const getActiveStepHeadingData = (activeStep) =>
  CLIENT_STEPPER_HEADINGS[activeStep] || null;

const CLIENT_STEP_1_FIELDS = [
  {
    label: "companyName",
    fieldName: "company_name",
    type: "text",
    placeholder: "e.g Google",
    rules: { required: "Company name is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "taxId",
    fieldName: "company_tax_id",
    type: "text",
    placeholder: "e.g 123153",
    rules: { required: "Tax ID is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "firstName",
    fieldName: "first_name",
    type: "text",
    placeholder: "e.g John",
    rules: { required: "First name is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "surname",
    fieldName: "last_name",
    type: "text",
    placeholder: "e.g Doe",
    rules: { required: "Last name is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "phoneNumber",
    fieldName: "phone_number",
    type: "phone",
    placeholder: "e.g +91 1234567890",
    rules: { required: "Phone number is required" },
    columnWidth: 6,
    isRequired: true,
  },
  {
    label: "email",
    fieldName: "email",
    type: "email",
    placeholder: "e.g johndoe123@gmail.com",
    rules: { required: "Email is required",pattern:{
        value:EMAIL_REGEX,
        message:"Please enter a valid email"
    } },
    columnWidth: 6,
    isRequired: true,
  },
  {
    isPasswordSection: true,
  },
  {
    label: "address",
    fieldName: "company_address",
    type: "select",
    placeholder: "e.g Street 1341,New area,CA,USA",
    rules: { required: "Address is required" },
    columnWidth: 12,
    isRequired: true,
    isAutocomplete: true,
  },
];
const CLIENT_ACTIVE_STEP_FIELDS = {
  1: CLIENT_STEP_1_FIELDS,
};

export const getActiveStepFields = (activeStep) =>
  CLIENT_ACTIVE_STEP_FIELDS[activeStep] || null;
