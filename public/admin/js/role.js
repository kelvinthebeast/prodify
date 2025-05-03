// Delete product
const buttonDeleteRole = document.querySelectorAll("[button-delete-role]");

if (buttonDeleteRole.length > 0 )  {
  buttonDeleteRole.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const isConfirm = confirm("Do you want to delete this role?");

      if (isConfirm) {
        const id = button.getAttribute("data-id")
        // console.log("ID: ", id)
        const formDeleteRoles = document.querySelector("#form-delete-roles");
        // console.log(formDeleteRoles)
        const path = formDeleteRoles.getAttribute("data-path");
        const action = path + `/${id}?_method=PATCH`;
        // console.log("action: ", action);
        formDeleteRoles.setAttribute("action", action);
        formDeleteRoles.submit();
        
      }
      
    })
  })
}

// End delete product