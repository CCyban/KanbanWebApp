import mongoose from 'mongoose'

import { IKanbanSectionCard } from '@/interfaces/IKanbanSectionCard'
import { kanbanCardCommentsSchema } from './MKanbanCardComments'

export const kanbanSectionCardSchema = new mongoose.Schema<IKanbanSectionCard>({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Priority: {
        type: Number,
        required: true
    },
    Estimation: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: String,
        required: true
    }
}).add(kanbanCardCommentsSchema);