const Category = require("../models/category")
const Record = require("../models/record")

module.exports = {
  // Render index page
  getRecords: (req, res) => {
    const queries = [Category.find().lean(), Record.find().lean()]

    return Promise.all(queries).then(([categories, records]) => {
      console.log(categories, records)
      return res.render("index", {
        categories,
        records,
        style: "index"
      })
    })
  },

  // New record page
  newRecord: (req, res) => {
    return res.render("new", {
      style: "record"
    })
  },

  // Add new record
  postRecord: (req, res) => {}
}
