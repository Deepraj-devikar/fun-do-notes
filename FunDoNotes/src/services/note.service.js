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

//archive single note
export const archiveNote = async (id, user_id) => {
    console.log("INPUT - note.service -> archiveNote ----->", id, user_id);
    const note = await getNote(id, user_id);
    let data;
    if (note) {
        data = await Note.findByIdAndUpdate(
            {
                _id: id,
                user_id: user_id
            },
            {
                is_archived: !note.is_archived
            },
            {
                new: true
            }
        );    
    } else {
        data = null;        
    }
    console.log("OUTPUT - note.service -> archiveNote ----->", data);
    return data;
};

//trash single note
export const trashNote = async (id, user_id) => {
    console.log("INPUT - note.service -> trashNote ----->", id, user_id);
    const note = await getNote(id, user_id);
    let data;
    if (note) {
        data = await Note.findByIdAndUpdate(
            {
                _id: id,
                user_id: user_id
            },
            {
                is_trash: !note.is_trash
            },
            {
                new: true
            }
        );    
    } else {
        data = null;        
    }
    console.log("OUTPUT - note.service -> trashNote ----->", data);
    return data;
};