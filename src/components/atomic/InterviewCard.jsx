import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaLink } from 'react-icons/fa';
import devImg from '../../assets/img/user-img.jpg';

const InterviewCard = ({ handleShowMeetingInfo, item }) => {
  const [copied, setCopied] = useState(false);

  const { interview: { title, developer_name, meeting_date, meeting_time,meeting_link } } = item;

  const copyLinkToClipboard = () => {
    const link = meeting_link;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <>
      <div className="interview-wrapper position-relative mb-3 pt-4">
        <div>
          <p className="interview-title mb-2">{item?.interview?.title}</p>
          <p className="dev-name mb-2 font-14">
            <div className="me-1">
              <img src={devImg} alt="Developer" />
            </div>
            {developer_name}
          </p>
          <div>
            <span className="associate-text">
              <span className="associate">{meeting_date}, Time : {meeting_time}</span>
            </span>
          </div>
        </div>
        <div className="mb-2 status-interview">
          <span className="status-upcoming">Upcoming in 1hr</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <Button variant="transparent" className="link-btn font-14 text-decoration-none" onClick={copyLinkToClipboard}>
            <FaLink /> {copied ? 'Link Copied!' : 'Copy Link'}
          </Button>
          <Button variant="transparent" className="main-btn font-14" onClick={()=>handleShowMeetingInfo(item)}>View Details</Button>
        </div>
      </div>
    </>
  );
}

export default InterviewCard;
