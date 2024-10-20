const APIkey='3ce4e129bba25d98a42709202be4ad48';
const city="tunisia";

const weather=fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`).then(response => response.json())

console.log(weather)