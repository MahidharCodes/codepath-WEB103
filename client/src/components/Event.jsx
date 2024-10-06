import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const Event = (event) => {

    const [remaining, setRemaining] = useState(event.remaining)

    return (
        <article className='event-information'>
            <img src={event.image} />
            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p>
                        <i className={`fa-regular fa-calendar ${(remaining.years >= 0 && remaining.months >= 0 && remaining.days >= 0) ? "fa-bounce" : " "}`}></i>
                        {event.date} <br /> {event.time}</p>
                    <p id={`remaining-${event.id}`}>{remaining.years} years, {remaining.months} months, {remaining.days} days</p>
                </div>
            </div>
        </article>
    )
}

export default Event