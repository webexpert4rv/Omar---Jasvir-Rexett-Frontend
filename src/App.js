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
        </Routes>
        </Router>
      </Suspense>
     
    
    </>
  );
}

export default App;
