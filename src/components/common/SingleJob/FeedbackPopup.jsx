import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { approveFeedback } from '../../../redux/slices/clientDataSlice';
import { toast } from 'react-toastify';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';

const FeedbackPopup = ({ interviewId, showPopup, closePopup }) => {
  const dispatch = useDispatch();

  const handleFeedback = async (status) => {
    try {
      await dispatch(approveFeedback(interviewId, status));
      toast.success('Feedback published successfully!');
    } catch (error) {
      toast.error('Failed to publish feedback.');
    } finally {
      closePopup();
    }
  };

  return (
    <Modal show={showPopup} onHide={closePopup} centered animation className="custom-modal">
      <Modal.Header closeButton className="border-0 pb-3">
      </Modal.Header>

      <Modal.Body>
        <h3 className="popup-heading">Share Feedback</h3>
        <div className="d-flex justify-content-center gap-3">
          <Button onClick={() => handleFeedback('selected')} className="main-btn font-14 px-4">
            Selected <FaThumbsUp />
          </Button>
          <Button onClick={() => handleFeedback('rejected')} className="cancel-btn px-4">
            Rejected <FaThumbsDown />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FeedbackPopup;