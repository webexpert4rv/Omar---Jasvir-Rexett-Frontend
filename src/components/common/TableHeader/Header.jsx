import React from "react";
import { Nav, Tab, Tooltip } from "react-bootstrap";

const Header=({data})=> {
  console.log(data,"data")
  const approveLeave = (
    <Tooltip id="tooltip">
        Approve
    </Tooltip>
);
const rejectLeave = (
    <Tooltip id="tooltip">
        Reject
    </Tooltip>
);
const companyname = (

    <Tooltip id="tooltip">
        Aviox Technologies Pvt Ltd
    </Tooltip>
);
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav variant="pills" className="mb-4 application-pills">
          <Nav.Item className="application-item">
            <Nav.Link className="application-link" eventKey="first">
              Applied Leave Request
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="application-item">
            <Nav.Link className="application-link" eventKey="second">
              Leave Cancel Request
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="application-item">
            <Nav.Link className="application-link" eventKey="third">
              Leave History
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <table className="table time-table table-bordered table-ui-custom">
          <thead>
            {data?.map((item)=>(
                <th key ={item} value={item} className="time-table-head">{item}</th>
            ))
            }
          
         
          </thead>
          <tbody>


            
          </tbody>
        </table>
      </Tab.Container>
    </div>
  );
}

export default Header;
