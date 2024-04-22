import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminEngagementList, getAccountDeletion } from "../../redux/slices/adminDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import NoDataFound from "../../components/atomic/NoDataFound";
import { IoSearch } from "react-icons/io5";
import RexettPagination from "../../components/atomic/RexettPagination";
import { MdOutlineDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
const AccountDeletionRequest = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const { accountDeletionList, screenLoader } = useSelector(state => state.adminData)
    const { t } = useTranslation()


    useEffect(() => {
        dispatch(getAccountDeletion())
    }, [])

    // const handleSearch = () => {
    //     let data = {
    //         search: search
    //     }
    //     dispatch(adminEngagementList(data))
    // }

    // const handleSearchChange = (e) => {
    //     setSearch(e.target.value)
    //     clearTimeout(timerValue);
    //     const timer = setTimeout(() => {
    //         let data = {
    //             search: e.target.value
    //         }
    //         dispatch(adminEngagementList(data))
    //     }, 500);
    //     setTimerValue(timer);

    // }
    const deleteApplication = (
        <Tooltip id="tooltip">
          Delete Application
        </Tooltip>
      );
    return (
        <>
            <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
                <h2 className="section-head border-0 mb-md-0 mb-3 pb-0">{t("accountDeletionList")}</h2>

                <div className="d-flex gap-3">
                    {/* <Form.Control type="text" className="form-field font-14 shadow-none" placeholder={t("enterSearchKeywords") }onChange={handleSearchChange}></Form.Control> */}
                    {/* <Button variant="transparent" className="main-btn px-3 search-btn" onClick={handleSearch}><IoSearch /></Button> */}
                </div>
            </div>
            <div className="table-responsive">
                <table className="table w-100 engagement-table table-ui-custom">
                    <thead>
                        <th>{t("")}</th>
                        <th>{t("userName")}</th>
                        <th>{t("userEmail")}</th>
                        <th>{t("role")}</th>
                        <th>{t("reason")}</th>
                        <th>{t("action")}</th>
                       
                    </thead>
                    <tbody>
                        {screenLoader ? <ScreenLoader /> : <>
                            {accountDeletionList?.data?.length > 0 ?
                                accountDeletionList?.data?.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    <div className="user-imgbx application-imgbx my-0 mx-auto">
                                                        <img src={item?.user?.profile_picture} className="user-img" />
                                                    </div>
                                                </td>
                                                <td>{item?.user?.name}</td>
                                                <td>{item?.user?.email}</td>
                                                <td>{item?.user?.role}</td>
                                                <td>{item?.reason}</td>
                                                <td>
                                                    <OverlayTrigger placement="bottom" overlay={deleteApplication}>
                                                        <Button className="delete-btn app-del-btn"><MdOutlineDelete/></Button>
                                                    </OverlayTrigger>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                                : <NoDataFound />}
                        </>}
                    </tbody>
                </table>
                {/* <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                            <p className="showing-result">{t("showing")} {(engagement?.items_per_page)} {t("results")}</p>
                            <RexettPagination  number = {engagement?.total_pages} setPage={setPage} page={page}/>
                        </div> */}
            </div>
        </>
    )
}
export default AccountDeletionRequest;