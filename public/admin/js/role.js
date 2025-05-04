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

// Update role
const tablePermissions = document.querySelector("[table-permissions]");

 if (tablePermissions) {
     const buttonSubmit = document.querySelector("[button-submit]");
     buttonSubmit.addEventListener("click", () => {
        let permissions = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");

        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            
              
            const inputs = row.querySelectorAll("input"); // Define inputs here

            
            if (name == "id") {
                inputs.forEach(input => {
                    const id = input.id;
                    
                    
                    permissions.push({
                      id: id,
                      permissions: []
                    });
                });
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;

                    
                    if (checked) {
                        permissions[index].permissions.push(name);
                    }
                }
              
            );
            }

            console.log(permissions)
        });
      
         if(permissions.length > 0) {
             const formChangePermissions = document.querySelector("#form-change-permissions");
             const inputPermissions = document.querySelector("input[name='permissions']");
 
             inputPermissions.value = JSON.stringify(permissions);
             formChangePermissions.submit();
         }
         
     });
 
 };
 
 // end permission
//  Permission default
const dataRecords = document.querySelector("[data-records]");

 if (dataRecords) {
     const records = JSON.parse(dataRecords.getAttribute("data-records"));
    //  console.log(records)
 
     const tablePermissions = document.querySelector("[table-permissions]");
     
     records.forEach((record, index) => {
         const permissions = record.permissions;
 
         permissions.forEach(permission => {
             const row = tablePermissions.querySelector(`[data-name="${permission}"]`);

            //  console.log(row, "ROW")
             const input = row.querySelectorAll("input")[index];
              
            if (input) {
              input.checked = true;
            }
         });
     });
 }
 

 // end permissions defaults
// End permission default
// Role