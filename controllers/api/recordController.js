const Record = require("../../models/record")
const moment = require("moment")

module.exports = {
  // Render user select category
  getRecords: (req, res) => {
    const userId = req.user._id
    const categoryId = req.query.categoryId

    // Aggregate two collection with populate(Foreign Key)
    Record.find({ userId, categoryId })
      .populate("categoryId")
      .lean()
      .then((records) => {
        records.forEach((record) => {
          record.date = moment(record.date).format("MMM Do YY")
          record.formatAmount = Intl.NumberFormat().format(record.amount)
        })
        return res.json(records)
      })
  }
}
