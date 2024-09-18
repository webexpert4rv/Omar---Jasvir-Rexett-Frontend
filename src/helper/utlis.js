export const NOTIFICATIONBASEURL = "https://rexett-backend.rvtechnologies.info/"
export function getToken(tokenKey) {
    let token = localStorage.getItem(tokenKey);
    return token
  }
  
  export function getRefreshToken(tokn) {
    let refreshToken = localStorage.getItem(tokn);
    return refreshToken
  }
  
  export function updateLocalAccessToken(key,token) {
  
    localStorage.setItem(key, token);
  }
  
  export function getCurrentRole() {
  
   let token= getToken("token")

   return token
  }
  

  export const generateApiUrl = (filters, endpointName) => {
    const queryParams = [];
    for (const key in filters) {
      if (filters[key]) {
        queryParams.push(`${key}=${encodeURIComponent(filters[key])}`);
      }
    }
    const apiUrl = `/${endpointName}?${queryParams.join("&")}`;
    return apiUrl;
  };

  export const jobPostConfirmMessage=(key)=>{
   let message={
    "suggestions":"Want to shortlist this developer?",
    "shortlisted":"Want to interview this developer?",
    "interviewing":"Want to hire this developer?",
    "application":"Are you sure you want to Delete this job?"

   }
   return message[key]
  }
  export const EXPERIENCE_OPTIONS = [
      {
        label: "1",
        value: "1 year",
      },
      {
        label: "2",
        value: "2 years",
      },
      {
        label: "3",
        value: "3 years",
      },
      {
        label: "4",
        value: "4 years",
      },
      {
        label: "5",
        value: "5 years",
      },
      {
        label: "5+",
        value: "above 5 years",
      },
    ];


    // googleApi.js

export const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  "https://www.googleapis.com/discovery/v1/apis/admin/reports_v1/rest",
  'https://admin.googleapis.com/$discovery/rest?version=reports_v1'
];

export const SCOPES = [
  "https://www.googleapis.com/auth/admin.reports.usage.readonly",
  "https://www.googleapis.com/auth/calendar.events",
  'https://www.googleapis.com/auth/admin.reports.audit.readonly',
];




