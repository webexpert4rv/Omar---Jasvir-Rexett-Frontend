import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Bar } from 'react-chartjs-2';
import Revenue from "../admin/Revenue";

const VendorRevenue = () => {
    return (
        <>
            {/* <div className="overview-card-wrapper mb-5">
                <div className="overview-card active">
                    <div>
                        <h4 className="overview-card-subhead">Income</h4>
                        <h3 className="overview-card-heading mb-0">Earned</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
            </div>
            <Form className="mb-4 d-block filter-section">
                <div className="d-flex gap-3">
                    <div className="d-flex gap-3">
                        <div>
                            <Form.Label className="common-label">Filter By Month</Form.Label>
                            <Form.Control type="month" className="filter-field shadow-none"></Form.Control>
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <div>
                            <Form.Label className="common-label">Filter By Year</Form.Label>
                            <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                        </div>
                    </div>
                </div>
            </Form>
            <div className="card-box">
                <Row>
                    <Col md={6}>
                        <div>
                            <h2 className="section-head-sub">Statistic Revenue</h2>
                            <Bar data={data} />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <h2 className="section-head-sub">Statistic Income Earned</h2>
                            <Bar data={incomeData} options={options} />
                        </div>
                    </Col>
                </Row>
            </div> */}


            <Revenue />
        </>
    )
}
export default VendorRevenue;