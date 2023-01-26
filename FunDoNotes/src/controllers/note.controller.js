import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

/**
 * Controller to get all notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
    try {
		const data = await NoteService.getAllNotes(req.body.userId);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'All notes fetched successfully'
        });
	} catch(error){
		next(error);
	}
}

/**
 * Controller to get a single note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNote = async (req, res, next) => {
    try {
        const data = await NoteService.getNote(req.params._id, req.body.userId);
        if (data) {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Note fetched successfully'
            });
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Note not found'
            });
        } 
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNote = async (req, res, next) => {
    try {
        const data = await NoteService.newNote(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Note created successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to update a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNote = async (req, res, next) => {
    try {
        const data = await NoteService.updateNote(req.params._id, req.body);
        if (data){
            res.status(HttpStatus.ACCEPTED).json({
                code: HttpStatus.ACCEPTED,
                data: data,
                message: 'Note updated successfully'
            });
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Note not found'
            });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to delete a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNote = async (req, res, next) => {
    try {
        await NoteService.deleteNote(req.params._id, req.body.userId);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: [],
            message: 'Note deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to archive a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const archiveNote = async (req, res, next) => {
    try {
        const data = await NoteService.archiveNote(req.params._id, req.body.userId);
        if (data){
            res.status(HttpStatus.ACCEPTED).json({
                code: HttpStatus.ACCEPTED,
                data: data,
                message: 'Note archived successfully'
            });
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Note not found'
            });
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Controller to trash a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const trashNote = async (req, res, next) => {
    try {
        const data = await NoteService.trashNote(req.params._id, req.body.userId);
        if (data){
            res.status(HttpStatus.ACCEPTED).json({
                code: HttpStatus.ACCEPTED,
                data: data,
                message: 'Note trashed successfully'
            });
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                message: 'Note not found'
            });
        }
    } catch (error) {
        next(error);
    }
}