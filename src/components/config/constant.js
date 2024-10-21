
import { MdDesignServices, MdQueryStats, MdSpaceDashboard } from "react-icons/md";
import { FaGear, FaListUl, FaUserClock, FaUserLarge, FaUsers } from "react-icons/fa6";
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
import { TbReportMoney } from "react-icons/tb";
import { FaList } from "react-icons/fa6";

const permission_role_name=localStorage.getItem("permission_role_name") || "admin"

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
    { to: "/developer/developer-settings", icon: <FaGear />, text: "Settings" },


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
    { to: "/client/dashboard", icon: <MdSpaceDashboard />, text: "dashboard" ,active:true},
    { to: "/client/hired-developers", icon: <FaUserLarge />, text: "hireDevelopers",active:true },
    { to: "/client/edit-profile", icon: <IoIosSettings />, text: "editProfile" ,active:true},
    { to: "/client/documents", icon: <IoDocuments />, text: "documents",active:true },
    { to: "/client/time-reporting", icon: <BsClockFill />, text: "timeReporting",active:true },
    { to: "/client/leave-request", icon: <GiPalmTree />, text: "leaveRequests",active:true },
    { to: "/client/job-posted", icon: <FaListUl />, text: "jobs",active:true },
    // { to: "/client/earned-back", icon: <PiCoinsFill />, text: "earnedBack" },
    { to: "/client/invoice", icon: <FaFileInvoice />, text: "invoice",active:true },
    { to: "/client/client-settings", icon: <FaGear />, text: "Settings",active:true },
];

export const ADMIN_SIDE_BAR_ITEMS= [
    { to: `/${permission_role_name}/dashboard`, icon: <MdSpaceDashboard />, text: "dashboard",slug:"dashboard",active:true},
    { to: `/${permission_role_name}/applications`, icon: <RiFileCopy2Fill />, text: "applications",slug:"new-applicants",active:true},
    { to: `/${permission_role_name}/members`, icon: <PiUsersFourFill />, text: "members",slug:"members",active:true },
    { to: `/${permission_role_name}/admin-job-listing`, icon: <FaListUl />, text: "jobListing",slug:"job-listing",active:true },
    // { to: "/admin/edit-admin-profile", icon: <IoIosSettings />, text: "editProfile" },
    { to: `/${permission_role_name}/admin-documents`, icon: <IoDocuments />, text: "Documents/images", slug:"documents",active:true },
    { to: `/${permission_role_name}/admin-time-reporting`, icon: <BsClockFill />, text:"timeReporting",slug:"time-reporting",active:true },
    // { to: "/admin/interviews", icon: <IoIosLaptop />, text:"Interviews" },
    { to: `/${permission_role_name}/admin-invoice`, icon: <PiCoinsFill />, text: "Invoice",slug:"invoice",active:true },
    { to: `/${permission_role_name}/statistics`, icon: <MdQueryStats />, text: "Statistics",slug:"statistics",active:true },
    { to: `/${permission_role_name}/roles-permissions`, icon: <PiUsersThreeFill />, text: "Employees & Permissions",slug:"roles-permissions",active:true },
    { to: `/${permission_role_name}/customization`, icon: <MdDesignServices />, text: "Configuration",slug:"configuration",active:true },
    // { to: "/admin/subscription-plan", icon: <TbReportMoney />, text: "Subscriptions" },
    // { to: "/admin/client-listing", icon: <FaUsers />, text: "Clients" },
  ]

 export const VENDOR_SIDE_BAR_ITEMS=[
    { to: "/vendor-dashboard", icon: <MdSpaceDashboard />, text: "dashboard",active:true },
    { to: "/list-all-developers", icon:  <FaUserLarge />, text: "List of Developers" ,active:true},
    { to: "/edit-vendor-profile", icon: <IoIosSettings />, text: "editProfile",active:true },
    { to: "/vendor-documents", icon: <IoDocuments />, text: "documents" ,active:true},
    { to: "/vendor-upload-invoice", icon: <FaFileInvoice />, text: "Invoice" ,active:true},
    { to: "/vendor-time-reporting", icon: <BsClockFill />, text: "timeReporting",active:true },
    { to: "/vendor/vendor-settings", icon: <FaGear />, text: "Settings",active:true },
  ];
  
  export const SUPERADMIN_SIDE_BAR_ITEMS=[
    { to: "/super-admin-dashboard", icon: <MdSpaceDashboard />, text: "dashboard" ,active:true},
    { to: "/super-admin/subscription-plan", icon: <TbReportMoney />, text: "Subscriptions" ,active:true},
    { to: "/super-admin/client-listing", icon: <FaUsers />, text: "Clients",active:true },
    { to: "/super-admin/support-agents", icon: <FaUsers />, text: "Support Agents",active:true },
    { to: "/super-admin/manage-shift", icon: <FaUserClock />, text: "Manage Agent Shift",active:true },
  ]; 