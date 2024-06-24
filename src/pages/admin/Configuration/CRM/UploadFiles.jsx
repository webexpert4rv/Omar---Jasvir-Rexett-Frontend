import React, { useState } from 'react'
import UploadFile from '../../../../components/common/UploadFile/UploadFile'
import { Button, Col, Form, Row } from 'react-bootstrap'
import companyLogoImg from '../../../../assets/img/rexett-logo-white.png';
import favIconImgLogo from '../../../../assets/img/favicon.png'
import { getUploadFile } from '../../../../redux/slices/adminDataSlice';
import { useDispatch } from 'react-redux';
import { filePreassignedUrlGenerate } from '../../../../redux/slices/clientDataSlice';

function UploadFiles({ previewUrl, setPreviewUrl }) {
    const [favIconPreviewUrl, setFavIconPreviewUrl] = useState('')
    const [companyLogo, setCompanyLogo] = useState(null);
    const [selectedImage, setSelectedImage] = useState("")
    const [favIconLogo, setFavIconLogo] = useState(null);
    const [uploadFavIcon, setUploadedFavIcon] = useState("")
    const dispatch = useDispatch()

    const handleImageUpload =  (event, filename) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                if (filename === "companyLogo") {
                    setPreviewUrl(reader.result);
                } else {
                    setFavIconPreviewUrl(reader.result)
                }

            };
            reader.readAsDataURL(file)
        }


        let fileData = new FormData()
        fileData.append("file", file)

        if (filename === "companyLogo") {
            dispatch(filePreassignedUrlGenerate(fileData, (url) => {
                console.log(url, "url");
                let payload = {
                    company_logo: url,
                };
                dispatch(getUploadFile(payload))
            //   dispatch(getConfigDetails())
            }));
        } else {
            dispatch(filePreassignedUrlGenerate(fileData, (url) => {
                console.log(url, "url");
                let payload = {
                    favicon: url,
                };
                dispatch(getUploadFile(payload));
                // dispatch(getConfigDetails())
            }));
        }
    }
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
                        <UploadFile handleImageUpload={(e) => handleImageUpload(e, "compnyLogo")} text={"Upload File"} name={"company-logo"} />
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
                        <UploadFile handleImageUpload={(e) => handleImageUpload(e, "favicon")} text={"Upload File"} name={"favicon"} />
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