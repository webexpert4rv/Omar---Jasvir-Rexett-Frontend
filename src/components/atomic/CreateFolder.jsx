import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import RexettButton from "./RexettButton";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {createNewFolderAndFile, getFolderData } from "../../redux/slices/clientDataSlice";
const CreateFolder = ({ show, handleClose,currentFolderDetails }) => {
    const {smallLoader}=useSelector(state=>state.clientData);
    const dispatch=useDispatch()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});
    console.log(currentFolderDetails,"currentFolderDetails")

    const onSubmit = (values) => {
       let folderData= {
            "contract_id": currentFolderDetails?.contract_id,
            "file_type": 0,
            "parent_id": currentFolderDetails?.id,
            "added_by": "client",
            "type": 1,
            "s3_path": values.s3_path,
          }
        dispatch(createNewFolderAndFile(folderData,(parent_id)=>{
            handleClose()
            dispatch(getFolderData(parent_id))
        }))
    }
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create Folder</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                {/* <Form.Group className="mb-4">
                                    <Form.Label>Select Category</Form.Label>
                                    <Form.Select>
                                        <option value="" selected disabled>Select Category</option>
                                        <option value="invoices">Invoices</option>
                                        <option value="contracts">Contracts</option>
                                        <option value="cv">CV</option>
                                        <option value="others">Others</option>
                                    </Form.Select>
                                    <input type="text"/>
                                    
                                </Form.Group> */}
                                <Form.Group className="mb-3 ">
                                    <Form.Label className="label-form"></Form.Label>
                                    <Form.Control type="text"
                                        name="s3_path"
                                        {...register("s3_path", {
                                            required: {
                                                value: true,
                                            },
                                        })}
                                    />

                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center">
                        <RexettButton
                            type="submit"
                            text="Create"
                            className="main-btn px-4"
                            variant="transparent"
                            isLoading={smallLoader}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default CreateFolder;