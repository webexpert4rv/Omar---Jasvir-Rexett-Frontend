export const DEVELOPER_INVOICE_COLUMNS = [
  { label: "Client name", key: "client", subkey: "name",profilePictureKey:"profile_picture" },
  { label: "Project", key: "project", subkey: "title" },
  { label: "Total hours", key: "project", subkey: "total_hours" ,isHours:true},
  { label: "Invoice month", key:"invoiceMonth" },
  { label: "Project status", key: "project",subkey:"status" ,isStatus:true},
  { label: "Action", key: "status" ,isAction:true , timesheetStatusKey:"",timeSheetUrlKey:"",invoiceStatusKey:"invoiceStatus",invoiceUrlKey:"invoiceUrl"},
];
