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

// GET, PUT and DELETE user by id
router.route("/:id").get(getUserById).put(putUser).delete(delUser);

// POST and DELETE friend                   **** not working right now

// router.route("/:id/friends/:friendId").post(postFriend).delete(delFriend);


module.exports = router;