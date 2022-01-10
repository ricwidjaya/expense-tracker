const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: "temp/" })

const recordController = require("../../controllers/recordController")

router.get("/", recordController.getRecords)
router.get("/record/new", recordController.recordPage)
router.post("/record", upload.single("image"), recordController.postRecord)
router.get("/record/:id/edit", recordController.recordPage)
router.put("/record/:id", upload.single("image"), recordController.putRecord)
router.delete("/record/:id", recordController.deleteRecord)

router.get("/category/new", recordController.categoryPage)
router.post("/category", recordController.postCategory)

module.exports = router
