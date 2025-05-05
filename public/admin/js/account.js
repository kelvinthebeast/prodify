// Handle delete button
document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll("[button-delete]");
  if (deleteButtons) {
    deleteButtons.forEach( (button) => {
      button.addEventListener("click", (event) => {
        const isConfirm = confirm("Do you want to delete this account?");
        if (isConfirm) {
          const id = button.getAttribute("data-id")
          // console.log("id", id)
          const formDeleteAccount = document.querySelector("#form-delete-account");
          // console.log("Form delete: ",formDeleteProduct)
          const path = formDeleteAccount.getAttribute("data-path");
          // console.log("path", path)
          const action = path + `/${id}?_method=PATCH`;

          // console.log("action: ", action);
          formDeleteAccount.setAttribute("action", action);
          formDeleteAccount.submit();
          
        }
      })

    })
  }
});

// preview account
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("[upload-image-input]");
  const preview = document.querySelector("[upload-image-preview]");

  if (input && preview) {
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        preview.src = imageUrl;
        preview.style.display = "block";
      }
    });
  }
});