import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { BiFont } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import clientImg from '../../../assets/img/amazon.png';
import rexettLogo from '../../../assets/img/favicon.png';
import devImg from '../../../assets/img/demo-img.jpg'
import { FaRegCopy } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { meetingCancel } from "../../../redux/slices/clientDataSlice";
import RejectModal from "./RejectModal";
import { gapi } from 'gapi-script';
import { Client } from '@microsoft/microsoft-graph-client';
import { useMsal } from "@azure/msal-react";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";

const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    "https://www.googleapis.com/discovery/v1/apis/admin/reports_v1/rest"
  ];
  
  const SCOPES = [
    "https://www.googleapis.com/auth/admin.reports.usage.readonly",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar.events.readonly",
    'https://www.googleapis.com/auth/admin.reports.audit.readonly',
  ];
  
//   const CLIENT_ID = "574761927488-fo96b4voamfvignvub9oug40a9a6m48c.apps.googleusercontent.com";

//   const API_KEY = 'AIzaSyCA-pKaniZ4oeXOpk34WX5CMZ116zBvy-g';;


const MeetingInfo = ({ show, handleClose,details }) => {
    const dispatch=useDispatch()
    const { instance, accounts } = useMsal();
    const [isCancelModal,setCancelModal]=useState({
        isTrue:false,
        data:{}
    })
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {interview:{id,title,developer_name,interviewers_list,meeting_date,meeting_time,status}}=details
    const cancelMeeting=()=>{
        setCancelModal({isTrue:true})
     
    }

    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(instance, {
        account: accounts[0],
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
        prompt: "consent",
      });
      
    const onClick=(e,data)=>{
        let payload={
            "reason": data?.rejection_reason
          }
        dispatch(meetingCancel(id,payload))
    }


    useEffect(() => {
        if (accounts.length > 0) {
          setIsAuthenticated(true);
        }
      }, [accounts]);

    useEffect(() => {
        function start() {
          gapi.client.init({
            apiKey: 'AIzaSyCA-pKaniZ4oeXOpk34WX5CMZ116zBvy-g',
            clientId: '574761927488-fo96b4voamfvignvub9oug40a9a6m48c.apps.googleusercontent.com',
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          }).then(() => {
            console.log('GAPI Initialized');
            const authInstance = gapi.auth2.getAuthInstance();
            localStorage.setItem("authentication",authInstance.isSignedIn.get())
            const grantedScopes = authInstance.getGrantedScopes();
            console.log(grantedScopes,"grantedScopes");
          }).catch((error) => {
            console.error('Error initializing GAPI:', error);
          });
        }
        gapi.load('client:auth2', start);
      }, []);

  

    const fetchMeetingDetails = async (meetingCode) => {
        alert(meetingCode)
        const response = await gapi.client.reports.activities.list({
          userKey: 'all',
          applicationName: 'meet',
          eventName: 'call_ended',
          filters: `meeting_code==${meetingCode}`,
        });
        console.log(response,"newresponse");
        const activities = response.result.items || [];
        const participants = activities.flatMap(activity =>
          activity.events.flatMap(event =>
            event.parameters
              .filter(param => param.name === 'user_email')
              .map(param => param.value)
          )
        );
    
        const duration = activities.flatMap(activity =>
          activity.events.flatMap(event =>
            event.parameters
              .filter(param => param.name === 'duration_seconds')
              .map(param => parseInt(param.value, 10))
          )
        ).reduce((acc, val) => acc + val, 0);
      };

    const checkEventStatus = async () => {
        const response = await gapi.client.calendar.events.get({
          calendarId: 'primary',
          eventId: "siq7ht5c512mukvjqag7qgb84k",
        });
    
        if (response.result.status === 'cancelled') {
          alert('This meeting was cancelled.');
        } else {
          const now = new Date();
          const meetingStart = new Date(response.result.start.dateTime);
          if (meetingStart < now) {
            fetchMeetingDetails("siq7ht5c512mukvjqag7qgb84k");
            // alert('The meeting should have started or is over.');
          } else {
            alert('The meeting is still scheduled.');
          }
        }
      };


      const getMeetingDetails = async (meetingId) => {
        if (!isAuthenticated) {
          console.log('User not authenticated');
          return;
        }
      
        const client = Client.initWithMiddleware({ authProvider });
      
        try {
          // Fetch the online meeting details using the meeting ID
          const id = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NzcxMTdhMTMtZDI4NC00ODc2LTg2ZGUtZDc1ZTI0MDEyZDc1%40thread.v2/0?context=%7b%22Tid%22%3a%2224c55e21-ebf8-4b04-90e6-158d4790c5f3%22%2c%22Oid%22%3a%22b7dc33e0-f0b9-42cc-ae32-96b7cbcc6c53%22%7d'
          const meetingResponse = await client.api("/me/onlineMeetings")
          .filter(`JoinWebUrl eq '${id}'`)
          .get();
          

      
          // Extract meeting details
          const subject = meetingResponse.subject;
          const startTime = meetingResponse.startDateTime;
          const endTime = meetingResponse.endDateTime;
          const duration = endTime ? new Date(endTime) - new Date(startTime) : 0; // Duration in milliseconds
      
          console.log(`Meeting: ${subject}`);
          console.log(`Start Time: ${startTime}`);
          console.log(`End Time: ${endTime}`);
          console.log(`Duration: ${duration / 60000} minutes`); // Duration in minute
      
        } catch (error) {
          console.error('Error fetching meeting details:', error);
        }
      };
      
      // Call the function with a specific meeting ID
      // getMeetingDetails('your-meeting-id-here');
      

    return (
        <>
            <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Meeting Details</h3>

                    <div>
                        <Row>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><BiFont /></span>Title</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div>
                                    {details?.interview?.title}
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Developer Name</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex align-items-center gap-3 client-imgbx">
                                    <img src={details?.developer?.profile_picture} />
                                    <p className="font-14 mb-0">{details?.developer?.name}</p>
                                </div>
                            </Col>
                            {/* <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Company Name</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex align-items-center gap-3 client-imgbx">
                                    <img src={clientImg} />
                                    <p className="font-14 mb-0">Amazon</p>
                                </div>
                            </Col> */}
                            {/* <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Interviewer's List</p>
                            </Col> */}
                            <Col lg={8} className="mb-3">
                                <div className="d-flex flex-wrap gap-2 align-items-start">
                                    {/* <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <img src={devImg} />
                                            <p className="mb-0">{interviewers_list}</p>
                                        </div>
                                    </div> */}
                                    {/* <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div> */}
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><FaVideo /></span>Video Meeting Solution</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-3 video-meetbx">
                                        <img src={rexettLogo} />
                                        <p className="font-14 mb-0">Video Meeting (Rexett)</p>
                                    </div>
                                    <div>
                                        <Button variant="transparent" className="copy-link">
                                            <FaRegCopy />
                                        </Button>
                                        <Link to={details?.interview?.meeting_link} target="_blank" variant="transparent" className="text-decoration-none main-btn font-14 py-2">
                                            <FaVideo /> Join
                                        </Link>
                                        {/* <Button variant="transparent" className="main-btn font-14 ms-2 py-2">
                                            View Details
                                        </Button> */}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading"><span><FaClock /></span>Time and Date</p>
                            </Col>
                            <Col lg={8} className="mb-3 associate-text">
                                <div className="d-inline-flex align-items-center gap-2">
                                    <div className="datefield-wrapper associate">
                                        <p className="font-14 mb-0">{meeting_date}</p>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 associate">
                                        <p className="font-14 mb-0">{meeting_time}</p>
                                        {/* <span className="arrow-icon">
                                            <FaArrowRightLong />
                                        </span>
                                        <p className="font-14 mb-0">19:30</p>
                                        <span className="font-14">1h</span> */}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-lg-3 mb-1">
                                <p className="font-14 schedule-heading">Status</p>
                            </Col>
                            <Col lg={8} className="mb-3">
                              {  status=="scheduled"? <span className="status-finished mb-2">Accepted</span>
                                :<div className="">
                                    <span className="status-rejected mb-2">Declined</span>
                                    <div>
                                        <p className="fw-semibold font-14 mb-1">Reason</p>
                                        <p className="font-14 mb-0">I have some urgent work, need to go out of station. So I'll be available on <strong>25-06-2024</strong></p>
                                    </div>
                                </div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button variant="transparent" className="cancel-btn font-14" onClick={cancelMeeting}>Cancel Meeting</Button>
                        </div>
                        <div>
                            <Button variant="transparent" className="outline-main-btn font-14" onClick={()=>checkEventStatus()}>Check Interview Status</Button>
                            <Button variant="transparent" className="outline-main-btn font-14" onClick={()=>getMeetingDetails("AAMkADU2NjE0OWIwLWU1MjAtNGJlNi1hNjc0LTZlYzg0NDk5YzAzMwBGAAAAAACurO6i5qZvQIspx2LtckmfBwAw6FGqZi1CQY5xHP3TIqn7AAAAAAENAAAw6FGqZi1CQY5xHP3TIqn7AABa3yFlAAA=")}>Check microsoft</Button>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
            <RejectModal show={isCancelModal?.isTrue} onClick={onClick}/>
        </>
    )
}
export default MeetingInfo;