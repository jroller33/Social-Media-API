const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtById,
    postThought,
    putThought,
    delThought,
    addReaction,
    delReaction,
} = require("../../controllers/thoughtController");

// GET and POST /api/thoughts
router.route("/").get(getAllThoughts).post(postThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(putThought)
  .delete(delThought);

router.route("/:id/reactions").post(addReaction);

router.route("/:id/reactions/:reactionId").delete(delReaction);

module.exports = router;