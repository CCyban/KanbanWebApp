import mongoose from 'mongoose'

import { IKanbanSection } from '@/interfaces/IKanbanSection'
import { kanbanSectionCardsSchema } from './MKanbanSectionCards'

export const kanbanSectionSchema = new mongoose.Schema<IKanbanSection>({
    SectionHeader: {
        type: String,
        required: true
    },
    SectionCards : {
        type: kanbanSectionCardsSchema,
        required: true,
    }
})