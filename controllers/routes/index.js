const path = require("path");
const router = require("express").Router();
const thoughtApi = require("./thoughtRoutes");
const userApi = require("./userRoutes");

router.use("/api/thought", thoughtApi);
router.use("/api/user", userApi);

module.exports = router;