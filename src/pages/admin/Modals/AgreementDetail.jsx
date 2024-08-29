import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import devImg from '../../../assets/img/demo-img.jpg';
import { FaCopy, FaInfo } from "react-icons/fa6";
const AgreementDetails = ({ show, handleClose }) => {
    const waitingText = <Tooltip>
        <div className="waiting-details">
            <p className="mb-1 fw-medium font-14">Created</p>
            <p className="mb-2 font-12">8/28/2024 | 12:04:53 pm</p>
            <p className="mb-1 fw-medium font-14">Sent</p>
            <p className="mb-2 font-12">8/28/2024 | 12:07:22 pm</p>
            <p className="mb-1 fw-medium font-14">Changed</p>
            <p className="mb-0 font-12">8/28/2024 | 12:11:32 pm</p>
        </div>
    </Tooltip>
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading d-flex justify-content-center align-items-center gap-2">
                    Aviox Technologies
                    <OverlayTrigger placement="bottom" overlay={waitingText}>
                        <span className="info-agreement-tooltip">
                            <FaInfo />
                        </span>
                    </OverlayTrigger>
                </h3>
                <div className="info-agreement">
                    <p>Envelope ID : <strong className="text-green">ff05ba12-00a2-4e35-8076-6d2003632ebd</strong> <span className="copy-btn"><FaCopy /></span>  </p>
                    <p>From: <b>Robin Gautam</b></p>
                    <p>Last change on <b>8/28/2024 | 04:19:06 pm</b></p>
                    <p>Sent on <b>8/28/2024 | 04:18:50 pm</b></p>
                </div>
                <div>
                    <h4 className="recipients-text">Recipients</h4>
                    <div className="recipents-info">
                        <span>Completed</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="reciept-name">Robin Gautam</h5>
                            <p className="reciept-text mb-0">robin@avioxtechnologies.com</p>
                        </div>
                        <div>
                            <h5 className="reciept-name">Signed</h5>
                            <p className="reciept-text mb-0">
                                on 8/28/2024 | 10:28:08 am
                            </p>
                        </div>
                    </div>

                    <div className="recipents-info mt-4">
                        <span>Current</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h5 className="reciept-name">Robin Gautam</h5>
                            <p className="reciept-text mb-0">robin@avioxtechnologies.com</p>
                        </div>
                        <div>
                            <h5 className="reciept-name">Needs to Sign</h5>
                            <p className="reciept-text mb-0">
                                on 8/28/2024 | 10:28:08 am
                            </p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h5 className="reciept-name">Robin Gautam</h5>
                            <p className="reciept-text mb-0">robin@avioxtechnologies.com</p>
                        </div>
                        <div>
                            <h5 className="reciept-name">Viewed</h5>
                            <p className="reciept-text mb-0">
                                on 8/28/2024 | 10:28:08 am
                            </p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default AgreementDetails;