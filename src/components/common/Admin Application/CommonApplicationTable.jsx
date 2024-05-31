import React, { Fragment } from "react";
import { Col, OverlayTrigger, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ScreenLoader from "../../atomic/ScreenLoader";
import NoDataFound from "../../atomic/NoDataFound";
import { RxChevronRight } from "react-icons/rx";
import RexettButton from "../../atomic/RexettButton";
import { IoCloseOutline } from "react-icons/io5";
import ApplicationTableRow from "./ApplicationTableRow";

const CommonApplicationTable = ({
  columns,
  currentTab,
  screenLoader,
  expandedRow,
  handleClick,
  application,
  selectedApprovedButton,
  selectedRejectedButton,
  arrowActive,
  handleRowClick,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Tab.Pane eventKey={currentTab} className="py-4">
        <div className="table-responsive">
          <table className="table w-100 engagement-table table-ui-custom">
            <thead>
              <tr>
                {columns.map(({ header }, idx) => (
                  <th key={idx}>{t(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {screenLoader ? (
                <ScreenLoader />
              ) : application?.length > 0 ? (
                application.map((row, idx) => (
                  <ApplicationTableRow
                    key={idx}
                    currentTab={currentTab}
                    handleClick={handleClick}
                    row={row}
                    expandedRow = {expandedRow}
                    columns={columns}
                    selectedApprovedBtn={selectedApprovedButton}
                    selectedRejectedBtn={selectedRejectedButton}
                    arrowActive={arrowActive}
                    handleRowClick={handleRowClick}
                    idx={idx}
                  />
                ))
              ) : (
                <td colSpan={8}>
                  <NoDataFound />
                </td>
              )}
            </tbody>

          </table>
        </div>
      </Tab.Pane>
    </>
  );
};

export default CommonApplicationTable;
