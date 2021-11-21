import mongoose from 'mongoose'

import { IAccount } from '@/interfaces/IAccount'

export const accountSchema = new mongoose.Schema<IAccount>({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});