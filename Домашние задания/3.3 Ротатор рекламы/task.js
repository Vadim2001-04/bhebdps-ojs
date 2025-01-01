const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  let activeIndex = 0;
  
  function rotate() {
    cases[activeIndex].classList.remove('rotator__case_active');
    activeIndex = (activeIndex + 1) % cases.length;
    cases[activeIndex].classList.add('rotator__case_active');
    
    const speed = parseInt(cases[activeIndex].dataset.speed) || 1000;
    
    setTimeout(rotate, speed);
  }
  
  rotate();
});
