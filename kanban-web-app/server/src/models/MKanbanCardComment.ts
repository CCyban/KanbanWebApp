import mongoose from 'mongoose'

import { IKanbanCardComment } from '@/interfaces/IKanbanCardComment'

export const kanbanCardCommentSchema = new mongoose.Schema<IKanbanCardComment>({
    Comment: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    }
})