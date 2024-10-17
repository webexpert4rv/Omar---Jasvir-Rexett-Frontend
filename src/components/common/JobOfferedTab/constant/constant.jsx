import { CiAt } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { IoLocationOutline, IoTextSharp } from "react-icons/io5";

export const PRICE_OPTION = { label: "Currency", value: ["USD", "SDG"] };
export const DURATION = {
  label: "Working Type",
  value: ["Hourly", "Weekly", "Monthly", "Yearly"],
};
export const DRAGGABLE_TAG = [
  {
    tag: "name",
    value: "asd",
    icon: <IoTextSharp />,
    subOption: null,
    type: "Text",
    fontSize: 10,
  },
  {
    tag: "email",
    value: "asd",
    icon: <CiAt />,
    subOption: null,
    type: "Text",
    fontSize: 10,
  },
  {
    tag: "Working Duration",
    value: "asd",
    icon: <GoClock />,
    subOption: DURATION,
    type: "Number",
    fontSize: 10,
  },
  {
    tag: "Price",
    value: "asd123",
    icon: <FiDollarSign />,
    subOption: PRICE_OPTION,
    type: "Number",
    fontSize: 10,
  },
  {
    tag: "Address",
    value: "asd",
    icon: <IoLocationOutline />,
    type: "Text",
    fontSize: 10,
  },
];

export const ADOBE_BASE_URL = process.env.REACT_APP_ADOBE_API?.replace(
  /\/$/,
  ""
);

export const PDF_SIGNER_ROLE = {
  signer: "signer",
  approver: "approver",
};

export const CATEGORY_TITLE = {
  sow: "SOW",
  nda: "NDA",
};

export const NEW_TEMPLATE_TYPE = {
  upload: "upload-document",
  create: "create-document",
};

export const SIGNER_STATUS = {
  NOT_YET_VISIBLE: "NOT_YET_VISIBLE",
  WAITING_FOR_OTHERS: "WAITING_FOR_OTHERS",
  WAITING_FOR_MY_SIGNATURE: "WAITING_FOR_MY_SIGNATURE",
};
