import React from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import masterCard from '../../../../assets/img/master-card.png'
import visaCard from '../../../../assets/img/visa-card.png'
import AeCard from '../../../../assets/img/ae-card.png'
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";
const PaymentSetup = ({ currentTab }) => {
    return (
        <>
            <div>
                {currentTab === "seven" &&
                    <div>
                        <Tab.Container
                            id="left-tabs-example"
                            defaultActiveKey="plan_monthly"
                        >
                            <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey justify-content-between">
                                <h2 className="section-head-sub mb-0 border-0">
                                    Payment Setup
                                </h2><div className="d-flex justify-content-center">
                                    <Nav variant="pills" className="application-pills">
                                        <Nav.Item className="application-item">
                                            <Nav.Link eventKey="plan_monthly" className="application-link">
                                                Monthly
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="application-item">
                                            <Nav.Link eventKey="plan_annual" className="application-link">
                                                Annual
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                            <div>
                                <Tab.Content>
                                    <Tab.Pane eventKey="plan_monthly">
                                        <Row>
                                            <Col md={4}>
                                                <div className="active-plan h-100">
                                                    <span className="current-plan-ribbon">Current Plan</span>
                                                    <h3 className="plan-heading">Basic</h3>
                                                    <h2 className="price-plan"><sup>$</sup>9.99<span>/Month</span></h2>
                                                    <div className="text-center my-3">
                                                        <Button variant="transparent" className="main-btn font-14 w-100">Reactivate</Button>
                                                    </div>
                                                    <ul className="ms-0 font-14 features-list">
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Timesheet management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Invoice management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            User management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Message intergration
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Booking meetings
                                                        </li>
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
                                                <div className="active-plan h-100">
                                                    <h3 className="plan-heading">Standard</h3>
                                                    <h2 className="price-plan"><sup>$</sup>19.99<span>/Month</span></h2>
                                                    <div className="text-center my-3">
                                                        <Button variant="transparent" className="main-btn font-14 w-100">Upgrade now</Button>
                                                    </div>
                                                    <ul className="ms-0 font-14 features-list">
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Timesheet management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Invoice management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            User management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Message intergration
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Booking meetings
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="active-plan h-100">
                                                    <h3 className="plan-heading">Enterprise</h3>
                                                    <h2 className="price-plan"><sup>$</sup>29.99<span>/Month</span></h2>
                                                    <div className="text-center my-3">
                                                        <Button variant="transparent" className="main-btn font-14 w-100">Upgrade now</Button>
                                                    </div>
                                                    <ul className="ms-0 font-14 features-list">
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Timesheet management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Invoice management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            User management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Message intergration
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Booking meetings
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="plan_annual">
                                        <Row>
                                            <Col md={4}>
                                                <div className="active-plan h-100">
                                                    <h3 className="plan-heading">Basic</h3>
                                                    <h2 className="price-plan"><sup>$</sup>108.99<span>/Year</span></h2>
                                                    <div className="text-center my-3">
                                                        <Button variant="transparent" className="main-btn font-14 w-100">Upgrade</Button>
                                                    </div>
                                                    <ul className="ms-0 font-14 features-list">
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Timesheet management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Invoice management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            User management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Message intergration
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Booking meetings
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="active-plan h-100">
                                                    <h3 className="plan-heading">Standard</h3>
                                                    <h2 className="price-plan"><sup>$</sup>227.99<span>/Year</span></h2>
                                                    <div className="text-center my-3">
                                                        <Button variant="transparent" className="main-btn font-14 w-100">Upgrade now</Button>
                                                    </div>
                                                    <ul className="ms-0 font-14 features-list">
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Timesheet management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Invoice management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            User management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Message intergration
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Booking meetings
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="active-plan h-100">
                                                    <h3 className="plan-heading">Enterprise</h3>
                                                    <h2 className="price-plan"><sup>$</sup>347.99<span>/Year</span></h2>
                                                    <div className="text-center my-3">
                                                        <Button variant="transparent" className="main-btn font-14 w-100">Upgrade now</Button>
                                                    </div>
                                                    <ul className="ms-0 font-14 features-list">
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Timesheet management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Invoice management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            User management
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Message intergration
                                                        </li>
                                                        <li>
                                                            <span><IoCheckmarkCircle /></span>
                                                            Booking meetings
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>

                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Tab.Container>
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