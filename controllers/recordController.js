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

  // Get record page
  record: (req, res) => {
    const id = req.params.id
    const queries = [Record.findById(id).lean(), Category.find().lean()]

    return Promise.all(queries).then(([record, categories]) => {
      // New record
      if (!id) {
        return res.render("new", {
          categories,
          style: "record"
        })
      }
      // Edit record
      return res.render("edit", {
        record,
        categories,
        style: "record"
      })
    })
  },

  // Add new record
  postRecord: (req, res) => {
    const { name, date, amount, receipt, category } = req.body

    Category.findOne({ name: category })
      .lean()
      .then((category) => {
        console.log(category)
        Record.create({
          name,
          date,
          amount,
          userId: req.user._id,
          categoryId: category._id
        }).then(() => {
          return res.redirect("/")
        })
      })
  },

  // Edit record
  putRecord: (req, res) => {
    const { name, date, amount, receipt, category } = req.body
    console.log(name, date, amount, receipt, category)
  }
}
