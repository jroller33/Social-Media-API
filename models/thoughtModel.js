const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reactions = require("./reactionModel");

const thoughtSchema = new Schema(
    {
        thoughtText: {        // DONE
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            //                  need to put timestamp here
        },

        userName: {      // DONE
            type: String,
            required: true
        },
        
        userId: {      // DONE
            type: mongoose.Types.ObjectId,
            required: true
        },


        thoughtReactions: [reactions],
    },
    {
        toJSON: {      // DONE
            getters: true,
            virtuals: true
        },
    }
);

thoughtSchema.virtual("reactionCount").get(function() {      // DONE
    return this.thoughtReactions?.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;