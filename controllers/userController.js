const { Thought, User } = require("../models");

module.exports = {

    // get one user by their _id
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .select("-__v")          // takes off -__v
        .populate({ path: "friends", select: "-__v" })
        .populate({ path: "thoughts", select: "-__v" })
        .then((user) => {
            
            if (!user) {
                res.status(404).json({ message: "No user has that id" });
                
            } else {
                res.json(user);
            }
        })
        .catch((err) => res.status(500).json(err));
    },
    
    // get all users
    getAllUsers(req, res) {
    User.find()
        .select("-__v") // takes off -__v
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    postUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    delUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {

            if (!user) {
            res.status(404).json({ message: "No user found with that id." });

            } else {
            // deletes all the user's thoughts when the user is deleted
            return Thought.deleteMany({ _id: { $in: user.thoughts } });
            }
        })
        .then(() => res.json({ message: "That user and their thoughts were deleted." }))
        .catch((err) => res.status(500).json(err));
    },

    putUser(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((user) => {

            if (!user) {
            res.status(404).json({ message: "There's no user with that id." });

            } else {
            res.json(user);
            }
        })
        .catch((err) => res.status(500).json(err));
    },

};