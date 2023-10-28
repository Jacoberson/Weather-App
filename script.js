const API_KEY = "98adb2a1ae6f44b6a4c183200232810";
const dataDiv = document.getElementById("data-container");

const clearData = () => {
  const error = document.querySelector("#error-container > p");
  error.textContent = "";

  const img = document.querySelector("img");
  img.src = "";

  const allSpan = document.querySelectorAll("p > span");
  for (const p of allSpan) {
    p.textContent = "";
  }
};

const displayData = (data) => {
  dataDiv.hidden = false;

  const city = document.querySelector("#city > span");
  city.textContent = `${data.location.name}`;

  const country = document.querySelector("#country > span");
  country.textContent = `${data.location.country}`;

  const latitude = document.querySelector("#latitude > span");
  latitude.textContent = `${data.location.lat}`;

  const longitude = document.querySelector("#longitude > span");
  longitude.textContent = `${data.location.lon}`;

  const celsius = document.querySelector("#celsius > span");
  celsius.textContent = `${data.current.temp_c}`;

  const fahrenheit = document.querySelector("#fahrenheit > span");
  fahrenheit.textContent = `${data.current.temp_f}`;

  const windMPH = document.querySelector("#wind-in-mph > span");
  windMPH.textContent = `${data.current.wind_mph} mph`;

  const windKPH = document.querySelector("#wind-in-kph > span");
  windKPH.textContent = `${data.current.wind_kph} kph`;

  const windDirection = document.querySelector("#wind-direction > span");
  windDirection.textContent = `${data.current.wind_dir}`;

  const conditionText = document.querySelector("#condition-text > span");
  conditionText.textContent = `${data.current.condition.text}`;

  const conditionIcon = document.getElementById("condition-icon");
  conditionIcon.src = data.current.condition.icon;
};

const displayError = (error) => {
  dataDiv.hidden = true;
  const dataP = document.querySelector("#error-container > p");

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
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`,
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
