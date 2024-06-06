export const WEEK_FILTER_OPTIONS = [
  { label: "Week 1", value: "Week 1" },
  { label: "Week 2", value: "Week 2" },
  { label: "Week 3", value: "Week 3" },
  { label: "Week 4", value: "Week 4" },
];

export const MONTH_FILTER_OPTIONS = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export const YEAR_FILTER_OPTIONS = [
  { label: "2019", value: "2019" },
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
];

export const PROJECT_FILTER_OPTIONS = [
  { label: "Figma to Ui", value: "Figma to Ui" },
  { label: "Figma to Ui", value: "Figma to Ui" },
  { label: "Figma to Ui", value: "Figma to Ui" },
  { label: "Figma to Ui", value: "Figma to Ui" },
];

export const TIME_REPORT_DETAIL_PER_PAGE = 10;  

export const buildQueryFromObjects = (object) => {
    const queryParams = [];
    for (let key in object) {
        if(object[key]) {
            queryParams.push(`${key}=${object[key]}`)
        } 
    }
    return queryParams.join("&")
}

// tabs
export const ACTIVE_TABS = {
    projects:"projects",
    timeReportingOrInvoicing:"time-reporting"
}
export const  getCurrentMonthYear = () => {
    const date = new Date();
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export const RAISED_TO_CLIENT_COLUMNS = [
  {label:"Project Name", key :"project_name"},
  {label:"Developer Name", key :"developer_name" ,subkey:"profile_image"},
  {label:"Total Hours", key :"total_hours"},
  {label:"Invoice Month", key :""},
  {label:"Associated With", key :"associated_with"},
  {label:"Invoice Status", key :"invoice_status",isStatus:true},
  {label:"Action", key :"invoice"}, 
]

export const RAISED_BY_DEVS_COLUMNS = [
  {label:"Developer Name", key :"developer_name" ,subkey:"profile_image"},
  {label:"Project Name", key :"project_name"},
  {label:"Total Hours", key :"total_hours"},
  {label:"Invoice Month", key :""},
  {label:"Associated With", key :"associated_with"},
  {label:"Timesheet", key :"timesheet_status" , isStatus:true},
  {label:"Invoice Status", key :"invoice_status", isStatus:true},
  {label:"Project Status", key :"project_status",isStatus:true},
  {label:"Action", key :"invoice"},
]