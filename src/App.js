import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'
import { ArcElement, Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Suspense, lazy } from "react"; 
import DashboardLayout from '../src/layout/DashboardLayout';
import AdminDashboardLayout from '../src/layout/AdminDashboardLayout';
import Login from './pages/Authentication/Login';
import Dashboard from './pages/views/Dashboard';
import HiredDevelopers from './pages/views/HiredDevelopers';
import EditProfile from './pages/views/EditProfile';
import Documents from './pages/views/Documents';
import TimeReporting from './pages/views/TimeReporting';
import EarnedBack from './pages/views/EarnedBack';
import Invoice from './pages/views/Invoice';
import AdminDashboard from './pages/admin/Dashboard';
import DeveloperList from './pages/admin/DeveloperList';
import ListClient from './pages/admin/ListClient';
import EditAdminProfile from './pages/admin/EditAdminProfile';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminTimeReporting from './pages/admin/AdminTimeReporting';
import AdminInvoice from './pages/admin/AdminInvoice';
import Revenue from './pages/admin/Revenue';
import DeveloperDashboard from './pages/developer/DeveloperDashboard';
import DeveloperDashboardLayout from '../src/layout/DeveloperDashboardLayout';
import EditDeveloperProfile from './pages/developer/DeveloperEditProfile';
import DeveloperDocuments from './pages/developer/DeveloperDocuments';
import DeveloperTimeReporting from './pages/developer/DeveloperTimeReporting';
import DeveloperCV from './pages/developer/DeveloperCV';
import AgencyLogin from './pages/Authentication/AdminLogin';
import DeveloperLogin from './pages/Authentication/DeveloperLogin';
import { route } from './router';
import { ToastContainer } from 'react-toastify';
import PublicLayout from '../src/layout/PublicLayout';
import "react-toastify/dist/ReactToastify.css";
import DeveloperPublicLayout from './layout/DeveloperPublicLayout';
import JobPost from './pages/views/JobPost';
import JobListing from './pages/views/JobListing';
import NotificationDeveloper from './pages/developer/NotificationScreen';
import SingleJob from './pages/views/SingleJob';
import NotificationClient from './pages/views/NotificationClient';
import AdminJobListing from './pages/admin/AdminJobListing';
import AdminSingleJob from './pages/admin/AdminSingleJob';
import NotificationAdmin from './pages/admin/NotificationAdmin';
import VendorDashboardLayout from './layout/VendorDashboardLayout';
import VendorDashboard from './pages/vendor/Dashboard';
import VendorDocuments from './pages/vendor/VendorDocuments';
import VendorRevenue from './pages/vendor/VendorRevenue';
import VendorUploadInvoice from './pages/vendor/UploadInvoice';
import VendorTimeReporting from './pages/vendor/TimeReporting';
import EditVendorProfile from './pages/vendor/EditProfile';
import AllDeveloperList from './pages/vendor/ListAllDeveloper';
import RentedDevelopers from './pages/vendor/RentedDevelopers';
import NotificationVendor from './pages/vendor/NotificationVendor';
import RegisterDeveloper from './pages/vendor/RegisterDeveloper';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import Engagements from './pages/admin/Engagements';
import Applications from './pages/admin/Applications';

Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
function App() {
  return (
    <>
      <ToastContainer
        className="custom-toast-container"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route path="/" exact element={<PublicLayout><Login/></PublicLayout> } />
          <Route path="/agency-login" exact element={<AgencyLogin/>} />
          <Route path="/forgot-password" exact element={<ForgotPassword/>} />
          <Route path="/reset-password" exact element={<ResetPassword/>} />
          <Route path="/developer-login" exact element={<DeveloperPublicLayout><DeveloperLogin/></DeveloperPublicLayout> } />
          <Route path="/dashboard" exact element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/hired-developers" exact element={<DashboardLayout><HiredDevelopers /></DashboardLayout>} />
          <Route path="/edit-profile" exact element={<DashboardLayout><EditProfile /></DashboardLayout>} />
          <Route path="/documents" exact element={<DashboardLayout><Documents /></DashboardLayout>} />
          <Route path="/time-reporting" exact element={<DashboardLayout><TimeReporting /></DashboardLayout>} />
          <Route path="/earned-back" exact element={<DashboardLayout><EarnedBack /></DashboardLayout>} />
          <Route path="/invoice" exact element={<DashboardLayout><Invoice /></DashboardLayout>} />
          <Route path="/admin-dashboard" exact element={<AdminDashboardLayout><AdminDashboard /></AdminDashboardLayout>} />
          <Route path="/developer-list" exact element={<AdminDashboardLayout><DeveloperList /></AdminDashboardLayout>} />
          <Route path="/list-clients" exact element={<AdminDashboardLayout><ListClient /></AdminDashboardLayout>} />
          <Route path="/edit-admin-profile" exact element={<AdminDashboardLayout><EditAdminProfile /></AdminDashboardLayout>} />
          <Route path="/admin-documents" exact element={<AdminDashboardLayout><AdminDocuments /></AdminDashboardLayout>} />
          <Route path="/admin-time-reporting" exact element={<AdminDashboardLayout><AdminTimeReporting /></AdminDashboardLayout>} />
          <Route path="/revenue" exact element={<AdminDashboardLayout><Revenue /></AdminDashboardLayout>} />
          <Route path="/admin-invoice" exact element={<AdminDashboardLayout><AdminInvoice /></AdminDashboardLayout>} />
          <Route path="/developer-dashboard" exact element={<DeveloperDashboardLayout><DeveloperDashboard /></DeveloperDashboardLayout>} />
          <Route path="/edit-developer-profile" exact element={<DeveloperDashboardLayout><EditDeveloperProfile /></DeveloperDashboardLayout>} />
          <Route path="/developer-documents" exact element={<DeveloperDashboardLayout><DeveloperDocuments /></DeveloperDashboardLayout>} />
          <Route path="/developer-time-reporting" exact element={<DeveloperDashboardLayout><DeveloperTimeReporting /></DeveloperDashboardLayout>} />
          <Route path="/developer-cv" exact element={<DeveloperDashboardLayout><DeveloperCV /></DeveloperDashboardLayout>} />
          <Route path="/notification-developer" exact element={<DeveloperDashboardLayout><NotificationDeveloper /></DeveloperDashboardLayout>} />
          <Route path="/job-post" exact element={<DashboardLayout><JobPost /></DashboardLayout>} />
          <Route path="/job-posted" exact element={<DashboardLayout><JobListing /></DashboardLayout>} />
          <Route path="/single-job/:id" exact element={<DashboardLayout><SingleJob /></DashboardLayout>} />
          <Route path="/notification-client" exact element={<DashboardLayout><NotificationClient /></DashboardLayout>} />
          <Route path="/admin-job-listing" exact element={<AdminDashboardLayout><AdminJobListing /></AdminDashboardLayout>} />
          <Route path="/admin-single-job" exact element={<AdminDashboardLayout><AdminSingleJob /></AdminDashboardLayout>} />
          <Route path="/notification-admin" exact element={<AdminDashboardLayout><NotificationAdmin /></AdminDashboardLayout>} />
          <Route path="/engagements" exact element={<AdminDashboardLayout><Engagements /></AdminDashboardLayout>} />
          <Route path="/applications" exact element={<AdminDashboardLayout><Applications /></AdminDashboardLayout>} />
          <Route path="/vendor-dashboard" exact element={<VendorDashboardLayout><VendorDashboard /></VendorDashboardLayout>} />
          <Route path="/vendor-documents" exact element={<VendorDashboardLayout><VendorDocuments /></VendorDashboardLayout>} />
          <Route path="/vendor-revenue" exact element={<VendorDashboardLayout><VendorRevenue /></VendorDashboardLayout>} />
          <Route path="/vendor-upload-invoice" exact element={<VendorDashboardLayout><VendorUploadInvoice /></VendorDashboardLayout>} />
          <Route path="/vendor-time-reporting" exact element={<VendorDashboardLayout><VendorTimeReporting /></VendorDashboardLayout>} />
          <Route path="/edit-vendor-profile" exact element={<VendorDashboardLayout><EditVendorProfile /></VendorDashboardLayout>} />
          <Route path="/list-all-developers" exact element={<VendorDashboardLayout><AllDeveloperList /></VendorDashboardLayout>} />
          <Route path="/all-rented-developers" exact element={<VendorDashboardLayout><RentedDevelopers /></VendorDashboardLayout>} />
          <Route path="/notification-vendor" exact element={<VendorDashboardLayout><NotificationVendor /></VendorDashboardLayout>} />
          <Route path="/register-developer" exact element={<VendorDashboardLayout><RegisterDeveloper /></VendorDashboardLayout>} />
        </Routes>
      </Router>
     
      {/* <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            {route?.map((item, index) =>
              item.private ? (
                <Route key={index} element={<DashboardLayout />}>
                  <Route path={item.path} element={item.element} />
                </Route>
              ) : !item.private && item.notAccess ? (
                <Route key={index} element={<AuthLayout />}>
                  <Route path={item.path} element={item.element} />
                </Route>
              ) : item.isSuperAdmin && item.isSuperAdminPrivate ? (
                <Route key={index} element={<AdminSuperLayout />}>
                  <Route path={item.path} element={item.element} />
                </Route>
              ) : item.isSuperAdmin && !item.isSuperAdminPrivate ? (
                <Route key={index} element={<SuperAdminPublicLayout />}>
                  <Route path={item.path} element={item.element} />
                </Route>
              )
                : <Route key={index} element={<PublicLayout />}>
                  <Route path={item.path} element={item.element} />
                </Route>
            )}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Suspense> */}
    </>
  );
}

export default App;
