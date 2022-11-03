const { Types, model, Schema } = require("mongoose");
const reactions = require("./reactionModel");
const dayjs = require("dayjs");

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
            get: (date) => {
                return dayjs(date).format("DD/MM/YYYY");
            }
        },

        userName: {      // DONE
            type: String,
            required: true
        },

        //                   *********** is userId needed  ????

        // userId: {      // DONE
        //     type: mongoose.Types.ObjectId,
        //     required: true
        // },

        thoughtReactions: [reactions],
    },
    {
        toJSON: {      // DONE
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

thoughtSchema.virtual("reactionCount").get(function() {      // DONE
    return this.thoughtReactions?.length;
});

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;