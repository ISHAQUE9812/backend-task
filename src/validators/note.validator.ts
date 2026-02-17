
import { z } from 'zod'

export const createNoteSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    content: z.string().min(1, 'content is required'),
    isPinned: z.boolean().optional()
})