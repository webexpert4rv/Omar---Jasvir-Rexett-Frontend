import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";

const Tabs = ({ handleSelect, tabText ,currentTab }) => {
  // console.log(currentTab,"currentTab")
  return (
    <div>
     
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={currentTab ? currentTab : "first"}
          onSelect={handleSelect}
        >
           {tabText?.map((item, index) => (
          <Nav variant="pills" className="mb-4 application-pills">
            <Nav.Item className="application-item">
              <Nav.Link className="application-link" eventKey={item?.key}>
                {item.value}
              </Nav.Link>
            </Nav.Item>
          </Nav> ))}

        </Tab.Container>
     
    </div>
  );
};

export default Tabs;
