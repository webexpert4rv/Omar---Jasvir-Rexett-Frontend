import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  DEVELOPER_NAME_OPTIONS,
  INVOICE_OPTIONS,
  MONTH_FILTER_OPTIONS,
  PROJECT_FILTER_OPTIONS,
  YEAR_FILTER_OPTIONS,
  buildQueryFromObjects,
} from "../admin/adminConstant";
import CommonFilterSection from "../../components/atomic/CommonFilterSection";
import TableComponentOne from "../../components/atomic/TableComponentOne";
import CommonInvoiceTable from "../../components/common/CommonInvoiceTable";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getVendorDetails } from "../../redux/slices/vendorDataSlice";
const INVOICE_HEADER_DATA = [
  "developerName",
  "date",
  "amount",
  "status",
  "action",
];
// add these inside constant file
const CLIENT_INVOICE_PER_PAGE = 5;
const CLIENT_INVOICE_FILTER_FIELDS = {
  selectFilters : [
    {
      filterLabel: "Select Month",
      key: "month",
      options: MONTH_FILTER_OPTIONS,
    },
    {
      filterLabel: "Select Year",
      key: "year",
      options: YEAR_FILTER_OPTIONS,
    },
    {
      filterLabel: "Invoice Status",
      key: "invoiceStatus",
      options: INVOICE_OPTIONS,
    },
  ],
  searchFilter:{key:"developerName",placeholder:"Enter developer name"}
}

export const DEVELOPER_INVOICE_COLUMNS = [
  {
    label: "Developer Name",
    key: "developer",
    subkey: "name",
    profilePictureKey: "profile_picture",
  },
  { label: "Project", key: "project", subkey: "title" },
  {
    label: "Total hours",
    key: "project",
    subkey: "total_hours",
    isHours: true,
  },
  { label: "Invoice month", key: "invoiceMonth"},
  { label: "Project status", key: "project", subkey: "status", isStatus: true },
  {
    label: "Action",
    key: "status",
    isAction: true,
    timesheetStatusKey: "", 
    timeSheetUrlKey: "",
    invoiceStatusKey:"invoiceStatus",
    invoiceUrlKey:"invoiceUrl"
  },
];
const VendorInvoice = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { invoiceList, screenLoader, totalInvoicePages } = useSelector(
    (state) => state.clientData
  );
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    developerName: "",
    year: "",
    month: "",
    invoiceStatus: "",
  });
  const {invoiceData} =useSelector(state=>state.vendorData)
  const {data}=invoiceData
console.log(data,"invoiceData")
  useEffect(() => {
    const filterQuery = buildQueryFromObjects(filters);
    const query = `${filterQuery}&page=${page}&perPage=${CLIENT_INVOICE_PER_PAGE}`;
    handleGetInvoice(query);
  }, [page, filters]);

  const handleGetInvoice = (query) => {
   dispatch(getVendorDetails(query))
  };

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <>
          <CommonFilterSection
            filters={filters}
            setFilters={setFilters}
            filterFields={CLIENT_INVOICE_FILTER_FIELDS}
            // isSearchFilterRequired={false}
          />
          <CommonInvoiceTable data={data}/>
        </>
      )}
    </>
  );
};

export default VendorInvoice;
