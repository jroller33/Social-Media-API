const db = require("../models");

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

    findAll: function (req, res) {      // GET all thoughts
        db.Thought
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err))
    },

    findById: function (req, res) {     // GET thought by _id
        db.Thought
            .findOne({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err))
    },

    updateThought: function (req, res) {
        db.Thought
            .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err))
    },

    addReaction: function (req, res) {
        db.Thought
    }

    // removeReaction

    // DELETE thought

    
