const mongoose = require("mongoose");
const { Thought, User } = require("../models");
const userSeeds = require("./userSeeds.json");
const thoughtSeeds = require("./thoughtSeeds.json");

const seedDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-media_db");

    await User.deleteMany({});       // clear the db first
    await Thought.deleteMany({});

    const users = await User.create(userSeeds);     // seed users

    for (thought of thoughtSeeds) {                  // loop thru all thoughts

        const user = users[Math.floor(Math.random() * users.length)]      // create a random user. ***watchout for "user" vs "users"

        const newThought = await Thought.create({           // create a new thought and assign it to the random user
            ...thought,
            userId: user.id,
            userName: user.userName
        });

        await User.findOneAndUpdate({ _id: user.id }, {     // update the random user
            $addToSet: {
                userThoughts: newThought._id     // new thought's id is pushed to user's userThoughts array
            }
        }, { new: true })
    }
    process.exit(0);    // once the for loop is done, stop the process (seedDB())
};

seedDB();