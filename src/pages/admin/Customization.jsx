import React, { useState } from "react";
import { Button, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import companyLogoImg from '../../assets/img/rexett-logo-white.png';
import companyEmailLogoImg from '../../assets/img/rexett-logo.png';
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import favIconImgLogo from '../../assets/img/favicon.png'
const Customization = () => {
    const [selectedColorType, setSelectedColorType] = useState('gradient-sidecolor');
    const [companyLogo, setCompanyLogo] = useState(null);
    const [companyEmailLogo, setCompanyEmailLogo] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [previewEmailUrl, setPreviewEmailUrl] = useState('');
    const [favIconLogo, setFavIconLogo] = useState(null);
    const [favIconPreviewUrl, setFavIconPreviewUrl] = useState('');
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCompanyLogo(file);
            setPreviewUrl(url);
        }
    };


    const handleRemoveImage = () => {
        setCompanyLogo(null);
        setPreviewUrl('');
    };

    const handleColorTypeChange = (event) => {
        setSelectedColorType(event.target.id);
    };
    const handleFavIconUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFavIconLogo(file);
            setFavIconPreviewUrl(url);
        }
    };


    const handleEmailImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCompanyEmailLogo(url);
            setPreviewEmailUrl(url);
        }
    };

    const handleRemoveEmailImage = () => {
        setCompanyEmailLogo(null);
        setPreviewEmailUrl('');
    };

    const handleRemoveFavIcon = () => {
        setFavIconLogo(null);
        setFavIconPreviewUrl('');
    };
    return (
        <>
            <div className="card-box">
                <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
                    <h2 className="section-head border-0 mb-0 pb-0">Configuration</h2>
                </div>

                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="crm_customize"
                >
                    <Nav variant="pills" className="application-pills">
                        <Nav.Item className="application-item">
                            <Nav.Link eventKey="crm_customize" className="application-link">
                                CRM
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="application-item">
                            <Nav.Link eventKey="email_customize" className="application-link">
                                Email Template
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="application-item">
                            <Nav.Link eventKey="company_details" className="application-link">
                                Company Details
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="crm_customize" className="py-4">
                            <div>
                                <Row>
                                    <Col md={6} className="mb-4">
                                        <h3 className="customization-heading">Upload Company Logo</h3>
                                        <p className="customization-text">
                                            Your company logo is an essential part of your brand identity. Uploading it here will ensure it is prominently displayed across various sections of our platform, enhancing your brand's visibility and consistency.
                                        </p>
                                        <div className="mb-4 custom-wrapper">
                                            <Form.Control
                                                type="file"
                                                className="upload-custom-field"
                                                id="company-logo"
                                                accept="image/jpeg, image/png, image/svg+xml"
                                                onChange={handleImageUpload}
                                            />
                                            <Form.Label htmlFor="company-logo" className="upload-field-label">
                                                Upload File
                                            </Form.Label>
                                            <p className="note-text">Only Accepted formats: JPEG, PNG, SVG</p>
                                            {previewUrl && (
                                                <div className="preview-upload-imgwrapper">
                                                    <div></div>
                                                    <img src={previewUrl} className="upload-preview-img" alt="Company Logo" />
                                                    <Button variant="transparent" className="remove-preview-img" onClick={handleRemoveImage}>
                                                        &times;
                                                    </Button>
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
                                        <h3 className="customization-heading">Upload Favicon</h3>
                                        <p className="customization-text">
                                            The favicon is a small but crucial element of your brand's online presence. It appears in browser tabs, bookmarks, and other places to help users quickly identify your site.
                                        </p>
                                        <div className="mb-4 custom-wrapper">
                                            <Form.Control
                                                type="file"
                                                className="upload-custom-field"
                                                id="favicon-logo"
                                                accept="image/jpeg, image/png, image/svg+xml"
                                                onChange={handleFavIconUpload}
                                            />
                                            <Form.Label htmlFor="favicon-logo" className="upload-field-label">
                                                Upload File
                                            </Form.Label>
                                            <p className="note-text">Only Accepted formats: JPEG, PNG, SVG. Recommended size: 16x16 pixels, 32x32 pixels, or 48x48 pixels</p>
                                        </div>

                                        {favIconPreviewUrl && (
                                            <div className="preview-upload-imgwrapper">
                                                <div></div>
                                                <img src={favIconPreviewUrl} className="upload-preview-img" alt="Company Logo" />
                                                <Button variant="transparent" className="remove-preview-img" onClick={handleRemoveFavIcon}>
                                                    &times;
                                                </Button>
                                            </div>
                                        )}
                                    </Col>
                                    <Col md={6} className="mb-4">
                                        <div className="preview-statusbar-wrapper">
                                            <div className="position-relative">
                                                <div className="preview-statusbar">
                                                    <div className="d-flex align-items-center w-100 gap-2">
                                                        {favIconPreviewUrl ? (
                                                            <img src={favIconPreviewUrl} className="preview-favicon-logo" alt="Favicon Preview" />
                                                        ) : (
                                                            <img src={favIconImgLogo} className="preview-favicon-logo" alt="Favicon Preview" />
                                                        )}
                                                        <div className="skeleton-bar dark w-75"></div>
                                                    </div>
                                                    {favIconPreviewUrl && (
                                                        <Button variant="transparent" className="remove-preview-img" onClick={handleRemoveFavIcon}>
                                                            &times;
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="web-controls">
                                                <div className="minimize-web"></div>
                                                <div className="fullscreen-web"></div>
                                                <div className="close-web"></div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <div>
                                            <h3 className="main-customization-heading mb-3">Color Scheme</h3>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-4">
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
                                    <Col md={4} className="mb-4">
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
                                    <Col md={4} className="mb-4">
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
                                    <Col md={4} className="mb-4">
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
                                    <Col md={4} className="mb-4">
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
                                    <Col md={12} className="mb-2">
                                        <div>
                                            <h3 className="main-customization-heading mb-3">Typography</h3>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-4">
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
                                    <Col md={4} className="mb-4">
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
                                    <Col md={4} className="mb-4">
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
                                </Row>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="email_customize" className="py-4">
                            <div>
                                <Row>
                                    <Col md={6} className="mb-4">
                                        <h3 className="customization-heading">Upload Company Logo</h3>
                                        <p className="customization-text">Your company logo is an essential part of your brand identity. Uploading it here will ensure it is prominently displayed across various sections of our platform, enhancing your brand's visibility and consistency</p>
                                        <div className="mb-4 custom-wrapper">
                                            <Form.Control
                                                type="file"
                                                className="upload-custom-field"
                                                id="company-email-logo"
                                                accept="image/jpeg, image/png, image/svg+xml"
                                                onChange={handleEmailImageUpload}
                                            />
                                            <Form.Label htmlFor="company-email-logo" className="upload-field-label">Upload File</Form.Label>
                                            <p className="note-text">Only Accepted formats: JPEG, PNG, SVG</p>
                                        </div>
                                        {previewEmailUrl && (
                                            <div className="preview-upload-imgwrapper">
                                                <img src={previewEmailUrl} className="upload-preview-img" alt="Company Logo" />
                                                <Button variant="transparent" className="remove-preview-img" onClick={handleRemoveEmailImage}>
                                                    &times;
                                                </Button>
                                            </div>
                                        )}
                                    </Col>
                                    <Col md={6} className="mb-4">
                                        <div className="preview-email-wrapper">
                                            <div className="position-relative">
                                                <div className="">
                                                    <div className="text-center">
                                                        {previewEmailUrl ? (
                                                            <img src={previewEmailUrl} className="preview-email-logo" alt="Company Logo Preview" />
                                                        ) : (
                                                            <img src={companyEmailLogoImg} className="preview-email-logo" alt="Company Logo Preview" />
                                                        )}
                                                    </div>
                                                    <div className="email-temp-wrapper">
                                                        <div className="skeleton-bar dark"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <div>
                                            <h3 className="main-customization-heading mb-3">Custom Content</h3>
                                        </div>
                                    </Col>
                                    <Col md={6} className="mb-4">
                                        <div>
                                            <h3 className="customization-heading">Copyright Text</h3>
                                            <p className="customization-text">Adjusting the font size allows you to emphasize important sections and improve the user experience.</p>
                                            <div className="color-field-wrapper d-flex">
                                                <Form.Control type="text" placeholder="Enter copyright text" className="common-field shadow-none w-100" />
                                                <div className="d-inline-flex gap-2 w-auto">
                                                    <Button className="arrow-btn primary-arrow"><IoCheckmark /></Button>
                                                    <Button className="arrow-btn danger-arrow"><IoCloseOutline /></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6} className="mb-4">
                                        <div>
                                            <h3 className="customization-heading">Social Media Links</h3>
                                            <p className="customization-text">Adjusting the font size allows you to emphasize important sections and improve the user experience.</p>
                                            <div>
                                                <Form.Group className="d-flex gap-2">
                                                    <Form.Select className="common-field font-14 w-auto">
                                                        <option value="">Select Social</option>
                                                        <option value="facebook">Facebook</option>
                                                        <option value="x_twitter">X(Twitter)</option>
                                                        <option value="instagram">Instagram</option>
                                                        <option value="linkedin">LinkedIn</option>
                                                        <option value="github">Gitub</option>
                                                        <option value="behance">Behance</option>
                                                        <option value="dribbble">Dribbble</option>
                                                    </Form.Select>
                                                    <Form.Control type="text" placeholder="Enter Link" className="common-field shadow-none" />
                                                    <div className="d-flex gap-2">
                                                        <Button className="arrow-btn primary-arrow"><IoCheckmark /></Button>
                                                        <Button className="arrow-btn danger-arrow"><IoCloseOutline /></Button>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <div>
                                            <h3 className="main-customization-heading mb-3">Color Scheme</h3>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-4">
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
                                    <Col md={4} className="mb-4">
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
                                    <Col md={12} className="mb-2">
                                        <div>
                                            <h3 className="main-customization-heading mb-3">Typography</h3>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-4">
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
                                    <Col md={4} className="mb-4">
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
                                </Row>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="company_details" className="py-4">
                            <div>
                                <Row>
                                    <Col md={4}>
                                        <Form.Label className="font-14">Company Name</Form.Label>
                                        <div className="mb-4 custom-wrapper">
                                            <Form.Control type="text" className="common-field" value="Aviox Technologies Pvt Ltd" readOnly />
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label className="font-14">Company Address</Form.Label>
                                        <div className="mb-4 custom-wrapper">
                                            <Form.Control type="text" className="common-field" value="Sector 75 Industrial Area" readOnly />
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label className="font-14">Tax ID</Form.Label>
                                        <div className="mb-4 custom-wrapper">
                                            <Form.Control type="text" className="common-field" value="ISF65354VSDTE" readOnly />
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label className="font-14">Company Contact Number</Form.Label>
                                        <div className="mb-4 custom-wrapper">
                                            <Form.Control type="text" className="common-field" value="+91 1234567890" readOnly />
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label className="font-14">Company Email Address</Form.Label>
                                        <div className="mb-4 custom-wrapper">
                                            <Form.Control type="text" className="common-field" value="contact@avioxtechnologies.com" readOnly />
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label className="font-14">Select Timezone</Form.Label>
                                        <div className="mb-4 custom-wrapper">
                                            <Form.Control type="text" className="common-field" value="GMT(+5:30) Calcutta" readOnly />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </>
    )
}
export default Customization;