import React from 'react';
import { Nav } from 'react-bootstrap';

const RexettTabs = ({ t, allApplications}) => {
  const tabData = [
    { key: 'clients', label: t('clients'), count: allApplications?.clients?.length },
    { key: 'vendors', label: t('vendors'), count: allApplications?.vendors?.length },
    { key: 'developers', label: t('developers'), count: allApplications?.developers?.length },
  ];

  return (
    <Nav variant="pills" className="application-pills">
      {tabData.map((tab) => (
        <Nav.Item key={tab.key} className="application-item">
          <Nav.Link eventKey={tab.key} className="application-link">
            {tab.label} <span className="new-app">{tab.count}</span>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default RexettTabs;
