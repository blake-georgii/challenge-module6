function fetchCity() {
    let key = 'ca321dd665a915445a40608ae28b8292';
    let limit = 1;
    let cityName = document.getElementById('city-name');

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${key}`;

    fetch(url)
        .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then((data) => {
            app.showWeather(data);
        })
        .catch(console.err);
};
