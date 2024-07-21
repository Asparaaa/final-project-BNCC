// WeatherApp

const weather_form = document.querySelector(".weather_form");
const city_input = document.querySelector(".city_input");
const card = document.querySelector(".card");
const api_key = "03e8ccae7ef5821b38bb95a8fda2e0c1";

weather_form.addEventListener("submit", async event => {
    event.preventDefault();

    const city = city_input.value.trim();

    if (city) {
        try {
            const weather_data = await get_weather_data(city);
            display_weather_info(weather_data);
        } catch (error) {
            console.error(error);
            display_error(error.message);
        }
    } else {
        display_error("Invalid city");
    }
});

async function get_weather_data(city) {
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${api_key}`;
    console.log("API URL: ", api_url); // Debugging: Log the API URL

    const response = await fetch(api_url);

    if (!response.ok) {
        const error_message = `Error: ${response.status} - ${response.statusText}`;
        throw new Error(error_message);
    }

    return await response.json();
}

function display_weather_info(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";

    const city_display = document.createElement("h1");
    const temp_display = document.createElement("p");
    const humidity_display = document.createElement("p");
    const desc_display = document.createElement("p");
    const weather_display = document.createElement("p");

    city_display.textContent = city;
    temp_display.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidity_display.textContent = `Humidity: ${humidity}%`;
    desc_display.textContent = description;
    weather_display.textContent = get_weather_emoji(id); // Corrected this line

    city_display.classList.add("city_display");
    temp_display.classList.add("temp_display");
    humidity_display.classList.add("humidity_display");
    desc_display.classList.add("desc_display");
    weather_display.classList.add("weather_emoji");

    card.appendChild(city_display);
    card.appendChild(temp_display);
    card.appendChild(humidity_display);
    card.appendChild(desc_display);
    card.appendChild(weather_display);
}

function get_weather_emoji(weather_id) {
    switch (true) {
        case (weather_id >= 200 && weather_id <= 299):
            return "🌩";
        case (weather_id >= 300 && weather_id <= 399):
            return "🌧";
        case (weather_id >= 500 && weather_id <= 599):
            return "⛈";
        case (weather_id >= 600 && weather_id <= 699):
            return "🌨";
        case (weather_id >= 700 && weather_id <= 799):
            return "🌪";
        case (weather_id == 800):
            return "☀";
        case (weather_id > 800):
            return "☁";
    }
}

function display_error(message) {
    const error_display = document.createElement("p");
    error_display.textContent = message;
    error_display.classList.add("error_display");

    card.textContent = "";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.appendChild(error_display);
}
