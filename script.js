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

    searchCoordinates(userCity);
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

function searchCoordinates(userCity) {
    var coordinatesUrl = weatherRootUrl + "/geo/1.0/direct?q=" + userCity + "&limit=1&appid=" + openWeatherAPIKey

    fetch(coordinatesUrl)
    .then(response => response.json())
    .then(data => {
        let lat = data[0].lat.toFixed(2);
        let lon = data[0].lon.toFixed(2);
        searchWeatherApi(lat, lon);
    })
    .catch(function (error) {
        alert('There has been an error. Please try again.');
        console.log(error);
    });
};

function searchWeatherApi(lat, lon) {
    var weatherUrl = weatherRootUrl + "/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherAPIKey + "&units=imperial"

    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
        console.log(data);
    })
    .catch(function(error) {
        alert('There has been an error. Please try again.');
        console.log(error)
    });
};

function displayWeather(data) {
    let cityName = data.city.name;
    document.getElementById("city-name").innerHTML = cityName;

    document.getElementById("current-weather").innerHTML = "";
    document.getElementById("five-day-forecast").innerHTML = "";

    for (var i = -1; i <= data.list.length; i +- 8) {
        console.log(i);
        let index;
        if (i === -1) {
            index = i + 1
        } else {
            index = i
        }
        
        var iconUrl = weatherRootUrl + `/img/w/${forecast.weather[0].icon}.png`;
        var iconDescription = forecast.weather[0].description;
        var tempF = forecast.main.temp;
        var humidity = forecast.main.humidity;
        var windSpeed = forecast.wind.speed;
        
        if (i === -1) {
            currentText = 
            `
            <div>
            <img src=${iconUrl} alt=${iconDescription}
            <p>${Date.toDateString()}</p>
            <p>Temp: ${tempF}</p>
            <p>Humidity: ${humidity}</p>
            <p>Wind Speed: ${windSpeed}</p>
            </div>`
        }
    }

}