import React, { useEffect } from "react";
import { Form, Button, Pagination } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { earnedBackOfDeveloper } from "../../redux/slices/clientDataSlice";
const data = {
    labels: ['Earned Back', 'Developers'],
    datasets: [
        {
            data: [95, 5],
            backgroundColor: ['#180049', '#00cadc'],
            hoverBackgroundColor: ['#060012', '#005d65'],
        },
    ],
};
const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 80,
    legend: {
        display: true,
        position: 'top',
        labels: {
            fontColor: '#000',
            fontSize: 16,
        },
    },
    plugins: {
        tooltip: {
            enabled: true,
            bodyFontSize: 14,
            bodyFontColor: '#fff',
            backgroundColor: '#000',
            borderColor: '#ddd',
            cornerRadius: 5,
        },
    },
};

const EarnedBack = () => {
    const dispatch =useDispatch()
    const {earnedBack,screenLoader}=useSelector(state=>state.clientData)
    useEffect(()=>{
     dispatch(earnedBackOfDeveloper())
    },[])
    return (
        <>
            <section>
                <div>
                    <Form className="mb-4">
                        <div className="d-flex gap-3 justify-content-between">
                            <div className="d-flex gap-3">
                                <div>
                                    <Form.Label className="common-label">From</Form.Label>
                                    <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                                </div>
                                <div>
                                    <Form.Label className="common-label">To</Form.Label>
                                    <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex gap-3">
                                    <Form.Control type="text" placeholder="Search" className="search-field"></Form.Control>
                                    <button className="main-btn px-5">Filter</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
                <p className="mb-3">To hire a rexett developers for more than 500 hours Rexett will return you 5% of your investment</p>
                <div className="table-responsiv mb-3">
                    <table className="table time-table table-bordered">
                        <thead>
                            <th className="time-table-head">
                                Total Number of Developers Hired
                            </th>
                            <th className="time-table-head">
                                Total Hours
                            </th>
                            <th className="time-table-head">
                                Earned Back 5%
                            </th>
                            <th className="time-table-head">
                                Redeem
                            </th>
                            <th className="time-table-head">
                                Report
                            </th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="time-table-data">{earnedBack?.totalContracts}</td>
                                <td className="time-table-data">{earnedBack?.totalHours}</td>
                                <td className="time-table-data">{earnedBack?.earnedBackHours} hrs</td>
                                <td className="time-table-data">
                                    <Form.Select className="status-select shadow-none">
                                        <option value="finished">Yes</option>
                                        <option value="progress">No</option>
                                        <option value="progress">No</option>
                                    </Form.Select>
                                </td>
                                <td className="time-table-data">
                                    <Button variant="transparent" className="outline-main-btn">Submit</Button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                {/* <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="showing-result">Showing 1 - 10 results</p>
                    <Pagination className="custom-pagination">
                        <Pagination.Prev className="custom-pagination-item custom-pagination-arrow" />
                        <Pagination.Item className="custom-pagination-item" active>{1}</Pagination.Item>
                        <Pagination.Item className="custom-pagination-item">{2}</Pagination.Item>
                        <Pagination.Item className="custom-pagination-item">{3}</Pagination.Item>
                        <Pagination.Ellipsis className="custom-pagination-item" />
                        <Pagination.Item className="custom-pagination-item">{8}</Pagination.Item>
                        <Pagination.Item className="custom-pagination-item">{9}</Pagination.Item>
                        <Pagination.Item className="custom-pagination-item">{10}</Pagination.Item>
                        <Pagination.Next className="custom-pagination-item custom-pagination-arrow" />
                    </Pagination>
                </div> */}
                <h5 className="section-head-sub">Statistic Earned Back</h5>
            </section>
            <div className="stats-chart-wrapper">
                <Doughnut data={data} options={options} />
            </div>
        </>
    )
}
export default EarnedBack;