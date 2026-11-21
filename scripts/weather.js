
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');


const myKey = "7a9f5cc999aa86a18362cbf4bf82e353";
const myLat = "49.75036363682773";
const myLong = "6.636753894855957";
const myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

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
function displayResults(data) {
    console.log('hello')
    currentTemp.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = `https://openweathermap.org/img/wn/.`

}

apiFetch();