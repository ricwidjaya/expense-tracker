module.exports = {
  setFlash: (req, res, next) => {
    res.locals.success_messages = req.flash("success_messages")
    res.locals.error_messages = req.flash("error_messages")
    res.locals.user = req.user
    return next()
  }
}
