import { pool } from './database.js'
import './dotenv.js'
import mobilesData from '../data/mobiles.js'

async function createMobilesTable(){
    const createTableQuery = `
    DROP TABLE IF EXISTS mobiles;

    CREATE TABLE IF NOT EXISTS mobiles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(25) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        submittedBy VARCHAR(255) NOT NULL,
        submittedOn TIMESTAMP NOT NULL
    )
`
    try {
        await pool.query(createTableQuery);
        console.log('🎉 Mobiles table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating mobiles table', err);
    }
}

async function seedMobilesTable() {
    await createMobilesTable();
    mobilesData.forEach(mobile => {
        const insertMobileQuery = {
            text: 'INSERT INTO mobiles(name, price, image, description, submittedBy, submittedOn) VALUES($1, $2, $3, $4, $5, $6)',
        }
        const values = [mobile.name, mobile.price, mobile.image, mobile.description, mobile.submittedBy, mobile.submittedOn];

        pool.query(insertMobileQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting mobile', err)
                return
            }
        
            console.log(`✅ ${mobile.name} added successfully`)
        })
    });
}

seedMobilesTable();