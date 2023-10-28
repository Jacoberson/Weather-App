const API_KEY = "98adb2a1ae6f44b6a4c183200232810";

const displayData = (data) => {
  const dataP = document.querySelector(".data > p");
  dataP.textContent = data.location.name;
};

const displayError = (error) => {
  const dataP = document.querySelector(".data > p");

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
  event.preventDefault();
  getWeatherData(searchInput.value);
});

getWeatherData();
