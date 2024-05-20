export const step1keys = ["jobTitle"];
export const step2keys = ["skill","skillDescription"];
export const step3keys = ["email"];
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