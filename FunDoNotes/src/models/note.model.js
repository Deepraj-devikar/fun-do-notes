import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        title: {
            type: String,
            default: "undefined"
        },
        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

export default model('Note', noteSchema);
