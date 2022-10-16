const router = require("express").Router();
const thoughtController = require("../thoughtController");

router.route("/post")                // POST new thought
    .post(thoughtController.create);

router.route("/")                     // GET all thoughts
    .get(thoughtController.findAll);

router.route("/:id")                 // GET thought by _id
    .get(thoughtController.findById);

router.route("/update/:id")         // PUT update thought
    .put(thoughtController.updateThought);

router.route("/add/:id/reaction")   // PUT update thought to add reaction
    .put(thoughtController.addReaction);

router.route("/remove/:id/reaction/:reactionId")    // PUT thought to remove reaction
    .put(thoughtController.removeReaction);

router.route("/delete/:id")     // DELETE a thought and remove its id from userThoughts array
    .delete(thoughtController.deleteThought);

module.exports = router;