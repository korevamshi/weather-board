const apiKey = "1846535c4cd3b6e499b7525144ee9c49";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherCard");
const errorBox = document.getElementById("error");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {

    errorBox.textContent = "";
    weatherCard.style.display = "none";

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        errorBox.textContent = error.message;

    }
}

function displayWeather(data) {

    cityName.textContent = `${data.name}, ${data.sys.country}`;

    temperature.textContent =
        `${data.main.temp} °C`;

    humidity.textContent =
        `${data.main.humidity}%`;

    wind.textContent =
        `${data.wind.speed} m/s`;

    condition.textContent =
        data.weather[0].description;

    weatherCard.style.display = "block";
}