import React from 'react'
import { Col, Form, Row, Tab } from 'react-bootstrap'
import companyLogoImg from '../../../../assets/img/rexett-logo-white.png';


function Typography({previewUrl}) {




  
  return (

                            <div>
                                <Row>
                                 <Col md={12} className="mb-2">
                                        <div>
                                            <h3 className="main-customization-heading mb-3">Typography</h3>
                                        </div>
                                    </Col> 
                                    <Col md={6} className="mb-4">
                                        <div>
                                            <h3 className="customization-heading">Sidebar Font Size</h3>
                                            <p className="customization-text">Adjusting the font size allows you to emphasize important sections and improve the user experience.</p>
                                            <div className="solid-color-wrapper">
                                                <div className="color-field-wrapper">
                                                    <Form.Range min="16" max="100" className="w-100" />
                                                    <Form.Control type="text" placeholder="16px" className="common-field shadow-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </Col> 
                                     <Col md={6} className="mb-4">
                                        <div className="preview-company-wrapper">
                                            <div className="position-relative">
                                                <div className="preview-sidebar">
                                                    <div>
                                                        {previewUrl ? (
                                                            <img src={previewUrl} className="preview-company-logo" alt="Company Logo Preview" />
                                                        ) : (
                                                            <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                                        )}
                                                    </div>
                                                    <div className="skeleton-container mt-4">
                                                        {[...Array(4)].map((_, index) => (
                                                            <div key={index} className="mb-3 d-flex align-items-center gap-3">
                                                                <div className="skeleton-circle"></div>
                                                                <p className="preview-sidelink mb-0">Link {index + 1}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col> 
                                     <Col md={6} className="mb-4">
                                        <div>
                                            <h3 className="customization-heading">Heading Font Size</h3>
                                            <p className="customization-text">Adjusting the font size allows you to emphasize important sections and improve the user experience.</p>
                                            <div className="solid-color-wrapper">
                                                <div className="color-field-wrapper">
                                                    <Form.Range min="16" max="100" className="w-100" />
                                                    <Form.Control type="text" placeholder="16px" className="common-field shadow-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6} className="mb-4">
                                        <h2 className="preview-heading-size">Heading</h2>
                                    </Col> 
                                   <Col md={6} className="mb-4">
                                        <div>
                                            <h3 className="customization-heading">Body Font Size</h3>
                                            <p className="customization-text">Adjusting the font size allows you to emphasize important sections and improve the user experience.</p>
                                            <div className="solid-color-wrapper">
                                                <div className="color-field-wrapper">
                                                    <Form.Range min="16" max="100" className="w-100" />
                                                    <Form.Control type="text" placeholder="16px" className="common-field shadow-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                   <Col md={6} className="mb-4">
                                        <p className="preview-text-size">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    </Col> 
                                    </Row>
                            </div>
                       
  )
}

export default Typography