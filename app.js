const express = require("express")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const PORT = process.env.PORT
const app = express()
require("./config/mongoose")
const routes = require("./routes")
const exphbs = require("express-handlebars")
const { locals } = require("./middleware/middleware")
const session = require("express-session")
const flash = require("connect-flash")
const methodOverride = require("method-override")

// View engine & static file config
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: require("./config/handlebars-helpers")
  })
)
app.set("view engine", "hbs")
app.use(express.static("public"))

// Http & sessions & passport
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(flash())
require("./config/passport")(app)
app.use(locals)

app.use(routes)

app.listen(PORT, () => {
  console.log(`App server hosts on ${PORT}`)
})
