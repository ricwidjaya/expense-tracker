if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const db = require("../../config/mongoose")
const Category = require("../category")

const categories = [
  {
    name: "家居物業",
    isExpense: true
  },
  {
    name: "交通出行",
    isExpense: true
  },
  {
    name: "休閒娛樂",
    isExpense: true
  },
  {
    name: "餐飲食品",
    isExpense: true
  },
  {
    name: "其他",
    isExpense: true
  }
]

db.once("open", async () => {
  await Category.create(categories)
  db.close()
})
