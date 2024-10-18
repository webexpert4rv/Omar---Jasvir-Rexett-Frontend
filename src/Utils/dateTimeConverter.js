import moment from "moment";

export const convertDateTime = (dateTime, format = "M/D/YYYY | hh:mm:ss A") => {
  return moment(dateTime).format(format);
};
