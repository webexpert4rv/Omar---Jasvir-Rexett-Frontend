import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-calendar/dist/Calendar.css'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Fragment, Suspense, lazy } from "react"; 
import { route } from './router';
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import ScreenLoader from './components/atomic/ScreenLoader';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import NotFound from './pages/views/NotFound';
import JoiningVideo from './pages/admin/JoiningVideo';
import VideoCallScreen from './pages/admin/videoCall';
import UnregisteredForm from './pages/admin/UnregisteredForm';
import ScreeningDetails from './pages/admin/StepForm/ScreeningDetails';
import ThankYou from './pages/admin/StepForm/ThankYou';
import ResumeStep1 from './pages/admin/ResumeSteps/ResumeStep1';
import ResumeStep2 from './pages/admin/ResumeSteps/ResumeStep2';
import ResumeStep2a from './pages/admin/ResumeSteps/ResumeStep2a';
import WorkSummary from './pages/admin/ResumeSteps/WorkSummary';
import DescribeWork from './pages/admin/ResumeSteps/DescribeWork';
import AddSkills from './pages/admin/ResumeSteps/AddSkills';
import AddSummary from './pages/admin/ResumeSteps/AddSummary';
import EducationPreview from './pages/admin/ResumeSteps/EducationPreview';
import AddEducation from './pages/admin/ResumeSteps/AddEducation';
import EducationSummary from './pages/admin/ResumeSteps/EducationSummary';
import AddProjects from './pages/admin/ResumeSteps/AddProjects';
import ProjectSummary from './pages/admin/ResumeSteps/ProjectSummary';
import FinalizeResume from './pages/admin/ResumeSteps/FinalizeResume';
import ClientPersonal from './pages/admin/ClientRegister/PersonalDetails';
import ClientEngagement from './pages/admin/ClientRegister/Engagement';
import ClientEngagementLength from './pages/admin/ClientRegister/EngagementLength';
import TeamStart from './pages/admin/ClientRegister/TeamStart';
import ClientAvailability from './pages/admin/ClientRegister/AvailabilityClient';
import ClientSkillNeed from './pages/admin/ClientRegister/SkillsetNeed';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);
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

       <Suspense fallback={<ScreenLoader />}>
       <Router>
        <Routes>
          {route.map((item, index) =>
            item.private ? (
              <Fragment key={index}>
                {item.isClient ? (
                  <Route key={index} element={<PrivateLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                ) : item.isDeveloper ? (
                  <Route key={index} element={<PrivateLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                ) : item.isVendor ? (
                  <Route key={index} element={<PrivateLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                ) : item.isAdmin ? (
                  <Route key={index} element={<PrivateLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                ) : (
                 ""
                )}
              </Fragment>
            ) : item.public && (
              <Route key={index} element={<PublicLayout />}>
                <Route path={item.path} element={item.element} />
              </Route>
            ) 
          )}
             <Route path="*" element={<NotFound />} />
             <Route path="/join-meeting" element={<JoiningVideo />} />
             <Route path="/video-screen" element={<VideoCallScreen />} />
             <Route path="/apply-job" element={<UnregisteredForm />} />
             <Route path="/screening-details" element={<ScreeningDetails />} />
             <Route path="/thank-you" element={<ThankYou />} />
             <Route path="/resume-detail" element={<ResumeStep1 />} />
             <Route path="/resume-work-detail" element={<ResumeStep2 />} />
             <Route path="/resume-work-history" element={<ResumeStep2a />} />
             <Route path="/work-summary" element={<WorkSummary />} />
             <Route path="/describe-work" element={<DescribeWork />} />
             <Route path="/add-skills" element={<AddSkills />} />
             <Route path="/add-summary" element={<AddSummary />} />
             <Route path="/education-preview" element={<EducationPreview />} />
             <Route path="/add-education" element={<AddEducation />} />
             <Route path="/education-summary" element={<EducationSummary />} />
             <Route path="/add-projects" element={<AddProjects />} />
             <Route path="/project-summary" element={<ProjectSummary />} />
             <Route path="/finalize-resume" element={<FinalizeResume />} />
             <Route path="/client-personal" element={<ClientPersonal />} />
             <Route path="/client-engagement" element={<ClientEngagement />} />
             <Route path="/client-engagement-length" element={<ClientEngagementLength />} />
             <Route path="/client-team-start" element={<TeamStart />} />
             <Route path="/client-availability" element={<ClientAvailability />} />
             <Route path="/client-skill-need" element={<ClientSkillNeed />} />
        </Routes>
        </Router>
      </Suspense>
     
    
    </>
  );
}

export default App;
