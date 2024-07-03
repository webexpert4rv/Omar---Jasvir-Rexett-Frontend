import { isDate } from "date-fns";

export const DEVELOPER_INVOICE_COLUMNS = [
  {
    label: "Client name",
    key: "client",
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
  { label: "Invoice month", key: "invoiceMonth" },
  { label: "Project status", key: "project", subkey: "status", isStatus: true },
  {
    label: "Action",
    key: "status",
    isAction: true,
    timesheetStatusKey: "",
    timeSheetUrlKey: "",
    invoiceStatusKey: "invoiceStatus",
    invoiceUrlKey: "invoiceUrl",
  },
];

export const PROJECT_HISTORY_TABS = {
  activeProject: "active",
  completedProject: "completed",
};

export const ACTIVE_PROJECT_COLUMNS = [
  {
    label: "projectName",
    key: "job_title",
  },
  {
    label: "clientName",
    key: "client_name",
  },
  {
    label: "startDate",
    key: "start_date",
    isDate: true,
    format: "DD MMMM YYYY",
  },
  {
    label: "totalHoursSpend",
    key: "total_hours",
    isHours: true,
  },
  {
    label: "totalInvoiceRaised",
    key: "total_invoice_raised",
  },
];
export const COMPLETED_PROJECT_COLUMNS = [
  {
    label: "projectName",
    key: "job_title",
  },
  {
    label: "clientName",
    key: "client_name",
  },
  {
    label: "startDate",
    key: "start_date",
    isDate: true,
    format: "DD MMMM YYYY",
  },
  {
    label: "completionDate",
    key: "end_date",
    isDate: true,
    format: "DD MMMM YYYY",
  },
  {
    label: "totalHoursSpend",
    key: "total_hours",
    isHours: true,
  },
  {
    label: "totalInvoiceRaised",
    key: "total_invoice_raised",
  },
];

export const PROJECT_DETAIL_SECTION_1_FIELDS = [
  { label: "projectName", key: "job_title" }, 
  { label: "companyName", key: "company_name", subkey: "company_logo" ,imageKey:"company_logo"},
  {
    label: "startDate",
    key: "start_date",
    isDate: true,
    format: "DD MMMM YYYY",
  },
  {
    label: "completionDate",
    key: "end_date",
    isDate: true,
    format: "DD MMMM YYYY",
  },
  { label: "status", key: "status", isStatus: true },
  { label: "totalHoursSpend", key: "total_hours", isHours: true },
  { label: "totalInvoiceRaised", key: "total_invoice_raised" },
];

export const PROJECT_HISTORY_TIMEREPORTS_FIELDS = [
  {
    label: "clientName",
    key: "job_title",
  },
];
const TIME_SHEET_VIEW_OPTIONS = [
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Yearly",
    value: "yearly",
  },
];

export const PROJECT_HISTORY_PER_PAGE = 10;
export const PROJECT_DETAIL_FILTER_FIELDS = {
  selectFilters: [
    {
      filterLabel: "Select view",
      key: "filter",
      options: TIME_SHEET_VIEW_OPTIONS,
    },
    {
      filterLabel: "Select start date",
      key: "startDate",
      isDate: true,
      formLabel: "Select start date",
    },
    {
      filterLabel: "Select end date",
      key: "endDate",
      isDate: true,
      formLabel: "Select end date",
    },
  ],
  // searchFilter: { key: "search", placeholder: "Enter search keywords" },
};
