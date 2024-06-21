import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BiFont } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
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
const Schedulemeeting = ({ show, handleClose }) => {
    const [value, onChange] = useState(new Date());
    const [firstSlot, setFirstSlot] = useState("");
    const [secondSlot, setSecondSlot] = useState("");

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                slots.push(time);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const handleFirstSlotChange = (event) => {
        const selectedTime = event.target.value;
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
    const filteredTimeSlots = timeSlots.filter(slot => !firstSlot || slot > firstSlot);

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

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg" animation className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Schedule Meeting</h3>
                    <Form>
                        <div>
                            <Row>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Developer Name</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="d-flex align-items-center gap-3 client-imgbx">
                                        <img src={devImg} />
                                        <p className="font-14 mb-0">Rohit Sharma</p>
                                    </div>
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><BiFont /></span>Title</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div>
                                        <Form.Control type="text" className="common-field font-14" placeholder="Add title" />
                                    </div>
                                </Col>
                                {/* <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Client</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="d-flex align-items-center gap-3 client-imgbx">
                                        <img src={clientImg} />
                                        <p className="font-14 mb-0">Amazon</p>
                                    </div>
                                </Col> */}
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><FaVideo /></span>Video Meeting Solution</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="d-flex align-items-center gap-3 video-meetbx">
                                        <img src={rexettLogo} />
                                        <p className="font-14 mb-0">Video Meeting (Rexett)</p>
                                    </div>
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><FaClock /></span>Time and Date</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="d-flex align-items-center gap-3 mb-2">
                                        <Form.Select
                                            className="common-field font-14 w-auto"
                                            value={firstSlot}
                                            onChange={handleFirstSlotChange}
                                        >
                                            <option value="">Select Time</option>
                                            {timeSlots.map((slot, index) => (
                                                <option key={index} value={slot}>
                                                    {slot}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <span className="arrow-icon">
                                            <FaArrowRightLong />
                                        </span>
                                        <Form.Select
                                            className="common-field font-14 w-auto"
                                            value={secondSlot}
                                            onChange={handleSecondSlotChange}
                                        >
                                            <option value="">Select Time</option>
                                            {filteredTimeSlots.map((slot, index) => (
                                                <option key={index} value={slot} disabled={slot === firstSlot}>
                                                    {slot}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <span className="font-14">{calculateDuration(firstSlot, secondSlot)}</span>
                                    </div>
                                    <div className="mb-2 datefield-wrapper">
                                        <DatePicker onChange={onChange} value={value} />
                                    </div>
                                    <div>
                                        <Form.Select className="common-field font-14">
                                            {timeZones.map((zone, index) => (
                                                <option key={index} value={zone.value}>
                                                    {zone.label}
                                                </option>
                                            ))}
                                        </Form.Select>
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
                                                />
                                            </div>
                                        </div>
                                        <p className="font-13">Send an email reminder to the candidate 24 hours before the event</p>
                                    </div>
                                    <div>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            {/* <img src={} /> */}
                                            <label className="font-14 mb-0 cursor-pointer" htmlFor="client-reminder">Client reminder</label>
                                            <div class="form-check form-switch toggle-switch-wrapper">
                                                <input
                                                    class="form-check-input toggle-switch-custom shadow-none  cursor-pointer"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="client-reminder"
                                                />
                                            </div>
                                        </div>
                                        <p className="font-13">Send an email reminder to the client 24 hours before the event</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="text-center">
                            <Button variant="transparent" onClick= {() => { handleClose(); meetingToast(); }} className="main-btn px-4 font-14 fw-semibold">Send Invite</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Schedulemeeting;