import mongoose from 'mongoose'

import { IKanban } from '@/interfaces/IKanban'
import { kanbanSectionsSchema } from './MKanbanSections'

export const kanbanSchema = new mongoose.Schema<IKanban>({
    KanbanTitle: {
        type: String,
        required: true
    },
    KanbanSections: {
        type: kanbanSectionsSchema,
        required: true
    }
})