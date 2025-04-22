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

// Delete product
const buttonDeleteProduct = document.querySelectorAll("[button-delete]");

if (buttonDeleteProduct.length > 0 )  {
  buttonDeleteProduct.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const isConfirm = confirm("Do you want to delete this product?");

      if (isConfirm) {
        const id = button.getAttribute("data-id")
        const formDeleteProduct = document.querySelector("#form-delete-product");
        const path = formDeleteProduct.getAttribute("data-path");
        const action = path + `/${id}?_method=PATCH`;
        // console.log("action: ", action);
        formDeleteProduct.setAttribute("action", action);
        formDeleteProduct.submit();
        
      }
      
    })
  })
}

// End delete product



