const apiKey = "YOUR_API_KEY";

async function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            const temperature = data.main.temp;
            const visibility = data.visibility / 1000;

            document.getElementById("temperature").innerText = temperature + " °C";
            document.getElementById("visibility").innerText = visibility + " km";

            predictRisk(temperature, visibility);
        });
    }
}

function predictRisk(temp, visibility) {
    let risk = "Low";

    if (visibility < 3) {
        risk = "High";
    } else if (visibility < 6) {
        risk = "Medium";
    }

    document.getElementById("riskResult").innerText = "Accident Risk: " + risk;
}

getWeather();
