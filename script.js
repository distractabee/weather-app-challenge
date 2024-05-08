var searchHistory = [];
var weatherRootUrl = "https://api.weathermap.org";
var openWeatherAPIKey = "7fa6d32ee5c95d1a1f2785285f1d8c5c";

var city = document.getElementById("userInput");
var submitButton = document.getElementById("submit-btn");
submitButton.addEventListener('click', submitButtonEvent);

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

function saveSearches(upperCaseInput) {
    let storedData = JSON.parse(localStorage.getItem("city"));
    if (!storedData) {
        storedData = []
        storedData.push(upperCaseInput)
    } else {
        let filteredData = storedData.filter(data => data.toLowerCase() === upperCaseInput.toLowerCase())
        if (filteredData.length === 0) {
            storedData.push(upperCaseInput)
        }
    };
    localStorage.setItem("city", JSON.stringify(storedData))
};

function populateSearchHistory() {
    document.getElementById('previous-searches').innerHTML = "";
    let storedData = JSON.parse(localStorage.getItem('city'));
    let searchHistoryDiv = document.createElement('div');

    if (storedData) {
        for (var i = storedData.length - 1; i >= 0; i--) {
            var btn = document.createElement('button');
            btn.innerHTML = storedData[i]
            btn.className = "search-history-btn"
            btn.addEventListener("click", function (event) {
                event.preventDefault();
                let cityName = event.target.innerHTML;
                searchCoordinates(cityName);
            })
            searchHistoryDiv.append(btn)
        }
    }
    document.getElementById('previous-searches').append(searchHistoryDiv)
};
