import React, { useState } from 'react'
import UploadFile from '../../../../components/common/UploadFile/UploadFile'
import { Button, Col, Row } from 'react-bootstrap'
import companyLogoImg from '../../../../assets/img/rexett-logo-white.png';
import favIconImgLogo from '../../../../assets/img/favicon.png'

function UploadFiles({previewUrl ,setPreviewUrl}) {
    const [favIconPreviewUrl, setFavIconPreviewUrl] = useState('')
    const [companyLogo, setCompanyLogo] = useState(null);
    const [favIconLogo, setFavIconLogo] = useState(null);
    

    const handleImageUpload = (event) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/svg"];
        const file = event.target.files[0];
        if (file && allowedTypes.includes(file.type)) {
            const url = URL.createObjectURL(file);
            setCompanyLogo(file);
            setPreviewUrl(url);
        }
    };
    

    const handleFavIconUpload = (event) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/svg"];
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFavIconLogo(file);
            setFavIconPreviewUrl(url);
        }
    };

    const handleRemoveImage = () => {
        setCompanyLogo(null);
        setPreviewUrl('');
    };

  
    const handleRemoveFavIcon = () => {
        setFavIconLogo(null);
        setFavIconPreviewUrl('');
    };





    return (
        <div>
            <Row>
            <Col md={6} className="mb-4">
                <h3 className="customization-heading">Upload Company Logo</h3>
                <p className="customization-text">
                    Your company logo is an essential part of your brand identity. Uploading it here will ensure it is prominently displayed across various sections of our platform, enhancing your brand's visibility and consistency.
                </p>
                <div className="mb-4 custom-wrapper">
                    {/* <Form.Control
                                                type="file"
                                                className="upload-custom-field"
                                                id="company-logo"
                                                accept="image/jpeg, image/png, image/svg+xml"
                                                onChange={handleImageUpload}
                                            />
                                            <Form.Label htmlFor="company-logo" className="upload-field-label">
                                                Upload File
                                            </Form.Label> */}
                    <UploadFile handleImageUpload={handleImageUpload} text={"Upload File"} />
                    {/* <p className="note-text">Only Accepted formats: JPEG, PNG, SVG</p> */}
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
                    {/* <Form.Control
                                                type="file"
                                                className="upload-custom-field"
                                                id="favicon-logo"
                                                accept="image/jpeg, image/png, image/svg+xml"
                                                onChange={handleFavIconUpload}
                                            />
                                            <Form.Label htmlFor="favicon-logo" className="upload-field-label">
                                                Upload File
                                            </Form.Label> */}
                    <UploadFile handleFavIconUpload={handleFavIconUpload} text={"Upload File"} />
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
                        </div>
                    </div>
                    <div className="web-controls">
                        <div className="minimize-web"></div>
                        <div className="fullscreen-web"></div>
                        <div className="close-web"></div>
                    </div>
                </div>
            </Col>
            </Row>
        </div>
    )
}

export default UploadFiles