const select = document.querySelector(".form-select")
const listGroup = document.querySelector(".list-group")
const amount = document.querySelector(".amount")

select.addEventListener("change", (event) => {
  const categoryId = event.target.value
  const PATH = `/api/record/category/?categoryId=${categoryId}`

  if (categoryId === "") {
    return window.location.assign("/")
  }
  axios
    .get(PATH)
    .then((results) => {
      let totalAmount = results.data.reduce((total, next) => {
        return total + next.amount
      }, 0)
      totalAmount = Intl.NumberFormat().format(totalAmount)
      amount.innerHTML = `$${totalAmount} 元`
      renderLists(results.data)
    })
    .catch((err) => console.log(err))
})

// Render all category lists
function renderLists(data) {
  let rawHTML = ""
  data.forEach((record) => {
    rawHTML += `<li
          class="list-group-item d-flex justify-content-between align-items-center mb-3"
        >

          <div class="d-flex align-items-center list-head">
            <i
              class="${record.categoryId.icon} icon"
              style="user-select: auto;"
            ></i>
            <div class="ms-2 me-auto">
              <div class="fw-bold">${record.name}</div>
              ${record.date}
            </div>
          </div>
          <div class="balance">
            $${record.formatAmount}
            元
          </div>
          <div class="icon d-flex">
            <a href="/record/${record._id}/edit" class="me-3"><i
                class="fas fa-edit"
              ></i></a>
            <form action="/record/${record._id}?_method=DELETE" method="POST">
              <button type="submit" class="btn align-self-center"><i
                  class="fas fa-trash-alt"
                ></i></button>
            </form>
          </div>
        </li>`
  })
  return (listGroup.innerHTML = rawHTML)
}
