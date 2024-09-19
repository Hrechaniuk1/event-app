import createHttpError from "http-errors";

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
