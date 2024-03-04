import React, { useEffect, useState } from "react";
import { developerAssignList } from "../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/atomic/Cards";
import { SeeMore } from "../../components/atomic/SeeMore";
import ScreenLoader from "../../components/atomic/ScreenLoader";
const HiredDevelopers = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const { assignedDeveloperList, screenLoader } = useSelector(
    (state) => state.clientData
  );

  useEffect(() => {
    dispatch(developerAssignList(count));
  }, [dispatch, count]);

  return (
    <>
      <h2 className="section-head-sub mb-5">List of assigned developers</h2>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <>
          {" "}
          <div className="developers-list">
            {assignedDeveloperList?.map((item, index) => {
              return (
                <>
                  <Cards item={item} />
                </>
              );
            })}
          </div>
          {assignedDeveloperList.length >= 5 ? (
            <div className="text-center mt-3">
              <SeeMore setCount={setCount} />
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};
export default HiredDevelopers;
