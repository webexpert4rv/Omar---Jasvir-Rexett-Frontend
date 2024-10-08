import React, { useState } from 'react'
import { Col, Form, Row, Tab } from 'react-bootstrap'
import companyLogoImg from '../../../../assets/img/rexett-logo-white.png';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigDetails, getUploadFile } from '../../../../redux/slices/adminDataSlice';


function Typography({ previewUrl }) {
    const [fontSize, setFontSize] = useState(16)
    const [headingFontSize, setHeadingFontSize] = useState(16)
    const [bodyFontSize, setBodyFontSize] = useState(16)
    const [iconFontWidth, setIconFontWidth] = useState()

    const {configDetails} = useSelector(state => state.adminData)
    const dispatch = useDispatch()

    const handleRangeChange = (e) => {
        setFontSize(parseInt(e.target.value))
    }
    const handleHeadingRangeChange = (e) => {
        setHeadingFontSize(parseInt(e.target.value))
    }
    const handleBodyRangeChange = (e) => {
        setBodyFontSize(parseInt(e.target.value))
    }
    const handleWidthRangeChange=(e)=>{
        setIconFontWidth(e.target.value)
    }

    const handleRangeMouseUp = async(e) => {
        setFontSize(parseInt(e.target.value))
        let data = {
            crm_sidebar_font_size: fontSize
        }
        await dispatch(getUploadFile(data))
        dispatch(getConfigDetails())
    }

    const handleHeadingRangeMouseUp = async(e)=>{
        setHeadingFontSize(parseInt(e.target.value))
        let data = {
            crm_heading_font_size: headingFontSize
        }
        await dispatch(getUploadFile(data))
        dispatch(getConfigDetails())
    }
    const handleBodyRangeMouseUp = async(e)=>{
        setBodyFontSize(parseInt(e.target.value))
        let data = {
            crm_body_font_size: bodyFontSize
        }
        await dispatch(getUploadFile(data))
        dispatch(getConfigDetails())
    }
    const handleWidthRangeMouseUp= async(e)=>{
        setIconFontWidth(e.target.value)
        let data = {
            height: iconFontWidth,
            width: iconFontWidth
        }
        await dispatch(getUploadFile(data))
        dispatch(getConfigDetails())
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
                                    value={configDetails?.crm_sidebar_font_size ? configDetails?.crm_sidebar_font_size : fontSize}
                                    onChange={handleRangeChange}
                                    onMouseUp={handleRangeMouseUp}

                                />
                                <Form.Control
                                    type="text"
                                    placeholder="16px"
                                    value={configDetails?.crm_sidebar_font_size ? configDetails?.crm_sidebar_font_size : fontSize}
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
                                        <img src={companyLogoImg} className="preview-company-logo" style={{fontSize :   configDetails?.crm_sidebar_font_size ? `${configDetails.crm_sidebar_font_size}px` : fontSize }} alt="Company Logo Preview" />
                                    ) : (
                                        <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                    )}
                                </div>
                                <div className="skeleton-container mt-4">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index} className="mb-3 d-flex align-items-center gap-3">
                                            <div className="skeleton-circle"></div>
                                            <p className="preview-sidelink mb-0"  style={{fontSize :  configDetails?.crm_sidebar_font_size ? `${configDetails.crm_sidebar_font_size}px` :fontSize}}>Link {index + 1}</p>
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
                                    value={configDetails?.crm_heading_font_size ? configDetails?.crm_heading_font_size : headingFontSize}
                                    onChange={handleHeadingRangeChange}
                                    onMouseUp={handleHeadingRangeMouseUp}

                                />
                                <Form.Control
                                    type="text"
                                    placeholder="16px"
                                    value={configDetails?.crm_heading_font_size ? configDetails?.crm_heading_font_size : headingFontSize}
                                    className="common-field shadow-none"
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="mb-4">
                    <h2 className="preview-heading-size" style={{fontSize :  configDetails?.crm_heading_font_size ? `${configDetails.crm_heading_font_size}px` : headingFontSize }}>Heading</h2>
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
                                    value={configDetails?.crm_body_font_size ? configDetails?.crm_body_font_size : bodyFontSize }
                                    onChange={handleBodyRangeChange}
                                    onMouseUp={handleBodyRangeMouseUp}

                                />
                                <Form.Control
                                    type="text"
                                    placeholder="16px"
                                    value={configDetails?.crm_body_font_size ? configDetails?.crm_body_font_size : bodyFontSize}
                                    className="common-field shadow-none"
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="mb-4">
                    <p className="preview-text-size" style={{fontSize :  configDetails?.crm_body_font_size ? `${configDetails.crm_body_font_size}px` : bodyFontSize }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
                                    value={configDetails?.side_bar_icon_width ? configDetails?.side_bar_icon_width : iconFontWidth }
                                    onChange={handleWidthRangeChange}
                                    onMouseUp={handleWidthRangeMouseUp}

                                />
                                <Form.Control
                                    type="text"
                                    placeholder="16px"
                                    value={configDetails?.side_bar_icon_width ? configDetails?.side_bar_icon_width : iconFontWidth}
                                    className="common-field shadow-none"
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="mb-4">
                    <p className="preview-text-size" style={{fontSize :  configDetails?.side_bar_icon_size ? `${configDetails.side_bar_icon_size}px` : iconFontWidth }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </Col>
            </Row>
        </div>

    )
}

export default Typography