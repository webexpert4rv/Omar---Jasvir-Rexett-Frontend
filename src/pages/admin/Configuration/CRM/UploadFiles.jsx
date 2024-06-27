import React, { useState } from 'react'
import UploadFile from '../../../../components/common/UploadFile/UploadFile'
import { Button, Col, Form, Row } from 'react-bootstrap'
import companyLogoImg from '../../../../assets/img/rexett-logo-white.png';
import favIconImgLogo from '../../../../assets/img/favicon.png'
import { getConfigDetails, getUploadFile } from '../../../../redux/slices/adminDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { filePreassignedUrlGenerate } from '../../../../redux/slices/clientDataSlice';

function UploadFiles({ previewUrl, setPreviewUrl }) {
    const [favIconPreviewUrl, setFavIconPreviewUrl] = useState('')
    const [companyLogo, setCompanyLogo] = useState(null);
    const [selectedImage, setSelectedImage] = useState("")
    const [favIconLogo, setFavIconLogo] = useState(null);
    const [uploadFavIcon, setUploadedFavIcon] = useState("")
    const { configDetails } = useSelector(state => state.adminData)
    const dispatch = useDispatch()

    console.log(configDetails,'configDetails')

    const handleImageUpload = async (event, filename) => {
        console.log(filename, "filename");
        const file = event.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                if (filename === "companyLogo") {
                    setPreviewUrl(reader.result);
                } else {
                    setFavIconPreviewUrl(reader.result);
                }
            };
            reader.readAsDataURL(file);
    
            let fileData = new FormData();
            fileData.append("file", file);
    
            try {
                const url = await new Promise((resolve, reject) => {
                    dispatch(filePreassignedUrlGenerate(fileData, resolve, reject));
                });
    
                if (filename === "companyLogo") {
                    let payload = {
                        company_logo: url,
                    };
                    await dispatch(getUploadFile(payload));
                     dispatch(getConfigDetails());
                } else {
                    let payload = {
                        favicon: url,
                    };
                    await dispatch(getUploadFile(payload));
                     dispatch(getConfigDetails());
                }
            } catch (error) {
                console.error("Error handling image upload:", error);
                // Handle error as needed
            }
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
                        <Form.Control
                            type="file"
                            className="upload-custom-field"
                            name="company-logo"
                            id="company-logo"
                            accept="image/jpeg, image/png, image/svg+xml"
                            onChange={(e) => handleImageUpload(e, "companyLogo")}
                        />
                        <Form.Label htmlFor="company-logo" className="upload-field-label">
                            Upload File
                        </Form.Label>
                        <p className="note-text">Only Accepted formats: JPEG, PNG, SVG</p>
                            <div className="preview-upload-imgwrapper">
                                <img src={configDetails?.company_logo ? configDetails?.company_logo :previewUrl} className="upload-preview-img" alt="Company Logo" />
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
                                        <img src={configDetails?.company_logo ? configDetails?.company_logo :previewUrl} className="preview-company-logo" alt="Company Logo Preview" />
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
                            name="favicon"
                            id="favicon"
                            accept="image/jpeg, image/png, image/svg+xml"
                            onChange={(e) => handleImageUpload(e, "favicon")}
                        />
                        <Form.Label htmlFor="favicon" className="upload-field-label">
                            Upload File
                        </Form.Label>
                        <p className="note-text">Only Accepted formats: JPEG, PNG, SVG. Recommended size: 16x16 pixels, 32x32 pixels, or 48x48 pixels</p>
                    </div>

                        <div className="preview-upload-imgwrapper">
                            <img src={configDetails?.favicon ? configDetails?.favicon : favIconPreviewUrl} className="upload-preview-img" alt="Company Logo" />
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
                                        <img src={configDetails?.favicon ? configDetails?.favicon : favIconPreviewUrl}className="preview-favicon-logo" alt="Favicon Preview" />
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