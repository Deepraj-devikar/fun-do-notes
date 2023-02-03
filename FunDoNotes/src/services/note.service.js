import Note from '../models/note.model';
import { redisConnectionEstablished, redisClient } from '../config/redis';

//get all notes
export const getAllNotes = async (userId) => {
    const data = await Note.find({userId: userId});
    if(redisConnectionEstablished){
        await redisClient.set('user-'+userId+'-all-notes', JSON.stringify(data));
    }
    return data;
};

//create new note
export const newNote = async (body) => {
    console.log("INPUT - note.service -> newNote ----->", body);
    const data = await Note.create(body);
    if(redisConnectionEstablished){
        await redisClient.del('user-'+body.userId+'-all-notes');
    }
    console.log("OUTPUT - note.service -> newNote ----->", data);
    return data;
};

//update single note
export const updateNote = async (_id, body) => {
    console.log("INPUT - note.service -> updateNote ----->", _id, body);
    const data = await Note.findByIdAndUpdate(
        {
            _id: _id,
            userId: body.userId
        },
            body,
        {
            new: true
        }
    );
    if(redisConnectionEstablished){
        await redisClient.del('user-'+body.userId+'-all-notes');
        await redisClient.del('user-'+body.userId+'-note-'+_id);
    }
    console.log("OUTPUT - note.service -> updateNote ----->", data);
    return data;
};

//delete single note
export const deleteNote = async (id, userId) => {
    console.log("INPUT - note.service -> deleteNote ----->", id);
    await Note.findByIdAndDelete({_id: id, userId: userId});
    if(redisConnectionEstablished){
        await redisClient.del('user-'+userId+'-all-notes');
        await redisClient.del('user-'+userId+'-note-'+id);
    }
    return '';
};

//get single note
export const getNote = async (id, userId) => {
    const data = await Note.findOne({_id: id, userId: userId});
    if(redisConnectionEstablished){
        await redisClient.set('user-'+userId+'-note-'+id, JSON.stringify(data));
    }
    return data;
};

//archive single note
export const archiveNote = async (id, userId) => {
    console.log("INPUT - note.service -> archiveNote ----->", id, userId);
    const note = await getNote(id, userId);
    let data;
    if (note) {
        data = await Note.findByIdAndUpdate(
            {
                _id: id,
                userId: userId
            },
            {
                isArchive: !note.isArchive
            },
            {
                new: true
            }
        );    
    } else {
        data = null;        
    }
    if(redisConnectionEstablished){
        await redisClient.del('user-'+userId+'-all-notes');
        await redisClient.del('user-'+userId+'-note-'+id);
    }
    console.log("OUTPUT - note.service -> archiveNote ----->", data);
    return data;
};

//trash single note
export const trashNote = async (id, userId) => {
    console.log("INPUT - note.service -> trashNote ----->", id, userId);
    const note = await getNote(id, userId);
    let data;
    if (note) {
        data = await Note.findByIdAndUpdate(
            {
                _id: id,
                userId: userId
            },
            {
                isTrash: !note.isTrash
            },
            {
                new: true
            }
        );    
    } else {
        data = null;        
    }
    if(redisConnectionEstablished){
        await redisClient.del('user-'+userId+'-all-notes');
        await redisClient.del('user-'+userId+'-note-'+id);
    }
    console.log("OUTPUT - note.service -> trashNote ----->", data);
    return data;
};