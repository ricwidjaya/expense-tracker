const express = require("express")
const router = express.Router()
const { userAuthenticated } = require("../middleware/middleware")

const home = require("./modules/home")
const users = require("./modules/users")
const auth = require("./modules/auth")
const api = require("./modules/api")

router.use("/users", users)
router.use("/auth", auth)
router.use("/api", userAuthenticated, api)
router.use("/", userAuthenticated, home)

module.exports = router
