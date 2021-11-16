import mongoose from 'mongoose'

import { IKanbanSection } from '@/interfaces/IKanbanSection'
import { kanbanSectionCardsSchema } from './MKanbanSectionCards'

const implementedModel = mongoose.model('kanbanSectionCardsModel', kanbanSectionCardsSchema);

export const kanbanSectionSchema = implementedModel.discriminator('kanbanSectionModel', new mongoose.Schema<IKanbanSection>({
    SectionHeader: {
        type: String,
        required: true
    },
}));