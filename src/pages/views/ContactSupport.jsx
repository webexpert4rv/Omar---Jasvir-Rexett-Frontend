import React, { useEffect, useState } from "react";
import { Nav, Button, Form } from 'react-bootstrap';
import { getFaq } from "../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
const ContactSupport = () => {
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
            <section className="faq-section" >
                <div className="inner-faq-section">
                    <div className="faq-banner">
                        <h3 className="mb-3 faq-heading">Contact Support</h3>
                        <h2 className="mb-0 faq-tab-heading">
                            Raise your query
                        </h2>
                    </div>
                    <div className="card-box">
                        <div>
                            <Form>
                                <div className="mb-3">
                                    <Form.Label className="font-14">Select Category</Form.Label>
                                    <Form.Select className="common-field">
                                        <option>Job Posting</option>
                                        <option>Time reporting</option>
                                        <option>Document Uploading</option>
                                        <option>Invoices</option>
                                        <option>Notifications</option>
                                        <option>Other</option>
                                    </Form.Select>
                                </div>
                                <div className="mb-3">
                                    <Form.Label className="font-14">Subject</Form.Label>
                                    <Form.Control type="text" className="common-field" placeholder="Enter your subject" />
                                </div>
                                <div className="mb-3">
                                    <Form.Label className="font-14">Message</Form.Label>
                                    <Form.Control as="textarea" className="common-field" placeholder="Enter your message" />
                                </div>
                                <div>
                                    <Button className="main-btn px-4">Submit</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ContactSupport;