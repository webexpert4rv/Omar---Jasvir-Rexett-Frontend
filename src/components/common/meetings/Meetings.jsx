import React, { useEffect, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import ToolTip from '../Tooltip/ToolTip'
import Calendar from 'react-calendar'
import devImg from '../../../assets/img/user-img.jpg';
import { gapi } from 'gapi-script';
import { getAllEvents } from '../../../redux/slices/adminDataSlice';
import googleIcon from '../../../assets/img/google-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { FaCopy } from 'react-icons/fa';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
const CLIENT_ID = "233781998008-qnnfc8310usfc8q0co9fvf4i40d98spe.apps.googleusercontent.com";
const API_KEY = 'AIzaSyAAD4NQiqnIRytiJw5ekZRomS1FcYMT8ik';

const eventDetails = [{
  'summary': 'Google I/O 2015',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2025-08-01T09:31:20.142Z',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': '2025-08-01T09:31:20.142Z' ,
        'timeZone': 'America/Los_Angeles',
      }
    },
    {
      'summary': 'Google I/O 2015',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'A chance to hear more about Google\'s developer products.',
          'start': {
            'dateTime': '2025-08-01T09:31:20.142Z',
            'timeZone': 'America/Los_Angeles',
          },
          'end': {
            'dateTime': '2025-08-01T09:31:20.142Z' ,
            'timeZone': 'America/Los_Angeles',
          }
        }
]


const Meetings = ({ showMeetings, handleCloseMeetings, handleShowSchedule, handleShowMeetingInfo, createdMeetings }) => {

  const [value, onChange] = useState(new Date());
  const [event, setEvent] = useState([])
  const {allEvents} = useSelector(state=>state.adminData)
  console.log(allEvents,"allevents")
  console.log(event,"event")
  const dispatch = useDispatch()


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
     const data = {
      'calendarId': 'primary',
      'timeMin': timeMin,
      'timeMax': timeMax,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
     }


    dispatch(getAllEvents(data))
    if (gapi && !gapi.auth2.getAuthInstance().isSignedIn.get()) {
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
      console.log(events,'Events:');
      setEvent([...events,...allEvents?.events])
      // Update state with fetched events
    }).catch((error) => {
      console.error('Error fetching events:', error);
    });
  };
  console.log(event,"event")

    // const isEventDate = (date) => {
    //   return event.some(event => event.start?.dateTime.toDateString() === date.toDateString());
    // };

  const isEventDate = (date) => {
    return event.some(event => new Date(event.start?.dateTime).toDateString() === date.toDateString());
  };
  const syncCreatedMeetingsWithGoogle = (e,item) => {
    console.log(item,"item")
    e.stopPropagation()
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      console.log('User not authenticated');
      return;
    }
    const newEvent = {
      'summary': item.summary,
      'location': item.location,
      'description': item.description,
      'start': {
        'dateTime': "2024-08-26T16:50:00",
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': "2024-08-29T16:50:00",
        'timeZone': 'America/Los_Angeles',
      }
    };
    gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': newEvent ,
    }).then((response) => {
      console.log('Event created:', response);
      fetchCalendarEvents(); // Fetch the updated events list
    }).catch((error) => {
      console.error('Error creating event:', error);
    });
  };

  console.log(event,"eventdown")

  return (
    <Offcanvas show={showMeetings} placement="end" className="meeting-sidebar" onHide={handleCloseMeetings}>
      <Offcanvas.Header className="border-bottom-grey pb-3" closeButton>
        <div className="d-flex align-items-center gap-2">
          <Offcanvas.Title>Meetings</Offcanvas.Title>
          <ToolTip text={"New Meeting"}>
            <Button onClick={handleShowSchedule} className="main-btn px-2 add-new-btn cursor-pointer upload-btn mb-0">+</Button>
          </ToolTip>
          <button onClick={fetchCalendarEvents} className="main-btn font-14 py-1">Sync Meetings</button>
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
            {event?.map((item, ind) => {
              console.log(item,"eventitem")
              return (
                <>
                  <div onClick={()=>handleShowMeetingInfo(item)} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4">
                    <div>
                      <p className="interview-title mb-2">{item?.kind? item?.summary : item?.title}</p>
                      <p className="dev-name mb-2 font-14">
                        <div className="me-1">
                          <img src={devImg} />
                        </div>
                        <div className='d-flex align-items-center gap-2 meeting-link-wrapper'>
                          {/* {item?.creator?.displayName} */}
                          { item?.kind? <p className='mb-0 meeting-link-text'>Meeting Link :{item?.hangoutLink}</p> :  <p className='mb-0 meeting-link-text'>Meeting Link :{item?.event_link}</p>}
                          <Button className='copy-btn p-0'>
                            <FaCopy />
                          </Button>
                        </div>
                      </p>
                      <div className='d-flex align-items-center flex-wrap gap-3 mt-2'>
                        <p className='mb-1 associate-text'><span className='associate font-14'>Date : <strong>08-09-2024</strong></span></p>
                        <p className=' mb-1 associate-text'><span className='associate font-14'>Time : <strong>11:30 AM - 12:30 PM</strong></span></p>
                      </div>
                      {/* <p className="interview-timing mb-2 font-14">{item?.start?.dateTime?.slice(0, 10)}</p> */}
                    { item?.kind? "": <button className='google-btn' onClick={(e)=>syncCreatedMeetingsWithGoogle(e,item)}>
                      <img src={googleIcon} /> Sync with Google</button>}
                    </div>
                    <div className="mb-2 status-interview">
                      <span className="status-upcoming">Upcoming in 1hr</span>
                    </div>
                  </div>
                </>
              )

            })}
            {/* {createdMeetings ?  */}
           
            {/* :""} */}
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