const db = require("../models");

module.exports = {
  create: function (req, res) {   // POST: new user to db
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err))
  },

  findAll: function (req, res) {    // GET all users
    db.User
      .find({})
      .populate("userThoughts")
      .populate("userFriends")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err))
  },

  findById: function (req, res) {   // GET a user by _id
    db.User
      .findOne({ _id: req.params.id })
      .populate("userThoughts")
      .populate("userFriends")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err))
  },

  updateUser: function (req, res) {   // PUT: user and user's thoughts
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true })
      .then(user =>
        !user
          ? res.status(400).json({ message: "No user with that id" })
          : db.Thought.updateMany({ _id: { $in: user.userThoughts } },
            { userName: user.userName }
          ))
      .then(() => res.json({ message: "user's thoughts updated" }))
      .catch(err => res.status(500).json(err))
  },

  addFriend: function (req, res) {  // PUT: update user to add new friend
    db.User
      .findOneAndUpdate({ _id: req.params.id }, { $addToSet: { userFriends: req.params.friendId } }, {new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err))
  },

  removeFriend: function (req, res) { // PUT: update user to remove friend
    db.User
      .findOneAndUpdate({ _id: req.params.id }, { $pull: { userFriends: req.params.friendId } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err))
  },
  deleteUser: function (req, res) { // DELETE user and user's thoughts
    db.User.findOneAndDelete({ _id: req.params.id })
      .then(user =>
        !user
          ? res.status(400).json({ message: "no user found with that id" })
          : db.Thought.deleteMany({ _id: { $in: user.userThoughts }})
        )
        .then(() => res.json({ message: "User and their thoughts deleted" }))
        .catch(err => res.status(500).json(err))
  }
};