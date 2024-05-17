import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import {
  ArcElement,
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  elements,
} from "chart.js";
import { lazy } from "react";
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
const VendorDashboardLayout = lazy(() =>
  import("./layout/VendorDashboardLayout")
);
const VendorDocuments = lazy(() => import("./pages/vendor/VendorDocuments"));
const VendorRevenue = lazy(() => import("./pages/vendor/VendorRevenue"));
const VendorUploadInvoice = lazy(() => import("./pages/vendor/UploadInvoice"));
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
const DashboardLayout = lazy(() => import("./layout/DashboardLayout"));
const AdminDashboardLayout = lazy(() =>
  import("./layout/AdminDashboardLayout")
);
const Login = lazy(() => import("./pages/Authentication/Login"));
const Dashboard = lazy(() => import("./pages/views/Dashboard"));
const HiredDevelopers = lazy(() => import("./pages/views/HiredDevelopers"));
const EditProfile = lazy(() => import("./pages/views/EditProfile"));
const Documents = lazy(() => import("./pages/views/Documents"));
const TimeReporting = lazy(() => import("./pages/views/TimeReporting"));
const EarnedBack = lazy(() => import("./pages/views/EarnedBack"));
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
const DeveloperDashboardLayout = lazy(() =>
  import("./layout/DeveloperDashboardLayout")
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
const AgencyLogin = lazy(() => import("./pages/Authentication/AdminLogin"));
const DeveloperLogin = lazy(() =>
  import("./pages/Authentication/DeveloperLogin")
);

export const route = [
  {
    path: "/",
    element: <Login />,
    private: false,
  },
  {
    path: "/agency-login",
    element: <AgencyLogin />,
    private: false,
  },

  // <------------------------------------------------------------------------------! Client Flow !-----------------------------------------------------------------------------?
  {
    path: "/dashboard",
    element: <Dashboard />,
    private: true,
    isClient: true,
  },
  {
    path: "/hired-developers",
    element: <HiredDevelopers />,
    private: true,
    isClient: true,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
    private: true,
    isClient: true,
  },
  {
    path: "/documents",
    element: <Documents />,
    private: true,
    isClient: true,
  },
  {
    path: "/time-reporting",
    element: <TimeReporting />,
    private: true,
    isClient: true,
  },
  {
    path: "/earned-back",
    element: <EarnedBack />,
    private: true,
    isClient: true,
  },
  {
    path: "/invoice",
    element: <Invoice />,
    private: true,
    isClient: true,
  },
  {
    path: "/time-reporting",
    element: <TimeReporting />,
    private: true,
    isClient: true,
  },
  {
    path: "/contact-support",
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
    path: "/job-posted",
    element: <JobListing />,
    private: true,
    isClient: true,
  },
  {
    path: "/job-edit-post/:id",
    element: <JobPost />,
    private: true,
    isClient: true,
  },
  {
    path: "/single-job/:id",
    element: <SingleJob />,
    private: true,
    isClient: true,
  },
  {
    path: "/notification-client",
    element: <NotificationClient />,
    private: true,
    isClient: true,
  },
  {
    path: "/client-single-developer/:id",
    element: <ClientSingleDeveloper />,
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
    path: "/developer-dashboard",
    element: <DeveloperDashboard />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/edit-developer-profile",
    element: <EditDeveloperProfile />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/developer-documents",
    element: <DeveloperDocuments />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/developer-time-reporting",
    element: <DeveloperTimeReporting />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/developer-updated-cv",
    element: <DeveloperUpdatedCV />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/developer-cv",
    element: <DeveloperCV />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/notification-developer",
    element: <NotificationDeveloper />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/developer-invoice",
    element: <DeveloperInvoice />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/developer-invoice",
    element: <DeveloperInvoice />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/developer-invoice",
    element: <DeveloperInvoice />,
    isDeveloper: true,
    private: true,
  },
  {
    path: "/developer-invoice",
    element: <DeveloperInvoice />,
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
  // <------------------------------------------------------------------------------! Vendor Flow !-----------------------------------------------------------------------------?

  // <------------------------------------------------------------------------------! Admin Flow !-----------------------------------------------------------------------------?
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/developer-list",
    element: <DeveloperList />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/list-clients",
    element: <AdminDashboard />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/edit-admin-profile",
    element: <EditAdminProfile />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin-documents",
    element: <AdminDocuments />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin-time-reporting",
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
    path: "/admin-invoice",
    element: <AdminInvoice />,
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
    path: "/time-reporting-detail",
    element: <TimeReportingDetail />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/members",
    element: <Members />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/admin-job-listing",
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
    path: "/notification-admin",
    element: <NotificationAdmin />,
    isAdmin: true,
    private: true,
  },
  {
    path: "/applications",
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
  // <------------------------------------------------------------------------------! Admin Flow !-----------------------------------------------------------------------------?

];
