import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { FILTER_NAME, MONTH_NAME } from "../../clients/TimeReporiting/constant";
import { TiEdit } from "react-icons/ti";
import { IoCloseOutline } from "react-icons/io5";

const ListOfHolidays = ({ onChange, value, tileContent, holidayList }) => {
  const [holidayPeriod, setHolidayPeriod] = useState();

  const handleSelect = (item) => {
    setHolidayPeriod(item);
  };

  return (
    <section className="">
      <div className="calendar-container card-box">
        <Row>
          <Col md={7}>
            <Calendar
              onChange={onChange}
              value={value}
              tileContent={tileContent}
            />
          </Col>
          <Col md={5}>
            <div className="holiday-listing px-0 pt-4">
              <div className="d-flex justify-content-between align-items-center px-3 mb-3">
                <h3 className="mb-0">List of holidays</h3>
                <Form.Select
                  className="common-field w-auto font-14 py-2"
                  onChange={(e) => handleSelect(e.target.value)}
                >
                  {FILTER_NAME?.map((value, index) => (
                    <option key={value}>{value}</option>
                  ))}
                </Form.Select>
                {holidayPeriod === "This Month" ? (
                  ""
                ) : (
                  <Form.Select className="common-field w-auto font-14 py-2">
                    {MONTH_NAME?.map((month, idx) => (
                      <option>{month}</option>
                    ))}
                  </Form.Select>
                )}
              </div>
              <div className="event-container">
                {holidayList?.map((item, index) => {
                  return (
                    <>
                      <div className="event-wrapper" Key={index}>
                        <div className="event-info">
                          <div className="holiday-date">
                            <span className="eventdate-text">
                              {moment(item?.date).format("MMMM Do")}
                              <br />
                              <span className="year-text">
                                {moment(item?.date).format("YYYY")}
                              </span>
                            </span>
                          </div>
                         {item?.added_by==="client" ?
                          <><div className="d-flex align-items-center gap-2">
                                  <h4 className="event-name mb-0">{item?.name}</h4>
                                  <span className="associate-text">
                                    <span className="associate">Created</span>
                                  </span>
                                </div>
                                  <div className="d-flex gap-2">
                                  <Button
                                    variant="transparent"
                                    className="px-3 arrow-btn info-arrow font-16 text-decoration-none"
                                  >
                                    <TiEdit />
                                  </Button>
                                  <Button
                                    variant="transparent"
                                    className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                                  >
                                    <IoCloseOutline />
                                  </Button>
                                </div>
                                </>
                                :<div>
                                <h4 className="event-name mb-0">{item?.name}</h4>
                              </div>
   
                              }
                        </div>
                      </div>
                    </>
                  );
                })}
                 {/* <div className="event-wrapper">
                              <div className="event-info">
                                <div className="holiday-date">
                                  <span className="eventdate-text">
                                    31 MAY
                                    <br />
                                    <span className="year-text">2024</span>
                                  </span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                  <h4 className="event-name mb-0">Urgent Work</h4>
                                  <span className="associate-text">
                                    <span className="associate">Created</span>
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex gap-2">
                                <Button
                                  variant="transparent"
                                  className="px-3 arrow-btn info-arrow font-16 text-decoration-none"
                                >
                                  <TiEdit />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                                >
                                  <IoCloseOutline />
                                </Button>
                              </div>
                            </div> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ListOfHolidays;
