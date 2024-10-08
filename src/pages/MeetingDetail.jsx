import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BiFont } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import clientImg from '../assets/img/amazon.png';
import rexettLogo from '../assets/img/favicon.png';
import devImg from '../assets/img/demo-img.jpg'
import { FaRegCopy } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import logoRexett from '../assets/img/rexett-logo.png';
import { toast } from 'react-toastify';
import RexettButton from "../components/atomic/RexettButton";
import axios from "axios";
const MeetingDetail = () => {
 const [meetingDetails,setMeetingDetails]=useState({});
 const [isAcceptorReject,setAcceptReject]=useState("accept");
 const [reason, setReason] = useState("");
 const [nextAvailableDate, setNextAvailableDate] = useState("");
 const [loading, setLoading] = useState(false);

  const {search}=useLocation()
  let id=search?.split("=")[2];
  let tokenEmp=search?.split("=")[1];
  let token=tokenEmp?.split("&")[0];    

    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BASE_URL}/common/interview/${id}`).then((dat)=>{
        setMeetingDetails(dat?.data?.data)
      });
    },[])

    const handleAcceptReject=(status)=>{
        setAcceptReject(status)
    }

    const handleSubmit = () => {
        setLoading(true);
      if (isAcceptorReject == "reject") {
        let rejectPayload = {
          interview_id: id,
          reason: reason,
          next_available_date: nextAvailableDate,
          token: token,
        };
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/developer/interviews/decline`,
            rejectPayload
          )
          .then((dat) => {
            toast.success("Interview declined successfully", {
              position: "top-center",
            });
              setLoading(false);
          });
      } else {
        let payload = {
          interview_id: id,
          token: token,
        };
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/developer/interviews/accept`,
            payload
          )
          .then((dat) => {
            toast.success("Interview accepted successfully", {
              position: "top-center",
            });
              setLoading(false);
          });
      }
    
    };
    

    return (
      <>
        {/* <div className="header-single">
                <img src={logoRexett} />
            </div> */}
        <div className="px-3 single-page-wrapper">
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="card-box">
                <h3 className="text-center mb-4">Meeting Details</h3>
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
                      <div>{meetingDetails?.title}</div>
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
                        <img src={devImg} />
                        <p className="font-14 mb-0">
                          {meetingDetails?.developer_name}
                        </p>
                      </div>
                    </Col>
                    <Col lg={4} className="mb-lg-3 mb-1">
                      <p className="font-14 schedule-heading">
                        <span>
                          <RiUser3Fill />
                        </span>
                        Interviewer's List
                      </p>
                    </Col>
                    <Col lg={8} className="mb-3">
                      <div className="d-flex flex-wrap gap-2 align-items-start">
                        <div className="associate-text d-inline-block">
                          <div className="associate p-2 rounded-full d-inline-flex align-items-center gap-3 interview-imgbx">
                            <img src={devImg} />
                            <p className="mb-0">
                              {meetingDetails?.interviewers_list}
                            </p>
                          </div>
                        </div>
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
                          <p className="font-14 mb-0">{meetingDetails?.meeting_platform}</p>
                        </div>
                        <div>
                          <Button variant="transparent" className="copy-link">
                            <FaRegCopy />
                          </Button>
                          <Link
                            to={meetingDetails?.meeting_link}
                            target="_blank"
                            variant="transparent"
                            className="text-decoration-none main-btn font-14 py-2"
                          >
                            <FaVideo /> Join
                          </Link>
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
                          <p className="font-14 mb-0">
                            {meetingDetails?.meeting_date}
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 associate">
                          <p className="font-14 mb-0">
                            {meetingDetails?.meeting_time}
                          </p>
                          {/* <span className="arrow-icon">
                                                    <FaArrowRightLong />
                                                </span>
                                                <p className="font-14 mb-0">19:30</p>
                                                <span className="font-14">1h</span> */}
                        </div>
                      </div>
                    </Col>

                    <Col lg={4} className="mb-lg-3 mb-1">
                      <p className="font-14 schedule-heading">
                        <span>
                          <FaClock />
                        </span>
                        Time Zone
                      </p>
                    </Col>
                    <Col lg={8} className="mb-3 associate-text">
                      <div className="d-inline-flex align-items-center gap-2">
                        <div className="datefield-wrapper associate">
                          <p className="font-14 mb-0">
                            {meetingDetails?.time_zone}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="d-flex justify-content-center gap-3 align-items-center">
                  <p className="mb-0">Attend Meeting</p>
                  <div>
                    <Button
                      variant="transparent"
                      className="cancel-btn font-14 px-4"
                      onClick={() => handleAcceptReject("reject")}
                    >
                      No
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="transparent"
                      className="main-btn font-14 px-4"
                      onClick={() => handleAcceptReject("accept")}
                    >
                      Yes
                    </Button>
                  </div>
                </div>
                <div>
                  {isAcceptorReject == "reject" ? (
                    <>
                      <Form.Label className="font-14">Reason</Form.Label>
                      <Form.Control
                        type="text"
                        className="common-field font-14 mb-2"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <Form.Label className="font-14">
                        Select Date for next availability
                      </Form.Label>
                      <Form.Control
                        type="date"
                        className="common-field font-14 mb-2"
                        value={nextAvailableDate}
                        onChange={(e) => setNextAvailableDate(e.target.value)}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  <div className="mt-3">
                    <RexettButton
                    type="submit"
                    text={"Submit"}
                    className="main-btn px-4"
                    variant="transparent"
                    disabled={loading}
                    isLoading={loading}
                    onClick={handleSubmit}
                  />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
}
export default MeetingDetail;