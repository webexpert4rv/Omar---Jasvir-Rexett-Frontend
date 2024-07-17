import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AllRoleEditProfile from "../../components/common/EditProfile/AllRoleEditProfile";
import ProfileWrapper from "../../components/common/EditProfile/ProfileWrapper";
import CompanyProfile from "../../components/common/EditProfile/CompanyProfile";

const EditProfile = () => {
  const { t } = useTranslation();
  return (
    <>
      <ProfileWrapper>
        <section>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="personal_details"
          >
            <Nav variant="pills" className="mb-4 application-pills">
              <Nav.Item className="application-item">
                <Nav.Link
                  className="application-link"
                  eventKey="personal_details"
                >
                  Personal Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="application-item">
                <Nav.Link
                  className="application-link"
                  eventKey="company_details"
                >
                  Company Details
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="personal_details">
              <AllRoleEditProfile role="client" name ={"indivisual"} />
              </Tab.Pane>

              <Tab.Pane eventKey="company_details">
              <AllRoleEditProfile role="client" name = {"company"} />
              </Tab.Pane>
           
            </Tab.Content> 
          </Tab.Container>
        </section>
      </ProfileWrapper>
    </>
  );
};

export default EditProfile;
