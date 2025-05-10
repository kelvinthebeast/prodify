document.addEventListener('DOMContentLoaded', function() {
  const readMoreBtn = document.querySelector('.description-section .read-more-btn');
  const readLessBtn = document.querySelector('.description-section .read-less-btn');
  const descriptionShort = document.querySelector('.description-section .description-short');
  const descriptionFull = document.querySelector('.description-section .description-full');

  if (readMoreBtn && descriptionFull && descriptionShort) {
    readMoreBtn.addEventListener('click', function() {
      descriptionShort.style.display = 'none';
      descriptionFull.style.display = 'block';
    });
  }

  if (readLessBtn && descriptionFull && descriptionShort) {
    readLessBtn.addEventListener('click', function() {
      descriptionFull.style.display = 'none';
      descriptionShort.style.display = 'block';
    });
  }
});

// document.addEventListener('DOMContentLoaded', function() {
//   const quantityInput = document.querySelector('.quantity-input');
//   const currentPriceElement = document.querySelector('.current-price');
//   const originalPriceElement = document.querySelector('.original-price');
//   const discountBadge = document.querySelector('.discount-badge');

//   if (quantityInput && currentPriceElement) {
//     quantityInput.addEventListener('change', function() {
//       const quantity = parseInt(this.value);
//       const basePrice = parseFloat(currentPriceElement.textContent.replace('$', ''));
//       let newCalculatedPrice = basePrice * quantity;

//       if (quantityInput && currentPriceElement) {
//     quantityInput.addEventListener('change', function() {
//       const quantity = parseInt(this.value);
//       const basePrice = parseFloat(currentPriceElement.textContent.replace('$', ''));
//       const newCalculatedPrice = basePrice * quantity;

//       console.log('Số lượng:', quantity);
//       console.log('Giá đơn vị:', basePrice);
//       console.log('Giá mới:', newCalculatedPrice);

//       currentPriceElement.textContent = `<span class="math-inline">\{newCalculatedPrice\.toFixed\(2\)\}</span>`;
//     });
//   }}
// });