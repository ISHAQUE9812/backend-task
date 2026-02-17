"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getAllNotes = exports.createNote = void 0;
const note_model_1 = require("../models/note.model");
/* ===============================
   CREATE NOTE
================================ */
const createNote = async (req, res) => {
    try {
        const { title, content, isPinned } = req.body;
        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'Title and content are required' });
        }
        const note = await note_model_1.Note.create({ title, content, isPinned });
        return res.status(201).json({ success: true, data: note });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to creat note', error });
    }
};
exports.createNote = createNote;
/* ===============================
   GET ALL NOTES
================================ */
const getAllNotes = async (req, res) => {
    try {
        const notes = await note_model_1.Note.find().sort({ createdAt: -1 });
        return res.status(200).json({ succes: true, data: notes });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch notes', error });
    }
};
exports.getAllNotes = getAllNotes;
/* ===============================
   GET SINGLE NOTE
================================ */
const getNoteById = async (req, res) => {
    try {
        const note = await note_model_1.Note.findById(req.params.id);
        if (!note) {
            return res.status(400).json({ success: false, message: 'Note not found' });
        }
        return res.status(200).json({ success: true, data: note });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'invalid note id', error });
    }
};
exports.getNoteById = getNoteById;
/* ===============================
   UPDATE NOTE
================================ */
const updateNote = async (req, res) => {
    try {
        const note = await note_model_1.Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) {
            return res.status(400).json({ success: true, message: 'Note not found' });
        }
        return res.status(200).json({ success: true, data: note });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to update not' });
    }
};
exports.updateNote = updateNote;
/* ===============================
   DELETE NOTE
================================ */
const deleteNote = async (req, res) => {
    try {
        const note = await note_model_1.Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(400).json({ success: false, message: "note not found" });
        }
        return res.status(500).json({ success: true, message: " Note deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to delete note ' });
    }
};
exports.deleteNote = deleteNote;
//# sourceMappingURL=not.controllers.js.map