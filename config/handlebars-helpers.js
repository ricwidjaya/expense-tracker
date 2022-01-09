const moment = require("moment")

module.exports = {
  formatDate: (a) => {
    return moment(a).format("MMM Do YY")
  },

  // Turn date object into "YYYY-MM-DD" format
  getISODate: (a) => {
    return a.toISOString().slice(0, 10)
  },

  // Add comma every 3 digits
  formatCurrency: (a) => {
    return Intl.NumberFormat().format(a)
  },

  // Get icon string as class
  getIcon: (categories, record) => {
    const a = categories.find((category) => {
      return category._id.toString() === record.categoryId.toString()
    })
    return a.icon
  },

  // Compare the equity between two _id to check if the category are the same
  compareObjectID: (category, record, option) => {
    if (category._id.toString() === record.categoryId.toString()) {
      return option.fn(this)
    } else {
      return option.inverse(this)
    }
  }
}
