const APIkey = '3c6d79e604a2408cae0172002242910';
const apiUrl = "http://api.weatherapi.com/v1/forecast.json?days=6&aqi=yes&alerts=no";
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
//main part
   document.getElementById("city-name").textContent = `${data.location.name},${data.location.country}`
   document.getElementById("temperature").textContent = `${data.current.temp_c}°C`;
   document.getElementById("feels-like").textContent = `${data.current.feelslike_c}°C`;
   document.getElementById("humidity").textContent = `${data.current.humidity}%`;
   document.getElementById("pressure").textContent = `${data.current.pressure_mb} hPa`;
   document.getElementById("wind-speed").textContent = `${data.current.wind_kph} km/h`;
   document.getElementById("UV").textContent = `${data.current.uv} `;
   document.getElementById("weather-info").textContent = `${data.current.condition.text} `;
   // icon  
    document.getElementById("main-img").src = `${data.current.condition.icon}`;

    // Sunrise and sunset 
    document.getElementById("sunrise").textContent =`${data.forecast.forecastday[0].astro.sunrise}`
    document.getElementById("sunset").textContent =  `${data.forecast.forecastday[0].astro.sunset}`
// 5 Days Forecast
    //day 1
    

}

function callweather(){
    const search_input = document.getElementById("city-input").value;
    fetchWeather(search_input);
}
// Fetch weather for default location on page load
fetchWeather("soliman,tunis");