import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Bar } from 'react-chartjs-2';
const data = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct'],
    datasets: [
        {
            label: 'Revenue',
            data: [20000, 50000, 150000, 180000, 100000, 80000, 50000, 20000, 16000, 150000],
            borderColor: 'blue',
            backgroundColor: '#180049',
        },
    ],
};

const incomeData = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct'],
    datasets: [
        {
            label: 'Revenue',
            data: [20000, 50000, 150000, 180000, 100000, 80000, 50000, 20000, 16000, 150000],
            borderColor: 'blue',
            backgroundColor: '#180049',
        },
    ],
};
const options = {
    indexAxis: 'y',
  };
const Revenue = () => {
    return (
        <>
            <div className="overview-card-wrapper mb-5">
                <div className="overview-card active">
                    <div>
                        <h4 className="overview-card-subhead">Income</h4>
                        <h3 className="overview-card-heading mb-0">Earned</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
            </div>
            <Form className="mb-4 d-block">
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
        </>
    )
}
export default Revenue;