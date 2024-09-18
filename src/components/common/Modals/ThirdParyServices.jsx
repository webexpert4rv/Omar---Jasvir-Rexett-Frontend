import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RexettSpinner from "../../atomic/RexettSpinner";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import { DISCOVERY_DOCS, SCOPES } from "../../../helper/utlis";
const ThirdPartyServices = ({ show, handleClose,onClick,smallLoader,text,syncCreatedMeetingsWithGoogle,meetingLink}) => {

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  const API_KEY = 'AIzaSyCvwWpOjYlFNn8h77VjMJn_1il2fEPTRJY';
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let authentication=localStorage.getItem("authentication")



    useEffect(() => {
        function start() {
          gapi.client.init({
            apiKey: process.env.REACT_APP_API_KEY,
            clientId: process.env.REACT_APP_CLIENT_ID,
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