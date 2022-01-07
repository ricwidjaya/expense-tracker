const bcrypt = require("bcryptjs")
const User = require("../models/user")

module.exports = {
  loginPage: (req, res) => {
    return res.render("login", {
      style: "account"
    })
  },

  signUpPage: (req, res) => {
    return res.render("signup", {
      style: "account"
    })
  },

  signUp: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) return res.redirect("back")
    User.findOne({ email }).then((user) => {
      if (user) {
        console.log("User Already Exist")
        return res.redirect("/users/login")
      } else {
        User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        }).then((user) => {
          console.log(user)
          return res.redirect("/")
        })
      }
    })
  }
}
