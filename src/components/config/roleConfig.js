import { CLIENT_SIDE_BAR_ITEMS, OTHER_OPTIONS_DEVELOPER  } from "./constant";
import { ADMIN_SIDE_BAR_ITEMS, OTHER_OPTIONS_ADMIN } from "./constant";
import { VENDOR_SIDE_BAR_ITEMS,OTHER_OPTIONS_VENDOR } from "./constant";
import { DEVELOPER_SIDE_BAR_ITEMS,OTHER_OPTIONS_CLIENT } from "./constant";

const roleConfig = {
  client: {
    sidebarItems: CLIENT_SIDE_BAR_ITEMS,
    floatingOptions: OTHER_OPTIONS_CLIENT,
    headerProps: { role: "client" },
    privateRoute:"/client/dashboard",
    publicRoute:'/'
    
  },
  admin: {
    sidebarItems: ADMIN_SIDE_BAR_ITEMS,
    floatingOptions: OTHER_OPTIONS_ADMIN,
    headerProps: { role: "admin" },
    privateRoute:"/admin/admin-dashboard",
    publicRoute:'/admin-login'
  },
  vendor: {
    sidebarItems: VENDOR_SIDE_BAR_ITEMS,
    floatingOptions: OTHER_OPTIONS_VENDOR,
    headerProps: { role: "vendor" },
    privateRoute:"/vendor/dashboard",
     publicRoute:'/vendor-login'
  },
  developer: {
    sidebarItems: DEVELOPER_SIDE_BAR_ITEMS,
    floatingOptions: OTHER_OPTIONS_DEVELOPER,
    headerProps: { role: "developer" },
    privateRoute:"/developer/dashboard",
    publicRoute:'/developer-login'
  },
};

export default roleConfig;
