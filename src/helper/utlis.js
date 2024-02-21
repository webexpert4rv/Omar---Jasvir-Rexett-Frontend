export function getToken(tokenKey) {
    let token = localStorage.getItem(tokenKey);
    return token
  }
  
  export function getRefreshToken() {
    let refreshToken = localStorage.getItem("refreshToken");
    return refreshToken
  }
  
  export function updateLocalAccessToken(token) {
  
    localStorage.setItem("token", token);
  }
  