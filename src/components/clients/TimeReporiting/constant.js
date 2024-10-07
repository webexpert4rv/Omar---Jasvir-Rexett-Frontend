function showMonthDates() {
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getFullYear();
  var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  var monthDates = [];

  for (var i = 1; i <= daysInMonth; i++) {
    var date = new Date(currentYear, currentMonth, i);
    monthDates.push(i);
  }

  return monthDates;
}

var dates = showMonthDates();

export function weeklyTimeReports(data, currentPeriod) {
  if (currentPeriod === "weekly") {
    let start_date = new Date(data?.startDate);
    var dayIndex = start_date.getDay();
    let end_date = new Date(data?.end_date);
    let dayWithDate = [];
    let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    data?.timeReports?.map((item, index) => {
      if (item?.report_date) {
        dayWithDate.push(dayName[(dayIndex + index) % 7] + item?.report_date.slice(7, 10));
      } else {
        dayWithDate = [];
      }
    });
    return dayWithDate;
  }
  if (currentPeriod === "yearly") {
    let start_date = new Date(data?.startDate);
    var yearlyIndex = start_date.getMonth();
    let dateWithMonth = [];
    let monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    data?.timeReports?.map((item, index) => {
      dateWithMonth.push(monthName[(yearlyIndex + index) % 12] + data?.startDate.slice(2, 4));
    });
    return dateWithMonth;
  }

  if (currentPeriod === "monthly") {
    let dateWithYearly = [];
    data?.timeReports?.map((item, index) => {
      dateWithYearly.push(item.week);
    });
    return dateWithYearly
  }
}

export const getCurrentPeriodFromAPi = (period) => {
  if (period[0]?.year) {
    return "yearly"
  } else if (period[0]?.month) {
    return "monthly"
  } else {
    return "weekly"
  }

}

export const TABLE_HEADER = [
  {
    weekly: [],
    monthly: dates,
  },
];

export const INVALID_FILE_TYPE = "invalid_file_type";
export const HEADER = [
  "Developer Name",
  "Leave Type",
  "Leave Date",
  "Reason",
  "Action",
];
export const MESSAGE_TAB_TEXT = [
  {
    key: "first",
    value: "Inbox"

  },
  {
    key: "second",
    value: "Unread"
  },
  {
    key: "third",
    value: "Archive"
  }
]








export const tabText = [
  {
    key: "first",
    value: "Applied Leave Request"
  },
  {
    key: "second",
    value: "Leaves Rejected"
  },
  {
    key: "third",
    value: "Leave History"
  },
  {
    key: "fourth",
    value: "Cancelled Leaves"
  }
]
export const Todo_tabText = [
  {
    key: "my_todo",
    value: "My To-Dos"
  },
  {
    key: "assigned_to",
    value: "Assigned To-Dos"
  }
]




export const timeReportTabText = [
  {
    key: "first",
    value: "Developers"
  },
  {
    key: "second",
    value: "Timesheet"
  },
]


export const planLeaveTabs = [
  {
    key: "first",
    value: "Apply Leave"
  },
  {
    key: "second",
    value: "Leaves History"
  },
]
export const generateLeave = (item) => {
  switch (item) {
    case "full_day":
      return "Full Day"
    case "sick_leave":
      return "Sick Leave"
    case "maternity_leave":
      return "Maternity Leave"
    case "paternity_leave":
      return "Paternity Leave"
    case "paid_time_off":
      return "Paid Time Off"
    case "care_leave":
      return "Care leave"
    case "annual_vacation_leave":
      return "Annual Vacation Leave"
  }
};
export const LEAVE_TYPE = [
  {
    key: "Full Day",
    value: "full_day",
  },
  {
    key: "Sick Leave",
    value: "sick_leave",
  },
  {
    key: "Maternity Leave",
    value: "maternity_leave",
  },
  {
    key: "Paternity Leave",
    value: "paternity_leave",
  },
  {
    key: "Paid Time Off",
    value: "paid_time_off",
  },
  {
    key: "Care leave",
    value: "care_leave",
  },
  {
    key: "Annual Vacation Leave",
    value: "annual_vacation_leave",
  },
];
export const MONTH_NAME = [
  'All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]
export const SELECT_YEAR = [
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029"
]
export const HOLIDAY_GUIDE_LINES = [
  " All full-time and part-time developers are entitled to apply for leave. Types of leave include sick leave, personal leave, and emergency leave",
  "If you need to cancel your applied leave, submit a leave cancellation request before the start date of the leave.",
  "All leave requests, including approved, cancelled, and not approved leaves, will be recorded and shown in your leave history.",

]
export const TIME_REPORTING = [
  "All developers must check in before starting their workday.",
  " All developers must submit their time-sheets before the end of Friday.",
  "Please Check out at the end of your workday.",
  "For Developers, Reconciliation get enable on every Friday.",
  "Developers may work on weekends and reconcile their Time-sheets.",
  "The timesheet for all developers will be submitted automatically every Friday at 12:00 AM."
]

export const monthOptions = [
  { label: "January", value: 1 },
  { label: "Feburary", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];
export const weekOptions = [
  { label: "Week 1", value: 1 },
  { label: "Week 2", value: 2 },
  { label: "Week 3", value: 3 },
  { label: "Week 4", value: 4 },
];
export const yearOption = [
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017"
]

export const configurationTabText = [
  {
    key: "first",
    value: "CRM"
  },
  {
    key: "second",
    value: "Email Template"
  },
  {
    key: "third",
    value: "Company Details"
  },
  {
    key: "four",
    value: "Message Template"
  },
  {
    key: "five",
    value: "Integrations"
  },
  {
    key: "six",
    value: "Connect with calendar"
  },
  {
    key: "seven",
    value: "Payment setup"
  },

]

export const companyType = [
  {
    key: "Sole_Proprietorship",
    value: "Sole Proprietorship"
  },
  {
    key: "Partnership",
    value: "Partnership"
  },
  {
    key: "Limited_Liability",
    value: "Limited Liability"
  },
  {
    key: "Corporation",
    value: "Corporation"
  },
  {
    key: "Non_Profit_Organization",
    value: "Non Profit Organization"
  },
  {
    key: "Cooperative",
    value: "Cooperative"
  },
  {
    key: "Franchise",
    value: "Franchise"
  },
  {
    key: "Joint_Venture",
    value: "Joint Venture"
  }

]
export const permissionTabText = [
  {
    key: "first",
    value: "Manage Employees"
  },
  {
    key: "second",
    value: "Roles & Permissions"
  },

]
export const GOOGLE_AUTOCOMPLETE_API_KEY = "AIzaSyDRb_BGMWY3XocACa_K976a0g6y-5QwkqU"