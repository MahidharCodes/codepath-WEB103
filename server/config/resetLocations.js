import dotenv from 'dotenv'
import { pool } from './database.js'
dotenv.config({ path: '../.env' })

async function createLocationsTable() {
    const createTableQuery = `
    DROP TABLE IF EXISTS locations;


    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(30) NOT NULL,
        state VARCHAR(10) NOT NULL,
        zip VARCHAR(10) NOT NULL,
        image VARCHAR(255) NOT NULL
    )
  `
    try {
        await pool.query(createTableQuery);
        console.log('🎉 Locations table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating locations table', err);
    }
}

async function seedLocationsTable() {
    await createLocationsTable();
    let events = [];
    try {
        await fetch('https://unitygridplaza.up.railway.app/api/locations')
            .then(response => response.json())
            .then(data => {
                events = data;
            });
    }
    catch (err) {
        console.error('⚠️ error fetching events', err);
    }
    events.forEach(location => {
        const insertEventQuery = {
            text: 'INSERT INTO locations(name, address, city, state, zip, image) VALUES($1, $2, $3, $4, $5, $6)',
        }

        location.image = (location.image.length > 200) ? '' : location.image;
        const values = [location.name, location.address, location.city, location.state, location.zip, location.image];

        pool.query(insertEventQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting location', err)
                return
            }

            console.log(`✅ ${location.name} added successfully`)
        })
    });
}

seedLocationsTable();