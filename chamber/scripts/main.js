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
if (gridButton && listButton) {
    gridButton.addEventListener("click", () => {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
    });
    listButton.addEventListener("click", () => {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
    });
}
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
async function getSpotlightData() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const eligibleMembers = data.members.filter(member =>
        member.membership === 'silver' || member.membership === 'gold'
        );
        eligibleMembers.sort(() => Math.random() - 0.5);
        const selectedMembers = eligibleMembers.slice(0, 3); 
        displaySpotlightMembers(selectedMembers);
    }
    catch(error) {
        console.error(error);
    };
}
const membersContainer = document.querySelector('#member-cards');
const spotlightContainer = document.querySelector('#spotlight-container');
const displaySpotlightMembers = (members) => {
    spotlightContainer.classList.add("grid");

    members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('business-card');
    const cardGrid = document.createElement('div');
    cardGrid.classList.add('card-details')
    const businessName = document.createElement('h2');
    const image = document.createElement('img');
    const phone = document.createElement('p');
    const address = document.createElement('p');
    const url = document.createElement('p');
    const membershipLevel = document.createElement('p');
    businessName.textContent = member.name;
    image.setAttribute('src', member.image);
    image.setAttribute('alt', member.name);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('width', '340');
    image.setAttribute('height', '440');
    phone.textContent = 'Phone Number: ' + member.phone;
    url.textContent = 'URL: ' + member.website;
    address.textContent = 'Address: ' + member.address;
    membershipLevel.textContent = 'Membership: ' + member.membership;
    card.appendChild(businessName);
    card.appendChild(cardGrid);
    cardGrid.appendChild(image);
    cardGrid.appendChild(phone);
    cardGrid.appendChild(address);
    cardGrid.appendChild(url);
    cardGrid.appendChild(membershipLevel);
    spotlightContainer.appendChild(card);
    });
}
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
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const myKey = "7a9f5cc999aa86a18362cbf4bf82e353";
const myLat = "40.71957496151459";
const myLong = "-74.01663850137162";
const myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
async function apiFetch() {
  try {
    const response = await fetch(myUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data); 
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}
async function apiForecast() {
    try {
        const response = await fetch(forecastUrl);

        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
}
function displayForecast(data) {
    const forecastContainer = document.querySelector('#forecast');
    forecastContainer.innerHTML = '';

    const dailyForecast = data.list.filter(item =>
        item.dt_txt.includes('12:00:00')
    ).slice(0, 3);

    dailyForecast.forEach(item => {
        const card = document.createElement('div');
        const date = document.createElement('p');
        const icon = document.createElement('img');
        const temp = document.createElement('p');
        const description = document.createElement('p');
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`);
        icon.setAttribute('alt', item.weather[0].description);
        date.textContent = new Date(item.dt_txt).toLocaleDateString('en-US', {
            weekday: 'long'
        });

        temp.textContent = `${item.main.temp}°F`;
        description.textContent = item.weather[0].description;

        card.appendChild(date);
        card.appendChild(icon);
        card.appendChild(temp);
        card.appendChild(description);

        forecastContainer.appendChild(card);
    });
}
if (currentTemp && weatherIcon) {
    apiFetch();
}
if (document.querySelector('#forecast')) {
    apiForecast();
}
if (membersContainer) {
    getMembersData();
}
if (spotlightContainer) {
    getSpotlightData();
}