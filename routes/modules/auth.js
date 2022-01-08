const express = require("express")
const router = express.Router()
const passport = require("passport")

const userController = require("../../controllers/userController")

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
)

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/users/login" }),
  userController.login
)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/login" }),
  userController.login
)

module.exports = router
