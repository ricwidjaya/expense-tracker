const express = require("express")
const router = express.Router()

const recordController = require("../../controllers/api/recordController")

router.get("/record/category/", recordController.getRecords)

module.exports = router
