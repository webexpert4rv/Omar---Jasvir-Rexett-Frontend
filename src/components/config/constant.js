
import { MdDesignServices, MdSpaceDashboard } from "react-icons/md";
import { FaListUl, FaUserLarge } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { BsClockFill } from "react-icons/bs";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa6";
import { GiPalmTree } from "react-icons/gi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { PiCoinsFill, PiUsersFourFill, PiUsersThreeFill } from "react-icons/pi";
import { RiFileCopy2Fill } from "react-icons/ri";
import { IoIosLaptop } from "react-icons/io";
import { FaList } from "react-icons/fa6";


export const DEVELOPER_SIDE_BAR_ITEMS = [
    { to: "/developer/dashboard", icon: <MdSpaceDashboard />, text: "dashboard" },
    { to: "/developer/developer-cv", icon: <FaUserLarge />, text: "cv" },
    { to: "/developer/edit-developer-profile", icon: <IoIosSettings />, text:"editProfile" },
    { to: "/developer/developer-documents", icon: <IoDocuments />, text: "documents" },
    { to: "/developer/job-posted", icon: <FaListUl />, text: "jobs" },
    { to: "/developer/developer-time-reporting", icon: <BsClockFill />, text: "timeReporting" },
    { to: "/developer/project-history", icon: <FaList />, text: "Project History" },
    { to: "/developer/leave-plan", icon: <GiPalmTree />, text: "Apply Leave/Holiday" },
    { to: "/developer/developer-invoice", icon: <FaFileInvoice />, text: "pay_slip" },


];
export const OTHER_OPTIONS_DEVELOPER  = [
    { to: "https://rexett-support.rvtechnologies.info", icon: <TfiHeadphoneAlt />, text: "Contact Support", external: true },
    { to: "/developer-faq", icon: <BsFillQuestionCircleFill />, text: "faq" },
];

export const OTHER_OPTIONS_ADMIN  = [
    { to: "https://rexett-support.rvtechnologies.info", icon: <TfiHeadphoneAlt />, text: "Contact Support", external: true },
    { to: "/admin-faq", icon: <BsFillQuestionCircleFill />, text: "faq" },
];
export const OTHER_OPTIONS_CLIENT  = [
    { to: "https://rexett-support.rvtechnologies.info", icon: <TfiHeadphoneAlt />, text: "Contact Support", external: true },
    { to: "/faq", icon: <BsFillQuestionCircleFill />, text: "faq" },
];
export const OTHER_OPTIONS_VENDOR  = [
    { to: "https://rexett-support.rvtechnologies.info", icon: <TfiHeadphoneAlt />, text: "Contact Support", external: true },
    { to: "/developer-faq", icon: <BsFillQuestionCircleFill />, text: "faq" },
];

export const CLIENT_SIDE_BAR_ITEMS = [
    { to: "/client/dashboard", icon: <MdSpaceDashboard />, text: "dashboard"},
    { to: "/client/hired-developers", icon: <FaUserLarge />, text: "hireDevelopers" },
    { to: "/client/edit-profile", icon: <IoIosSettings />, text: "editProfile" },
    { to: "/client/documents", icon: <IoDocuments />, text: "documents" },
    { to: "/client/time-reporting", icon: <BsClockFill />, text: "timeReporting" },
    { to: "/client/leave-request", icon: <GiPalmTree />, text: "leaveRequests" },
    { to: "/client/job-posted", icon: <FaListUl />, text: "jobs" },
    // { to: "/client/earned-back", icon: <PiCoinsFill />, text: "earnedBack" },
    { to: "/client/invoice", icon: <FaFileInvoice />, text: "invoice" },
];

export const ADMIN_SIDE_BAR_ITEMS= [
    { to: "/admin/admin-dashboard", icon: <MdSpaceDashboard />, text: "dashboard" },
    { to: "/admin/applications", icon: <RiFileCopy2Fill />, text: "applications" },
    { to: "/admin/members", icon: <PiUsersFourFill />, text: "members" },
    { to: "/admin/admin-job-listing", icon: <FaListUl />, text: "jobListing" },
    // { to: "/admin/edit-admin-profile", icon: <IoIosSettings />, text: "editProfile" },
    { to: "/admin/admin-documents", icon: <IoDocuments />, text: "Documents/images" },
    { to: "/admin/admin-time-reporting", icon: <BsClockFill />, text:"timeReporting" },
    // { to: "/admin/interviews", icon: <IoIosLaptop />, text:"Interviews" },
    { to: "/admin/admin-invoice", icon: <PiCoinsFill />, text: "Invoice" },
    { to: "/admin/roles-permissions", icon: <PiUsersThreeFill />, text: "Employees & Permissions" },
    { to: "/admin/customization", icon: <MdDesignServices />, text: "Configuration" },
  ]

 export const VENDOR_SIDE_BAR_ITEMS=[
    { to: "/vendor-dashboard", icon: <MdSpaceDashboard />, text: "dashboard" },
    { to: "/list-all-developers", icon:  <FaUserLarge />, text: "List of Developers" },
    { to: "/edit-vendor-profile", icon: <IoIosSettings />, text: "editProfile" },
    { to: "/vendor-documents", icon: <IoDocuments />, text: "documents" },
    { to: "/vendor-upload-invoice", icon: <FaFileInvoice />, text: "Invoice" },
    { to: "/vendor-time-reporting", icon: <BsClockFill />, text: "timeReporting" },
  ]; 