const express = require("express")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const PORT = process.env.PORT
const app = express()
require("./config/mongoose")
const routes = require("./routes")
const exphbs = require("express-handlebars")
const middleware = require("./middleware/middleware")
const session = require("express-session")
const flash = require("connect-flash")

// View engine & static file config
app.engine("hbs", exphbs.engine({ extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(express.static("public"))

// Http & sessions
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(flash())
app.use(middleware.setFlash)

app.use(routes)

app.listen(PORT, () => {
  console.log(`App server hosts on ${PORT}`)
})
