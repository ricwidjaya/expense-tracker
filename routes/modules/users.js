const express = require("express")
const router = express.Router()
const passport = require("passport")

const userController = require("../../controllers/userController")

router.get("/login", userController.getLoginPage)
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true
  }),
  userController.login
)
router.get("/signup", userController.getSignUpPage)
router.post("/signup", userController.postUser)
router.get("/logout", userController.logout)

module.exports = router
