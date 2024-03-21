import React, { useState } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
const Applications = () => {
    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };
    const data = [
        {
            clientName: "Lorem Ipsum",
            email: "loremipsum@amazon.com",
            company: "Amazon",
            phoneNumber: "+1 1234567890",
            engagement: "Extra Resource for an existing Team",
            engagementLast: "1 to 3 Months",
            availability: "Part Time (20Hrs/Week)",
            start: "Within 2-3 weeks",
            skillset: ["React Js", "Javascript", "Angular", "Wordpress", "Python", "Vue Js", ".Net"],
            appliedOn: "12 March 2024"
        },
        {
            clientName: "Lorem Ipsum",
            email: "loremipsum@amazon.com",
            company: "Amazon",
            phoneNumber: "+1 1234567890",
            engagement: "Extra Resource for an existing Team",
            engagementLast: "1 to 3 Months",
            availability: "Part Time (20Hrs/Week)",
            start: "Within 2-3 weeks",
            skillset: ["React Js", "Javascript", "Angular", "Wordpress", "Python", "Vue Js", ".Net"],
            appliedOn: "12 March 2024"
        },
        {
            clientName: "Lorem Ipsum",
            email: "loremipsum@amazon.com",
            company: "Amazon",
            phoneNumber: "+1 1234567890",
            engagement: "Extra Resource for an existing Team",
            engagementLast: "1 to 3 Months",
            availability: "Part Time (20Hrs/Week)",
            start: "Within 2-3 weeks",
            skillset: ["React Js", "Javascript", "Angular", "Wordpress", "Python", "Vue Js", ".Net"],
            appliedOn: "12 March 2024"
        },
        {
            clientName: "Lorem Ipsum",
            email: "loremipsum@amazon.com",
            company: "Amazon",
            phoneNumber: "+1 1234567890",
            engagement: "Extra Resource for an existing Team",
            engagementLast: "1 to 3 Months",
            availability: "Part Time (20Hrs/Week)",
            start: "Within 2-3 weeks",
            skillset: ["React Js", "Javascript", "Angular", "Wordpress", "Python", "Vue Js", ".Net"],
            appliedOn: "12 March 2024"
        },
    ];
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
                            <table className="table w-100 engagement-table table-ui-custom">
                                <thead>
                                    <tr>
                                        <th>Client Name</th>
                                        <th>Email Address</th>
                                        <th>Company Name</th>
                                        <th>Phone Number</th>
                                        <th>Engagement</th>
                                        <th>Engagement Last</th>
                                        <th>Availability</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="application-row" onClick={() => handleRowClick(index)}>
                                                <td className="white-nowrap">{item.clientName}</td>
                                                <td><span className="application-mail">{item.email}</span></td>
                                                <td>{item.company}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.engagement}</td>
                                                <td>{item.engagementLast}</td>
                                                <td>{item.availability}</td>
                                                <td>
                                                    <div className="d-flex gap-3">
                                                        <Button variant="transparent" className="main-btn px-4 py-2 font-13">Approve</Button>
                                                        <Button variant="danger" className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13">Reject</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedRow === index && (
                                                <tr className={`collapsible-row ${expandedRow === index ? 'open' : ''}`}>
                                                    <td colSpan="8">
                                                        <div>
                                                            <Row>
                                                                <Col md={4}>
                                                                    <div>
                                                                        <h3 className="application-heading">New Team Member Start </h3>
                                                                        <p className="application-text">{item.start}</p>
                                                                    </div>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <div>
                                                                        <h3 className="application-heading">Skillset Needed</h3>
                                                                        <ul className="need-skill-list">
                                                                            {item.skillset.map((skill, index) => (
                                                                                <li key={index}>{skill}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <div>
                                                                        <h3 className="application-heading">Applied on</h3>
                                                                        <p className="application-text">{item.appliedOn}</p>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="vendors" className="py-4">
                        <div className="table-responsive">
                            <table className="table w-100 engagement-table table-ui-custom">
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