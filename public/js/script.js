// document.addEventListener('DOMContentLoaded', function() {
//   const searchForm = document.querySelector('form');
//   const findButton = document.querySelector('button[type="submit"]');

//   if (searchForm && findButton) {
//     findButton.addEventListener('click', function(event) {
//       event.preventDefault(); 
//       const keywordInput = searchForm.querySelector('input[name="keyword"]');
//       if (keywordInput) {
//         const keyword = keywordInput.value;
//         window.location.href = `/search?keyword=${encodeURIComponent(keyword)}`;
//       } else {
//         window.location.href = '/search'; // Redirect mà không có từ khóa nếu input không tìm thấy
//       }
//     });
//   }
// });