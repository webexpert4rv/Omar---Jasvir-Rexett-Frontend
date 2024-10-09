import React, { useState } from 'react'
import { Col, Form, Row, Tab } from 'react-bootstrap'
import companyLogoImg from '../../../../assets/img/rexett-logo-white.png';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigDetails, getUploadFile } from '../../../../redux/slices/adminDataSlice';


function Typography({ previewUrl, register, setTypoChange,typoChange }) {
    const [fontSize, setFontSize] = useState(16)
    const [headingFontSize, setHeadingFontSize] = useState(16)
    const [bodyFontSize, setBodyFontSize] = useState(16)
    const [iconFontWidth, setIconFontWidth] = useState(16)
    const [iconFontHeight, setIconFontHeight] = useState(16)


    const { configDetails } = useSelector(state => state.adminData)
    const dispatch = useDispatch()

    console.log(fontSize, "fontSize")
    console.log(headingFontSize, "headingFontSize")
    console.log(bodyFontSize, "fontSize")
    console.log(iconFontWidth, "iconFontWidth")




    const handleRangeMouseUp = (e) => {
        setFontSize((e.target.value))
    }

    const handleHeadingRangeMouseUp = (e) => {
        setHeadingFontSize((e.target.value))
    }
    const handleBodyRangeMouseUp = (e) => {
        setBodyFontSize((e.target.value))
    }
    const handleWidthRangeMouseUp = (e) => {
        setIconFontWidth(e.target.value)
    }
    const handleHeightRangeMouseUp = (e) => {
        setIconFontHeight(e.target.value)
    }
    const handleTypoChange = (event, fieldName) => {
        setTypoChange({...typoChange,[fieldName]:event.target.value})
    }
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
                                <Form.Range
                                    className="w-100"
                                    min="16"
                                    max="100"
                                    value={typoChange?.crm_sidebar_font_size || configDetails?.crm_sidebar_font_size}
                                    onMouseUp={handleRangeMouseUp}
                                    {...register("crm_sidebar_font_size", {
                                        onChange: (e) => handleTypoChange(e, "crm_sidebar_font_size"),
                                    })}

                                />
                                <Form.Control
                                    type="text"
                                    placeholder="16px"
                                    value={`${typoChange?.crm_sidebar_font_size}px` || `${configDetails?.crm_sidebar_font_size}px`}
                                    className="common-field shadow-none"
                                />
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
                                        <img src={companyLogoImg} className="preview-company-logo" style={{ fontSize:`${configDetails.crm_sidebar_font_size}px` || typoChange?.crm_sidebar_font_size }} alt="Company Logo Preview" />
                                    ) : (
                                        <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                    )}
                                </div>
                                <div className="skeleton-container mt-4">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index} className="mb-3 d-flex align-items-center gap-3">
                                            <div className="skeleton-circle"></div>
                                            <p className="preview-sidelink mb-0" style={{ fontSize:  `${configDetails.crm_sidebar_font_size}px` || typoChange?.crm_sidebar_font_size }}>Link {index + 1}</p>
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
                                <Form.Range
                                    className="w-100"
                                    min="16"
                                    max="100"
                                    value={typoChange?.crm_heading_font_size || configDetails?.crm_heading_font_size }
                                    {...register("crm_heading_font_size", {
                                        onChange: (e) => handleTypoChange(e,"crm_heading_font_size"),
                                    })}
                                    onMouseUp={handleHeadingRangeMouseUp}

                                />
                                <Form.Control
                                    type="text"
                                    placeholder="16px"
                                    value={`${typoChange?.crm_heading_font_size}px` || `${configDetails?.crm_heading_font_size}px`}
                                    className="common-field shadow-none"
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="mb-4">
                    <h2 className="preview-heading-size" style={{ fontSize: `${typoChange?.crm_heading_font_size}px` || `${configDetails.crm_heading_font_size}px` }}>Heading</h2>
                </Col>
                <Col md={6} className="mb-4">
                    <div>
                        <h3 className="customization-heading">Body Font Size</h3>
                        <p className="customization-text">Adjusting the font size allows you to emphasize important sections and improve the user experience.</p>
                        <div className="solid-color-wrapper">
                            <div className="color-field-wrapper">
                                <Form.Range
                                    className="w-100"
                                    min="16"
                                    max="100"
                                    value={ typoChange?.crm_body_font_size || configDetails?.crm_body_font_size }
                                    {...register("crm_body_font_size", {
                                        onChange: (e) => handleTypoChange(e, "crm_body_font_size"),
                                    })}
                                    onMouseUp={handleBodyRangeMouseUp}

                                />
                                <Form.Control
                                    type="text"
                                    placeholder="16px"
                                    value={`${typoChange?.crm_body_font_size}px` || `${configDetails?.crm_body_font_size}px`}
                                    className="common-field shadow-none"
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="mb-4">
                    <p className="preview-text-size" style={{ fontSize: `${typoChange?.crm_body_font_size}px` || `${configDetails.crm_body_font_size}px`  }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </Col>
                <Col md={6} className="mb-4">
                    <div>
                        <h3 className="customization-heading">Sidebar Icon Font Size</h3>
                        <p className="customization-text">Adjusting the font size allows you to emphasize important sections and improve the user experience.</p>
                        <div className="solid-color-wrapper">
                            <div className="color-field-wrapper">
                                <Form.Range
                                    className="w-100"
                                    min="16"
                                    max="100"
                                    value={ typoChange?.side_bar_icon_width ||configDetails?.side_bar_icon_size?.width  }
                                    {...register("side_bar_icon_width", {
                                        onChange: (e) => handleTypoChange(e, "side_bar_icon_width"),
                                    })}
                                    onMouseUp={handleWidthRangeMouseUp}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="16px"
                                    value={`${typoChange?.side_bar_icon_width}px` || `${configDetails?.side_bar_icon_size?.width }px`}
                                    className="common-field shadow-none"
                                />
                            </div>
                        </div>
                        <div className="solid-color-wrapper">
                            <div className="color-field-wrapper">
                                <Form.Range
                                    className="w-100"
                                    min="16"
                                    max="100"
                                    value={ typoChange?.side_bar_icon_height ||configDetails?.side_bar_icon_size?.height  }
                                    {...register("side_bar_icon_height", {
                                        onChange: (e) => handleTypoChange(e, "side_bar_icon_height"),
                                    })}
                                    onMouseUp={handleHeightRangeMouseUp}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="16px"
                                    value={`${typoChange?.side_bar_icon_height}px` || `${configDetails?.side_bar_icon_size?.height}px`}
                                    className="common-field shadow-none"
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="mb-4">
                    <p className="preview-text-size" style={{ fontSize: `${typoChange?.side_bar_icon_height}px` || `${configDetails?.side_bar_icon_size?.height}px`}}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </Col>
            </Row>
        </div>

    )
}

export default Typography