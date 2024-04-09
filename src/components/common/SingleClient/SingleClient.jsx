import React, { useEffect } from "react";
import clientImg from '../../../assets/img/user-img.jpg';
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSingleClient } from "../../../redux/slices/adminDataSlice";
import { useLocation } from "react-router-dom";

const SingleClient = () => {
    const {singleClient} = useSelector(state=>state.adminData)
    const dispatch = useDispatch()
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    console.log(singleClient,"singleid")

    useEffect(()=>{
        dispatch(getSingleClient(id))
    },[id])
    return (
        <>
            <div className="single-client-wrapper">
                <div className="client-container">
                    <div className="client-imgBx">
                        <img src={singleClient?.profile_picture ? singleClient?.profile_picture :clientImg} className="client-img" />
                    </div>
                    <div className="client-infobx">
                        <h3 className="client-name">{singleClient?.name}</h3>
                        <div className="d-flex gap-2">
                            <p className="client-email">{singleClient?.email}</p> | <p className="client-number">+1 123-456-789</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="client-additional-info">
                <Row className="gy-4">
                    <Col md={4}>
                        <h4 className="additional-heading">Assignment</h4>
                        <p className="additional-text">New Development, everything from the begining</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="additional-heading">Assignment last</h4>
                        <p className="additional-text">1 to 3 Months</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="additional-heading">New Team Member Start</h4>
                        <p className="additional-text">Within 2-3 weeks</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="additional-heading">Availability</h4>
                        <p className="additional-text">Part Time (20Hrs/Week)</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="additional-heading">Total Job Posted</h4>
                        <p className="additional-text">3</p>
                    </Col>
                    <Col md={4}>
                        <h4 className="additional-heading">Rexett Date Joined</h4>
                        <p className="additional-text">03-04-2024</p>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default SingleClient;