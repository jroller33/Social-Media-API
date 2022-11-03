const { User, Thought } = require("../models");

module.exports = {
    create: function (req, res) {       // POST new thought
        db.Thought
            .create(req.body)
            .then(thought => {
                db.User.findOneAndUpdate({ _id: thought.userId }, {
                    $addToSet: {
                        userThoughts: thought._id
                    }
                }, { new: true })
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(500).json(err))

            })
            .catch(err => res.status(500).json(err))
    },

    findById: function (req, res) {     // GET thought by _id
        db.Thought
            .findOne({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err))
    },

    findAll: function (req, res) {      // GET all thoughts
        db.Thought
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err))
    },


    updateThought: function (req, res) {    // PUT: update thought
        db.Thought
            .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err))
    },

    addReaction: function (req, res) {  // PUT: update thought to add reaction data
        db.Thought
            .findOneAndUpdate({ _id: req.params.id }, { $addToSet: {
            thoughtReactions: req.body } }, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err))
    },
    
    // PUT a thought to remove its reaction data
    removeReaction: function (req, res) {
        db.Thought
            .findOneAndUpdate({ _id: req.params.id }, { $pull: { thoughtReactions: { reactionId: req.params.reactionId } } }, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err))
    },

    // DELETE a thought and remove its id from the userThoughts array
    deleteThought: function (req, res) {
        db.Thought
            .findOneAndRemove({ _id: req.params.id })
            .then(thought =>
                !thought
                    ? res.status(404).json({ message: "No thought with that id" })
                    : db.User.findOneAndUpdate(
                        { userThoughts: req.params.id },
                        { $pull: { userThoughts: req.params.id } },
                        { new: true }
                    ))
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(500).json(err))
    }
}

