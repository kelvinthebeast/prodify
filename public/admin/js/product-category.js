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

// preview product category
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
// button change status
// Product for change status
document.addEventListener("DOMContentLoaded", () => {
  const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

  if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");

    if (!formChangeStatus) {
      console.error("Không tìm thấy form có id #form-change-status");
      return;
    }

    const dataPath = formChangeStatus.getAttribute("data-path");
    // console.log("dataPath: ", dataPath);

    buttonChangeStatus.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        const currentStatus = button.getAttribute("data-status");
        const id = button.getAttribute("data-id");

        let newStatusAfterChange = currentStatus == "active" ? "inactive" : "active";
        const action = dataPath + `/${newStatusAfterChange}/${id}?_method=PATCH`;

        
        formChangeStatus.setAttribute("action", action);
        formChangeStatus.submit();
      });
    });
  } 
});


// End change-status