let slideIndex = 0;

export const showSlider = (index) => {
   let slides = document.querySelectorAll('.slider-item');
   if (index >= slides.length) slideIndex = 0;
   if (index < 0) slideIndex = slides.length - 1;
   for (let slide of slides) {
      slide.style.display = 'none';
   }
   slides[slideIndex].style.display = 'block';
}

export const moveSlide = (step) => {
   slideIndex += step;
   showSlide(slideIndex);
}

showSlide(slideIndex);  // Inicializar el slider
