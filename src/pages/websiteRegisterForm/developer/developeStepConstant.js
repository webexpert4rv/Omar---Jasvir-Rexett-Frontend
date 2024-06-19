const RELOCATE_OPTIONS = [
  {label:"Yes",value:"Yes"},
  {label:"No",value:"No"}
]

const DEVELOPER_STEPPER_DATA = {
  1: {
    fields: [
      {
        fieldName: "first_name",
        inputType: "text",
        label: "firstName",
        isRequired: true,
        isAutocomplete: false,
        rules: { required: "First Name is required" },
      },
      {
        fieldName: "last_name",
        inputType: "text",
        label: "lastName",
        isRequired: true,
        isAutocomplete: false,
        rules: { required: "Last Name  is required" },
      },
      {
        fieldName: "email",
        type: "text",
        label: "email",
        isRequired: true,
        rules: {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        },
      },
      {
        fieldName: "ready_to_relocate",
        type: "normal-select",
        label: "ready_to_relocate", 
        rules: { required: "This field is required" },
        isRequired: true,
        isAutocomplete: false,
        isPhoneField:true,
        options:RELOCATE_OPTIONS,
        defaultOption:"Select"
      },
      {
        fieldName: "password",
         isPassword:true
      },
      // for password and confirmPassword
      // {
      //   fieldName: "ready_to_relocate",
      //   type: "select",
      //   label: "ready_to_relocate",
      //   rules:{required:"This field is required"},
      //   isRequired: true,
      // },
      // {
      //   fieldName: "ready_to_relocate",
      //   type: "select",
      //   label: "ready_to_relocate",
      //   rules:{required:"This field is required"},
      //   isRequired: true,
      // }
      {
        fieldName: "phone_number",
        type: "phone",
        label: "phone",
        rules: {
          required: "Phone Number is required",
          pattern: {
            value: /^\+?[0-9]{10,14}$/,
            message: "Please enter a valid phone number",
          },
        },
        isRequired: true,
        isAutocomplete: false,

      },
      {
        fieldName: "address",
        type: "select",
        label: "address",
        rules: {
          required: " Address is required",
        },
        isRequired: true,
        isAutocomplete: true,
      },
      {
        fieldName: "location",
         isLocation:true
      },
    ],
    headingData: {
      h1: "Add your Contact Details",
      para: `Explore thrilling remote opportunities with Europe's top companies, become part of a dynamic community, and enjoy exclusive perks`,
    },
  },
  2: {
    fields: [],
    headingData: {
      h1: "Expertise at its best!",
      para: `We pair exceptional professionals with the worlds top companies`,
    },
  },
  3: {
    data: [],
    name: "project_length",
    optionKey: "project_length",
    inputType: "radio",
    headingData: {
      h1: " Past Successes",
      para: ``,
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
const DEVELOPER_STEP_URLS = {
  1:"/web/apply-as-developer",
  2:"/web/create-developer-profile"
}
export const  getActiveStepURL = (activeStep) => DEVELOPER_STEP_URLS[activeStep] || null

export const getCurrentStepInfo = (count) =>
  DEVELOPER_STEPPER_DATA[count] || null;
