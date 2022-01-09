const select = document.querySelector(".form-select")

select.addEventListener("change", (event) => {
  const target = event.target
  console.log(target.value)
})
