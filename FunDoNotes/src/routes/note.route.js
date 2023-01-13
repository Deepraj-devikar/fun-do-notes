import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';

const router = express.Router();

//route to get all notes
router.get('', noteController.getAllNotes);

//route to create a new note
router.post('', noteValidator, noteController.newNote);

//route to get a single note by their note id
router.get('/:_id', noteController.getNote);

//route to update a single note by their note id
router.put('/:_id', noteValidator, noteController.updateNote);

//route to delete a single note by their note id
router.delete('/:_id', noteController.deleteNote);

export default router;
