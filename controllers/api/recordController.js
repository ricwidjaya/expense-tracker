const Category = require("../../models/category")
const Record = require("../../models/record")
const moment = require("moment")

module.exports = {
  // Render user select category
  getRecords: (req, res) => {
    const userId = req.user._id
    const categoryId = req.query.categoryId
    Category.findById(categoryId).then((category) => {
      Record.find({ userId, categoryId })
        .lean()
        .then((records) => {
          records.forEach((record) => {
            record.icon = category.icon
            record.date = moment(record.date).format("MMM Do YY")
            record.formatAmount = Intl.NumberFormat().format(record.amount)
          })
          return res.json(records)
        })
    })
  }
}
