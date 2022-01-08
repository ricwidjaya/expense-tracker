module.exports = {
  // Render index page
  getRecords: (req, res) => {
    return res.render("index")
  },

  // New record page
  newRecord: (req, res) => {
    return res.render("new", {
      style: "record"
    })
  },

  // Add new record
  postRecord: (req, res) => {

  }
}
