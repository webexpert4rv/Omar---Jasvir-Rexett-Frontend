import React, { useEffect, useState } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { FiCalendar } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { TIME_REPORTING } from "../../helper/constant";
import RexettTimeReporting from "../../components/clients/TimeReporiting/RexettTimeReporting";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSingleTimeDetails } from "../../redux/slices/vendorDataSlice";

const VendorTimeDetail = () => {
    const { t } = useTranslation()
    const dispatch =useDispatch()
    const {singleTimeReports,screenLoader}=useSelector(state=>state.vendorData)
    const {pathname}=useLocation()
    let id = pathname.split("/")[2]


    useEffect(()=>{
        if(id){
            dispatch(getSingleTimeDetails(id))
        }
    },[])


    return (
        <>
            <div className="detail-view">
                <Tab.Container id="left-tabs-example" defaultActiveKey="timesheet_project">
                    <div className="card-box mb-4 p-3">
                        <div className="detail-view">
                            <Row className="flex-wrap gy-3">
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Project Name</h3>
                                        <p className="client-name-heading mb-0">
                                            Frontend Developer
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Start Date</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center fw-bold">
                                            <span className="d-flex align-items-center gap-1 text-green">
                                                <FiCalendar />
                                                12 Dec 2023
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Total hired Developer</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center fw-bold">
                                            <span className="d-flex align-items-center gap-1 text-green">
                                                3
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Status</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                                            <span className="status-finished white-nowrap">
                                                Completed
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Total hours spend</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                                            3000hrs
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Total Raised Invoice</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                                            4
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Tab.Container>
                <div className="card-box mb-4 p-3">
                    <div className="align-items-center gap-3">
                    </div>
                  

                    <RexettTimeReporting  timeReportingData={TIME_REPORTING}  role="client" flag="vendor"/>
            </div>
            </div>
        </>
    )
}
export default VendorTimeDetail;