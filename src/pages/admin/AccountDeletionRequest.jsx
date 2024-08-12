import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminEngagementList, getAccountDeletion, getAccountDisableEnable, getAccountEnableDisable, getDeletionByAdmin } from "../../redux/slices/adminDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import NoDataFound from "../../components/atomic/NoDataFound";
import { IoSearch } from "react-icons/io5";
import RexettPagination from "../../components/atomic/RexettPagination";
import { MdOutlineDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../../components/common/Modals/ConfirmationModal";
import { getDeleteDeveloper } from "../../redux/slices/vendorDataSlice";
import userImage from "../../assets/img/user-img.jpg"
const AccountDeletionRequest = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const { accountDeletionList, screenLoader } = useSelector(state => state.adminData)
    const [showModal, setShowModal] = useState(false)
    const [details, setDetails] = useState({
        role: "",
        id: ""
    })
    const { t } = useTranslation()
    console.log(accountDeletionList, "accountDeletionList")

    useEffect(() => {
        dispatch(getAccountEnableDisable())
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
            Disabled Accounts
        </Tooltip>
    );
    const handleToggle = (e,item) => {
        e.stopPropagation()
        setShowModal(!showModal)
        setDetails(prevDetails => ({
            ...prevDetails,
            active: !showModal,
            id: item?.id
        }));

    }
    const handleDeleteAction = (e) => {
        e.preventDefault()
       let data= {
            "user_id": details?.id,
            "status": details?.active
          }

        dispatch(getAccountDisableEnable(data))
    }
    const handleClose = () => {
        setShowModal(!showModal)
    }


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
                        <th>{t("userName")}</th>
                        <th>{t("userEmail")}</th>
                        <th>{t("role")}</th>
                        <th>{t("action")}</th>

                    </thead>
                    <tbody>
                        {screenLoader ? <ScreenLoader /> : <>
                            {accountDeletionList?.data?.users?.length > 0 ?
                                accountDeletionList?.data?.users?.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="user-imgbx application-imgbx mx-0 mb-0"><img src={item?.user?.profile_picture ? item?.user?.profile_picture : userImage} className="user-img" /></div>{item?.name}
                                                    </div></td>
                                                <td>{item?.email}</td>
                                                <td>{item?.role}</td>
                                                <td>
                                                    <OverlayTrigger placement="bottom" overlay={deleteApplication}>
                                                        <div class="form-check form-switch toggle-switch-wrapper">
                                                            <input class="form-check-input toggle-switch-custom" type="checkbox" role="switch" onClick={(e)=>handleToggle(e,item)} checked />
                                                        </div>
                                                    </OverlayTrigger>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                                : <td colSpan={6}><NoDataFound /></td>}
                        </>}
                    </tbody>
                </table>
                {/* <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                            <p className="showing-result">{t("showing")} {(engagement?.items_per_page)} {t("results")}</p>
                            <RexettPagination  number = {engagement?.total_pages} setPage={setPage} page={page}/>
                        </div> */}
            </div>
            <ConfirmationModal show={showModal} handleClose={handleClose} onClick={handleDeleteAction} header={"Delete Developer"} text={"Are you sure ,you want to disable this account?"} />
        </>
    )
}
export default AccountDeletionRequest;