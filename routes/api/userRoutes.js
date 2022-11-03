const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    postUser,
    putUser,
    delUser,
    postFriend,
    delFriend,
} = require("../../controllers/userController");

// GET and POST /api/users
router.route("/").get(getAllUsers).post(postUser);

router.route("/:id").get(getUserById).put(putUser).delete(delUser);

router.route("/:id/friends/:friendId").post(postFriend).delete(delFriend);

module.exports = router;