import mongoose from 'mongoose'

import { IKanbanSections } from '@/interfaces/IKanbanSections'
import { kanbanSectionSchema } from './MKanbanSection'

export const kanbanSectionsSchema = new mongoose.Schema<IKanbanSections>({
    KanbanSections: {
        type: [kanbanSectionSchema],
        required: true,
    }
})