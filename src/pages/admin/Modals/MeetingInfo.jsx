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
import { VIDEO_MEETING } from "../../../helper/constant";
import RexettButton from "../../../components/atomic/RexettButton";
import { deleteEvent, getAllEvents, getToDoById, getUpdatedDetails, updateEvent } from "../../../redux/slices/adminDataSlice";

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


    useEffect(() => {
        if (details) {
            dispatch(getUpdatedDetails(details?.id, (data) => {
                console.log(data, "data")
            }))
        }

    }, [dispatch, details])


    // useEffect(()=>{
    //     console.log(details,"details")
    //     if(details){
    //     setValue("meeting_platform",details?.meeting_platform)
    //     setValue("title",details?.title)
    //     if(key === "event_platform"){
    //         setValue(key,details.meeting_platform?.label)
    //     }





    //     setValue("developer_id",details?.developer_id)
    //     setValue("event_type",details?.meeting_type)
    //     setValue("event_date",details?.meeting_date)
    //     setValue("developer_id",details?.developer_id)
    //     setValue("time_zone",details?.time_zone?.label)
    //     // setValue("attendees",details?.interviewers_list[0]?.label)
    //     }
    // },[details])
    
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
            console.log(item?.email, "itemmmmmm---")
            return ({ label: item?.email, value: item.id })
        })
        return newOptions;
    }
    console.log(developerList, "developerList")
    const selectedDeveloper = developerList?.developers?.find(val => val?.id == details?.developer_id)
    console.log(selectedDeveloper, "helloMeeting")
    console.log(details, "details")
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
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Developer Name</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="d-flex align-items-center gap-3 client-imgbx">
                                        <img src={devImg} />
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
                                        {/* <p className="font-14 mb-0">{selectedDeveloper?.name}</p> */}
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
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><RiUser3Fill /></span>Interviewer's List</p>
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="d-flex flex-wrap gap-2 align-items-start">
                                        {/* {details?.attendees?.map((item, idx) => {
                                            return (
                                                <div className="associate-text d-inline-block">
                                                    <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                                        <img src={devImg} />
                                                        <p className="mb-0">{item?.email}</p>
                                                    </div>
                                                </div>)
                                        })} */}
                                        <CommonInput
                                            name={"interviewers_list"}
                                            type={"multi-select"}
                                            control={control}
                                            selectOptions={[{ label: "JohnDoe@gmail.com", value: "JohnDoe@gmail.com" }, { label: "exapme@gmail.com", value: "example@gmail.com" }]}
                                            rules={{ required: "This field is required" }}
                                            invalidFieldRequired={true}
                                            placeholder="Select Interviewer"
                                        />
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
                                    </div> */}
                                        {/* <div className="associate-text d-inline-block">
                                        <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                                            <span className="prefix-latter">RG</span>
                                            <p className="mb-0">robingautam@gmail.com</p>
                                        </div>
                                    </div> */}
                                    </div>
                                </Col>
                                <Col lg={4} className="mb-lg-3 mb-1">
                                    <p className="font-14 schedule-heading"><span><FaVideo /></span>Video Meeting Solution</p>
                                    {/* <Form.Control type="text" className="shadow-none search-dev-field" placeholder="Search Developer" /> */}
                                </Col>
                                <Col lg={8} className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-3 video-meetbx">
                                            <img src={rexettLogo} />
                                            {/* <p className="font-14 mb-0">{details?.event_platform}</p> */}
                                            <CommonInput
                                                name={"meeting_platform"}
                                                type={"select"}
                                                control={control}
                                                selectOptions={VIDEO_MEETING}
                                                rules={{ required: "This field is required" }}
                                                invalidFieldRequired={true}
                                                placeholder="Video Meeting"
                                            />
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
                                            {/* <p className="font-14 mb-0">{details?.event_date?.slice(0, 10)}</p> */}
                                            {/* <Calendar onChange={onChange} value={value}

                                                tileClassName={({ date, view }) => {
                                                    // Add class to event dates
                                                    // if (view === 'month' && isEventDate(date)) {
                                                    //     return 'event-date';
                                                    // }
                                                }}

                                            /> */}
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
                                        </div>
                                        <div className="d-flex align-items-center gap-2 associate">
                                            <p className="font-14 mb-0">18:30</p>
                                            <span className="arrow-icon">
                                                <FaArrowRightLong />
                                            </span>
                                            <p className="font-14 mb-0">19:30</p>
                                            <span className="font-14">1h</span>
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