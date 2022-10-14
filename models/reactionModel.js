const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
        reactionId: {
            type: mongoose.Types.ObjectId,
            required: true,
            default: new mongoose.Types.ObjectId
        },
        body: {
            type: String,
            required: true,
            maxLength: 280
        },
        userName: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            //          getter method for timestamp here
        }
    },
    {
        toJSON: {
            getters: true
        },
    }
);

module.exports = reactionSchema;