import React from 'react'
import { useTranslation } from 'react-i18next';

const ProfileWrapper = ({children}) => {
  const { t } = useTranslation();
  return (
    <section className="card-box">
    <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
      <h2 className="section-head-sub mb-0 border-0">
        {t("updateYourProfile")}
      </h2>
      {/* <OverlayTrigger placement="bottom" overlay={disableProfile}>
        <div class="form-check form-switch toggle-switch-wrapper">
          <input
            class="form-check-input toggle-switch-custom"
            type="checkbox"
            role="switch"
            onClick={handleToggle}
            checked
          />
        </div>
      </OverlayTrigger> */}
    </div>
    {children}
    </section>
  )
}

export default ProfileWrapper