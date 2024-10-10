import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { BiFont } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import clientImg from "../../../assets/img/amazon.png";
import rexettLogo from "../../../assets/img/favicon.png";
import devImg from "../../../assets/img/demo-img.jpg";
import { FaRegCopy } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeJobStatus,
  meetingCancel,
  singleJobPostData,
} from "../../../redux/slices/clientDataSlice";
import RejectModal from "./RejectModal";
import { gapi } from "gapi-script";
import { Client } from "@microsoft/microsoft-graph-client";
import { useMsal } from "@azure/msal-react";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import CommonInput from "../../atomic/CommonInput";
import { useForm } from "react-hook-form";
import RadioGroupField from "../../RadioGroupField";
import { getDifferenceFromTwoDates } from "../../utils";
import RexettSpinner from "../../atomic/RexettSpinner";
import SingleAttendeeInfo from "../SingleAttendeeInfo";
import { meetingWebhookApi, updateStatus } from "../../../redux/slices/adminDataSlice";
import Schedulemeeting from "../Modals/ScheduleMeeting";
import { convertSeconds } from "../../../helper/utlis";
const MARK_AS_OPTIONS = [
  {
    label: "Completed",
    value: "completed",
  },
  //   {
  //     label: "Incomplete",
  //     value: "incomplete",
  //   },
  //   {
  //     label: "Canceled",
  //     value: "canceled",
  //   },
  //   {
  //     label: "Pending",
  //     value: "pending",
  //   },
];

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  "https://www.googleapis.com/discovery/v1/apis/admin/reports_v1/rest",
];

const SCOPES = 'https://www.googleapis.com/auth/admin.reports.usage.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/admin.reports.audit.readonly';

//   const CLIENT_ID = "574761927488-fo96b4voamfvignvub9oug40a9a6m48c.apps.googleusercontent.com";

//   const API_KEY = 'AIzaSyCA-pKaniZ4oeXOpk34WX5CMZ116zBvy-g';;

