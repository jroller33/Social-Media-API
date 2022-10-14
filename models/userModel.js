const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        userThoughts: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Thought"
            }
        ],
        userFriends: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.userFriends?.length;
});

const User = mongoose.model("User", userSchema);
module.exports = User;