const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reactions = require("./reactionModel");
const formatDate = require("../utils/helpers");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        userName: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            //                  need to put timestamp here
        },

        thoughtReactions: [reactions],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
    }
);

thoughtSchema.virtual("reactionCount").get(function() {
    return this.thoughtReactions?.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;