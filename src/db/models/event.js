import { Schema, model } from "mongoose";

const participantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    howUKnow: {
        type: String,
        required: true,
        enum: ['Social media', 'Friends', 'Found myself'],
        default: 'Found myself'
    },
    dateOfRegistration: {
        type: Date,
        required: true,
    }
 }
);

const eventSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    organizer: {
        type: String,
        required: true,
    },
    participants: {
        type: [participantSchema],
        default: []
    },
    idByThirdApi: {
        type: String,
        required: true,
        default: ''
    },
    expireAt: {
        type: Date,
        default: function() {
            return this.eventDate
        },
        index: {expires: '0s'}
    }
})

export const eventCollection = model('some_event', eventSchema)
