import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
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
                <div className="mb-3">
                    <Form.Label className="font-14">Availability</Form.Label>
                    <div className='position-relative template-check'>
                        <input type='radio' name='availability_radio' className="form-check-input" id='availability_everywhere' />
                        <Form.Label htmlFor='availability_everywhere' className='mb-2'>
                            <p>
                                <span className='d-block font-14 fw-medium'>Available everywhere</span>
                                <span className='d-block font-12'>Available for all departments, roles, regions and locations</span>
                            </p>
                        </Form.Label>
                    </div>
                    <div className='position-relative template-check'>
                        <input className='form-check-input' type='radio' name='availability_radio' id='only_available' />
                        <Form.Label htmlFor='only_available' className='mb-2'>
                            <p>
                                <span className='d-block font-14 fw-medium'>Only available for certain jobs or candidates</span>
                                <span className='d-block font-12'>Limit availability to a specific department, role and/or region/location</span>
                            </p>
                        </Form.Label>
                    </div>
                    <div>
                        <Row>
                            <Col md={12}>
                                <Form.Label className='font-14'>Roles</Form.Label>
                                <Form.Select className='common-field font-14'>
                                    <option>All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="interviewer">Interviewer</option>
                                    <option value="hr">HR</option>
                                    <option value="support_assistance">Support Assistance</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
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
