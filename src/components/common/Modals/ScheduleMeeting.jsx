import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BiFont } from "react-icons/bi";
import { FaArrowRightLong, FaUsers } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { IoAlarm } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import CommonInput from "../../atomic/CommonInput";
import { useForm } from "react-hook-form";
import RexettButton from "../../atomic/RexettButton";
import { VIDEO_MEETING } from "../../../helper/constant";
import { useDispatch, useSelector } from "react-redux";
import { getTimeZoneList, postCandidateInterview } from "../../../redux/slices/clientDataSlice";
import { useLocation } from "react-router-dom";
import { getAllEvents, getDeveloperList, postScheduleMeeting } from "../../../redux/slices/adminDataSlice";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import ThirdPartyServices from "./ThirdParyServices";
const Schedulemeeting = ({ show, handleClose, selectedDeveloper, createdMeetings, setCreatedMeetings, type }) => {
    console.log(selectedDeveloper, "selectedDeveloper")
    const {
        handleSubmit,
        register,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({});
    const dispatch = useDispatch()
    const location = useLocation()
    const [data, setData] = useState()
    const { developerList } = useSelector(state => state.adminData)
    const [thirdParty,setThirdParty]=useState(false)
    const [meetingLink,setMeetingLink]=useState(null)



    const getFormattedOptions = () => {
        const newOptions = developerList?.developers?.map((item) => {
            return ({ label: item?.email, value: item.id })
        })
        return newOptions;
    }
    let id = location.pathname.split("/")[3];


    const [firstSlot, setFirstSlot] = useState("");
    const [secondSlot, setSecondSlot] = useState("");
    const [groupedTime, setGroupedTime] = useState([])
    const { timeZoneList } = useSelector((state) => state.clientData)

    useEffect(() => {
        dispatch(getTimeZoneList())
        dispatch(getDeveloperList())
    }, [])

    useEffect(() => {
        if (timeZoneList.length > 0) {
            let groupedTimeZones = timeZoneList?.map((item) => {
                return {
                    label: item?.country_name,
                    options: item?.timezones.map((it) => {
                        return { label: it, value: it }
                    }),
                }
            })
            setGroupedTime(groupedTimeZones)
        }
    }, [timeZoneList])
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                slots.push({ label: time, value: time });
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const handleFirstSlotChange = (event) => {
        const selectedTime = event.target.value;
        setFirstSlot(event.target.value);

        // Automatically set second slot to 1 hour after the first slot if not already set
        if (!secondSlot || selectedTime >= secondSlot) {
            const [selectedHour, selectedMinute] = selectedTime.split(":").map(Number);
            let newHour = selectedHour + 1;
            let newMinute = selectedMinute;

            if (newHour >= 24) {
                newHour = 23; // Set to the last available slot if it goes beyond 24 hours
                newMinute = 45;
            }

            const newTimeSlot = `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
            setSecondSlot(newTimeSlot);
        }
    };


    const handleSecondSlotChange = (event) => {
        console.log("secondSlot")
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
        setValue("meeting_time", duration.trim())
        return duration.trim();
    };

    // Filter second select options to be only after the first select value
    const filteredTimeSlots = timeSlots.filter(slot => !firstSlot || slot.label > firstSlot);

    const meetingTypeValue = watch('meeting_type')
    const onSubmit = (data) => {
        // setCreatedMeetings(data)
<<<<<<< HEAD
        console.log(data, "dat")
=======
        console.log(data,"dat")
>>>>>>> 6da675085c1e7f5e9496aa3b14b4eeb246530a6e
        if (type === "events") {
            let payload = {
                "title": data?.title,
            //     "developer_id": +data?.select_candidate?.value,
            //    "attendees": "attendee1@example.com,attendee2@example.com",
            //     "event_platform": data?.meeting_platform?.label,
            //     "event_type": data?.meeting_type,
            //     "event_date": data?.meeting_date,
            //     "event_time": data?.meeting_start_time,
            //     "event_end_time": data?.meeting_end_time,
            //     "time_zone": data?.time_zone?.label,
            //     "candidate_reminder": data?.candidate_reminder,
            //     "attendees_reminder": data?.interviewer_reminder,
            //     "type": "meeting",
            //     "event_link": "https://zoom.us/j/1234567890",
            //     "developer_email": "developer@example.com"
            "attendees": "attendee1@example.com, attendee2@example.com",
            "event_platform": "Zoom",
            "event_type": "scheduled",
            "event_date": "2024-07-25",
            "event_time": "10:00:00",
            "event_end_time": "11:00:00",
            "event_duration": "1h",
            "time_zone": "UTC",
            "candidate_reminder": true,
            "attendees_reminder": true,
            "type": "meeting",
            "event_link": "https://zoom.us/j/1234567890",
            "developer_email": "developer@example.com"
            }
            dispatch(postScheduleMeeting(payload, () => {
                dispatch(getAllEvents())
                handleClose()
            }))

        } else {
            let payload = {
                "job_id": +id,
                "developer_id": +data?.select_candidate?.value,
                "meeting_type": data?.meeting_type,
                "meeting_date": data?.meeting_date,
                "meeting_time": "01:00:00",
                "title": data?.title,
                "meeting_platform": data?.meeting_platform?.value,
                "meeting_link": "https://example.com/meeting-link",
                "status": "pending",
                "interviewers_list": data?.interviewers_list.map((item) => item.value).join(','),
                "candidate_reminder": data?.candidate_reminder,
                "interviewer_reminder": data?.interviewer_reminder,
                "time_zone": data?.time_zone?.label
            }
            dispatch(postCandidateInterview(payload))
        }

    };

    let r=watch("meeting_platform")
  useEffect(()=>{
  
    setThirdParty(r?.value=="google_meet"?true:false)
  },[r])

  const handleCloseThirdPary=()=>{
    setThirdParty(false)
  }

  const generateRequestId = () => {
    return `request_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;
};

  const syncCreatedMeetingsWithGoogle = (e) => {
    let summary = watch("title");
    console.log(summary, "sum");
    

    e.stopPropagation();
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        console.log('User not authenticated');
        return;
    }

    const newEvent = {
        'summary': summary || "Untitled Meeting",
        'location': "jkk",
        'description': "mmmm",
        'start': {
            'dateTime': "2024-08-26T16:50:00",
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': "2024-08-29T16:50:00",
            'timeZone': 'America/Los_Angeles',
        },
        'conferenceData': {
            'createRequest': {
                'requestId': generateRequestId(), // A unique string identifying this request. Use a unique value for each new event.
                'conferenceSolutionKey': {
                    'type': "hangoutsMeet" // Use Google Meet
                },
            }
        }
    };

    gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': newEvent,
        'conferenceDataVersion': 1, // Required to create Google Meet link
    }).then((response) => {
        console.log('Event created:', response.result);
        if (response.result.hangoutLink) {
            console.log('Google Meet link:', response.result.hangoutLink);
            setMeetingLink(response.result.hangoutLink)
        }
    }).catch((error) => {
        console.error('Error creating event:', error);
    });
};

  

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg" animation className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Schedule Meetings</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Row>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><BiFont /></span>Title</p>
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
                                    <p>{errors?.title?.message}</p>

                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Select Candidate</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div>
                                        {/* <Select isMulti /> */}
                                        <CommonInput
                                            name={"select_candidate"}
                                            type={"select2"}
                                            control={control}
                                            // selectOptions={[{ label: selectedDeveloper?.name ,value:selectedDeveloper?.id}]}
                                            rules={{ required: "This field is required" }}
                                            selectOptions={getFormattedOptions()}
                                            invalidFieldRequired={true}
                                            placeholder="Select Candidate"
                                        />
                                        <p>{errors?.interviewers_list?.message}</p>
                                    </div>
                                </Col>
                                {/* <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><FaUsers /></span>Interviewer's list</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div>
                                        <CommonInput
                                            name={"interviewers_list"}
                                            type={"multi-select"}
                                            control={control}
                                            selectOptions={[{ label: "JohnDoe@gmail.com", value: "JohnDoe@gmail.com" }, { label: "exapme@gmail.com", value: "example@gmail.com" }]}
                                            rules={{ required: "This field is required" }}
                                            invalidFieldRequired={true}
                                            placeholder="Select Interviewer"
                                        />
                                        <p>{errors?.select_candidate?.message}</p>
                                    </div>
                                </Col> */}
                              
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><FaClock /></span>Time and Date</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div>
                                        <div className="mb-2">
                                            <Form.Check
                                                type="radio"
                                                name="instant"
                                                label="Instant Meeting"
                                                id="instant_meeting"
                                                className="d-inline-block meeting-radio ps-0 me-2"
                                                value="instant"
                                                {...register("meeting_type")}

                                            />

                                            <Form.Check
                                                type="radio"
                                                name="scheduled"
                                                label="Scheduled Date & Time"
                                                id="scheduled"
                                                className="d-inline-block meeting-radio ps-0"
                                                value="scheduled"
                                                {...register("meeting_type")}
                                            />

                                        </div>
                                        {meetingTypeValue === 'scheduled' && (
                                            <div className="specific-datetime">
                                                <div className="d-flex align-items-center gap-3 mb-2">

                                                    <CommonInput
                                                        name={"meeting_start_time"}
                                                        type={"normal-select"}
                                                        control={control}
                                                        value={firstSlot}
                                                        options={timeSlots}
                                                        rules={{ required: "This field is required" }}
                                                        invalidFieldRequired={true}
                                                        defaultOption="Select Time"
                                                        onChange={handleFirstSlotChange}
                                                    />

                                                    <span className="arrow-icon">
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
                                                        onChange={handleSecondSlotChange}
                                                    />
                                                    <span className="font-14">{calculateDuration(firstSlot, secondSlot)}</span>
                                                </div>
                                                <div className="mb-2 datefield-wrapper">
                                                    {/* <DatePicker onChange={onChange} value={value} /> */}
                                                    <CommonInput
                                                        name={"meeting_date"}
                                                        type={"date"}
                                                        control={control}
                                                        rules={{ required: "This field is required" }}
                                                        invalidFieldRequired={true}

                                                    />{" "}
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

                                                    />

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><FaVideo /></span>Video Meeting Solution</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    {/* <Form.Select className="common-field font-14">
                                        <option>Rexett video meeting</option>
                                        <option>Google meet</option>
                                        <option>Microsoft team</option>
                                    </Form.Select> */}
                                    <CommonInput
                                        name={"meeting_platform"}
                                        type={"select"}
                                        control={control}
                                        selectOptions={VIDEO_MEETING}
                                        rules={{ required: "This field is required" }}
                                        invalidFieldRequired={true}
                                        placeholder="Video Meeting"
                                    />{" "}
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><IoAlarm /></span>Reminders</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="mb-2">
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            {/* <img src={} /> */}
                                            <label className="font-14 mb-0 cursor-pointer" htmlFor="candidate-reminder">Candidate reminder</label>
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
                                        <p className="font-13">Send an email reminder to the candidate 24 hours before the event</p>
                                    </div>
                                    <div>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            {/* <img src={} /> */}
                                            <label className="font-14 mb-0 cursor-pointer" htmlFor="client-reminder">Interviewer reminder</label>
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
                                        <p className="font-13">Send an email reminder to the interviewers 24 hours before the event</p>
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
                            />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <ThirdPartyServices show={thirdParty} handleClose={handleCloseThirdPary} text={"Link With Google"} syncCreatedMeetingsWithGoogle={syncCreatedMeetingsWithGoogle} meetingLink={meetingLink}/>
        </>
    )
}
export default Schedulemeeting;