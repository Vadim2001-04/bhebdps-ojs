const sliderWrapper = document.querySelector('.slider__wrapper');
const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
const prevArrow = document.querySelector('.slider__arrow_prev');
const nextArrow = document.querySelector('.slider__arrow_next');
const sliderDots = Array.from(document.querySelectorAll('.slider__dot'));


let currentIndex = 0;

function updateSlider() {
    sliderItems.forEach((item, index) => {
       item.classList.toggle('slider__item_active', index === currentIndex);
    });
    sliderWrapper.style.transform = `translateX(-${currentIndex * 600}px)`;

   updateDots();
}
function updateDots() {
  sliderDots.forEach((dot, index) => {
    dot.classList.toggle('slider__dot_active', index === currentIndex);
    });
}


function nextSlide() {
  currentIndex = (currentIndex + 1) % sliderItems.length;
  updateSlider();
}
function prevSlide() {
    currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
    updateSlider();
}
prevArrow.addEventListener('click', prevSlide);
nextArrow.addEventListener('click', nextSlide);

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
       currentIndex = index;
        updateSlider();
    });
});
updateSlider();
