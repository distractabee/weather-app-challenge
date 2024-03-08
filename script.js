var openWeatherAPIKey = "7fa6d32ee5c95d1a1f2785285f1d8c5c";
var city = document.getElementById("userInput");
var submitButton = document.getElementById("submit-btn");
submitButton.addEventListener('click', submitButtonEvent);
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={7fa6d32ee5c95d1a1f2785285f1d8c5c}

function submitButtonEvent(event) {
    var userCity = city.value;
    event.preventDefault();

    if (!userCity) {
        alert("Please enter a city name!");
        return;
    } else {
        // format the user input to make first letter of each word upper case for grammar!!!
        userCity = userCity.toLowerCase();
        const upperCaseInput = userCity.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
       saveSearches(upperCaseInput);
       populateSearchHistory();
       document.getElementById("userInput").value = null;
    }
}