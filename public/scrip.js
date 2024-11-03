const APIkey = "3c6d79e604a2408cae0172002242910";
const apiUrl =
  "https://api.weatherapi.com/v1/forecast.json?days=6&aqi=yes&alerts=no";
  
let clockInterval;
async function fetchWeather(city) {
  try {
    const response = await fetch(`${apiUrl}&q=${city}&key=${APIkey}`);
    const data = await response.json();
    console.log(data);

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
  clockInterval = setInterval(() => updateTime(timezone), 1000); // Update time every second
}

function updateTime(timezone) {
  const localDateTime = new Date();

  const dayOfWeek = localDateTime.toLocaleDateString("en-EN", {
    weekday: "long",
    timeZone: timezone,
  });
  const day = localDateTime.toLocaleDateString("en-EN", {
    day: "numeric",
    timeZone: timezone,
  });
  const month = localDateTime.toLocaleDateString("en-EN", {
    month: "short",
    timeZone: timezone,
  });
  const date = `${dayOfWeek}, ${day}, ${month}`;
  const time = localDateTime.toLocaleTimeString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: timezone,
  });

  document.getElementById("current-date").textContent = date;
  document.getElementById("current-time").textContent = time;
}

// change  elements in interface
function changeInterface(data) {
  //main part
  document.getElementById(
    "city-name"
  ).textContent = `${data.location.name},${data.location.country}`;
  document.getElementById(
    "temperature"
  ).textContent = `${data.current.temp_c}°C`;
  document.getElementById(
    "feels-like"
  ).textContent = `${data.current.feelslike_c}°C`;
  document.getElementById("humidity").textContent = `${data.current.humidity}%`;
  document.getElementById(
    "pressure"
  ).textContent = `${data.current.pressure_mb} hPa`;
  document.getElementById(
    "wind-speed"
  ).textContent = `${data.current.wind_kph} km/h`;
  document.getElementById("UV").textContent = `${data.current.uv} `;
  document.getElementById(
    "weather-info"
  ).textContent = `${data.current.condition.text} `;
  // icon
  document.getElementById("main-img").src = `${data.current.condition.icon}`;

  // Sunrise and sunset
  document.getElementById(
    "sunrise"
  ).textContent = `${data.forecast.forecastday[0].astro.sunrise}`;
  document.getElementById(
    "sunset"
  ).textContent = `${data.forecast.forecastday[0].astro.sunset}`;
  // 5 Days Forecast

  const forecastContainer = document.getElementById("Forecast-5-day");
  forecastContainer.innerHTML = "";
  data.forecast.forecastday.slice(1, 6).forEach((day) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-EN", { weekday: "long" });
    const formatDate = date.toLocaleDateString("en-EN", {
      month: "short",
      day: "numeric",
    });
    const temp = Math.round(day.day.avgtemp_c);

    const icon = day.day.condition.icon;

    //  forecast line for one day day
    const line = document.createElement("div");
    line.className = "flex flex-row gap-11";

    line.innerHTML = `
            <img src="https:${icon}" class="h-8 w-8">
            
                <p class="font-semibold text-xl pt-5">${temp}°C</p>
                <p class="font-semibold text-xl pt-5">${dayName}, ${formatDate}</p>
            
        `;

    forecastContainer.appendChild(line);
  });

  // Hour Forecast

  const hourlyContainer = document.getElementById("Hourly-forecast");
  hourlyContainer.innerHTML = ""; // Clear previous hourly forecast

  const localTime = new Date(data.location.localtime); 
const currentHour = localTime.getHours(); 
const hourata = data.forecast.forecastday[0].hour;


let startindexD = 0; 
let startindexH = currentHour; 

if (currentHour >= 21) {
    
    startindexD = 1; 
    startindexH = (currentHour - 21 ); 
}


for (let i = 0; i < 5; i++) {
    const hourIndex = startindexH + (i * 3); 

    let hour; 
    if (startindexD === 0) {
      
        hour = hourata[hourIndex+3]; 
    } else {
       
        hour = data.forecast.forecastday[startindexD].hour[hourIndex % 24]; 
    }
    console.log(hour.time)
    const hourTime = new Date(hour.time).toLocaleTimeString("en-EN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const temp = Math.round(hour.temp_c);
    const conditionIcon = hour.condition.icon;
    const degWind = hour.wind_degree;

    const hourLine = document.createElement("div");
    hourLine.className =
      "flex gap-2 flex-col ml-6 mt-5 bg-[#373636] rounded-[40px] w-28 h-72";

    hourLine.innerHTML = `
            <p class="font-semibold text-xl text-center pt-4">${hourTime}</p>
            <img src="https:${conditionIcon}" class="w-[80px] ml-4" />
            <p class="font-semibold text-xl text-center">${temp}°C</p>
        `;

    //  wind icon manuelment
    const windIcon = document.createElement("img");
    windIcon.src = "/navigation1.png";
    windIcon.className = "w-[50px] ml-8";
    windIcon.alt = "";

    windIcon.style.transform = `rotate(${degWind}deg)`;

    hourLine.appendChild(windIcon);
    hourLine.innerHTML += `<p class="font-semibold text-xl text-center">${hour.wind_kph}km/h</p>`;

    hourlyContainer.appendChild(hourLine);
  }
}

function callweather() {
  const search_input = document.getElementById("city-input").value;
  fetchWeather(search_input);
}
// weather of my country
fetchWeather("soliman,tunis");
