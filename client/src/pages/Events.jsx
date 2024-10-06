import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/Event.css'
import API from '../../services/API'

const Events = (props) => {
    const [locations, setLocations] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const [events, setEvents] = useState(allEvents)

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await API.getAllLocations()
                setLocations(locationsData)

                const allEventsData = await API.getAllEvents()
                setAllEvents(allEventsData)
                setEvents(allEventsData)
            }
            catch (error) {
                throw error
            }
        })()
    }, [])

    return (
        <>
            <div className='all-events-main'>
                <div className="event-filters">
                    <select
                        onChange={(event) => {
                            const selectedLocation = event.target.value;
                            if (selectedLocation === "all") {
                                setEvents(allEvents);
                            } else {
                                const eventsFiltered = allEvents.filter(
                                    (e) => e.location === parseInt(selectedLocation)
                                );
                                setEvents(eventsFiltered);
                            }
                        }}
                    >
                        {
                            <>
                                <option value="all">See all events . . .</option>
                                {locations && locations.length > 0 ? locations.map((location, index) =>
                                    <option key={location.id} value={location.id} name={location.name}>{location.name}</option>
                                ) : <option value="0">No events . . .</option>}
                            </>
                        }
                    </select>
                    <button onClick={
                        () => {
                            document.querySelector('select').value = 'all';
                            setEvents(allEvents);
                        }
                    } >SHOW ALL EVENTS</button>
                </div>
                <div className="all-events">
                    {
                        events && events.length > 0 ? events.map((event, index) =>
                            <Event
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                date={event.date}
                                time={event.time}
                                image={event.image}
                                remaining={event.remaining}
                            />
                        ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                    }
                </div>
            </div>
        </>
    )
}

export default Events