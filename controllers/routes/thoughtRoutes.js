const router = require("express").Router();
const thoughtController = require("../thoughtController");

router.route("/post")
    .post(thoughtController.create);