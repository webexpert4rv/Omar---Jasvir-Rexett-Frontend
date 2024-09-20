const STEPPER_DATA = {
  1: {
    data: [],
    name: null,
    optionKey: null,
    inputType: null,
    headingData: {
      h1: "Add your Contact Details",
      para: ` Add your Contact Details We are a Global tech talent and solutions
            provider. Join our platform and take advantage of the opportunity to
            enhance your talent acquisition journey with Rexett, all while
            enjoying significant savings of up to 72% on hiring staff. Join the
            ranks of over 100 satisfied clients who have chosen to partner with
            Rexett.`,
    },
  },
  2: {
    data: [],
    name: "engagement_type",
    optionKey: "engagement_type",
    inputType: "radio",
    headingData: {
      h1: "Select the ideal length for your engagement",
      para: `Select the ideal length for your engagement`,
    },
  },
  3: {
    data: [],
    name: "project_length",
    optionKey: "project_length",
    inputType: "radio",
    headingData: {
      h1: "How long will the Engagement last?",
      para: `Select the ideal length for your engagement.`,
    },
  },
  4: {
    data: [],
    name: "when_should_the_development_start",
    optionKey: "development_start",
    inputType: "radio",
    headingData: {
      h1: "When should your New Team Member Start ?",
      para: ``,
    },
  },
  5: {
    data: [],
    name: "availability",
    optionKey: "availability",
    inputType: "radio",
    headingData: {
      h1: "What Availablity you need ?",
      para: ``,
    },
  },
  6: {
    data: [],
    name: "skills",
    optionKey: "skill",
    inputType: "multi-select",
    headingData: {
      h1: "What Skillset you need ?",
      para: ``,
    },
    label: "Select Your Skills",
  },
  7: {
    data: [],
    name: "meeting_date",
    inputType: "date",
    headingData: {
      h1: "Book a Meeting with your Personal Match",
      para: ``,
    },
  },
  8: {
    data: [],
    name: null,
    inputType: null,
    headingData: {
      h1: "Thank you for applying",
      para: `A Rexett Family Team Member Will Reach Out to You Shortly for the Next Steps!`,
    },
  },
};

export const COMPANY_TYPE_SELECT_OPTIONS = [
  { label: "Sole Partnership", value: "sole_partnership" },
  { label: "Partnership", value: "partnership" },
  {
    label: "Limited Liability Company(LLC)",
    value: "limited_liability_company(LLC)",
  },
  { label: "Corporation", value: "corporation" },
  { label: "Nonprofit Organization", value: "nonprofit_organization" },
  { label: "Cooperative", value: "cooperative" },
  { label: "Franchise", value: "franchise" },
  { label: "Joint Venture", value: "joint_venture" },
];
export const getCurrentStepper = (count) => STEPPER_DATA[count] || null;

export const getActiveStepOptions = (options, optionKey) => {
  let newOptions = [];
  // if optionKey is null that step does not requires options
  if (options[optionKey]?.length) {
    newOptions = options[optionKey].map(({ name, slug }) => {
      return { label: name, value: slug };
    });
  }
  return newOptions;
};

export const formatSkillOptionsForSelect = (options) => {
  const newOptions = options?.map(({ title, id }) => {
    return { label: title, value: id };
  });
  return newOptions;
};
const STEP_KEYS = {
  1: [
    "name",
    "email",
    "address",
    "phone_number",
    "country_code",
    "state_iso_code",
    "passcode",
    "password",
    "client_type",
    "company_name",
    "company_tax_id",
    "company_address",
    "company_type",
  ],
  2: ["engagement_type"],
  3: ["project_length"],
  4: ["when_should_the_development_start"],
  5: ["availability"],
  6: ["skills"],
  7: ["meeting_date", "meeting_start_time", "meeting_end_time"],
};
export const getKeysForActiveStep = (activeStep) => STEP_KEYS[activeStep];
export const VERIFY_USER_MESSAGE =
  "Email already exists in our records. Please verify if it's yours.";
export const convertSkills = ({
  convertTo,
  options = null,
  originalSkillArray = null,
  string,
}) => {
  if (convertTo === "string" && options?.length) {
    const newOptions = options.map(({ label }) => label);
    const newString = newOptions.toString();
    return newString;
  } else if (convertTo === "array") {
    const arr = string.split(",");
    //  const skillArray = arr.map((value));
    if (originalSkillArray?.length) {
      const newSkillOptions = originalSkillArray?.filter(({ title }) =>
        arr.includes(title)
      );
      const skilloptionsForSelect = newSkillOptions.map((curElem) => {
        return { label: curElem?.title, value: curElem.id };
      });
      return skilloptionsForSelect;
    }
  }
};
const roleNames = [
  "manager", "workspace admin", "admin", "maintenance",
  "support assistance", "accountant", "hr", "interviewer"
];

