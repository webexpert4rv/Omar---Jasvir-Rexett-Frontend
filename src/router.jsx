import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

import { lazy } from "react";
import JobPostStepContainer from "./components/common/JobPostForm/JobPostStepContainer";
import DeveloperRegisterForm from "./pages/websiteRegisterForm/developer/DeveloperRegisterForm";
import RolesPermission from "./pages/admin/RolesPermissions";
import InterviewListing from "./pages/admin/InterviewListing";
import InterviewDetail from "./pages/admin/InterviewDetail";
import VendorRegisterForm from "./pages/websiteRegisterForm/vendor/VendorRegisterForm";
import MeetingDetail from "./pages/MeetingDetail";
import InterviewFeedback from "./pages/admin/InterviewFeedback";
import ProjectHistory from "./pages/developer/ProjectHistory";
import ProjectDetail from "./pages/developer/ProjectDetail";
import AdminJobPost from "./pages/admin/AdminJobPost";
import joiningVideo from "./pages/admin/JoiningVideo";
import Customization from "./pages/admin/Configuration/CRM/Customization";
import DeveloperJobListing from "./pages/developer/DeveloperJobListing";
import DeveloperSingleJob from "./pages/developer/DeveloperSingleJob";
import ClientInterviewDetail from "./pages/views/InterviewDetail";
import ClientInterviewFeedback from "./pages/views/InterviewFeedback";
import VendorTimeDetail from "./pages/vendor/SingleTimeDetail";import CreateMessageTemplate from "./pages/admin/Configuration/MessageTemplate/CreateMessageTemplate";

import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
const ClientRegisterForm = lazy(() =>
  import("./pages/websiteRegisterForm/client/ClientRegisterForm")
);
;

// const ClientRegisterForm = lazy(()=> import("./pages/websiteRegisterForm/client/ClientRegisterForm") );
const VendorSingleDeveloper = lazy(() =>
  import("./pages/vendor/VendorSingleDeveloper")
);
const VendorDashboard = lazy(() => import("./pages/vendor/Dashboard"));
const ProfileUpdationRequest = lazy(() =>
  import("./pages/admin/ProfileUpdationRequest")
);
const DeveloperUpdatedCV = lazy(() =>
  import("./pages/developer/DeveloperUpdatedCV")
);
const NotificationDeveloper = lazy(() =>
  import("./pages/developer/NotificationScreen")
);
const DeveloperInvoice = lazy(() =>
  import("./pages/developer/DeveloperInvoice")
);
const DeveloperLeaveApply = lazy(() => import("./pages/developer/PlanLeave"));
const Faq = lazy(() => import("./pages/views/Faq"));
const ContactSupport = lazy(() => import("./pages/views/ContactSupport"));
const JobPost = lazy(() => import("./pages/views/JobPost"));
const JobListing = lazy(() => import("./pages/views/JobListing"));
const NotificationClient = lazy(() =>
  import("./pages/views/NotificationClient")
);
const SingleJob = lazy(() => import("./pages/views/SingleJob"));
const ClientSingleDeveloper = lazy(() =>
  import("./pages/views/ClientSingleDeveloper")
);

const VendorDocuments = lazy(() => import("./pages/vendor/VendorDocuments"));
const VendorRevenue = lazy(() => import("./pages/vendor/VendorRevenue"));
const VendorUploadInvoice = lazy(() => import("./pages/vendor/VendorInvoice"));
const VendorTimeReporting = lazy(() => import("./pages/vendor/TimeReporting"));
const EditVendorProfile = lazy(() => import("./pages/vendor/EditProfile"));
const RentedDevelopers = lazy(() => import("./pages/vendor/RentedDevelopers"));
const AllDeveloperList = lazy(() => import("./pages/vendor/ListAllDeveloper"));
const RegisterDeveloper = lazy(() =>
  import("./pages/vendor/RegisterDeveloper")
);
const NotificationVendor = lazy(() =>
  import("./pages/vendor/NotificationVendor")
);
const AdminSingleDeveloper = lazy(() =>
  import("./pages/admin/AdminSingleDeveloper")
);
const AccountDeletionRequest = lazy(() =>
  import("./pages/admin/AccountDeletionRequest")
);
const Members = lazy(() => import("./pages/admin/Members"));
const TimeReportingDetail = lazy(() =>
  import("./pages/admin/SingleTimeReporting")
);
const NotificationAdmin = lazy(() => import("./pages/admin/NotificationAdmin"));
const AdminSingleJob = lazy(() => import("./pages/admin/AdminSingleJob"));
const AdminJobListing = lazy(() => import("./pages/admin/AdminJobListing"));
const SingleClient = lazy(() =>
  import("./components/common/SingleClient/SingleClient")
);
const Applications = lazy(() => import("./pages/admin/Applications"));

