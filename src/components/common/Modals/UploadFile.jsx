import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const UploadFileModal = ({ show, handleClose }) => {
    const { t } = useTranslation()
    const [selectedOption, setSelectedOption] = useState(null);
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">{t("timeReports")}</h3>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    {/* <Form.Label>Select Category</Form.Label> */}
                                    <Form.Select>
                                        <option value="" selected disabled>{t("selectCategory")}</option>
                                        <option value="invoices">{t("invoices")}</option>
                                        <option value="contracts">{t("contracts")}</option>
                                        <option value="cv">{t("cv")}</option>
                                        <option value="others">{t("others")}</option>
                                    </Form.Select>
                                    <Form.Control type="file" className="d-none" id="upload-file" />
                                    <Form.Label htmlFor="upload-file" className="upload-file-label">{t("uploadFile")}</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold">{t("submit")}</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default UploadFileModal;