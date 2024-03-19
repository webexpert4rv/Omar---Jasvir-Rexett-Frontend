import React from "react";
import { Button, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
const Applications = () => {
    return (
        <>
            <h2 className="section-head mb-4">Applications</h2>
            <Tab.Container id="left-tabs-example" defaultActiveKey="client">
                <Nav variant="pills" className="application-pills">
                    <Nav.Item className="application-item">
                        <Nav.Link eventKey="client" className="application-link">Clients <span className="new-app">10</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="application-item">
                        <Nav.Link eventKey="vendors" className="application-link">Vendors <span className="new-app">10</span></Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="client" className="py-4">
                        <div className="table-responsive">
                            <table className="table w-100 engagement-table">
                                <thead>
                                    <th>Client Name</th>
                                    <th>Email Address</th>
                                    <th>Company Name</th>
                                    <th>Phone Number</th>
                                    <th>Engagement</th>
                                    <th>Engagement Last</th>
                                    <th>Availability</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="white-nowrap">Lorem Ipsum</td>
                                        <td><span className="application-mail">loremipsum@amazon.com</span></td>
                                        <td>Amazon</td>
                                        <td>+1 1234567890</td>
                                        <td>Extra Resource for an existing Team</td>
                                        <td>1 to 3 Months</td>
                                        <td>Part Time (20Hrs/Week)</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Lorem Ipsum</td>
                                        <td><span className="application-mail">loremipsum@amazon.com</span></td>
                                        <td>Amazon</td>
                                        <td>+1 1234567890</td>
                                        <td>Extra Resource for an existing Team</td>
                                        <td>1 to 3 Months</td>
                                        <td>Part Time (20Hrs/Week)</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Lorem Ipsum</td>
                                        <td><span className="application-mail">loremipsum@amazon.com</span></td>
                                        <td>Amazon</td>
                                        <td>+1 1234567890</td>
                                        <td>Extra Resource for an existing Team</td>
                                        <td>1 to 3 Months</td>
                                        <td>Part Time (20Hrs/Week)</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Lorem Ipsum</td>
                                        <td><span className="application-mail">loremipsum@amazon.com</span></td>
                                        <td>Amazon</td>
                                        <td>+1 1234567890</td>
                                        <td>Extra Resource for an existing Team</td>
                                        <td>1 to 3 Months</td>
                                        <td>Part Time (20Hrs/Week)</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Lorem Ipsum</td>
                                        <td><span className="application-mail">loremipsum@amazon.com</span></td>
                                        <td>Amazon</td>
                                        <td>+1 1234567890</td>
                                        <td>Extra Resource for an existing Team</td>
                                        <td>1 to 3 Months</td>
                                        <td>Part Time (20Hrs/Week)</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Lorem Ipsum</td>
                                        <td><span className="application-mail">loremipsum@amazon.com</span></td>
                                        <td>Amazon</td>
                                        <td>+1 1234567890</td>
                                        <td>Extra Resource for an existing Team</td>
                                        <td>1 to 3 Months</td>
                                        <td>Part Time (20Hrs/Week)</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="vendors" className="py-4">
                        <div className="table-responsive">
                            <table className="table w-100 engagement-table">
                                <thead>
                                    <th>Company Name</th>
                                    <th>Email Address</th>
                                    <th>Phone Number</th>
                                    <th>Type of Company</th>
                                    <th>Total Employees</th>
                                    <th>Website Address</th>
                                    <th>Yearly Avenue</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="white-nowrap">Google</td>
                                        <td><span className="application-mail">loremipsum@google.com</span></td>
                                        <td>+1 1234567890</td>
                                        <td>IT Company</td>
                                        <td>100-1000</td>
                                        <td><Link to={"#"}>www.google.com</Link></td>
                                        <td>$5000 Million</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Google</td>
                                        <td><span className="application-mail">loremipsum@google.com</span></td>
                                        <td>+1 1234567890</td>
                                        <td>IT Company</td>
                                        <td>100-1000</td>
                                        <td><Link to={"#"}>www.google.com</Link></td>
                                        <td>$5000 Million</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Google</td>
                                        <td><span className="application-mail">loremipsum@google.com</span></td>
                                        <td>+1 1234567890</td>
                                        <td>IT Company</td>
                                        <td>100-1000</td>
                                        <td><Link to={"#"}>www.google.com</Link></td>
                                        <td>$5000 Million</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Google</td>
                                        <td><span className="application-mail">loremipsum@google.com</span></td>
                                        <td>+1 1234567890</td>
                                        <td>IT Company</td>
                                        <td>100-1000</td>
                                        <td><Link to={"#"}>www.google.com</Link></td>
                                        <td>$5000 Million</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Google</td>
                                        <td><span className="application-mail">loremipsum@google.com</span></td>
                                        <td>+1 1234567890</td>
                                        <td>IT Company</td>
                                        <td>100-1000</td>
                                        <td><Link to={"#"}>www.google.com</Link></td>
                                        <td>$5000 Million</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Google</td>
                                        <td><span className="application-mail">loremipsum@google.com</span></td>
                                        <td>+1 1234567890</td>
                                        <td>IT Company</td>
                                        <td>100-1000</td>
                                        <td><Link to={"#"}>www.google.com</Link></td>
                                        <td>$5000 Million</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="white-nowrap">Google</td>
                                        <td><span className="application-mail">loremipsum@google.com</span></td>
                                        <td>+1 1234567890</td>
                                        <td>IT Company</td>
                                        <td>100-1000</td>
                                        <td><Link to={"#"}>www.google.com</Link></td>
                                        <td>$5000 Million</td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </>
    )
}
export default Applications;