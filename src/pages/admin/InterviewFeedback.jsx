import React from "react";
import interviewVideo from '../../assets/img/interview-video.mp4';
import { HiDownload } from "react-icons/hi";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineOndemandVideo } from "react-icons/md";
import 'react-circular-progressbar/dist/styles.css';
const InterviewFeedback = () => {
    const reactRating = 9;
    const vueRating = 7;
    const jsRating = 8;
    const nextRating = 5;
    const angularRating = 6;
    const nodeRating = 7;
    const commRating = 8;
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
                <div className="mb-4">
                    <h3 className="section-subhead mb-3">Candidate's Rating</h3>
                    <Row>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start">React JS</p>
                                    <p className="font-14">(Low Level Design)</p>
                                </div>
                                <Form.Select className="common-field font-14 mb-2 w-auto">
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
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start">Vue JS</p>
                                    <p className="font-14">(Low Level Design)</p>
                                </div>
                                <Form.Select className="common-field font-14 mb-2 w-auto">
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
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start">JavaScript</p>
                                    <p className="font-14">(Low Level Design)</p>
                                </div>
                                <Form.Select className="common-field font-14 mb-2 w-auto">
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
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start">Angular JS</p>
                                    <p className="font-14">(Low Level Design)</p>
                                </div>
                                <Form.Select className="common-field w-auto font-14 mb-2">
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
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start">MongoDB</p>
                                    <p className="font-14">(Data Structure & Algorithms)</p>
                                </div>
                                <Form.Select className="common-field w-auto font-14 mb-2">
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
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start">Node JS</p>
                                    <p className="font-14">(Low Level Design)</p>
                                </div>
                                <Form.Select className="common-field w-auto font-14 mb-2">
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
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="ratinng-wrapper text-center">
                                <div>
                                    <p className="text-start">Communication</p>
                                </div>
                                <Form.Select className="common-field font-14 w-auto mb-2">
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
                                </Form.Select>
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
        </>
    )
}
export default InterviewFeedback;