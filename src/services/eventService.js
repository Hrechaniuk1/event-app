import createHttpError from "http-errors";

import {eventCollection} from '../db/models/event.js'

export async function getAllEvents() {
    const events = await eventCollection.find()
    return events
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
    console.log(body)
    const result = await eventCollection.findByIdAndUpdate(id, {participants: participants}, {new: true})
    return result
}
