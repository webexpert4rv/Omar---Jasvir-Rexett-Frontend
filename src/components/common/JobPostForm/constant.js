export const step1keys = [
  "title",
  "job_location",
  "company_name",
  "job_type",
  "contract_type",
  "job_positions",
  // new values
  "response_time",
  "state_iso_code",
  "country_code",
  "city",
  "time_zone",
];
export const step2keys = ["skills", "description", "optional_skills"];
export const step3keys = ["screening_questions", "qualification_filter_out"];
export const getActiveStepKeys = (activeStep) => {
  switch (activeStep) {
    case 1:
      return step1keys;
    case 2:
      return step2keys;
    case 3:
      return step3keys;
  }
};
export const WORKPLACE_TYPES_OPTIONS = [
  {
    value: "hybrid",
    label: "Hybrid",
  },
  {
    value: "remote",
    label: "Remote",
  },
  {
    value: "onsite",
    label: "On Site",
  },
];

export const JOB_TYPES_OPTIONS = [
  {
    value: "full-time",
    label: "Full Time",
  },
  {
    value: "part-time",
    label: "Part Time",
  },
  {
    value: "contract",
    label: "Contract",
  },
];

export const LANGUAGE_PREFERENCES_OPTIONS = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "swedish",
    label: "Swedish",
  },
  {
    value: "Norwegian",
    label: "Norwegian",
  },
];

export const MONTH_YEAR = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

const currentYear = new Date().getFullYear();
const last30Years = Array.from({ length: 31 }, (_, i) => {
  const year = currentYear - i;
  return { label: `${year}`, value: `${year}` };
});

export const YEAR_OPTIONS = last30Years;

const range = Array.from({ length: 15 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} year`,
}));

export const EXPERIENCE_YEAR = range;

export const WORK_TYPE = [
  { label: "Remote", value: "remote" },
  { label: "OnSite", value: "onsite" },
  { label: "OffSite", value: "offsite" },
];

export const EDUCATION_LEVEL = [
  { label: "Secondary School" },
  { label: "Vocational Certificate or Diploma" },
  { label: "Apprenticeship or Internship Training" },
  { label: "Associates" },
  { label: "Bachelors" },
  { label: "Masters" },
  { label: "Doctorate or Ph. D" },
];

export const PROJECT_TYPE = [
  { label: "Health Care" },
  { label: "Artificial Intelligence" },
  { label: "Social Media" },
  { label: "E-commerce" },
  { label: "Gaming" },
  { label: "Stocks" },
  { label: "Real State" },
  { label: "Booking" },
];

export const TEAM_SIZE = [
  { label: 2 },
  { label: 5 },
  { label: 10 },
  { label: 15 },
  { label: 20 },
  { label: 30 },
  { label: 50 },
  { label: "100+" },
];
export const WEIGHT_OPTIONS = ["Beginner", "Intermediate", "Expert"];

export const DEGREE= [
  {
      "value": "1",
      "label": "Secondary School Diploma",
    
  },
  {
      "value": "2",
      "label": "Bachelor of Science",
    
  },
  {
      "value": "3",
      "label": "Bachelor of Arts",
    
  },
  {
      "value": "4",
      "label": "Bachelor of Computer Science",
    
  },
  {
      "value": "5",
      "label": "Bachelor of Computer Applications",
    
  },
  {
      "value": "6",
      "label": "Bachelor of Technology",
    
  },
  {
      "value": "7",
      "label": "Master of Science",
    
  },
  {
      "value": "8",
      "label": "Master of Arts",
    
  },
  {
      "value": "9",
      "label": "Master of Computer Science",
    
  },
  {
      "value": "10",
      "label": "Master of Computer Applications",
    
  },
  {
      "value": "11",
      "label": "Master of Technology",
    
  },
  {
      "value": "12",
      "label": "Ph.D. in Electrical Engineering",
    
  },
  {
      "value": "13",
      "label": "Master of Business Administration",
    
  }
]
export const DEAFULT_EXPERTISE = [
  { skill: "", skill_weight: "", experience: "" },
];
