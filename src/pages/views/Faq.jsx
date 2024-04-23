import React, { useEffect, useState } from "react";
import { Nav, Tab, Accordion } from 'react-bootstrap';
import { getFaq } from "../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
const Faq = () => {
    const [activeTab, setActiveTab] = useState("general");
    const dispatch = useDispatch()
    const { faqsData } = useSelector(state => state.clientData)
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    console.log(faqsData, "faqsData")
    useEffect(() => {
        dispatch(getFaq())
    }, [])
    return (
        <>
            <section className={`faq-section ${activeTab === "general" ? "general-active" : ""} ${activeTab === "jobposting" ? "jobposting-active" : ""} ${activeTab === "timereporting" ? "timereporting-active" : ""}`}>
                <div className="inner-faq-section">
                    <div className="faq-banner">
                        <h3 className="mb-3 faq-heading">Frequently Asked Questions</h3>
                        <h2 className="mb-0 faq-tab-heading">
                            {activeTab === "general" && "General"}
                            {activeTab === "jobposting" && "Job Posting"}
                            {activeTab === "timereporting" && "Time Reporting"}
                        </h2>
                    </div>
                    <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabChange}>
                        <div className="d-flex justify-content-center">
                            <Nav variant="pills faq-pill justify-content-center">
                                <Nav.Item className="faq-item">
                                    <Nav.Link className={`faq-link ${activeTab === "general" ? "active" : ""}`} eventKey="general">General</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="faq-item">
                                    <Nav.Link className={`faq-link ${activeTab === "jobposting" ? "active" : ""}`} eventKey="jobposting">Job Posting</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="faq-item">
                                    <Nav.Link className={`faq-link ${activeTab === "timereporting" ? "active" : ""}`} eventKey="timereporting">Time Reporting</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="general">
                                <Accordion className="faq-accordion mt-4">
                                    <Accordion.Item className="faq-accordion-item" eventKey="0">
                                        {faqsData?.data?.map((item, index) => {
                                            return (
                                                <>
                                                    <Accordion.Header  key ={index} className="faq-accordion-header">{item?.question}</Accordion.Header>
                                                    <Accordion.Body className="faq-accordion-body">
                                                    {item?.answer}
                                                    </Accordion.Body>
                                                </>)
                                        })}
                                    </Accordion.Item>
                                </Accordion>
                            </Tab.Pane>
                            <Tab.Pane eventKey="jobposting">
                                <Accordion className="faq-accordion mt-4">
                                    <Accordion.Item className="faq-accordion-item" eventKey="0">
                                        <Accordion.Header className="faq-accordion-header">How to Register as a client?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="1">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="2">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Tab.Pane>
                            <Tab.Pane eventKey="timereporting">
                                <Accordion className="faq-accordion mt-4">
                                    <Accordion.Item className="faq-accordion-item" eventKey="0">
                                        <Accordion.Header className="faq-accordion-header">How to Register as a client?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="1">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="faq-accordion-item" eventKey="2">
                                        <Accordion.Header className="faq-accordion-header">How to Rexett CRM?</Accordion.Header>
                                        <Accordion.Body className="faq-accordion-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </section>
        </>
    )
}
export default Faq;