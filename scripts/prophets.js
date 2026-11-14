const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
async function getProphetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets); // note that you reference the prophets array of the JSON data object, not just the object
  } catch (error) {
    console.error(error);
  }
}
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const birthDate =document.createElement('p');
    const placeOfBirth = document.createElement('p')
    const portrait = document.createElement('img');
    fullName.textContent = prophet.name + ' ' + prophet.lastname;
    birthDate.textContent = 'Date of Birth: ' + prophet.birthdate;
    placeOfBirth.textContent = 'Place of Birth: ' + prophet.birthplace;
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', fullName.textContent);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(placeOfBirth);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
}
getProphetData();