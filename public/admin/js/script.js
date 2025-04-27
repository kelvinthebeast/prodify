const buttonStatus = document.querySelectorAll('[data-status]');

if (buttonStatus.length > 0) {
  const oldUrl = new URL(window.location.href);
  
  buttonStatus.forEach(button => {
    button.addEventListener('click', () => {
      const status = button.getAttribute('data-status');
      

      if (status) {
        oldUrl.searchParams.set('status', status);
      } else {
        oldUrl.searchParams.delete('status');
      }

      // set currentUrl
      window.location.href = oldUrl.href;
    })

  })
}

// #form-search
const formSearch = document.querySelector('#form-search');

if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener('submit', (e) => {
    
    e.preventDefault();
    const typingKeyword = e.target.elements.keyword.value;
    if (typingKeyword) {
      url.searchParams.set("keyword", typingKeyword);
    } else {
      url.searchParams.delete("keyword");

    }

    window.location.href = url.href;
  })
}
// #form-search

// Pagination when click on page number it return new url with page number
const buttonPagination = document.querySelectorAll("[button-pagination]");
buttonPagination.forEach(button => {
  button.addEventListener("click", ()=> {
    const currentUrl = new URL(window.location.href);
    const page = button.getAttribute("button-pagination");
    currentUrl.searchParams.set("page", page);
    window.location.href = currentUrl.href;
  })
})

// End pagination

// Check box multi

document.addEventListener("DOMContentLoaded", ()=> {
  const checkBoxMulti = document.querySelector("[checkbox-multi]");
  if (checkBoxMulti) {
    const checkAllInput = checkBoxMulti.querySelector("input[name='checkall']");
   
    const idInputs = checkBoxMulti.querySelectorAll("input[name='id']");
    // console.log(idInputs);
   
    // handle check all

    checkAllInput.addEventListener("click", (e) => {

      if (checkAllInput.checked) {
        // console.log("check all");
        idInputs.forEach(input => {
          input.checked = true;
        })
      } else {
        // console.log("uncheck all");
        idInputs.forEach(input => {
          input.checked = false;
        })
      }
      

    })
    // End handle check all
    // Handle check each input not check all

    const formChangeMulti = document.querySelector("[form-change-multi]");
    formChangeMulti.addEventListener("submit", (event) => {
      // console.log(event)
      event.preventDefault();
      const checkBoxMulti = document.querySelector("[checkbox-multi]");
      const checkedInputs = checkBoxMulti.querySelectorAll("input[name='id']:checked");
      

      const typeChange = event.target.elements.type.value;
        

        // Handle confirmation for delete-all action
      

      if (checkedInputs.length > 0) {
        const needChangeIds = [];
      
        const inputIds = formChangeMulti.querySelector("input[name='ids']");
        
        checkedInputs.forEach(input => {
          const idOfChangeCheckbox = input.getAttribute("value");
          
          if (typeChange == "change-position") {
            const position = input.closest("tr")
            .querySelector("input[name='position']").value;
            // console.log("position: ", position);
            needChangeIds.push(`${idOfChangeCheckbox}-${position}`);

          } else {
            needChangeIds.push(idOfChangeCheckbox);

          }
        });
      
        inputIds.value = needChangeIds.join(",");
        formChangeMulti.submit();
      } else {
        alert("Need to select 1 product!");
      }
      

      
      
    })
    // end handle check each input not check all

  }
  
})
// End check box multi
// Show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = showAlert.querySelector("[data-time]");


  setTimeout(() => {
    showAlert.classList.add("hide-alert");
  }, parseInt(time));
}
// End show showAlert
// upload img preview


const uploadImage = document.querySelector('[upload-image]')
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector('[upload-image-input]')
  const uploadImagePreview = uploadImage.querySelector('[upload-image-preview]')
  let currentObjectURL = null; 
  uploadImageInput.addEventListener("change", (event) => {
    const file = event.target.files[0]
    
    
    if (file) {
      // Giải phóng object URL cũ nếu có
      if (currentObjectURL) {
        URL.revokeObjectURL(currentObjectURL);
      }

      // Tạo object URL mới và cập nhật preview
      currentObjectURL = URL.createObjectURL(file);
      uploadImagePreview.src = currentObjectURL;
    }
  })
  
} 
// End upload img preview

// Close img preview

// const closeImgButton = uploadImage.querySelector("[close-img-button]")
// closeImgButton.addEventListener("click", (event) => {
//   if (currentObjectURL) {
//     URL.revokeObjectURL(currentObjectURL);
//     currentObjectURL = null; // Set lại null sau khi revoke
//   }

//   uploadImagePreview.src = "";
//   uploadImagePreview.style.backgroundImage = 'url("https://via.placeholder.com/250x250?text=No+Image")';
// })
// close img preview