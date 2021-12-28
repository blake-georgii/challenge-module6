const form = document.getElementById('city-form');

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
            fetchWeather(cityData[0]);
        })
        .catch(console.err);
};

function fetchWeather(cityData) {
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
            loadPage(weatherData);
        })
        .catch(console.err);
};

function loadPage(weatherData){
    console.log(weatherData);
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchCity();
});