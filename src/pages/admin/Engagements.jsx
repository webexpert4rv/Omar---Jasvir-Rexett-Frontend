import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const Engagements = () => {
    return(
        <>
            <h2 className="section-head mb-4">Engagements</h2>
            <Row className="mb-3">
                <Col xl={6} lg={7}>
                    <div className="d-flex gap-3">
                        <Form.Control type="text" className="cv-field" placeholder="Enter Search Keywords"></Form.Control>
                        <Button variant="transparent" className="main-btn px-4">Search</Button>
                    </div>
                </Col>
            </Row>
            <div className="table-responsive">
                <table className="table w-100 engagement-table table-ui-custom">
                    <thead>
                        <th>Client Name</th>
                        <th>Developer Name</th>
                        <th>Developer associated with</th>
                        <th>Job Title</th>
                        <th>Contract Type</th>
                        <th>Location</th>
                        <th>Total Hours</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Link to={"#"}>Amazon</Link></td>
                            <td><Link to={"#"}>Rohit Sharma</Link></td>
                            <td><Link to={"#"}>Rexett</Link></td>
                            <td><Link to={"#"}>Need to Convert Figma to HTML</Link></td>
                            <td>Hourly</td>
                            <td>Remote</td>
                            <td>400 Hours</td>
                        </tr>
                        <tr>
                            <td><Link to={"#"}>Amazon</Link></td>
                            <td><Link to={"#"}>Lorem Ipsum</Link></td>
                            <td><Link to={"#"}>Google</Link></td>
                            <td><Link to={"#"}>App Development</Link></td>
                            <td>Hourly</td>
                            <td>Remote</td>
                            <td>400 Hours</td>
                        </tr>
                        <tr>
                            <td><Link to={"#"}>Amazon</Link></td>
                            <td><Link to={"#"}>Rohit Sharma</Link></td>
                            <td><Link to={"#"}>Rexett</Link></td>
                            <td><Link to={"#"}>React Native app devlopement</Link></td>
                            <td>Hourly</td>
                            <td>Remote</td>
                            <td>400 Hours</td>
                        </tr>
                        <tr>
                            <td><Link to={"#"}>Amazon</Link></td>
                            <td><Link to={"#"}>Rohit Sharma</Link></td>
                            <td><Link to={"#"}>Rexett</Link></td>
                            <td><Link to={"#"}>Web Developmemt</Link></td>
                            <td>Hourly</td>
                            <td>Remote</td>
                            <td>400 Hours</td>
                        </tr>
                        <tr>
                            <td><Link to={"#"}>Amazon</Link></td>
                            <td><Link to={"#"}>Rohit Sharma</Link></td>
                            <td><Link to={"#"}>Rexett</Link></td>
                            <td><Link to={"#"}>Need to Convert Figma to HTML</Link></td>
                            <td>Hourly</td>
                            <td>Remote</td>
                            <td>400 Hours</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Engagements;