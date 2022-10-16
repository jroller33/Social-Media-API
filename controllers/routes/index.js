const path = require("path");
const router = require("express").Router();
const thoughtApi = require("./thoughtRoutes");
const userApi = require("./userRoutes");

router.use("/api/thoughts", thoughtApi);
router.use("/api/users", userApi);

module.exports = router;