var openWeatherAPIKey = "7fa6d32ee5c95d1a1f2785285f1d8c5c";
var city = document.getElementById("userInput");
var submitButton = document.getElementById("submit-btn");
submitButton.addEventListener('click', submitButtonEvent);
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={7fa6d32ee5c95d1a1f2785285f1d8c5c}

function submitButtonEvent(event) {
    var userCity = city.value;
    event.preventDefault();

}