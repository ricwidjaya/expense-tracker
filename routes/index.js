const express = require("express")
const router = express.Router()

const home = require("./modules/home")
const users = require("./modules/users")

router.use("/", home)
router.use("/users", users)

module.exports = router
