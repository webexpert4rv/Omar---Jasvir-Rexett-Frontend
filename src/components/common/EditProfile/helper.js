export const getCurrentRoleEndPoint = (role) => {
  let obj = {
    developer: "developer/get-profile",
    admin: "admin/profile",
    client: "client/get-profile",
  };

  return obj[role];
};


export const updateCurrentRoleEndPoint = (role) => {
  let obj = {
    developer: "common/update-profile/",
    admin: "admin/update-profile",
    client: "client/update-profile/",
  };

  return obj[role];
};