const MeetingInfo = ({ show, handleClose, details }) => {
  const dispatch = useDispatch();
  const { id: jobId } = useParams();
  const { instance, accounts } = useMsal();
  const { register, errors, values, setValue, watch } = useForm();
  const [showDetailsSection, setShowDetailsSection] = useState(false);
  const [info, setInfo] = useState({});
  const [joinUrl, setJoinUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [isCancelModal, setCancelModal] = useState({
    isTrue: false,
    data: {},
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState({});
  const [showScheduleMeeting, setShowScheduleMeet] = useState(false);
  const {
    interview: {
      id, // application id
      title,
      developer_name,
      interviewers_list,
      meeting_date,
      meeting_time,
      status,
      developer_id,
      reason,
      job_external_id
    },
  } = details;
  console.log(details, "details");
  const cancelMeeting = () => {
    setCancelModal({ isTrue: true });
  };
  const closeCancelModal = () => {
    setCancelModal({ isTrue: false });
  };
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

  const onClick = (e, data) => {
    let payload = {
      reason: data?.rejection_reason,
    };
    dispatch(meetingCancel(id, payload));
  };

  useEffect(() => {
    if (accounts.length > 0) {
      setIsAuthenticated(true);
    }
  }, [accounts]);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: "AIzaSyDRb_BGMWY3XocACa_K976a0g6y-5QwkqU",
          clientId:"982505282330-ei63qgf2b0b0djm6dfkdapnpcl7oc8en.apps.googleusercontent.com",
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          localStorage.setItem("authentication", authInstance.isSignedIn.get());
          const grantedScopes = authInstance.getGrantedScopes();
        })
        .catch((error) => {
          console.error("Error initializing GAPI:", error);
        });
    }
    gapi.load("client:auth2", start);
  }, []);

  const fetchMeetingDetails = async (meetingCode) => {
    const startTime = new Date("2024-10-08T05:43:00+05:30").toISOString(); // Adjust start date
    const endTime = new Date( "2024-10-08T06:43:00+05:30").toISOString();
    // alert(meetingCode);
    const meetingCo = "vokb3ct1s6si633osucojracn8";
    const filters = `calendar_event_id==${meetingCo}`
    const response = await gapi.client.reports.activities.list({
      userKey: "all",
      applicationName: "meet",
      eventName: "call_ended",
      maxResults: 10,
      filters: filters,
    });
    // const activities = response.result.items || [];
    // const participants = activities.flatMap((activity) =>
    //   activity.events.flatMap((event) =>
    //     event.parameters
    //       .filter((param) => param.name === "user_email")
    //       .map((param) => param.value)
    //   )
    // );
    

    // const duration = activities
    //   .flatMap(() =>
    //     activity.events.flatMap((event) =>
    //       event.parameters
    //         .filter((param) => param.name === "duration_seconds")
    //         .map((param) => parseInt(param.value, 10))
    //     )
    //   )activity
    //   .reduce((acc, val) => acc + val, 0);
    const events = response.result.items; // assuming 'items' contains the events
    let joinedMeet=[]
    let duration;
    if (events && events.length > 0) {
      // Process each event
      events.forEach(event => {
        const eventData = event.events[0]; // Assuming each item has at least one event
        const parameters = eventData.parameters;

        // Extract specific fields you want
        const callEndedData = {
          identifier: parameters.find(p => p.name === "identifier")?.value,
          duration: parameters.find(p => p.name === "duration_seconds")?.intValue,
          organizerEmail: parameters.find(p => p.name === "organizer_email")?.value,
          displayName: parameters.find(p => p.name === "display_name")?.value,
          callEndedTime: event.id.time,
        };
         

       let duration_seconds= parameters.find(p => p.name === "duration_seconds")?.intValue

      let value= convertSeconds(duration_seconds)
      duration=value
    
        joinedMeet.push({
          attendee_external_id:null,
          name:parameters.find(p => p.name === "identifier")?.value,
          "is_joined": true
        })        
      });

            
      let joinedAttende=[]
        


   
    let payload=  {
        "meeting_external_id": job_external_id,
        "status": "completed",
        "duration": duration,
        "attendees": joinedMeet
      }

      console.log(payload,"payload")
         
      dispatch(meetingWebhookApi(payload,"ZbKD2/st1jLezibHDL6GXcYiwHIVvQcyU/9M55ty",()=>{}))
    }


  };

  const googleEventId = localStorage.getItem("googleEventId")

  const checkInterviewStatus = async () => {
    const meeting_platform = details?.interview?.meeting_platform;
    console.log(meeting_platform, "meeting_platform");
    setLoader((prev) => true);
    if (meeting_platform === "microsoft_team") {
      if (!isAuthenticated) {
        console.log("User not authenticated");
        return;
      }
      const client = Client.initWithMiddleware({ authProvider });

      try {
        // Fetch the online meeting details using the meeting ID
        const joinUrl = details?.interview?.meeting_link;
        const id = joinUrl;

        // const id = "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NzcxMTdhMTMtZDI4NC00ODc2LTg2ZGUtZDc1ZTI0MDEyZDc1%40thread.v2/0?context=%7b%22Tid%22%3a%2224c55e21-ebf8-4b04-90e6-158d4790c5f3%22%2c%22Oid%22%3a%22b7dc33e0-f0b9-42cc-ae32-96b7cbcc6c53%22%7d";
        const meetingResponse = await client
          .api("/me/onlineMeetings")
          .filter(`JoinWebUrl eq '${id}'`)
          .get();

        if (meetingResponse) {
          const res = meetingResponse.value[0];
          setShowDetailsSection(true);
          const info = {
            callDuration: `${getDifferenceFromTwoDates(
              res?.startDateTime,
              res?.endDateTime
            )} hours`,
            attendees: res?.participants?.attendees,
          };
          setInfo(info);
          console.log(meetingResponse, "meetingResponse");
          console.log(info, "info");
        }
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
        console.error("Error fetching meeting details:", error);
      }
    } else if (meeting_platform === "google_meet") {
      console.log("inside google meet")
      const response = await gapi.client.calendar.events.get({
        calendarId: "primary",
        eventId: "vokb3ct1s6si633osucojracn8",
      });

      if (response.result.status === "cancelled") {
        // alert("This meeting was cancelled.");
      } else {
        const now = new Date();
        const meetingStart = new Date(response.result.start.dateTime);
        if (!meetingStart < now) {
          fetchMeetingDetails("vokb3ct1s6si633osucojracn8");
          // alert('The meeting should have started or is over.');
        } else {
          alert("The meeting is still scheduled.");
        }
      }
    }
    setLoader((prev) => false);
  };

  const getMeetingDetails = async (meetingId) => {
    if (!isAuthenticated) {
      console.log("User not authenticated");
      return;
    }
    setLoader(true);
    const client = Client.initWithMiddleware({ authProvider });
    try {
      // Fetch the online meeting details using the meeting ID
      const id = joinUrl;
      // "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NzcxMTdhMTMtZDI4NC00ODc2LTg2ZGUtZDc1ZTI0MDEyZDc1%40thread.v2/0?context=%7b%22Tid%22%3a%2224c55e21-ebf8-4b04-90e6-158d4790c5f3%22%2c%22Oid%22%3a%22b7dc33e0-f0b9-42cc-ae32-96b7cbcc6c53%22%7d";
      const meetingResponse = await client
        .api("/me/onlineMeetings")
        .filter(`JoinWebUrl eq '${googleEventId}'`)
        .get();

      if (meetingResponse) {
        const res = meetingResponse.value[0];
        setShowDetailsSection(true);
        const info = {
          callDuration: `${getDifferenceFromTwoDates(
            res?.startDateTime,
            res?.endDateTime
          )} hours`,
          attendees: res?.participants?.attendees,
        };
        setInfo(info);
        console.log(meetingResponse, "meetingResponse");
        console.log(info, "info");
      }
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
      console.error("Error fetching meeting details:", error);
    }
    setLoader(false);
  };

  const handleMarkAsStatusChange = (newStatus) => {
    // const payload = {
    //   applicationId: id,
    //   developerId: developer_id,
    //   jobId: jobId,
    //   newStatus: newStatus,
    // };
    const payload = {
      status: newStatus,
    };
    console.log(payload, details.interview.id, "payload");
    // dispatch(changeJobStatus(payload));
    dispatch(updateStatus(payload, details?.interview?.id, handleClose)); //interview id
    setValue("mark_as", newStatus);
    dispatch(singleJobPostData(jobId, () => { }));
  };

  // Call the function with a specific meeting ID
  // getMeetingDetails('your-meeting-id-here');

  const handleShowScheduleMeeting = (name, id, email) => {
    setSelectedDeveloper({ name, id, email })
    setShowScheduleMeet(!showScheduleMeeting);
  }

  const handleCloseScheduleMeeting = () => {
    setShowScheduleMeet(false);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        animation
        size="lg"
        className="custom-modal"
      >
        <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

        <Modal.Body>
          <h3 className="popup-heading">Meeting Details</h3>

          <div>
            <Row>
              <Col lg={4} className="mb-lg-3 mb-1">
                <p className="font-14 schedule-heading">
                  <span>
                    <BiFont />
                  </span>
                  Title
                </p>
              </Col>
              <Col lg={8} className="mb-3">
                <div>{details?.interview?.title}</div>
              </Col>
              <Col lg={4} className="mb-lg-3 mb-1">
                <p className="font-14 schedule-heading">
                  <span>
                    <RiUser3Fill />
                  </span>
                  Developer Name
                </p>
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
              {/* <Col lg={8} className="mb-3"> */}
              {/* <div className="d-flex flex-wrap gap-2 align-items-start"> */}
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
              {/* </div> */}
              {/* </Col> */}
              <Col lg={4} className="mb-lg-3 mb-1">
                <p className="font-14 schedule-heading">
                  <span>
                    <FaVideo />
                  </span>
                  Video Meeting Solution
                </p>
              </Col>
              <Col lg={8} className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3 video-meetbx">
                    <img src={rexettLogo} />
                    <p className="font-14 mb-0">
                      {details?.interview?.meeting_platform}
                    </p>
                  </div>
                  <div>
                    <Button variant="transparent" className="copy-link">
                      <FaRegCopy />
                    </Button>
                    <Link
                      to={details?.interview?.meeting_link}
                      target="_blank"
                      variant="transparent"
                      className="text-decoration-none main-btn font-14 py-2"
                    >
                      <FaVideo /> Join
                    </Link>
                    {/* <Button variant="transparent" className="main-btn font-14 ms-2 py-2">
                                            View Details
                                        </Button> */}
                  </div>
                </div>
              </Col>
              <Col lg={4} className="mb-lg-3 mb-1">
                <p className="font-14 schedule-heading">
                  <span>
                    <FaClock />
                  </span>
                  Time and Date
                </p>
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
                {status == "scheduled" ? (
                  <span className="status-finished mb-2">Accepted</span>
                ) : (
                  <div className="">
                    <span className="status-rejected mb-2">Declined</span>
                    <div>
                      <p className="fw-semibold font-14 mb-1">Reason</p>
                      <p className="font-14 mb-0">
                        {reason} So
                        I'll be available on <strong>{meeting_date}</strong>
                      </p>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button
                variant="transparent"
                className="cancel-btn font-14"
                onClick={cancelMeeting}
              >
                Cancel Meeting
              </Button>
            </div>
            {status !== "scheduled" && (
              <div className="d-flex align-items-center gap-2">
                <button
                  className="main-btn font-14 text-decoration-none"
                  onClick={() =>
                    handleShowScheduleMeeting(
                      details?.interview?.developer?.developer_detail?.name,
                      details?.developer_id,
                      details?.developer?.email
                    )
                  }
                >
                  Schedule Interview
                </button>
              </div>
            )}
            <div>
              <Button
                variant="transparent"
                className="outline-main-btn font-14"
                onClick={() => checkInterviewStatus()}
              >
                {loader ? <RexettSpinner /> : "Check Interview Status"}
              </Button>
              {/* <Button
                variant="transparent"
                className="outline-main-btn font-14"
                onClick={() =>
                  getMeetingDetails(
                    "AAMkADU2NjE0OWIwLWU1MjAtNGJlNi1hNjc0LTZlYzg0NDk5YzAzMwBGAAAAAACurO6i5qZvQIspx2LtckmfBwAw6FGqZi1CQY5xHP3TIqn7AAAAAAENAAAw6FGqZi1CQY5xHP3TIqn7AABa3yFlAAA="
                  )
                }
              >
                {loader ? <RexettSpinner /> : "Check microsoft"}
              </Button> */}
            </div>
          </div>
          {true && (
            <div className="detailedSection" style={{ marginTop: "10px" }}>
              <Row>
                <Col lg={8}>
                  <div className="call-duration">
                    Call Duration : {info?.callDuration}
                  </div>
                  <div className="attendees">
                    <p>Attendees : </p>
                    {info?.attendees?.length > 0 &&
                      info?.attendees?.map((data) => (
                        <SingleAttendeeInfo attendeeData={data} />
                      ))}
                  </div>
                  <div className="mark-as">
                    <div className="title">Mark Status as</div>
                    <RadioGroupField
                      radioOptions={MARK_AS_OPTIONS}
                      register={register}
                      fieldName="mark_as"
                      handleMarkAsStatusChange={handleMarkAsStatusChange}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <RejectModal
        show={isCancelModal?.isTrue}
        onClick={onClick}
        handleClose={closeCancelModal}
      />
      <Schedulemeeting
        show={showScheduleMeeting}
        handleClose={handleCloseScheduleMeeting}
        selectedDeveloper={selectedDeveloper}
      />
    </>
  );
};
export default MeetingInfo;
