import React, { useEffect, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import companyLogoImg from '../../../../assets/img/rexett-logo-white.png';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigDetails, getUploadFile } from '../../../../redux/slices/adminDataSlice';
import { getConfig } from '@testing-library/react';


function ColorScheme({
    previewUrl,
    setPreviewUrl,
    setColorSchema,
    setFeatureName,
    colorSchema,
    register
}) {
    const [selectedColorType, setSelectedColorType] = useState("gradient-sidecolor");
    // const [colorValue, setColorValue] = useState('');
    // const [newColorValue, setNewColorValue] = useState('')
    // const [sideBarColor, setSideBarColor] = useState('')
    // const [solidColor, setSolidColor] = useState('')
    // const [primaryColor, setPrimaryColor] = useState('')
    // const [headingColor, setHeadingColor] = useState('')
    // const [bodyTextColor, setBodyTextColor] = useState('')
    // const [sideBarLinkBgColor, setSideBarLinkBgColor] = useState("")
    // const [sideBarIconColor, setSidebarIconColor] = useState()
    const dispatch = useDispatch()
    const { configDetails } = useSelector(state => state.adminData)
    console.log(colorSchema, "colorSchema")



    useEffect(() => {
        // setColorValue('')
        // setNewColorValue('')
        // setSolidColor('')
        setSelectedColorType("gradient-sidecolor")
    }, [])




    const handleColorSchema = (e, feature) => {
        setFeatureName(feature)
        setColorSchema({...colorSchema,[feature]:e.target.value })
    }




    const handleColorTypeChange = (event) => {
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
                                // name="sidebar-bgcolor"
                                id="gradient-sidecolor"
                                {...register("gradient-sidecolor", {
                                    onChange: (e) => handleColorTypeChange(e),
                                })}
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
                                // name="sidebar-bgcolor"
                                id="solid-sidecolor"
                                {...register("solid-sidecolor", {
                                    onChange: (e) => handleColorTypeChange(e),
                                })}
                                checked={selectedColorType === 'solid-sidecolor'}
                            />
                            <Form.Label htmlFor="solid-sidecolor" className="solid-color-label">
                                <span></span> Solid Color
                            </Form.Label>
                        </div>
                    </div>

                    {selectedColorType === 'gradient-sidecolor' && (
                        <div className="gradient-color-wrapper d-flex align-items-center gap-3">
                            <div>
                                <Form.Label className="font-14">1st Color</Form.Label>
                                <div
                                    className="common-field color-field-wrapper"
                                >
                                    <Form.Control
                                        type="color"
                                        className="color-field"
                                        value={colorSchema?.crm_sidebar_bg_gradient_color_1 || configDetails?.crm_sidebar_bg_gradient_color_1}
                                        // onBlur={handleColorBlur}
                                        {...register("crm_sidebar_bg_gradient_color_1", {
                                            onChange: (e) => handleColorSchema(e, "crm_sidebar_bg_gradient_color_1"),
                                        })}

                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="#000000"
                                        className="colortext-field"
                                        value={colorSchema?.crm_sidebar_bg_gradient_color_1 || configDetails?.crm_sidebar_bg_gradient_color_1}


                                    />
                                </div>
                            </div>
                            <div>
                                <Form.Label className="font-14">2nd Color</Form.Label>
                                <div className="common-field color-field-wrapper">
                                    <Form.Control
                                        type="color"
                                        className="color-field"
                                        value={colorSchema?.crm_sidebar_bg_gradient_color_2 || configDetails?.crm_sidebar_bg_gradient_color_2}
                                        // onBlur={handleSecondColorBlur}
                                        {...register("crm_sidebar_bg_gradient_color_2", {
                                            onChange: (e) => handleColorSchema(e, "crm_sidebar_bg_gradient_color_2"),
                                        })}
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="#000000"
                                        className="colortext-field"
                                        value={colorSchema?.crm_sidebar_bg_gradient_color_2 || configDetails?.crm_sidebar_bg_gradient_color_2}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedColorType === 'solid-sidecolor' && (
                        <div className="solid-color-wrapper">
                            <div className="common-field color-field-wrapper">
                                <Form.Control
                                    type="color"
                                    className="color-field"
                                    value={colorSchema?.crm_sidebar_bg_solid_color || configDetails?.crm_sidebar_bg_solid_color}
                                    // onBlur={handleSolidColorBlur}
                                    {...register("crm_sidebar_bg_solid_color", {
                                        onChange: (e) => handleColorSchema(e, "crm_sidebar_bg_solid_color"),
                                    })}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="#000000"
                                    className="colortext-field"
                                // value={ colorSchema?.crm_sidebar_bg_solid_color || configDetails?.crm_sidebar_bg_solid_color  }

                                />

                            </div>
                        </div>
                    )}
                </div>
            </Col>
            <Col md={6} className="mb-4" >
                <div className="preview-company-wrapper" >
                    <div className="position-relative"  >
                        <div className="preview-sidebar"  >
                            <div>
                                {previewUrl ? (
                                    <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                ) : (
                                    <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                )}
                            </div>
                            <div className="skeleton-container mt-4"  >
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className="mb-3 d-flex align-items-center gap-3"  >
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
                            <Form.Control
                                type="color"
                                className="color-field"
                                value={colorSchema?.crm_sidebar_link_color || configDetails?.crm_sidebar_link_color}
                                // onBlur={handleSideBarBlur}
                                {...register("crm_sidebar_link_color", {
                                    onChange: (e) => handleColorSchema(e, "crm_sidebar_link_color"),
                                })}

                            />
                            <Form.Control
                                type="text"
                                placeholder="#000000"
                                className="colortext-field"
                                value={colorSchema?.crm_sidebar_link_color || configDetails?.crm_sidebar_link_color}

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
                                {colorSchema?.crm_sidebar_link_color ? (
                                    <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                ) : (
                                    <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                )}
                            </div>
                            <div className="skeleton-container mt-4">
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className="mb-3 d-flex align-items-center gap-3">
                                        <div className="skeleton-circle" style={{ backgroundColor: configDetails?.crm_sidebar_link_color ? configDetails?.crm_sidebar_link_color : colorSchema?.crm_sidebar_link_color }}></div>
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
                    <h3 className="customization-heading">Sidebar Link Background Color</h3>
                    <p className="customization-text">Choosing a distinctive and readable color for your sidebar links helps users easily identify and interact with menu items.</p>
                    <div className="solid-color-wrapper">
                        <div className="common-field color-field-wrapper">
                            <Form.Control
                                type="color"
                                className="color-field"
                                value={colorSchema?.crm_sidebar_bg_link_color || configDetails?.crm_sidebar_bg_link_color}
                                // onBlur={handleSideBarLinkBlur}
                                {...register("crm_sidebar_bg_link_color", {
                                    onChange: (e) => handleColorSchema(e, "crm_sidebar_bg_link_color"),
                                })}
                            />
                            <Form.Control
                                type="text"
                                placeholder="#000000"
                                className="colortext-field"
                                value={colorSchema?.crm_sidebar_bg_link_color || configDetails?.crm_sidebar_bg_link_color}

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
                                {colorSchema?.crm_sidebar_bg_link_color ? (
                                    <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                ) : (
                                    <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                )}
                            </div>
                            <div className="skeleton-container mt-4">
                                {[...Array(4)]?.map((_, index) => (
                                    <div key={index} className="mb-3 d-flex align-items-center gap-3">
                                        <div className="skeleton-circle" style={{ backgroundColor: colorSchema?.crm_sidebar_link_color || configDetails?.crm_sidebar_link_color }}></div>
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
                    <h3 className="customization-heading">Sidebar Icon Color</h3>
                    <p className="customization-text">Choosing a distinctive and readable color for your sidebar links helps users easily identify and interact with menu items.</p>
                    <div className="solid-color-wrapper">
                        <div className="common-field color-field-wrapper">
                            <Form.Control
                                type="color"
                                className="color-field"
                                value={colorSchema?.side_bar_icon_color || configDetails?.side_bar_icon_color}
                                // onBlur={handleColorSchema}
                                {...register("side_bar_icon_color", {
                                    onChange: (e) => handleColorSchema(e, "side_bar_icon_color"),
                                })}
                            />
                            <Form.Control
                                type="text"
                                placeholder="#000000"
                                className="colortext-field"
                                value={colorSchema?.side_bar_icon_color || configDetails?.side_bar_icon_color}

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
                                {colorSchema ? (
                                    <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                ) : (
                                    <img src={companyLogoImg} className="preview-company-logo" alt="Company Logo Preview" />
                                )}
                            </div>
                            <div className="skeleton-container mt-4">
                                {[...Array(4)]?.map((_, index) => (
                                    <div key={index} className="mb-3 d-flex align-items-center gap-3"
                                    >
                                        <div className="skeleton-circle" style={{ backgroundColor: configDetails?.side_bar_icon_color ? configDetails?.side_bar_icon_color : colorSchema?.side_bar_icon_color }}></div>
                                        <p className="preview-sidelink mb-0"   >Link {index + 1}</p>
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
                            <Form.Control
                                type="color"
                                className="color-field"
                                value={colorSchema?.crm_primary_color || configDetails?.crm_primary_color}
                                // onBlur={handlePrimaryColorBlur}
                                {...register("crm_primary_color", {
                                    onChange: (e) => handleColorSchema(e, "crm_primary_color"),
                                })}

                            />
                            <Form.Control
                                type="text"
                                placeholder="#000000"
                                className="colortext-field"
                                value={colorSchema?.crm_primary_color || configDetails?.crm_primary_color}

                            />
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={6} className="mb-4">
                <div className="preview-primary-color">
                    <div className="mb-3">
                        <Button variant="transparent" className="preview-color-btn" style={{ backgroundColor: colorSchema?.crm_primary_color || configDetails?.crm_primary_color }}>Button</Button>
                    </div>
                    <div className="tabs-preview-color">
                        <Button variant="transparent" className="preview-tab active" style={{ backgroundColor: colorSchema?.crm_primary_color || configDetails?.crm_primary_color }}>Tab 1</Button>
                        <Button variant="transparent" className="preview-tab" >Tab 2</Button>
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
                            <Form.Control
                                type="color"
                                className="color-field"
                                value={colorSchema?.crm_heading_color || configDetails?.crm_heading_color}
                                // onBlur={handleHeadingColorBlur}
                                {...register("crm_heading_color", {
                                    onChange: (e) => handleColorSchema(e, "crm_heading_color"),
                                })}
                            />
                            <Form.Control
                                type="text"
                                placeholder="#000000"
                                className="colortext-field"
                                value={colorSchema?.crm_heading_color || configDetails?.crm_heading_color}

                            />
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={6} className="mb-4">
                <h2 className="preview-heading-color" style={{ color: colorSchema?.crm_heading_color || configDetails?.crm_heading_color }}>Heading</h2>
            </Col>
            <Col md={6} className="mb-4">
                <div>
                    <h3 className="customization-heading">Body text Color</h3>
                    <p className="customization-text">Choose a color that provides good contrast with your background to ensure your content is easy to read and visually appealing.</p>
                    <div className="solid-color-wrapper">
                        <div className="common-field color-field-wrapper">
                            <Form.Control
                                type="color"
                                className="color-field"
                                value={colorSchema?.crm_body_text_color || configDetails?.crm_body_text_color}
                                // onBlur={handleBodyTextColorBlur}
                                {...register("crm_body_text_color", {
                                    onChange: (e) => handleColorSchema(e, "crm_body_text_color"),
                                })}
                            />
                            <Form.Control
                                type="text"
                                placeholder="#000000"
                                className="colortext-field"
                                value={colorSchema?.crm_body_text_color || configDetails?.crm_body_text_color}

                            />
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={6} className="mb-4">
                <p className="preview-text-color" style={{ color: colorSchema?.crm_body_text_color || configDetails?.crm_body_text_color }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </Col>


        </>
    )
}

export default ColorScheme