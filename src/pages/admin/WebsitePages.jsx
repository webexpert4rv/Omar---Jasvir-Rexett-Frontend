import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import websiteImg from "../../assets/img/website-img.png";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DeletePage from "../../components/common/Modals/DeletePage";
import CreateWebsitePage from "./Modals/CreatePage";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import webSiteBuilderInstance from "../../services/webSiteBuilderInstance";
import { toast } from "react-toastify";
import NoDataFound from "../../components/atomic/NoDataFound";
const WebsitePages = () => {
  const [screenLoader, setScreenLoader] = useState(true);
  const [pageList, setPageList] = useState([]);
  const [deletePageModal, setDeletePageModal] = useState({
    id: "",
    show: false,
  });
  const [showCreatePage, ShowCreateWebsite] = useState(false);
  const [editWebPage, setEditPage] = useState({
    isEdit: false,
    pageData: {},
  });

  useEffect(() => {
    getPageDetails();
  }, []);

  const getPageDetails = () => {
    webSiteBuilderInstance
      .get("/api/pages")
      .then((res) => {
        console.log(res?.data, "resres");
        setScreenLoader(false);
        setPageList(res?.data?.pages);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
        setScreenLoader(false);
      });
  };

  const updatePageList = (data, created) => {
    if (created === "created") {
      setPageList([...pageList, data]);
    } else if (created === "updated") {
      getPageDetails();
      // const tempPageList = [...pageList];
      // const index = tempPageList.findIndex((pg) => pg._id === data._id);
      // tempPageList[index] = data;
      // if (data.isHomePage) {
      //   tempPageList.forEach((page) => {
      //     page.isHomePage = page._id === data._id;
      //   });
      // }
      // setPageList(tempPageList);
    } else {
      setPageList((prev) => prev.filter((pg) => pg.name !== data));
    }
  };

  const editPage = <Tooltip>Edit</Tooltip>;
  const viewPage = <Tooltip>View</Tooltip>;
  const delPage = <Tooltip>Delete</Tooltip>;

  const handleCloseDeletePage = () => {
    setDeletePageModal({
      id: "",
      show: false,
    });
    setEditPage({
      isEdit: false,
      pageData: {},
    });
  };
  const handleShowWebsite = () => {
    ShowCreateWebsite(true);
  };
  const handleCloseWebsite = () => {
    ShowCreateWebsite(false);
    setEditPage({
      isEdit: false,
      pageData: {},
    });
  };

  const handleEditWebsitePage = (page) => {
    setEditPage({
      isEdit: true,
      pageData: page,
    });
    ShowCreateWebsite(true);
  };

  return (
    <>
      <div className="card-box h-100">
        <div className="border-bottom-grey pb-3 mb-4">
          <h2 className="section-head border-0 mb-0 pb-0">Pages</h2>
        </div>
        {screenLoader ? (
          <ScreenLoader />
        ) : (
          <div className="website-wrapper">
            <Button
              variant="transparent"
              onClick={handleShowWebsite}
              className="newpage-card"
            >
              + Create New Page
            </Button>
            {pageList.length > 0 ? (
              pageList.map((page) => (
                <div className="website-card">
                  <div className="action-website" key={page._id}>
                    <OverlayTrigger placement="bottom" overlay={editPage}>
                      <Button
                        variant="transparent"
                        className="website-action"
                        onClick={() => handleEditWebsitePage(page)}
                      >
                        <FaPencil />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={viewPage}>
                      <Link
                        to={`/admin/website-builder/${page.name}`}
                        className="text-decoration-none website-action"
                      >
                        <FaEye />
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={delPage}>
                      <Button
                        variant="transparent"
                        className="website-action text-danger"
                        onClick={() =>
                          setDeletePageModal({ id: page.name, show: true })
                        }
                      >
                        <FaTrash />
                      </Button>
                    </OverlayTrigger>
                  </div>
                  <img src={websiteImg} alt="website-logo" />
                  <p>{page.name}</p>
                </div>
              ))
            ) : (
              <NoDataFound />
            )}
          </div>
        )}
      </div>
      {showCreatePage && (
        <CreateWebsitePage
          show={showCreatePage}
          handleClose={handleCloseWebsite}
          pageList={pageList}
          updatePageList={updatePageList}
          setScreenLoader={setScreenLoader}
          isEdit={editWebPage.isEdit}
          pageData={editWebPage.pageData}
        />
      )}
      {deletePageModal.show && (
        <DeletePage
          show={deletePageModal.show}
          handleClose={handleCloseDeletePage}
          id={deletePageModal.id}
          updatePageList={updatePageList}
          setScreenLoader={setScreenLoader}
        />
      )}
    </>
  );
};
export default WebsitePages;
