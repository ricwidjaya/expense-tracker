const express = require("express")
const router = express.Router()
const { userAuthenticated } = require("../middleware/middleware")

const home = require("./modules/home")
const users = require("./modules/users")

router.use("/users", users)
router.use("/", userAuthenticated, home)

module.exports = router
