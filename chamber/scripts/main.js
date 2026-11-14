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
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});
listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});
async function getMembersData() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    }
    catch(error) {
        console.error(error);
    };
}
const membersContainer = document.querySelector('#member-cards');
const displayMembers = (members) => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('business-card');
        const cardGrid = document.createElement('div');
        cardGrid.classList.add('card-details')
        const businessName = document.createElement('h2');
        const tagLine = document.createElement('p');
        tagLine.classList.add('tag');
        const image = document.createElement('img');
        const email = document.createElement('p');
        const phone = document.createElement('p');
        const url = document.createElement('p');
        businessName.textContent = member.name;
        tagLine.textContent = member.description;
        image.setAttribute('src', member.image);
        image.setAttribute('alt', member.name);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');
        email.textContent = member.email;
        phone.textContent = 'Phone Number: ' + member.phone;
        url.textContent = 'URL: ' + member.website;
        card.appendChild(businessName);
        card.appendChild(tagLine);
        card.appendChild(cardGrid);
        cardGrid.appendChild(image);
        cardGrid.appendChild(email);
        cardGrid.appendChild(phone);
        cardGrid.appendChild(url);
        membersContainer.appendChild(card);
    });
}
getMembersData();