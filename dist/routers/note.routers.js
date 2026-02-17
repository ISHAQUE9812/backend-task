"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const not_controllers_1 = require("../controllers/not.controllers");
const router = (0, express_1.Router)();
router.post('/notes', not_controllers_1.createNote);
router.get('/notes', not_controllers_1.getAllNotes);
router.get('/notes/: id', not_controllers_1.getNoteById);
router.put('/notes/:id', not_controllers_1.updateNote);
router.delete('/note/:id', not_controllers_1.deleteNote);
exports.default = router;
//# sourceMappingURL=note.routers.js.map