import dotenv from 'dotenv'
import { pool } from './database.js'
dotenv.config({ path: '../.env' })

async function createEventsTable() {
    const createTableQuery = `
    DROP TABLE IF EXISTS events2;
    DROP TABLE IF EXISTS events;
  
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(25) NOT NULL,
        time INTEGER NOT NULL,
        location INTEGER NOT NULL,
        image VARCHAR(255) NOT NULL
    )
  `
    try {
        await pool.query(createTableQuery);
        console.log('🎉 Events table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating events table', err);
    }
}

async function seedEvenstsTable() {
    await createEventsTable();
    let events = [];
    try {
        await fetch('https://unitygridplaza.up.railway.app/api/events')
            .then(response => response.json())
            .then(data => {
                events = data;
            });
    }
    catch (err) {
        console.error('⚠️ error fetching events', err);
    }
    events.forEach(event => {
        const insertEventQuery = {
            text: 'INSERT INTO events(title, date, time, location, image) VALUES($1, $2, $3, $4, $5)',
        }
        const values = [event.title, event.date, event.time, event.location, event.image];

        pool.query(insertEventQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }

            console.log(`✅ ${event.title} added successfully`)
        })
    });
}

seedEvenstsTable();