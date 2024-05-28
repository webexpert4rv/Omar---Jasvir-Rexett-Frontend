import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import Calendar from 'react-calendar';
const DeveloperPublicHoliday = () => {
    const [value, onChange] = useState(new Date());
    // Define the dates you want to mark
    const markedDates = [
        new Date(2024, 4, 1), 
        new Date(2024, 4, 8), 
        new Date(2024, 4, 11), 
        new Date(2024, 4, 14), 
        new Date(2024, 4, 23), 
        new Date(2024, 4, 31), 
    ];

    // Function to add custom content to tile
    const tileContent = ({ date, view }) => {
        if (view === 'month' && markedDates.find(d => d.toDateString() === date.toDateString())) {
            return <div className="dot"></div>;
        }
        return null;
    };
    return (
        <>
            <section className="">
                <div className="calendar-container card-box">
                    <Row>
                        <Col md={7}>
                            <Calendar onChange={onChange} value={value} tileContent={tileContent} />
                        </Col>
                        <Col md={5}>
                            <div className="holiday-listing px-0 pt-4">
                                <div className="d-flex justify-content-between align-items-center px-3 mb-3">
                                    <h3 className="mb-0">List of holidays</h3>
                                    <Form.Select className="common-field w-auto font-14 py-2">
                                        <option>This Month</option>
                                        <option>This Year</option>
                                        <option>Created</option>
                                    </Form.Select>
                                </div>
                                <div className="event-container">
                                    <div className="event-wrapper">
                                        <div className="event-info">
                                            <div className="holiday-date">
                                                <span className="eventdate-text">01 MAY<br /><span className="year-text">2024</span></span>
                                            </div>
                                            <div>
                                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper">
                                        <div className="event-info">
                                            <div className="holiday-date">
                                                <span className="eventdate-text">08 MAY<br /><span className="year-text">2024</span></span>
                                            </div>
                                            <div>
                                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper">
                                        <div className="event-info">
                                            <div className="holiday-date">
                                                <span className="eventdate-text">08 MAY<br /><span className="year-text">2024</span></span>
                                            </div>
                                            <div>
                                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper">
                                        <div className="event-info">
                                            <div className="holiday-date">
                                                <span className="eventdate-text">11 MAY<br /><span className="year-text">2024</span></span>
                                            </div>
                                            <div>
                                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper">
                                        <div className="event-info">
                                            <div className="holiday-date">
                                                <span className="eventdate-text">14 MAY<br /><span className="year-text">2024</span></span>
                                            </div>
                                            <div>
                                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper">
                                        <div className="event-info">
                                            <div className="holiday-date">
                                                <span className="eventdate-text">23 MAY<br /><span className="year-text">2024</span></span>
                                            </div>
                                            <div>
                                                <h4 className="event-name mb-0">Buddha Purnima</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-wrapper">
                                        <div className="event-info">
                                            <div className="holiday-date">
                                                <span className="eventdate-text">31 MAY<br /><span className="year-text">2024</span></span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <h4 className="event-name mb-0">Urgent Work</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}
export default DeveloperPublicHoliday;