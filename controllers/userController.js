const bcrypt = require("bcryptjs")
const User = require("../models/user")

module.exports = {
  getLoginPage: (req, res) => {
    return res.render("login", {
      style: "account"
    })
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
  }
}
