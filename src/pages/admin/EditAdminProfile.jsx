import React from "react";
import AllRoleEditProfile from "../../components/common/EditProfile/AllRoleEditProfile";
import ProfileWrapper from "../../components/common/EditProfile/ProfileWrapper";

const EditAdminProfile = () => {
  return (
    <>
      <>
        <ProfileWrapper>
          <AllRoleEditProfile role="admin" />
        </ProfileWrapper>
      </>
    </>
  );
};
export default EditAdminProfile;
