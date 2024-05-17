import React, { useEffect, useState } from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../../redux/slices/clientDataSlice";
import SingleInvoiceRow from "../../components/common/Single Invoice/SingleInvoiceRow";
import RexettPagination from "../../components/atomic/RexettPagination";
import RexettInvoiceFilter from "../../components/common/Invoice filter/RexettInvoiceFilter";
import ScreenLoader from "../../components/atomic/ScreenLoader";
const INVOICE_HEADER_DATA = [
  "developerName",
  "date",
  "amount",
  "status",
  "action",
];
const Invoice = () => {
  const dispatch = useDispatch();
  const { invoiceList, screenLoader } = useSelector(
    (state) => state.clientData
  );
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    developerName: "",
    year: "",
    month: "",
    status: "",
  });
  const [showFolderView, setShowFolderView] = useState(false);

  useEffect(() => {
    let data = {
      page: page,
      ...selectedFilters,
    };
    dispatch(getInvoice(data));
  }, [page, selectedFilters]);

  const { t } = useTranslation();

  const handleDownload = (url) => {
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      // If the popup blocker prevents opening the new tab
      alert('Please allow pop-ups for this site to download the file in a new tab.');
    }
  };

  console.log(invoiceList,"invoiceList")

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <section style={{ display: showFolderView ? "none" : "block" }}>
          <div>
            <div className="filter-section">
              <RexettInvoiceFilter
                setSelectedFilters={setSelectedFilters}
                selectedFilters={selectedFilters}
              />
              
              <h1>hekko</h1>
            </div>
            <div>
              <div className="table-responsive">
                <table className="table table-ui-custom">
                  <thead>
                    <tr>
                      {INVOICE_HEADER_DATA.map((title, idx) => (
                        <th key={idx}>{t(title)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceList?.data?.length > 0 &&
                      invoiceList.data.map((curInvoice, idx) => (
                        <SingleInvoiceRow key={idx} curInvoice={curInvoice} />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            {invoiceList?.pagination?.totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                <p className="showing-result">
                  {t("showing")} {invoiceList?.pagination?.perPage}{" "}
                  {t("results")}
                </p>
                <RexettPagination
                  number={invoiceList?.pagination?.totalPages}
                  setPage={setPage}
                  page={page}
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Invoice;
