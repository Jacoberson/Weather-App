const API_KEY = "98adb2a1ae6f44b6a4c183200232810";

const getWeatherData = async (query) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

const form = document.querySelector("form");
const searchInput = document.querySelector("input[type='search']");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeatherData(searchInput.value);
});
getWeatherData("london");
