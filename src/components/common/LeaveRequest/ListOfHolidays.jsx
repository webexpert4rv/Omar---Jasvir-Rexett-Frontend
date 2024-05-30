import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Calendar from 'react-calendar'

const ListOfHolidays = ({onChange,value,tileContent}) => {
  return (
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
                          {
                            [1,3,4].map((item,index)=>{
                              return (
                                <>
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
                                </>
                              )
                            })
                          }
                          

                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </section>
  )
}

export default ListOfHolidays