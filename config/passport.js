const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")
const bcrypt = require("bcryptjs")

module.exports = (app) => {
  // Initialize
  app.use(passport.initialize())
  app.use(passport.session())

  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            // Find no such user
            if (!user) {
              return done(
                null,
                false,
                req.flash("error_messages", "Invalid email or password.")
              )
            }

            // User enter wrong password
            if (!bcrypt.compareSync(password, user.password)) {
              return done(
                null,
                false,
                req.flash("error_messages", "Invalid email or password.")
              )
            }

            // Pass authentication
            return done(
              null,
              user,
              req.flash("success_messages", "Login successful.")
            )
          })
          .catch((err) => done(err, false))
      }
    )
  )

  // Serialize and Deserialize
  passport.serializeUser((user, done) => {
    return done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => {
        return done(null, user)
      })
      .catch((err) => done(err, false))
  })
}
