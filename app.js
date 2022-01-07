const express = require("express")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const PORT = process.env.PORT
const app = express()
const exphbs = require("express-handlebars")

// View engine config
app.engine("hbs", exphbs.engine({ extname: ".hbs" }))
app.set("view engine", "hbs")

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(PORT, () => {
  console.log(`App server host on ${PORT}`)
})
