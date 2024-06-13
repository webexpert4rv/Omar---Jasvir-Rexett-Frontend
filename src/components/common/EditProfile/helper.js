export const getCurrentRoleEndPoint = (role) => {
  let obj = {
    developer: "developer/get-profile",
    admin: "admin/profile",
    client: "client/get-profile",
  };

  return obj[role];
};
