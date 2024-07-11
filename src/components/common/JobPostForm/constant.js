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
  "time_zone"
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
    value: "on-site",
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
