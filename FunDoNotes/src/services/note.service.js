import Note from '../models/note.model';

//get all notes
export const getAllNotes = async (user_id) => {
    const data = await Note.find({user_id: user_id});
    return data;
};

//create new note
export const newNote = async (body) => {
    console.log("INPUT - note.service -> newNote ----->", body);
    const data = await Note.create(body);
    console.log("OUTPUT - note.service -> newNote ----->", data);
    return data;
};

//update single note
export const updateNote = async (_id, body) => {
    console.log("INPUT - note.service -> updateNote ----->", _id, body);
    const data = await Note.findByIdAndUpdate(
        {
            _id: _id,
            user_id: body.user_id
        },
            body,
        {
            new: true
        }
    );
    console.log("OUTPUT - note.service -> updateNote ----->", data);
    return data;
};

//delete single note
export const deleteNote = async (id, user_id) => {
    console.log("INPUT - note.service -> deleteNote ----->", id);
    await Note.findByIdAndDelete({_id: id, user_id: user_id});
    return '';
};

//get single note
export const getNote = async (id, user_id) => {
    console.log("INPUT - note.service -> getNote ----->", "_id: "+id, "user_id: "+user_id);
    const data = await Note.findOne({_id: id, user_id: user_id});
    console.log("OUTPUT - note.service -> getNote ----->", data);    
    return data;
};
