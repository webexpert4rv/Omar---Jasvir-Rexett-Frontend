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
import RexettButton from "../../../../components/atomic/RexettButton";
import { setSmallLoader } from "../../../../redux/slices/developerDataSlice";
import { useForm } from "react-hook-form";

const Customization = () => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [currentTab, setCurrentTab] = useState("first")
    const dispatch = useDispatch()
    const [featureName, setFeatureName] = useState()
    const { register, reset, handleSubmit } = useForm({})
    const [files, setFiles] = useState({
        company_logo: "",
        favicon: ""
    })
    const [fileName, setFileName] = useState()
    const { screenLoader } = useSelector(state => state.adminData)
    const [colorSchema, setColorSchema] = useState({
        crm_sidebar_bg_gradient_color_1: "",
        crm_sidebar_bg_gradient_color_2: "",
        crm_sidebar_bg_solid_color: "",
        crm_sidebar_link_color: "",
        crm_sidebar_bg_link_color: "",
        side_bar_icon_color: "",
        crm_primary_color: "",
        crm_heading_color: "",
        crm_body_text_color: "",
    })
    const [typoChange, setTypoChange] = useState({
        crm_sidebar_font_size: "",
        crm_heading_font_size: "",
        crm_body_font_size: "",
        side_bar_icon_width: "",
        side_bar_icon_height: "",
    })
   

    useEffect(() => {
        dispatch(getConfigDetails())
        dispatch(getAllIntegrationData())
    }, [])

    const handleSelect = (selectedTab) => {
        setCurrentTab(selectedTab);
    }
    const onSubmit = async (values) => {
        console.log(values, "values")
        let fileData = new FormData();
        let newFileData = new FormData();
        let payload;
        if (files?.company_logo !== '' && files?.favicon !== '') {
            if (files?.company_logo) {
                fileData.append("file", files?.company_logo);
            }
            if (files?.favicon) {
                newFileData.append("file", files?.favicon);
            }

            const fileDatas = [fileData, newFileData];
            const urls = await Promise.all(
                fileDatas.map(data =>
                    new Promise((resolve, reject) => {
                        dispatch(filePreassignedUrlGenerate(data, resolve, reject));
                    })
                )
            );
            const [cmpny_url, favicon_url] = urls;
            payload = {
                company_logo: cmpny_url,
                favicon: favicon_url,
                crm_sidebar_bg_gradient_color_1: values?.crm_sidebar_bg_gradient_color_1,
                crm_sidebar_bg_gradient_color_2: values?.crm_sidebar_bg_gradient_color_2,
                crm_sidebar_bg_solid_color: values?.crm_sidebar_bg_solid_color,
                crm_sidebar_link_color: values?.crm_sidebar_link_color,
                crm_sidebar_bg_link_color: values?.crm_sidebar_bg_link_color,
                side_bar_icon_color: values?.side_bar_icon_color,
                crm_primary_color: values?.crm_primary_color,
                crm_heading_color: values?.crm_heading_color,
                crm_body_text_color: values?.crm_body_text_color,
                crm_sidebar_font_size: values?.crm_sidebar_font_size,
                crm_heading_font_size: values?.crm_heading_font_size,
                crm_body_font_size: values?.crm_body_font_size,
                side_bar_icon_size: {
                    height: values?.side_bar_icon_height,
                    width: values?.side_bar_icon_width,
                }
            }
        } else {
            payload = {
                crm_sidebar_bg_gradient_color_1: values?.crm_sidebar_bg_gradient_color_1,
                crm_sidebar_bg_gradient_color_2: values?.crm_sidebar_bg_gradient_color_2,
                crm_sidebar_bg_solid_color: values?.crm_sidebar_bg_solid_color,
                crm_sidebar_link_color: values?.crm_sidebar_link_color,
                crm_sidebar_bg_link_color: values?.crm_sidebar_bg_link_color,
                side_bar_icon_color: values?.side_bar_icon_color,
                crm_primary_color: values?.crm_primary_color,
                crm_heading_color: values?.crm_heading_color,
                crm_body_text_color: values?.crm_body_text_color,
                crm_sidebar_font_size: values?.crm_sidebar_font_size,
                crm_heading_font_size: values?.crm_heading_font_size,
                crm_body_font_size: values?.crm_body_font_size,
                side_bar_icon_size: {
                    height: values?.side_bar_icon_height,
                    width: values?.side_bar_icon_width,
                }
            }
        }
        await dispatch(getUploadFile(payload, () => {
            dispatch(getConfigDetails())
        }))


    }
    const handleCancel = () => {
        reset()
        setColorSchema({
            crm_sidebar_bg_gradient_color_1: "",
            crm_sidebar_bg_gradient_color_2: "",
            crm_sidebar_bg_solid_color: "",
            crm_sidebar_link_color: "",
            crm_sidebar_bg_link_color: "",
            side_bar_icon_color: "",
            crm_primary_color: "",
            crm_heading_color: "",
            crm_body_text_color: "",
        });

        setTypoChange({
            crm_sidebar_font_size: "",
            crm_heading_font_size: "",
            crm_body_font_size: "",
            side_bar_icon_width: "",
            side_bar_icon_height: "",
        });
    };


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
                                                <UploadFiles previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} files={files} setFiles={setFiles} setFileName={setFileName} register={register} />
                                                <ColorScheme
                                                    previewUrl={previewUrl}
                                                    setPreviewUrl={setPreviewUrl}
                                                    setColorSchema={setColorSchema}
                                                    colorSchema={colorSchema}
                                                    setFeatureName={setFeatureName}
                                                    register={register}
                                                />
                                                <Typography previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} register={register} setTypoChange={setTypoChange} typoChange={typoChange} />
                                            </Row>
                                        </div>
                                        <div>
                                            <RexettButton
                                                type="button"
                                                text="Cancel"
                                                className="main-btn outline-main-btn px-5"
                                                onClick={handleCancel}
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