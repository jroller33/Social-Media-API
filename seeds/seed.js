const connection = require('../config/connection');
const { Thought, User } = require("../models");
const userSeeds = require("./userSeeds.json");
const thoughtSeeds = require("./thoughtSeeds.json");

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.insertMany(userSeeds);

    for (thought of thoughtSeeds) { // loop thru all thoughts
        const user = userSeeds[Math.floor(Math.random() * userSeeds.length)]// create a random user.

        const newThought = await Thought.insertMany({
            ...thought, // create a new thought and assign it to the random user
            userId: user.id,
            userName: user.username
        })

         // update the random user
      // new thought's id is pushed to user's userThoughts array
        await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { userThoughts: newThought }}, {new: true })
    }
    process.exit(0);  // once the for loop is done, stop the process 
})
