import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'
import { ArcElement, Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import DashboardLayout from './pages/DashboardLayout';
import AdminDashboardLayout from './pages/AdminDashboardLayout';
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
import DeveloperDashboardLayout from './pages/DeveloperDashboardLayout';
import EditDeveloperProfile from './pages/developer/DeveloperEditProfile';
import DeveloperDocuments from './pages/developer/DeveloperDocuments';
import DeveloperTimeReporting from './pages/developer/DeveloperTimeReporting';
import DeveloperCV from './pages/developer/DeveloperCV';
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>} />
          
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
