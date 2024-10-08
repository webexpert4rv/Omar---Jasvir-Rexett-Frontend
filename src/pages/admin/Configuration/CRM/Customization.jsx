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
import { filePreassignedUrlGenerate, getAllIntegrationData, getConfigDetails, getUploadFile } from "../../../../redux/slices/adminDataSlice";
import ScreenLoader from "../../../../components/atomic/ScreenLoader";
import MessageTemplate from "../MessageTemplate/MessageTemplate";
import NotificationSetting from "../NotificationSettings/NotificationSetting";
import ConnectCalendar from "../ConnectCalendar/ConnectCalendar";
import PaymentSetup from "../PaymentSetup/PaymentSetup";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import RexettButton from "../../../../components/atomic/RexettButton";
import { setSmallLoader } from "../../../../redux/slices/developerDataSlice";
import { useForm } from "react-hook-form";

const Customization = () => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [currentTab, setCurrentTab] = useState("first")
    const dispatch = useDispatch()
    const [files,setFiles] = useState()
    const [fileName , setFileName] = useState()
    const { screenLoader } = useSelector(state => state.adminData)
    const [colorSchema, setColorSchema] = useState()
    const [featureName ,setFeatureName] = useState()
    const {register , reset ,handleSubmit} = useForm({})

    useEffect(() => {
        dispatch(getConfigDetails())
        dispatch(getAllIntegrationData())
    }, [])

    const handleSelect = (selectedTab) => {
        setCurrentTab(selectedTab);
    }
    console.log(colorSchema,"colorSchema")
    console.log(featureName,"featureName")


     // const handleColorBlur = async (e) => {
    //     e.preventDefault()
    //     setColorValue(e.target.value)
    //     let data = {
    //         crm_sidebar_bg_gradient_color_1: colorValue,
    //         crm_sidebar_bg_solid_color: "",
    //     }
    //     await dispatch(getUploadFile(data,() => {
    //         dispatch(getConfigDetails())
    //     }))
    // }

    console.log(files,"files")
    const onSubmit = async(values)=>{
        console.log(values,"values")
        let fileData = new FormData();
        fileData.append("file", files);

            const url = await new Promise((resolve, reject) => {
                dispatch(filePreassignedUrlGenerate(fileData, resolve, reject));
            });
            let payload;
            if (fileName === "companyLogo") {
                 payload = {
                    company_logo: url,
                };
            } else {
                 payload = {
                    favicon: url,
                };
                await dispatch(getUploadFile(payload));
                 dispatch(getConfigDetails());
            }

            if(featureName==""){
                
            }
        }
    const handleCancel=()=>{
        reset()
        setColorSchema("")
    } 

    return (
        <>
            {screenLoader ? <ScreenLoader /> :
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
                                <>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <Row>
                                            <UploadFiles previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} setFiles={setFiles} setFileName={setFileName} register={register}/>
                                            <ColorScheme 
                                            previewUrl={previewUrl} 
                                            setPreviewUrl={setPreviewUrl}
                                            setColorSchema={setColorSchema}
                                            colorSchema={colorSchema}
                                            setFeatureName={setFeatureName}
                                            register={register}
                                            />
                                            <Typography previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
                                        </Row>
                                    </div>
                                    <div>
                                        <RexettButton
                                            type="button"
                                            text="Cancel"
                                            className="main-btn outline-main-btn px-5"
                                        />
                                        <RexettButton
                                            type={"submit"}
                                            text={"Save"}
                                            className="main-btn px-5"
                                        // isLoading={setSmallLoader}
                                        // disabled={setSmallLoader}
                                        />
                                    </div>
                                    </form>
                                </>
                            }
                            <EmailTemplate currentTab={currentTab} previewUrl={previewUrl} />
                            <CompanyDetails currentTab={currentTab} />
                            <MessageTemplate currentTab={currentTab} />
                            <NotificationSetting currentTab={currentTab} />
                            <ConnectCalendar currentTab={currentTab} />
                            <PaymentSetup currentTab={currentTab} />
                        </Tab.Content>
                    </Tab.Container>
                </div>
            }
        </>
    )
}
export default Customization;