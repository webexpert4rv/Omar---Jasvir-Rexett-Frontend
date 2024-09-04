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
import { Controller, useForm } from "react-hook-form";
import Calendar from "react-calendar";
import CommonInput from "../../../components/atomic/CommonInput";
import Select from "react-select";
import { VIDEO_MEETING } from "../../../helper/constant";
import RexettButton from "../../../components/atomic/RexettButton";
import { deleteEvent, getAllEvents, getSelectedEvent, getToDoById, getUpdatedDetails, updateEvent } from "../../../redux/slices/adminDataSlice";
import moment from "moment";
import ConfirmationModal from "../../../components/common/Modals/ConfirmationModal";



const interviewOptions = [{ label: "JohnDoe@gmail.com", value: "JohnDoe@gmail.com" }, { label: "exapme@gmail.com", value: "example@gmail.com" }]
const MeetingInfo = ({ show, handleClose, details }) => {
    const [value, onChange] = useState(new Date());
    const dispatch = useDispatch()
    const { developerList } = useSelector(state => state.adminData)
    const [deleteModal, setDeleteModal] = useState(false)
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
    console.log(details, "details")
    console.log(selectedDeveloper, "selectedDeveloper")
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
            "attendees": "attendee1@example.com, attendee2@example.com",
            "event_platform": data?.meeting_platform?.label,
            "event_type": data?.meeting_type,
            "event_date": data?.meeting_date,
            "event_time": data?.meeting_time,
            "time_zone": data?.time_zone?.label,
            "candidate_reminder": data?.candidate_reminder,
            "attendees_reminder": data?.interviewer_reminder,
            "type": "meeting",
            "event_link": data?.event_link
        }
        dispatch(updateEvent(details.id, payload))
        handleClose()

    }
    const handleDeleteAction = () => {
        dispatch(deleteEvent(details?.id, () => {
            dispatch(getAllEvents())
        }))
        setDeleteModal(!deleteModal)
    }
    console.log(deleteModal, "deleteModal")
    const handleToggleModal = () => {
        handleClose()
        setDeleteModal(!deleteModal)
    }
    const getFormattedOptions = () => {
        const newOptions = developerList?.developers?.map((item) => {
            return ({ label: item?.email, value: item.id })
        })
        return newOptions;
    }
    const options = getFormattedOptions();
    const refreshedDate = ((details?.event_date)?.slice(0, 10));
    console.log(refreshedDate, "refreshedDate");
    // const getInterviewList = () => {
    //     const selectedInterviewers = details?.attendees?.map(itm => itm?.email)
    //     return selectedInterviewers
    // }
    console.log(selectedDeveloper, "selectedDeveloper")

    const baseDate = '1970-01-01';
    const startTime = moment(`${baseDate}T${details?.event_time}`);
    const endTime = moment(`${baseDate}T${details?.event_end_time}`);
    console.log(details?.event_time, "start_time")
    console.log(details?.event_end_time, "end_time")
    console.log(endTime, "endTime")
    console.log(startTime, "startTime")



    const duration = moment.duration(endTime.diff(startTime));

    console.log(duration.hours(), "hours");
    console.log(duration.minutes(), "minutes");
    console.log(duration.seconds(), "seconds");




    // const differenceInMilliseconds = endTime - startTime;
    // const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    // const hours = Math.floor(differenceInSeconds / 3600);
    // const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    // const seconds = differenceInSeconds % 60;






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
                                        <Form.Group>
                                            <Form.Label className="font-14 schedule-heading"><span><RiUser3Fill /></span>Developer Name</Form.Label>
                                        </Form.Group>
                                    </div>
                                </Col>

                                <Col lg={8} className="mb-3">
                                    <div className="d-flex flex-wrap w-100 gap-2 align-items-start">
                                        <Form.Group controlId="select_candidate">
                                            <Controller
                                                name="select_candidate"
                                                control={control}
                                                defaultValue={selectedDeveloper ? selectedDeveloper.email : ""}
                                                rules={{ required: "Select candidate is required" }}
                                                render={({ field }) => (
                                                    <Form.Select
                                                        {...field}
                                                        isInvalid={!!errors.select_candidate}
                                                        className="common-field font-14"
                                                    >
                                                        {options?.map((option, idx) => (
                                                            <option key={idx} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                )}
                                            />
                                            {errors.select_candidate && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.select_candidate.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <Form.Label className="font-14 schedule-heading"><FaVideo /> Video Meeting Solution</Form.Label>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-3 video-meetbx">
                                            <img src={rexettLogo} />
                                            <Form.Group controlId="meetingPlatform">
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
                                    <div className="">
                                        <div className="meeting-booking">
                                            <div className="mb-2 datefield-wrapper">
                                                {/* <DatePicker onChange={onChange} value={value} /> */}
                                                <Form.Control
                                                    type="date"
                                                    className="common-field font-14"
                                                    defaultValue={refreshedDate ? refreshedDate : ""}
                                                    max={
                                                        new Date().toISOString().split("T")[0]
                                                    }
                                                    placeholder="yyyy-mm-dd"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 associate p-3">
                                            <p className="font-14 mb-0">{details?.event_time}</p>
                                            <span className="arrow-icon">
                                                <FaArrowRightLong />
                                            </span>
                                            <p className="font-14 mb-0">{details?.event_end_time}</p>
                                            <p className="mb-0">Duration</p>
                                            <span className="font-14">{duration.hours()}:{duration.minutes()}:{duration.seconds()}</span>
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
                                    type="button"
                                    variant="transparent"
                                    className="cancel-btn font-14"
                                    text={"Cancel Meeting"}
                                    onClick={handleToggleModal}

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
            <ConfirmationModal text={"Are you sure, you want to delete this meeting. "} handleAction={handleDeleteAction} show={deleteModal} handleClose={handleToggleModal} />
            {/* {
                employeeList?.map(({ name }) => (
                    <div>
                        {name}
                    </div>
                ))
            } */}
        </>
    )
}
export default MeetingInfo;