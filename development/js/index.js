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