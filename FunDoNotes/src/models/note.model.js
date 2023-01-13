import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: "#FFFFFF"
        },
        is_archived: {
            type: Boolean,
            default: false 
        },
        is_trash: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default model('Note', noteSchema);
