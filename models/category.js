const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Category = new Schema({
  name: {
    type: String,
    required: true
  },
  isExpense: {
    type: Boolean,
    default: false,
    required: true
  },
  icon: {
    type: String,
    default: "fas fa-pen"
  }
})

module.exports = mongoose.model("Category", Category)
