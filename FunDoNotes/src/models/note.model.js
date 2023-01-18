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
        userId: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: "#FFFFFF"
        },
        isArchive: {
            type: Boolean,
            default: false 
        },
        isTrash: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default model('Note', noteSchema);
