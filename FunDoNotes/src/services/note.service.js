import Note from '../models/note.model';

//get all notes
export const getAllNotes = async () => {
    const data = await Note.find();
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
            _id
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
export const deleteNote = async (id) => {
    console.log("INPUT - note.service -> deleteNote ----->", id);
    await Note.findByIdAndDelete(id);
    return '';
};

//get single note
export const getNote = async (id) => {
    console.log("INPUT - note.service -> getNote ----->", id);
    const data = await Note.findById(id);
    console.log("OUTPUT - note.service -> getNote ----->", data);    
    return data;
};
