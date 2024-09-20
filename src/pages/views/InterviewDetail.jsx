import React, { useState, useEffect } from "react";
import { HiDownload, HiThumbUp, HiThumbDown } from "react-icons/hi";
import { Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineOndemandVideo } from "react-icons/md";
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getInterviewDetails, getAverageFeedbackDetails } from '../../redux/slices/clientDataSlice';

const ClientInterviewDetail = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { interviewId } = location.state || {};
    const interviewDetails = useSelector(state => state.clientData.interviewDetails);
    const feedbackDetails = useSelector(state => state.clientData.feedbackDetails);
    const [loading, setLoading] = useState(true);
    const [feedbackLoading, setFeedbackLoading] = useState(true);

    useEffect(() => {
        if (interviewId) {
            dispatch(getInterviewDetails(interviewId))
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        }
    }, [interviewId, dispatch]);

    useEffect(() => {
        if (interviewId) {
            dispatch(getAverageFeedbackDetails(interviewId))
                .then(() => setFeedbackLoading(false))
                .catch(() => setFeedbackLoading(false));
        }
    }, [interviewId, dispatch]);

    if (loading || feedbackLoading) {
        return <p>Loading...</p>;
    }

    const { data } = interviewDetails;
    console.log(feedbackDetails, 'feedbackDetails')
    const averageRatings = feedbackDetails?.data?.averageRatings || [];
    const overallAverageRating = feedbackDetails?.data?.overallAverageRating || 0;
    const feedbacks = feedbackDetails?.data?.feedbacks || [];
    console.log(averageRatings, 'averageRatings')
    console.log(feedbacks, 'feedbacks')

    // Define colors for different skills
    const getColor = (skillName) => {
        switch (skillName) {
            case 'React':
                return '#037563';
            case 'Node JS':
                return '#ffa727';
            case 'Nest.js':
                return '#d7ce00';
            case 'Vue.js':
                return '#ffa727';
            case 'Angular':
                return '#d7ce00';
            default:
                return '#00b598';
        }
    };

    // Function to display interview status
    const statusDisplay = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return (
                    <span className="status-completed font-17">
                        Selected <span className="lh-1"><HiThumbUp /></span>
                    </span>
                );
            case 'selected':
                    return (
                        <span className="status-completed font-17">
                            Selected <span className="lh-1"><HiThumbUp /></span>
                        </span>
                    );
            case 'rejected':
                return (
                    <span className="status-rejected font-17">
                        Rejected <span className="lh-1"><HiThumbDown /></span>
                    </span>
                );
            default:
                return (
                    <span className="status-pending font-17">
                        Pending
                    </span>
                );
        }
    };

    return (
        <>
            <div className="card-box">
                <div className="border-bottom-grey pb-3 mb-4 d-flex justify-content-between align-items-center">
                    <h2 className="section-head border-0 mb-0 pb-0">Interview Detail</h2>
                    <div>
                        <Button className="main-btn font-14 me-2 py-2">
                            <span className="font-18 me-1"><MdOutlineOndemandVideo /></span> Playback
                        </Button>
                        <Button className="main-btn font-14 py-2">
                            <span className="font-18 me-1"><TbFileDescription /></span> Transcript
                        </Button>
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
                        <span className="status-completed">
                            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                        </span>
                    </div>
                    <div>
                        <h4 className="detail-name">Interviewer's Decision</h4>
                        {statusDisplay(data.status.charAt(0).toUpperCase() + data.status.slice(1))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="section-subhead mb-3">Candidate's Rating</h3>
                    <div className="rating-container">
                        <div className="ratinng-wrapper d-block text-center">
                            <div className="rating-progress mb-2">
                                <CircularProgressbar
                                    value={overallAverageRating}
                                    text={`${overallAverageRating}`}
                                    styles={buildStyles({
                                        pathColor: '#037563',
                                        textColor: '#121212',
                                        textSize: '25px',
                                        trailColor: '#c6fff6',
                                    })}
                                    strokeWidth={12}
                                    maxValue={10}
                                />
                            </div>
                            <p>Overall Rating</p>
                        </div>
                        {averageRatings.map((rating, index) => (
                            <div key={index} className="ratinng-wrapper d-block text-center">
                                <div className="rating-progress mb-2">
                                    <CircularProgressbar
                                        value={rating.average_rating}
                                        text={`${rating.average_rating}`}
                                        styles={buildStyles({
                                            pathColor: getColor(rating.skill_name),
                                            textColor: '#121212',
                                            textSize: '25px',
                                            trailColor: '#c6fff6',
                                        })}
                                        strokeWidth={12}
                                        maxValue={10}
                                    />
                                </div>
                                <p>{rating.skill_name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4 className="section-subhead mb-0">Client's Overall Feedback</h4>
                        </div>
                        <div className="transcript-wrapper">
                            {feedbacks.map((feedback, index) => (
                                <p key={index} className="mb-0">
                                    {feedback.overall_feedback}
                                </p>
                            ))}
                        </div>
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
                                <p className="font-16 fw-medium">
                                    Ability to identify entities, knowledge of joins, able to give practical application of indexes, right understanding of when to use what kind of join
                                </p>
                                <ol className="mb-3">
                                    <li className="mb-2">The candidate came up with different entities and explained mapping one-to-one, one-to-many and many-to-many mappings between them.</li>
                                    <li className="mb-2">He was good at defining different fields which be part of the entities and did not need any hand-holding.</li>
                                    <li className="mb-2">He also explained how he will handle race conditions when multiple users are trying to book the same seats. He used a cache layer for reserved seats with an expiry time to allow the user to do payment for the limited time.</li>
                                </ol>
                            </div>
                            <div className="border-bottom-0">
                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="topic-counter">2</span>
                                    <span className="fw-semibold font-18">Low-level Design</span>
                                </div>
                                <h4 className="font-16 fw-bold">React JS (9/10)</h4>
                                <p className="font-16 fw-medium">
                                    Ability to identify entities, knowledge of joins, able to give practical application of indexes, right understanding of when to use what kind of join
                                </p>
                                <ol className="mb-3">
                                    <li className="mb-2">The candidate came up with different entities and explained mapping one-to-one, one-to-many and many-to-many mappings between them.</li>
                                    <li className="mb-2">He was good at defining different fields which be part of the entities and did not need any hand-holding.</li>
                                    <li className="mb-2">He also explained how he will handle race conditions when multiple users are trying to book the same seats. He used a cache layer for reserved seats with an expiry time to allow the user to do payment for the limited time.</li>
                                </ol>
                            </div>
                            <div className="border-bottom-0">
                                <div className="d-flex gap-2 align-items-center mb-3">
                                    <span className="topic-counter">3</span>
                                    <span className="fw-semibold font-18">Low-level Design</span>
                                </div>
                                <h4 className="font-16 fw-bold">React JS (9/10)</h4>
                                <p className="font-16 fw-medium">
                                    Ability to identify entities, knowledge of joins, able to give practical application of indexes, right understanding of when to use what kind of join
                                </p>
                                <ol className="mb-3">
                                    <li className="mb-2">The candidate came up with different entities and explained mapping one-to-one, one-to-many and many-to-many mappings between them.</li>
                                    <li className="mb-2">He was good at defining different fields which be part of the entities and did not need any hand-holding.</li>
                                    <li className="mb-2">He also explained how he will handle race conditions when multiple users are trying to book the same seats. He used a cache layer for reserved seats with an expiry time to allow the user to do payment for the limited time.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientInterviewDetail;
