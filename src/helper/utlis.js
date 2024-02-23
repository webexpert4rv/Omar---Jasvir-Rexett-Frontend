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
  