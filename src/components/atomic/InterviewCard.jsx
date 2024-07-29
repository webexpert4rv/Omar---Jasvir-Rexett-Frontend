import React from 'react'
import { Button } from 'react-bootstrap'
import { FaLink } from 'react-icons/fa'
import devImg from '../../assets/img/user-img.jpg'

const InterviewCard = ({handleShowMeetingInfo}) => {
  return (
  <>
        <div className="interview-wrapper position-relative mb-3 pt-4">
                    <div>
                      <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                      <p className="dev-name mb-2 font-14">
                        <div className="me-1">
                          <img src={devImg} />
                        </div>
                        Pankaj Pundir
                      </p>
                      <div>
                        <span className="associate-text">
                          <span className="associate">Tuesday 22-06-24, 22:00 - 23:00</span>
                        </span>
                      </div>
                    </div>
                    <div className="mb-2 status-interview">
                      <span className="status-upcoming">Upcoming in 1hr</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <Button variant="transparent" className="link-btn font-14 text-decoration-none"><FaLink /> Copy Link</Button>
                      <Button variant="transparent" className="main-btn font-14" onClick={handleShowMeetingInfo}>View Details</Button>
                    </div>
                  </div>
  </>
  )
}

export default InterviewCard