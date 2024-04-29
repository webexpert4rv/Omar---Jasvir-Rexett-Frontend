import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { callPreSignedUrlResponse, createNewFolderAndFile, filePreassignedUrlGenerate, getFolderData } from "../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "./RexettButton";
import { useForm } from "react-hook-form";
const RexettUploadFile = ({ show, handleClose, currentFolderDetails, currentRole, setOpen }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const[details,setDetails] = useState()
    const dispatch = useDispatch()
    const { smallLoader } = useSelector(state => state.clientData);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});


    console.log(selectedFile , "selectedFile")
    const onSubmit = async (values) => {
        setDetails(values)
        let formData = new FormData();
        formData.append("file", values.file_name[0]);
    
        if (values.category === "3" && values.file_name[0].type !== "application/pdf") {
            alert("Only PDF files are allowed for Invoices category.");
            return; 
        }
    
        dispatch(filePreassignedUrlGenerate(formData, (url) => {
            let fileData = {
                "contract_id": currentFolderDetails.contract_id,
                "file_type": 1,
                "parent_id": currentFolderDetails.id,
                "added_by": currentRole,
                "type": +values.category,
                "s3_path": url,
            }
            dispatch(createNewFolderAndFile(fileData, (parent_id) => {
                let data = {
                    parent_id: parent_id
                }
                handleClose();
                setOpen(false);
                setSelectedFile(null);
                dispatch(getFolderData(data, currentRole));
            }));
        }));
    };
    
    return (
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Upload file</h3>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    {/* <Form.Label>Select Category</Form.Label> */}
                                    <Form.Select className="common-field"
                                        {...register("category", { required: "Please select a Category" })}
                                    >
                                        <option value="" selected disabled>Select Category</option>
                                        <option value="3">Invoices</option>
                                        <option value="1">Contracts</option>
                                        <option value="2">CV</option>
                                        <option value="4">Others</option>
                                    </Form.Select>
                                    <Form.Control type="file" className="d-none" id="upload-file"
                                        name="file_name"
                                        {...register("file_name", {
                                            onChange: (e) => setSelectedFile(e.target.files[0]),
                                            required: {
                                                value: true,
                                            },
                                        })}
                                    />
                                    <Form.Label htmlFor="upload-file" className="upload-file-label">Upload File</Form.Label>
                                </Form.Group>
                                {selectedFile ? <div>Selected File:<span className="fs-6">{selectedFile?.name}</span></div> : ""}
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center">
                        <RexettButton
                            type="submit"
                            text="Upload"
                            className="main-btn px-4 font-14 fw-semibold"
                            variant="transparent"
                            disabled={smallLoader && details.category==="3" ? true : false}
                            isLoading={smallLoader}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default RexettUploadFile;