import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaDesktop, FaEnvelope } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllIntegrationData } from "../../../../redux/slices/adminDataSlice";
import { changesStatus } from "../../../../redux/slices/adminDataSlice";


const NotificationSetting = ({ currentTab }) => {
    const dispatch = useDispatch()
    const { allIntegrationData } = useSelector(state => state.adminData)

    // useEffect(()=>{
    //   dispatch(getAllIntegrationData())
    // },[])
    

    const handleChange = (data, item) => {
        let payload = {}
        if (item == "email") {
            payload = {
                "is_desktop_notification": data?.is_desktop_notification,
                "is_email_notification": data?.is_email_notification == true ? false : true
            }
        } else {
            payload = {
                "is_desktop_notification": data?.is_desktop_notification == true ? false : true,
                "is_email_notification": data?.is_email_notification
            }
        }
        dispatch(changesStatus(payload, data?.id ,()=>{
            dispatch(getAllIntegrationData())
        }))
    }
    return (
        <>

            <div>
                {currentTab === "five" &&
                    <div className="table-responsive">
                        <table className="table table-ui-custom">
                            <thead>
                                <tr>
                                    <th className="align-middle">General Settings</th>
                                    <th className="text-center align-middle">
                                        <span><FaEnvelope /></span>
                                        <p className="mb-0 font-14">
                                            Email
                                        </p>
                                    </th>
                                    <th className="text-center align-middle">
                                        <span><FaDesktop /></span>
                                        <p className="mb-0 font-14">
                                            Desktop
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allIntegrationData.settings.map((item) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className="align-middle">
                                                        {item?.name}
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <Form.Check type="checkbox" className="primary-checkbox" checked={item?.is_email_notification } onChange={() => handleChange(item, "email")} />
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <Form.Check type="checkbox" className="primary-checkbox" checked={item?.is_desktop_notification} onChange={() => handleChange(item, "desk")} />
                                                    </td>
                                                </tr>

                                            </>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}
export default NotificationSetting;