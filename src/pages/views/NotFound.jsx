import React from "react";
import errorImg from '../../assets/img/404 error.png';
import { Col, Container, Row } from "react-bootstrap";
const NotFound = () => {
    return(
        <>
            <section className="not-found">
                <Container>
                    <Row className="align-items-center flex-md-row flex-column-reverse">
                        <Col lg={6}>
                            <div>
                                <img src={errorImg} />
                            </div>
                        </Col>
                        <Col lg={5}>
                            <div className="text-center">
                                <h1 className="heading-404">404</h1>
                                <h5 className="sub-heading-404">The Page Is Not Found</h5>
                                <h5 className="para404-page">Lorem ipsum dolor sit amet, consectet adipiscing&nbsp;elit,sed do eiusm por incididunt.</h5>
                                <a className="main-btn" href="#"><span className="backto-home-btn">Back to Home</span></a>
                            </div>
                        </Col>
                        <Col lg={1}> </Col>
                    </Row>
                    
                    
                </Container>
            </section>
        </>
    )
}
export default NotFound;