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
    console.log("dataPath: ", dataPath);

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



