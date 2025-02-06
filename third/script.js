document.addEventListener("DOMContentLoaded", () => {
  const cityinput = document.getElementById("city-input");
  const getweatherbtn = document.getElementById("get-weather-btn");
  const weatherinfo = document.getElementById("weather-info");
  const cityname = document.getElementById("city-name");
  const temp = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errormessage = document.getElementById("error-message");

  const API_KEY = "30061b8be9c6cbbeb72bb6c5e418cb57"; //env variables

  getweatherbtn.addEventListener("click", async () => {
    const city = cityinput.value.trim();
    if (!city) return;

    //1.server may throw you some error
    //2.server/database is always in another continent

    try {
      const weatherData = await fetchweatherData(city);

      displayData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchweatherData(city) {
    //gets data

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    console.log(typeof response);
    console.log("RESPONSE ", response);

    if (!response.ok) {
      throw new Error("City Not Found");
    }

    const data = await response.json();
    return data;
  }

  function displayData(data) {
    //displays

    console.log(data);

    const { name, main, weather } = data;
    cityname.textContent = name;
    temp.textContent = `temperature : ${main.temp}`;
    description.textContent = `weather: ${weather[0].description}`;

    //unlock the display from hidden
    weatherinfo.classList.remove("hidden");
    errormessage.classList.add("hidden");
  }

  function showError() {
    weatherinfo.classList.remove("hidden");
    errormessage.classList.add("hidden");
  }
});
