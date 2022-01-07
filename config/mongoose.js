const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.once("open", () => {
  console.log("MongoDB Connected")
})

db.on("error", () => {
  console.log("Connection failed. Something went wrong with MongoDB.")
})

module.exports = db
