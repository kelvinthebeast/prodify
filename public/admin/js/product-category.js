// Handle delete button
document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll("[button-delete]");
  if (deleteButtons) {
    deleteButtons.forEach( (button) => {
      button.addEventListener("click", (event) => {
        const isConfirm = confirm("Do you want to delete this category?");
        if (isConfirm) {
          const id = button.getAttribute("data-id")
          // console.log("id", id)
          const formDeleteCategory = document.querySelector("#form-delete-category");
          // console.log("Form delete: ",formDeleteProduct)
          const path = formDeleteCategory.getAttribute("data-path");
          // console.log("path", path)
          const action = path + `/${id}?_method=PATCH`;

          // console.log("action: ", action);
          formDeleteCategory.setAttribute("action", action);
          formDeleteCategory.submit();
          
        }
      })

    })
  }
});