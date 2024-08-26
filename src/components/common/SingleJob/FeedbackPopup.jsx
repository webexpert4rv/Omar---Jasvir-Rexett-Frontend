import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { approveFeedback } from '../../../redux/slices/clientDataSlice';
import { toast } from 'react-toastify';

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
    <Modal show={showPopup} onHide={closePopup}>
      <Modal.Header closeButton>
        <Modal.Title>Select Feedback Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-around">
          <Button onClick={() => handleFeedback('selected')} className="btn-approve">
            Selected
          </Button>
          <Button onClick={() => handleFeedback('rejected')} className="btn-reject">
            Rejected
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closePopup}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeedbackPopup;