const Category = require("../models/category")
const Record = require("../models/record")

module.exports = {
  // Render index page
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
        style: "index",
        script: "index"
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
    const { name, date, amount, receipt, categoryId } = req.body

    Record.create({
      name,
      date,
      amount,
      userId: req.user._id,
      categoryId
    }).then(() => {
      return res.redirect("/")
    })
  },

  // Edit record
  putRecord: (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    const { name, date, amount, receipt, categoryId } = req.body

    Record.findOneAndUpdate(
      { _id, userId },
      {
        name,
        date,
        amount,
        categoryId
      }
    ).then(() => {
      return res.redirect("/")
    })
  },

  // Delete record
  deleteRecord: (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Record.findOneAndDelete({ _id, userId })
      .then((record) => {
        return res.redirect("/")
      })
      .catch((error) => console.log(error))
  }
}
