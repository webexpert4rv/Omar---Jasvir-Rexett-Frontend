import React from "react";

const RexettMarquee = ({fridayMarquee}) => {
  return (
    <div className="rotate-text">
      {/* <marquee>Please CheckIn to start the day. Before start your day, please submit yesterday report</marquee> */}
      {fridayMarquee === "Friday" ? (
        <>
          <marquee>Please submit your TimeSheet before end of week.</marquee>
          <marquee>Please CheckIn to start the day</marquee>
        </>
      ) : (
        <marquee>Please CheckIn to start the day.</marquee>
      )}
    </div>
  );
};

export default RexettMarquee;
