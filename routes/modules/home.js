const express = require("express")
const router = express.Router()

const recordController = require("../../controllers/recordController")

router.get("/", recordController.getRecords)
router.get("/record/new", recordController.record)
router.post("/record", recordController.postRecord)
router.get("/record/:id/edit", recordController.record)
router.put("/record/:id")
router.delete("/record/:id")

module.exports = router
