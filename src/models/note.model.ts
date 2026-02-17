import mongoose, { Schema } from "mongoose"
import { boolean } from "zod"

export interface INote extends Document {
    title: string
    content: string
    isPinned: boolean
    createdAt: Date 
}

const noteSchema = new Schema<INote>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        }, 
        isPinned: {
            type: Boolean,
            default: false
        },
       
    }, 
    {
        timestamps: true  
    }
)

export const Note = mongoose.model<INote>('Note', noteSchema)