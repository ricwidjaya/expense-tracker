if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const db = require("../../config/mongoose")
const Category = require("../category")
const Record = require("../record")
const User = require("../user")

const users = require("./user.json")
const records = require("./record.json")

const bcrypt = require("bcryptjs")

db.once("open", async () => {
  // Encrypt seed users' passwords
  users.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
  })

  // Create seed users and get first user's id
  const userId = await User.create(users).then((users) => {
    return users[0]._id
  })

  //
  const categories = await Category.find().lean().then()
  records.forEach((record) => {
    record.categoryId = categories.find(
      (category) => record.category === category.name
    )._id
    record.userId = userId
  })

  await Record.create(records)

  db.close()
})
