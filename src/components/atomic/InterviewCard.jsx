import React, { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaLink } from 'react-icons/fa';
import devImg from '../../assets/img/user-img.jpg';

const InterviewCard = ({ handleShowMeetingInfo, item ,cardCurrentStatus}) => {
  const [copied, setCopied] = useState(false);
  const [remainingTime, setRemainingTime] = useState('');

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

  const calculateRemainingTime = () => {
    const meetingDateTime = new Date(`${meeting_date}T${meeting_time}`);
    const now = new Date();
    const difference = meetingDateTime - now;
  
    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setRemainingTime(`Upcoming in ${hours}hr ${minutes}min`);
    } else {
      setRemainingTime('Scheduled');
    }
  };

  useEffect(() => {
    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 60000);
    return () => clearInterval(interval);
  }, [meeting_date, meeting_time]);

  return (
    <>
      <div className="interview-wrapper position-relative mb-3 pt-4">
        <div>
          <p className="interview-title mb-2">{item?.interview?.title}</p>
          <p className="dev-name mb-2 font-14">
            <div className="me-1">
              <img src={item?.developer?.profile_picture} alt="Developer" />
            </div>
            {item?.developer?.name}
          </p>
          <div>
                                    
                                      <span className="font-14 fw-normal d-block">
                                        {item?.developer?.email}
                                      </span>
                                    </div>
          <div>
            <span className="associate-text">
              <span className="associate">{item?.interview?.meeting_date}, Time : {item?.interview?.meeting_time}</span>
            </span>
          </div>
        </div>
        <div className="mb-2 status-interview">
          <span className="status-upcoming">{cardCurrentStatus(item?.interview?.status)}</span>
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
