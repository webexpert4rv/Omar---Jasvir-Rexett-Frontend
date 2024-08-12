import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
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
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Calendar from "react-calendar";
import CommonInput from "../../../components/atomic/CommonInput";
import Select from "react-select";
import { VIDEO_MEETING } from "../../../helper/constant";
import RexettButton from "../../../components/atomic/RexettButton";
import { deleteEvent, getAllEvents, getSelectedEvent, getToDoById, getUpdatedDetails, updateEvent } from "../../../redux/slices/adminDataSlice";
import moment from "moment";



const interviewOptions = [{ label: "JohnDoe@gmail.com", value: "JohnDoe@gmail.com" }, { label: "exapme@gmail.com", value: "example@gmail.com" }]
const MeetingInfo = ({ show, handleClose, details }) => {
    const [value, onChange] = useState(new Date());
    const dispatch = useDispatch()
    const { developerList } = useSelector(state => state.adminData)
    const {
        register,
        setValue,
        handleSubmit,
        control,
        watch,
        clearErrors,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});
    const selectedDeveloper = developerList?.developers?.find(val => val?.id == details?.developer_id)
    useEffect(() => {
        if (details) {
            dispatch(getSelectedEvent(details.id, (data) => {
                console.log(data, "data");

                // Iterate over data keys to set form values
                for (let key in data) {
                    switch (key) {
                        case "developer_id":
                            setValue("select_candidate", selectedDeveloper?.email || '');
                            break;
                        case "attendees":
                            if (data.attendees && data.attendees.length > 0) {
                                setValue("interviewers_list", data.attendees[0]?.email || '');
                            }
                            break;
                        case "event_platform":
                            setValue("meeting_platform", data[key]);
                            break;
                        default:
                            setValue(key, data[key]);
                            break;
                    }
                }
            }));
            // setValue("meeting_platform", details?.event_platform)
            setValue("title", details?.title)
        }
    }, [dispatch, details, selectedDeveloper, setValue]);


    const onSubmit = (data) => {
        console.log(data, "data")
        let payload = {
            "title": data?.title,
            "developer_id": +data?.select_candidate?.value,
            "attendees": [
                {
                    "email": data?.interviewers_list[0]?.label
                }
            ],
            "event_platform": data?.meeting_platform?.label,
            "event_type": data?.meeting_type,
            "event_date": data?.meeting_date,
            "event_time": data?.meeting_time,
            "time_zone": data?.time_zone?.label,
            "candidate_reminder": data?.candidate_reminder,
            "attendees_reminder": data?.interviewer_reminder,
            "type": "meeting",
            "event_link": "https://zoom.us/j/1234567890"
        }
        dispatch(updateEvent(details.id, payload))
        handleClose()

    }
    const handleDeleteAction = () => {
        dispatch(deleteEvent(details?.id, () => {
            dispatch(getAllEvents())
        }))
        handleClose()
    }
    const getFormattedOptions = () => {
        const newOptions = developerList?.developers?.map((item) => {
            return ({ label: item?.email, value: item.id })
        })
        return newOptions;
    }
    const options = getFormattedOptions();
    const refreshedDate =((details?.event_date)?.slice(0, 10));
    console.log(refreshedDate, "refreshedDate");
    const getInterviewList=()=>{
        const selectedInterviewers = details?.attendees?.map(itm=>itm?.email)
        return selectedInterviewers
    }
    console.log(selectedDeveloper, "selectedDeveloper")
    return (
        <>
            <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <h3 className="popup-heading">Meeting Details</h3>

                        <div>
                            <Row>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><BiFont /></span>Title</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div>
                                        <CommonInput
                                            name={"title"}
                                            type="text"
                                            control={control}
                                            rules={{ required: "This field is required" }}
                                            invalidFieldRequired={true}
                                            placeholder="Add title"
                                        />
                                        {/* {details?.title} */}
                                    </div>
                                </Col>
                                {/* <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Developer Name</p>
                                </Col> */}
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <div className="d-flex align-items-center gap-3 client-imgbx">
                                        {/* <img src={devImg} /> */}
                                        <Form.Group controlId="select_candidate">
                                            <Form.Label className="font-14 schedule-heading"><span><RiUser3Fill /></span>Developer Name</Form.Label>
                                            <Form.Select
                                                {...register("select_candidate", {
                                                    required: "select_candidate is required",
                                                })}
                                                // className={`common-field font-14 ${errors.select_candidate ? 'is-invalid' : ''}`}
                                                // isInvalid={!!errors.select_candidate}
                                            >
                                                {options?.map((option, idx) => (
                                                    <option key={idx} value={selectedDeveloper ? selectedDeveloper?.email :option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                               
                                            </Form.Select>
                                            {errors.select_candidate && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.select_candidate.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>              
                                    </div>
                                </Col>

                                <Col lg={8} className="mb-3">
                                    <div className="d-flex flex-wrap gap-2 align-items-start">
                                        <Form.Group controlId="meetingPlatform">
                                            <Form.Label className="font-14 schedule-heading"><span><RiUser3Fill /></span>Interviewer's List</Form.Label>
                                            <Form.Select
                                                {...register("interviewers_list", {
                                                    required: "Meeting platform is required",
                                                })}
                                                className={`common-field font-14 ${errors.meeting_platform ? 'is-invalid' : ''}`}
                                                isInvalid={!!errors.meeting_platform}
                                            >
                                                {interviewOptions?.map((option, idx) => (
                                                    <option key={idx} value={details? getInterviewList(): option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.meeting_platform && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.meeting_platform.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-3 video-meetbx">
                                            <img src={rexettLogo} />
                                            <Form.Group controlId="meetingPlatform">
                                                <Form.Label className="font-14 schedule-heading">Video Meeting Solution</Form.Label>
                                                <Form.Select
                                                    {...register("meeting_platform", {
                                                        required: "Meeting platform is required",
                                                    })}
                                                    className={`common-field font-14 ${errors.meeting_platform ? 'is-invalid' : ''}`}
                                                    isInvalid={!!errors.meeting_platform}
                                                >
                                                    {VIDEO_MEETING.map((option, idx) => (
                                                        <option key={idx} value={details ? details?.event_platform : option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                {errors.meeting_platform && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.meeting_platform.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Button variant="transparent" className="copy-link">
                                                <FaRegCopy />
                                            </Button>
                                            <Link to={'/video-screen'} target="_blank" variant="transparent" className="text-decoration-none main-btn font-14 py-2">
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
                                        <div className="meeting-booking">
                                            <div className="mb-2 datefield-wrapper">
                                                {/* <DatePicker onChange={onChange} value={value} /> */}
                                                <Form.Control
                                                    type="date"
                                                    value={refreshedDate}
                                                    max={
                                                        new Date().toISOString().split("T")[0]
                                                    }
                                                      placeholder="yyyy-mm-dd"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 associate">
                                            <p className="font-14 mb-0">{details?.event_time}</p>
                                            <span className="arrow-icon">
                                                <FaArrowRightLong />
                                            </span>
                                            <p className="font-14 mb-0">{details?.event_end_time}</p>
                                            {/* <span className="font-14">{details?.event_end_time}-{details?.event_time}</span> */}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading">Status</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <span className="status-finished mb-2">Accepted</span>
                                    <div className="">
                                        <span className="status-rejected mb-2">Declined</span>
                                        <div>
                                            <p className="fw-semibold font-14 mb-1">Reason</p>
                                            <p className="font-14 mb-0">I have some urgent work, need to go out of station. So I'll be available on <strong>25-06-2024</strong></p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <RexettButton
                                    variant="transparent"
                                    className="cancel-btn font-14"
                                    text={"Cancel Meeting"}
                                    onClick={handleDeleteAction}

                                />
                            </div>
                            <div>
                                <RexettButton
                                    variant="transparent"
                                    className="outline-main-btn font-14"
                                    type="submit"
                                    text={"Edit Meeting"}

                                />
                            </div>
                        </div>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    )
}
export default MeetingInfo;