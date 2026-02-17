import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/not.controllers";
import { validate } from "../middlewares/validate.middleware";
import { createNoteSchema } from "../validators/note.validator";


const router = Router()
router.post('/', validate(createNoteSchema))

router.post('/notes', createNote);
router.get('/notes', getAllNotes)
router.get('/notes/: id', getNoteById)
router.put('/notes/:id', updateNote)
router.delete('/notes/:id', deleteNote)

export default router