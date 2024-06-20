import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import companyLogoImg from '../../../../assets/img/rexett-logo-white.png';


function ColorScheme({previewUrl}) {
    const [selectedColorType, setSelectedColorType] = useState('gradient-sidecolor');


    const handleColorTypeChange = (event) => {
        console.log(event, "event")
        setSelectedColorType(event.target.id);
    };
    return (
        <>
            <Col md={12} className="mb-2">
                <div>
                    <h3 className="main-customization-heading mb-3">Color Scheme</h3>
                </div>
            </Col>
            <Col md={6} className="mb-4">
                <div>
                    <h3 className="customization-heading">Sidebar Background Color</h3>
                    <p className="customization-text">Customizing the sidebar background color allows you to align the appearance of our platform with your brand's visual identity.</p>
                    <div className="d-flex gap-3">
                        <div>
                            <Form.Control
                                type="radio"
                                className="color-radio"
                                name="sidebar-bgcolor"
                                id="gradient-sidecolor"
                                onChange={handleColorTypeChange}
                                checked={selectedColorType === 'gradient-sidecolor'}
                            />
                            <Form.Label htmlFor="gradient-sidecolor" className="gradient-color-label">
                                <span></span> Gradient Color
                            </Form.Label>
                        </div>
                        <div>
                            <Form.Control
                                type="radio"
                                className="color-radio"
                                name="sidebar-bgcolor"
                                id="solid-sidecolor"
                                onChange={handleColorTypeChange}
                                checked={selectedColorType === 'solid-sidecolor'}
                            />
                            <Form.Label htmlFor="solid-sidecolor" className="solid-color-label">
                                <span></span> Solid Color
                            </Form.Label>
                        </div>
                    </div>

                    {selectedColorType === 'solid-sidecolor' && (
                        <div className="solid-color-wrapper">
                            <div className="common-field color-field-wrapper">
                                <Form.Control type="color" className="color-field" />
                                <Form.Control type="text" placeholder="#000000" className="colortext-field shadow-none" />
                            </div>
                        </div>
                    )}
                    {selectedColorType === 'gradient-sidecolor' && (
                        <div className="gradient-color-wrapper d-flex align-items-center gap-3">
                            <div>
                                <Form.Label className="font-14">1st Color</Form.Label>
                                <div className="common-field color-field-wrapper">
                                    <Form.Control type="color" className="color-field" />
                                    <Form.Control type="text" placeholder="#000000" className="colortext-field" />
                                </div>
                            </div>
                            <div>
                                <Form.Label className="font-14">2nd Color</Form.Label>
                                <div className="common-field color-field-wrapper">
                                    <Form.Control type="color" className="color-field" />
                                    <Form.Control type="text" placeholder="#000000" className="colortext-field" />
                                </div>
                            </div>
                        </div>
                    )}
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
                                        <div className="skeleton-bar"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={6} className="mb-4">
                <div>
                    <h3 className="customization-heading">Sidebar Link Color</h3>
                    <p className="customization-text">Choosing a distinctive and readable color for your sidebar links helps users easily identify and interact with menu items.</p>
                    <div className="solid-color-wrapper">
                        <div className="common-field color-field-wrapper">
                            <Form.Control type="color" className="color-field" />
                            <Form.Control type="text" placeholder="#000000" className="colortext-field shadow-none" />
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={6} className="mb-4">
                <div className="preview-company-wrapper">
                    <div className="position-relative">
                        <div className="preview-sidebar">
                            <div>
                                {/* {previewUrl ? (
                                                            <img src={previewUrl} className="preview-company-logo" alt="Company Logo Preview" />
                                                        ) : (
                                                            <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                                        )} */}
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
                    <h3 className="customization-heading">Primary Color</h3>
                    <p className="customization-text">This Primary color will be used for key elements such as buttons, links, highlights and tabs ensuring a consistent and visually appealing interface.</p>
                    <div className="solid-color-wrapper">
                        <div className="common-field color-field-wrapper">
                            <Form.Control type="color" className="color-field" />
                            <Form.Control type="text" placeholder="#000000" className="colortext-field shadow-none" />
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={6} className="mb-4">
                <div className="preview-primary-color">
                    <div className="mb-3">
                        <Button variant="transparent" className="preview-color-btn">Button</Button>
                    </div>
                    <div className="tabs-preview-color">
                        <Button variant="transparent" className="preview-tab active">Tab 1</Button>
                        <Button variant="transparent" className="preview-tab">Tab 2</Button>
                        <Button variant="transparent" className="preview-tab">Tab 3</Button>
                    </div>
                </div>
            </Col>

            <Col md={6} className="mb-4">
                <div>
                    <h3 className="customization-heading">Heading Color</h3>
                    <p className="customization-text">The heading color is a crucial aspect of your site's design, as it affects the readability and visual impact of your content.</p>
                    <div className="solid-color-wrapper">
                        <div className="common-field color-field-wrapper">
                            <Form.Control type="color" className="color-field" />
                            <Form.Control type="text" placeholder="#000000" className="colortext-field shadow-none" />
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={6} className="mb-4">
                <h2 className="preview-heading-color">Heading</h2>
            </Col>
            <Col md={6} className="mb-4">
                <div>
                    <h3 className="customization-heading">Body text Color</h3>
                    <p className="customization-text">Choose a color that provides good contrast with your background to ensure your content is easy to read and visually appealing.</p>
                    <div className="solid-color-wrapper">
                        <div className="common-field color-field-wrapper">
                            <Form.Control type="color" className="color-field" />
                            <Form.Control type="text" placeholder="#000000" className="colortext-field shadow-none" />
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={6} className="mb-4">
                <p className="preview-text-color">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </Col>


        </>
    )
}

export default ColorScheme