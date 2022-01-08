module.exports = {
  locals: (req, res, next) => {
    res.locals.success_messages = req.flash("success_messages")
    res.locals.error_messages = req.flash("error_messages")
    res.locals.user = req.user
    console.log(res.locals)
    return next()
  },

  userAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.redirect("/users/login")
  }
}
