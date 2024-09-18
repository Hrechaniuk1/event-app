import createHttpError from 'http-errors';

import * as eventService from '../services/eventService.js'

export async function getAllEventsController(req, res) {
    const events = await eventService.getAllEvents()
    res.status(200).json({
        status: 200,
        message: 'Successfully found events!',
        data: events
    })
}

export async function getOneEventController(req, res) {
    const {id} = req.params;
    const event = await eventService.getOneEvent(id);
    res.status(200).json({
        status: 200,
        message: 'Successfully found the event!',
        data: event,
    })
}

export async function patchEventController(req, res) {
    const {id} = req.params;
    const result = await eventService.patchEvent(id, req.body);
    res.status(200).json({
        status: 200,
        message: 'The user has been added to the event successfully!',
        data: result,
    })
}
