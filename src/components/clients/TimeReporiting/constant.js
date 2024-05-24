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
    let dayName = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  if(currentPeriod === "monthly"){
    let dateWithYearly = [];
    data?.timeReports?.map((item, index) => {
      dateWithYearly.push(item.week);
    });
    return dateWithYearly
  }
}

export const getCurrentPeriodFromAPi=(period)=>{
  if(period[0]?.year){
    return "yearly"
  }else if(period[0]?.month){
    return "monthly"
  }else{
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
  "Project",
  "Associated With",
  "Action",
];
export const tabText= [
  {
    key:"first",
    value:"Applied Leave Request"
  },
  { 
    key:"second",
    value: "Leaves Rejected"
   },
   {
    key:"third",
    value:"Leave History"
  },
  {
    key:"fourth",
    value:"Cancelled Leaves"
  }

]
export const generateLeave = (item) => {
  switch (item) {
    case "full-day":
    return "Full Day"
      case "half-day":
      return "Half Day"
      case "short-leave" :
      return " Short Leave"
    }
};
export const LEAVE_TYPE = [
  {
    key: "Full Day",
    value: "full-day",
  },
  {
    key: "Half-Day ",
    value: "half-day",
  },
  {
    key: "Short Leave",
    value: "short-leave",
  },
  // {
  //   key: "Casual Leave",
  //   value: "casual-leave",
  // },
];
