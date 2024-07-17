import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
// import { FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
// import { FiExternalLink } from "react-icons/fi";
// import { GoClockFill } from "react-icons/go";
// import { MdLocalPhone, MdLocationPin, MdWork } from "react-icons/md";
// import resumeImg from '../../../../assets/img/demo-img.jpg'
import FinalizeResume from "../../admin/ResumeSteps/FinalizeResume";

const RegistrationStepModal = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal modal-90w">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>
                <Modal.Body>
               <FinalizeResume/>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default RegistrationStepModal;