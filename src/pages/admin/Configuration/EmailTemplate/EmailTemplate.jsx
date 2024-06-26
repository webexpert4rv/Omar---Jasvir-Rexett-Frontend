import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6'
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5'
import { IoIosAdd } from "react-icons/io";
import { Link } from 'react-router-dom'
import companyEmailLogoImg from '../../../../assets/img/rexett-logo.png';
import { getConfigDetails, getUploadFile } from '../../../../redux/slices/adminDataSlice'
import { filePreassignedUrlGenerate } from '../../../../redux/slices/clientDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import ScreenLoader from '../../../../components/atomic/ScreenLoader';
import RexettButton from '../../../../components/atomic/RexettButton';
import ToolTip from '../../../../components/common/Tooltip/ToolTip';


function EmailTemplate({ currentTab, previewUrl }) {
    const [copyRightText, setCopyRightText] = useState("")
    const [inputs, setInputs] = useState([{ id: 1, social: '', value: '' }]);
    const { configDetails, screenLoader, smallLoader, approvedLoader } = useSelector(state => state.adminData)
    const [headingColor, setHeadingColor] = useState('')
    const [bodyTextColor, setBodyTextColor] = useState('')
    const [headingFontSize, setHeadingFontSize] = useState(16)
    const [bodyFontSize, setBodyFontSize] = useState(16)
    const [socialValue, setSocialValue] = useState('')
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch()


    const handleOnChange = (e) => {
        setCopyRightText(e.target.value)
    }
    const handleHeadingRangeChange = (e) => {
        setHeadingFontSize(parseInt(e.target.value))
    }
    const handleBodyRangeChange = (e) => {
        setBodyFontSize(parseInt(e.target.value))
    }
    const handleOnClick = async () => {
        if (copyRightText) {
            let payload = {
                copy_right_text: copyRightText
            }
            await dispatch(getUploadFile(payload))
            dispatch(getConfigDetails())
        }
    }
    const handleClear = () => {
        setCopyRightText('')
    }

    const handleSocialChange = (index, e) => {
        setSocialValue(e.target.value)
        const newInputs = [...inputs];
        newInputs[index].social = e.target.value;
        setInputs(newInputs);
    };

    const handleLinkChange = (index, e) => {
        setInputValue(e.target.value)
        const newInputs = [...inputs];
        newInputs[index].value = e.target.value;
        setInputs(newInputs);
    };
    const handleAddInput = () => {
        const newId = inputs.length + 1;
        setInputs([...inputs, { id: newId, social: '', value: '' }]);
    };

    const handleRemove = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };


    const handleSubmit = async (index) => {
        const validInputs = inputs.filter(input => input.social && input.value);
        const socialMediaLinks = validInputs.map(input => ({
            name: input.social,
            url: input.value
        }));
        let data = {
            social_media_link: socialMediaLinks
        };
        await dispatch(getUploadFile(data))
        dispatch(getConfigDetails())
    }
    const handleHeadingChange = (e) => {
        setHeadingColor(e.target.value)
    }
    const handleBodyTextColorChange = (e) => {
        setBodyTextColor(e.target.value)

    }
    const handleHeadingColorBlur = async (e) => {
        let data = {
            email_heading_text_color: headingColor
        }
        await dispatch(getUploadFile(data))
        dispatch(getConfigDetails())
    }
    const handleBodyTextColorBlur = async (e) => {
        let data = {
            email_body_text_color: bodyTextColor
        }
        await dispatch(getUploadFile(data))
        dispatch(getConfigDetails())

    }
    const handleHeadingRangeMouseUp = async (e) => {
        setHeadingFontSize(parseInt(e.target.value))
        let data = {
            email_heading_font_size: headingFontSize
        }
        await dispatch(getUploadFile(data))
        dispatch(getConfigDetails())
    }
    const handleBodyRangeMouseUp = async (e) => {
        setBodyFontSize(parseInt(e.target.value))
        let data = {
            email_body_font_size: bodyFontSize
        }
        await dispatch(getUploadFile(data))
        dispatch(getConfigDetails())
    }

    return (
        <>
            {screenLoader ? <ScreenLoader /> :
                <div>
                    {currentTab === "second" &&
                        <div>
                            <Row>
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
                                            <Form.Control
                                                type="text"
                                                id="1"
                                                placeholder="Enter copyright text"
                                                className="common-field shadow-none w-100"
                                                value={copyRightText}
                                                onChange={handleOnChange}
                                            />
                                            <div className="d-inline-flex gap-2 w-auto">
                                                <ToolTip text="Submit">
                                                    <RexettButton
                                                        className="arrow-btn primary-arrow"
                                                        isLoading={smallLoader ? smallLoader : false}
                                                        icon={smallLoader ? smallLoader : <IoCheckmark />}
                                                        onClick={handleOnClick} />
                                                </ToolTip>
                                                <ToolTip text="Clear">
                                                    <RexettButton
                                                        className="arrow-btn danger-arrow"
                                                        onClick={handleClear}
                                                    ><IoCloseOutline /></RexettButton>
                                                </ToolTip>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} className="mb-4">
                                    <div className="preview-email-wrapper">
                                        <div className="preview-email-footer">
                                            <div>
                                                <p className="mb-0">@{configDetails?.copy_right_text ? configDetails?.copy_right_text : ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} className="mb-4">
                                    <h3 className="customization-heading">Social Media Links</h3>
                                    <p className="customization-text">Adjusting the font size allows you to emphasize important sections and improve the user experience.</p>
                                    <div>
                                        {inputs.map((input, index) => (
                                            <Form.Group key={input.id} className="d-flex gap-2 align-items-center">
                                                <Form.Select
                                                    className="common-field font-14 w-auto"
                                                    value={input.social}
                                                    onChange={(e) =>
                                                        handleSocialChange(index, e)}
                                                >
                                                    <option value="">Select Social</option>
                                                    <option value="x(Twitter)">X(Twitter)</option>
                                                    <option value="linkedin">LinkedIn</option>
                                                    <option value="github">GitHub</option>
                                                </Form.Select>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Link"
                                                    className="common-field shadow-none"
                                                    value={input.value}
                                                    onChange={(e) => handleLinkChange(index, e)}
                                                />
                                                <div className="d-flex gap-2">
                                                    {index === inputs.length - 1 && (
                                                        <ToolTip text="Add more">
                                                            <Button className="arrow-btn primary-arrow" onClick={handleAddInput}>
                                                                <IoIosAdd />
                                                            </Button>
                                                        </ToolTip>
                                                    )}
                                                    {input.value.length > 0 && index === inputs.length - 1 && (
                                                        <ToolTip text="Submit">
                                                            <RexettButton
                                                                className="arrow-btn primary-arrow"
                                                                isLoading={approvedLoader ? approvedLoader : false}
                                                                icon={approvedLoader ? approvedLoader : <IoCheckmark />}
                                                                onClick={() => handleSubmit(index)} />
                                                        </ToolTip>
                                                    )}
                                                    {index > 0 && (
                                                        <ToolTip text="Clear">
                                                            <Button className="arrow-btn danger-arrow" onClick={() => handleRemove(index)}>
                                                                <IoCloseOutline />
                                                            </Button>
                                                        </ToolTip>
                                                    )}

                                                </div>
                                            </Form.Group>
                                        ))}
                                    </div>
                                </Col>
                                <Col md={6} className="mb-4">
                                    <div className="preview-email-wrapper">
                                        <div className="preview-email-footer">
                                            <div>
                                                <ul className="social-listing mb-0 ps-0">
                                                    {configDetails?.social_media_link.map((item, index) => {
                                                        if (item.name === "x(Twitter)") {
                                                            return (
                                                                <li key={index}>
                                                                    <Link to={item.url}>
                                                                        <FaXTwitter />
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                        if (item.name === "github") {
                                                            return (
                                                                <li key={index}>
                                                                    <Link to={item.url}>
                                                                        <FaGithub />
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                        if (item.name === "linkedin") {
                                                            return (
                                                                <li key={index}>
                                                                    <Link to={item.url}>
                                                                        <FaLinkedinIn />
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                        return null
                                                    })}
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
                                                <Form.Control
                                                    type="color"
                                                    className="color-field"
                                                    value={configDetails?.email_heading_text_color ? configDetails?.email_heading_text_color : headingColor}
                                                    onBlur={handleHeadingColorBlur}
                                                    onChange={handleHeadingChange}

                                                />
                                                <Form.Control
                                                    type="text"
                                                    placeholder="#000000"
                                                    className="colortext-field"
                                                    value={configDetails?.email_heading_text_color ? configDetails?.email_heading_text_color : headingColor}

                                                />
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
                                                <Form.Control
                                                    type="color"
                                                    className="color-field"
                                                    value={configDetails?.email_body_text_color ? configDetails?.email_body_text_color : bodyTextColor}
                                                    onBlur={handleBodyTextColorBlur}
                                                    onChange={handleBodyTextColorChange}

                                                />
                                                <Form.Control
                                                    type="text"
                                                    placeholder="#000000"
                                                    className="colortext-field"
                                                    value={configDetails?.email_body_text_color ? configDetails?.email_body_text_color : bodyTextColor}

                                                />
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
                                                <Form.Range
                                                    className="w-100"
                                                    min="16"
                                                    max="100"
                                                    value={configDetails?.email_heading_font_size ? configDetails?.email_heading_font_size : headingFontSize}
                                                    onChange={handleHeadingRangeChange}
                                                    onMouseUp={handleHeadingRangeMouseUp}

                                                />
                                                <Form.Control
                                                    type="text"
                                                    placeholder="16px"
                                                    value={configDetails?.email_heading_font_size ? configDetails?.email_heading_font_size : headingFontSize}
                                                    className="common-field shadow-none"
                                                />

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
                                                <Form.Range
                                                    className="w-100"
                                                    min="16"
                                                    max="100"
                                                    value={configDetails?.email_body_font_size ? configDetails?.email_body_font_size : bodyFontSize}
                                                    onChange={handleBodyRangeChange}
                                                    onMouseUp={handleBodyRangeMouseUp}

                                                />
                                                <Form.Control
                                                    type="text"
                                                    placeholder="16px"
                                                    value={configDetails?.email_body_font_size ? configDetails?.email_body_font_size : bodyFontSize}
                                                    className="common-field shadow-none"
                                                />
                                                {/* <Form.Range min="16" max="100" className="w-100" />
                                        <Form.Control type="text" placeholder="16px" className="common-field shadow-none" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    }
                </div >
            }
        </>

    )
}

export default EmailTemplate