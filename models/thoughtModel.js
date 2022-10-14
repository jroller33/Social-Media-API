const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reactions = require("./reactionModel");
const formatDate = require("../utils/helpers");

const thoughtSchema = new Schema(
    {
        // thoughtText
        // userName
        // createdAt
        // thoughtReactions
    }
);

module.exports = Thought;