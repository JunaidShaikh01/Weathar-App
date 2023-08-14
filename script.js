const cityNameEnterd = document.getElementById('cityNameEnterd')
const clock = document.getElementById('cityTime');
const cityDate = document.getElementById('cityDate');

//Function for date an time 
function displayTime() {
    let a = new Date
    let hours = a.getHours();
    let minutes = a.getMinutes();
    let date = a.getDate();
    let mounth = a.getMonth();
    let year = a.getFullYear();
    let monthName = ["January", "Fabruary", "March", "April", "May", "June", "July", "August", "September", "Octuber", "November", "Decmber"]
    let correntMounthName = monthName[mounth]

    let amPM = 'AM';
    if (hours >= 12) {
        amPM = 'PM';

        hours = hours === 12 ? 12 : hours - 12;
    }

    let lm = 0
    if (minutes < 10) {
        lm + "0".toString();
    }
    else {
        lm = minutes;
    }
    clock.innerHTML = (hours + ":" + lm + ":" + amPM);
    cityDate.innerHTML = (date + ":" + correntMounthName + ":" + year)

}

setInterval(displayTime, 100)

//This Function Invoked after Button is clicked 
function getWeather() {
    
    const city = document.getElementById('cityName').value

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2ac59bf72d6a7f9e35c1041cb43f7854`
    fetch(url)
        .then(response => response.json())
        .then((result) => {

            let temp = result.main.temp ;
            temp = Math.round(temp.toFixed(2))
            document.getElementById('temperatureInCelcius').textContent = `${temp}°C`

            let humidity = result.main.humidity;
            document.getElementById('humidityPersent').textContent = `${humidity}%`;

            let windSpeed = (result.wind.speed * 3.6).toFixed();
            document.getElementById('windSpeedDisplay').textContent = `${windSpeed}KMph`

            let weatherReport = result.weather[0].main;
            let imageElement = document.getElementById('cloudImg');
            document.getElementById("weatherStatus").textContent = `${weatherReport}`
            if (weatherReport === "Clouds") {
                imageElement.src = 'imgaes/cloudy.png';
            }
              else if (weatherReport === "Haze") {
                imageElement.src = 'imgaes/haze.png';
            }
            else if (weatherReport === "Rain") {
                imageElement.src = 'imgaes/rainy-day.png';
            }
            else{
                imageElement.src = 'imgaes/sunWithCloud.png';
            }
            let country = result.sys.country;
            cityNameEnterd.innerHTML = (`${city} , ${country}`)

            let feel = result.main.feels_like
            feel = Math.round(feel.toFixed(2))
            document.getElementById('feelLikeTemp').textContent = `${feel}°C`
        
        })

}

//This function is set a default when app open for the first time then weather report of Mumbai is shown
const urlDefault = `https://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&appid=2ac59bf72d6a7f9e35c1041cb43f7854`

fetch(urlDefault)
    .then(response => response.json())
    .then((result) => {
        let temp = result.main.temp;
        temp = Math.round(temp.toFixed(2))
        document.getElementById('temperatureInCelcius').textContent = `${temp}°C`

        let humidity = result.main.humidity;
        document.getElementById('humidityPersent').textContent = `${humidity}%`;

        let windSpeed = (result.wind.speed * 3.6).toFixed();
        document.getElementById('windSpeedDisplay').textContent = `${windSpeed}KMph`

        let weatherReport = result.weather[0].main;
        document.getElementById("weatherStatus").textContent = `${weatherReport}`

        let country = result.sys.country;
        let cityName = result.name;
        cityNameEnterd.innerHTML = (`${cityName} , ${country}`)

        let feel = result.main.feels_like
        feel = Math.round(feel.toFixed(2))
        document.getElementById('feelLikeTemp').textContent = `${feel}°C`
        console.log(result);

    })

