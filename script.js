async function predict(){

let visibility = document.getElementById("vis").value
let temperature = document.getElementById("temp").value

let response = await fetch(`http://127.0.0.1:8000/predict?visibility=${visibility}&temperature=${temperature}`)

let data = await response.json()

document.getElementById("result").innerText =
"Accident Risk: " + data.risk

}