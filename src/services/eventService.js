import createHttpError from "http-errors";
import axios from "axios";

import {eventCollection} from '../db/models/event.js'
import { calculatePaginationData } from "../helpers/calculatePaginationData.js";

export async function getAllEvents(page, perPage, sortBy, sortOrder) {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const allEvents = eventCollection.find()

    const [amount, events] = await Promise.all([
        eventCollection.find().countDocuments(),
        allEvents.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).find()
    ])

    if (events.length === 0) {
        throw createHttpError(404, 'No events found');
    }

    const result = calculatePaginationData(amount, page, perPage)

    return {...result, data: events}
}

export async function getOneEvent(id) {
    const event = await eventCollection.findById(id)
    return event
}

export async function patchEvent(id, body) {
    const event = await eventCollection.findById(id)
    const newUser = body.email
    const participants = [...event.participants]
    participants.forEach(item => {
        if(item.email === newUser) throw createHttpError(422, 'User already registered on this event')
    })
    participants.push(body)
    const result = await eventCollection.findByIdAndUpdate(id, {participants: participants}, {new: true})
    return result
}


// ----------------------------------------------

export async function fillTheMDB() {
    try {
        axios.defaults.baseURL = 'https://app.ticketmaster.com/discovery/v2/'
        const params = {
             apikey: 'RuRWVRksGLePlvWclS0RuiYcoPBC55YM'
        };
        const result = await axios.get('/events', {params})
        const events = result.data._embedded.events
        const eventsForMDB = events.map(item => ({title: item.name, description: item.promoter.description, eventDate: new Date(item.dates.start.dateTime), organizer: item.promoter.name, idByThirdApi: item.id}))
        for(const item of eventsForMDB) {
            const isExist = await eventCollection.findOne({idByThirdApi: item.idByThirdApi})
            if(!isExist) {
                await eventCollection.create(item)
            }
        }
        console.log('Documents inserted successfully');
    } catch (err) {
        console.log(err)
    }
}



