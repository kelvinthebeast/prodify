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