import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import {useDispatch} from "react-redux"
import { Bar } from 'react-chartjs-2';
import { getRevenue } from "../../redux/slices/vendorDataSlice";
import {useSelector} from 'react-redux'


const Revenue = () => {
    const minOffset = 0;
    const maxOffset = 10;
    const dispatch=useDispatch()
    const {revenueData}=useSelector(state=>state.vendorData)
    const [yearOptionsValue, setYearOptionsValue] = useState([]);
    const thisYear = new Date().getFullYear();

    useEffect(() => {
        const optionsValue = [];
        for (let i = minOffset; i <= maxOffset; i++) {
          const year = thisYear - i;
          optionsValue.push(year);
        }
        setYearOptionsValue(optionsValue);
      }, []);

    const monthlyData=(data)=>{
     let newData=[]
      data?.forEach((item)=>{
        newData.push(item.totalAmount)
      })

      return newData
    }

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct','Nov','Dec'],
        datasets: [
            {
                label: 'Revenue',
                data: monthlyData(revenueData?.monthly_revenue),
                borderColor: 'blue',
                backgroundColor: '#180049',
            },
        ],
    };
    useEffect(()=>{
       dispatch(getRevenue())
    },[])

    const handleFilter=(e,selected)=>{
        let filter={
            [selected]:e
        }
    
        dispatch(getRevenue(filter));
    }
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
            <Form className="mb-4 d-block filter-section">
                <div className="d-flex gap-3">
                    <div className="d-flex gap-3">
                        <div>
                            <Form.Label className="common-label">Filter By Month</Form.Label>
                            <Form.Control type="month" className="filter-field shadow-none" onChange={(e)=>handleFilter(e.target.value.split('-')[1],"month")}></Form.Control>
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <div>
                            <Form.Label className="common-label">Filter By Year</Form.Label>
                          <select onChange={(e)=>handleFilter(e.target.value,"year")}>
                          <option disabled selected >Select year</option>
                            {
                                yearOptionsValue.map((item)=>{
                                    return (
                                        <>
                            <option value={item}>{item}</option>

                                        </>
                                    )
                                })
                            }
                          </select>
                        </div>
                    </div>
                </div>
            </Form>
            <div className="card-box">
                <Row>
                    <Col md={6}>
                        <div>
                            {/* <h2 className="section-head-sub">Statistic Revenue</h2> */}
                            <Bar data={data} />
                        </div>
                    </Col>
                    {/* <Col md={6}>
                        <div>
                            <h2 className="section-head-sub">Statistic Income Earned</h2>
                            <Bar data={incomeData} options={options} />
                        </div>
                    </Col> */}
                </Row>
            </div>
        </>
    )
}
export default Revenue;