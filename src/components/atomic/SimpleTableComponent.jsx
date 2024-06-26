import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import RexettPagination from "./RexettPagination";
import { getDateInRequiredFormat } from "../utils";

const SimpleTableComponent = ({
  data,
  columns,
  totalPages,
  page,
  setPage,
  onClick,
  keyToSendOnClick,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div className="table-responsive">
          <table className="table table-ui-custom">
            <thead>
              <tr>
                {columns?.map(({ label }) => (
                  <th className="text-capitalize">{t(label)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((curData, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="application-row"
                  onClick={() => onClick && onClick(curData[keyToSendOnClick])}
                >
                  {columns?.map(({ key, isDate, format, isHours }, index) => (
                    <td className="font-14 align-middle" key={index}>
                      {isDate &&
                        getDateInRequiredFormat(curData?.[key], format)}
                      {!isDate && curData?.[key]}
                      {isHours && " hrs"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {totalPages > 1 ? (
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
          <p className="showing-result">
            {t("showing")} {data?.length} {t("results")}
          </p>
          <RexettPagination number={totalPages} page={page} setPage={setPage} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SimpleTableComponent;
