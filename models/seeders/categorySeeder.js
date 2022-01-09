if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const db = require("../../config/mongoose")
const Category = require("../category")

const categories = [
  {
    name: "家居物業",
    isExpense: true,
    icon: "fas fa-home"
  },
  {
    name: "交通出行",
    isExpense: true,
    icon: "fas fa-shuttle-van"
  },
  {
    name: "休閒娛樂",
    isExpense: true,
    icon: "fas fa-grin-beam"
  },
  {
    name: "餐飲食品",
    isExpense: true,
    icon: "fas fa-utensils"
  },
  {
    name: "其他",
    isExpense: true,
    icon: "fas fa-pen"
  }
]

db.once("open", async () => {
  await Category.create(categories)
  db.close()
})
