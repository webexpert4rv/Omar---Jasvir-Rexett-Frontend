import React,{useEffect,useState} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { gapi } from 'gapi-script';

const ConnectCalendar = ({ currentTab }) => {
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const CLIENT_ID = "233781998008-qnnfc8310usfc8q0co9fvf4i40d98spe.apps.googleusercontent.com";
const API_KEY = 'AIzaSyAAD4NQiqnIRytiJw5ekZRomS1FcYMT8ik';
const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        localStorage.setItem("authentication",authInstance.isSignedIn.get())
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
                        <Link to={'#'} className="main-btn font-14 text-decoration-none mb-2">Connect with calendar</Link>
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText="Login with Google"
                            onSuccess={handleLoginSuccess}
                            onFailure={handleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                        <div className="d-flex align-items-center gap-2">
                            <Button variant="transparent" className="main-btn font-14" disabled>Connected with google</Button>
                            <Button variant="transparent" className="cancel-btn font-14">Disconnect</Button>
                        </div>
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