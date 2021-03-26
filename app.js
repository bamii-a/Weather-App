// Selectors
let city = document.querySelector('.timezone');
let icon = document.querySelector('.icon');
let degree = document.querySelector('.degree');
let degreeContent = document.querySelector('.degree-content');
let degreeSpan = document.querySelector('.degree-content span');
let description = document.querySelector('.description');
let weatherLocation = document.querySelector('.weather-location');

// Event Listeners
window.addEventListener("load", () => {
    let longitude;
    let latitude;

    // navigator.geolocation gets exact position of the browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((myPosition) => {
            longitude = myPosition.coords.longitude;
            latitude = myPosition.coords.latitude;
            //API from Open weather
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=087d977a44c8cf143f0a013b4665d112`;
            fetch(api)
                .then((info) => {
                    return info.json()
                })
                .then((data) => {
                    //grabbing data from API
                    let cityName = data.name;
                    let cityTemp = data.main.temp;
                    let cityWeatherDesc = data.weather[0].description;
                    let cityWeatherIcon = data.weather[0].icon;
                    let cityWeatherIconUrl = `https://openweathermap.org/img/wn/${cityWeatherIcon}@2x.png`;
                    //Set weather elements using DOM Selectors from variables
                    city.textContent = cityName;
                    degree.textContent = cityTemp - 273.15;  //Converting Kelvin to Celsius
                    degree.textContent = Math.floor(degree.textContent);
                    description.textContent = cityWeatherDesc;
                    //get icon from Open weather
                    icon.outerHTML = `<img src="${cityWeatherIconUrl}" alt="icon" class="icon">`;
                });
        });
    } else {
        alert(`Can't get location`);
    }

    // Get Current Time To Change Background
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let currentTime = today.getHours() + ":" + today.getMinutes();

    // Add night background after 7pm (19h)
    const bodyBackground = document.querySelector('.body');
        if (hour < 6 || hour > 19) {
            if (bodyBackground.classList.contains('show-day')) {
                bodyBackground.classList.remove('show-day');
                bodyBackground.classList.add('show-night');
            } else {
                bodyBackground.classList.add('show-day');
            }
        }
});