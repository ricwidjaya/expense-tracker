const express = require("express")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const PORT = process.env.PORT
const app = express()
const routes = require("./routes")
const exphbs = require("express-handlebars")

// View engine config
app.engine("hbs", exphbs.engine({ extname: ".hbs" }))
app.set("view engine", "hbs")

app.use(express.static("public"))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App server host on ${PORT}`)
})
