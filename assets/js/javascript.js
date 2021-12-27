function init() {
    cityData = fetchCity();
    weatherData = fetchWeather(cityData);

    console.log(cityData);
    console.log(weatherData);
};

async function fetchCity() {
    let key = 'ca321dd665a915445a40608ae28b8292';
    let limit = 1;
    let cityName = document.getElementById('city-name');

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${key}`;

    cityData = await fetch(url)
        .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then((data) => {
            app.showWeather(data);
        })
        .catch(console.err);

    return cityData
};

async function fetchWeather(cityData) {
    let lat = cityData.lat;
    let lon = cityData.lon;
    let key = '06cc7efd0e5386068ec3c390bcfd0183';
    let lang = 'en';
    let units = 'imperial';

    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    //fetch the weather
    weatherData = await fetch(url)
        .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then((data) => {
            app.showWeather(data);
        })
        .catch(console.err);

    return weatherData;
};