const moment = require("moment")

module.exports = {
  formatDate: (a) => {
    return moment(a).format("MMM Do YY")
  },
  formatCurrency: (a) => {
    return Intl.NumberFormat().format(a)
  },
  getIcon: (categories, record) => {
    const a = categories.find((category) => {
      return category._id.toString() === record.categoryId.toString()
    })

    return a.icon
  }
}