const Login = lazy(() => import("./pages/Authentication/Login"));
const Dashboard = lazy(() => import("./pages/views/Dashboard"));
const HiredDevelopers = lazy(() => import("./pages/views/HiredDevelopers"));
const EditProfile = lazy(() => import("./pages/views/EditProfile"));
const Documents = lazy(() => import("./pages/views/Documents"));
const TimeReporting = lazy(() => import("./pages/views/TimeReporting"));
const EarnedBack = lazy(() => import("./pages/views/EarnedBack"));
const LeaveRequest = lazy(() => import("./pages/views/LeaveRequests"));
const Invoice = lazy(() => import("./pages/views/Invoice"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const DeveloperList = lazy(() => import("./pages/admin/DeveloperList"));
const ListClient = lazy(() => import("./pages/admin/ListClient"));
const EditAdminProfile = lazy(() => import("./pages/admin/EditAdminProfile"));
const AdminDocuments = lazy(() => import("./pages/admin/AdminDocuments"));
const AdminTimeReporting = lazy(() =>
  import("./pages/admin/AdminTimeReporting")
);
const AdminInvoice = lazy(() => import("./pages/admin/AdminInvoice"));
const Revenue = lazy(() => import("./pages/admin/Revenue"));
const DeveloperDashboard = lazy(() =>
  import("./pages/developer/DeveloperDashboard")
);

const EditDeveloperProfile = lazy(() =>
  import("./pages/developer/DeveloperEditProfile")
);
const DeveloperDocuments = lazy(() =>
  import("./pages/developer/DeveloperDocuments")
);
const DeveloperTimeReporting = lazy(() =>
  import("./pages/developer/DeveloperTimeReporting")
);
const DeveloperCV = lazy(() => import("./pages/developer/DeveloperCV"));
const AdminLogin = lazy(() => import("./pages/Authentication/AdminLogin"));
const DeveloperLogin = lazy(() =>
  import("./pages/Authentication/DeveloperLogin")
);
const ClientLogin = lazy(() => import("./pages/Authentication/Login"));
const VendorLogin = lazy(() => import("./pages/Authentication/VendorLogin"));
const Otp = lazy(() => import("./pages/Authentication/Otp"));


export const route = [
  {
    path: "/client-registration",
    element: <ClientRegisterForm />,
    public: true,
  },
  {
    path: "/developer-registration",
    element: <DeveloperRegisterForm />,
    public: true,
  },
  {
    path: "/vendor-registration",
    element: <VendorRegisterForm />,
    public: true,
  },
  {
    path: "/otp",
    element: <Otp />,
    public: true,
  },
  {
    path: "/",
    element: <ClientLogin />,
    public: true,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
    public: true,
  },
  {
    path: "/developer-login",
    element: <DeveloperLogin />,
    public: true,
  },
  {
    path: "/vendor-login",
    element: <VendorLogin />,
    public: true,
  },

  {
    path: "/developer-faq",
    element: <Faq />,
    private: true,
    isClient: true,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>,
    public: true,
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>,
    public: true,
  },


  // <------------------------------------------------------------------------------! Client Flow !-----------------------------------------------------------------------------?
  {
    path: "/client/dashboard",
    element: <Dashboard />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/hired-developers",
    element: <HiredDevelopers />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/edit-profile",
    element: <EditProfile />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/documents",
    element: <Documents />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/time-reporting",
    element: <TimeReporting />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/earned-back",
    element: <EarnedBack />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/invoice",
    element: <Invoice />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/time-reporting",
    element: <TimeReporting />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/contact-support",
    element: <ContactSupport />,
    private: true,
    isClient: true,
  },

  {
    path: "/faq",
    element: <Faq />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/leave-request",
    element: <LeaveRequest />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/job-posted",
    element: <JobListing />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/job-post",
    element: <JobPost />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/job-edit-post/:id",
    element: <JobPost />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/single-job/:id",
    element: <SingleJob />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/notification-client",
    element: <NotificationClient />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/client-single-developer/:id",
    element: <ClientSingleDeveloper />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/interview-feedback",
    element: <ClientInterviewFeedback />,
    private: true,
    isClient: true,
  },
  {
    path: "/client/interview-detail",
    element: <ClientInterviewDetail />,
    private: true,
    isClient: true,
  },

  // <------------------------------------------------------------------------------! Client Flow !-----------------------------------------------------------------------------?

  // <------------------------------------------------------------------------------! Developer Flow !-----------------------------------------------------------------------------?
  {
    path: "/profile-updation-request",
    element: <ProfileUpdationRequest />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/dashboard",
    element: <DeveloperDashboard />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/edit-developer-profile",
    element: <EditDeveloperProfile />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/developer-documents",
    element: <DeveloperDocuments />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/developer-time-reporting",
    element: <DeveloperTimeReporting />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/developer-updated-cv",
    element: <DeveloperUpdatedCV />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/developer-cv",
    element: <DeveloperCV />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/notification-developer",
    element: <NotificationDeveloper />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/developer-invoice",
    element: <DeveloperInvoice />,
    isDeveloper: true,
    private: true,
  },

  {
    path: "developer/leave-plan",
    element: <DeveloperLeaveApply />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/project-history",
    element: <ProjectHistory />,
    isDeveloper: true,
    private: true,
  },
  {
    // add a appropriate name instead of projectid if needed
    path: "developer/project-detail/:projectId",
    element: <ProjectDetail />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/job-posted",
    element: <DeveloperJobListing />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "developer/developer-single-job/:id",
    element: <DeveloperSingleJob />,
    isDeveloper: true,
    private: true,
  },

  // <------------------------------------------------------------------------------! Developer Flow !-----------------------------------------------------------------------------?

  // <------------------------------------------------------------------------------! Vendor Flow !-----------------------------------------------------------------------------?
  {
    path: "/vendor-single-developer/:id",
    element: <VendorSingleDeveloper />,
    isVendor: true,
    private: true,
  },
  {
    path: "/vendor-dashboard",
    element: <VendorDashboard />,
    isVendor: true,
    private: true,
  },
  {
    path: "/vendor-documents",
    element: <VendorDocuments />,
    isVendor: true,
    private: true,
  },
  {
    path: "/vendor-revenue",
    element: <VendorRevenue />,
    isVendor: true,
    private: true,
  },
  {
    path: "/vendor-upload-invoice",
    element: <VendorUploadInvoice />,
    isVendor: true,
    private: true,
  },
  {
    path: "/vendor-time-reporting",
    element: <VendorTimeReporting />,
    isVendor: true,
    private: true,
  },
  {
    path: "/edit-vendor-profile",
    element: <EditVendorProfile />,
    isVendor: true,
    private: true,
  },
  {
    path: "/list-all-developers",
    element: <AllDeveloperList />,
    isVendor: true,
    private: true,
  },
  {
    path: "/all-rented-developers",
    element: <RentedDevelopers />,
    isVendor: true,
    private: true,
  },
  {
    path: "/notification-vendor",
    element: <NotificationVendor />,
    isVendor: true,
    private: true,
  },
  {
    path: "/register-developer",
    element: <RegisterDeveloper />,
    isVendor: true,
    private: true,
  },
  {
    path: "/vendor-faq",
    element: <Faq />,
    isVendor: true,
    private: true,
  },
  {
    path: "/vendor-time-detail",
    element: <VendorTimeDetail />,
    isVendor: true,
    private: true,
  },
  // <------------------------------------------------------------------------------! Vendor Flow !-----------------------------------------------------------------------------?

  // <------------------------------------------------------------------------------! Admin Flow !-----------------------------------------------------------------------------?
  {
    path: "/admin/admin-dashboard",
    element: <AdminDashboard />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/developer-list",
    element: <DeveloperList />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/list-clients",
    element: <AdminDashboard />,
    isAdmin: true,
    private: true,
  },
  // {
  //   path: "/admin/edit-admin-profile",
  //   element: <EditAdminProfile />,
  //   isAdmin: true,
  //   private: true,
  // },
  {
    path: "/admin/job-post",
    element: <AdminJobPost />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/admin-documents",
    element: <AdminDocuments />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/admin-time-reporting",
    element: <AdminTimeReporting />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/revenue",
    element: <Revenue />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/account-deletion-request",
    element: <AccountDeletionRequest />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/admin-invoice",
    // element: <AdminInvoice />,
    element: <Revenue />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin-single-developer/:id",
    element: <AdminSingleDeveloper />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin-time-reporting-detail/:clientId",
    element: <TimeReportingDetail />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/members",
    element: <Members />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/admin-job-listing",
    element: <AdminJobListing />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin-single-job/:id",
    element: <AdminSingleJob />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/notification-admin",
    element: <NotificationAdmin />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/applications",
    element: <Applications />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin-single-client/:id",
    element: <SingleClient />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin-faq",
    element: <Faq />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/customization",
    element: <Customization />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/roles-permissions",
    element: <RolesPermission />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/interviews",
    element: <InterviewListing />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/interview-detail",
    element: <InterviewDetail />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/meeting-detail",
    element: <MeetingDetail />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/interview-feedback",
    element: <InterviewFeedback />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin/create-message-template",
    element: <CreateMessageTemplate />,
    isAdmin: true,
    private: true,
  },
  // <------------------------------------------------------------------------------! Admin Flow !-----------------------------------------------------------------------------?
];
