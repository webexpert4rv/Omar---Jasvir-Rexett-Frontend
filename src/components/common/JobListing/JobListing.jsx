import React, { useEffect, useState } from "react";
import { Col, Row, Pagination, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminJobListing } from "../../../redux/slices/adminDataSlice";
import { getJobCategoryList } from "../../../redux/slices/clientDataSlice";
import JobTabs from "../../../components/atomic/JobTabs";
import RexettPagination from "../../../components/atomic/RexettPagination";
// import ScreenLoader from "../../components/atomic/ScreenLoader";
import { useTranslation } from "react-i18next";



const JobListing = () => {
    const [page, setPage] = useState(1)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { jobListing, screenLoader } = useSelector(state => state.adminData)
    const { jobCategoryList } = useSelector(state => state.clientData)

    useEffect(() => {
        dispatch(getJobCategoryList())
    }, [])

    useEffect(() => {
        dispatch(adminJobListing({page:page}))
    }, [page])


    const handleSelect = (key) => {
        let filter = {
            type: key,
            page: 1
        }
        dispatch(adminJobListing(filter))
    }

    return (
        <>

            <section className="job-posted-section">
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