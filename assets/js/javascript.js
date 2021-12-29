const form = document.getElementById('city-form');
const history = document.getElementById('history');

function fetchCity() {
    let key = 'ca321dd665a915445a40608ae28b8292';
    let limit = 1;
    let cityName = form.elements['city-name'].value;

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${key}`;

    fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then((cityData) => {
            console.log(cityData);
            fetchWeather(cityData[0], cityData[0].local_names.en);
        })
        .catch(console.err);
};

function fetchWeather(cityData, cityName) {
    let lat = cityData.lat;
    let lon = cityData.lon;
    let key = 'ca321dd665a915445a40608ae28b8292';
    let lang = 'en';
    let units = 'imperial';

    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    //fetch the weather
    fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then((weatherData) => {
            loadPage(weatherData, cityName);
        })
        .catch(console.err);
};

function createHistory(cityName) {
    const e = document.createElement('li');
    e.className = "history-item form-input"
    e.innerHTML = `<p>${cityName}</p>`;
    history.appendChild(e);
}

function loadPage(weatherData, cityName) {
    console.log(weatherData);
    let day = new Date;
    createHistory(cityName);
    loadDisplay(weatherData.current, day, cityName);
    loadCards(weatherData.daily, day);
};


function loadDisplay(currentWeather, day, cityName) {
    let display = document.getElementById('current-weather');

    display.innerHTML = `<div class="card-body">
    <h2 class="card-title">${cityName} (${day.getMonth()}/${day.getDate()}/${day.getFullYear()})
    <img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png"></h2>
    <p class="card-text">Temp: ${currentWeather.temp}°F</p>
    <p class="card-text">Wind: ${currentWeather.wind_speed}MPH</p>
    <p class="card-text">Humidity: ${currentWeather.humidity}%</p>
    <p class="card-text">UV Index: <b class="uvi ${calcUVI(currentWeather.uvi)}">${currentWeather.uvi}</b></p>
    </div>`
};

function calcUVI(uvi) {

    if (uvi < 3.3) {
        return "green";
    }
    else if (uvi < 6.7) {
        return "yellow";
    }
    else {
        return "red";
    }
}

function loadCards(dailyWeather, day) {
    for (let i = 1; i < 6; i++) {
        day.setDate(day.getDate() + 1);
        document.getElementById(i).innerHTML = `<div class="card-body">
        <h5 class="card-title">(${day.getMonth()}/${day.getDate()}/${day.getFullYear()})</h5>
        <img src="http://openweathermap.org/img/wn/${dailyWeather[i].weather[0].icon}@2x.png" style="height: 3em">
        <p class="card-text">Temp: ${dailyWeather[i].temp.day}°F</p>
        <p class="card-text">Wind: ${dailyWeather[i].wind_speed}MPH</p>
        <p class="card-text">Humidity: ${dailyWeather[i].humidity}%</p>
        </div>`
    }
};


form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchCity();
});