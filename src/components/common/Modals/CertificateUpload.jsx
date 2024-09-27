import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import RexettButton from "../../atomic/RexettButton";
import CommonInput from "../../../components/atomic/CommonInput";
import { useFieldArray, useForm } from "react-hook-form";
import UploadFiles from "../../../pages/admin/Configuration/CRM/UploadFiles";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { deleteCertificate, fetchDeveloperCv, getUploadCertificate, uploadFileToS3Bucket } from "../../../redux/slices/developerDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";

const CertificateUpload = ({ show, handleClose, data, id, role }) => {
    console.log(data, "dfata")
    const [previewUrl, setPreviewUrl] = useState()
    const { btnLoader } = useSelector(state => state.developerData)
    const [renderModalData, setRenderModalData] = useState(data);
    const user_id = localStorage.getItem("userId")
    const [uploadedDoc, setUploadedDoc] = useState(null);
    const dispatch = useDispatch()
    const {
        register,
        reset,
        control,
        setValue,
        trigger,
        handleSubmit,
        formState: { errors },
    } = useForm({});


    useEffect(() => {
        if (data) {
            data.forEach((item, index) => {
                append({
                    name: item.name,
                    issuing_organization: item.issuing_organization,
                    issuing_date: item.issuing_date?.slice(0, 10),
                    certificate_url: item.certificate_url,
                    certificate_id: item?.id,
                });
            });
        }
    }, [renderModalData])

    const { fields, append, remove } = useFieldArray({
        control,
        name: "certification",
    });



    // useEffect(() => {
    //     dispatch(fetchDeveloperCv((data) => {
    //         const details = data?.developer_certifications
    //         details?.map((item) => {
    //             for (let key in item) {
    //                 if (key === "issuing_date") {
    //                     const newDate = item?.issuing_date?.slice(0, 10)
    //                     setValue(key, newDate)
    //                 } else if (key === "certificate_url") {
    //                     setUploadedDoc(item?.certificate_url);
    //                 } else {
    //                     setValue(key, item[key])
    //                 }
    //             }
    //         })

    //     }))
    // }, [])


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        let fileData = new FormData();
        fileData.append("file", file)
        dispatch(uploadFileToS3Bucket(fileData, (url) => {
            console.log(url,"url")
            setUploadedDoc(url);
        }))
        // if (file) {
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         setPreviewUrl(reader.result);
        //     };
        //     reader.readAsDataURL(file);
        // }
    };

    const handleClear = () => {
        setUploadedDoc('');
    }


    const onSubmit = (values) => {
        console.log(values, "valuess")
        let { certification } = values;
        // let fileData = new FormData();
        // fileData.append("file", uploadedDoc)
        // dispatch(uploadFileToS3Bucket(fileData, (url) => {
        const payload =
        {
            "user_id": user_id,
            "certification": certification
        }
        console.log(payload, "payload")
        dispatch(getUploadCertificate(payload))
        // }))
        handleClose()
    }
    const handleAddMore = async () => {
        const isValid = await trigger();
        if (isValid) {
            append({
                name: "",
                issuing_organization: "",
                issuing_date: "",
                certificate_url: "",
            });
        }
    };

    const handleDeleteCertificate = (id, index) => {
        remove(index);
        if (id) {
            dispatch(
                deleteCertificate(id, () => {
                    dispatch(fetchDeveloperCv(() => { }));
                    // handleClose()
                })
            );
        }
    };

    const deletetooltip = <Tooltip id="tooltip">Delete Row</Tooltip>;
    const addtooltip = <Tooltip id="tooltip">Add More</Tooltip>;

    console.log(fields, "fields")
    return (
        <>
            <h3 className="popup-heading">Upload Certificate</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((item, index) => (
                    <div className="experience-container mb-3" key={item.id}>
                        <Row>
                            <Col md="6" className="mb-3">
                                <Form.Label className="font-14">Name *</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="common-field"
                                    placeholder="Enter Name"
                                    {...register(`certification.${index}.name`, {
                                        required: true,
                                    })}
                                    defaultValue={item.name}
                                />
                                {/* {errors &&
                                    errors.name &&
                                    errors.name && (
                                        <p className="error-message">
                                            Name is required
                                        </p>
                                    )} */}
                            </Col>
                            <Col md="6" className="mb-3">
                                <Form.Label className="font-14">Issuing organization *</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="common-field"
                                    placeholder="Enter Issuing organization"
                                    {...register(`certification.${index}.issuing_organization`, {
                                        required: true,
                                    })}
                                    defaultValue={item.issuing_organization}
                                />
                                {/* {errors &&
                                    errors.issuing_organization && (
                                        <p className="error-message">
                                            Issuing organization is required
                                        </p>
                                    )} */}
                            </Col>
                            <Col md="6" className="mb-3">
                                <Form.Label className="font-14">Issue date *</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="common-field"
                                    placeholder="Enter Issue date "
                                    {...register(`certification.${index}.issuing_date`, {
                                        required: true,
                                    })}
                                    defaultValue={item.issuing_date}
                                />
                                {/* {errors && errors?.certification[index].issuing_date && (
                                        <p className="error-message">
                                            Issue date  is required
                                        </p>
                                    )} */}
                            </Col>
                            <Col md="12">
                                <Form.Label className="font-14">Add certification file *</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="upload-custom-field"
                                    name={`certification.${index}.certificate_url`}
                                    id="media-file"
                                    // value={uploadedDoc}
                                    // accept="image/jpeg, image/png, image/svg+xml"
                                    onChange={(e) => handleImageUpload(e)}
                                />
                                {uploadedDoc ?
                                    <div className="d-flex justify-content-between align-items-center gap-5 p-2 bg-light rounded-3 mb-3">
                                        <span classNam="fs-6"> {uploadedDoc} </span>
                                        <span className="cursor-pointer text-danger" onClick={handleClear}>
                                            <IoClose />
                                            {/* {errors?.certification[index].certificate_url && (
                                                <p className="field-error">{errors?.certification[index].certificate_url?.message}</p>
                                            )} */}
                                        </span>

                                    </div> :
                                    <Form.Label htmlFor="media-file" className="position-btn text-center cursor-pointer">
                                        Upload file
                                    </Form.Label>
                                }
                                {index !== 0 && (
                                    <div>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={deletetooltip}
                                        >
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    handleDeleteCertificate(
                                                        item.certificate_id,
                                                        index
                                                    )
                                                }
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </OverlayTrigger>
                                    </div>
                                )}

                            </Col>
                        </Row>
                    </div>
                ))}
                <div className="text-end mb-3">
                    <OverlayTrigger placement="bottom" overlay={addtooltip}>
                        <Button
                            className="main-btn py-2 px-3"
                            onClick={handleAddMore}
                        >
                            +
                        </Button>
                    </OverlayTrigger>
                </div>
                <div className="text-center mt-4">
                    <RexettButton
                        type="submit"
                        variant="transparent"
                        className="main-btn px-4 font-14 fw-semibold"
                        text={"Submit"}
                        isLoading={btnLoader}
                        disabled={btnLoader}
                    />
                </div>
            </form>
        </>
    )
}
export default CertificateUpload;