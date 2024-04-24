document.addEventListener("DOMContentLoaded", function() {
    const gifContainer = document.querySelector('.gif-container');
    gifContainer.addEventListener('mouseenter', function() {
      const gif = gifContainer.querySelector('img');
      gif.src = gif.src; // Reinicia el GIF
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel-slide");

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.style.display = "none";
    });
    slides[index].style.display = "block";
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);

  document.querySelector("#prevBtn").addEventListener("click", prevSlide);
  document.querySelector("#nextBtn").addEventListener("click", nextSlide);
});