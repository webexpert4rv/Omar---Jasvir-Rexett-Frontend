export const getCurrentRoleEndPoint = (role) => {
  let obj = {
    developer: "developer/get-profile",
    admin: "admin/profile",
    client: "client/get-profile",
    vendor: "/vendor/get-profile"
  };

  return obj[role];
};


export const updateCurrentRoleEndPoint = (role) => {
  let obj = {
    developer: "common/update-profile/",
    admin: "admin/update-profile",
    client: "client/update-profile/",
    vendor: "vendor/update-profile"
  };

  return obj[role];
};


export const accessModalAccordingToRoles=(data,slug)=>{
  let findWithSlug=data?.find((item)=>item.slug==slug)
  return findWithSlug
  
}