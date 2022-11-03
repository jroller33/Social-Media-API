const { Schema, model, Types } = require("mongoose");

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
            match: [        // check if it's correct email format
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                "Please enter a valid email address",
            ],
        },

        userThoughts: [      // DONE
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        userFriends: [      // DONE
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {      // DONE
            virtuals: true,
        },
        id: false,
    },
);

userSchema.virtual("friendCount").get(function () {      // DONE
    return this.userFriends?.length;
});

const User = model("User", userSchema);
module.exports = User;