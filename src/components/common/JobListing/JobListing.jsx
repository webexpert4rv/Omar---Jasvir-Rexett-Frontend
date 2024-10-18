import React, { useEffect, useState } from "react";
import { Col, Row, Pagination, Tabs, Tab, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminJobListing } from "../../../redux/slices/adminDataSlice";
import { getJobCategoryList, getJobLists } from "../../../redux/slices/clientDataSlice";
import JobTabs from "../../../components/atomic/JobTabs";
import RexettPagination from "../../../components/atomic/RexettPagination";
// import ScreenLoader from "../../components/atomic/ScreenLoader";
import { useTranslation } from "react-i18next";
import { Form } from "react-router-dom";
import { IoClose, IoSearch } from "react-icons/io5";
import CommonFilterSection from "../../atomic/CommonFilterSection";
import { useForm } from "react-hook-form";



const JobListing = () => {
    const [page, setPage] = useState(1)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { jobListing, screenLoader } = useSelector(state => state.adminData)
    const { jobCategoryList } = useSelector(state => state.clientData)
    const [filterValues, setFilterValues] = useState()
    const [currentTab, setCurrentTab] = useState()

    useEffect(() => {
        dispatch(getJobCategoryList())
    }, [])

    useEffect(() => {
        dispatch(adminJobListing({ page: page }))
    }, [page])


    const handleSelect = (key) => {
        setCurrentTab(key)
        console.log(key, "key")
        let filter = {
            type: key,
            page: 1
        }
        dispatch(adminJobListing(filter))
    }

    const handleSubmit = () => {
        if (filterValues) {
            let payload = {
                page: page,
                perPage: "10",
                type: currentTab,
                search: filterValues,
            }
            dispatch(adminJobListing(payload))
            setFilterValues("")
        }
    }
    console.log(filterValues, "submit")



    const handleFilter = (event) => {
        const value = event.target.value;
        setFilterValues(value)
    }
    const handleClear = () => {
        setFilterValues("")
        let filter = {
            type: currentTab,
            page: page,
            perPage: "10",
        }
        dispatch(adminJobListing(filter))
    }

    return (
        <>

            <section className="job-posted-section">
                <div className="d-flex gap-2 align-items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className=" font-14 form-control common-field bg-white"
                        value={filterValues}
                        onChange={(e) => handleFilter(e)}
                    />
                    <button className="outline-main-btn rounded-2 cursor-pointer text-danger py-2 px-3" onClick={handleClear}>
                        <IoClose />
                    </button>
                    <Button
                        type="submit"
                        // disabled = {watchSearch("developerName") === ""}
                        variant="transparent"
                        className="main-btn py-2 px-3 search-btn"
                        onClick={handleSubmit}
                    >
                        <IoSearch />
                    </Button>
                </div>
                <Tabs
                    defaultActiveKey="new"
                    id="justify-tab-example"
                    className="mb-3 notification-tabs job-listing-tabs gap-md-0 gap-3"
                    onSelect={handleSelect}
                >
                    {/* <Tab eventKey="need_suggest" title="Need to Suggest">
                        <JobTabs jobListing={jobListing?.data} jobCategoryList={jobCategoryList} />
                    </Tab> */}
                    <Tab eventKey="new" title={t("newJobPosts")}>
                        <JobTabs jobListing={jobListing?.data} jobCategoryList={jobCategoryList} />
                    </Tab>
                    <Tab eventKey="in-progress" title={t("inProgress")}>
                        <JobTabs jobListing={jobListing?.data} jobCategoryList={jobCategoryList} />
                    </Tab>
                    <Tab eventKey="in-contracts" title={t("in Contract")}>
                        <JobTabs jobListing={jobListing?.data} jobCategoryList={jobCategoryList} />
                    </Tab>
                    <Tab eventKey="ended" title={t("endJobs")}>
                        <JobTabs jobListing={jobListing?.data} jobCategoryList={jobCategoryList} />
                    </Tab>
                    <Tab eventKey="all" title={t("all")}>
                        <JobTabs jobListing={jobListing?.data} jobCategoryList={jobCategoryList} screenLoader={screenLoader} />
                    </Tab>
                </Tabs>
            </section>
            {!screenLoader && jobListing?.totalCount > 5 ? <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <p className="showing-result">{t("showing")} {(jobListing?.data?.length)} {t("results")}</p>
                <RexettPagination number={jobListing?.totalPages} setPage={setPage} page={page} />
            </div> : ""}
        </>
    )
}
export default JobListing;