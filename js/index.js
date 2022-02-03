// HEADER
const navBtn = document.querySelectorAll(".nav-list");

function removeActiveNavClass() {
    navBtn.forEach(btn => btn.classList.remove('active'));
}

navBtn.forEach(button => {
    button.addEventListener('click', () => {
        removeActiveNavClass()
        button.classList.add('active');
    })
})

// Carousel

const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let activeSlide = 0

rightBtn.addEventListener('click', () => {
    activeSlide++
    if (activeSlide > slides.length - 1) {
        activeSlide = 0;
    }
    setActiveSlide();
})

leftBtn.addEventListener('click', () => {
    activeSlide--
    if (activeSlide < 0 ) {
        activeSlide = slides.length - 1;
    }
    setActiveSlide();
})

function setActiveSlide() {
    slides.forEach(slide => {
        slide.classList.remove('active')

    })
    slides[activeSlide].classList.add('active')
}
// Dodanie WIADOMOSCI ZAPISAŁES SIE DO NEWSLETTERA

const newsletterbtn = document.querySelector('.newsletterbtn');
newsletterbtn.addEventListener('click', (e)=>{
    e.defaultPrevented
    alert(`Zapisałeś się do newslettera. Dziękujemy!`)
})