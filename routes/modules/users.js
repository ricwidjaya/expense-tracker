const express = require("express")
const router = express.Router()

const userController = require("../../controllers/userController")

router.get("/login", userController.getLoginPage)
router.get("/signup", userController.getSignUpPage)
router.post("/signup", userController.postUser)

module.exports = router
