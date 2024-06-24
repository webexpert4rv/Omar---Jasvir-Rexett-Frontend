import React, { useState } from "react";
import interviewVideo from '../../assets/img/interview-video.mp4';
import { HiDownload } from "react-icons/hi";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineOndemandVideo } from "react-icons/md";
import 'react-circular-progressbar/dist/styles.css';
import ClientAddOtherSkill from "./Modals/ClientAddOtherSkill";
const ClientInterviewFeedback = () => {
    const [showAddSkill, setShowAddSkill] = useState(false);
    const handleShowOtherSkill = () => {
        setShowAddSkill(!showAddSkill);
    }
    const handleCloseOtherSkill = () => {
        setShowAddSkill(false);
    }
    return (
        <>
            <div className="card-box">
                <div className="border-bottom-grey pb-3 mb-4 d-flex justify-content-between align-items-center">
                    <h2 className="section-head border-0 mb-0 pb-0">Interview Detail</h2>
                    <div>
                        <Button className="main-btn font-14 me-2 py-2"><span className="font-18 me-1"><MdOutlineOndemandVideo /></span> Playback</Button>
                        <Button className="main-btn font-14 py-2"><span className="font-18 me-1"><TbFileDescription /></span>Transcript</Button>
                    </div>
                </div>
                <div className="interview-details mb-4">
                    <div>
                        <h4 className="detail-name">Project Name</h4>
                        <p className="detail-info">Figma to UI</p>
                    </div>

                    <div>
                        <h4 className="detail-name">Developer Name</h4>
                        <p className="detail-info">Rohit Sharma</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Client Name</h4>
                        <p className="detail-info">Amazon</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Interviewer Name</h4>
                        <p className="detail-info">James Williams</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Date</h4>
                        <p className="detail-info">11-06-2024</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Time</h4>
                        <p className="detail-info">11:30AM - 12:30PM</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Duration</h4>
                        <p className="detail-info">45 mins</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Status</h4>
                        <span className="status-finished">Completed</span>
                    </div>
                </div>
                <h3 className="section-subhead mb-3">Interviewer's Decision</h3>
                <div className="d-flex align-items-center gap-3 mb-4">
                    {/* <Form.Select className="common-field font-14 w-auto">
                        <option value="">Select Decision</option>
                        <option value="selected">Selected</option>
                        <option value="reject">Rejected</option>
                    </Form.Select> */}
                    <Form.Check type="radio" name="interview-decision" label="Selected" id="candidate-selected" className="interview-decision d-inline-block ps-0" />
                    <Form.Check type="radio" name="interview-decision" label="Rejected" id="candidate-rejected" className="interview-decision d-inline-block ps-0" />
                </div>
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="section-subhead mb-0">Candidate's Rating</h3>
                        <Button onClick={handleShowOtherSkill} variant="transparent" className="main-btn font-14">
                            Add other skill
                        </Button>
                    </div>
                    <Row>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div className="mb-2">
                                    <p className="text-start fw-medium">React JS</p>
                                    <p className="font-14 text-start">(Low Level Design)</p>
                                </div>
                                <div>
                                    <div>
                                        <div className="rating_btn_wrapper">
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_one" label="1" />
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_two" label="2" />
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_three" label="3" />
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_four" label="4" />
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_five" label="5" />
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_six" label="6" />
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_seven" label="7" />
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_eight" label="8" />
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_nine" label="9" />
                                            <Form.Check type="radio" name="react_rate" className="rating_button ps-0" id="react_ten" label="10" />
                                        </div>
                                    </div>
                                </div>
                                {/* <Form.Select className="common-field font-14 mb-2 w-auto">
                                    <option value="">Select Rating</option>
                                    <option value="one">1</option>
                                    <option value="two">2</option>
                                    <option value="three">3</option>
                                    <option value="four">4</option>
                                    <option value="five">5</option>
                                    <option value="six">6</option>
                                    <option value="seven">7</option>
                                    <option value="eight">8</option>
                                    <option value="nine">9</option>
                                    <option value="ten">10</option>
                                </Form.Select> */}
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start fw-medium">Vue JS</p>
                                    <p className="font-14 text-start mb-2">(Low Level Design)</p>
                                </div>
                                <div>
                                    <div>
                                        <div className="rating_btn_wrapper">
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_one" label="1" />
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_two" label="2" />
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_three" label="3" />
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_four" label="4" />
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_five" label="5" />
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_six" label="6" />
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_seven" label="7" />
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_eight" label="8" />
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_nine" label="9" />
                                            <Form.Check type="radio" name="vue_rate" className="rating_button ps-0" id="vue_ten" label="10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start fw-medium">JavaScript</p>
                                    <p className="font-14 text-start mb-2">(Low Level Design)</p>
                                </div>
                                <div>
                                    <div>
                                        <div className="rating_btn_wrapper">
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_one" label="1" />
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_two" label="2" />
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_three" label="3" />
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_four" label="4" />
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_five" label="5" />
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_six" label="6" />
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_seven" label="7" />
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_eight" label="8" />
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_nine" label="9" />
                                            <Form.Check type="radio" name="js_rate" className="rating_button ps-0" id="js_ten" label="10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start fw-medium">Angular JS</p>
                                    <p className="font-14 text-start mb-2">(Low Level Design)</p>
                                </div>
                                <div>
                                    <div>
                                        <div className="rating_btn_wrapper">
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_one" label="1" />
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_two" label="2" />
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_three" label="3" />
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_four" label="4" />
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_five" label="5" />
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_six" label="6" />
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_seven" label="7" />
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_eight" label="8" />
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_nine" label="9" />
                                            <Form.Check type="radio" name="angular_rate" className="rating_button ps-0" id="angular_ten" label="10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start fw-medium">MongoDB</p>
                                    <p className="font-14 text-start mb-2">(Data Structure & Algorithms)</p>
                                </div>
                                <div>
                                    <div>
                                        <div className="rating_btn_wrapper">
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_one" label="1" />
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_two" label="2" />
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_three" label="3" />
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_four" label="4" />
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_five" label="5" />
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_six" label="6" />
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_seven" label="7" />
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_eight" label="8" />
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_nine" label="9" />
                                            <Form.Check type="radio" name="mongo_rate" className="rating_button ps-0" id="mongo_ten" label="10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start fw-medium">Node JS</p>
                                    <p className="font-14 text-start mb-2">(Low Level Design)</p>
                                </div>
                                <div>
                                    <div>
                                        <div className="rating_btn_wrapper">
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_one" label="1" />
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_two" label="2" />
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_three" label="3" />
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_four" label="4" />
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_five" label="5" />
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_six" label="6" />
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_seven" label="7" />
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_eight" label="8" />
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_nine" label="9" />
                                            <Form.Check type="radio" name="nodejs_rate" className="rating_button ps-0" id="nodejs_ten" label="10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start mb-2 fw-medium">Communication</p>
                                </div>
                                <div>
                                    <div>
                                        <div className="rating_btn_wrapper">
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_one" label="1" />
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_two" label="2" />
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_three" label="3" />
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_four" label="4" />
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_five" label="5" />
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_six" label="6" />
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_seven" label="7" />
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_eight" label="8" />
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_nine" label="9" />
                                            <Form.Check type="radio" name="communication_rate" className="rating_button ps-0" id="communication_ten" label="10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div>
                                <div className="ratinng-wrapper">
                                    <div className="d-flex align-items-center mb-2">
                                        <div>
                                            <p className="text-start fw-medium">HTML</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <Button variant="transparent" className="arrow-btn danger-arrow shadow-none p-0 bg-transparent border-0 w-auto h-auto lh-1 ms-2">&times;</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div className="rating_btn_wrapper">
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_one" label="1" />
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_two" label="2" />
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_three" label="3" />
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_four" label="4" />
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_five" label="5" />
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_six" label="6" />
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_seven" label="7" />
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_eight" label="8" />
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_nine" label="9" />
                                                <Form.Check type="radio" name="html_rate" className="rating_button ps-0" id="html_ten" label="10" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4 className="section-subhead mb-0">Your Overall Feedback</h4>
                        </div>
                        <Form.Control as="textarea" className="common-field font-14" placeholder="Enter your overall feedback" rows="3" />
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn font-14">Submit</Button>
                    </div>
                    <div className="mb-4">
                        <h4 className="section-subhead mb-3">Summary</h4>
                        <div className="transript-wrapper">
                            <p className="fw-semibold">Questions asked</p>
                            <p className="fw-14">Introduction:</p>
                            <ol>
                                <li className="mb-2">3 years of experience</li>
                                <li className="mb-2">React JS framework</li>
                                <li className="mb-2">Analytical Thinker</li>
                                <li className="mb-2">Giving Tech Talks or Blogs</li>
                            </ol>
                            <div className="border-bottom-0">
                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="topic-counter">1</span>
                                    <span className="fw-semibold font-18">Low-level Design</span>
                                </div>
                                <h4 className="font-16 fw-bold">React JS (9/10)</h4>
                                <p className="font-16 fw-medium">Ability to identify entities, knowledge of joins, able to give practical application of indexes, right understanding of when to use what kind of join</p>
                                <ol className="mb-3">
                                    <li className="mb-2">The candidate came up with different entities and explained mapping one-toone, one-to-many and many-to-many mappings between them.</li>
                                    <li className="mb-2">He was good at defining different fields which be part of the entities and did not need any hand-holding.</li>
                                    <li className="mb-2">He also explained how he will handle race conditions when multiple users are trying to book the same seats. He used a cache layer for reserved seats with an expiry time to allow the user to do payment</li>
                                </ol>
                                <h4 className="font-16 fw-bold">Vue JS (7/10)</h4>
                                <p className="font-16 fw-medium">Ability to identify entities, knowledge of joins, able to give practical application of indexes, right understanding of when to use what kind of join</p>
                                <ol className="mb-3">
                                    <li className="mb-2">The candidate came up with different entities and explained mapping one-toone, one-to-many and many-to-many mappings between them.</li>
                                    <li className="mb-2">He was good at defining different fields which be part of the entities and did not need any hand-holding.</li>
                                    <li className="mb-2">He also explained how he will handle race conditions when multiple users are trying to book the same seats. He used a cache layer for reserved seats with an expiry time to allow the user to do payment</li>
                                </ol>
                                <h4 className="font-16 fw-bold">JavaScript (8/10)</h4>
                                <p className="font-16 fw-medium">Ability to identify entities, knowledge of joins, able to give practical application of indexes, right understanding of when to use what kind of join</p>
                                <ol className="mb-3">
                                    <li className="mb-2">The candidate came up with different entities and explained mapping one-toone, one-to-many and many-to-many mappings between them.</li>
                                    <li className="mb-2">He was good at defining different fields which be part of the entities and did not need any hand-holding.</li>
                                    <li className="mb-2">He also explained how he will handle race conditions when multiple users are trying to book the same seats. He used a cache layer for reserved seats with an expiry time to allow the user to do payment</li>
                                </ol>
                                <h4 className="font-16 fw-bold">Angular JS (6/10)</h4>
                                <p className="font-16 fw-medium">Ability to identify entities, knowledge of joins, able to give practical application of indexes, right understanding of when to use what kind of join</p>
                                <ol className="mb-3">
                                    <li className="mb-2">The candidate came up with different entities and explained mapping one-toone, one-to-many and many-to-many mappings between them.</li>
                                    <li className="mb-2">He was good at defining different fields which be part of the entities and did not need any hand-holding.</li>
                                    <li className="mb-2">He also explained how he will handle race conditions when multiple users are trying to book the same seats. He used a cache layer for reserved seats with an expiry time to allow the user to do payment</li>
                                </ol>
                                <h4 className="font-16 fw-bold">Node JS (7/10)</h4>
                                <p className="font-16 fw-medium">Ability to identify entities, knowledge of joins, able to give practical application of indexes, right understanding of when to use what kind of join</p>
                                <ol className="mb-3">
                                    <li className="mb-2">The candidate came up with different entities and explained mapping one-toone, one-to-many and many-to-many mappings between them.</li>
                                    <li className="mb-2">He was good at defining different fields which be part of the entities and did not need any hand-holding.</li>
                                    <li className="mb-2">He also explained how he will handle race conditions when multiple users are trying to book the same seats. He used a cache layer for reserved seats with an expiry time to allow the user to do payment</li>
                                </ol>
                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="topic-counter">2</span>
                                    <span className="fw-semibold font-18">Data Structure & Algorithms</span>
                                </div>
                                <h4 className="font-16 fw-bold">MongoDB (5/10)</h4>
                                <p className="font-16 fw-medium">Ability to identify entities, knowledge of joins, able to give practical application of indexes, right understanding of when to use what kind of join</p>
                                <ol className="mb-3">
                                    <li className="mb-2">The candidate came up with different entities and explained mapping one-toone, one-to-many and many-to-many mappings between them.</li>
                                    <li className="mb-2">He was good at defining different fields which be part of the entities and did not need any hand-holding.</li>
                                    <li className="mb-2">He also explained how he will handle race conditions when multiple users are trying to book the same seats. He used a cache layer for reserved seats with an expiry time to allow the user to do payment</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ClientAddOtherSkill show={showAddSkill} handleClose={handleCloseOtherSkill} />
        </>
    )
}
export default ClientInterviewFeedback;