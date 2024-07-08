import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import masterCard from '../../../../assets/img/master-card.png'
import visaCard from '../../../../assets/img/visa-card.png'
import AeCard from '../../../../assets/img/ae-card.png'
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
const PaymentSetup = ({  currentTab }) => {
    return(
        <>
            <div>
                {currentTab === "seven" &&
                    <div>
                        <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
                            <h2 className="section-head-sub mb-0 border-0">
                                Payment Setup
                            </h2>
                        </div>
                        <Row>
                            <Col md={4}>
                                <div className="active-plan">
                                    <h3 className="plan-heading text-center">Basic Plan</h3>
                                    <h2 className="price-plan text-center">$9.99<span>/month</span></h2>
                                    <p className="fw-medium font-18 text-center mb-2">Features</p>
                                    <ul className="ms-0 font-14 text-center">
                                        <li>Timesheet management</li>
                                        <li>Invoice management</li>
                                        <li>User management</li>
                                        <li>Message intergration</li>
                                        <li>Booking meetings</li>
                                    </ul>
                                    <div className="text-center mt-3">
                                        <div className="plan-valid">
                                            <p className="mb-0">Plan valid till 22-07-2024</p>
                                            <p className="mb-0 active-status">Active</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="active-plan">
                                    <h3 className="plan-heading text-center">Standard Plan</h3>
                                    <h2 className="price-plan text-center">$19.99<span>/month</span></h2>
                                    <p className="fw-medium font-18 text-center mb-2">Features</p>
                                    <ul className="ms-0 font-14 text-center">
                                        <li>Timesheet management</li>
                                        <li>Invoice management</li>
                                        <li>User management</li>
                                        <li>Message intergration</li>
                                        <li>Booking meetings</li>
                                    </ul>
                                    <div className="text-center mt-3">
                                        <Button variant="transparent" className="main-btn font-14">Upgrade now</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="active-plan">
                                    <h3 className="plan-heading text-center">Enterprise Plan</h3>
                                    <h2 className="price-plan text-center">$29.99<span>/month</span></h2>
                                    <p className="fw-medium font-18 text-center mb-2">Features</p>
                                    <ul className="ms-0 font-14 text-center">
                                        <li>Timesheet management</li>
                                        <li>Invoice management</li>
                                        <li>User management</li>
                                        <li>Message intergration</li>
                                        <li>Booking meetings</li>
                                    </ul>
                                    <div className="text-center mt-3">
                                        <Button variant="transparent" className="main-btn font-14">Upgrade now</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="mt-4">
                            <h5 className="fw-semibold mb-3">Added payment method</h5>
                            <p className="fw-medium mb-1">Linked Card *</p>
                            <p>Scheduled payment will be automatically deducted from this card.</p>
                            <div>
                                <Row>
                                    <Col md={4}>
                                        <div className="payment-card">
                                            <div className="d-flex align-items-start gap-3">
                                                <div className="card-icon">
                                                    <img src={masterCard} />
                                                </div>
                                                <div className="paymentcard-detail">
                                                    <p className="fw-medium mb-1">9869 5432 1098 7654</p>
                                                    <p className="mb-2">06 / 25 | John Doe</p>
                                                </div>
                                            </div>
                                            <div className="payment-card-action">
                                                <Button variant="transparent" className="default-btn"><FaCheck /> Default</Button>
                                                <Button variant="transparent" className="cancel-btn font-14">Delete</Button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="payment-card">
                                            <div className="d-flex align-items-start gap-3">
                                                <div className="card-icon">
                                                    <img src={visaCard} />
                                                </div>
                                                <div className="paymentcard-detail">
                                                    <p className="fw-medium mb-1">6548 7458 2563 5412</p>
                                                    <p className="mb-2">10 / 28 | John Doe</p>
                                                </div>
                                            </div>
                                            <div className="payment-card-action">
                                                <Button variant="transparent" className="default-btn">Set as default</Button>
                                                <Button variant="transparent" className="cancel-btn font-14">Delete</Button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="payment-card">
                                            <div className="d-flex align-items-start gap-3">
                                                <div className="card-icon">
                                                    <img src={AeCard} />
                                                </div>
                                                <div className="paymentcard-detail">
                                                    <p className="fw-medium mb-1">4521 7458 9632 1236</p>
                                                    <p className="mb-2">01 / 27 | John Doe</p>
                                                </div>
                                            </div>
                                            <div className="payment-card-action">
                                                <Button variant="transparent" className="default-btn">Set as default</Button>
                                                <Button variant="transparent" className="cancel-btn font-14">Delete</Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default PaymentSetup