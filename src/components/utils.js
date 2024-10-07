import moment from "moment";

export const createForReactSelect = ({ label, value }) => {
  return {
    label: label,
    value: value,
  };
};

export const convertCountriesForSelect = (options, type) => {
  console.log(options, "options inside countries select");
  let formattedCountryOptions = [];
  if (type === "timezones") {
    formattedCountryOptions = options?.map((timezone) => {
      return { label: timezone, value: timezone };
    });
  } else {
    formattedCountryOptions = options?.map(({ name, code, isoCode }) => {
      return { label: name, value: type === "country" ? code : isoCode };
    });
  }
  return formattedCountryOptions;
};

export const validatePassword = (value) => {
  if (value === "") {
    return true; // Password is not required, so return true if empty
  } else {
    // Check if password matches the pattern
    const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!pattern.test(value)) {
      return `Password must contain at least a symbol, upper and lower case letters and a number`;
    }
  }
  return true; // Password meets the criteria
};

export const getDateInRequiredFormat = (date, format) => {
  if (date) {
    return moment(date).format(format);
  } else {
    return "";
  }
};
export const reverseArray = (arr) => {
  if (arr.length) {
    return [...arr].reverse();
  }
};

export const shouldShowTime = (index, currentTime, previousTime) => {
  if (index === 0) {
    //  means this is the last message
    return true;
  } else {
    const date1 = moment(currentTime);
    const date2 = moment(previousTime);
    const diffInMinutes = date2.diff(date1, "minutes");
    return diffInMinutes > 1;
  }
};
export function removeDuplicateBasedOnLabels(skills) {
  const uniqueSkills = [];
  const labelsSeen = new Set(); // Using a Set to track seen labels

  for (const skill of skills) {
    if (!labelsSeen.has(skill.label)) {
      uniqueSkills.push(skill); // Add to result if label is not a duplicate
      labelsSeen.add(skill.label); // Mark label as seen
    }
  }

  return uniqueSkills;
}

export function getPercentageValueFromWeight(weight) {
  if (weight) {
    switch (weight) {
      case "Beginner":
        return "25%";
      case "Intermediate":
        return "50%";
      case "Expert":
        return "100%";
      default:
        return "0%";
    }
  }
}
export function getClassNameFromWeight(weight) {
  switch (weight) {
    case "Beginner":
      return "low-skill";
    case "Intermediate":
      return "medium-skill";
    case "Expert":
      return "high-skill";
    default:
      return "";
  }
}

export function createPayloadForJobSkills(skills) {
  if (skills?.length) {
    return skills.map(({ value, label, weight }) => ({
      skill_id: value,
      skill_name: label,
      weight: weight || "" // Provide default weight if missing
    }));
  }
  return [];
}

export function convertjobSkillsFromApiResponse(skills) {
  if (skills?.length) {
    return skills.map(({ skill_id, skill_name, weight }) => ({
      value: skill_id,
      label: skill_name,
      weight: weight || "" // Provide default weight if missing
    }));
  }
  return [];
}
export const getDifferenceFromTwoDates = (date1, date2) => {
  if (date1 && date2) {
    const startDate = moment(date1);
    const endDate = moment(date2);
    const differenceInHours = endDate.diff(startDate, 'hours');
    return differenceInHours
  }
}
