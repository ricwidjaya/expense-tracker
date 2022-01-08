const express = require("express")
const router = express.Router()

const recordController = require("../../controllers/recordController")

router.get("/", recordController.getRecords)
router.get("/record/new", recordController.newRecord)
router.post("/record")
router.get("/record/:id/edit")
router.put("/record/:id")
router.delete("/record/:id")

module.exports = router
