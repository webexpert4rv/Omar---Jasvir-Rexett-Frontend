import React, { useEffect, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import ToolTip from '../Tooltip/ToolTip'
import Calendar from 'react-calendar'
import devImg from '../../../assets/img/user-img.jpg';
import { gapi } from 'gapi-script';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const CLIENT_ID = "904487780052-sjeu9i0nd8r72hnv7gsu4blh9r5gdera.apps.googleusercontent.com";
const API_KEY = 'AIzaSyDJtuRbVlALGiSU8YztXZmNIpMtcinc2nY';

const Meetings = ({showMeetings,handleCloseMeetings,handleShowSchedule,handleShowMeetingInfo}) => {

  const [value, onChange] = useState(new Date());
  const [event,setEvent]=useState([])

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        console.log('GAPI Initialized');
        const authInstance = gapi.auth2.getAuthInstance();
        // authInstance.isSignedIn.listen(setIsAuthenticated);
        // setIsAuthenticated(authInstance.isSignedIn.get());
      }).catch((error) => {
        console.error('Error initializing GAPI:', error);
      });
    }
    gapi.load('client:auth2', start);
  }, []);
  const fetchCalendarEvents = () => {

    const timeMin = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(); // One year ago
    const timeMax = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(); // One year in the future

    if ( gapi && !gapi.auth2.getAuthInstance().isSignedIn.get()) {
      console.log('User not authenticated');
      return;
    }
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': timeMin,
      'timeMax': timeMax,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    }).then((response) => {
      const events = response.result.items;
      console.log('Events:', events);
      setEvent(events)
      // Update state with fetched events
    }).catch((error) => {
      console.error('Error fetching events:', error);
    });
  };

//   const isEventDate = (date) => {
//     return event.some(event => event.start?.dateTime.toDateString() === date.toDateString());
//   };

  const isEventDate = (date) => {
    return event.some(event => new Date(event.start?.dateTime).toDateString() === date.toDateString());
  };


  return (
    <Offcanvas show={showMeetings} placement="end" onHide={handleCloseMeetings}>
    <Offcanvas.Header className="border-bottom-grey pb-3" closeButton>
      <div className="d-flex align-items-center gap-2">
        <Offcanvas.Title>Meetings</Offcanvas.Title>
        <ToolTip text={"New Meeting"}>
          <Button onClick={handleShowSchedule} className="main-btn px-2 add-new-btn cursor-pointer upload-btn mb-0">+</Button>
        </ToolTip>
      </div>
    </Offcanvas.Header>
    <Offcanvas.Body>

      <div className="meeting-booking">
        <Calendar onChange={onChange} value={value} 
        
        tileClassName={({ date, view }) => {
            // Add class to event dates
            if (view === 'month' && isEventDate(date)) {
              return 'event-date';
            }
          }}
        
        />
        <div className="interview-scheduled sidebar-meetings mt-4">
            <button onClick={fetchCalendarEvents}>Fetch</button>

          {event?.map((item,ind)=>{
            return (
                <>
                <div onClick={handleShowMeetingInfo} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4">
            <div>
              <p className="interview-title mb-2">{item?.summary}</p>
              <p className="dev-name mb-2 font-14">
                <div className="me-1">
                  <img src={devImg} />
                </div>
               {item?.creator?.displayName}
              </p>
              <p className="interview-timing mb-2 font-14">{item?.start?.dateTime?.slice(0,10)}</p>
            </div>
            <div className="mb-2 status-interview">
              <span className="status-upcoming">Upcoming in 1hr</span>
            </div>
          </div>
                </>
            )

          })}
          {/* <div onClick={handleShowMeetingInfo} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4">
            <div>
              <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
              <p className="dev-name mb-2 font-14">
                <div className="me-1">
                  <img src={devImg} />
                </div>
                Pankaj Pundir
              </p>
              <p className="interview-timing mb-2 font-14">Tuesday 22-06-24, 22:00 - 23:00</p>
            </div>
            <div className="mb-2 status-interview">
              <span className="status-upcoming">Upcoming in 3hr</span>
            </div>
          </div>
          <div onClick={handleShowMeetingInfo} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4">
            <div>
              <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
              <p className="dev-name mb-2 font-14">
                <div className="me-1">
                  <img src={devImg} />
                </div>
                Pankaj Pundir
              </p>
              <p className="interview-timing mb-2 font-14">Tuesday 22-06-24, 22:00 - 23:00</p>
            </div>
            <div className="mb-2 status-interview">
              <span className="status-upcoming">Upcoming in 5hr</span>
            </div>
          </div> */}
        </div>
      </div>
    </Offcanvas.Body>
  </Offcanvas>
  )
}

export default Meetings