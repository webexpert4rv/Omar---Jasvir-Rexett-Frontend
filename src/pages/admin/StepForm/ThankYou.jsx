import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import devImg from '../../../assets/img/image-2.png';
const ThankYou = () => {
    return (
        <>
            <div className="apply-job-section">
                <Container>
                    <div>
                        <Row className="align-items-center">
                            <Col md={7}>
                                <div className="apply-form-card">
                                    <div></div>
                                    <div>
                                        <h2 className="apply-form-heading text-center"><span className="fw-bold">Thank you for applying</span></h2>
                                        <p className="font-14 text-white text-center">A Rexett Family Team Member Will Reach Out to You Shortly for the Next Steps!</p>
                                    </div>
                                    <div className="text-center">
                                        <Link to={'/'} variant="transparent" className="submit-form-btn bg-transparent text-decoration-none text-white ms-2">Back to home</Link>
                                    </div>
                                    <div></div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="h-100">
                                    <img src={devImg} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default ThankYou;