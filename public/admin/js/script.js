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