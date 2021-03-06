const imgur = require("imgur-node-api")
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
  recordPage: (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    const queries = [
      Record.findOne({ _id, userId }).lean(),
      Category.find().lean()
    ]

    return Promise.all(queries).then(([record, categories]) => {
      // New record
      if (!_id) {
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
    const { file } = req

    if (file) {
      imgur.setClientID(process.env.IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Record.create({
          name,
          date,
          amount,
          receipt: img.data.link,
          userId: req.user._id,
          categoryId
        }).then(() => {
          return res.redirect("/")
        })
      })
    } else {
      Record.create({
        name,
        date,
        amount,
        userId: req.user._id,
        categoryId
      }).then(() => {
        return res.redirect("/")
      })
    }
  },

  // Edit record
  putRecord: (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    const { name, date, amount, categoryId } = req.body
    const { file } = req

    if (file) {
      imgur.setClientID(process.env.IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Record.findOneAndUpdate(
          { _id, userId },
          {
            name,
            date,
            amount,
            receipt: img.data.link,
            categoryId
          }
        ).then(() => {
          return res.redirect("/")
        })
      })
    } else {
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
    }
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
  },

  // New category
  categoryPage: (req, res) => {
    return res.render("newCategory", {
      style: "record"
    })
  },

  // Create new category
  postCategory: (req, res) => {
    const category = req.body
    return Category.create(category).then(() => {
      return res.redirect("/")
    })
  }
}
