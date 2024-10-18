// msalConfig.js
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "19b19e39-8544-4001-9d33-2670ead9131f",
    authority: `https://login.microsoftonline.com/24c55e21-ebf8-4b04-90e6-158d4790c5f3`,
    redirectUri: "https://app.rexett.com/", // Ensure this matches the Azure AD configuration
    // redirectUri: "http://localhost:3001/", // Ensure this matches the Azure AD configuration
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false, 
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);