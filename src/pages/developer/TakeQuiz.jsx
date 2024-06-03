import React from "react";
import logoImg from '../../assets/img/rexett-logo.png';
import { LuClock } from "react-icons/lu";
import { BsClipboardCheck } from "react-icons/bs";
import { TbCalendarRepeat } from "react-icons/tb";
import { Button, Form } from "react-bootstrap";
import trophyImg from '../../assets/img/trophy-icon.gif';
const TakeQuiz = () => {
    return (
        <>
            <div className="card-box quiz-wrapper">
                <div className="logo-img-card">
                    <img src={logoImg} />
                </div>
                <div className="quiz-skill-info">
                    <h3 className="quiz-skill-name">MongoDB Assessment</h3>
                    <p className="quiz-skill-topics">MongoDB CLI, Administrator, Aggregation, Pipeline, Authentication, Cursors</p>
                </div>
                <div className="quiz-instructions">
                    <h3 className="quiz-heading">Before you begin</h3>
                    <p className="mb-2 quiz-text">Each quiz must be completed in one session; make sure you're finished before exiting.</p>
                    <p className="mb-0 quiz-text">If you don't pass, your results won't be displayed or shared on Rexett.</p>
                </div>
                <div className="quiz-overviews">
                    <h3 className="quiz-heading">Overview</h3>
                    <p className="quiz-text">Answer 15-20 timed, multiple-choice questions</p>
                    <p className="quiz-text"><span className="quiz-icon"><LuClock/></span> <strong>~ 15 minutes</strong> duration</p>
                    <p className="quiz-text"><span className="quiz-icon"><BsClipboardCheck/></span> <strong>70th percentile</strong> required to pass and get a badge</p>
                    <p className="quiz-text"><span className="quiz-icon"><TbCalendarRepeat/></span> <strong>Retry in 3 months</strong> if you don't pass</p>
                </div>
                <div className="quiz-actions d-flex justify-content-end gap-3">
                    <Button variant="transparent" className="outline-main-btn font-14">Learn More</Button>
                    <Button variant="transparent" className="main-btn font-14">Start Quiz</Button>
                </div>
            </div>
            <div className="card-box quiz-test-wrapper">
                <h2 className="quiz-text-heading">MongoDB Assessment</h2>
                <p className="quiz-test-question">What is a Document in MongoDB?</p>
                <Form>
                    <Form.Check
                        type="radio"
                        name="question-quiz"
                        label="A Document in MongoDB is an ordered set of keys with associated values. It is represented by a map, hash, or dictionary. In JavaScript, documents are represented as objects"
                        id="quiz-answer1"
                        className="mb-3 font-14 quiz-radio"
                    />
                    <Form.Check
                        type="radio"
                        name="question-quiz"
                        label="MongoDB groups collections into databases. MongoDB can host several databases, each grouping together collections. "
                        id="quiz-answer2"
                        className="mb-3 font-14 quiz-radio"
                    />
                    <Form.Check
                        type="radio"
                        name="question-quiz"
                        label="A collection in MongoDB is a group of documents. If a document is the MongoDB analog of a row in a relational database, then a collection can be thought of as the analog to a table."
                        id="quiz-answer3"
                        className="mb-3 font-14 quiz-radio"
                    />
                    <Form.Check
                        type="radio"
                        name="question-quiz"
                        label="The document-oriented data model of MongoDB makes it easier to split data across multiple servers. Balancing and loading data across a cluster is done by MongoDB. It then redistributes documents automatically."
                        id="quiz-answer4"
                        className="mb-3 font-14 quiz-radio"
                    />
                </Form>
                <div className="progress-quiz">
                    <div className="quiz-progress-wrapper">
                        <div className="quiz-progressbar"></div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                            <div>
                                <p className="quiz-info mb-0">Q1 <strong><span>01</span>/<span>15</span></strong></p>
                            </div>
                            <div>
                                <p className="mb-0 timing-quiz">01:28</p>
                            </div>
                        </div>
                        <div>
                            <Button className="main-btn font-14">Next</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-box quiz-result-wrapper">
                <h2 className="quiz-text-heading">MongoDB Assessment</h2>
                <div className="quiz-result-box text-center">
                    <img src={trophyImg} className="trophy-img mb-4" />
                    <h2 className="result-heading">Great work! You earned a badge</h2>
                    <p className="result-text">You're in the 30% of 298k people who took this.</p>
                </div>
            </div>
        </>
    )
}
export default TakeQuiz;