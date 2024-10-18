import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BiFont } from "react-icons/bi";
import { FaArrowRightLong, FaUsers } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { IoAlarm } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import CommonInput from "../../atomic/CommonInput";
import { useForm } from "react-hook-form";
import RexettButton from "../../atomic/RexettButton";
import { VIDEO_MEETING } from "../../../helper/constant";
import { useDispatch, useSelector } from "react-redux";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import {
  getTimeZoneList,
  postCandidateInterview,
  singleJobPostData,
} from "../../../redux/slices/clientDataSlice";
import { useLocation, useParams } from "react-router-dom";
import {
  allEmployeeList,
  getAllEvents,
  getDeveloperList,
  postScheduleMeeting,
} from "../../../redux/slices/adminDataSlice";
import { gapi } from "gapi-script";
import ThirdPartyServices from "./ThirdParyServices";
import moment from "moment";
import { Time_ZONE } from "../../../helper/timeZone";
const Schedulemeeting = ({
  show,
  handleClose,
  selectedDeveloper,
  createdMeetings,
  setCreatedMeetings,
  type,
  timeZone
}) => {
  console.log(selectedDeveloper, "selectedDeveloper");
  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const {id}= useParams();
  const location = useLocation();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const { developerList,assignEmployeeList } = useSelector((state) => state.adminData);
  const { smallLoader } = useSelector((state) => state.clientData);
  const [thirdParty, setThirdParty] = useState(false);
  const [meetingLink, setMeetingLink] = useState(null);
  const { instance, accounts } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [serviceEventId, setServiceEventID] = useState(null);
  const [microsoftEventId, setMicrosoftEventId] = useState(null);
  const [events, setEvents] = useState([]);

  const [eventDetails, setEventDetails] = useState({
    subject: "meeting",
    location: { displayName: "Koliyal Truck" },
    body: { content: "Karosal" },
    start: {
      dateTime: "2024-09-11T14:00:00", // Correct ISO 8601 format
      timeZone: "UTC",
    },
    end: {
      dateTime: "2024-09-11T15:00:00", // Correct ISO 8601 format
      timeZone: "UTC",
    },
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness",
  });

  const getFormattedOptions = () => {
    const newOptions = developerList?.developers?.map((item) => {
      return { label: item?.email, value: item.id };
    });
    return newOptions;
  };
  

  const getFormattedEmployeeOptions = () => {
    const newOptions = assignEmployeeList?.map((item) => {
      return { label: item?.email, value: item.id };
    });
    return newOptions;
  };

  const [firstSlot, setFirstSlot] = useState("");
  const [meetingPlatform, setMeetingPlatform] = useState();
  const [meetingStatus, setMeetingStatus] = useState();
  const [secondSlot, setSecondSlot] = useState("");
  const [groupedTime, setGroupedTime] = useState([]);
  const { timeZoneList } = useSelector((state) => state.clientData);
  const defaultInterview = localStorage.getItem("email");

  const isAdminSingleJob = location.pathname.includes('admin-single-job');

  useEffect(() => {
    dispatch(getTimeZoneList());
    dispatch(getDeveloperList());
    // dispatch(allEmployeeList())
  }, []);

  useEffect(() => {
    setValue("candidate_reminder", true);
    setValue("interviewer_reminder", true);
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      setIsAuthenticated(true);
    }
  }, [accounts]);

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(instance, {
    account: accounts[0],
    scopes: ["user.read", "Calendars.ReadWrite"],
    prompt: "consent",
  });

  useEffect(() => {
    if (selectedDeveloper) {
      setValue("select_candidate", [
        { label: selectedDeveloper?.email, value: selectedDeveloper?.email },
      ]);
      setValue("time_zone",timeZone)
    }
  }, [selectedDeveloper]);

  const createCalendarEvent = async () => {
    if (!isAuthenticated) {
      console.log("User not authenticated");
      return;
    }

    const client = Client.initWithMiddleware({ authProvider });

    try {
      let response = await client.api("/me/events").post(eventDetails);
      fetchCalendarEvents(); // Fetch the updated events list
      if (response.onlineMeeting) {
        console.log("Join Teams meeting at: ", response.onlineMeeting.joinUrl);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    } 
  };

  useEffect(() => {
    if (Time_ZONE.length > 0) {
      let groupedTimeZones = Time_ZONE?.map((item) => {
        return {
          label: `${item.zone} ${item?.utc}`,
          value:item?.utc
         
        };
      });
      setGroupedTime(groupedTimeZones);
    }
  }, []);
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        slots.push({ label: time, value: time });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const currentTime = new Date();
  const oneHourLater = new Date(currentTime.getTime() + 60 * 60 * 1000); // Adds 1 hour

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // const newTime = formatTime(oneHourLater)
  // const newCurrent = formatTime(currentTime)
  // console.log(newTime,"newwwww")
  // const duration = moment().duration( newCurrent.diff(newTime) );
  // console.log(duration,"duration")

  const newTime = formatTime(oneHourLater);
  const newCurrent = formatTime(currentTime);
  console.log(newTime, "newTime");
  console.log(newCurrent, "newCurrent");

  // const duration = moment.duration(newCurrent.diff(newTime));
  // console.log(duration.asHours(), "duration in hours");
  const currentMoment = moment(newCurrent, "HH:mm"); // current time
  const newMoment = moment(newTime, "HH:mm"); // new time

  // Calculate the difference in minutes
  const duration = newMoment.diff(currentMoment, "hours");
  console.log(duration, "duration");

  const fetchCalendarEvents = async () => {
    if (!isAuthenticated) {
      console.log("User not authenticated");
      return;
    }

    const client = Client.initWithMiddleware({ authProvider });

    try {
      const response = await client.api("/me/events").get();
      setEvents(response.value);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleFirstSlotChange = (event) => {
    const selectedTime = event.target.value;
    setFirstSlot(event.target.value);

    // Automatically set second slot to 1 hour after the first slot if not already set
    if (!secondSlot || selectedTime >= secondSlot) {
      const [selectedHour, selectedMinute] = selectedTime
        .split(":")
        .map(Number);
      let newHour = selectedHour + 1;
      let newMinute = selectedMinute;

      if (newHour >= 24) {
        newHour = 23; // Set to the last available slot if it goes beyond 24 hours
        newMinute = 45;
      }

      const newTimeSlot = `${String(newHour).padStart(2, "0")}:${String(
        newMinute
      ).padStart(2, "0")}`;
      setSecondSlot(newTimeSlot);
    }
  };

  const handleSecondSlotChange = (event) => {
    setSecondSlot(event.target.value);
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return "";
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const startDate = new Date(0, 0, 0, startHour, startMinute);
    const endDate = new Date(0, 0, 0, endHour, endMinute);
    const diffMs = endDate - startDate;
    const diffMinutes = diffMs / (1000 * 60);

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    let duration = "";
    if (hours > 0) {
      duration += `${hours}h `;
    }
    if (minutes > 0) {
      duration += `${minutes}m`;
    }
    setValue("meeting_time", duration.trim());
    return duration.trim();
  };

  // Filter second select options to be only after the first select value
  const filteredTimeSlots = timeSlots.filter(
    (slot) => !firstSlot || slot.label > firstSlot
  );

  const meetingTypeValue = watch("meeting_type");
  

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    setValue("instant_date", currentDate);
    setValue("meeting_type", "instant");
  }, []);

  useEffect(() => {

    const newTime = formatTime(oneHourLater);
    const newCurrent = formatTime(currentTime);
  
    if (meetingTypeValue === "instant") {
      setValue("meeting_start_time", newCurrent);
      setValue("meeting_end_time", newTime);
    } else {
      setValue("meeting_start_time", "");
      setValue("meeting_end_time", "");
    }
    // setValue("time_zone", "");
  }, [meetingTypeValue]);

  console.log(meetingPlatform, "meetingPlatform");

  // const convertToUTC = (date, time, timeZone) => {
  //   const localDateTime = new Date(`${date}T${time}`);
  //   const options = { timeZone: timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric' };
  //   const utcDateTime = new Date(localDateTime.toLocaleString('en-US', options));
  //   return utcDateTime.toISOString();
  // };

  

  // const convertToUTC = (date, time) => {
  //   const dateString = new Date(date).toISOString();
  //   const datePart = dateString.split('T')[0]; 
  //   return new Date(`${datePart}T${time}Z`).toISOString(); // Append 'Z' to indicate UTC
  // };

  const convertToUTC = (date1, time) => {
    const localDate = new Date(`${date1}T${time}`);
    const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000); // Convert to UTC
    return utcDate.toISOString().split('T')[1].split('Z')[0]; // Extract only the time part
  };
  
  




  const onSubmit = (data) => {
    // setCreatedMeetings(data)
    console.log(data, "valuesss");
    setMeetingPlatform(data?.meeting_platform?.value);
    

    if (type === "events") {
      let payload = {
        title: data?.title,
        developer_id: data?.select_candidate?.value,
        attendees: "attendee1@example.com, attendee2@example.com",
        event_platform: data?.meeting_platform?.value,
        event_type: data?.meeting_type,
        // event_date: data?.instant_date,
        // event_time: data?.meeting_start_time,
        // event_end_time: data?.meeting_end_time,
        event_date: convertToUTC(data?.instant_date, data?.meeting_start_time),
        event_time: convertToUTC(data?.instant_date, data?.meeting_start_time),
        event_end_time: convertToUTC(data?.instant_date, data?.meeting_end_time), 
        time_zone: data?.time_zone,
        candidate_reminder: data?.candidate_reminder,
        attendees_reminder: data?.interviewer_reminder,
        type: "meeting",
        event_link: meetingLink,
        developer_email: data?.select_candidate?.label,
      };
      dispatch(
        postScheduleMeeting(payload, () => {
          dispatch(getAllEvents());
          handleClose();
        })
      );
    } else {
      let payload = {
        job_id: +id,
        developer_id: selectedDeveloper?.id
          ? selectedDeveloper?.id
          : +data?.select_candidate?.value,
        developer_email: selectedDeveloper?.email
          ? selectedDeveloper?.email
          : data?.select_candidate?.label,
        meeting_type: data?.meeting_type,
        // meeting_date: data?.instant_date,
        // meeting_time: data?.meeting_start_time,
        // meeting_end_time: data?.meeting_end_time,
      //   meeting_date: data?.instant_date,
      // meeting_time: "12:10:00",
      // meeting_end_time: "13:04:00",
        title: data?.title,
        meeting_platform: data?.meeting_platform?.value,
        meeting_link: meetingLink,
        status: "pending",
        interviewers_list: data?.interviewers_list
          ?.map((item) => item.label)
          .join(", "),
        time_zone: data?.time_zone.value,
        candidate_reminder: data?.candidate_reminder,
        attendees_reminder: data?.interviewer_reminder,
        interview_duration: "1hr",
        type: isAdminSingleJob ? 'interview' : 'screening',
        event_id: serviceEventId,
      };

      console.log(payload,"apu")

      dispatch(postCandidateInterview(payload,()=>{
        dispatch(getAllEvents());
        handleClose();
        dispatch(singleJobPostData(id, () => {}));
      }));
    }
    setMeetingLink(null);
    setServiceEventID(null);
    setMicrosoftEventId(null);
    setValue("meeting_type", "instant");
    reset();
  };

  let r = watch("meeting_platform");
  useEffect(() => {
    setThirdParty(
      r?.value == "google_meet" || r?.value == "microsoft_team" ? true : false
    );
  }, [r]);

  const handleCloseThirdPary = () => {
    // setValue("meeting_platform","");
    setThirdParty(false);
  };

  console.log(meetingStatus, "meeting status");
  const handleMeeting = (status) => {
    console.log(status, "statusss");
    setMeetingStatus(status);
  };

  const generateRequestId = () => {
    return `request_${new Date().getTime()}_${Math.floor(
      Math.random() * 1000
    )}`;
  };
  const getDateTimeString = (dateString, timeString) => {
    if(dateString && timeString){
      const [hours, minutes] = timeString.split(':').map(Number);
      const paddedHours = String(hours).padStart(2, "0");
      const paddedMinutes = String(minutes).padStart(2, "0");
      const seconds = "00"
    
      const result = `${dateString}T${paddedHours}:${paddedMinutes}:${seconds}`;
      return result;
    }
  };
  console.log(meetingLink,"this is meeting link");
  
  console.log(watch("meeting_end_time"), "meeting_start_time ");
  const syncCreatedMeetingsWithGoogle = async(e) => {
    setLoader(true);
    const { title, meeting_start_time, meeting_end_time, time_zone, instant_date, meeting_platform } = watch();
    const meetingPlatform = meeting_platform?.value
    console.log(meetingPlatform,"meetingPlatform")
    e.stopPropagation();
    if(meetingPlatform === "google_meet"){
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        console.log("User not authenticated");
        return;
      }
      const newEvent = {
        summary: title || "Untitled Meeting",
        location: "jkk",
        description: "mmmm",
        start: {
          // dateTime: "2024-08-26T16:50:00",
          // timeZone: "America/Los_Angeles",
          dateTime: getDateTimeString(instant_date, meeting_start_time),
          // timeZone: time_zone?.label,
              timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: getDateTimeString(instant_date, meeting_end_time),
          // timeZone: time_zone?.label,
            timeZone: "America/Los_Angeles",
  
          // dateTime: "2024-08-29T16:50:00",
          // timeZone: "America/Los_Angeles",
        },
        conferenceData: {
          createRequest: {
            requestId: generateRequestId(), // A unique string identifying this request. Use a unique value for each new event.
            conferenceSolutionKey: {
              type: "hangoutsMeet", // Use Google Meet
            },
          },
        },
      };
  
      gapi.client.calendar.events
        .insert({
          calendarId: "primary",
          resource: newEvent,
          conferenceDataVersion: 1, // Required to create Google Meet link
        })
        .then((response) => {
          console.log("Event created:", response.result);
          if (response.result.hangoutLink) {
            // setValue("meetingPlatform","");
            console.log("Google Meet link:", response.result.hangoutLink);
            setMeetingLink(response.result.hangoutLink);
            setServiceEventID(response?.result?.id)
            localStorage.setItem("googleEventId",response?.result?.id)

          }
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error creating event:", error);
          setLoader(false);
          // setValue("meetingPlatform","");
  
        });
    } else if(meetingPlatform === "microsoft_team"){
      console.log(meetingPlatform,"innside")
      let eventDetailsPayload={
        subject: title,
        location: { displayName: "Sweden" },
        body: { content: "No body associated" },
        start: {
          dateTime: getDateTimeString(instant_date, meeting_start_time), 
          timeZone: "UTC",
        },
        end: {
          dateTime: getDateTimeString(instant_date, meeting_end_time), // Correct ISO 8601 format
          timeZone: "UTC",
        },
        "allowNewTimeProposals": true,
        "isOnlineMeeting": true,
        "onlineMeetingProvider": "teamsForBusiness",
      //   "onlineMeeting": {
      //     "joinUrl": null
      // }
      }
      if (!isAuthenticated) {
        console.log('User not authenticated');
        return;
      }
      const client = Client.initWithMiddleware({ authProvider });
      try {
       let response= await client.api('/me/events').post(eventDetailsPayload);
        fetchCalendarEvents(); // Fetch the updated events list
        if (response.onlineMeeting) {
          setMeetingLink(response?.onlineMeeting?.joinUrl);
          setServiceEventID(response?.id)
          console.log("Join Teams meeting at: ", response.onlineMeeting.joinUrl);
        }
      } catch (error) {
        console.error('Error creating event:', error);
      }
      setLoader(false);
    }
    setThirdParty(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        animation
        className="custom-modal"
      >
        <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

        <Modal.Body>
          <h3 className="popup-heading">
            {type === "events"
              ? "Schedule Meetings"
              : type == "screen"
              ? "Schedule Screening"
              : "Schedule Interview"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  <div>
                    {/* <Form.Control type="text" className="common-field font-14" placeholder="Add title" /> */}
                    <CommonInput
                      name={"title"}
                      type="text"
                      control={control}
                      rules={{ required: "This field is required" }}
                      invalidFieldRequired={true}
                      placeholder="Add title"
                    />
                  </div>
                  <p className="error-message">{errors?.title?.message}</p>
                </Col>
                <Col lg={4} className="mb-lg-3 mb-1">
                  <p className="font-14 schedule-heading">
                    <span>
                      <RiUser3Fill />
                    </span>
                    Select Candidate
                  </p>
                </Col>
                <Col lg={8} className="mb-3">
                  <div>
                    {/* <Select isMulti /> */}
                    <CommonInput
                      name={"select_candidate"}
                      type={"select2"}
                      control={control}
                      selectOptions={getFormattedOptions()}
                      rules={{ required: "This field is required" }}
                      invalidFieldRequired={true}
                      placeholder="Select Candidate"
                    />
                    <p className="error-message">
                      {errors?.select_candidate?.message}
                    </p>
                  </div>
                </Col>
                {type === "events" ? (
                  ""
                ) : (
                  <>
                    <Col lg={4} className="mb-lg-3 mb-1">
                      <p className="font-14 schedule-heading">
                        <span>
                          <FaUsers />
                        </span>
                        Interviewer
                      </p>
                    </Col>
                    <Col lg={8} className="mb-3">
                      <div>
                        <CommonInput
                          name={"interviewers_list"}
                          type={"creatable"}
                          control={control}
                          options={getFormattedEmployeeOptions()}
                          rules={{ required: "This field is required" }}
                          invalidFieldRequired={true}
                          placeholder="Select Interviewer"
                        />
                        <p>{errors?.select_candidate?.message}</p>
                      </div>
                    </Col>
                  </>
                )}

                <Col lg={4} className="mb-lg-3 mb-1">
                  <p className="font-14 schedule-heading">
                    <span>
                      <FaClock />
                    </span>
                    Time and Date
                  </p>
                </Col>
                <Col lg={8} className="mb-3">
                  <div>
                    <div
                      className="mb-2"
                      onChange={(e) => handleMeeting(e.target.value)}
                    >
                      <Form.Check
                        type="radio"
                        name="instant"
                        label="Instant Meeting"
                        id="instant_meeting"
                        checked={watch("meeting_type") === "instant"} // Use state to control checked
                        className="d-inline-block meeting-radio ps-0 me-2"
                        value="instant"
                        {...register("meeting_type")}
                      />
                      <Form.Check
                        type="radio"
                        name="scheduled"
                        label="Scheduled Date & Time"
                        id="scheduled"
                        checked={watch("meeting_type") === "scheduled"}
                        className="d-inline-block meeting-radio ps-0"
                        value="scheduled"
                        {...register("meeting_type")}
                      />
                    </div>
                    {
                      meetingTypeValue === "instant" ? (
                        <>
                          {/* <Form.Control type="date" className="common-field font-14"  value={"2024-01-02"} /> */}

                          <CommonInput
                            name="instant_date"
                            type="date"
                            control={control}
                            rules={{ required: "This field is required" }}
                            invalidFieldRequired={true}
                          />
                          <div className="associate-text mt-2">
                            <div className="d-flex align-items-center gap-2 associate p-3">
                              <p className="font-14 mb-0">
                                {formatTime(currentTime)}
                              </p>
                              <span className="arrow-icon">
                                <FaArrowRightLong />
                              </span>
                              <p className="font-14 mb-0">
                                {formatTime(oneHourLater)}
                              </p>
                              <p className="mb-0 font-14">Duration</p>
                              <span className="font-14">{duration} hr</span>
                            </div>
                          </div>
                          <div style={{ marginTop: "20px" }}>
                            <CommonInput
                              name={"time_zone"}
                              type={"select"}
                              control={control}
                              selectOptions={groupedTime}
                              rules={{ required: "This field is required" }}
                              invalidFieldRequired={true}
                              defaultOption="Time zone"
                              placeholder="Select Timezone"
                            />
                            {/* <CommonInput
                              name={"time_zone"}
                              type="text"
                              control={control}
                              rules={{ required: "This field is required" }}
                              invalidFieldRequired={true}
                              placeholder="Enter Timezone"
                            /> */}
                          </div>
                        </>
                      ) : (
                        // meetingTypeValue === "scheduled" && (
                        <div className="specific-datetime">
                          <div className="d-flex align-items-center gap-3">
                            <CommonInput
                              name={"meeting_start_time"}
                              type={"normal-select"}
                              control={control}
                              value={firstSlot}
                              options={timeSlots}
                              rules={{ required: "This field is required" }}
                              invalidFieldRequired={true}
                              defaultOption="Select Time"
                              className={"mb-0"}
                              onChange={handleFirstSlotChange}
                            />

                            <span className="arrow-icon mb-3">
                              <FaArrowRightLong />
                            </span>

                            <CommonInput
                              name={"meeting_end_time"}
                              type={"normal-select"}
                              control={control}
                              value={secondSlot}
                              options={filteredTimeSlots}
                              rules={{ required: "This field is required" }}
                              invalidFieldRequired={true}
                              defaultOption="Select Time"
                              className={"mb-0"}
                              onChange={handleSecondSlotChange}
                            />
                            <span className="font-14">
                              {calculateDuration(firstSlot, secondSlot)}
                            </span>
                          </div>
                          <div className="mb-2 datefield-wrapper">
                            {/* <DatePicker onChange={onChange} value={value} /> */}
                            <CommonInput
                              name={"meeting_date"}
                              type={"date"}
                              control={control}
                              rules={{ required: "This field is required" }}
                              invalidFieldRequired={true}
                            />
                          </div>
                          <div>
                            <CommonInput
                              name={"time_zone"}
                              type={"select"}
                              control={control}
                              selectOptions={groupedTime}
                              rules={{ required: "This field is required" }}
                              invalidFieldRequired={true}
                              defaultOption="Time zone"
                              placeholder="Select Timezone"
                            />
                            {/* <CommonInput
                              name={"time_zone"}
                              type="text"
                              control={control}
                              rules={{ required: "This field is required" }}
                              invalidFieldRequired={true}
                              placeholder="Enter Timezone"
                            /> */}
                          </div>
                        </div>
                      )
                      // )
                    }
                  </div>
                </Col>
                <Col lg={4} className="mb-lg-3 mb-1">
                  <p className="font-14 schedule-heading">
                    <span>
                      <FaVideo />
                    </span>
                    Video Meeting Solution
                  </p>
                </Col>
                <Col lg={8} className="mb-3">
                  {/* <Form.Select className="common-field font-14">
                                        <option>Rexett video meeting</option>
                                        <option>Google meet</option>
                                        <option>Microsoft team</option>
                                    </Form.Select> */}
                  <CommonInput
                    name={"meeting_platform"}
                    type={"select2"}
                    control={control}
                    selectOptions={VIDEO_MEETING}
                    rules={{ required: "This field is required" }}
                    invalidFieldRequired={true}
                    placeholder="Video Meeting"
                  />{" "}
                </Col>
                <Col lg={4} className="mb-lg-3 mb-1">
                  <p className="font-14 schedule-heading">
                    <span>
                      <IoAlarm />
                    </span>
                    Reminders
                  </p>
                </Col>
                <Col lg={8} className="mb-3">
                  <div className="mb-2">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      {/* <img src={} /> */}
                      <label
                        className="font-14 mb-0 cursor-pointer"
                        htmlFor="candidate-reminder"
                      >
                        Candidate reminder
                      </label>
                      <div class="form-check form-switch toggle-switch-wrapper">
                        <input
                          class="form-check-input toggle-switch-custom shadow-none  cursor-pointer"
                          type="checkbox"
                          role="switch"
                          id="candidate-reminder"
                          {...register("candidate_reminder")}
                        />
                      </div>
                    </div>
                    <p className="font-13">
                      Send an email reminder to the candidate 24 hours before
                      the event
                    </p>
                  </div>
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      {/* <img src={} /> */}
                      <label
                        className="font-14 mb-0 cursor-pointer"
                        htmlFor="client-reminder"
                      >
                        Interviewer reminder
                      </label>
                      <div class="form-check form-switch toggle-switch-wrapper">
                        <input
                          class="form-check-input toggle-switch-custom shadow-none  cursor-pointer"
                          type="checkbox"
                          role="switch"
                          id="client-reminder"
                          {...register("interviewer_reminder")}
                        />
                      </div>
                    </div>
                    <p className="font-13">
                      Send an email reminder to the interviewers 24 hours before
                      the event
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="text-center">
              {/* <Button variant="transparent" onClick={() => { handleClose(); meetingToast(); }} className="main-btn px-4 font-14 fw-semibold">Send Invite</Button> */}
              <RexettButton
                type="submit"
                text={"Send Invite"}
                className="main-btn px-4 font-14 fw-semibold"
                disabled={smallLoader}
                isLoading={smallLoader}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ThirdPartyServices
        show={thirdParty}
        handleClose={handleCloseThirdPary}
        text={
          r?.value == "microsoft_team"
            ? "Link With Microsoft"
            : "Link With Google"
        }
        syncCreatedMeetingsWithGoogle={syncCreatedMeetingsWithGoogle}
        meetingLink={meetingLink}
        loader={loader}
      />
      {/* <Button onClick={createCalendarEvent}>Hlp</Button> */}
    </>
  );
};
export default Schedulemeeting;
