import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createNewFolderAndFile, filePreassignedUrlGenerate } from "../../../redux/slices/clientDataSlice";
import RexettButton from "../../../components/atomic/RexettButton";
import { MdPictureAsPdf } from "react-icons/md";
const UploadInvoice = ({ show, handleClose,contractId ,role}) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const dispatch = useDispatch()
    const { smallLoader } = useSelector(state => state.clientData);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});

    const onSubmit = (values) => {
        console.log(values?.file?.type, "values");
    
       
         if (values.category === "3" && values.file_name[0].type !== "application/pdf") {
            alert("Only PDF files are allowed for Invoices category.");
            return; 
        }
    
        let fileData = new FormData();
        fileData.append("file", selectedFile);
    
        dispatch(filePreassignedUrlGenerate(fileData, (url) => {
            let data = {
                "contract_id": contractId,
                "file_type": 0,
                "parent_id": 0,
                "type": values.category,
                "s3_path": url,
                "file_extension": "pdf" 
            };
            dispatch(createNewFolderAndFile(data, () => {
                handleClose();
            }));
        }));
    };
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Upload File</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Form.Label>Select Category</Form.Label>
                                   { role ==="admin" ?  <Form.Select
                                        {...register("category", { required: "Please select a Category" })}
                                    >
                                        <option value="" selected disabled>Select Category</option>
                                        <option value="3">Invoices</option>
                                    </Form.Select> : <Form.Select
                                        {...register("category", { required: "Please select a Category" })}
                                    >
                                        <option value="" selected disabled>Select Category</option>
                                        <option value="3">Invoices</option>
                                        <option value="1">Contracts</option>
                                        <option value="2">CV</option>
                                        <option value="4">Others</option>
                                    </Form.Select>}
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
                            text="Create"
                            className="main-btn px-4"
                            variant="transparent"
                            disabled={smallLoader}
                            isLoading={smallLoader}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default UploadInvoice;