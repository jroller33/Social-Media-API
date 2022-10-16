const router = require("express").Router();
const userController = require("../userController");

router.route("/post")
    .post(userController.create);

router.route("/")
    .get(userController.findAll);

router.route("/:id")
    .get(userController.findById);

router.route("/update/:id")
    .put(userController.updateUser);

router.route("/add/:id/friends/:friendId")
    .put(userController.addFriend);

router.route("/remove/:id/friends/:friendId")
    .put(userController.removeFriend);

router.route("/delete/:id")
    .delete(userController.deleteUser);

module.exports = router;