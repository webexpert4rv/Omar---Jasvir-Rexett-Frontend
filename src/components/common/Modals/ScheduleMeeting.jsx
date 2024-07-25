import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BiFont } from "react-icons/bi";
import { FaArrowRightLong, FaUsers } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { IoAlarm } from "react-icons/io5";
import clientImg from '../../../assets/img/amazon.png';
import rexettLogo from '../../../assets/img/favicon.png';
import devImg from '../../../assets/img/demo-img.jpg'
import DatePicker from 'react-date-picker';
import { FaVideo } from "react-icons/fa6";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import CommonInput from "../../atomic/CommonInput";
import { useForm } from "react-hook-form";
import RexettButton from "../../atomic/RexettButton";
import { VIDEO_MEETING } from "../../../helper/constant";
const Schedulemeeting = ({ show, handleClose }) => {
    const {
        handleSubmit,
        register,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm({});

    const [value, onChange] = useState(new Date());
    const [firstSlot, setFirstSlot] = useState("");
    const [secondSlot, setSecondSlot] = useState("");

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
        console.log(selectedTime,"selectedTime")
        setFirstSlot(selectedTime);

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
        return duration.trim();
    };

    // Filter second select options to be only after the first select value
    const filteredTimeSlots = timeSlots.filter(slot => !firstSlot || slot.label > firstSlot);

    const timeZones = [
        { value: "UTC-12:00", label: "UTC-12:00" },
        { value: "UTC-11:00", label: "UTC-11:00" },
        { value: "UTC-10:00", label: "UTC-10:00" },
        { value: "UTC-09:00", label: "UTC-09:00" },
        { value: "UTC-08:00", label: "UTC-08:00" },
        { value: "UTC-07:00", label: "UTC-07:00" },
        { value: "UTC-06:00", label: "UTC-06:00" },
        { value: "UTC-05:00", label: "UTC-05:00" },
        { value: "UTC-04:00", label: "UTC-04:00" },
        { value: "UTC-03:00", label: "UTC-03:00" },
        { value: "UTC-02:00", label: "UTC-02:00" },
        { value: "UTC-01:00", label: "UTC-01:00" },
        { value: "UTC+00:00", label: "UTC+00:00" },
        { value: "UTC+01:00", label: "UTC+01:00" },
        { value: "UTC+02:00", label: "UTC+02:00" },
        { value: "UTC+03:00", label: "UTC+03:00" },
        { value: "UTC+04:00", label: "UTC+04:00" },
        { value: "UTC+05:00", label: "UTC+05:00" },
        { value: "UTC+06:00", label: "UTC+06:00" },
        { value: "UTC+07:00", label: "UTC+07:00" },
        { value: "UTC+08:00", label: "UTC+08:00" },
        { value: "UTC+09:00", label: "UTC+09:00" },
        { value: "UTC+10:00", label: "UTC+10:00" },
        { value: "UTC+11:00", label: "UTC+11:00" },
        { value: "UTC+12:00", label: "UTC+12:00" },
        { value: "UTC+13:00", label: "UTC+13:00" },
        { value: "UTC+14:00", label: "UTC+14:00" },
    ];
    const meetingToast = () => {
        toast("Meeting Scheduled");
    }

    const [meetingType, setMeetingType] = useState('instant'); // initial state set to 'instant'

    const handleMeetingTypeChange = (e) => {
        setMeetingType(e.target.id);
    };
    const meetingTypeValue = watch('meeting_type')
    console.log(meetingTypeValue, "meetingTypeValue")

    const onSubmit = data => {
        console.log(data);
    };

    console.log(timeSlots, "timeSlots")

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
                                        />{" "}
                                    </div>

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
                                            selectOptions={[{ label: "John Doe", value: "658" }]}
                                            rules={{ required: "This field is required" }}
                                            invalidFieldRequired={true}
                                            placeholder="Select Candidate"
                                        />{" "}
                                    </div>
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><FaUsers /></span>Interviewer's list</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div>
                                        {/* <CreatableSelect isMulti /> */}
                                        <CommonInput
                                            name={"interviewers_list"}
                                            type={"multi-select"}
                                            control={control}
                                            selectOptions={[{ label: "JohnDoe@gmail.com", value: "JohnDoe@gmail.com" }, { label: "exapme@gmail.com", value: "example@gmail.com" }]}
                                            rules={{ required: "This field is required" }}
                                            invalidFieldRequired={true}
                                            placeholder="Select Interviewer"
                                        />{" "}
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
                                        name={"candidate"}
                                        type={"select"}
                                        control={control}
                                        selectOptions={VIDEO_MEETING}
                                        rules={{ required: "This field is required" }}
                                        invalidFieldRequired={true}
                                        placeholder="Video Meeting"
                                    />{" "}
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><FaClock /></span>Time and Date</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div>
                                        <div className="mb-2">
                                            <Form.Check
                                                type="radio"
                                                name="instant_meeting"
                                                label="Instant Meeting"
                                                id="instant_meeting"
                                                className="d-inline-block meeting-radio ps-0 me-2"
                                                value="instant_meeting"
                                                {...register("meeting_type")}
                                                defaultChecked
                                            />

                                            <Form.Check
                                                type="radio"
                                                name="specific_meeting"
                                                label="Specific Date & Time"
                                                id="specific_meeting"
                                                className="d-inline-block meeting-radio ps-0"
                                                value="specific_meeting"
                                                {...register("meeting_type")}
                                            />

                                        </div>
                                        {meetingTypeValue === 'specific_meeting' && (
                                            <div className="specific-datetime">
                                                <div className="d-flex align-items-center gap-3 mb-2">
                                        
                                                    <CommonInput
                                                        name={"meeting_time"}
                                                        type={"normal-select"}
                                                        control={control}
                                                        value={firstSlot}
                                                        options={timeSlots}
                                                        rules={{ required: "This field is required" }}
                                                        invalidFieldRequired={true}
                                                        defaultOption = "Select Time"
                                                        onChange={handleFirstSlotChange}
                                                    />{" "}

                                                    <span className="arrow-icon">
                                                        <FaArrowRightLong />
                                                    </span>

                                                    <CommonInput
                                                        name={"candidate"}
                                                        type={"normal-select"}
                                                        control={control}
                                                        value={secondSlot}
                                                        options={filteredTimeSlots}
                                                        rules={{ required: "This field is required" }}
                                                        invalidFieldRequired={true}
                                                       defaultOption = "Select Time"
                                                        onChange={handleSecondSlotChange}
                                                    />{" "}
                                                    <span className="font-14">{calculateDuration(firstSlot, secondSlot)}</span>
                                                </div>
                                                <div className="mb-2 datefield-wrapper">
                                                    {/* <DatePicker onChange={onChange} value={value} /> */}
                                                    <CommonInput
                                                        name={"candidate"}
                                                        type={"date"}
                                                        control={control}
                                                        rules={{ required: "This field is required" }}
                                                        invalidFieldRequired={true}
                                                        placeholder="Time zone"
                                                    />{" "}
                                                </div>
                                                <div>

                                                    <CommonInput
                                                        name={"candidate"}
                                                        type={"select"}
                                                        control={control}
                                                        rules={{ required: "This field is required" }}
                                                        invalidFieldRequired={true}
                                                        placeholder="Time zone"
                                                    />{" "}

                                                </div>
                                            </div>
                                        )}
                                    </div>
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
        </>
    )
}
export default Schedulemeeting;