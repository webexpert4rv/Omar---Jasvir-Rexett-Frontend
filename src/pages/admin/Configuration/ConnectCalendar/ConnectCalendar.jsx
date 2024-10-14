import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link } from "react-router-dom";
import { gapi } from 'gapi-script';
import { msalInstance } from "../../../../services/msalConfig";
import { DISCOVERY_DOCS, SCOPES } from "../../../../helper/utlis";

const ConnectCalendar = ({ currentTab }) => {

  const CLIENT_ID = '982505282330-ei63qgf2b0b0djm6dfkdapnpcl7oc8en.apps.googleusercontent.com';


  const [isAuthenticated, setIsAuthenticated] = useState(false);


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

  console.log(isAuthenticated, "isAuthenticated")
  const handleLoginSuccess = (response) => {
    console.log('Login success:', response);
    setIsAuthenticated(true);
  };

  const handleLoginFailure = (response) => {
    console.error('Login failed:', response);
    setIsAuthenticated(false);
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

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log('User signed out.');
      setIsAuthenticated(false);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <>

      <div>
        {currentTab === "six" &&
          <><div className="mb-4">
            <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
              <h2 className="section-head-sub mb-0 border-0">
                Connect with calendar
              </h2>
            </div>
            <p className="font-14">Stay up to date with events and appointments by connecting your calendar with services like Microsoft Outlook and Google Calendar. These platforms offer seamless integration, ensuring you never miss a scheduled activity.</p>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </GoogleOAuthProvider>
            <Button
              variant="outline-primary"
              className="mt-2"
              onClick={handleMicrosoftLogin}
            >
              Login with Microsoft
            </Button>
          </div><div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
              <h2 className="section-head-sub mb-0 border-0">
                SMTP Configuration
              </h2>
            </div><Row>
              <Col md={6} className="mb-3">
                <Form.Label className="font-14 fw-medium">SMTP Username</Form.Label>
                <Form.Control type="text" className="common-field font-14" />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="font-14 fw-medium">SMTP From Email</Form.Label>
                <Form.Control type="text" className="common-field font-14" />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="font-14 fw-medium">SMTP Email Password</Form.Label>
                <Form.Control type="text" className="common-field font-14" />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="font-14 fw-medium">SMTP Host Address</Form.Label>
                <Form.Control type="text" className="common-field font-14" />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="font-14 fw-medium">SMTP Port Number</Form.Label>
                <Form.Control type="text" className="common-field font-14" />
              </Col>
              <Col md={12}>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <Button variant="transparent" className="font-14 outline-main-btn">Test email</Button>
                  <Button variant="transparent" className="font-14 main-btn">Save</Button>
                </div>
              </Col>
            </Row></>
        }
      </div>
    </>
  )
}
export default ConnectCalendar;