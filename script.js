const API_KEY = "98adb2a1ae6f44b6a4c183200232810";

const clearData = () => {
  const img = document.querySelector("img");
  img.src = "";

  const allP = document.querySelectorAll("p");
  for (const p of allP) {
    p.textContent = "";
  }
};

const displayData = (data) => {
  const city = document.getElementById("city");
  city.textContent = `City: ${data.location.name}`;

  const country = document.getElementById("country");
  country.textContent = `Country: ${data.location.country}`;

  const latitude = document.getElementById("latitude");
  latitude.textContent = `Latitude: ${data.location.lat}`;

  const longitude = document.getElementById("longitude");
  longitude.textContent = `Longitude: ${data.location.lon}`;

  const celsius = document.getElementById("celsius");
  celsius.textContent = `Temperature in Celsius: ${data.current.temp_c}`;

  const fahrenheit = document.getElementById("fahrenheit");
  fahrenheit.textContent = `Temperature in Fahrenheit: ${data.current.temp_f}`;

  const windMPH = document.getElementById("wind-in-mph");
  windMPH.textContent = `Wind in mph: ${data.current.wind_mph} mph`;

  const windKPH = document.getElementById("wind-in-kph");
  windKPH.textContent = `Wind in mph: ${data.current.wind_kph} kph`;

  const windDirection = document.getElementById("wind-direction");
  windDirection.textContent = `Wind direction: ${data.current.wind_dir}`;

  const conditionText = document.getElementById("condition-text");
  conditionText.textContent = `Current condition: ${data.current.condition.text}`;

  const conditionIcon = document.getElementById("condition-icon");
  conditionIcon.src = data.current.condition.icon;
};

const displayError = (error) => {
  const dataP = document.querySelector("#error > p");

  if (error.message.includes("Parameter q")) {
    error.message = "Please enter a city before searching.";
  }

  dataP.textContent = error.message;
};

const getWeatherData = async (query) => {
  let data;
  let response;

  try {
    response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`,
      { mode: "cors" }
    );
    data = await response.json();
  } catch (error) {
    displayError(error);
  }

  if (response.status > 299) {
    return displayError(data.error);
  }

  return displayData(data);
};

const form = document.querySelector("form");
const searchInput = document.querySelector("input[type='search']");

form.addEventListener("submit", (event) => {
  clearData();

  event.preventDefault();
  getWeatherData(searchInput.value);
});

getWeatherData();
