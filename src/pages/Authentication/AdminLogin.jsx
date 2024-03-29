import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import logoWhite from '../../assets/img/logo-white.png'
import authLoginImg from '../../assets/img/login-img.png'
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import RexetLogin from "../../components/common/RexetLogin/RexetLogin";
const AgencyLogin = () => {
    return (
        <>
            {/* <section className="auth-wrapper">
                <div className="h-100">
                    <Row className="mx-0 h-100">
                        <Col md={5} className="px-0">
                            <div className="inner-auth-wrapper h-100 d-flex justify-content-center flex-column position-relative">
                                <div>
                                    <div className="text-center mb-5 logo-auth-wrapper">
                                        <img src={logoWhite} className="logo-white" />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <Link to={"#"} className="link-text text-decoration-none">Agency Login</Link>
                                        <Link to={"#"} className="link-text">Register</Link>
                                    </div>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-form">Email</Form.Label>
                                            <Form.Control type="email" className="auth-field" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-form">Password</Form.Label>
                                            <div className="position-relative">
                                                <Form.Control type="password" className="auth-field pe-5" />
                                                <button className="eye-btn"><FaEye /></button>
                                            </div>
                                        </Form.Group>
                                        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                                            <Form.Check
                                                type="checkbox"
                                                id="remember_me"
                                                label="Remember Me"
                                                className="remeber-check"
                                            />
                                            <Link className="link-text">Forgot Password</Link>
                                        </div>
                                        <Link to={'/admin-dashboard'} variant="transparent" className="auth-btn d-block text-decoration-none">Login</Link>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                        <Col md={7} className="h-100">
                            <div className="h-100">
                                <img src={authLoginImg} className="auth-img" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section> */}
            <RexetLogin userType="admin"/>
        </>
    )
}
export default AgencyLogin;