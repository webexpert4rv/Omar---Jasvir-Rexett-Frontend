import { CLIENT_SIDE_BAR_ITEMS, OTHER_OPTIONS as CLIENT_OPTIONS } from "./constant";
import { ADMIN_SIDE_BAR_ITEMS, OTHER_OPTIONS as ADMIN_OPTIONS } from "./constant";
import { VENDOR_SIDE_BAR_ITEMS, OTHER_OPTIONS as VENDOR_OPTIONS } from "./constant";
import { DEVELOPER_SIDE_BAR_ITEMS, OTHER_OPTIONS as DEVELOPER_OPTIONS } from "./constant";

const roleConfig = {
  client: {
    sidebarItems: CLIENT_SIDE_BAR_ITEMS,
    floatingOptions: CLIENT_OPTIONS,
    headerProps: { role: "client" },
    privateRoute:"/client/dashboard",
    publicRoute:'/'
    
  },
  admin: {
    sidebarItems: ADMIN_SIDE_BAR_ITEMS,
    floatingOptions: ADMIN_OPTIONS,
    headerProps: { role: "admin" },
    privateRoute:"/admin/admin-dashboard",
    publicRoute:'/admin-login'
  },
  vendor: {
    sidebarItems: VENDOR_SIDE_BAR_ITEMS,
    floatingOptions: VENDOR_OPTIONS,
    headerProps: { role: "vendor" },
    privateRoute:"/vendor/dashboard",
     publicRoute:'/vendor-login'
  },
  developer: {
    sidebarItems: DEVELOPER_SIDE_BAR_ITEMS,
    floatingOptions: DEVELOPER_OPTIONS,
    headerProps: { role: "developer" },
    privateRoute:"/developer/dashboard",
    publicRoute:'/developer-login'
  },
};

export default roleConfig;
