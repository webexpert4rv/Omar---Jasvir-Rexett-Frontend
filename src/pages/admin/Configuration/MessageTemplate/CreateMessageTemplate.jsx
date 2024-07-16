import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ReactQuill, { Quill } from 'react-quill';

const CreateMessageTemplate = () => {
    const [valuemessga, setValue] = useState('');

    const handleChange = (content) => {
        setValue(content);
    };
    return (
        <div className="card-box">
            <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
                <h2 className="section-head-sub mb-0 border-0">
                    Create Message Template
                </h2>
            </div>
            <div>
                <div className="mb-3">
                    <Form.Label className="font-14">Template Name *</Form.Label>
                    <Form.Control type='text' className='common-field font-14' required />
                </div>
                <div className="mb-3">
                    <Form.Label className="font-14">Subject *</Form.Label>
                    <Form.Control type='text' className='common-field font-14' required />
                </div>
                <Row>
                    <Col md={7}>
                        <div className="mb-3">
                            <Form.Label className="font-14">Message *</Form.Label>
                            <div className="custom-rich-editor">
                                <ReactQuill value={valuemessga} onChange={handleChange} />
                                <div className="signature-wrapper">
                                    <p className="mb-4">--</p>
                                    <p className="mb-0">Aviox technologies pvt ltd</p>
                                </div>
                                <p className="font-12 mt-1 text-muted">The email signature will be automatically inserted from the recruiters profile.</p>
                            </div>
                        </div>
                        <div className="mb-3">
                            <Form.Label className="font-14">Attach file</Form.Label>
                            <Form.Control type='file' className='common-field font-14 d-none' id='attach-message-file' />
                            <Form.Label htmlFor='attach-message-file' className='attachedmessage'> Attach file </Form.Label>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className="mb-3">
                            <Form.Label className="font-14">Preview</Form.Label>
                        <div className="message-preview">
                                <div className='d-flex align-items-end gap-2 mb-3'>
                                    <div className='receiver-profile'></div>
                                    <div className='w-100'>
                                        <div className='receiver-message-preview'>
                                            <p className='skeleton-msg mb-2'></p>
                                            <p className='skeleton-msg mb-2'></p>
                                            <p className='skeleton-msg mb-0'></p>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex align-items-end justify-content-end gap-2 mb-2'>
                                    <div>
                                        <div className='send-message-preview'>
                                            <p className='send_msg'>Hi,</p>
                                            <p className='send_msg'>Welcome and thank you for showing an interest in Aviox technologies pvt ltd. Being connected to our company means you get the chance to let us get to know you even more. Start by introducing yourself on your <b>personal profile</b>. A good and informative profile will help us find a right match. We will keep you up to date with jobs that suit your profile.</p>
                                            <p>Have a great day</p>
                                            <div className='attachment_preview'>
                                                <p className='mb-0'>Privacy Policy.pdf</p>
                                                <p className='del-attac mb-0'>
                                                    <IoCloseCircleOutline />
                                                </p>
                                            </div>
                                            <p>--</p>
                                            <p>Aviox technologies pvt. ltd.</p>
                                        </div>
                                    </div>
                                    <div className='send-profile'></div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className='mb-3'>
                    <Form.Label className="font-14">Template settings</Form.Label>
                    <div className='position-relative template-check'>
                        <Form.Check type='checkbox' id='default_reject' />
                        <Form.Label htmlFor='default_reject' className='mb-2'>
                            <p>
                                <span className='d-block font-14 fw-medium'>This is the default reject email</span>
                                <span className='d-block font-12'>The reject reply can automatically be sent when rejecting applications.</span>
                            </p>
                        </Form.Label>
                    </div>
                    <div className='position-relative template-check'>
                        <Form.Check type='checkbox' id='default_reply' />
                        <Form.Label htmlFor='default_reply' className='mb-2'>
                            <p>
                                <span className='d-block font-14 fw-medium'>This is the default reply</span>
                                <span className='d-block font-12'>The default reply is automatically sent to all submitted applications.</span>
                            </p>
                        </Form.Label>
                    </div>
                    <div className='position-relative template-check'>
                        <Form.Check type='checkbox' id='welcome_email' />
                        <Form.Label htmlFor='welcome_email' className='mb-2'>
                            <p>
                                <span className='d-block font-14 fw-medium'>This is the welcome to connect email</span>
                                <span className='d-block font-12'>This is sent as a welcome email to all candidates that connects.</span>
                            </p>
                        </Form.Label>
                    </div>
                </div>
                <div className='text-center'>
                    <Button variant='transparent' className="main-btn font-14">Create Template</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateMessageTemplate;
