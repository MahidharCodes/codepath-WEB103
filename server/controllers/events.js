import { pool } from '../config/database.js';

const calculateRemainingTime = (eventDateStr) => {
    // Parse the event date (the format is "MMM DD, YYYY")
    const eventDate = new Date(eventDateStr);

    // Get today's date
    const today = new Date();

    // Initialize remaining time object
    let remaining = {
        years: 0,
        months: 0,
        days: 0
    };

    // Calculate year difference
    remaining.years = eventDate.getFullYear() - today.getFullYear();

    // Calculate month difference
    remaining.months = eventDate.getMonth() - today.getMonth();

    // If months are negative, adjust years and months
    if (remaining.months < 0) {
        remaining.years--;
        remaining.months += 12;
    }

    // Calculate day difference
    remaining.days = eventDate.getDate() - today.getDate();

    // If days are negative, adjust months and days
    if (remaining.days < 0) {
        remaining.months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        remaining.days += lastMonth.getDate();
    }

    return remaining;
}

const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC');
        const events = results.rows.map(event => {
            const remaining = calculateRemainingTime(event.date);
            return {
                id: event.id,
                title: event.title,
                date: event.date,
                time: event.time,
                location: event.location,
                image: event.image,
                remaining: remaining
            }
        });
        res.status(200).json(events);
    }
    catch (err) {
        res.status(409).json({ error: err.message });
    }
}

export default {
    getEvents
}