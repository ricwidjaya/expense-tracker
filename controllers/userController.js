const bcrypt = require("bcryptjs")
const User = require("../models/user")

module.exports = {
  getLoginPage: (req, res) => {
    if (req.user) return res.redirect("/")
    return res.render("login", {
      style: "account"
    })
  },

  // Log user in
  login: (req, res) => {
    return res.redirect("/")
  },

  getSignUpPage: (req, res) => {
    return res.render("signup", {
      style: "account"
    })
  },

  // Create new user
  postUser: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) return res.redirect("back")
    User.findOne({ email }).then((user) => {
      if (user) {
        req.flash("error_messages", "This email has been registered.")
        return res.redirect("/users/login")
      } else {
        User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        }).then(() => {
          req.flash("success_messages", "Account Created.")
          return res.redirect("/users/login")
        })
      }
    })
  },

  // User logout
  logout: (req, res) => {
    req.logout()
    req.flash("success_messages", "You've been logged out.")
    return res.redirect("/users/login")
  }
}
