const menuButton=document.querySelector('.menu-toggle');
  const navigation=document.querySelector('.main-nav');
  menuButton.addEventListener('click',()=>{
    const open=menuButton.getAttribute('aria-expanded')==='true';
    menuButton.setAttribute('aria-expanded',String(!open));
    menuButton.setAttribute('aria-label',open?'Open navigation':'Close navigation');
    navigation.classList.toggle('open',!open);
  });
  navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Open navigation');
    navigation.classList.remove('open');
  }));
  const stage=document.querySelector('.slider-stage');
  const track=document.querySelector('.slider-track');
  const slides=[...document.querySelectorAll('.feature-slide')];
  const dots=[...document.querySelectorAll('.dot')];
  let activeSlide=0;
  function showSlide(index){
    activeSlide=(index+slides.length)%slides.length;
    const slideWidth=slides[0].getBoundingClientRect().width;
    const gap=parseFloat(getComputedStyle(track).gap)||0;
    const offset=(stage.clientWidth-slideWidth)/2-activeSlide*(slideWidth+gap);
    track.style.transform='translateX('+offset+'px)';
    slides.forEach((slide,i)=>{
      slide.classList.toggle('is-active',i===activeSlide);
      slide.setAttribute('aria-hidden',String(i!==activeSlide));
      slide.inert=i!==activeSlide;
    });
    dots.forEach((dot,i)=>{
      dot.classList.toggle('active',i===activeSlide);
      if(i===activeSlide)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');
    });
  }
  document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>showSlide(activeSlide+Number(button.dataset.step))));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>showSlide(i)));
  window.addEventListener('resize',()=>showSlide(activeSlide));
  showSlide(0);