import React, { useEffect } from "react";
import RexettButton from "../../../components/atomic/RexettButton";
import { useNavigate } from "react-router-dom";

const LastStep = ({ role }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // handleRedirect()
    clearStorage();
  }, [role]);
  const handleRedirect = () => {
    switch (role) {
      case "developer":
        // clearStorage();
        navigate("/developer-login");
        break;
      case "client":
        // clearStorage();
        navigate("/");
        break;
      case "vendor":
        // clearStorage();
        navigate("/vendor-login");
        break;
    }
  };
  const clearStorage = () => {
    switch (role) {
      case "developer":
        localStorage.removeItem("developerActiveStep");
        localStorage.removeItem("developerId");
        break;
      case "vendor":
        localStorage.removeItem("vendorUserId");
        localStorage.removeItem("companyId");
        localStorage.removeItem("vendorActiveStep");

        break;
      case "client":
        localStorage.removeItem("clientId");
        localStorage.removeItem("clientActiveStep");
    }
  };
  const getLastStepHeading = () => {
    switch (role) {
      case "developer":
      case "client":
        return "Welcome to the Rexett Community!";
      case "vendor":
        return "Welcome to the Rexett as an Vendor!";
    }
  };
  return (
    <section className="card-box">
      <div className="gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
        <h2>Thank you for applying</h2>
        <h5>{getLastStepHeading()}</h5>
        <p>
          A Rexett Family Team Member Will Reach Out to You Shortly for the Next
          Steps!
        </p>
        <div>
          Already have an account??
          <div className="d-flex gap-3 align-items ">
            <RexettButton
              type="button"
              text="Sign In"
              onClick={() => {
                handleRedirect();
              }}
              className="main-btn outline-main-btn px-5"
              // disabled={smallLoader}
              // isLoading={smallLoader}
            />
            <RexettButton
              type="button"
              text="Back to home"
              onClick={() => {
                clearStorage();
                window.location.href = "https://www.rexett.com";
              }}
              className="main-btn outline-main-btn px-5"
              // disabled={smallLoader}
              // isLoading={smallLoader}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
// https://www.rexett.com/

export default LastStep;
