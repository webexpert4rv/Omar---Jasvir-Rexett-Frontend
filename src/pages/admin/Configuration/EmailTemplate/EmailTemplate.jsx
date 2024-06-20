import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import companyEmailLogoImg from '../../../../assets/img/rexett-logo.png';


function EmailTemplate({ currentTab, previewUrl }) {
    const [previewEmailUrl, setPreviewEmailUrl] = useState('')
    const [companyEmailLogo, setCompanyEmailLogo] = useState(null);
    console.log(currentTab, "currenttab")
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
    return (
        <div>
            {currentTab === "second" &&
                <div>
                    <Row>
                        <Col md={6} className="mb-4">
                            <h3 className="customization-heading">Email Template Logo</h3>
                            <p className="customization-text">Your company logo is an essential part of your brand identity. Uploading it here will ensure it is prominently displayed across various sections of our platform, enhancing your brand's visibility and consistency</p>
                            {/* <div className="mb-4 custom-wrapper">
                                        <Form.Control
                                            type="file"
                                            className="upload-custom-field"
                                            id="company-email-logo"
                                            accept="image/jpeg, image/png, image/svg+xml"
                                            onChange={handleEmailImageUpload}
                                        />
                                        <Form.Label htmlFor="company-email-logo" className="upload-field-label">Upload File</Form.Label>
                                        <p className="note-text">Only Accepted formats: JPEG, PNG, SVG</p>
                                    </div> */}
                            {/* {previewEmailUrl && (
                                        <div className="preview-upload-imgwrapper">
                                            <img src={previewEmailUrl} className="upload-preview-img" alt="Company Logo" />
                                            <Button variant="transparent" className="remove-preview-img" onClick={handleRemoveEmailImage}>
                                                &times;
                                            </Button>
                                        </div>
                                    )} */}
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="preview-email-wrapper">
                                <div className="position-relative">
                                    <div className="">
                                        <div className="text-center">
                                            {previewUrl ? (
                                                <img src={previewUrl} className="preview-email-logo" alt="Company Logo Preview" />
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
                            <div className="preview-email-wrapper">
                                <div className="preview-email-footer">
                                    <div>
                                        <p className="mb-0">© All right reserved to Rexett</p>
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
                        <Col md={6} className="mb-4">
                            <div className="preview-email-wrapper">
                                <div className="preview-email-footer">
                                    <div>
                                        <ul className="social-listing mb-0 ps-0">
                                            <li>
                                                <Link to={'#'}>
                                                    <FaFacebookF />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'#'}>
                                                    <FaXTwitter />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'#'}>
                                                    <FaInstagram />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'#'}>
                                                    <FaLinkedinIn />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
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
            }
        </div>
    )
}

export default EmailTemplate