import { courses } from "./courses.js";
const navbuttom  = document.querySelector('#ham-btn');
const navlink  = document.querySelector('#nav-bar');
navbuttom.addEventListener('click', () => {
    navbuttom.classList.toggle('show');
    navlink.classList.toggle('show');
});
const year = document.querySelector("#currentyear");
const today = new Date();
const modified = document.querySelector('#lastModified')
year.innerHTML = today.getFullYear();
modified.innerHTML = document.lastModified;

const container = document.querySelector('#course-container');
const totalCredits = document.querySelector('#total-credits');
function displayCourses(courseList){
    container.innerHTML = '';
    const credits = courseList.reduce((total, course) => {
        return total + course.credits;
    }, 0);
    totalCredits.textContent = credits;
    
    courseList.forEach((course) => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        const courseCode = document.createElement('h3');
        if (course.completed === true) {
            card.classList.add('completed');
            courseCode.innerHTML = '&check;' + ' ' + course.subject + ' ' + course.number;
        }   
        else {
            card.classList.add('not-completed');
            courseCode.innerHTML = course.subject + ' ' + course.number;
        }

        card.appendChild(courseCode);
        container.appendChild(card);

    });}
const allButton = document.querySelector('#all-courses');
const wddButton = document.querySelector('#wdd-courses');
const cseButton = document.querySelector('#cse-courses');

wddButton.addEventListener('click', () => {
    const wddCourses = courses.filter((course) => course.subject === 'WDD');
    displayCourses(wddCourses);
});
cseButton.addEventListener('click', () => {
    const cseCourses = courses.filter((course) => course.subject === 'CSE');
    displayCourses(cseCourses);
});
allButton.addEventListener('click', () => {
    displayCourses(courses);
});
displayCourses(courses);
