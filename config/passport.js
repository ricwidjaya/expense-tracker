const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const User = require("../models/user")
const bcrypt = require("bcryptjs")

module.exports = (app) => {
  // Passport Initialize
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

  // Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"],
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        const picture = profile._json.picture.data.url

        User.findOne({ email }).then((user) => {
          // User found
          if (user)
            return done(
              null,
              user,
              req.flash("success_messages", "Login successful.")
            )

          // New user
          const randomPassword = Math.random().toString(36).slice(-8)
          User.create({
            name,
            email,
            password: bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10))
          }).then((user) => {
            return done(
              null,
              user,
              req.flash("success_messages", "Login successful.")
            )
          })
        })
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
