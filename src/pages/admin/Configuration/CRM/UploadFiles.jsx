import React, { useState } from 'react'
import UploadFile from '../../../../components/common/UploadFile/UploadFile'
import { Button, Col, Form, Row } from 'react-bootstrap'
import companyLogoImg from '../../../../assets/img/rexett-logo-white.png';
import favIconImgLogo from '../../../../assets/img/favicon.png'
import { getConfigDetails, getUploadFile } from '../../../../redux/slices/adminDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { filePreassignedUrlGenerate } from '../../../../redux/slices/clientDataSlice';
import { IMAGE_ALLOWED_EXTENSIONS } from '../../../websiteRegisterForm/developer/developeStepConstant';

function UploadFiles({ previewUrl, setPreviewUrl, setFileName, files, setFiles, register }) {
    const [favIconPreviewUrl, setFavIconPreviewUrl] = useState('')
    const { configDetails } = useSelector(state => state.adminData)

    const handleImageUpload = (event, filename) => {
        setFileName(filename)
        const file = event.target.files[0];
        setFiles({ ...files, [filename]: file })
        if (file) {
            if (IMAGE_ALLOWED_EXTENSIONS.includes(file.type)) {
                const url = URL.createObjectURL(file);
                if (filename === "company_logo") {
                    setPreviewUrl(url);
                } else {
                    setFavIconPreviewUrl(url)
                }
            }
        }
    }

    const handleRemoveImage = () => {
        setPreviewUrl('');
    };

    const handleRemoveFavIcon = () => {
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
                        <Form.Control
                            type="file"
                            className="upload-custom-field"
                            id="company-logo"
                            accept="image/jpeg, image/png, image/svg+xml"
                            {...register("company-logo", {
                                onChange: (e) => handleImageUpload(e, "company_logo"),
                            })}
                        />
                        <Form.Label htmlFor="company-logo" className="upload-field-label">
                            Upload File
                        </Form.Label>
                        <p className="note-text">Only Accepted formats: JPEG, PNG, SVG</p>
                        <div className="preview-upload-imgwrapper">
                            <img src={previewUrl || configDetails?.company_logo} className="upload-preview-img" alt="Company Logo" />
                            <Button variant="transparent" className="remove-preview-img" onClick={handleRemoveImage}>
                                &times;
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="mb-4">
                    <div className="preview-company-wrapper">
                        <div className="position-relative">
                            <div className="preview-sidebar">
                                <div>
                                    <img src={previewUrl || configDetails?.company_logo} className="preview-company-logo" alt="Company Logo Preview" />
                                    {/* ) : (
                                        <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                    )} */}
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
                            name="company_logo_1"
                            id="company_logo_1"
                            accept="image/jpeg, image/png, image/svg+xml"
                            {...register("company_logo_1", {
                                onChange: (e) => handleImageUpload(e, "favicon"),
                            })}
                        />
                        <Form.Label htmlFor="company_logo_1" className="upload-field-label">
                            Upload File
                        </Form.Label>
                        <p className="note-text">Only Accepted formats: JPEG, PNG, SVG. Recommended size: 16x16 pixels, 32x32 pixels, or 48x48 pixels</p>
                    </div>

                    <div className="preview-upload-imgwrapper">
                        <img src={favIconPreviewUrl || configDetails?.favicon} className="upload-preview-img" alt="Company Logo" />
                        <Button variant="transparent" className="remove-preview-img" onClick={handleRemoveFavIcon}>
                            &times;
                        </Button>
                    </div>
                </Col>
                <Col md={6} className="mb-4">
                    <div className="preview-statusbar-wrapper">
                        <div className="position-relative">
                            <div className="preview-statusbar">
                                <div className="d-flex align-items-center w-100 gap-2">
                                    {/* {favIconPreviewUrl ? ( */}
                                    <img src={favIconPreviewUrl || configDetails?.favicon} className="preview-favicon-logo" alt="Favicon Preview" />
                                    {/* ) : (
                                        <img src={favIconImgLogo} className="preview-favicon-logo" alt="Favicon Preview" />
                                    )} */}
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