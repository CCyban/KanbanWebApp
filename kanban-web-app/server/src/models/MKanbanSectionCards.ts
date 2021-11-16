import mongoose from 'mongoose'

import { IKanbanSectionCards } from '@/interfaces/IKanbanSectionCards'
import { kanbanSectionCardSchema } from './MKanbanSectionCard'

export const kanbanSectionCardsSchema = new mongoose.Schema<IKanbanSectionCards>({
    SectionCards: {
        type: [kanbanSectionCardSchema],
        required: true,
    }
})