module.exports = {
  getRecords: (req, res) => {
    console.log(req.user)
    return res.render("index")
  }
}
