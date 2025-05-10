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