import React, { useState, useEffect } from "react";
import interviewVideo from '../../assets/img/interview-video.mp4';
import { HiDownload } from "react-icons/hi";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineOndemandVideo } from "react-icons/md";
import 'react-circular-progressbar/dist/styles.css';
import ClientAddOtherSkill from "./Modals/ClientAddOtherSkill";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getInterviewDetails, submitFeedback } from '../../redux/slices/clientDataSlice';

const ClientInterviewFeedback = () => {
    const [selectedDecision, setSelectedDecision] = useState('');
    const [overallFeedback, setOverallFeedback] = useState('');
    const [skillRatings, setSkillRatings] = useState({});
    const [skills, setSkills] = useState([]);
    const [showAddSkill, setShowAddSkill] = useState(false);
    const [availableSkills, setAvailableSkills] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { interviewId } = location.state || {};
    const interviewDetails = useSelector(state => state.clientData.interviewDetails);
    const [loading, setLoading] = useState(true);

    const handleShowAddSkill = () => setShowAddSkill(true);
    const handleCloseAddSkill = () => setShowAddSkill(false);
    useEffect(() => {
        if (interviewId) {
            dispatch(getInterviewDetails(interviewId))
                .then(() => {
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [interviewId, dispatch]);

    useEffect(() => {
        if (interviewDetails?.data?.skills) {
            const skillsFromDetails = interviewDetails.data.skills;
            setSkills(skillsFromDetails);
            setAvailableSkills(skillsFromDetails.map(skill => ({ label: skill, value: skill })));
        }
    }, [interviewDetails]);

    const handleAddSkills = (newSkills) => {
        if (!Array.isArray(newSkills)) {
            console.error('Expected newSkills to be an array');
            return;
        }
        const newSkillsWithUnique = newSkills
            .filter(skill => skill && skill.label && !skills.includes(skill.label));

        setSkills(prevSkills => {
            const updatedSkills = [...prevSkills, ...newSkillsWithUnique.map(skill => skill.label)];
            setAvailableSkills(updatedSkills.map(skill => ({ label: skill, value: skill })));
            console.log('Updated Skills:', updatedSkills);
            return updatedSkills;
        });
        setShowAddSkill(false);
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(prevSkills => prevSkills.filter(skill => skill !== skillToRemove));
        setSkillRatings(prevRatings => {
            const { [skillToRemove]: removedSkill, ...rest } = prevRatings;
            return rest;
        });
        setAvailableSkills(prevSkills => prevSkills.filter(skill => skill !== skillToRemove).map(skill => ({ label: skill, value: skill })));
    };

    const handleDecisionChange = (e) => {
        setSelectedDecision(e.target.value);
    };

    const handleRatingChange = (skill, rating) => {
        setSkillRatings(prevRatings => ({
            ...prevRatings,
            [skill]: rating,
        }));
    };

    const handleFeedbackChange = (e) => {
        setOverallFeedback(e.target.value);
    };

    const handleSubmit = () => {
        const feedbackData = {
            interview_id: interviewId,
            interviewer_decision: selectedDecision,
            overall_feedback: overallFeedback,
            skill_ratings: Object.keys(skillRatings).map(skill => ({
                skill_name: skill,
                rating: skillRatings[skill],
            })),
            feedback_text: "Interview feedback",
            feedback_type: "positive",
            feedback_given_by_email: "user@example.com",
            feedback_given_by_name: "User Name",
            candidates_rating: 5,
        };

        dispatch(submitFeedback(feedbackData)).then(() => {
            navigate(-1);
        }).catch((error) => {
            console.error("Feedback submission failed:", error);
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    const { data } = interviewDetails;
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
                        <p className="detail-info">{data.title}</p>
                    </div>

                    <div>
                        <h4 className="detail-name">Developer Name</h4>
                        <p className="detail-info">{data.developer_name}</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Client Name</h4>
                        <p className="detail-info">{data.client_name}</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Interviewer Name</h4>
                        <p className="detail-info">{data.interviewers_list}</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Date</h4>
                        <p className="detail-info">{data.meeting_date}</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Time</h4>
                        <p className="detail-info">
                            {data.meeting_time} - {data.meeting_end_time}
                        </p>
                    </div>
                    <div>
                        <h4 className="detail-name">Duration</h4>
                        <p className="detail-info">{data.interview_duration}</p>
                    </div>
                    <div>
                        <h4 className="detail-name">Status</h4>
                        <span className="status-completed">{data.status.charAt(0).toUpperCase() + data.status.slice(1)}</span>
                    </div>
                </div>
                <h3 className="section-subhead mb-3">Interviewer's Decision</h3>
                <div className="d-flex align-items-center gap-3 mb-4">
                    <Form.Check
                    type="radio"
                    name="interview-decision"
                    label="Selected"
                    id="candidate-selected"
                    value="selected"
                    onChange={handleDecisionChange}
                    className="interview-decision d-inline-block ps-0"
                    />
                    <Form.Check
                    type="radio"
                    name="interview-decision"
                    label="Rejected"
                    id="candidate-rejected"
                    value="rejected"
                    onChange={handleDecisionChange}
                    className="interview-decision d-inline-block ps-0"
                    />
                </div>
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="section-subhead mb-0">Candidate's Rating</h3>
                        <Button onClick={handleShowAddSkill} variant="transparent" className="main-btn font-14">
                            Add other skill
                        </Button>
                    </div>
                    <Row>
                        {skills.map((skill, index) => (
                            <Col lg={4} key={index}>
                                <div className="rating-wrapper text-center">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="text-start fw-medium">{skill}</p>
                                        <div class="d-flex align-items-center gap-2">
                                            <button  variant="link" onClick={() => handleRemoveSkill(skill)} type="button" class="arrow-btn danger-arrow shadow-none p-0 bg-transparent border-0 w-auto h-auto lh-1 ms-2 btn btn-transparent">×</button>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="rating_btn_wrapper">
                                            {[...Array(10)].map((_, i) => (
                                                <Form.Check
                                                    type="radio"
                                                    name={`${skill.toLowerCase().replace(/\s+/g, '_')}_rate`}
                                                    className="rating_button ps-0"
                                                    id={`${skill.toLowerCase().replace(/\s+/g, '_')}_${i + 1}`}
                                                    label={i + 1}
                                                    key={i}
                                                    onChange={() => handleRatingChange(skill, i + 1)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <div className="mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4 className="section-subhead mb-0">Your Overall Feedback</h4>
                        </div>
                        <Form.Control
                            as="textarea"
                            className="common-field font-14"
                            placeholder="Enter your overall feedback"
                            rows="3"
                            value={overallFeedback}
                            onChange={handleFeedbackChange}
                        />
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn font-14" onClick={handleSubmit}>
                            Submit
                        </Button>
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
            <ClientAddOtherSkill
                show={showAddSkill}
                handleClose={handleCloseAddSkill}
                onAddSkills={handleAddSkills}
            />
        </>
    )
}
export default ClientInterviewFeedback;