const Category = require("../models/category")
const Record = require("../models/record")

module.exports = {
  // Render index page
  getRecords: (req, res) => {
    // Prepare all queries in an array
    const queries = [Category.find().lean(), Record.find().lean()]

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
  },

  // New record page
  record: (req, res) => {
    const id = req.params.id
    const queries = [Record.findById(id).lean(), Category.find().lean()]

    return Promise.all(queries).then(([record, categories]) => {
      return res.render("new", {
        record,
        categories,
        style: "record"
      })
    })
  },

  // Add new record
  postRecord: (req, res) => {}
}
