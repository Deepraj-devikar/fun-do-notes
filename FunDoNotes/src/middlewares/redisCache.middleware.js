import { redisConnectionEstablished, redisClient } from '../config/redis';
import HttpStatus from 'http-status-codes';

export const getAllNotesRedisCache = async (req, res, next) => {
    if(redisConnectionEstablished){
        const allNotesStringified = await redisClient.get('user-'+req.body.userId+'-all-notes');
        const allNotes = JSON.parse(allNotesStringified);
        if (allNotes) {
            return res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: allNotes,
                message: 'All notes fetched successfully from redis cache'
            });
        }
    }
    next();
};

export const getNoteRedisCache = async (req, res, next) => {
    if(redisConnectionEstablished){
        const noteStringified = await redisClient.get('user-'+req.body.userId+'-note-'+req.params._id);
        const note = JSON.parse(noteStringified);
        if (note) {
            return res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: note,
                message: 'Note fetched successfully from redis cache'
            });
        }
    }
    next();
}