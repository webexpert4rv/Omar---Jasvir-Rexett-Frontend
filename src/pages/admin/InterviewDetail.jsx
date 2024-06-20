import React from "react";
import interviewVideo from '../../assets/img/interview-video.mp4';
import { HiDownload } from "react-icons/hi";
import { Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineOndemandVideo } from "react-icons/md";
import 'react-circular-progressbar/dist/styles.css';
const InterviewDetail = () => {
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
                    <div className="rating-container">
                        <div className="ratinng-wrapper d-block text-center">
                            <div className="rating-progress mb-2">
                                <CircularProgressbar value={reactRating} text={`${reactRating}`} styles={buildStyles({ pathColor: '#037563', textColor: '#121212', textSize: '25px' })} maxValue={10} />
                            </div>
                            <p>React JS</p>
                            <p className="font-14">(Low Level Design)</p>
                        </div>
                        <div className="ratinng-wrapper d-block text-center">
                            <div className="rating-progress mb-2">
                                <CircularProgressbar value={vueRating} text={`${vueRating}`} styles={buildStyles({ pathColor: '#ffa727', textColor: '#121212', textSize: '25px' })} maxValue={10} />
                            </div>
                            <p>Vue JS</p>
                            <p className="font-14">(Low Level Design)</p>
                        </div>
                        <div className="ratinng-wrapper d-block text-center">
                            <div className="rating-progress mb-2">
                                <CircularProgressbar value={jsRating} text={`${jsRating}`} styles={buildStyles({ pathColor: '#00b598', textColor: '#121212', textSize: '25px' })} maxValue={10} />
                            </div>
                            <p>JavaScript</p>
                            <p className="font-14">(Low Level Design)</p>
                        </div>
                        <div className="ratinng-wrapper d-block text-center">
                            <div className="rating-progress mb-2">
                                <CircularProgressbar value={angularRating} text={`${angularRating}`} styles={buildStyles({ pathColor: '#d7ce00', textColor: '#121212', textSize: '25px' })} maxValue={10} />
                            </div>
                            <p>Angular JS</p>
                            <p className="font-14">(Low Level Design)</p>
                        </div>
                        <div className="ratinng-wrapper d-block text-center">
                            <div className="rating-progress mb-2">
                                <CircularProgressbar value={nextRating} text={`${nextRating}`} styles={buildStyles({ pathColor: '#d7ce00', textColor: '#121212', textSize: '25px' })} maxValue={10} />
                            </div>
                            <p>MongoDB</p>
                            <p className="font-14">(Data Structure & Algorithms)</p>
                        </div>
                        <div className="ratinng-wrapper d-block text-center">
                            <div className="rating-progress mb-2">
                                <CircularProgressbar value={nodeRating} text={`${nodeRating}`} styles={buildStyles({ pathColor: '#ffa727', textColor: '#121212', textSize: '25px' })} maxValue={10} />
                            </div>
                            <p>Node JS</p>
                            <p className="font-14">(Low Level Design)</p>
                        </div>
                        <div className="ratinng-wrapper d-block text-center">
                            <div className="rating-progress mb-2">
                                <CircularProgressbar value={commRating} text={`${commRating}`} styles={buildStyles({ pathColor: '#00b598', textColor: '#121212', textSize: '25px' })} maxValue={10} />
                            </div>
                            <p>Communication</p>
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
                    {/* <div className="mb-4">
                        <video controls className="interview-video">
                        <source src={interviewVideo} type="video/mp4" />
                    </video>
                    </div> */}
                    {/* <div className="mb-4">
                        <div className="transript-wrapper">
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:03 AM</span>
                            <p className="mb-0"><strong>Amazon:</strong> Welcome to our discussion on Figma and its role in UI design. Today, we have Rohit Sharma, a seasoned UI/UX designer, to share his insights. Rohit, could you start by telling us a bit about Figma and why it's become so popular in the design community?</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:05 AM</span>
                            <p className="mb-0"><strong>Rohit Sharma:</strong> Absolutely. Figma is a web-based design tool that has gained a lot of traction due to its robust features and collaborative capabilities. Unlike other design tools, Figma allows multiple users to work on the same project in real time, which is a game-changer for team collaboration.</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:09 AM</span>
                            <p className="mb-0"><strong>Amazon:</strong> That sounds impressive. What are some of the core features of Figma that set it apart from other tools?</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:10 AM</span>
                            <p className="mb-0"><strong>Rohit Sharma:</strong> Figma offers a range of features including vector editing, prototyping, and the ability to create design systems. Its vector editing tools are intuitive and powerful, making it easy to create scalable graphics. Prototyping in Figma is seamless and allows for interactive design previews. The design systems feature helps maintain consistency across projects by allowing designers to reuse components.</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:14 AM</span>
                            <p className="mb-0"><strong>Amazon:</strong> Collaboration is a key aspect of Figma. How does it enhance teamwork compared to traditional design tools?</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:18 AM</span>
                            <p className="mb-0"><strong>Rohit Sharma:</strong> Collaboration in Figma is one of its strongest points. Since it's cloud-based, team members can access the project from anywhere, and multiple people can work on the same file simultaneously. This real-time collaboration means feedback can be implemented instantly, reducing the back-and-forth typically seen in design processes. It also has version history, so you can track changes and revert if needed.</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:23 AM</span>
                            <p className="mb-0"><strong>Rohit Sharma:</strong> Collaboration in Figma is one of its strongest points. Since it's cloud-based, team members can access the project from anywhere, and multiple people can work on the same file simultaneously. This real-time collaboration means feedback can be implemented instantly, reducing the back-and-forth typically seen in design processes. It also has version history, so you can track changes and revert if needed.</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:23 AM</span>
                            <p className="mb-0"><strong>Amazon:</strong> How does Figma fit into the overall design and development workflow?</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:23 AM</span>
                            <p className="mb-0"><strong>Rohit Sharma:</strong> Figma integrates smoothly into the workflow. Designers can create high-fidelity prototypes that developers can inspect for CSS, iOS, and Android code. It eliminates the need for third-party tools to translate designs into code. This integration helps in maintaining the design’s integrity from concept to development.</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:26 AM</span>
                            <p className="mb-0"><strong>Amazon:</strong> Could you share an example of a project where Figma made a significant impact?</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:27 AM</span>
                            <p className="mb-0"><strong>Rohit Sharma:</strong> Sure. In one of our projects for a financial services app, Figma’s collaborative features were crucial. Our team, spread across different locations, could work together in real time, which sped up the design process. We also used Figma’s design systems to ensure consistency across the app’s UI, which was particularly helpful given the complexity of the project.</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:32 AM</span>
                            <p className="mb-0"><strong>Amazon:</strong> What tips would you give to designers who are new to Figma?</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:33 AM</span>
                            <p className="mb-0"><strong>Rohit Sharma:</strong> My advice would be to take advantage of Figma’s collaborative tools. Set up your design systems early on to maintain consistency. Also, use components and styles to streamline your workflow. Lastly, don’t be afraid to explore plugins that can extend Figma’s functionality and make your design process more efficient.</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:39 AM</span>
                            <p className="mb-0"><strong>Amazon:</strong> Thanks, Rohit. Any final thoughts on Figma’s role in the future of UI design?</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:40 AM</span>
                            <p className="mb-0"><strong>Rohit Sharma:</strong> I believe Figma will continue to lead the way in collaborative design. Its ability to bring teams together and streamline the workflow is unmatched. As design becomes more integral to business success, tools like Figma that foster collaboration and efficiency will be crucial.</p>
                        </div>
                        <div className="d-flex align-items-start gap-3 mb-2">
                            <span className="time-interview">11:45 AM</span>
                            <p className="mb-0"><strong>Amazon:</strong> Thanks for sharing your insights, Rohit. It’s been a pleasure having you.</p>
                        </div>
                    </div>
                    </div> */}
                    <div className="mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4 className="section-subhead mb-0">Client's Overall Feedback</h4>
                        </div>
                        <div className="transript-wrapper">
                            <p className="mb-0">The interview highlights Figma's popularity due to its web-based nature and real-time collaboration capabilities. Core features like vector editing, prototyping, and design systems are emphasized, along with its seamless integration into the design-to-development workflow. A case study showcases its impact on a financial services app, illustrating how Figma's collaborative features and design systems ensured efficiency and consistency. John Doe also offers practical tips for new users and expresses confidence in Figma's future role in UI design.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default InterviewDetail;