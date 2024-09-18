import React, { useEffect, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import ToolTip from '../Tooltip/ToolTip'
import Calendar from 'react-calendar'
import devImg from '../../../assets/img/user-img.jpg';
import { gapi } from 'gapi-script';
import { getAllEvents } from '../../../redux/slices/adminDataSlice';
import googleIcon from '../../../assets/img/google-icon.png';
import rexettIcon from '../../../assets/img/favicon.png';
import { useDispatch, useSelector } from 'react-redux';
import { FaCopy } from 'react-icons/fa';
import moment from 'moment';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { useMsal } from '@azure/msal-react';
// import { DISCOVERY_DOCS, SCOPES } from '../../../helper/utlis';

 const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  "https://www.googleapis.com/discovery/v1/apis/admin/reports_v1/rest"
];

 const SCOPES = [
  "https://www.googleapis.com/auth/admin.reports.usage.readonly",
  "https://www.googleapis.com/auth/calendar.events",
  'https://www.googleapis.com/auth/admin.reports.audit.readonly',
];


const Meetings = ({ showMeetings, handleCloseMeetings, handleShowSchedule, handleShowMeetingInfo, createdMeetings }) => {
  const { instance, accounts } = useMsal();
  const [value, onChange] = useState(new Date());
  const [event, setEvent] = useState([])
  const {allEvents} = useSelector(state=>state.adminData)
  const [linkCopied , setLinkedCopied] = useState(false)
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentTime = moment();
  console.log(currentTime,"currentTime")

  useEffect(()=>{
    if(allEvents?.events?.length>0){
      setEvent(allEvents?.events)
    }
 
  },[allEvents])


  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: "AIzaSyCvwWpOjYlFNn8h77VjMJn_1il2fEPTRJY",
            clientId: "1044218423716-d5ulieefv87jqu0ti2q9opvtuo6ed8i2.apps.googleusercontent.com",
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
    setLinkedCopied(false)
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      setIsAuthenticated(true);
    }
  }, [accounts]);

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(instance, {
    account: accounts[0],
    scopes: ["user.read", "Calendars.ReadWrite"],
    prompt: "consent",
  });
  


  const fetchCalendarEvents = (e) => {
    console.log(e.target.value,"er")
    let val=e.target.value
    if(val=="google"){
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
    }).catch((error) => {
      console.error('Error fetching events:', error);
    });
  }else if(val=="microsoft"){
    getMicrosoftData()
  }

  };
  console.log(event,"event")

    // const isEventDate = (date) => {
    //   return event.some(event => event.start?.dateTime.toDateString() === date.toDateString());
    // };

   const getMicrosoftData=async()=>{
    if (!isAuthenticated) {
      console.log('User not authenticated');
      return;
    }
    const client = Client.initWithMiddleware({ authProvider });

    try {
      const response = await client.api('/me/events').get();
      setEvent(response.value);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
   } 



   

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

  const getGoogleEventDetails=(event, fieldName)=>{
    const start_time=moment(event?.start?.dateTime).format('HH:mm:ss')
    const end_time=moment(event?.end?.dateTime).format('HH:mm:ss')
    const profile_img = event?.conferenceData?.conferenceSolution?.iconUri
    const start_date = event?.start?.dateTime?.slice(0,10)
    const end_date = event?.end?.dateTime?.slice(0,10)
    const currentTime = moment()
    const formattedStartTime = moment(event?.start?.dateTime)
    const differenceInMillis = currentTime.diff(formattedStartTime);
    const duration =  moment.duration(differenceInMillis);
    const hours = duration.hours();
    if (fieldName === "date"){
      return end_date;
    }else if(fieldName === "time"){
    return `${start_time} - ${end_time}`;
    }else if(fieldName === "profile_picture"){
      return profile_img;
    }else if(fieldName === "upcoming"){
      return hours;
    }


  }
  const handleCopy=(e,link)=>{
    e.stopPropagation()
    navigator.clipboard.writeText(link)
    setLinkedCopied(true)
  }
  return (
    <Offcanvas show={showMeetings} placement="end" className="meeting-sidebar" onHide={handleCloseMeetings}>
      <Offcanvas.Header className="border-bottom-grey pb-3" closeButton>
        <div className="d-flex align-items-center gap-2">
          <Offcanvas.Title>Meetings</Offcanvas.Title>
          <ToolTip text={"New Meeting"}>
            <Button onClick={handleShowSchedule} className="main-btn px-2 add-new-btn cursor-pointer upload-btn mb-0">+</Button>
          </ToolTip>
          {/* <button onClick={fetchCalendarEvents} className="main-btn font-14 py-1">Sync with Service</button> */}
          <select onClick={fetchCalendarEvents}  className="main-btn font-14 py-1">
            <option>Sync with Service</option>
            <option value="google">Google</option>
            <option value="microsoft">Microsoft</option>
          </select>
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
                  <div onClick={()=>handleShowMeetingInfo(item)} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4 meeting-info-card">
                    <div className='meeting-type'>
                       { item?.kind ?<img src={googleIcon} />:<img src={rexettIcon} />}
                    </div>
                    <div>
                      <p className="interview-title mb-2">{item?.kind? item?.summary : item?.title}</p>
                      <p className="dev-name mb-2 font-14">
                        <div className="me-1">
                          <img src={item?.kind ? getGoogleEventDetails(item,"profile_picture") : item?.developer_profile_picture  } />
                        </div>
                        <div className='d-flex align-items-center gap-2 meeting-link-wrapper'>
                          {/* {item?.creator?.displayName} */}
                          { item?.kind? <p className='mb-0 meeting-link-text'>Meeting Link :{item?.hangoutLink}</p> :  <p className='mb-0 meeting-link-text'>Meeting Link :{item?.event_link}</p>}
                          <ToolTip text={linkCopied ? "Link copied to clipboard" : "Copy Link"}>
                          <Button className='copy-btn p-0' onClick = {(e)=>handleCopy( e,item?.kind? item?.hangoutLink : item?.event_link)}>
                            <FaCopy />
                          </Button>
                          </ToolTip>
                          
                        </div>
                      </p>
                      <div className='d-flex align-items-center flex-wrap gap-3 mt-2'>
                        <p className='mb-1 associate-text'><span className='associate font-14'>Date : <strong>{item?.kind ? getGoogleEventDetails(item,"date")   :item?.event_date?.slice(0,10)}</strong></span></p>
                        <p className=' mb-1 associate-text'><span className='associate font-14'>Time : <strong>{item?.kind ? getGoogleEventDetails(item,"time") : item?.event_time}-{item?.event_end_time}</strong></span></p>
                      </div>
                      {/* <p className="interview-timing mb-2 font-14">{item?.start?.dateTime?.slice(0, 10)}</p> */}
                    { item?.kind? "": <button className='google-btn' onClick={(e)=>syncCreatedMeetingsWithGoogle(e,item)}>
                      <img src={googleIcon} /> Sync with Google</button>}
                    </div>
                    <div className="mb-2 status-interview">
                      {/* <span className="status-upcoming">Upcoming in{getDuration(item?.event_end_time)}hr</span> */}
                      <span className="status-upcoming">Upcoming in {getGoogleEventDetails(item,"upcoming")} hr</span>

                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Meetings