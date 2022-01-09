const Category = require("../models/category")
const Record = require("../models/record")

module.exports = {
  // Render user select category 
  getRecords: (req, res) => {
    const userId = req.user._id
    // Prepare all queries in an array
    const queries = [Category.find().lean(), Record.find({ userId }).lean()]

    // Execute all promise at once
    return Promise.all(queries).then(([categories, records]) => {
      const totalAmount = records.reduce((total, next) => {
        return total + next.amount
      }, 0)
      return res.render("index", {
        categories,
        totalAmount,
        records,
        style: "index"
      })
    })
  }
}
