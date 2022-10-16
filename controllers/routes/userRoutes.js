const router = require("express").Router();
const userController = require("../userController");

router.route("/post")       // POST new user to db
    .post(userController.create);

router.route("/")       // GET all users
    .get(userController.findAll);

router.route("/:id")        // GET user by _id
    .get(userController.findById);

router.route("/update/:id")     // PUT: update user and user's thoughts
    .put(userController.updateUser);

router.route("/add/:id/friends/:friendId")      // PUT update user to add friend
    .put(userController.addFriend);

router.route("/remove/:id/friends/:friendId")   // PUT update user to remove friend
    .put(userController.removeFriend);

router.route("/delete/:id")                 // DELETE user and their thoughts
    .delete(userController.deleteUser);

module.exports = router;