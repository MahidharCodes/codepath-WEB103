
const getAllLocations = async () => {
    try {
        const results = await fetch('http://localhost:3000/api/locations')
        const data = await results.json()
        return data
    }
    catch (err) {
        console.log(err)
    }
}

const getAllEvents = async () => {
    try {
        const results = await fetch('http://localhost:3000/api/events')
        const data = await results.json()
        return data
    }
    catch (err) {
        console.log(err)
    }
}

export default {
    getAllLocations,
    getAllEvents
}