import mongoose from 'mongoose'

import { IKanbanCardComments } from '@/interfaces/IKanbanCardComments'
import { kanbanCardCommentSchema } from './MKanbanCardComment'

export const kanbanCardCommentsSchema = new mongoose.Schema<IKanbanCardComments>({
    Comments : {
        type: [kanbanCardCommentSchema],
        required: true,
    }
})