import React, { useEffect, useState } from "react";
import { Col, Row, Pagination, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import amazonImg from '../../assets/img/amazon.png'
import facebookImg from '../../assets/img/facebook.png'
import { useDispatch, useSelector } from "react-redux";
import { adminJobListing } from "../../redux/slices/adminDataSlice";
import { getJobCategoryList } from "../../redux/slices/clientDataSlice";
import JobTabs from "../../components/atomic/JobTabs";
import RexettPagination from "../../components/atomic/RexettPagination";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { useTranslation } from "react-i18next";
import JobListing from "../../components/common/JobListing/JobListing";



const AdminJobListing = () => {


    return (
        <>
        <JobListing/>
        </>
    )
}
export default AdminJobListing;