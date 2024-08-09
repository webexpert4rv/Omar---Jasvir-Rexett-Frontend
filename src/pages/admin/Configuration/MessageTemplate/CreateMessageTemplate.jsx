import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ReactQuill, { Quill } from 'react-quill';
import RexettButton from '../../../../components/atomic/RexettButton';
import { editMessageTemplate, filePreassignedUrlGenerate, getAllMessageTemplates, getMessageTemplate, getMessageTemplates, getTemplateById } from '../../../../redux/slices/adminDataSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CreateMessageTemplate = () => {
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
        watch,
        setError,
        setValue,
        clearErrors,
    } = useForm({});
    // const [valuemessga, setValue] = useState('');
    const [data, setData] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const quillRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState("")
    const [file, setFile] = useState("")
    const [fileError, setFileError] = useState(false)
    const [defaultReject, setDefaultReject] = useState(false)
    const [defaultReply, setDefaultReply] = useState(false)
    const [welcomeEmail, setWelcomeEmail] = useState(false)
    const id = location.pathname.split("/")[3];


    useEffect(() => {
        if (id) {
            dispatch(getTemplateById(id, (response) => {
                console.log(response, "data")
                setData(response)
                for (let key in response) {
                    setValue(key, response[key])
                }
            }))
        }
    }, [id])
    
    useEffect(()=>{
        setDefaultReject(data?.default_reject || false)
        setDefaultReply(data?.default_reply || false)
        setWelcomeEmail(data?.welcome_email || false)
        setSelectedFile(

        <a href={data?.attachment_url} target="_blank" rel="noopener noreferrer">{data?.attachment_url} </a>
     )
    },[data])
   







    const handleDefaultReject = () => {
        setDefaultReject(!defaultReject)
    }
    const handleDefaultReply = () => {
        setDefaultReply(!defaultReply)
    }
    const handleWelcomeEmail = () => {
        setWelcomeEmail(!welcomeEmail)
    }
    const stripHtmlTags = (str) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    };
    const onSubmit = (values) => {
        console.log(values, "values")
        let fileData = new FormData();
        fileData.append("file", file);
        dispatch(filePreassignedUrlGenerate(fileData, (url) => {
            if (id) {
                let data = {
                    "template_name": values?.template_name,
                    "subject": values?.subject,
                    "message": stripHtmlTags(values?.message),
                    "attachment_url": url,
                    "default_reject": defaultReject,
                    "default_reply": defaultReply,
                    "welcome_email": welcomeEmail
                }
                dispatch(editMessageTemplate(id, data, () => {
                    dispatch(getAllMessageTemplates())
                    navigate("/admin/customization")
                }))
            } else {
                let formData = {
                    "template_name": values?.template_name,
                    "subject": values?.subject,
                    "message": stripHtmlTags(values?.message),
                    "attachment_url": url,
                    "default_reject": defaultReject,
                    "default_reply": defaultReply,
                    "welcome_email": welcomeEmail
                }
                dispatch(getMessageTemplate(formData))
                navigate("/admin/customization")
            }
        }))
    }


    const handleUploadFile = (event) => {
        const allowedTypes = ["application/pdf"];
        const file = event.target.files[0]
        if (file && allowedTypes.includes(file.type)) {
            setFile(file)
            setSelectedFile(file.name)
        } else {
            setFileError(true)
        }
    }

    return (
        <div className="card-box">
            <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
                {id ? <h2 className="section-head-sub mb-0 border-0">
                    Edit Message Template
                </h2> :
                    <h2 className="section-head-sub mb-0 border-0">
                        Create Message Template
                    </h2>}

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-3">
                        <Form.Label className="font-14">Template Name *</Form.Label>
                        <Form.Control
                            type='text'
                            className='common-field font-14'
                            name="template_name"
                            {...register("template_name", {
                                required: {
                                    value: true,
                                    message: "Template Name is required",
                                },

                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Label className="font-14">Subject *</Form.Label>
                        <Form.Control
                            type='text'
                            className='common-field font-14'
                            name="subject"
                            {...register("subject", {
                                required: {
                                    value: true,
                                    message: "Subject is required",
                                },

                            })}
                        />
                    </div>
                    <Row>
                        <Col md={7}>
                            <div className="mb-3">
                                <Form.Label className="font-14">Message *</Form.Label>
                                <div className="custom-rich-editor">
                                    <Controller
                                        name="message"
                                        control={control}
                                        // defaultValue={selectedToDo?.description || ""}
                                        rules={{ required: "Message is required" }}
                                        render={({ field }) => (
                                            <ReactQuill
                                                {...field}
                                                ref={quillRef}
                                                value={watch("message")}
                                                theme="snow"
                                            />
                                        )}
                                    />
                                    {errors?.message && (
                                        <p className="error-message ">{errors.message?.message}</p>
                                    )}
                                    <div className="signature-wrapper">
                                        <p className="mb-4">--</p>
                                        <p className="mb-0">Aviox technologies pvt ltd</p>
                                    </div>
                                    <p className="font-12 mt-1 text-muted">The email signature will be automatically inserted from the recruiters profile.</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                {/* <Form.Label className="font-14">Attach file</Form.Label> */}
                                <Form.Control
                                    type="file"
                                    id="attachment_url"
                                    name="attachment_url"
                                    // defaultValue={data?.attachment_url?data?.attachment_url:""}
                                    {...register("attachment_url", {
                                        onChange: handleUploadFile,
                                        required: "File is required",
                                    })}
                                    className="d-none"
                                />
                                <Form.Label
                                    htmlFor='attachment_url'
                                    className='attachedmessage'> Attach file </Form.Label>
                                {fileError && (
                                    <p style={{ color: "red" }}>
                                        Please upload a valid PDF file.
                                    </p>
                                )}
                                {/* {id ? data?.attachment_url :selectedFile && <div>{selectedFile}</div>} */}
                                { selectedFile && <div>{selectedFile}</div>}

                            </div>
                        </Col>
                        <Col md={5}>
                            {/* <div className="mb-3">
                                <Form.Label className="font-14">Preview</Form.Label>
                                <div className="message-preview">
                                    <div className='d-flex align-items-end gap-2 mb-3'>
                                        <div className='receiver-profile'></div>
                                        <div className='w-100'>
                                            <div className='receiver-message-preview'>
                                                <p className='skeleton-msg mb-2'></p>
                                                <p className='skeleton-msg mb-2'></p>
                                                <p className='skeleton-msg mb-0'></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-end justify-content-end gap-2 mb-2'>
                                        <div>
                                            <div className='send-message-preview'>
                                                <p className='send_msg'>Hi,</p>
                                                <p className='send_msg'>Welcome and thank you for showing an interest in Aviox technologies pvt ltd. Being connected to our company means you get the chance to let us get to know you even more. Start by introducing yourself on your <b>personal profile</b>. A good and informative profile will help us find a right match. We will keep you up to date with jobs that suit your profile.</p>
                                                <p>Have a great day</p>
                                                <div className='attachment_preview'>
                                                    <p className='mb-0'>Privacy Policy.pdf</p>
                                                    <p className='del-attac mb-0'>
                                                        <IoCloseCircleOutline />
                                                    </p>
                                                </div>
                                                <p>--</p>
                                                <p>Aviox technologies pvt. ltd.</p>
                                            </div>
                                        </div>
                                        <div className='send-profile'></div>
                                    </div>
                                </div>
                            </div> */}
                        </Col>
                    </Row>
                    <div className='mb-3'>
                        <Form.Label className="font-14">Template settings</Form.Label>
                        <div className='position-relative template-check'>
                            <Form.Check type='checkbox' id='default_reject' onChange={handleDefaultReject} checked={defaultReject} />
                            <Form.Label htmlFor='default_reject' className='mb-2'>
                                <p>
                                    <span className='d-block font-14 fw-medium'>This is the default reject email</span>
                                    <span className='d-block font-12'>The reject reply can automatically be sent when rejecting applications.</span>
                                </p>
                            </Form.Label>
                        </div>
                        <div className='position-relative template-check'>
                            <Form.Check type='checkbox' id='default_reply' onChange={handleDefaultReply} checked={defaultReply} />
                            <Form.Label htmlFor='default_reply' className='mb-2'>
                                <p>
                                    <span className='d-block font-14 fw-medium'>This is the default reply</span>
                                    <span className='d-block font-12'>The default reply is automatically sent to all submitted applications.</span>
                                </p>
                            </Form.Label>
                        </div>
                        <div className='position-relative template-check'>
                            <Form.Check type='checkbox' id='welcome_email' onChange={handleWelcomeEmail} checked={welcomeEmail} />
                            <Form.Label htmlFor='welcome_email' className='mb-2'>
                                <p>
                                    <span className='d-block font-14 fw-medium'>This is the welcome to connect email</span>
                                    <span className='d-block font-12'>This is sent as a welcome email to all candidates that connects.</span>
                                </p>
                            </Form.Label>
                        </div>
                    </div>
                    <div className='text-center'>
                        <RexettButton
                            variant='transparent'
                            className="main-btn font-14"
                            text={id ? "Update Template" : "Create Template"}
                            type={"submit"}
                        />

                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateMessageTemplate;
