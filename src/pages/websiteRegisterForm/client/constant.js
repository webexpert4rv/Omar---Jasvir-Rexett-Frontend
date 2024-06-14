const STEPPER_DATA = {
  1: {
    data: [],
    name: null,
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
    inputType: "radio",
    headingData: {
      h1: "Select the ideal length for your engagement",
      para: `Select the ideal length for your engagement`,
    },
  },
  3: {
    data: [],
    name: "project_length",
    inputType: "radio",
    headingData: {
      h1: "How long will the Engagement last?",
      para: `Select the ideal length for your engagement.`,
    },
  },
  4: {
    data: [],
    name: "development_start",
    inputType: "radio",
    headingData: {
      h1: "When should your New Team Member Start ?",
      para: ``,
    },
  },
  5: {
    data: [],
    name: "availability",
    inputType: "radio",
    headingData: {
      h1: "What Availablity you need ?",
      para: ``,
    },
  },
  6: {
    data: [],
    name: "skill",
    inputType: "select",
    headingData: {
      h1: "What Skillset you need ?",
      para: ``,
    },
    label: "Select Your Skills",
  },
  7: {
    data: [],
    name: "date",
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

export const getCurrentStepper = (count) => STEPPER_DATA[count] || null;
