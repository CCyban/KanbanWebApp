import mongoose from 'mongoose'

import { IKanban } from '@/interfaces/IKanban'
import { kanbanSectionsSchema } from './MKanbanSections'

const implementedModel = mongoose.model('kanbanSectionsModel', kanbanSectionsSchema);

export const kanbanSchema = implementedModel.discriminator('kanbanModel', new mongoose.Schema<IKanban>({
    KanbanTitle: {
        type: String,
        required: true
    }
}));