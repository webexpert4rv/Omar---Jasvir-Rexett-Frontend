import React, { useEffect, useState } from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { HiDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../../redux/slices/clientDataSlice";
import SingleInvoiceRow from "../../components/common/Single Invoice/SingleInvoiceRow";
import RexettPagination from "../../components/atomic/RexettPagination";
import RexettInvoiceFilter from "../../components/common/Invoice filter/RexettInvoiceFilter";
import { buildQueryFromSelectedFilters } from "../../helper/utlis";
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
              {/* <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <Form>
                <div className="d-flex gap-3 align-items-end">
                  <div>
                    <Form.Select className="w-auto w-1 shadow-none">
                      <option value="">Select Developer</option>
                      <option value="rohit">Rohit Sharma</option>
                      <option value="rohit">Rohit Sharma</option>
                      <option value="rohit">Rohit Sharma</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Select className="w-auto w-1 shadow-none">
                      <option value="">Select Status</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label className="common-label">Select Year</Form.Label>
                    <Form.Select className="w-auto shadow-none">
                      <option value="">Select Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                    </Form.Select>
                  </div>

                  <Form.Select className="w-auto shadow-none" value="">
                    <option value="">{t("selectMonth")}</option>
                    <option value="1">{t("january")}</option>
                    <option value="2">{t("feburary")}</option>
                    <option value="3">{t("march")}</option>
                    <option value="4">{t("april")}</option>
                    <option value="5">{t("may")}</option>
                    <option value="6">{t("june")}</option>
                    <option value="7">{t("july")}</option>
                    <option value="8">{t("august")}</option>
                    <option value="9">{t("september")}</option>
                    <option value="10">{t("october")}</option>
                    <option value="11">{t("november")}</option>
                    <option value="12">{t("december")}</option>
                  </Form.Select>
                  <div className="d-flex gap-3">
                    <Form.Control type="text" placeholder="Search" className="search-field" onChange={handleSearchChange}></Form.Control>
                    <RexettButton
                      type="submit"
                      text="Filter"
                      className="main-btn py-1_5 px-4"
                      variant="transparent"
                      isLoading={false}
                    />
                  </div>
                </div>
              </Form>
            </div> */}
            </div>
            <div>
              <div className="table-responsive">
                <table className="table table-ui-custom">
                  <thead>
                    <tr>
                      {INVOICE_HEADER_DATA.map((title, idx) => (
                        <th key={idx}>{t(title)}</th>
                      ))}
                      {/* <th>{t("developerName")}</th>
                    <th>{t("date")}</th>
                    <th>{t("status")}</th>
                    <th>{t("action")}</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceList?.data?.length > 0 &&
                      invoiceList.data.map((curInvoice, idx) => (
                        <SingleInvoiceRow key={idx} curInvoice={curInvoice} />
                      ))}
                    {/* <tr>
                    <td className="align-middle">Rohit Sharma</td>
                    <td className="align-middle">12-09-2023</td>
                    <td className="align-middle">
                      <span className="status-finished fw-semibold">
                        Approved
                      </span>
                    </td>
                    <td>
                      <div>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={actiontooltip}
                        >
                          <Button className="action-btn">
                            <HiDownload />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle">Rohit Sharma</td>
                    <td className="align-middle">12-09-2023</td>
                    <td className="align-middle">
                      <span className="status-progress fw-semibold">
                        Pending
                      </span>
                    </td>
                    <td>
                      <div>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={actiontooltip}
                        >
                          <Button className="action-btn" disabled>
                            <HiDownload />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr> */}
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
