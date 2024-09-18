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
    }
});

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
        type: String,
        required: true,
    },
    organizer: {
        type: String,
        required: true,
    },
    participants: {
        type: [participantSchema],
        default: []
    }
})

export const eventCollection = model('events', eventSchema)
