const APIkey = '3c6d79e604a2408cae0172002242910';
const apiUrl = "http://api.weatherapi.com/v1/forecast.json?days=5&aqi=yes&alerts=no";
let clockInterval; 
async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&key=${APIkey}`);
        const data = await response.json();
        console.log(data)

        if (data.error) {
            alert("City not found");
        } else {
            
            clearInterval(clockInterval);
            startClock(data.location.tz_id); 
            changeInterface(data);
        }
    } catch (error) {
        console.error("Error fetching data:", error); // Show error in console if found
    }
}
function startClock(timezone) {
    updateTime(timezone);  
    clockInterval = setInterval(() => updateTime(timezone), 1000);  // Update time every second
}

function updateTime(timezone) {
    const localDateTime = new Date();

    const dayOfWeek = localDateTime.toLocaleDateString("en-EN", { weekday: 'long', timeZone: timezone });
    const day = localDateTime.toLocaleDateString("en-EN", { day: 'numeric', timeZone: timezone });
    const month = localDateTime.toLocaleDateString("en-EN", { month: 'short', timeZone: timezone });
    const date = `${dayOfWeek}, ${day}, ${month}`;
    const time = localDateTime.toLocaleTimeString("en-EN", { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: timezone });

    document.getElementById("current-date").textContent = date;
    document.getElementById("current-time").textContent = time;
}

// change  elements in interface
function changeInterface(data) {
   document.getElementById("city-name").textContent = `${data.location.name},${data.location.country}`
   document.getElementById("temperature").textContent = `${data.current.temp_c}°C`;
   document.getElementById("feels-like").textContent = `${data.current.feelslike_c}°C`;
   document.getElementById("humidity").textContent = `${data.current.humidity}%`;
   document.getElementById("pressure").textContent = `${data.current.pressure_mb} hPa`;
   document.getElementById("wind-speed").textContent = `${data.current.wind_kph} km/h`;
   document.getElementById("UV").textContent = `${data.current.uv} `;


    // Weather icon and description
    const iconid = data.weather[0].icon;
    document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${iconid}@2x.png`;
    document.getElementById("weather-description").textContent = data.weather[0].description;

    // Sunrise and sunset times
    document.getElementById("sunrise-time").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById("sunset-time").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

function callweather(){
    const search_input = document.getElementById("city-input").value;
    fetchWeather(search_input);
}
// Fetch weather for default location on page load
fetchWeather("soliman,tunis");