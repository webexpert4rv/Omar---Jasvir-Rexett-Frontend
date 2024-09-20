import React, { useEffect, useState } from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../../redux/slices/clientDataSlice";
import SingleInvoiceRow from "../../components/common/Single Invoice/SingleInvoiceRow";
import RexettPagination from "../../components/atomic/RexettPagination";
import RexettInvoiceFilter from "../../components/common/Invoice filter/RexettInvoiceFilter";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import timeSheetIcon from "../../assets/img/timesheet_approved.png";
import associateLogo from "../../assets/img/aviox-logo.png";
import invoiceIcon from "../../assets/img/invoice_paid.png";
import timeSheetNotApproved from "../../assets/img/timesheet_notapproved.png";
import invoiceUnpaid from "../../assets/img/invoice_unpaid.png";
import { IoSearch } from "react-icons/io5";
import userImage from "../../assets/img/user-img.jpg";
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
const dummyProjects = [
  {
    projectName: "Figma to UI",
    totalHiredDevelopers: 3,
    totalInvoiceRaised: 5,
    totalHoursSpend: "3000",
    startDate: "10-04-2024",
    invoiceMonth: "Jun 2024",
    developers: [
      {
        developerName: "John Smith",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Emily Davis",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "James Taylor",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Michael Brown",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Sarah Wilson",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
    ],
  },
  {
    projectName: "Backend API Development",
    totalHiredDevelopers: 4,
    totalInvoiceRaised: 8,
    totalHoursSpend: "5000 ",
    startDate: "01-05-2024",
    invoiceMonth: "Jul 2024",
    developers: [
      {
        developerName: "Anna Lee",
        totalHoursSpend: "160 ",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "David Kim",
        totalHoursSpend: "160 ",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Sophia Martinez",
        totalHoursSpend: "160",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Robert Johnson",
        totalHoursSpend: "160",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Jessica White",
        totalHoursSpend: "160",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
    ],
  },
  {
    projectName: "Mobile App Development",
    totalHiredDevelopers: 5,
    totalInvoiceRaised: 10,
    totalHoursSpend: "7000",
    startDate: "15-06-2024",
    invoiceMonth: "Aug 2024",
    developers: [
      {
        developerName: "Kevin Wang",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Laura Brown",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Steven Clark",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Rachel Adams",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Daniel Rodriguez",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
    ],
  },
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
const Invoice = () => {
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

  useEffect(() => {
    const filterQuery = buildQueryFromObjects(filters);
    const query = `${filterQuery}&page=${page}&perPage=${CLIENT_INVOICE_PER_PAGE}`;
    handleGetInvoice(query);
  }, [page, filters]);

  const handleGetInvoice = (query) => {
    dispatch(getInvoice(query));
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
          <CommonInvoiceTable 
          data={dummyProjects}
          />
        </>
      )}
    </>
  );
};

export default Invoice;
