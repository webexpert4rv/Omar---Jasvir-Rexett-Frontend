import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import webSiteBuilderInstance from "../../../services/webSiteBuilderInstance";
import { toast } from "react-toastify";
const DeletePage = ({ show, handleClose, id, updatePageList, setScreenLoader }) => {

    const handleDeletePage = () => {
        setScreenLoader(true)
        webSiteBuilderInstance
        .delete(`/api/pages/${id}`)
        .then((response) => {
          const message = "Page deleted successfully!";
          toast.success(message, { position: "top-center" });
          handleClose();
          updatePageList(id)
          setScreenLoader(false)
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Something went wrong";
          toast.error(message, { position: "top-center" });
          handleClose();
          setScreenLoader(false)
        });
    }

    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Are you sure?</h3>
                <p className="font-14 texts-secondary text-center">This will permanently delete the page.</p>
                <div className="text-center d-flex justify-content-center align-items-center gap-4">
                    <Button variant="transparent" onClick={handleClose} className="font-14 border-0 shadow-none p-0 text-muted">Cancel</Button>
                    <Button variant="transparent" onClick={handleDeletePage} className="delete-main-btn font-14 fw-semibold">Yes</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default DeletePage;