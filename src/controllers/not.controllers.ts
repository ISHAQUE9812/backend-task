import { NextFunction, query, Request, Response } from "express";
import { Note } from "../models/note.model";
import { AppError } from "../utils/AppError";
import { title } from "process";

/* ===============================
   CREATE NOTE
================================ */
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, isPinned } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required" });
    }
    const note = await Note.create({ title, content, isPinned });
    return res.status(201).json({ success: true, data: note });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to creat note", error });
  }
};

/* ===============================
   GET ALL NOTES
================================ */

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    return res.status(200).json({ succes: true, data: notes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch notes", error });
  }
};

/* ===============================
   GET SINGLE NOTE
================================ */

export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return next(new AppError("Note not found", 404));
    }
    return res.status(200).json({ success: true, data: note });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "invalid note id", error });
  }
};

/* ===============================
   UPDATE NOTE
================================ */

export const updateNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!note) {
      return res.status(400).json({ success: true, message: "Note not found" });
    }
    return res.status(200).json({ success: true, data: note });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update not" });
  }
};

/* ===============================
   DELETE NOTE
================================ */

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: " deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
};
