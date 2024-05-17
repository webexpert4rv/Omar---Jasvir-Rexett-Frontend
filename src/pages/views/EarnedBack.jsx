import React, { useEffect } from "react";
import { Form, Button, Pagination } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { earnedBackOfDeveloper } from "../../redux/slices/clientDataSlice";
import { useTranslation } from "react-i18next";
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
            callbacks: {
                label: function (context) {
                    let label = context.label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += Math.round(context.parsed * 100) + '%';
                    return label;
                }
            }
        },
    },
};

const EarnedBack = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const { earnedBack, screenLoader } = useSelector(state => state.clientData)
    useEffect(() => {
        dispatch(earnedBackOfDeveloper())
    }, [])
    return (
        <>
            <section>
                <div>
                    {/* <Form className="mb-4">
                        <div className="d-flex flex-wrap gap-3 justify-content-between">
                            <div className="d-flex flex-wrap gap-3">
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
                    </Form> */}
                </div>
                <p className="mb-3">{t("hiring")}</p>
                <div className="table-responsive mb-3">
                    <table className="table time-table table-ui-custom">
                        <thead>
                            <th className="time-table-head">
                                {t("hiredDevelopers")}
                            </th>
                            <th className="time-table-head">
                                {t("totalHours")}
                            </th>
                            <th className="time-table-head">
                                {t("earnedBack")} 5%
                            </th>
                            <th className="time-table-head">
                                {t("redeem")}
                            </th>
                            <th className="time-table-head">
                                {t("report")}
                            </th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="time-table-data">{earnedBack?.totalContracts}</td>
                                <td className="time-table-data">{earnedBack?.totalHours?.toFixed(2)}</td>
                                <td className="time-table-data">{earnedBack?.earnedBackHours} {t("hrs")}</td>
                                <td className="time-table-data">
                                    <Form.Select className="status-select shadow-none">
                                        <option value="finished">{t("Yes")}</option>
                                        <option value="progress">{t("No")}</option>
                                    </Form.Select>
                                </td>
                                <td className="time-table-data">
                                    <Button variant="transparent" className="outline-main-btn font-14">{t("submit")}</Button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <h5 className="section-head-sub border-bottom-grey pb-2 mb-4">{t("statisticEarnedBack")}</h5>
            </section>
            <div className="stats-chart-wrapper">
                <Doughnut data={data} options={options} />
            </div>
        </>
    )
}
export default EarnedBack;