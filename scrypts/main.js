const navbuttom  = document.querySelector('#ham-btn');
const navlink  = document.querySelector('#nav-bar');
navbuttom.addEventListener('click', () => {
    navbuttom.classList.toggle('show');
    navlink.classList.toggle('show');
});
const year = document.querySelector("#currentyear");
const today = new Date();
today.getFullYear()
const modified = document.querySelector('#lastModified')
year.innerHTML = today.getFullYear();
modified.innerHTML = document.lastModified;