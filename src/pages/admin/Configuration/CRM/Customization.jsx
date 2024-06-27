import React, { useEffect, useState } from "react";
import { Button, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import Tabs from "../../../../components/common/LeaveRequest/Tabs";
import ColorScheme from "./ColorScheme";
import Typography from "./Typography";
import { configurationTabText } from "../../../../components/clients/TimeReporiting/constant";
import UploadFiles from "./UploadFiles";
import EmailTemplate from "../EmailTemplate/EmailTemplate";
import CompanyDetails from "../CompanyDetails/CompanyDetails";
import { useDispatch, useSelector } from "react-redux";
import { getConfigDetails } from "../../../../redux/slices/adminDataSlice";
import ScreenLoader from "../../../../components/atomic/ScreenLoader";
import MessageTemplate from "../MessageTemplate/MessageTemplate";
import NotificationSetting from "../NotificationSettings/NotificationSetting";

const Customization = () => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [currentTab, setCurrentTab] = useState("first")
    const dispatch =  useDispatch()
    const {screenLoader} = useSelector(state => state.adminData)

    useEffect (()=>{
    dispatch(getConfigDetails())
    },[])
    const handleSelect = (selectedTab) => {
        setCurrentTab(selectedTab);
    };

    return (
        <>
           { screenLoader ? <ScreenLoader/> : 
            <div className="card-box">
                <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
                    <h2 className="section-head border-0 mb-0 pb-0">Configuration</h2>
                </div>

                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                >
                    <Tabs
                        handleSelect={handleSelect}
                        tabText={configurationTabText}
                        currentTab={currentTab}
                    />
                    <Tab.Content>
                        {currentTab === "first" &&
                            <div>
                                <Row>
                                    <UploadFiles previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
                                    <ColorScheme previewUrl={previewUrl} setPreviewUrl={setPreviewUrl}/>
                                    <Typography previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
                                </Row>
                            </div>
                        }
                        <EmailTemplate currentTab={currentTab} previewUrl={previewUrl} />
                        <CompanyDetails currentTab={currentTab} />
                        <MessageTemplate currentTab={currentTab} />
                        <NotificationSetting currentTab={currentTab} />
                    </Tab.Content>
                </Tab.Container>
            </div>
            }
        </>
    )
}
export default Customization;