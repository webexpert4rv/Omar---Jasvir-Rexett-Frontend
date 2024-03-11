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
  

  export const generateApiUrl = (filters, endpointName) => {
    const queryParams = [];
  console.log(filters,"filters")
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
    "suggested":"Want to shortlist this developer?",
    "shortlisted":"Want to interview this developer?",
    "interviewing":"Want to hire this developer?",
   }
   return message[key]

  }