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
  }
}
