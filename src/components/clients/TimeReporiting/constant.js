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
  console.log(dates);


export const TABLE_HEADER=[
    {
        "weekly":["Mon"," Tue","Wed","Thu"," Fri","Sat","Sun"],
        "monthly":dates
    }
]

