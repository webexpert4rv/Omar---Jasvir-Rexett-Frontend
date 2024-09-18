import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RexettSpinner from "../../atomic/RexettSpinner";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
const ThirdPartyServices = ({ show, handleClose,onClick,smallLoader,text,syncCreatedMeetingsWithGoogle,meetingLink}) => {

  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    "https://www.googleapis.com/discovery/v1/apis/admin/reports_v1/rest"
  ];
  
  const SCOPES = [
    "https://www.googleapis.com/auth/admin.reports.usage.readonly",
    "https://www.googleapis.com/auth/calendar.events"
  ];
  
  const CLIENT_ID = "904487780052-sjeu9i0nd8r72hnv7gsu4blh9r5gdera.apps.googleusercontent.com";

  const API_KEY = 'AIzaSyAPGrNKe2qX_5votGfs57_N1QCEpiqPkB0';
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let authentication=localStorage.getItem("authentication")



    useEffect(() => {
        function start() {
          gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          }).then(() => {
            console.log('GAPI Initialized');
            const authInstance = gapi.auth2.getAuthInstance();
            authInstance.isSignedIn.listen(setIsAuthenticated);
            setIsAuthenticated(authInstance.isSignedIn.get());
          }).catch((error) => {
            console.error('Error initializing GAPI:', error);
          });
        }
        gapi.load('client:auth2', start);
      }, []);
    
    console.log(isAuthenticated,"isAuthenticated")
    const handleLoginSuccess = (response) => {
        console.log('Login success:', response);
        setIsAuthenticated(true);
      };
    
      const handleLoginFailure = (response) => {
        console.error('Login failed:', response);
        setIsAuthenticated(false);
      };
      

    return(
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">{text}</h3>
               {meetingLink==null || authentication==false ? <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText="Login with Google"
                            onSuccess={handleLoginSuccess}
                            onFailure={handleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                   : <p>Meeting Link :{meetingLink}</p>
                    }
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold" onClick={syncCreatedMeetingsWithGoogle}>{meetingLink ==null ? smallLoader?<RexettSpinner/>:"Get Link" : "Submit"}  </Button>
                    </div>
            </Modal.Body>
        </Modal>
    )
}
export default ThirdPartyServices;