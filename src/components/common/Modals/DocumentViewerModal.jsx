import React from "react";
import { Modal } from "react-bootstrap";
import PDFViewer from "../PDFViewer/PDFViewer";

const DocumentViewerModal = ({ show, handleClose, url }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="custom-modal"
      animation
      backdrop="static"
    >
      <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

      <Modal.Body>
        <PDFViewer url={url}/>
      </Modal.Body>
    </Modal>
  );
};

export default DocumentViewerModal;
