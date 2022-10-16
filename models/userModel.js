const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName: {      // DONE
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        
        email: {      // DONE
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        },

        userThoughts: [      // DONE
            {
                type: mongoose.Types.ObjectId,
                ref: "Thought"
            }
        ],
        userFriends: [      // DONE
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {      // DONE
            virtuals: true,
        },
    }
);

userSchema.virtual("friendCount").get(function () {      // DONE
    return this.userFriends?.length;
});

const User = mongoose.model("User", userSchema);
module.exports = User;