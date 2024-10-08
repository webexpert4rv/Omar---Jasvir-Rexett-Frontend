import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RexettSpinner from "../../atomic/RexettSpinner";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import { msalInstance } from "../../../services/msalConfig";
import { DISCOVERY_DOCS, SCOPES } from "../../../helper/utlis";
const ThirdPartyServices = ({ show, handleClose, onClick, loader, text, syncCreatedMeetingsWithGoogle, meetingLink }) => {
  console.log(text, "textqwewqeq")
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  const API_KEY = 'AIzaSyCvwWpOjYlFNn8h77VjMJn_1il2fEPTRJY';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let authentication = localStorage.getItem("authentication")


  const loginRequest = {
    scopes: [
      "User.Read",
      "Calendars.ReadWrite",
      "Calendars.Read.Shared",
      "Calendars.ReadBasic",
      "Calendars.ReadWrite",
      "Calendars.ReadWrite.Shared",
      "profile",
      "User.Read",
      "User.Read.All",
      "User.ReadWrite",
      "User.ReadWrite.All",
      "OnlineMeetings.Read",
      "profile",
      "OnlineMeetings.ReadWrite",
      "OnlineMeetingRecording.Read.All",
      "Calendars.ReadWrite",
      "Calendars.Read",
    ],

  };



  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: "AIzaSyDRb_BGMWY3XocACa_K976a0g6y-5QwkqU",
        clientId: "982505282330-ei63qgf2b0b0djm6dfkdapnpcl7oc8en.apps.googleusercontent.com",
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

  console.log(isAuthenticated, "isAuthenticated")
  const handleLoginSuccess = (response) => {
    console.log('Login success:', response);
    setIsAuthenticated(true);
  };

  const handleLoginFailure = (response) => {
    console.error('Login failed:', response);
    setIsAuthenticated(false);
  };

  const authHandler = (err, data) => {
    console.log(err, data);
  };


  const handleMicrosoftLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      console.log('Microsoft login success:', loginResponse);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Microsoft login failed:', error);
      setIsAuthenticated(false);
    }
  };



  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
      <Modal.Header closeButton className="border-0 pb-3">
      </Modal.Header>

      <Modal.Body>
        <h3 className="popup-heading">{text}</h3>
        {meetingLink == null || authentication == false ?
          text == "Link With Microsoft" ?
            <Button
              variant="outline-primary"
              className="mt-2"
              onClick={handleMicrosoftLogin}
            >
              Login with Microsoft
            </Button>
            :
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText={"Login with Google"}
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
            />
          : <p>Meeting Link :{meetingLink}</p>
        }
        <div className="text-center">
          <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold" onClick={syncCreatedMeetingsWithGoogle}>{meetingLink == null ? "" ? <RexettSpinner /> : "Get Link" : "Submit"}  </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ThirdPartyServices;