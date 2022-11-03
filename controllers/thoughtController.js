const { Thought , User } = require("../models");

module.exports = {
  
  // get one thought by its _id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) => {

        if (!thought) {
          res.status(404).json({ message: "" });

        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  
    // update thought by its _id
    putThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) => {
  
          if (!thought) {
            res.status(404).json({ message: "No thought found with that id" });
  
          } else {
            res.json(thought);
          }
        })
        .catch((err) => res.json(err));
    },

  // post a new thought and update user
  postThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {

        res.json(thought);
        User.findOneAndUpdate(

          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        ).catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete a thought by its _id
  delThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {

        if (!thought) {
          res.status(404).json({ message: "No thought with that id" });

        } else {
          res.json({ message: "Thought was deleted." });
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  // post a reaction to a thought, by using the thought's _id
  postReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // delete a reaction to a thought, by using thought's _id
  delReaction(req, res) {
    Thought.findOneAndUpdate(

      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => res.json({ message: "Reaction deleted." }))
      .catch((err) => res.json(err));
  },
}

