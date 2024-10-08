import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-calendar/dist/Calendar.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Fragment, Suspense, lazy } from "react";
import { route } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScreenLoader from "./components/atomic/ScreenLoader";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import NotFound from "./pages/views/NotFound";
import JoiningVideo from "./pages/admin/JoiningVideo";
import VideoCallScreen from "./pages/admin/videoCall";
import UnregisteredForm from "./pages/admin/UnregisteredForm";
import ScreeningDetails from "./pages/admin/StepForm/ScreeningDetails";
import ThankYou from "./pages/admin/StepForm/ThankYou";
import ResumeStep1 from "./pages/admin/ResumeSteps/ResumeStep1";
import ResumeStep2 from "./pages/admin/ResumeSteps/ResumeStep2";
import ResumeStep2a from "./pages/admin/ResumeSteps/ResumeStep2a";
import WorkSummary from "./pages/admin/ResumeSteps/WorkSummary";
import DescribeWork from "./pages/admin/ResumeSteps/DescribeWork";
import AddSkills from "./pages/admin/ResumeSteps/AddSkills";
import AddSummary from "./pages/admin/ResumeSteps/AddSummary";
import EducationPreview from "./pages/admin/ResumeSteps/EducationPreview";
import AddEducation from "./pages/admin/ResumeSteps/AddEducation";
import EducationSummary from "./pages/admin/ResumeSteps/EducationSummary";
import AddProjects from "./pages/admin/ResumeSteps/AddProjects";
import ProjectSummary from "./pages/admin/ResumeSteps/ProjectSummary";
import FinalizeResume from "./pages/admin/ResumeSteps/FinalizeResume";
import ClientPersonal from "./pages/admin/ClientRegister/PersonalDetails";
import JobInfo from "./pages/admin/ClientRegister/JobInfo";
import JobDescription from "./pages/admin/ClientRegister/JobDescription";
import ScreeningInfo from "./pages/admin/ClientRegister/ScreeningInfo";
import VendorPersonal from "./pages/admin/VendorRegister/VendorPersonal";
import DecisionMakers from "./pages/admin/VendorRegister/DecisionMakers";
import CompanyInfo from "./pages/admin/VendorRegister/CompanyInfo";
import AreaExpertise from "./pages/admin/VendorRegister/AreaExpertise";
import EducationSelect from "./pages/admin/ResumeSteps/EducationSelect";
import SummaryPreview from "./pages/admin/ResumeSteps/SummaryPreview";
import SkillPreview from "./pages/admin/ResumeSteps/SkillsPreview";
import GoodHaveSkills from "./pages/admin/ResumeSteps/GoodSkills";
import ClientStep1 from "./pages/admin/ClientRegister/ClientStep1";
import ClientIndividual from "./pages/admin/ClientRegister/ClientIndividual";
import CommonLayout from "./layout/Commonlayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
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
              ) : item.common ? (
                <Route key={index} element={<CommonLayout />}>
                  <Route path={item.path} element={item.element} />
                </Route>
              ) : (
                item.public && (
                  <Route key={index} element={<PublicLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                )
              )
            )}
            <Route path="*" element={<NotFound />} />
            <Route path="/join-meeting" element={<JoiningVideo />} />
            <Route path="/video-screen" element={<VideoCallScreen />} />
            <Route path="/apply-job" element={<UnregisteredForm />} />
            <Route path="/screening-details" element={<ScreeningDetails />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {/* Dev Register */}
            <Route path="/resume-detail" element={<ResumeStep1 />} />
            <Route path="/resume-work-detail" element={<ResumeStep2 />} />
            <Route path="/resume-work-history" element={<ResumeStep2a />} />
            <Route path="/work-summary" element={<WorkSummary />} />
            <Route path="/describe-work" element={<DescribeWork />} />
            <Route path="/add-skills" element={<AddSkills />} />
            <Route path="/add-summary" element={<AddSummary />} />
            <Route path="/education-preview" element={<EducationPreview />} />
            <Route path="/add-education" element={<AddEducation />} />
            <Route path="/education-select" element={<EducationSelect />} />
            <Route path="/education-summary" element={<EducationSummary />} />
            <Route path="/add-projects" element={<AddProjects />} />
            <Route path="/project-summary" element={<ProjectSummary />} />
            <Route path="/finalize-resume" element={<FinalizeResume />} />
            <Route path="/summary-preview" element={<SummaryPreview />} />
            <Route path="/skill-preview" element={<SkillPreview />} />
            <Route path="/good-have-skills" element={<GoodHaveSkills />} />
            {/* Client Register */}
            <Route path="/client-personal" element={<ClientPersonal />} />
            <Route path="/job-info" element={<JobInfo />} />
            <Route path="/job-description" element={<JobDescription />} />
            <Route path="/screening-info" element={<ScreeningInfo />} />
            <Route path="/client-register" element={<ClientStep1 />} />
            <Route path="/client-individual" element={<ClientIndividual />} />
            {/* Vendor Register */}
            <Route path="/vendor-personal" element={<VendorPersonal />} />
            <Route path="/desicion-makers" element={<DecisionMakers />} />
            <Route path="/company-info" element={<CompanyInfo />} />
            <Route path="/area-expertise" element={<AreaExpertise />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
