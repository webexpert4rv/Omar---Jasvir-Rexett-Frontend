import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { addFileInvoice, getDeveloperList, getClientList } from "../../redux/slices/vendorDataSlice";
import { filePreassignedUrlGenerate } from "../../redux/slices/clientDataSlice";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
const VendorUploadInvoice = () => {
    const dispatch = useDispatch()
    const [ids, setIds] = useState({
        client: '',
        developer: ''
    })
    const [file, setFile] = useState(null)
    const { clientList, developerList, } = useSelector(state => state.vendorData)
    const { smallLoader } = useSelector(state => state.clientData)
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(getClientList())
    }, [])


    const handleClient = (e) => {
        setIds({ ...ids, client: e.target.value })
        dispatch(getDeveloperList(e.target.value))
    }

    const handleDeveloper = (e) => {
        setIds({ ...ids, developer: e.target.value })
    }


    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const submitFile = (e) => {
        e.preventDefault()
        let fileData = new FormData();
        fileData.append("file", file);
        if (ids.client !== '' && ids.developer !== '' && file !== null) {
            dispatch(filePreassignedUrlGenerate(fileData, (url) => {
                let payload = {
                    "client_id": +ids.client,
                    "developer_id": +ids.developer,
                    "file_type": 1,
                    "parent_id": 0,
                    "type": 3,
                    "s3_path": url,
                    "file_extension": "0"
                }
                dispatch(addFileInvoice(payload))
            }))
        }
    }
    return (
        <>
            <section className="upload-invoice-section card-box">
                <h2 className="overview-card-heading mb-4">{t("uploadInvoice")}</h2>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Select onChange={handleClient}>
                                    <option value="" selected disabled>{t("selectClient")}</option>
                                    {
                                        clientList?.map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={item?.id}>{item?.name}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Select onChange={handleDeveloper} disabled={developerList.length == 0}>
                                    <option value="" selected disabled>{t("selectDeveloper")}</option>
                                    {
                                        developerList?.map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={item?.id}>{item?.name}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Col>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    {/* <Form.Label>Select Client</Form.Label> */}
                                    {/* <Form.Label>Select Developer</Form.Label> */}
                                    <Form.Control type="file" className="d-none" id="upload-file" onChange={handleFile} />
                                    <Form.Label htmlFor="upload-file" className="upload-file-label">{t("uploadInvoiceFile")}</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                        {file !== null && <p>Selected File: <span>{file?.name}</span> </p>}
                    </div>
                    <div className="text-center">
                        <RexettButton
                            type="submit"
                            text={t("submit")}
                            className="main-btn px-4"
                            variant="transparent"
                            onClick={submitFile}
                            isLoading={smallLoader}
                        />
                    </div>
                </Form>
            </section>
        </>
    )
}
export default VendorUploadInvoice;