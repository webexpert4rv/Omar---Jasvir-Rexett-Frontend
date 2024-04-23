import React, { useEffect, useState } from "react";
import { Nav, Tab, Accordion } from 'react-bootstrap';
import { getFaq } from "../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const Faq = () => {
    const [activeTab, setActiveTab] = useState("general");
    const dispatch = useDispatch()
    const { faqsData } = useSelector(state => state.clientData)
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const { t } = useTranslation()
    useEffect(() => {
        dispatch(getFaq())
    }, [])
    return (
        <>
            <section className={`faq-section ${activeTab === "general" ? "general-active" : ""} ${activeTab === "jobposting" ? "jobposting-active" : ""} ${activeTab === "timereporting" ? "timereporting-active" : ""}`}>
                <div className="inner-faq-section">
                    <div className="faq-banner">
                        <h3 className="mb-3 faq-heading">{t("frequentlyAskedQuestions")}</h3>
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
                                    <Nav.Link className={`faq-link ${activeTab === "general" ? "active" : ""}`} eventKey="general">{t("general")}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="faq-item">
                                    <Nav.Link className={`faq-link ${activeTab === "jobposting" ? "active" : ""}`} eventKey="jobposting">{t("jobPosting")}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="faq-item">
                                    <Nav.Link className={`faq-link ${activeTab === "timereporting" ? "active" : ""}`} eventKey="timereporting">{t("timeReporting")}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="general">
                                <Accordion className="faq-accordion mt-4">
                                    {faqsData?.data?.general?.map((item, index) => (
                                        <Accordion.Item key={index} eventKey={`general-${index}`}>
                                            <Accordion.Header className="faq-accordion-header">{item?.question}</Accordion.Header>
                                            <Accordion.Body className="faq-accordion-body">
                                                {item?.answer}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Tab.Pane>
                            <Tab.Pane eventKey="jobposting">
                                <Accordion className="faq-accordion mt-4">
                                    {faqsData?.data?.job_posting?.map((item, index) => (
                                        <Accordion.Item key={index} eventKey={`jobposting-${index}`}>
                                            <Accordion.Header className="faq-accordion-header">{item?.question}</Accordion.Header>
                                            <Accordion.Body className="faq-accordion-body">
                                                {item?.answer}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Tab.Pane>
                            <Tab.Pane eventKey="timereporting">
                                <Accordion className="faq-accordion mt-4">
                                    {faqsData?.data?.time_reporting?.map((item, index) => (
                                        <Accordion.Item key={index} eventKey={`timereporting-${index}`}>
                                            <Accordion.Header className="faq-accordion-header">{item?.question}</Accordion.Header>
                                            <Accordion.Body className="faq-accordion-body">
                                                {item?.answer}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
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