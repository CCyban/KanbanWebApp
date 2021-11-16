import mongoose from 'mongoose'

import { IKanbanSectionCard } from '@/interfaces/IKanbanSectionCard'
import { kanbanCardCommentsSchema } from './MKanbanCardComments'
import { kanbanSectionCardsSchema } from './MKanbanSectionCards'


const implementedModel = mongoose.model('kanbanCardCommentsModel', kanbanCardCommentsSchema);

export const kanbanSectionCardSchema = implementedModel.discriminator('kanbanSectionCardModel', new mongoose.Schema<IKanbanSectionCard>({
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
}));