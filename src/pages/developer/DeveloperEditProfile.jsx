import React from "react";
import AllRoleEditProfile from "../../components/common/EditProfile/AllRoleEditProfile";
import ProfileWrapper from "../../components/common/EditProfile/ProfileWrapper";

const DeveloperEditProfile = () => {

  return (
    <>
      <ProfileWrapper>
        <AllRoleEditProfile role="developer" />
      </ProfileWrapper>
    </>
  );
};

export default DeveloperEditProfile;
