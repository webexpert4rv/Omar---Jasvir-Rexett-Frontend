import React from "react";
import { Button, Nav, Pagination, Tab, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import userImg from '../../assets/img/demo-img.jpg';
import { IoSearch } from "react-icons/io5";
const FeedbackView = () => {
    return (
        <>
            <div className="filter-section">
                <Form.Select className="common-field font-14">
                    <option>Select Client</option>
                    <option>Santi Carloza</option>
                    <option>Fast Respone</option>
                    <option>Arlene McCoy</option>
                </Form.Select>
            </div>
            <div className="card-box">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom-grey">
                    <h2 className="section-head border-0 mb-0 pb-0">Client's Feedback</h2>

                    <div className="d-flex align-items-center gap-3">
                        <Form.Control
                            type="text"
                            className="common-field font-14 shadow-none"
                            placeholder="Enter Keyword..."
                        />
                        <Button variant="transparent" className="main-btn px-3 search-form-btn">
                            <IoSearch />
                        </Button>
                    </div>
                </div>
                <div className="table-responsive custom-feedback-table">
                    <table className="table table-ui-custom">
                        <thead>
                            <tr>
                                <th className="font-14">Client Name</th>
                                <th className="font-14">Client's Email</th>
                                <th className="font-14 white-nowrap">Project Name</th>
                                <th className="font-14 white-nowrap">Candidate Name</th>
                                <th className="font-14 white-nowrap">Candidate's Email</th>
                                <th className="font-14">Date</th>
                                <th className="font-14">Rating</th>
                                <th className="font-14">Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Santi Carloza
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    09/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text great-rating">
                                        4.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Great job resolving the recent tickets quickly and efficiently. Your clear and concise communication helped the users understand the solutions provided.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Fast Respone
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    fastrespone@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    08/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text neutral-rating">
                                        3.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Your performance in solving tickets is satisfactory. While you manage to resolve issues, there is potential to increase efficiency and provide more detailed responses.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Arlene McCoy
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    arlenemccoy@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    07/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text neutral-rating">
                                        2.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Your current performance in resolving tickets falls below our expectations. There are several areas where improvement is needed to meet the required standards.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Santi Carloza
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    09/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text poor-rating">
                                        1.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Your current performance in resolving tickets is significantly below expectations. Immediate and substantial improvements are needed to meet the basic requirements of your role.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Fast Respone
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    fastrespone@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    08/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text great-rating">
                                        5.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Your performance in resolving tickets has been outstanding. You consistently exceed expectations and deliver exceptional results.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Santi Carloza
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    09/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text great-rating">
                                        4.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Great job resolving the recent tickets quickly and efficiently. Your clear and concise communication helped the users understand the solutions provided.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Fast Respone
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    fastrespone@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    08/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text neutral-rating">
                                        3.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Your performance in solving tickets is satisfactory. While you manage to resolve issues, there is potential to increase efficiency and provide more detailed responses.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Arlene McCoy
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    arlenemccoy@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    07/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text neutral-rating">
                                        2.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Your current performance in resolving tickets falls below our expectations. There are several areas where improvement is needed to meet the required standards.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Santi Carloza
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    09/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text poor-rating">
                                        1.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Your current performance in resolving tickets is significantly below expectations. Immediate and substantial improvements are needed to meet the basic requirements of your role.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        Fast Respone
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    fastrespone@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    <span className="ticket-name-text">AI Bot Chat</span>
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2 font-14">
                                        <img src={userImg} className="ticket-img" />
                                        John Williams
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    santicarloza@gmail.com
                                </td>
                                <td className="align-middle font-14">
                                    08/05/2024
                                </td>
                                <td className="align-middle font-14">
                                    <div className="rating-text great-rating">
                                        5.0
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    <p className="feedback-text">Your performance in resolving tickets has been outstanding. You consistently exceed expectations and deliver exceptional results.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 font-14">Showing 10 of 50 results</p>
                    <div>
                        <Pagination className="pagination mb-0">
                            <Pagination.Prev className="pagination-arrow custom-pagination-item me-1" />
                            <Pagination.Item className="custom-pagination-item">{1}</Pagination.Item>
                            <Pagination.Ellipsis className="custom-pagination-item" />

                            <Pagination.Item className="custom-pagination-item" active>{10}</Pagination.Item>

                            <Pagination.Ellipsis className="custom-pagination-item" />
                            <Pagination.Item className="custom-pagination-item">{20}</Pagination.Item>
                            <Pagination.Next className="pagination-arrow custom-pagination-item ms-1" />
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FeedbackView;