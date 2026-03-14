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
async function loadDataset(){

const response = await fetch("project_history.csv")
const text = await response.text()

const rows = text.split("\n").slice(1)

let output = ""

rows.forEach(row => {

const cols = row.split(",")

const team_size = parseInt(cols[2])
const completion_days = parseInt(cols[4])
const success_score = parseFloat(cols[5])

let risk = "Low Risk"

if(success_score < 0.5){
risk = "High Risk"
}
else if(success_score < 0.8){
risk = "Medium Risk"
}

output += `<p>Team Size: ${team_size} | Completion Days: ${completion_days} → ${risk}</p>`

})

document.getElementById("datasetOutput").innerHTML = output

}
