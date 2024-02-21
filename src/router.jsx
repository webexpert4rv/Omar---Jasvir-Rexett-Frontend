import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'
import { ArcElement, Chart, CategoryScale, LinearScale, BarElement } from  'chart.js';
import { lazy } from "react";
const DashboardLayout = lazy(()=>import( './layout/DashboardLayout'));
const AdminDashboardLayout = lazy(()=>import('./layout/AdminDashboardLayout'));
const Login = lazy(()=>import('./pages/Authentication/Login'));
const Dashboard = lazy(()=>import('./pages/views/Dashboard'));
const HiredDevelopers = lazy(()=>import('./pages/views/HiredDevelopers'));
const EditProfile =  lazy(()=>import('./pages/views/EditProfile'));
const Documents = lazy(()=>import('./pages/views/Documents'));
const TimeReporting =  lazy(()=>import('./pages/views/TimeReporting'));
const EarnedBack = lazy(()=>import('./pages/views/EarnedBack'));
const Invoice = lazy(()=>import('./pages/views/Invoice'));
const AdminDashboard = lazy(()=>import('./pages/admin/Dashboard'));
const DeveloperList = lazy(()=>import('./pages/admin/DeveloperList'));
const ListClient = lazy(()=>import('./pages/admin/ListClient'));
const EditAdminProfile = lazy(()=>import('./pages/admin/EditAdminProfile'));
const AdminDocuments = lazy(()=>import('./pages/admin/AdminDocuments'));
const AdminTimeReporting =  lazy(()=>import('./pages/admin/AdminTimeReporting'));
const AdminInvoice = lazy(()=>import('./pages/admin/AdminInvoice'));
const Revenue =  lazy(()=>import('./pages/admin/Revenue'));
const DeveloperDashboard = lazy(()=>import('./pages/developer/DeveloperDashboard'));
const DeveloperDashboardLayout = lazy(()=>import('./layout/DeveloperDashboardLayout'));
const EditDeveloperProfile = lazy(()=>import('./pages/developer/DeveloperEditProfile'));
const DeveloperDocuments = lazy(()=>import('./pages/developer/DeveloperDocuments'));
const DeveloperTimeReporting = lazy(()=>import('./pages/developer/DeveloperTimeReporting'));
const DeveloperCV = lazy(()=>import('./pages/developer/DeveloperCV'));
const AgencyLogin = lazy(()=>import('./pages/Authentication/AdminLogin'));
const DeveloperLogin = lazy(()=>import('./pages/Authentication/DeveloperLogin'));



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
  
    {
      path: "/developer-login",
      element: <DeveloperLogin />,
      private: false,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      private: false,
    },
  
  
    {
      path: "/hired-developers",
      element: < HiredDevelopers/>,
      private: false,
    },
    {
      path: "/edit-profile",
      element: <Documents />,
      private: false,
    },
    {
      path: "/time-reporting",
      element: <TimeReporting />,
      private: true,
    },
    {
      path: "/earned-back",
      element: <EarnedBack />,
      private: true,
    },
    {
      path: "/invoice",
      element: <Invoice />,
      private: true,
    },
  
    {
      path: "/admin-dashboard",
      element: <AdminDashboard />,
      private: true,
    },
    {
      path: "/developer-list",
      element: <DeveloperList />,
      private: true,
    },
    {
      path: "/list-clients",
      element: <ListClient />,
      private: false,
    },
    {
      path: "/edit-admin-profile",
      element: <EditAdminProfile />,
      private: false,
    },
    {
      path: "/admin-documents",
      element: <AdminDocuments />,
      private: false,
    },
    {
      path: "/admin-time-reporting",
      element: <AdminTimeReporting />,
      private: false,
    },
    {
      path: "/revenue",
      element: <Revenue />,
      private: false,
    },
    {
      path: "/admin-invoice",
      element: <AdminInvoice />,
      private: false,
    },
    {
      path: "/developer-dashboard",
      element: <DeveloperDashboard />,
      private: false,
    },
    {
      path: "/edit-developer-profile",
      element: <EditDeveloperProfile />,
      private: false,
    },
    {
      path: "/developer-documents",
      element: <DeveloperDocuments />,
      private: false,
    },
   
    {
      path: "/developer-time-reporting",
      element: <DeveloperTimeReporting />,
      private: false,
    },
   
    {
      path: "/developer-cv",
      element: <DeveloperCV />,
      private: false,
    },
   
  ];