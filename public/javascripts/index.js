const select = document.querySelector(".form-select")
const listGroup = document.querySelector(".list-group")
const amount = document.querySelector(".amount")

// Bootstrap popovers
const popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
)
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

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

          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${record.name}Modal">
  收據
</button>

<div class="modal fade" id="${record.name}Modal" tabindex="-1" aria-labelledby="${record.name}ModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="${record.name}ModalLabel">收據</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img src="${record.receipt}" alt="" width="300px" height="auto">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

          <div class="balance">
            $${record.formatAmount}
            元
          </div>
          <div class="d-flex align-items-center">
            <a href="/record/${record._id}/edit" class="edit-btn me-3"><i
                class="fas fa-edit"
              ></i></a>
            <form action="/record/${record._id}?_method=DELETE" method="POST">
              <button type="submit" class="btn delete-btn"><i
                  class="fas fa-trash-alt"
                ></i></button>
            </form>
          </div>
        </li>`
  })
  return (listGroup.innerHTML = rawHTML)
}
